:: PATH Variable sample
::C:\Windows;C:\Windows\system32;%CommonProgramFiles%\Microsoft Shared\Windows Live;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files\Intel\DMIX;C:\Program Files (x86)\Microsoft SQL Server\90\Tools\binn\;C:\Program Files (x86)\Microsoft SQL Server\100\Tools\Binn\;C:\Program Files\Microsoft SQL Server\100\Tools\Binn\;C:\Program Files (x86)\Microsoft SQL Server\100\DTS\Binn\;C:\Program Files\TortoiseSVN\bin;C:\Program Files\TortoiseGit\bin;C:\Windows\Microsoft.NET\Framework\v2.0.50727;

:: Reset drive location
c:

:: Set a local variable, using program files because of iisnode
if exist "%programfiles%" set NODE_PATH="%programfiles%\nodejs"
if exist "%programfiles(x86)%" set NODE_PATH="%programfiles(x86)%\nodejs"
if not exist "%NODE_PATH%" md "%NODE_PATH%"

:: Set a enviroment variable
SETX /M "NODE_ENV" "Development"
SETX /M "NODE_PATH" "%NODE_PATH%"
SETX /M "PATH" "%PATH%;%%GIT_PATH%%;%%NODE_PATH%%"

:: Associate NJS extension to node.exe
FTYPE NodeJS.File.NJS="%NODE_PATH%\node" "%1"
ASSOC .NJS=NodeJS.File.NJS


:: install and start the service
::NSSM INSTALL "NodeJS" "%NODE_PATH%\node.exe" "%NODE_PATH%\server.js"
::NET START "NodeJS"


