﻿phina.define("ResultScene", {
	superClass: 'DisplayScene',
	getURL: "//pikopiko-184802.appspot.com/import?callback=?",
	postURL: "//pikopiko-184802.appspot.com/export",
	MAX_NAME_LENGTH: 16,
	init: function (options) {
		this.superInit({
			'width': SCREEN_WIDTH,
			'height': SCREEN_HEIGHT
		});
		// 背景
		this.bg = Sprite("bg" + options.bgNum );
		this.bg.origin.set(0, 0); // 左上基準に変更
		this.bg.width = SCREEN_WIDTH;
		this.bg.height = SCREEN_HEIGHT;
		this.bg.addChildTo(this);
		
		// やられトマピコ
		var tomapiko = Tomapiko().setPosition(SCREEN_WIDTH/2,this.gridY.span(5));
		tomapiko.animation.gotoAndPlay("down");
		tomapiko.addChildTo(this);
		
		// 敵グループ
		this.enemyGroup = DisplayElement().addChildTo(this).setPosition(SCREEN_WIDTH/2,this.gridY.span(5));
		// 45度ごとに円状に生成
		for(var deg=0;deg<360;deg+=45){
			// 敵番号
			var i = deg/45;
			// 左向きの敵を追加する
			var enemy = Enemy(LEFT,i%4,0,0,0);
			// 角度と半径を与える
			enemy.deg = deg;
			enemy.offset = 150;
			// Enemyクラスのupdateを書き換える
			enemy.update = function(){
				this.x = Math.cos(Math.degToRad(this.deg))*this.offset;
				this.y = Math.sin(Math.degToRad(this.deg))*this.offset;
				this.deg--;
			};
			enemy.addChildTo(this.enemyGroup);
		}
		
		// ランキング表示グリッド
		this.rankGridY = Grid({
			width: SCREEN_HEIGHT/2,
			columns: 11,
			offset: 10,
		});

		// ランキング表示領域
		this.rankingGroup = DisplayElement();
		
		// ランキング表示領域の背景
		var rankBG = RectangleShape().addChildTo(this.rankingGroup);
		rankBG.fill = "white";
		rankBG.stroke = "gray";
		rankBG.alpha = 0.8;
		rankBG.setOrigin(0,0);
		rankBG.setSize(500,this.rankGridY.width);
		
		this.openRankingWindowButton = Button({
			width:170,
			height:24,
			text:"全てのランキング",
			fontColor:"white",
			fontSize: 20,
			cornerRadius:5,
			fill:"orangered",
			stroke:"darkslateblue",
		}).addChildTo(this.rankingGroup)
		.setOrigin(1,0)
		.setPosition(500,this.rankGridY.span(0))
		.onclick = openRankingWindow;
		
		this.rankingGroup.alpha = 0;
		this.rankingGroup.addChildTo(this);

		// スコアなどの表示領域
		// ステータスの白い背景
		this.displayStatusBG = RectangleShape();
		this.displayStatusBG.fill = "white";
		this.displayStatusBG.stroke = "gray";
		this.displayStatusBG.setPosition(this.gridX.span(14), this.gridY.span(3));
		this.displayStatusBG.setSize(100, 150);
		this.displayStatusBG.alpha = 0.8;
		this.displayStatusBG.addChildTo(this);
		
		// frame
		this.time = options.time;
		this.displayTime = Label("0");
		this.displayTime.fill = 'black';
		this.displayTime.fontSize = 15;
		this.displayTime.setPosition(this.gridX.span(14), this.gridY.span(2));

		this.score = options.score;
		this.displayScore = Label("0");
		this.displayScore.fill = 'black';
		this.displayScore.fontSize = 15;
		this.displayScore.setPosition(this.gridX.span(14), this.gridY.span(3));

		//ゲームのレベル
		this.level = options.level;
		this.displayLevel = Label("0");
		this.displayLevel.fill = 'black';
		this.displayLevel.fontSize = 15;
		this.displayLevel.setPosition(this.gridX.span(14), this.gridY.span(4));

		this.displayTime.text = "time: " + this.time;
		this.displayScore.text = "score: " + this.score;
		this.displayLevel.text = "level: " + this.level;
		
		this.displayTime.addChildTo(this);
		this.displayScore.addChildTo(this);
		this.displayLevel.addChildTo(this);
		
		var self = this;
		
		// ボタン類
		// 用途は変数名を見て
		
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
			var name = $("#input")[0].value;
			
			// 名前が入力されていなければ何もしない
			if(name === ""){
				this.tweener.clear()
				.set({text:"入力してください"})
				.wait(2000)
				.set({text:"登録する"});
				return;
			}
			// 名前が長すぎれば何もしない
			if(name.length > self.MAX_NAME_LENGTH){
				this.tweener.clear()
				.set({text:""+ self.MAX_NAME_LENGTH +"文字までです"})
				.wait(2000)
				.set({text:"登録する"});
				return;
			}
			
			self.scoreJSON.username = name;
			
			// アップロードする
			// 結果をコンソールに表示する
			$.post(self.postURL,
			{
				"username": self.scoreJSON.username,
				"score": self.scoreJSON.score
			},console.log)
			// ボタンを押せない感じにする
			this.tweener.clear()
			.set({
				fill:"gray",
				text:"登録しました",
				onclick:null,
			});
			
			self.update({frame:0});
			self.update = null;
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
		
		// 名前入力エリア表示
		this.nameLabel = [];
		for(var i=0;i<2;i++){
			this.nameLabel[i] = Label('名前を入力してね');
			this.nameLabel[i].x = this.gridX.center()+i;
			this.nameLabel[i].y = this.gridY.span(10)+i;
			this.nameLabel[i].fontSize = 56;
			this.nameLabel[i].width = 400;
			this.nameLabel[i].height = 80;
			this.nameLabel[i].fill = i===1?"white":"black";
			this.nameLabel[i].addChildTo(this);
		}
		$("#input")[0].value = "";
		
		// スコアをjsonオブジェクトにする
		this.scoreJSON = {"time":options.time,"score":options.score,"level":options.level,"username":"あなた"};
		// 配列に入れる
		this.rankingArray = [this.scoreJSON];
		
		// 記録を表示するラベルグループ
		this.recodeLabels = DisplayElement().addChildTo(this.rankingGroup);
		// ランキングを表示する前に読み込み中であることを知らせる
		var rankingLoadingInfo = Label("ランキングを読み込み中です...").addChildTo(this.recodeLabels)
		.setOrigin(0,0)
		.setPosition(5,this.rankGridY.span(0));
		rankingLoadingInfo.fontSize = 20;
		
		// ランキングを取得する
		$.getJSON(this.getURL,
		{},
		function(data) {
			// 取得したランキングに今回のスコアをプッシュする
			data.push(self.scoreJSON);
			// ランキングをソートする
			data.sort(function(a,b){
				return b.score - a.score;
			});
			self.printRecode(data);
		});
	},
	printRecode: function(rankingArray){
		// データが読み込まれていなかった時のラベルを削除してから描画する必要があるため
		// rankingGroupに描画されているrecodeLabelsの要素をクリアする
		this.recodeLabels.children.clear();
		
		var yourRecode = Label("■あなたは"+ (rankingArray.indexOf(this.scoreJSON)+1) +"位でした！■").addChildTo(this.recodeLabels)
		.setOrigin(0,0)
		.setPosition(5,this.rankGridY.span(0));
		yourRecode.fontSize = 20;
		
		// ランク10位まで
		for(var i=0;i<10 && i<rankingArray.length;i++){
			var rank = Label((i===9?"":" ")+(i+1)).addChildTo(this.recodeLabels)
			.setOrigin(0,0)
			.setPosition(5,this.rankGridY.span(i+1));
			var I = Label("位：").addChildTo(this.recodeLabels)
			.setOrigin(0,0)
			.setPosition(30,this.rankGridY.span(i+1));
			var recode = Label(""+ rankingArray[i].score +"点").addChildTo(this.recodeLabels)
			.setOrigin(0,0)
			.setPosition(70,this.rankGridY.span(i+1));
			var name = Label(rankingArray[i].username).addChildTo(this.recodeLabels)
			.setOrigin(0,0)
			.setPosition(170,this.rankGridY.span(i+1));


			rank.fontSize = I.fontSize = recode.fontSize = name.fontSize = 20;

			if(rankingArray[i] === this.scoreJSON){
				rank.fill = I.fill = recode.fill = name.fill = "red";
			}
		}
	},
	update: function(app){
		// 入力エリア右端にカーソルを合わせる
		$("#input")[0].focus();
		var pos = $("#input")[0].value.length;
		$("#input")[0].setSelectionRange(pos,pos);
		
		// 右端に|を点滅させる
		var value = $("#input")[0].value;
		this.nameLabel[0].text = this.nameLabel[1].text = (value === "" ? "名前を入力してね":value) + (app.frame%30 < 15 ? " ":"|");
		
	},
});
