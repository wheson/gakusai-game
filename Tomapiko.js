phina.define("Tomapiko", {

    superClass: "Sprite",

    FRAME_INDEX_STAY: 0,
    FRAME_INDEX_WALKING_1: 12,
    FRAME_INDEX_WALKING_2: 13,
    FRAME_INDEX_JUMPING_1: 1,
    FRAME_INDEX_JUMPING_2: 2,

    START_X: 400,
    START_Y: 400,

    init: function () {
        this.superInit('tomapiko', 64, 64);
        this.frame = 0;
        this.frameIndex = 0;
        //this.physical.gravity.set(0, 0.1);

        this.COLLISION = RectangleShape().addChildTo(this);
        this.COLLISION.fill = 'transparent';
        this.COLLISION.stroke = 'red';
        this.COLLISION.strokeWidth = 0;
        if (DEBUG) this.COLLISION.strokeWidth = 1;
        this.COLLISION.y = 6;
        this.COLLISION.setSize(10, 50);

        this.falling = false;

    },

    update: function (dir) {
        if (this.startFlag) {
            this.frame++;
            this.checkFalling();
        }
    },

    move: function (dir) {

        if (dir.x > 0 && this.x <= SCREEN_WIDTH) this.goRight();
        else if (dir.x < 0 && this.x >= 0) this.goLeft();
        else this.physical.velocity.x = 0;

        if (dir.y < 0) this.jump();

        if (this.y <= 0) {
            this.physical.velocity.y = 0;
        }

        if (this.falling === false && dir.x === 0) {
            this.frameIndex = this.FRAME_INDEX_STAY;
        }

        if (this.frame % 4 !== 0) return;

        if (this.falling) {
            if (this.frameIndex == this.FRAME_INDEX_JUMPING_1)
                this.frameIndex = this.FRAME_INDEX_JUMPING_2;
            else this.frameIndex = this.FRAME_INDEX_JUMPING_1;
        } else if (dir.x !== 0) {
            if (this.frameIndex == this.FRAME_INDEX_WALKING_1)
                this.frameIndex = this.FRAME_INDEX_WALKING_2;
            else this.frameIndex = this.FRAME_INDEX_WALKING_1;
        }
    },

    jump: function () {
        //コメントアウトで無限ジャンプ
        //if (this.falling === true) return;

        /* if(collide) velocity.y = 0;
         * else velocity.y = -JUMP_SPEED; */

        this.physical.velocity.y = -JUMP_SPEED;
        /*
                col = this.getColRect(phina.geom.Vector2(0, -1));
                blocks.children.some(function (block) {
                    if (block.hitTestElement(col) === false) return;
                    this.physical.velocity.y = 0;
                }, this);*/

    },

    goLeft: function () {
        /* if(collide) velocity.x = 0;
         * else velocity.x = -WALK_SPEED; */

        this.physical.velocity.x = -WALK_SPEED;
        this.scaleX = 1;
        /*
                col = this.getColRect(phina.geom.Vector2(-1, 0));
                blocks.children.some(function (block) {
                    if (block.hitTestElement(col) === false) return;
                    if (DEBUG) console.log("tomapiko's left hit block's right");
                    this.physical.velocity.x = 0;
                }, this);*/

    },

    goRight: function () {
        /* if(collide) velocity.x = 0;
         * else velocity.x = WALK_SPEED; */

        this.physical.velocity.x = WALK_SPEED;
        this.scaleX = -1;
        /*
                col = this.getColRect(phina.geom.Vector2(1, 0));
                blocks.children.some(function (block) {
                    if (block.hitTestElement(col) === false) return;
                    if (DEBUG) console.log("tomapiko's right hit block's left");
                    this.physical.velocity.x = 0;
                }, this);*/

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
        /*
                col = this.getColRect(phina.geom.Vector2(0, 1));
                blocks.children.some(function (block) {
                    if (block.hitTestElement(col) == false) return;

                    // going up (just after jump)
                    if (this.physical.velocity.y < 0) {
                        if (DEBUG) console.log("tomapiko's top hit block's bottom");
                        // めり込む少し手前にワープ (少し := GRAVITY/2)
                        // (this.y + this.col.top) := block.bottom + GRAVITY / 2
                        this.y = -this.COLLISION.top + block.bottom + GRAVITY / 2;
                        this.physical.velocity.y = 0;
                    }

                    // going down
                    else {
                        if (DEBUG) console.log("tomapiko's bottom hit block's top");
                        // (this.y + this.col.bottom) := block.top - GRAVITY / 2
                        this.y = -this.COLLISION.bottom + block.top - GRAVITY / 2;
                        this.physical.velocity.y = 0;
                        this.physical.gravity.y = 0;
                        this.falling = false;
                    }

                }, this);
        */
        //console.log(this.y + this.COLLISION.bottom);
        if (DEBUG)
            if (this.falling) console.log("falling");

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
