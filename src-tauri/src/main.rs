// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

use clicopy::db::{DbConnection, SqliteConnection};

fn main() {
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            clicopy::commands::get_all_entries,
            clicopy::commands::add_entry,
            clicopy::commands::remove_entry,
            clicopy::commands::update_entry
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
