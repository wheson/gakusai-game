// グローバルに展開
phina.globalize();

// 定数
var ASSETS = {
    image: {
        bg: "http://jsrun.it/assets/a/G/5/Y/aG5YD.png",
        tomapiyo: 'http://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/assets/images/tomapiko_ss.png',
    },
};
var SCREEN_WIDTH = 800; // スクリーン幅
var SCREEN_HEIGHT = 465; // スクリーン高さ

var DEBUG = true;

var WALK_SPEED = 4;
var JUMP_SPEED = 8;
var GRAVITY = 0.3;
var blocks = DisplayElement();

var playerName = {};

/*
 * メインシーン
 */

// SceneSequenceクラス
phina.define("SceneSequence", {
    // phina.game.ManagerSceneを継承します
    superClass: "phina.game.ManagerScene",
    // 初期化
    init: function () {
        this.superInit({
            scenes: [
        // A
                {
                    label: "タイトル", // ラベル。参照用
                    className: "TitleScene", // シーンAのクラス名
                    nextlabel: "ゲーム"
        },
        // B
                {
                    label: "ゲーム",
                    className: "GameScene",
                    nextLabel: "終了" // シーン終了時に次に遷移するシーンのラベル
        },
                {
                    label: "終了",
                    className: "ResultScene",
                    nextlabel: "タイトル"
                }

      ]
        });
    }
});

phina.define("TitleScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit();
        this.backgroundColor = '#185674';
        this.gameTitle = Label("ゲーム");
        this.gameTitle.addChildTo(this);
        this.gameTitle.x = 50;
        this.gameTitle.y = 50;
        this.gameTitle.fill = 'black';
        this.gameTitle.fontSize = 15;
    },

    onclick: function () {
        this.exit();
    }
});

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
        this.tomapiyo = Tomapiyo().addChildTo(this);

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
            var diff = this.tomapiyo.x - app.pointer.x;
            if (diff > WALK_SPEED) dir.x = -1;
            else if (diff < -WALK_SPEED) dir.x = 1;
        }

        this.tomapiyo.move(dir);

        if (this.startFlag) {
            this.frame++;
            this.frameTime.text = this.frame;
        }

        if (this.endFlag) {

        }
    },

});

phina.define("Tomapiyo", {

    superClass: "Sprite",

    FRAME_INDEX_STAY: 0,
    FRAME_INDEX_WALKING_1: 12,
    FRAME_INDEX_WALKING_2: 13,
    FRAME_INDEX_JUMPING_1: 1,
    FRAME_INDEX_JUMPING_2: 2,

    START_X: 400,
    START_Y: 400,

    init: function () {
        this.superInit('tomapiyo', 64, 64);
        this.setPosition(this.START_X, this.START_Y);
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
        this.frame++;
        this.checkFalling();
    },

    move: function (dir) {

        if (dir.x > 0) this.goRight();
        else if (dir.x < 0) this.goLeft();
        else this.physical.velocity.x = 0;

        if (dir.y < 0) this.jump();

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
        if (this.falling === true) return;

        /* if(collide) velocity.y = 0;
         * else velocity.y = -JUMP_SPEED; */

        this.physical.velocity.y = -JUMP_SPEED;

        col = this.getColRect(phina.geom.Vector2(0, -1));
        blocks.children.some(function (block) {
            if (block.hitTestElement(col) === false) return;
            this.physical.velocity.y = 0;
        }, this);

    },

    goLeft: function () {
        /* if(collide) velocity.x = 0;
         * else velocity.x = -WALK_SPEED; */

        this.physical.velocity.x = -WALK_SPEED;
        this.scaleX = 1;

        col = this.getColRect(phina.geom.Vector2(-1, 0));
        blocks.children.some(function (block) {
            if (block.hitTestElement(col) === false) return;
            if (DEBUG) console.log("tomapiyo's left hit block's right");
            this.physical.velocity.x = 0;
        }, this);

    },

    goRight: function () {
        /* if(collide) velocity.x = 0;
         * else velocity.x = WALK_SPEED; */

        this.physical.velocity.x = WALK_SPEED;
        this.scaleX = -1;

        col = this.getColRect(phina.geom.Vector2(1, 0));
        blocks.children.some(function (block) {
            if (block.hitTestElement(col) === false) return;
            if (DEBUG) console.log("tomapiyo's right hit block's left");
            this.physical.velocity.x = 0;
        }, this);

    },

    checkFalling: function () {
        /* if(collide) falling = true;
         * else falling = false; */

        this.physical.gravity.y = GRAVITY;
        this.falling = true;

        col = this.getColRect(phina.geom.Vector2(0, 1));
        blocks.children.some(function (block) {
            if (block.hitTestElement(col) == false) return;

            // going up (just after jump)
            if (this.physical.velocity.y < 0) {
                if (DEBUG) console.log("tomapiyo's top hit block's bottom");
                // めり込む少し手前にワープ (少し := GRAVITY/2)
                // (this.y + this.col.top) := block.bottom + GRAVITY / 2
                this.y = -this.COLLISION.top + block.bottom + GRAVITY / 2;
                this.physical.velocity.y = 0;
            }

            // going down
            else {
                if (DEBUG) console.log("tomapiyo's bottom hit block's top");
                // (this.y + this.col.bottom) := block.top - GRAVITY / 2
                this.y = -this.COLLISION.bottom + block.top - GRAVITY / 2;
                this.physical.velocity.y = 0;
                this.physical.gravity.y = 0;
                this.falling = false;
            }

        }, this);

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

phina.define("Block", {

    superClass: "RectangleShape",
    init: function () {
        this.superInit();
    },

    update: function(){
        this.y+=2;
        if(this.y > SCREEN_HEIGHT) {
            this.y = 0;
        }
    },



});
/*
 * メイン処理
 */
phina.main(function () {
    // アプリケーションを生成
    var app = GameApp({
        startLabel: 'main', // MainScene から開始
        width: SCREEN_WIDTH, // 画面幅
        height: SCREEN_HEIGHT, // 画面高さ
        assets: ASSETS, // アセット読み込み
    });

    app.enableStats();

    app.replaceScene(SceneSequence());
    // 実行
    app.run();
});
