# define installer name
OutFile "installer.exe"

InstallDir $PROGRAMFILES\bizeebird

Section
	SetOutPath $INSTDIR
	
	File /r bizeebird\bin\Release\*

	WriteUninstaller $INSTDIR\uninstaller.exe
SectionEnd

Section "Uninstall"
	Delete $INSTDIR\uninstaller.exe
	
	Delete $INSTDIR\*
SectionEnd