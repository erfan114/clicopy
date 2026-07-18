# 0. Install Git (if missing)
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    echo "install git with winget..."
    winget install --id Git.Git -e --accept-package-agreements --accept-source-agreements 
    echo "installed!!"
}

# Get install path
$path = Read-Host "Install Path"

echo "clone repository..."
git clone https://github.com/erfan114/clicopy.git $path
Set-Location $path
echo "ok!"

# 1. Install Rust
if (!(Get-Command cargo -ErrorAction SilentlyContinue)) {
    echo "install rust..."
    Invoke-RestMethod https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
    .\rustup-init.exe -y
    $env:PATH += ";$env:USERPROFILE\.cargo\bin"
    echo "installed!!"
}

# 2. Install Bun
if (!(Get-Command bun -ErrorAction SilentlyContinue)) {
    echo "install bun..."
    powershell -c "irm bun.sh/install.ps1 | iex"
    $env:PATH += ";$env:USERPROFILE\.bun\bin"
    echo "installed!!"
}

echo "Install dependencies..."
# 3. Install dependencies
bun install
echo "installed!!"

echo "Running..."
# 4. Run
bun tauri dev
