phina.define("GameScene", {
    // 継承
    superClass: 'DisplayScene',

    // 初期化
    init: function (options) {
        // super init
        this.superInit(options);

        // 背景
        this.bg = Sprite("bg").addChildTo(this);
        this.bg.origin.set(0, 0); // 左上基準に変更
        this.bg.width = SCREEN_WIDTH;
        // block
        blocks.addChildTo(this);
        block0 = RectangleShape().addChildTo(blocks);
        block0.setPosition(380, 440);
        block0.setSize(50, 20);
        block0.fill = 'red';
        block1 = Block().addChildTo(blocks);
        block1.setPosition(500, 350);
        block1.setSize(50, 20);
        block2 = Block().addChildTo(blocks);
        block2.setPosition(250, 130);
        block2.setSize(50, 20);
        block3 = Block().addChildTo(blocks);
        block3.setPosition(100, 40);
        block3.setSize(50, 20);

        // player
        this.tomapiko = Tomapiko().addChildTo(this);
		
		
		// 画面端当たり判定オブジェクト
		this.limit = RectangleShape().addChildTo(this).setPosition(SCREEN_WIDTH/2,SCREEN_HEIGHT/2).setSize(100,SCREEN_HEIGHT-10);
		//this.limit.alpha = 0;
		this.limit.fill = "transparent";
		this.limit.stroke = "red";

        // how to operate
        this.label1 = Label("矢印キーで移動とジャンプ あるいは クリックで横移動，スペースでジャンプ");
        this.label1.addChildTo(this);
        this.label2 = Label("ジャンプでゲームスタート");
        this.label2.addChildTo(this);
        this.label1.x = this.gridX.center();
        this.label1.y = this.gridY.center();
        this.label2.x = this.gridX.center();
        this.label2.y = this.gridY.center() + 20;
        this.label1.fill = 'black';
        this.label1.fontSize = 15;
        this.label2.fill = 'black';
        this.label2.fontSize = 15;

        this.frame = 0;
        this.frameTime = Label("0").addChildTo(this);
        this.frameTime.fill = 'black';
        this.frameTime.fontSize = 15;
        this.frameTime.setPosition(this.gridX.span(14), this.gridY.span(2));
        this.startFlag = false;
        this.endFlag = false;
    },

    // 更新
    update: function (app) {

        if (app.keyboard.getKey("space")) {
            app.keyboard.setKey("up", true);
            this.label1.alpha = 0;
            this.label2.alpha = 0;
            this.startFlag = true;
        } else app.keyboard.setKey("up", false);

        var dir = app.keyboard.getKeyDirection();

        if (app.pointer.getPointing()) {
            var diff = this.tomapiko.x - app.pointer.x;
            if (diff > WALK_SPEED) dir.x = -1;
            else if (diff < -WALK_SPEED) dir.x = 1;
        }

        this.tomapiko.move(dir);

        if (this.startFlag) {
            this.frame++;
            this.frameTime.text = this.frame;
        }

        if(this.tomapiko)

        if (this.endFlag) {
            exit();
        }
    },

});



phina.define("Block", {

    superClass: "RectangleShape",
    init: function () {
        this.superInit();
    },

    update: function () {
        this.y += 2;
        if (this.y > SCREEN_HEIGHT) {
            this.y = 0;
        }
    },



});
