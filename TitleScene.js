phina.define("TitleScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
        // 背景
        this.bg = Sprite("bg0").addChildTo(this);
        this.bg.origin.set(0, 0); // 左上基準に変更
        this.bg.width = SCREEN_WIDTH;
        this.bg.height = SCREEN_HEIGHT;

		// ロゴ
		this.logo = Sprite("logo").addChildTo(this);
		this.logo.setPosition(this.gridX.center(),this.gridY.span(4));
		
		// ナビ
        this.gameTitle = Label("PRESS ANY KEY");
        this.gameTitle.addChildTo(this);
        this.gameTitle.x = this.gridX.center();
        this.gameTitle.y = this.gridY.center();
        this.gameTitle.fill = 'black';
        this.gameTitle.fontSize = 30;
		
		// トマピコ
        Tomapiko().addChildTo(this).setPosition(this.gridX.center(), this.gridY.center() - 64);
		
		// キャラ紹介
        this.enemyDescriptions = ["普通", "だんだん速く", "ふらふら", "危険!"];
		for(var i=0;i<4;i++){
			// 左向きの敵を表示する
			// 4匹が中央に並ぶようにする
			var enemy = Enemy(3,i).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(10));
			// Enemy.updateの処理を消して動かないようにする
			enemy.update = null;
			
			// Enemyに同じく
			// 65+15*iにするといい感じに4種類表示される
			var item = Item(i,65+15*i).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(12));
			item.update = null;
			
			// 敵の説明
			var enemyDescription = Label(this.enemyDescriptions[i]).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(11));
            enemyDescription.fill = 'black';
            enemyDescription.fontSize = 15;

			// アイテムの説明
			var itemDescription = Label(item.getScore()).addChildTo(this).setPosition(this.gridX.span(5+i*2),this.gridY.span(12)+25);
			itemDescription.fill = 'black';
            itemDescription.fontSize = 15;
		}

		// BGMを流す
		// SoundManager.currentMusicがnullなのはBGMが掛かっていない起動直後
		// SoundManager.currentMusic.srcがASSETS.sound.bgmと異なるのは基本BGM以外がかかっているとき
        if(SoundManager.currentMusic == null || SoundManager.currentMusic.src != ASSETS.sound.bgm)SoundManager.playMusic("bgm");
    },

	onkeydown: function(){
		// キーが押されたら遅延してGameSceneに切り替える関数を呼び出す
		this.delayExit();
	},
	
	delayExit: function(){
		// キー入力を受け付けなくする
		this.onkeydown = null;
		// 切り替わる時間
		var changeTime = 2000;
		
		// 画面を白くするためのマスク
		var mask = RectangleShape().setSize(SCREEN_WIDTH,SCREEN_HEIGHT).setPosition(SCREEN_WIDTH/2,SCREEN_HEIGHT/2).addChildTo(this);
		mask.fill = "white";
		mask.alpha = 0;
		mask.strokeWidth = 0;
		
		// changeTimeかけてだんだん白くなる
		mask.tweener.to({alpha:1},changeTime,"easeInCubic");
		
		// キーを押したときの効果音を鳴らす
		SoundManager.play("titlese");
		
		// changeTime経ってから切り替える
		var self = this;
		setTimeout(function(){self.exit();},changeTime);
		
	},
});
