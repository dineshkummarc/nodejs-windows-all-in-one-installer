:: PATH Variable sample
::C:\Windows;C:\Windows\system32;%CommonProgramFiles%\Microsoft Shared\Windows Live;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files\Intel\DMIX;C:\Program Files (x86)\Microsoft SQL Server\90\Tools\binn\;C:\Program Files (x86)\Microsoft SQL Server\100\Tools\Binn\;C:\Program Files\Microsoft SQL Server\100\Tools\Binn\;C:\Program Files (x86)\Microsoft SQL Server\100\DTS\Binn\;C:\Program Files\TortoiseSVN\bin;C:\Program Files\TortoiseGit\bin;C:\Windows\Microsoft.NET\Framework\v2.0.50727;

:: Set a local variable
cd ..
SET NODE_PATH=%CD%
cd installer 

:: Set a enviroment variable
SETX /M "NODE_ENV" "Development"
SETX /M "NODE_PATH" "%NODE_PATH%"
SETX /M "PATH" "%PATH%;%%GIT_PATH%%;%%NODE_PATH%%"

FTYPE NodeJS.File.NJS="%NODE_PATH%\node" "%1"
ASSOC .NJS=NodeJS.File.NJS


:: install and start the service
NSSM INSTALL "NodeJS" "%NODE_PATH%\node.exe" "%NODE_PATH%\server.js"
NET START "NodeJS"



