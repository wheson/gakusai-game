phina.define("Item", {
    superClass: "Sprite",
    init: function (dir, randomNum) {
        if(randomNum <= 65){
            this.itemNum = 0;
        }else if(randomNum <= 85){
            this.itemNum = 1;
        }else if(randomNum <= 95){
            this.itemNum = 2;
        }else{
            this.itemNum = 3;
        }
        this.superInit("item" + this.itemNum,24,24);
		this.setSize(20,20);
        this.direction = dir;

        this.frame = -1;

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
        if(DEBUG)this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = this.width / 2;

		// アイテムの得点を設定
        if(this.itemNum === 0){
            this.score = 100;
            this.speedLevel = 0;
        }else if(this.itemNum === 1){
            this.score = 200;
            this.speedLevel = 1;
        }else if(this.itemNum === 2){
            this.score = 500;
            this.speedLevel = 5;
        }else if(this.itemNum === 3){
            this.score = 1000;
            this.speedLevel = 10;
        }

		
	},

    update: function () {
        if (this.direction === UP) {
            this.y -= 1 + this.speedLevel * 0.5;
        } else if (this.direction === DOWN) {
            this.y += 1 + this.speedLevel * 0.5;
        } else if (this.direction === RIGHT) {
            this.x += 1 + this.speedLevel * 0.5;
        } else if (this.direction === LEFT) {
            this.x -= 1 + this.speedLevel * 0.5;
        }

        this.frame++;
    },

    getScore: function () {
        return this.score;
    }
})
