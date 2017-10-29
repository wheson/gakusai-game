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

        SoundManager.playMusic("bgm");
    },

	
    onclick: function () {
        this.exit();
    },
	
	onkeydown: function(){
		this.exit();
	}
});
