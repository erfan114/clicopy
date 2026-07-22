// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use db::{DbConnection, SqliteConnection};

mod commands;
mod db;
mod development;

use commands::{add_entry, get_all_entries, remove_entry, update_entry};
use tauri::Manager;

fn main() {
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_all_entries,
            add_entry,
            remove_entry,
            update_entry
        ])
        .setup(|app| {
            let sql_connection = SqliteConnection::new(&app.handle());

            sql_connection.create_entries_table();

            app.manage(sql_connection);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
