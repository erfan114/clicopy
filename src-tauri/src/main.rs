// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use db::{DbConnection, SqliteConnection};

mod commands;
mod db;

use commands::{add_entry, get_all_entries, remove_entry, update_entry};

fn main() {

    env_logger::init();

    let sql_connection = SqliteConnection::default();
    sql_connection.create_entries_table();

    tauri::Builder::default()
        .manage(sql_connection)
        .invoke_handler(tauri::generate_handler![
            get_all_entries,
            add_entry,
            remove_entry,
            update_entry
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
