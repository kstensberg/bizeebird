# define installer name
OutFile "BizeeBird-1.6.exe"

InstallDir $PROGRAMFILES\bizeebird

Section
	SetOutPath $INSTDIR
	File bizeebird\bin\Release\atk-sharp.dll
	File bizeebird\bin\Release\bizeebird.exe
	File bizeebird\bin\Release\bizeebird.exe.config
	File bizeebird\bin\Release\EntityFramework.dll
	File bizeebird\bin\Release\EntityFramework.SqlServer.dll
	File bizeebird\bin\Release\EntityFramework.SqlServer.xml
	File bizeebird\bin\Release\EntityFramework.xml
	File bizeebird\bin\Release\gdk-sharp.dll
	File bizeebird\bin\Release\glib-sharp.dll
	File bizeebird\bin\Release\gtk-sharp.dll
	File bizeebird\bin\Release\Mono.Posix.dll
	File bizeebird\bin\Release\pango-sharp.dll
	File bizeebird\bin\Release\SQLite.CodeFirst.dll
	File bizeebird\bin\Release\System.Data.SQLite.dll
	File bizeebird\bin\Release\System.Data.SQLite.EF6.dll
	File bizeebird\bin\Release\System.Data.SQLite.Linq.dll
	File bizeebird\bin\Release\System.Data.SQLite.xml
	File /r bizeebird\bin\Release\x64
	File /r bizeebird\bin\Release\x86

	File "C:\Program Files (x86)\GtkSharp\2.12\bin\*.dll"
	
	CreateShortcut "$DESKTOP\bizeebird.lnk" "$INSTDIR\bizeebird.exe"
	
	WriteUninstaller $INSTDIR\uninstaller.exe
SectionEnd

Section "Uninstall"
	Delete $INSTDIR\uninstaller.exe
	
	Delete $INSTDIR\atk-sharp.dll
	Delete $INSTDIR\bizeebird.exe
	Delete $INSTDIR\bizeebird.exe.config
	Delete $INSTDIR\bizeebird.vshost.exe
	Delete $INSTDIR\bizeebird.vshost.exe.config
	Delete $INSTDIR\bizeebird.vshost.exe.manifest
	Delete $INSTDIR\EntityFramework.dll
	Delete $INSTDIR\EntityFramework.SqlServer.dll
	Delete $INSTDIR\EntityFramework.SqlServer.xml
	Delete $INSTDIR\EntityFramework.xml
	Delete $INSTDIR\gdk-sharp.dll
	Delete $INSTDIR\glib-sharp.dll
	Delete $INSTDIR\gtk-sharp.dll
	Delete $INSTDIR\Mono.Posix.dll
	Delete $INSTDIR\pango-sharp.dll
	Delete $INSTDIR\SQLite.CodeFirst.dll
	Delete $INSTDIR\System.Data.SQLite.dll
	Delete $INSTDIR\System.Data.SQLite.EF6.dll
	Delete $INSTDIR\System.Data.SQLite.Linq.dll
	Delete $INSTDIR\System.Data.SQLite.xml
	Delete $INSTDIR\x64
	Delete $INSTDIR\x86
SectionEnd