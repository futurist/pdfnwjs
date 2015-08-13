<!DOCTYPE html>
<HTML>
<HEAD>
<meta charset="utf-8">
<TITLE>客户端登录</TITLE>
<meta name="apple-touch-fullscreen" content="yes"/>
<meta name="format-detection" content="telephone=no"/>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="Expires" content="0" />

<script type="text/javascript" src="/js/cookies.js"></script>
</HEAD>
<BODY>
<?php
	error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

	header("Access-Control-Allow-Origin: *");
	header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With, X-File-Name, Cache-Control');
	header('Access-Control-Allow-Methods: GET,POST,HEAD');
	$code = $_GET['code'];
	$msgid = $_GET['state'];

	$content=file_get_contents('http://1111hui.com:88/putFingerInfo?code='.$code.'&msgid='.$msgid);
	echo $content;
?>

<div id="result"></div>

<script type="text/javascript">

var data = '<?php echo $content ?>';
var msgid = '<?php echo $msgid ?>';
document.querySelector('#result').innerHTML = '客户端登录成功';

</script>


</BODY>
</HTML>