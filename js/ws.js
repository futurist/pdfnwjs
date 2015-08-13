


var wsQueue={};
var ws;
var wsInterval;
var wsConnected = false;
function connectToWS(){
	if(ws) ws.close();
	ws = new WebSocket('ws://1111hui.com:3000');
	ws.onopen = function (e) {
		ws.onmessage = function (e) {
			if(e.data[0]!="{")return;
	        var d=JSON.parse(e.data);
	        var callObj= wsQueue[d.msgid];
	        if(callObj){
	            callObj[1].call(callObj[0], d);
	            delete wsQueue[d.msgid];
	        }
		}
		ws.onclose = function (code, reason, bClean) {
			console.log("ws error: ", code, reason, bClean);
			wsConnected = false;
			reconnectWS();
		}
		console.log('client ws ready');
		wsConnected = true;
		clearInterval(wsInterval);
		wsInterval = null;
	}
}
connectToWS();

function reconnectWS(){
	if(wsConnected || wsInterval) return;
	wsInterval = setInterval(function(){ 
		connectToWS();
	}, 500);
}

function wsend(json, that, callback){

	if(callback){
	    json.msgid = +new Date() + Math.random();
	    wsQueue[json.msgid] = [that, callback];
	}

	if(ws) {
		ws.send(JSON.stringify(json));
	} else {
		console.log('ws not connected, ', JSON.stringify(json) );
	}
}



