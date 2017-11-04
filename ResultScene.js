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
		
		// ランキング表示グリッド
		this.rankGridY = Grid({
			width: SCREEN_HEIGHT/2,
			columns: 10,
			offset: 10,
		});
		
		// スコアをjsonオブジェクトにする
		this.scoreJSON = {"time":options.time,"score":options.score,"level":options.level,"username":"あなた"};
		// 一人かいないJSONを作る
		this.rankingArray = [];
		
		// cookieを使うようになっていれば
		if(USE_COOKIE){
			// 端末にランキングを保存する
			var rawJSON = getCookie("ranking");
			if(rawJSON !== ""){
				// cookieからjsonを取得する
				this.rankingArray = JSON.parse(rawJSON);
			}
		}
		// ランキングに自分の今回のスコアを追加する
		this.rankingArray.push(this.scoreJSON);
		// ランキングをソートする
		// クッキーを使わない場合やクッキーがからの場合は何もしないような感じ
		this.rankingArray.sort(function(a,b){
			return b.score - a.score;
		});
		
		
		
		// ランキング表示領域
		this.rankingGroup = DisplayElement().addChildTo(this);
		
		// ランキング表示領域の背景
		var rankBG = RectangleShape().addChildTo(this.rankingGroup);
		rankBG.fill = "white";
		rankBG.stroke = "gray";
		rankBG.alpha = 0.8;
		rankBG.setOrigin(0,0);
		rankBG.setSize(500,this.rankGridY.width);
		
		// ランク10位まで
		for(var i=0;i<10;i++){
			var rank = Label((i===9?"":" ")+(i+1)).addChildTo(this.rankingGroup)
			.setOrigin(0,0)
			.setPosition(5,this.rankGridY.span(i));
			rank.fontSize = 20;
			
			var I = Label("　 位：").addChildTo(this.rankingGroup)
			.setOrigin(0,0)
			.setPosition(5,this.rankGridY.span(i));
			I.fontSize = 20;
		}
		this.rankingGroup.alpha = 0;

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
			if(USE_COOKIE){
				var name = $("#input")[0].value;
				if(name === "")return;
				self.scoreJSON.username = name;
				setCookie("ranking",JSON.stringify(self.rankingArray));
				this.fill = "gray";
				this.text = "登録しました";
				this.onclick = null;
			}else{
				alert("cookieが有効になっていないのでランキングに登録できません\nconsoleで有効にしてください");
			}
		};
		
		this.rankingShowingButton = Button({
			x:this.gridX.span(14),
			y:this.gridY.span(15),
			width:200,
			height:30,
			text:"ランキングを見る",
			fontColor:"white",
			fontSize: 24,
			cornerRadius:5,
			fill:"orangered",
			stroke:"darkslateblue",
		}).addChildTo(this).onclick = function(){
			// ランキングを表示する
			if(self.rankingGroup.alpha === 0){
				self.rankingGroup.alpha = 1;
				this.text = "ランキングを隠す";
			}else{
				self.rankingGroup.alpha = 0;
				this.text = "ランキングを見る";
			}
		};
		
		var label=[];
		for(var i=0;i<2;i++){
			label[i] = Label('名前を入力してね').addChildTo(this);
			label[i].x = this.gridX.center()+i;
			label[i].y = this.gridY.span(10)+i;
			label[i].fontSize = 56;
			label[i].width = 400;
			label[i].height = 80;
			label[i].fill = i===1?"white":"black";
		}
		$("input")[0].value = "";
		$("input")[0].oninput = function () {
			label[0].text = label[1].text = this.value;
		};

		
		
		// マウスカーソルを表示する
		$("body").css("cursor","default");
		
		this.printRecode(this.rankingArray);
    },
	printRecode: function(rankingArray){
		// ランク10位まで
		for(var i=0;i<10 && i<rankingArray.length;i++){
			var recode = Label(""+rankingArray[i].score+"点 "+rankingArray[i].username).addChildTo(this.rankingGroup).setOrigin(0,0)
			.setPosition(70,this.rankGridY.span(i));
			recode.fontSize = 20;
		}
	},
    update: function(){
		$("input")[0].focus();
	},
});
