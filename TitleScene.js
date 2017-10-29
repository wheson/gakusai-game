phina.define("TitleScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
        // 背景
        this.bg = Sprite("bg").addChildTo(this);
        this.bg.origin.set(0, 0); // 左上基準に変更
        this.bg.width = SCREEN_WIDTH;
        this.bg.height = SCREEN_HEIGHT;

        this.gameTitle = Label("PRESS ANY KEY");
        this.gameTitle.addChildTo(this);
        this.gameTitle.x = this.gridX.center();
        this.gameTitle.y = this.gridY.center();
        this.gameTitle.fill = 'black';
        this.gameTitle.fontSize = 30;
		
        Tomapiko().addChildTo(this).setPosition(this.gridX.center(), this.gridY.center() - 64);
		
		for(var i=0;i<4;i++){
			var enemy = Enemy(3,i).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(10));
			enemy.update = null;
			
			var item = Item(i,65+15*i).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(12));
			item.update = null;
		}

        SoundManager.playMusic("bgm");
    },

	
    onclick: function () {
		this.delayExit();
    },
	
	onkeydown: function(){
		this.delayExit();
	},
	
	delayExit: function(){
		var self = this;
		setTimeout(function(){self.exit();},1000);
	},
});
