:: Set a enviroment variable
SET NODE_PATH=%CD%
SETX /M "NODE_PATH" "%NODE_PATH%"
SETX /M "NODE_ENV" "Development"

:: kill process before opened
TASKKILL /f /t /fi "imagename eq node*"

:: Start
START NODE --debug-brk server.js 
:: Debugger
START NODE "node_modules\node-inspector\bin\inspector.js"
:: Browser
START http://localhost:8080

