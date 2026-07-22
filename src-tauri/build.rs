fn main() {
    tauri_build::try_build(tauri_build::Attributes::new()).expect("Failed to run build script");
}
