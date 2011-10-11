:: kill process before opened
TASKKILL /f /t /fi "imagename eq node*"

:: Start
START NODE --debug-brk server.js 
START NODE "node_modules\node-inspector\bin\inspector.js"
START http://localhost:8080

