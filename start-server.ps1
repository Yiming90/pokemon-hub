$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
$port = 8080
$python = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $python) {
    $pyLauncher = (Get-Command py -ErrorAction SilentlyContinue).Source
    if (-not $pyLauncher) { throw "Python 3 was not found. Install Python or run: npx serve -l $port ." }
    Start-Process -FilePath $pyLauncher -ArgumentList @("-3", "-m", "http.server", "$port", "--bind", "127.0.0.1") -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
} else {
    Start-Process -FilePath $python -ArgumentList @("-m", "http.server", "$port", "--bind", "127.0.0.1") -WorkingDirectory $PSScriptRoot -WindowStyle Hidden
}
Start-Sleep -Seconds 1
Start-Process "http://127.0.0.1:$port/"
Write-Host "Pokémon Hub started at http://127.0.0.1:$port/" -ForegroundColor Green
