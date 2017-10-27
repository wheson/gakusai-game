phina.define("Item", {
    superClass: "RectangleShape",
    init: function (dir) {
        this.superInit();
        this.direction = dir;

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

        // 方向で色を変更
        this.color = enemyColors[this.direction];

        //大きさを指定
        this.setSize(20,20);

		this.COLLISION = CircleShape().addChildTo(this);
		this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'cyan';
        this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = this.width/2;

    },

    update: function () {
        if (this.direction === UP) {
            this.y--;
        } else if (this.direction === DOWN) {
            this.y++;
        } else if (this.direction === RIGHT) {
            this.x++;
        } else if (this.direction === LEFT) {
            this.x--;
        }

    },

    getColor: function () {
        return this.color;
    },
})
