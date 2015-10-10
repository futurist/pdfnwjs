#include <Array.au3>
#include <File.au3>
#include <MsgBoxConstants.au3>


Local $aFileList = _FileListToArray(@ScriptDir, "*")
Local $str = ""
for $i=1 to $aFileList[0]
   $file = $aFileList[$i]

   ;MsgBox($MB_SYSTEMMODAL, "", "You have the following windows open:" & $file & $a )

   if StringRegExp($file, "(?i)\.au3$|\.nw$|\.zip$|\.git|bower_components|^_")==1  then
	  ContinueLoop
   EndIf


   $str = $str & " " & $file

next

Local $iDelete = FileDelete("app.zip")
Local $iDelete = FileDelete("app.nw")

Local $ret = RunWait( """d:\Program Files\Bandizip\Bandizip32.exe"" /archive app.zip "& $str &" " )

if $ret<>0 Then
   MsgBox($MB_SYSTEMMODAL, "", "err:" & @CRLF & $ret  )
   Exit
EndIf

FileMove("app.zip", "app.nw", $FC_OVERWRITE)
; Local $ret = RunWait("cmd /c ""copy /b d:\nwjs\nw.exe+app.nw app.exe""")

Sleep(100)

Run("nw app.nw")

