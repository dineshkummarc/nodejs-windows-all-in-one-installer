cd ..
SETX "NODE_PATH" "%CD%"
cd installer 
NSSM INSTALL "NodeJS" "%NODE_PATH%\node.exe" "%NODE_PATH%\server.js"
NET START "NodeJS"

