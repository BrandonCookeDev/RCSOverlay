SET CURDIR=%cd%
SET BASEDIR=%~dp0

REM Set a root directory variable by cd 
cd ..\..\..
SET ROOTDIR=%cd%
cd %CURDIR%

REM Set the Image Name from the text file content
for /f %%i in ('type %BASEDIR%\..\ImageName.txt') do set IMAGE_NAME=%%i

echo Running Docker container %IMAGE_NAME%

cd %BASEDIR%\..\..\..
docker run %* ^
	-p 8081:8081 ^
	--mount type=bind,source=%ROOTDIR%\Src\streamcontrol,target=/app/current/streamcontrol ^
	-it %IMAGE_NAME%
cd %CURDIR%