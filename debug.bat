:: Set a local variable
SET NODE_PATH=%CD%

:: Set a enviroment variable
SETX /M "NODE_PATH" "%CD%"
SETX /M "NODE_ENV" "Development"

:: kill process before opened
TASKKILL /f /t /fi "imagename eq node*"

:: Start
START NODE --debug-brk server.js 
:: If inspector run before that server is done, he abort.
::SLEEP 1 
:: Debugger
START NODE "node_modules\node-inspector\bin\inspector.js"
:: Browser
START http://localhost:8080

