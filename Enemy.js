phina.define("Enemy", {
    superClass: "Sprite",
    init: function (dir, enemyNum, level, x, y) {
        this.enemyNum = enemyNum;
        this.superInit("enemy" + String(this.enemyNum), 32, 32);
        this.width = 64;
        this.height = 64;

        this.direction = dir;

        this.level = level;
        this.speed = 1 + this.level * 0.4;

        this.time = 0;

        var animation = FrameAnimation("enemySS").attachTo(this);
        animation.fit = false;

        // 方向によって出現位置を設定
        if (this.direction === UP) {
            this.x = x;
            this.y = SCREEN_HEIGHT;
            animation.gotoAndPlay("UP");
        } else if (this.direction === DOWN) {
            this.x = x;
            this.y = 0;
            animation.gotoAndPlay("DOWN");
        } else if (this.direction === RIGHT) {
            this.x = 0;
            this.y = y;
            animation.gotoAndPlay("RIGHT");
        } else if (this.direction === LEFT) {
            this.x = SCREEN_WIDTH;
            this.y = y;
            animation.gotoAndPlay("LEFT");
        }

        // 方向で色を変更
        //this.color = enemyColors[this.direction];
        //this.fill = this.color;

        this.COLLISION = CircleShape().addChildTo(this);
        this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'yellow';
        this.COLLISION.strokeWidth = 0;
        if (DEBUG) this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = this.width / 3;

    },

    update: function () {
        if (this.enemyNum === 0) {
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

        } else if (this.enemyNum === 3) {

        }

        this.time++;
    },
})
