use std::sync::{Arc, Mutex};

use log::{error, info};
use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Entry {
    id: i32,
    name: String,
    description: Option<String>,
    text: String,
}

const DB_PATH: &str = "my_db.db";

pub trait DbConnection {
    fn create_entries_table(&self);
    fn add_entry(&self, name: String, desc: Option<String>, text: String) -> Result<(), ()>;
    fn remove_entry(&self, id: i32) -> Result<(), ()>;
    fn get_entry(&self, id: i32) -> Option<Entry>;
    fn get_all_entries(&self) -> Vec<Entry>;
}

pub struct SqliteConnection {
    connection: Arc<Mutex<Connection>>,
}

impl SqliteConnection {}

impl DbConnection for SqliteConnection {
    fn create_entries_table(&self) {
        match self.connection.try_lock() {
            Ok(connection) => {
                if let Err(e) = connection.execute(
                    "CREATE TABLE IF NOT EXISTS entries (
                    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    desc TEXT,
                    text TEXT NOT NULL
                )",
                    [],
                ) {
                    error!("Failed to create table: {:?}", e);
                } else {
                    info!("Table created or already exists.");
                }
            }
            Err(e) => error!("Failed to acquire lock for creating table: {:?}", e),
        }
    }

    fn add_entry(&self, name: String, desc: Option<String>, text: String) -> Result<(), ()> {
        let connection = match self.connection.try_lock() {
            Ok(conn) => conn,
            Err(e) => {
                error!("Failed to acquire lock for adding entry: {:?}", e);
                return Err(());
            }
        };

        let result = connection.execute(
            "INSERT INTO entries (name, desc, text) VALUES (?1, ?2, ?3)",
            params![name, desc.as_deref(), text],
        );

        match result {
            Ok(_) => {
                info!("Entry added successfully.");
                Ok(())
            }
            Err(e) => {
                error!("Failed to add entry: {:?}", e);
                Err(())
            }
        }
    }

    fn remove_entry(&self, id: i32) -> Result<(), ()> {
        let connection = match self.connection.try_lock() {
            Ok(conn) => conn,
            Err(e) => {
                error!("Failed to acquire lock for removing entry: {:?}", e);
                return Err(());
            }
        };

        let result = connection.execute("DELETE FROM entries WHERE id = ?1", params![id]);

        match result {
            Ok(_) => {
                info!("Entry with id {} removed successfully.", id);
                Ok(())
            }
            Err(e) => {
                error!("Failed to remove entry with id {}: {:?}", id, e);
                Err(())
            }
        }
    }

    fn get_all_entries(&self) -> Vec<Entry> {
        let connection = match self.connection.try_lock() {
            Ok(conn) => conn,
            Err(e) => {
                error!("Failed to acquire lock for retrieving entries: {:?}", e);
                return Vec::new(); // Return an empty vector on error
            }
        };

        let mut stmt = match connection.prepare("SELECT id, name, desc, text FROM entries") {
            Ok(s) => s,
            Err(e) => {
                error!(
                    "Failed to prepare statement for retrieving all entries: {:?}",
                    e
                );
                return Vec::new(); // Return an empty vector on error
            }
        };

        let entry_iter = match stmt.query_map(params![], |row| {
            Ok(Entry {
                id: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                text: row.get(3)?,
            })
        }) {
            Ok(iter) => iter,
            Err(e) => {
                error!(
                    "Failed to execute query for retrieving all entries: {:?}",
                    e
                );
                return Vec::new(); // Return an empty vector on error
            }
        };

        let mut entries = Vec::new();

        for entry in entry_iter {
            match entry {
                Ok(e) => entries.push(e),
                Err(e) => error!("Failed to map row to Entry: {:?}", e),
            }
        }

        info!("Retrieved {} entries.", entries.len());
        entries
    }

    fn get_entry(&self, id: i32) -> Option<Entry> {
        let connection = match self.connection.try_lock() {
            Ok(conn) => conn,
            Err(e) => {
                error!(
                    "Failed to acquire lock for retrieving entry with id {}: {:?}",
                    id, e
                );
                return None; // Return None on error
            }
        };

        match connection.query_row(
            "SELECT id, name, desc, text FROM entries WHERE id = ?1",
            params![id],
            |row| {
                Ok(Entry {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    description: row.get(2)?,
                    text: row.get(3)?,
                })
            },
        ) {
            Ok(entry) => {
                info!("Retrieved entry with id {}.", id);
                Some(entry)
            }
            Err(e) => {
                error!("Failed to retrieve entry with id {}: {:?}", id, e);
                None
            }
        }
    }
}

impl Default for SqliteConnection {
    fn default() -> Self {
        Self {
            connection: Arc::new(Mutex::new(Connection::open(DB_PATH).unwrap())),
        }
    }
}
