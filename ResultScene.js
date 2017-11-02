phina.define("ResultScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
        // 背景
        this.bg = Sprite("bg" + options.bgNum ).addChildTo(this);
        this.bg.origin.set(0, 0); // 左上基準に変更
        this.bg.width = SCREEN_WIDTH;
        this.bg.height = SCREEN_HEIGHT;
		
        this.gameTitle = Label("終了");
        this.gameTitle.addChildTo(this);
        this.gameTitle.x = 50;
        this.gameTitle.y = 50;
        this.gameTitle.fill = 'black';
        this.gameTitle.fontSize = 15;
		
		// やられトマピコ
		var tomapiko = Tomapiko().addChildTo(this).setPosition(SCREEN_WIDTH/2,this.gridY.span(5));
		tomapiko.animation.gotoAndPlay("down");
		
		// 敵グループ
		this.enemyGroup = DisplayElement().addChildTo(this).setPosition(SCREEN_WIDTH/2,this.gridY.span(5));
		// 45度ごとに円状に生成
		for(var deg=0;deg<360;deg+=45){
			// 敵番号
			var i = deg/45;
			// 左向きの敵を追加する
			var enemy = Enemy(LEFT,i%4,0,0,0).addChildTo(this.enemyGroup);
			// 角度と半径を与える
			enemy.deg = deg;
			enemy.offset = 150;
			// Enemyクラスのupdateを書き換える
			enemy.update = function(){
				this.x = Math.cos(Math.degToRad(this.deg))*this.offset;
				this.y = Math.sin(Math.degToRad(this.deg))*this.offset;
				this.deg--;
			};
		}
		

		// ステータスの白い背景
        this.displayStatusBG = RectangleShape().addChildTo(this);
        this.displayStatusBG.fill = "white";
        this.displayStatusBG.stroke = "gray";
        this.displayStatusBG.setPosition(this.gridX.span(14), this.gridY.span(3));
        this.displayStatusBG.setSize(100, 150);
        this.displayStatusBG.alpha = 0.8;
		
        // frame
        this.time = options.time;
        this.displayTime = Label("0").addChildTo(this);
        this.displayTime.fill = 'black';
        this.displayTime.fontSize = 15;
        this.displayTime.setPosition(this.gridX.span(14), this.gridY.span(2));

        this.score = options.score;
        this.displayScore = Label("0").addChildTo(this);
        this.displayScore.fill = 'black';
        this.displayScore.fontSize = 15;
        this.displayScore.setPosition(this.gridX.span(14), this.gridY.span(3));

        //ゲームのレベル
        this.level = options.level;
        this.displayLevel = Label("0").addChildTo(this);
        this.displayLevel.fill = 'black';
        this.displayLevel.fontSize = 15;
        this.displayLevel.setPosition(this.gridX.span(14), this.gridY.span(4));

        this.displayTime.text = "time: " + this.time;
        this.displayScore.text = "score: " + this.score;
        this.displayLevel.text = "level: " + this.level;
		
		var self = this;
		
		this.retryButton = Button({
			x:this.gridX.center(),
			y:this.gridY.span(14),
			width:300,
			height:80,
			text:"もういちど",
			fontColor:"white",
			cornerRadius:5,
			fill:"skyblue",
			stroke:"darkslateblue",
		}).addChildTo(this).onclick = function(){
			if(DEBUG)console.log("exit");
			self.exit();
		};
		
		this.submitButton = Button({
			x:this.gridX.center(),
			y:this.gridY.span(12),
			width:300,
			height:60,
			text:"登録する",
			fontColor:"white",
			cornerRadius:5,
			fill:"skyblue",
			stroke:"darkslateblue",
		}).addChildTo(this).onclick = function(){
			if(DEBUG)console.log("submit");
			self.exit();
		};
		
		var label=[];
		for(var i=0;i<2;i++){
			label[i] = Label('名前を入力してね').addChildTo(this);
			label[i].x = this.gridX.center()+i;
			label[i].y = this.gridY.span(10)+i;
			label[i].fontSize = 60;
			label[i].setInteractive(true);
			label[i].width = 400;
			label[i].height = 80;
			label[i].fill = i===1?"white":"black";
		}
		var input = document.querySelector('#input');
		input.oninput = function () {
			label[0].text = label[1].text = input.value;
		};
		input.focus();
		label[1].onpointstart = function () {
			input.focus();
		};

    },
    update: function(){
		
	},
});
