phina.define("Item", {
    superClass: "Sprite",
    init: function (dir, randomNum) {
		// randomNumの値によってアイテムの種類を決定する
        if (randomNum <= 65) {
            this.itemNum = 0;
        } else if (randomNum <= 85) {
            this.itemNum = 1;
        } else if (randomNum <= 95) {
            this.itemNum = 2;
        } else {
            this.itemNum = 3;
        }

		// アイテムの画像を読み込む
        this.superInit("item" + this.itemNum, 24, 24);
		// 方向を設定する
        this.direction = dir;
		// アイテムが動くスピードの初期値
        this.speed = 1;

		// アイテムが表示されたフレーム数
        this.frame = 0;

        // 方向によって出現位置を設定
        if (this.direction === UP) {
            this.x = Random.randint(80, SCREEN_WIDTH - 80);
            this.y = SCREEN_HEIGHT;
        } else if (this.direction === DOWN) {
            this.x = Random.randint(80, SCREEN_WIDTH - 80);
            this.y = 0;
        } else if (this.direction === RIGHT) {
            this.x = 0;
            this.y = Random.randint(80, SCREEN_HEIGHT - 80);
        } else if (this.direction === LEFT) {
            this.x = SCREEN_WIDTH;
            this.y = Random.randint(80, SCREEN_HEIGHT - 80);
        }

		// 当たり判定枠
        this.COLLISION = CircleShape().addChildTo(this);
        this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'yellow';
        this.COLLISION.strokeWidth = 0;
        if (DEBUG) this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = this.width / 2;

        // アイテムの得点を設定
        if (this.itemNum === 0) {
            this.score = 100;
        } else if (this.itemNum === 1) {
            this.score = 300;
        } else if (this.itemNum === 2) {
            this.score = 500;
			// 表示されてから消滅するまでのフレーム数
            this.removeFrame = 600;
        } else if (this.itemNum === 3) {
            this.score = 1000;
        }


    },

    update: function () {
        if (this.itemNum === 0) { //item0の設定
			// 変位1で直進する
            if (this.direction === UP) {
                this.y -= this.speed;
            } else if (this.direction === DOWN) {
                this.y += this.speed;
            } else if (this.direction === RIGHT) {
                this.x += this.speed;
            } else if (this.direction === LEFT) {
                this.x -= this.speed;
            }
        } else if (this.itemNum === 1) { //item1の設定
			// 加速度0.02で直進する
            if (this.direction === UP) {
                this.y -= this.speed;
            } else if (this.direction === DOWN) {
                this.y += this.speed;
            } else if (this.direction === RIGHT) {
                this.x += this.speed;
            } else if (this.direction === LEFT) {
                this.x -= this.speed;
            }
            this.speed += 0.02;
        } else if (this.itemNum === 2) { //item2の設定
            // frameがremoveFrameになったら自身を消す
            if (this.frame === this.removeFrame) {
                // 画面外の座標
                var toX = Random.randint(-10, 10) * SCREEN_WIDTH;
                var toY = Random.randint(-10, 10) * SCREEN_HEIGHT;
                // callでremoveするためにthisを預ける
                var self = this;
                // ランダムな位置に高速移動し、自身をremoveする
                this.tweener.clear()
                    .to({
                        x: toX,
                        y: toY
                    }, 500, "easeInOutQuint")
                    .call(function () {
                        self.remove();
                    });
            } else if (this.frame % 90 === 0) { // 90フレーム経過で高速移動する
                var toX = Random.randint(80, SCREEN_WIDTH - 80);
                var toY = Random.randint(80, SCREEN_HEIGHT - 80);
                // ランダムな位置に高速移動する
                this.tweener.clear()
                    .to({
                        x: toX,
                        y: toY
                    }, 500, "easeInOutQuint");
            }
        } else if (this.itemNum === 3) { //item3の設定
			// 変位5で直進する
            if (this.direction === UP) {
                this.y -= this.speed + 5;
            } else if (this.direction === DOWN) {
                this.y += this.speed + 5;
            } else if (this.direction === RIGHT) {
                this.x += this.speed + 5;
            } else if (this.direction === LEFT) {
                this.x -= this.speed + 5;
            }
        }
		// フレームを更新する
        this.frame++;
    },
});
