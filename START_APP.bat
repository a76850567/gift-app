@echo off
echo ========================================
echo   Gift App - Dopamine Task Manager
echo ========================================
echo.
echo Starting the application...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies... This may take a few minutes...
    echo.
    call npm install
    echo.
    echo Dependencies installed successfully!
    echo.
)

echo Starting development server...
echo The app will open in your browser automatically.
echo.
echo Press Ctrl+C to stop the server.
echo.

call npm run dev

pause
