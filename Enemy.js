phina.define("Enemy", {
    superClass: "Sprite",
    init: function (dir, enemyNum, level, x, y) {
		// 敵番号を設定
        this.enemyNum = enemyNum;
		// 敵の画像を読み込む
        this.superInit("enemy" + this.enemyNum, 32, 32);
		// サイズ変更
        this.width = 64;
        this.height = 64;
		// 方向を設定する
        this.direction = dir;
		// レベルを設定する
        this.level = level;

		// 敵が動くスピードの初期値
        this.speed = 1;
		
        // ステージレベルがn*10+1以上の時speedをn*0.2追加する
        if (this.level >= 11){
            this.speed += ((this.level - 1) / 10) * 0.2;
		}
		
		// 黒いお化けの場合は移動距離、方向転換距離を設定する
		if(this.enemyNum === 2){
			this.distance = 1;
			this.changeDistance = 300;
			this.plusDistance = 200;
		}

		// スプライトシートを適用する
        this.animation = FrameAnimation("enemySS").attachTo(this);
		// サイズを変更しない
        this.animation.fit = false;

        // 方向によって出現位置を設定
		// アニメーションを設定する
        if (this.direction === UP) {
            this.x = x;
            this.y = SCREEN_HEIGHT;
            this.animation.gotoAndPlay("UP");
        } else if (this.direction === DOWN) {
            this.x = x;
            this.y = 0;
            this.animation.gotoAndPlay("DOWN");
        } else if (this.direction === RIGHT) {
            this.x = 0;
            this.y = y;
            this.animation.gotoAndPlay("RIGHT");
        } else if (this.direction === LEFT) {
            this.x = SCREEN_WIDTH;
            this.y = y;
            this.animation.gotoAndPlay("LEFT");
        }

		// 当たり判定枠
        this.COLLISION = CircleShape().addChildTo(this);
        this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'yellow';
        this.COLLISION.strokeWidth = 0;
        if (DEBUG) this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = this.width / 3;

    },

    update: function () {
        if (this.enemyNum === 0) {
            // 白いお化け
            // 出現した向きに一定速度で直進する
            if (this.direction === UP) {
                this.y -= this.speed;
            } else if (this.direction === DOWN) {
                this.y += this.speed;
            } else if (this.direction === RIGHT) {
                this.x += this.speed;
            } else if (this.direction === LEFT) {
                this.x -= this.speed;
            }
        } else if (this.enemyNum === 1) {
            // 青いお化け
            // 出現した向きに加速度0.1で直進する
            if (this.direction === UP) {
                this.y -= this.speed;
            } else if (this.direction === DOWN) {
                this.y += this.speed;
            } else if (this.direction === RIGHT) {
                this.x += this.speed;
            } else if (this.direction === LEFT) {
                this.x -= this.speed;
            }
            this.speed += 0.1;
        } else if (this.enemyNum === 2) {
            // 黒いお化け
            // 200フレーム経過で方向転換する
            // 加速度0.01
            if (this.direction === UP) {
                this.y -= this.speed;
            } else if (this.direction === DOWN) {
                this.y += this.speed;
            } else if (this.direction === RIGHT) {
                this.x += this.speed;
            } else if (this.direction === LEFT) {
                this.x -= this.speed;
            }
			// 移動距離が方向転換距離以上になったら方向転換し、次回の方向転換距離を更新する
            if (this.distance >= this.changeDistance) {
                this.randomChangeDirection();
                this.changeDistance += this.plusDistance;
                this.plusDistance += 50;
            }
            this.speed += 0.01;
            this.distance += this.speed;
        } else if (this.enemyNum === 3) {
            // 紫のお化け
            // 加速度0.5で直進する
            if (this.direction === UP) {
                this.y -= this.speed;
            } else if (this.direction === DOWN) {
                this.y += this.speed;
            } else if (this.direction === RIGHT) {
                this.x += this.speed;
            } else if (this.direction === LEFT) {
                this.x -= this.speed;
            }
            this.speed += 0.5;
        }
    },

    randomChangeDirection: function () {
		// 現在の移動方向以外の方向に変更し、アニメーションを変更する
        var newDirection;
        do {
            newDirection = Random.randint(0, 3);
        } while (this.direction === newDirection);
        this.direction = newDirection;
        if (this.direction === UP) {
            this.animation.gotoAndPlay("UP");
        } else if (this.direction === DOWN) {
            this.animation.gotoAndPlay("DOWN");
        } else if (this.direction === RIGHT) {
            this.animation.gotoAndPlay("RIGHT");
        } else if (this.direction === LEFT) {
            this.animation.gotoAndPlay("LEFT");
        }
    },

    inversionChangeDirection: function () {
		// 後ろを向く
        if (this.direction === UP) this.direction = DOWN;
        else if (this.direction === DOWN) this.direction = UP;
        else if (this.direction === RIGHT) this.direction = LEFT;
        else if (this.direction === LEFT) this.direction = RIGHT;

        if (this.direction === UP) {
            this.animation.gotoAndPlay("UP");
        } else if (this.direction === DOWN) {
            this.animation.gotoAndPlay("DOWN");
        } else if (this.direction === RIGHT) {
            this.animation.gotoAndPlay("RIGHT");
        } else if (this.direction === LEFT) {
            this.animation.gotoAndPlay("LEFT");
        }
    },

    removeEnemy: function(){
        var self = this; // 関数のスコープに入るのでthisを預けておく
        // enemyを1秒かけて透明にし，removeする
        this.tweener.to({
                alpha: 0,
            }, 1000).call(function () {
                self.remove();
            });
    },

});
