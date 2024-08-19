use crate::db::{DbConnection, Entry, SqliteConnection};

#[tauri::command]
pub fn get_all_entries(sqlite_con: tauri::State<SqliteConnection>) -> Vec<Entry> {
    sqlite_con.get_all_entries()
}

#[tauri::command]
pub fn add_entry(
    sqlite_con: tauri::State<SqliteConnection>,
    name: String,
    description: Option<String>,
    text: String,
) -> Result<(), ()> {
    sqlite_con.add_entry(name, description, text)
}

#[tauri::command]
pub fn remove_entry(sqlite_con: tauri::State<SqliteConnection>, id: i32) -> Result<(), ()> {
    sqlite_con.remove_entry(id)
}

#[tauri::command]
pub fn update_entry(
    sqlite_con: tauri::State<SqliteConnection>,
    id: i32,
    name: String,
    description: Option<String>,
    text: String,
) -> Result<(), ()> {
    let prev_entry = sqlite_con.get_entry(id);
    if prev_entry.is_none() {
        return Err(());
    }

    if sqlite_con.remove_entry(id).is_err() {
        return Err(());
    };

    if sqlite_con.add_entry(name, description, text).is_err() {
        return Err(());
    };
    
    Ok(())
}
