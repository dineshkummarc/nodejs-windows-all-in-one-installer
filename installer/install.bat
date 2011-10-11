cd ..
:: Set a local variable
SET NODE_PATH=%CD%

:: Set a enviroment variable
SETX /M "NODE_PATH" "%CD%"
SETX /M "NODE_ENV" "Development"

cd installer 
NSSM INSTALL "NodeJS" "%NODE_PATH%\node.exe" "%NODE_PATH%\server.js"

:: Start the service
NET START "NodeJS"

