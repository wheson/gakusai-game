phina.define("Tomapiko", {
    superClass: "Sprite",

    init: function () {
        this.superInit('tomapiko', 64, 64);
		// スプライトシート適用
        this.animation = FrameAnimation("tomapikoSS").attachTo(this);
		// 羽ばたきアニメーション
		this.animation.gotoAndPlay("flap");

		// 当たり判定枠
        this.COLLISION = CircleShape();
        if(DEBUG){
			this.COLLISION.fill = 'transparent';
			this.COLLISION.stroke = 'yellow';
			this.COLLISION.strokeWidth = 2;
		}else{
			this.COLLISION.alpha = 0;
		}
        this.COLLISION.radius = 15;
		this.COLLISION.addChildTo(this);

		// 定数
		this.jumpSpeed = 8;
		this.walkSpeed = 4;
		this.gravity = 0.3;

		// 連続ジャンプ防止用変数
		this.prejump = false;
    },

    update: function (dir) {
        // スタートするまでは動かないでほしいので、動きに関する部分はstartFlagが立つまで何もしない
        if (this.startFlag) {
            this.checkFalling();
        }
    },

    move: function (dir) {
		// 左右の移動
        if (dir.x > 0 && this.x <= SCREEN_WIDTH) this.goRight();
        else if (dir.x < 0 && this.x >= 0) this.goLeft();
        else this.physical.velocity.x = 0;

		// ジャンプ
        if (dir.y < 0){
			// 直前にジャンプ入力していなければジャンプする
			if(!this.prejump){
				this.jump();
				this.prejump = true;
			}
		}else{
			this.prejump = false;
		}

		// 天井にぶつかっていればy速度を0にする
        if (this.y <= 0) {
            this.physical.velocity.y = 0;
        }
    },

    jump: function () {
		// y速度を上方向にする
        this.physical.velocity.y = -this.jumpSpeed;
		SoundManager.play("jump");
    },

    goLeft: function () {
		// x速度を左方向にする
        this.physical.velocity.x = -this.walkSpeed;
		// 横方向の拡大倍率を1にする(左向き)
        this.scaleX = 1;
    },

    goRight: function () {
        // x速度を右方向にする
        this.physical.velocity.x = this.walkSpeed;
		// 横方向の拡大倍率を-1にする(右向き)
        this.scaleX = -1;
    },

    checkFalling: function () {
		// を下方向にする
        this.physical.gravity.y = this.gravity;

		// 下端に触れていればyをSCREEN_HEIGHTにし、gravityを0にする
		// 画面の下に落ちていくのを防ぐ
        if (this.y > SCREEN_HEIGHT) {
			this.y = SCREEN_HEIGHT;
            this.physical.gravity.y = 0;
        }
    },
});
