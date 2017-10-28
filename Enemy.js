phina.define("Enemy", {
    superClass: "Sprite",
    init: function (dir, level, x, y) {
        this.superInit("enemy" + Random.randint(0,3),32,32);
		this.width = 64;
		this.height = 64;
		
        this.direction = dir;
		
        this.level = level;

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
        this.color = enemyColors[this.direction];
        this.fill = this.color;

        this.COLLISION = CircleShape().addChildTo(this);
        this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'yellow';
		this.COLLISION.strokeWidth = 0;
        if(DEBUG)this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = this.width / 3;
		
    },

    update: function () {
        if (this.direction === UP) {
            this.y -= 1 + this.level * 0.2;
        } else if (this.direction === DOWN) {
            this.y += 1 + this.level * 0.2;
        } else if (this.direction === RIGHT) {
            this.x += 1 + this.level * 0.2;
        } else if (this.direction === LEFT) {
            this.x -= 1 + this.level * 0.2;
        }

    },
})
