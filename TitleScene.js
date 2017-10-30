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

        this.enemyDescriptions = ["普通", "だんだん速く", "ふらふら", "危険!"];
        this.itemDescriptions = ["100", "300", "500", "1000"];
        for(var i=0;i<4;i++){
			var enemyDescription = Label(this.enemyDescriptions[i]).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(11));
            enemyDescription.fill = 'black';
            enemyDescription.fontSize = 15;

			var itemDescription = Label(this.itemDescriptions[i]).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(12)+25);
			itemDescription.fill = 'black';
            itemDescription.fontSize = 15;
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
		var changeTime = 2000;
		
		var mask = RectangleShape().setSize(SCREEN_WIDTH,SCREEN_HEIGHT).setPosition(SCREEN_WIDTH/2,SCREEN_HEIGHT/2).addChildTo(this);
		mask.fill = "white";
		mask.alpha = 0;
		mask.strokeWidth = 0;
		mask.tweener.to({alpha:1},changeTime,"easeInCubic");
		
		var self = this;
		setTimeout(function(){self.exit();},changeTime);
		
	},
});
