#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lol_game_client_api::api::GameClient;

#[tauri::command]
async fn test() {
    println!("Test triggered!");

    let client = GameClient::new();
    let active_player = client.active_player().await.unwrap();

    println!("Active player: {}", active_player.summoner_name);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
