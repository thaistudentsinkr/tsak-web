@echo off
echo ========================================
echo TSAK Backend Setup Script
echo ========================================
echo.

echo [1/4] Making migrations...
python manage.py makemigrations
if %errorlevel% neq 0 (
    echo ERROR: Failed to make migrations
    pause
    exit /b %errorlevel%
)
echo.

echo [2/4] Running migrations...
python manage.py migrate
if %errorlevel% neq 0 (
    echo ERROR: Failed to run migrations
    pause
    exit /b %errorlevel%
)
echo.

echo [3/4] Creating superuser...
echo Please enter the superuser details when prompted.
python manage.py createsuperuser
if %errorlevel% neq 0 (
    echo ERROR: Failed to create superuser
    pause
    exit /b %errorlevel%
)
echo.

echo [4/4] Starting development server...
echo Server will start at http://127.0.0.1:8000/
echo Press Ctrl+C to stop the server.
echo.
python manage.py runserver

pause




