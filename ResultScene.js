phina.define("ResultScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
        this.backgroundColor = '#185674';
        this.gameTitle = Label("終了");
        this.gameTitle.addChildTo(this);
        this.gameTitle.x = 50;
        this.gameTitle.y = 50;
        this.gameTitle.fill = 'black';
        this.gameTitle.fontSize = 15;
		
		// やられトマピコ
		var tomapiko = Tomapiko().addChildTo(this).setPosition(SCREEN_WIDTH/2,SCREEN_HEIGHT/2);
		tomapiko.animation.gotoAndPlay("down");
		
		// 敵グループ
		this.enemyGroup = DisplayElement().addChildTo(this).setPosition(SCREEN_WIDTH/2,SCREEN_HEIGHT/2);
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

        var input = document.querySelector('#input');
        input.oninput = function () {
            label.text = input.value;
        };
		
		if(USE_COOKIE){
			// 端末にランキングを保存する
			// スコアをjsonオブジェクトにする
			this.scoreJSON = {"time":this.time,"score":this.score,"level":this.level,"name":"あなた"};
			
			// クッキーがからの場合は名無しさんを追加する
			if(getCookie("ranking") == ""){
				setCookie("ranking",'[{"time":0,"score":0,"level":0,"name":"名無しさん"}]');
			}
			
			// cookieからjsonを取得する
			this.rankingArray = JSON.parse(getCookie("ranking"));

			this.rankingArray.push(this.scoreJSON);
			this.rankingArray.sort(function(a,b){
				if(a.score==b.score){
					return b.time - a.time;
				}
				return b.score - a.score;
			});
			
			// 表示する
			for(var i = 0;i < this.rankingArray.length && i < 10; i++){
				var elm = this.rankingArray[i];
				var label = Label(JSON.stringify(elm)).addChildTo(this).setPosition(this.gridX.center(),this.gridY.span(3+i));
			}
			
		}
		
        var label = Label('名前を入力してね').addChildTo(this);
        label.x = this.gridX.center();
        label.y = this.gridY.center();
        label.fontSize = 64;
        label.setInteractive(true);
        label.width = 400;
        label.height = 80;

        input.focus();
        label.onpointstart = function () {
            input.focus();
        };
    },
    update: function(){
		
	},
	
	onclick: function () {
		if(USE_COOKIE){
			this.scoreJSON.name = document.querySelector('#input').value;
			// クッキーに保存する
			setCookie("ranking",JSON.stringify(this.rankingArray));
		}
		this.exit();
	}
    
});
