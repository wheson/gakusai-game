phina.define("TitleScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
        // 背景
        this.bg = Sprite("titleBg").addChildTo(this);
        this.bg.origin.set(0, 0); // 左上基準に変更
        this.bg.width = SCREEN_WIDTH;
        this.bg.height = SCREEN_HEIGHT;

		// ロゴ
		this.logo = Sprite("logo").setPosition(this.gridX.center(),this.gridY.span(4)).addChildTo(this);

		// ナビ
        this.gameTitle = Label("PRESS ANY KEY");
        this.gameTitle.x = this.gridX.center();
        this.gameTitle.y = this.gridY.center();
        this.gameTitle.fill = 'black';
        this.gameTitle.fontSize = 30;
        this.gameTitle.addChildTo(this);

		// トマピコ
        Tomapiko().addChildTo(this).setPosition(this.gridX.center(), this.gridY.center() - 64);

		// キャラ紹介
        this.enemyDescriptions = ["普通", "だんだん速く", "ふらふら", "危険!"];
		for(var i=0;i<4;i++){
			// 左向きの敵を表示する
			// 4匹が中央に並ぶようにする
			var enemy = Enemy(3,i).setPosition(this.gridX.span(5+i*2),this.gridY.span(10));
			// Enemy.updateの処理を消して動かないようにする
			enemy.update = null;
			enemy.addChildTo(this);

			// Enemyに同じく
			// 65+15*iにするといい感じに4種類表示される
			var item = Item(i,65+15*i).setPosition(this.gridX.span(5+i*2),this.gridY.span(12));
			item.update = null;
			item.addChildTo(this);

			// 敵の説明
			var enemyDescription = Label(this.enemyDescriptions[i]).setPosition(this.gridX.span(5+i*2),this.gridY.span(11));
            enemyDescription.fill = 'black';
            enemyDescription.fontSize = 15;
			enemyDescription.addChildTo(this);

			// アイテムの説明
			var itemDescription = Label(item.score).setPosition(this.gridX.span(5+i*2),this.gridY.span(12)+25);
			itemDescription.fill = 'black';
            itemDescription.fontSize = 15;
			itemDescription.addChildTo(this);
		}

		this.openRankingWindowButton = Button({
			x:this.gridX.span(14),
			y:this.gridY.span(15),
			width:200,
			height:30,
			text:"全てのランキング",
			fontColor:"white",
			fontSize: 24,
			cornerRadius:5,
			fill:"coral",
			stroke:"forestgreen",
		}).addChildTo(this).onclick = openRankingWindow;
		
		
		// BGMを流す
		// SoundManager.currentMusicがnullなのはBGMが掛かっていない起動直後
		// SoundManager.currentMusic.srcがASSETS.sound.bgmと異なるのは基本BGM以外がかかっているとき
        if(SoundManager.currentMusic == null || SoundManager.currentMusic.src != ASSETS.sound.bgm){
			SoundManager.playMusic("bgm");
		}
		
		// モバイルならキーダウン時の動作をクリック時に行う
		if(phina.isMobile()){
			this.onpointstart = this.onkeydown;
		}
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
		// changeTime経ってから切り替える
		var self = this;
		mask.tweener.to({alpha:1},changeTime,"easeInCubic")
		.call(function(){self.exit();});

		// キーを押したときの効果音を鳴らす
		SoundManager.play("titlese");
	},
});
