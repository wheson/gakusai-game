phina.define("Tomapiko", {

    superClass: "Sprite",

    FRAME_INDEX_STAY: 0,
    FRAME_INDEX_WALKING_1: 12,
    FRAME_INDEX_WALKING_2: 13,
    FRAME_INDEX_JUMPING_1: 1,
    FRAME_INDEX_JUMPING_2: 2,


    init: function () {
        this.superInit('tomapiko', 64, 64);
        this.animation = FrameAnimation("tomapikoSS").attachTo(this);
		this.animation.gotoAndPlay("flap");
        //this.physical.gravity.set(0, 0.1);

        this.COLLISION = CircleShape().addChildTo(this);
        this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'red';
		this.COLLISION.strokeWidth = 0;
        if(DEBUG)this.COLLISION.strokeWidth = 2;
        this.COLLISION.radius = 15;

        this.falling = false;
		this.prejump = false;
    },

    update: function (dir) {
        // スタートするまでは動かないでほしいので、動きに関する部分はstartFlagが立つまで何もしない
        if (this.startFlag) {
            this.checkFalling();
        }
    },

    move: function (dir) {

        if (dir.x > 0 && this.x <= SCREEN_WIDTH) this.goRight();
        else if (dir.x < 0 && this.x >= 0) this.goLeft();
        else this.physical.velocity.x = 0;

        if (dir.y < 0){
			if(!this.prejump){
				this.jump();
				this.prejump = true;
			}
		}else{
			this.prejump = false;
		}

        if (this.y <= 0) {
            this.physical.velocity.y = 0;
        }

        if (this.falling === false && dir.x === 0) {
            this.frameIndex = this.FRAME_INDEX_STAY;
        }

    },

    jump: function () {
        //コメントアウトで無限ジャンプ
        //if (this.falling === true) return;

        /* if(collide) velocity.y = 0;
         * else velocity.y = -JUMP_SPEED; */

        this.physical.velocity.y = -JUMP_SPEED;
		SoundManager.play("jump");
    },

    goLeft: function () {
        /* if(collide) velocity.x = 0;
         * else velocity.x = -WALK_SPEED; */

        this.physical.velocity.x = -WALK_SPEED;
        this.scaleX = 1;
    },

    goRight: function () {
        /* if(collide) velocity.x = 0;
         * else velocity.x = WALK_SPEED; */

        this.physical.velocity.x = WALK_SPEED;
        this.scaleX = -1;
    },

    checkFalling: function () {
        /* if(collide) falling = true;
         * else falling = false; */

        this.physical.gravity.y = GRAVITY;
        this.falling = true;

        if (this.y >= SCREEN_HEIGHT) {
            this.physical.velocity.y = 0;
            this.physical.gravity.y = 0;
            this.falling = false;
        }
    },

    getColRect: function (dir) {
        rect = RectangleShape();

        var vx = 0;
        var vy = 0;
        // ((d>0 && v>0) || (d<0 && v<0))
        if (dir.x * this.physical.velocity.x > 0) {
            vx = this.physical.velocity.x;
        }
        if (dir.y * this.physical.velocity.y > 0) {
            vy = this.physical.velocity.y + GRAVITY;
        } else if (dir.y > 0) {
            vy = GRAVITY;
        }

        rect.position.x = this.x + this.COLLISION.x + vx;
        rect.position.y = this.y + this.COLLISION.y + vy;
        rect.setSize(this.COLLISION.width, this.COLLISION.height);

        return rect;
    },


});
