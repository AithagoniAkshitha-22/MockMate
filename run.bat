@echo off
echo ==========================================
echo Starting MockMate Application Services...
echo ==========================================

echo Starting Express API Backend (Port 8080)...
start "MockMate Express Backend" cmd /k "cd express-backend && npm run server"

echo Starting OpenAI Bot Service (Port 8081)...
start "MockMate Bot Service" cmd /k "cd express-backend && node bot-service.js"

echo Starting React Frontend (Port 3000)...
start "MockMate React Frontend" cmd /k "cd frontend && npm start"

echo.
echo All services have been started in separate windows.
echo - Frontend: http://localhost:3000
echo - Express Backend: http://localhost:8080
echo - Bot Service: http://localhost:8081
echo.
pause
