@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ============================================
echo   Pokemon Hub - local static server
echo   http://127.0.0.1:8080/
echo  ============================================
echo.

where python >nul 2>nul
if %errorlevel%==0 (
  start "Pokemon Hub Server" /min python -m http.server 8080 --bind 127.0.0.1
) else (
  where py >nul 2>nul
  if %errorlevel%==0 (
    start "Pokemon Hub Server" /min py -3 -m http.server 8080 --bind 127.0.0.1
  ) else (
    echo Python was not found. Install Python 3 or run: npx serve -l 8080 .
    pause
    exit /b 1
  )
)
timeout /t 2 >nul
start "" "http://127.0.0.1:8080/"
echo Server started. Keep the minimized server window open.
