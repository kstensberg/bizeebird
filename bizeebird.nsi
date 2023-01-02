# define installer name
OutFile "build\BizeeBird-2.0.exe"

InstallDir $PROGRAMFILES64\bizeebird

Section
    SetOutPath $INSTDIR
    File build\bizeebird-win32-x64\LICENSE
    File build\bizeebird-win32-x64\LICENSES.chromium.html
    File build\bizeebird-win32-x64\bizeebird.exe
    File build\bizeebird-win32-x64\chrome_100_percent.pak
    File build\bizeebird-win32-x64\chrome_200_percent.pak
    File build\bizeebird-win32-x64\d3dcompiler_47.dll
    File build\bizeebird-win32-x64\ffmpeg.dll
    File build\bizeebird-win32-x64\icudtl.dat
    File build\bizeebird-win32-x64\libEGL.dll
    File build\bizeebird-win32-x64\libGLESv2.dll
    File /r build\bizeebird-win32-x64\locales
    File /r build\bizeebird-win32-x64\resources
    File build\bizeebird-win32-x64\resources.pak
    File build\bizeebird-win32-x64\snapshot_blob.bin
    File build\bizeebird-win32-x64\v8_context_snapshot.bin
    File build\bizeebird-win32-x64\version
    File build\bizeebird-win32-x64\vk_swiftshader.dll
    File build\bizeebird-win32-x64\vk_swiftshader_icd.json
    File build\bizeebird-win32-x64\vulkan-1.dll

    CreateShortcut "$DESKTOP\bizeebird.lnk" "$INSTDIR\bizeebird.exe"

    WriteUninstaller $INSTDIR\uninstaller.exe
SectionEnd

Section "Uninstall"
    Delete $INSTDIR\uninstaller.exe

    Delete $INSTDIR\LICENSE
    Delete $INSTDIR\LICENSES.chromium.html
    Delete $INSTDIR\bizeebird.exe
    Delete $INSTDIR\chrome_100_percent.pak
    Delete $INSTDIR\chrome_200_percent.pak
    Delete $INSTDIR\d3dcompiler_47.dll
    Delete $INSTDIR\ffmpeg.dll
    Delete $INSTDIR\icudtl.dat
    Delete $INSTDIR\libEGL.dll
    Delete $INSTDIR\libGLESv2.dll
    RMDir /r $INSTDIR\locales
    RMDir /r $INSTDIR\resources
    Delete $INSTDIR\resources.pak
    Delete $INSTDIR\snapshot_blob.bin
    Delete $INSTDIR\v8_context_snapshot.bin
    Delete $INSTDIR\version
    Delete $INSTDIR\vk_swiftshader.dll
    Delete $INSTDIR\vk_swiftshader_icd.json
    Delete $INSTDIR\vulkan-1.dll
    RMDir $INSTDIR
SectionEnd