phina.define("GameScene", {
    // 継承
    superClass: 'DisplayScene',

    // 初期化
    init: function (options) {
        // super init
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });

        // 背景
        this.bg = Sprite("bg").addChildTo(this);
        this.bg.origin.set(0, 0); // 左上基準に変更
        this.bg.width = SCREEN_WIDTH;
        this.bg.height = SCREEN_HEIGHT;

        //アイテムの管理
        this.itemGroup = DisplayElement().addChildTo(this);

        //敵の管理
        this.enemyGroup = DisplayElement().addChildTo(this);

        // トマピコ
        this.tomapiko = Tomapiko().addChildTo(this).setPosition(this.gridX.center(), this.gridY.center() - 64);

        // 画面端当たり判定オブジェクト
        this.limit = RectangleShape().addChildTo(this).setPosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        //this.limit.alpha = 0;
        this.limit.fill = "transparent";
        if(DEBUG) this.limit.stroke = "red";
        else this.limit.stroke ="transparent";

        // how to operate
        this.label1 = Label("←→キーで移動, ↑キーまたはスペースでジャンプ");
        this.label1.addChildTo(this);
        this.label2 = Label("ジャンプでゲームスタート");
        this.label2.addChildTo(this);
        this.label1.x = this.gridX.center();
        this.label1.y = this.gridY.center();
        this.label2.x = this.gridX.center();
        this.label2.y = this.gridY.center() + 20;
        this.label1.fill = 'black';
        this.label1.fontSize = 15;
        this.label2.fill = 'black';
        this.label2.fontSize = 15;

        // 都合-1から
        this.frame = -1;

        this.time = 0;
        this.score = 0;
        this.level = 1;
        this.displayTime = Label().addChildTo(this);
        this.displayTime.fill = 'black';
        this.displayTime.fontSize = 15;
        this.displayTime.setPosition(this.gridX.span(14), this.gridY.span(2));

        this.displayScore = Label().addChildTo(this);
        this.displayScore.fill = 'black';
        this.displayScore.fontSize = 15;
        this.displayScore.setPosition(this.gridX.span(14), this.gridY.span(3));

        this.displayLevel = Label().addChildTo(this);
        this.displayLevel.fill = 'black';
        this.displayLevel.fontSize = 15;
        this.displayLevel.setPosition(this.gridX.span(14), this.gridY.span(4));

		this.displayTime.text = "time: " + 0;
		this.displayScore.text = "score: " + 0;
		this.displayLevel.text = "level: " + 1;
		
        //敵の出現頻度をまとめた配列
        this.frequencyGroup = [100, 90, 80, 70, 60, 50, 40, 30]; //frequency[0] ~ [7]
        this.currentFrequencyNum = 0;
        this.frequency = this.frequencyGroup[0];

        //次にレベルの変わるスコア
        this.changeLevel = 1000;

        this.startFlag = false;
        this.endFlag = false;
		

    },

    // 更新
    update: function (app) {
        var self = this; // 関数のスコープに入るのでthisを預けておく
		
        // endFlagが立っていれば終了して次のシーンに移動する
        if (this.endFlag) {
            // トマピコが画面から出たら終わる
            if (this.tomapiko.bottom > SCREEN_HEIGHT) {
				// ResultSceneに引数を渡して終了する
                this.exit("result", {
                    time: this.time,
                    score: this.score,
                    level: this.level,
                });
            } else {
				// トマピコが左右からはみ出さないようにする
                var tx = this.tomapiko.x;
                this.tomapiko.x = tx < SCREEN_WIDTH ? (tx > 0 ? tx : 0) : SCREEN_WIDTH;
            }
			return;
        }


        // 上キーを押したらゲームが開始するようにする
        // それ以外の場合は何もしない
		// すでに開始していた場合は見えない
        if (app.keyboard.getKey("up") || app.keyboard.getKey("space")) {
			// ラベルは1秒かけて透明になりながら上昇する
			this.label1.tweener.to({alpha:0,y:this.label1.y-30},1000).call(function(){self.label1.remove();});
			this.label2.tweener.to({alpha:0,y:this.label2.y-30},1000).call(function(){self.label2.remove();});
            this.startFlag = true;
        }

        // startFlagが立っていればフレームを進めて，表示する
        // startFlagが立っていなければreturnする
        if (this.startFlag) {
            this.frame++;
			this.time = Math.floor(this.frame/30);
            this.displayTime.text = "time: " + this.time;
            this.displayScore.text = "score: " + this.score;
            this.displayLevel.text = "level: " + this.level;
            this.tomapiko.startFlag = true;
        } else {
            return;
        }

        // 矢印キーの方向を取得する
        var dir = app.keyboard.getKeyDirection();

        // スペースキーを押した時，上キーを押した時と同じ状態にする
        if (app.keyboard.getKey("space")) {
            dir.y = -1;
        }

        // トマピコを矢印キーの方向に基づいて移動させる
        this.tomapiko.move(dir);

        // 画面に存在する全ての敵に対して
        this.enemyGroup.children.each(function (elm) {
            // 画面から見えなくなったら敵をグループから削除する
            if (elm.bottom < 0 || elm.top > SCREEN_HEIGHT || elm.left > SCREEN_WIDTH || elm.right < 0) {
                elm.remove();
            }
        });

        // 画面に存在する全てのアイテムに対して
        this.itemGroup.children.each(function (elm) {
            // 画面から見えなくなったらアイテムをグループから削除する
            if (elm.bottom < 0 || elm.top > SCREEN_HEIGHT || elm.left > SCREEN_WIDTH || elm.right < 0) {
                elm.remove();
			}
        });


		// 敵
        // 指定フレーム毎に
        if (this.frame % this.frequency === 0) {
            // 敵をランダムな方向に動くように出現させる
			// 敵の種類を決める乱数
			var randomNum = Random.randint(1, 100);
			// 敵が出現する方向
			var dir = Random.randint(0,3);
            if (this.level === 1) {
                // enemy0: 100%, enemy1: 0%, enemy2: 0%, enemy3: 0% | 0: 横のみ
                if (randomNum <= 100) {
                    var dir = Random.randint(2,3);
                    var enemy = Enemy(dir, 0, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                }
            } else if (this.level === 2) {
                // enemy0: 100%, enemy1: 0%, enemy2: 0%, enemy3: 0% | 0: 横縦混同
                if (randomNum <= 100) {
                    var enemy = Enemy(dir, 0, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                }
            } else if (this.level === 3) {
                // enemy0: 70%, enemy1: 30%, enemy2: 0%, enemy3: 0% | 0: 横縦混同, 1: 横のみ
                if (randomNum <= 70) {
                    var enemy = Enemy(dir, 0, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                } else if (randomNum <= 100) {
                    var dir = Random.randint(2,3);
                    var enemy = Enemy(dir, 1, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                }
            } else if (this.level === 4 || this.level === 5) {
                // enemy0: 70%, enemy1: 30%, enemy2: 0%, enemy3: 0% | 0: 横縦混同, 1: 横縦混同
                if (randomNum <= 30) {
                    var enemy = Enemy(dir, 0, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                } else if (randomNum <= 40) {
                    var enemy = Enemy(dir, 1, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                }
            } else if (this.level === 6) {
                // enemy0: 60%, enemy1: 0%, enemy2: 40%, enemy3: 0% | 0: 縦横混同, 2: 横縦混同
                if (randomNum <= 60) {
                    var enemy = Enemy(dir, 0, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                } else if (randomNum <= 100) {
                    var enemy = Enemy(dir, 2, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
                }
            } else if (this.level === 7) {
                // enemy0: 20%, enemy1: 0%, enemy2: 80%, enemy3: 0% | 0: 縦横混同, 2: 横縦混同
                if (randomNum <= 20) {
                    var enemy = Enemy(dir, 0, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
                } else if (randomNum <= 100) {
                    var enemy = Enemy(dir, 2, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
                }
            } else if (this.level === 8) {
                // enemy0: 0%, enemy1: 100%, enemy2: 0%, enemy3: 0% | 1: 縦横混同 プレイヤー(x,y)
                var enemy = Enemy(dir, 1, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
            }else if(this.level === 9){
                // enemy0: 0%, enemy1: 90%, enemy2: 0%, enemy3: 10% | 1: 縦横混同 プレイヤー(x,y), 3: 縦横混同
                if (randomNum <= 90) {
                    var enemy = Enemy(dir, 1, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
                } else if (randomNum <= 100) {
                    var enemy = Enemy(dir, 3, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                }
            } else if(this.level >= 10){
                // enemy0: 50%, enemy1: 20%, enemy2: 20%, enemy3: 10% | 0: 縦横混同 プレイヤー(x,y), 1: 縦横混同 プレイヤー(x,y), 2: 横縦混同, 3: 縦横混同
                if (randomNum <= 50) {
                    var enemy = Enemy(dir, 0, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
                } else if (randomNum <= 70) {
                    var enemy = Enemy(dir, 1, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
                } else if (randomNum <= 90) {
                    var enemy = Enemy(dir, 2, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                } else if (randomNum <= 100) {
                    var enemy = Enemy(dir, 3, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
                }
            }
        }

		// アイテム
        //指定フレームごとに
        if (this.frame % 100 == 0 && this.frame !== 0) {
            // アイテムをランダムな方向に動くように出現させる
            // item0: 65%, item1: 20%, item2: 10%, item3: 5%
			// アイテムが出現する方向
			var dir = Random.randint(0,3);
            if (this.level < 3)
                var item = Item(dir, Random.randint(1, 65)).addChildTo(this.itemGroup);
            else if (this.level < 5)
                var item = Item(dir, Random.randint(1, 85)).addChildTo(this.itemGroup);
            else if (this.level < 10)
                var item = Item(dir, Random.randint(1, 95)).addChildTo(this.itemGroup);
            else
                var item = Item(dir, Random.randint(1, 100)).addChildTo(this.itemGroup);
        }


        // scoreがchangeLevelに格納された値を越えたらlevelを上げる
        if (this.score >= this.changeLevel) {
            this.level++;
            // 出現頻度をレベル5上がるごとに更新
            if(this.level % 5 === 0){
                this.currentFrequencyNum = Math.min(this.currentFrequencyNum+1, this.frequencyGroup.length-1);
                this.frequency = this.frequencyGroup[this.currentFrequencyNum];
            }

            this.changeLevel += 1000;
        }


        // トマピコの当たり判定を計算して専用の矩形を作る
        var tomapikoCollision = Circle(this.tomapiko.x, this.tomapiko.y, this.tomapiko.COLLISION.radius);

        // トマピコが敵と当たったらendFlagを立てる
        this.enemyGroup.children.each(function (elm) {
            var enemyCollision = Circle(elm.x, elm.y, elm.width / 2); // 同じく敵の当たり判定を取り出す
            if (Collision.testCircleCircle(tomapikoCollision, enemyCollision)) {
                self.endFlag = true;
                self.tomapiko.animation.gotoAndPlay("damage");
                SoundManager.play("fall");
            }
        });

        // トマピコがアイテムと当たったらthis.scoreにアイテムの持つscoreを追加する
        this.itemGroup.children.each(function (elm) {
            var itemCollision = Circle(elm.x, elm.y, elm.width / 2); // 同じく敵の当たり判定を取り出す
            if (Collision.testCircleCircle(tomapikoCollision, itemCollision)) {
                self.score += elm.getScore();
                if (DEBUG) console.log("item hit!");
                elm.remove();
                SoundManager.play("get");
            }
        });
    },

});
