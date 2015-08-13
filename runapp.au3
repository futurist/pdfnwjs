#include <Array.au3>
#include <File.au3>
#include <MsgBoxConstants.au3>


Local $aFileList = _FileListToArray(@ScriptDir, "*")
Local $str = ""
for $i=1 to $aFileList[0]
   $file = $aFileList[$i]

   ;MsgBox($MB_SYSTEMMODAL, "", "You have the following windows open:" & $file & $a )

   if StringRegExp($file, "(?i)\.au3$|\.nw$|bower_components|node_modules")==1  then
	  ContinueLoop
   EndIf


   $str = $str & " " & $file

next

Local $iDelete = FileDelete("app.zip")
Local $iDelete = FileDelete("app.nw")

Local $ret = RunWait( """D:\Program Files\Bandizip\Bandizip32.exe"" /archive app.zip "& $str &" " )

if $ret<>0 Then
   MsgBox($MB_SYSTEMMODAL, "", "err:" & @CRLF & $ret  )
   Exit
EndIf

FileMove("app.zip", "app.nw", $FC_OVERWRITE)

Sleep(100)

Run("nw app.nw")

