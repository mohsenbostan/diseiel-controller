use std::env;

use futures::stream::SplitSink;
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use thiserror::Error;
use warp::ws::Message;
use warp::ws::WebSocket;
use warp::Filter;

extern crate pretty_env_logger;
#[macro_use]
extern crate log;

#[derive(Deserialize, Serialize, Debug)]
struct WsRequest {
    command: String,
    details: String,
}

// example result structure
#[derive(Serialize, Debug)]
struct WsResult {
    status: String,
    data: WsRequest,
}

#[derive(Serialize, Debug)]
struct ApiErrorResult {
    detail: String,
}

#[derive(Error, Debug)]
enum ApiErrors {
    #[error("user not authorized")]
    NotAuthorized(String),
}

impl warp::reject::Reject for ApiErrors {}

#[tokio::main]
async fn main() {
    pretty_env_logger::init();
    let routes = warp::path("echo")
        .and(ensure_authentication().await)
        .and(warp::ws())
        .map(|_, ws: warp::ws::Ws| ws.on_upgrade(handle_ws));

    warp::serve(routes).run(([127, 0, 0, 1], 6969)).await;
}

// middleware that looks for authorization header and validates it
async fn ensure_authentication(
) -> impl Filter<Extract = (String,), Error = warp::reject::Rejection> + Clone {
    warp::header::optional::<String>("Authorization").and_then(
        |auth_header: Option<String>| async move {
            if let Some(header) = auth_header {
                let parts: Vec<&str> = header.split(" ").collect();
                if parts.len() == 2
                    && parts[0] == "Token"
                    && parts[1] == env::var("TOKEN").expect("No TOKEN provided")
                {
                    return Ok("Authenticated".to_string());
                }
            }

            Err(warp::reject::custom(ApiErrors::NotAuthorized(
                "not authorized".to_string(),
            )))
        },
    )
}

async fn handle_ws(websocket: warp::ws::WebSocket) {
    let (mut sender, mut receiver) = websocket.split();

    while let Some(body) = receiver.next().await {
        let message = match body {
            Ok(msg) => msg,
            Err(e) => {
                error!("error reading message on websocket: {}", e);
                break;
            }
        };

        handle_websocket_message(message, &mut sender).await;
    }

    info!("client disconnected");
}

async fn handle_websocket_message(message: Message, sender: &mut SplitSink<WebSocket, Message>) {
    let msg = if let Ok(s) = message.to_str() {
        s
    } else {
        info!("ping-pong");
        return;
    };

    let req: WsRequest = serde_json::from_str(msg).expect("Wrong Message");
    info!("received command {} with details: {}", req.command, req.details);

    let response = serde_json::to_string(&WsResult {
        status: "success".to_string(),
        data: req 
    })
    .unwrap();
    sender.send(Message::text(response)).await.unwrap();
}
