phina.define("Item", {
    superClass: "Sprite",
    init: function (dir, randomNum) {
        if (randomNum <= 65) {
            this.itemNum = 0;
        } else if (randomNum <= 85) {
            this.itemNum = 1;
        } else if (randomNum <= 95) {
            this.itemNum = 2;
        } else {
            this.itemNum = 3;
        }

        this.superInit("item" + this.itemNum, 24, 24);
        this.setSize(20, 20);
        this.direction = dir;
        this.speed = 1;

        this.frame = 0;

        // 方向によって出現位置を設定
        if (this.direction === UP) {
            this.x = Random.randint(0, SCREEN_WIDTH);
            this.y = SCREEN_HEIGHT;
        } else if (this.direction === DOWN) {
            this.x = Random.randint(0, SCREEN_WIDTH);
            this.y = 0;
        } else if (this.direction === RIGHT) {
            this.x = 0;
            this.y = Random.randint(0, SCREEN_HEIGHT);
        } else if (this.direction === LEFT) {
            this.x = SCREEN_WIDTH;
            this.y = Random.randint(0, SCREEN_HEIGHT);
        }


        this.COLLISION = CircleShape().addChildTo(this);
        this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'yellow';
        this.COLLISION.strokeWidth = 0;
        if (DEBUG) this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = this.width / 2;

        // アイテムの得点を設定
        if (this.itemNum === 0) {
            this.score = 100;
            this.removeFrame = -1;
        } else if (this.itemNum === 1) {
            this.score = 300;
            this.removeFrame = -1;
        } else if (this.itemNum === 2) {
            this.score = 500;
            this.removeFrame = 600;
        } else if (this.itemNum === 3) {
            this.score = 1000;
            this.removeFrame = -1;
        }


    },

    update: function () {
        //item0の設定
        if (this.itemNum === 0) {
            if (this.direction === UP) {
                this.y -= this.speed;
            } else if (this.direction === DOWN) {
                this.y += this.speed;
            } else if (this.direction === RIGHT) {
                this.x += this.speed;
            } else if (this.direction === LEFT) {
                this.x -= this.speed;
            }
            //item1の設定
        } else if (this.itemNum === 1) {
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
            //item2の設定
        } else if (this.itemNum === 2) {
            // removeFrameをframeが越えると自身を消す
            if (this.frame === this.removeFrame){
				// 画面外の座標
                var toX = Random.randint(-10, 10)*SCREEN_WIDTH;
                var toY = Random.randint(-10, 10)*SCREEN_HEIGHT;
				// callでremoveするためにthisを預ける
				var self = this;
				// ランダムな位置に高速移動し、自信をremoveする
				this.tweener.clear()
				.to({x:toX,y:toY},500,"easeInOutQuint")
				.call(function(){self.remove();});
			}else if (this.frame % 90 === 0) {
                var toX = Random.randint(0, SCREEN_WIDTH);
                var toY = Random.randint(0, SCREEN_HEIGHT);
				// ランダムな位置に高速移動する
				this.tweener.clear()
				.to({x:toX,y:toY},500,"easeInOutQuint");
            }
            //item3の設定
        } else if (this.itemNum === 3) {
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

        this.frame++;
    },

    getScore: function () {
        return this.score;
    }
})
