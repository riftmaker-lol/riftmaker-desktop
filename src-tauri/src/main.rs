#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod rito;

use rito::model::{Invitation, Lobby, SummonerInfo};

#[tauri::command]
async fn test() -> SummonerInfo {
    println!("Test triggered!");

    let client = rito::GameClient::new();
    let summoner_info = client
        .get_data::<SummonerInfo>("lol-summoner/v1/current-summoner")
        .await
        .unwrap();

    println!("summoner_info: {:?}", summoner_info);

    summoner_info
}

#[tauri::command]
async fn get_customs() -> Lobby {
    let client = rito::GameClient::new();
    let lobby = client
        .get_data::<Lobby>("lol-lobby/v2/lobby")
        .await
        .unwrap();

    println!("lobby: {:?}", lobby);

    lobby
}

#[tauri::command]
async fn invite_summoner(summoner_name: String, summoner_id: String) -> Vec<Invitation> {
    let client = rito::GameClient::new();

    println!("summoner_name: {}", summoner_name);
    println!("summoner_id: {}", summoner_id);

    let payload = Invitation {
        to_summoner_id: summoner_id.parse::<i64>().unwrap(),
        to_summoner_name: summoner_name,
        invitation_id: summoner_id,
        state: "Pending".to_string(),
        timestamp: "".to_string(),
        invitation_type: "party".to_string(),
    };

    let json_payload = serde_json::to_string(&vec![payload]).unwrap();

    println!("json_payload: {}", json_payload);

    let invitations = client
        .post_data::<Vec<Invitation>>("lol-lobby/v2/lobby/invitations", json_payload.as_str())
        .await
        .unwrap();

    println!("lobby: {:?}", invitations);

    invitations
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![test])
        .invoke_handler(tauri::generate_handler![get_customs])
        .invoke_handler(tauri::generate_handler![invite_summoner])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
