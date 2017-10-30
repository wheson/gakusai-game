phina.define("Enemy", {
    superClass: "Sprite",
    init: function (dir, enemyNum, level, x, y) {
        this.enemyNum = enemyNum;
        this.superInit("enemy" + String(this.enemyNum), 32, 32);
        this.width = 64;
        this.height = 64;

        this.direction = dir;

        this.level = level;

        this.speed = 1;
        // ステージレベルが10以上の時speedを(レベル - 9)*0.4追加する
        if (this.level >= 10)
            this.speed += (this.level - 9) * 0.4;

        this.frame = 1;

        this.animation = FrameAnimation("enemySS").attachTo(this);
        this.animation.fit = false;

        // 方向によって出現位置を設定
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

            if (this.frame % 100 === 0) {
                this.randomChangeDirection();
            }
            this.speed += 0.01;
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

        this.frame++;
    },

    randomChangeDirection: function () {
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

    inversionChangeDirection: function(){
        if(this.direction === UP) this.direction = DOWN;
        else if(this.direction === DOWN) this.direction = UP;
        else if(this.direction === RIGHT) this.direction = LEFT;
        else if(this.direction === LEFT) this.direction = RIGHT;

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
})
