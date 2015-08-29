

var gui = require('nw.gui');


var mainNW = function() {

	// some init data & number
	var TaskBarHeight = 30;
	var POP_WIDTH=300, POP_HEIGHT=300;

	// global var 
	var isShow = true;
	var _tray;	//system _tray var
	var win;	//main window var

	this.tray = _tray;

	// show/hide main window
	this.showWin = function showWin(toShow){
		if(typeof toShow=='undefined'){
			toShow = !isShow;
		}
		if(toShow){
			win.show();
			win.focus();
			isShow = true;
		} else{
			win.hide();
			isShow = false;
		}

	}

	this.initNW = function initNW(){

		// init main window
		win = gui.Window.get();
		win.setPosition('center');
		win.on('close', function() {
		  this.hide(); // Pretend to be closed already
		  isShow = false;
		});

		win.moveTo( Math.round(screen.width-window.outerWidth-40), Math.round(screen.height/2-window.outerHeight/2-TaskBarHeight-10) );
		showWin(true);

		// init system _Tray
		_tray = new gui.Tray({ title: 'Tray', icon: 'img/icon.png' });
		// Give it a menu
		var menu = new gui.Menu();

		var menuItem1 = new gui.MenuItem({ label: '显示' });
		menuItem1.on('click',function(e){
			showWin(1);
		});
		menu.append(menuItem1);

		var menuItem2 = new gui.MenuItem({ label: '退出' });
		menuItem2.on('click',function(e){
			gui.App.quit();
		});
		menu.append(menuItem2);

		_tray.menu = menu;

		_tray.on('click', function(e){
			showWin();
		});
	}



	this.initNW = function showPop(){
		var pop = gui.Window.open('http://baidu.com',{toolbar:false,frame:false,width:POP_WIDTH, height:POP_HEIGHT});
		pop.setShowInTaskbar(false);
		pop.resizeTo(POP_WIDTH,POP_HEIGHT);
		pop.moveTo( screen.width-POP_WIDTH-20, screen.height-POP_HEIGHT-TaskBarHeight-10 );
		pop.setAlwaysOnTop(true);
		pop.setResizable(false);
	}

}

module.exports = mainNW;



