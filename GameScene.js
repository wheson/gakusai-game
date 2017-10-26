phina.define("GameScene", {
    // 継承
    superClass: 'DisplayScene',

    // 初期化
    init: function (options) {
        // super init
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });

        // 背景
        this.bg = Sprite("bg").addChildTo(this);
        this.bg.origin.set(0, 0); // 左上基準に変更
        this.bg.width = SCREEN_WIDTH;
        this.bg.height = SCREEN_HEIGHT;

        this.enemyGroup = DisplayElement().addChildTo(this);
       
        // player
        this.tomapiko = Tomapiko().addChildTo(this).setPosition(this.gridX.center(),this.gridY.center()-64);


        // 画面端当たり判定オブジェクト
        this.limit = RectangleShape().addChildTo(this).setPosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
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

        // 上キーを押したらゲームが開始するようにする
        // それ以外の場合は何もしない
        if (app.keyboard.getKey("up") || app.keyboard.getKey("space")) {
            this.label1.alpha = 0;
            this.label2.alpha = 0;
            this.startFlag = true;
        }

        // startFlagが立っていればフレームを進めて，表示する
        // startFlagが立っていなければreturnする
        if (this.startFlag) {
            this.frame++;
            this.frameTime.text = this.frame;
            this.tomapiko.startFlag = true;
        } else {
            return;
        }

        // 矢印キーの方向を取得する
        var dir = app.keyboard.getKeyDirection();

        // スペースキーを押した時，上キーを押した時と同じ状態にする
        if (app.keyboard.getKey("space")) {
            dir.y = -1;
        }

        // トマピコを矢印キーの方向に基づいて移動させる
        this.tomapiko.move(dir);

        // 画面に存在する全ての敵に対して
        this.enemyGroup.children.each(function (elem) {
            // 敵の移動方向で分岐してそれぞれについて画面から見えなくなったら敵をグループから削除する
            switch (elem.direction) {
                case UP:
                    if (elem.bottom === 0) elem.remove();
                case DOWN:
                    if (elem.top === SCREEN_HEIGHT) elem.remove();
                case RIGHT:
                    if (elem.left === SCREEN_WIDTH) elem.remove();
                case LEFT:
                    if (elem.right === 0) elem.remove();
            }
        });

        // 指定フレーム毎に
        if (this.frame % 30 == 0) {
            // 敵をランダムな方向に動くように出現させる
            var enemy = Enemy(Random.randint(0, 3)).addChildTo(this.enemyGroup);
            enemy.fill = enemy.getColor();
        }

        // トマピコが外枠に触れた時console.logに出力
        if (this.tomapiko.top <= this.limit.top) {
            console.log("top limit");
        }
        if (this.tomapiko.bottom >= this.limit.bottom) {
            console.log("bottom limit");
        }
        if (this.tomapiko.left <= this.limit.left) {
            console.log("left limit");
        }
        if (this.tomapiko.right >= this.limit.right) {
            console.log("right limit");
        }

        // endFlagが立っていれば終了して次のシーンに移動する
        if (this.endFlag) {
            exit();
        }
    },

});
