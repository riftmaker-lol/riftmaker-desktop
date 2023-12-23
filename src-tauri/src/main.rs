#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod rito;

pub use commands::*;
use tauri::Manager;

fn main() {
    tauri_plugin_deep_link::prepare("lol.riftmaker.desktop");

    tauri::Builder::default()
        .setup(|app| {
            let handle = app.get_window("main").unwrap();
            tauri_plugin_deep_link::register("riftmaker", move |request| {
                // TODO: Handle the request here
                println!("request: {:?}", request);
                handle.emit_all("scheme-request-received", request).unwrap();
            })
            .unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            test,
            current_lobby,
            invite_summoner,
            check_client
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
