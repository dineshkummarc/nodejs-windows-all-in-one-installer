:: Set a local variable
cd ..
SET NODE_PATH=%CD%
cd installer 

:: Set a enviroment variable
SETX /M "NODE_PATH" "%NODE_PATH%"
SETX /M "NODE_ENV" "Development"

NSSM INSTALL "NodeJS" "%NODE_PATH%\node.exe" "%NODE_PATH%\server.js"

:: Start the service
NET START "NodeJS"

