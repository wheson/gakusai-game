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

        //敵の管理
        this.enemyGroup = DisplayElement().addChildTo(this);


        //アイテムの管理
        this.itemGroup = DisplayElement().addChildTo(this);

        // トマピコ
        this.tomapiko = Tomapiko().addChildTo(this).setPosition(this.gridX.center(), this.gridY.center() - 64);

        // 画面端当たり判定オブジェクト
        this.limit = RectangleShape().addChildTo(this).setPosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2).setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        //this.limit.alpha = 0;
        this.limit.fill = "transparent";
        this.limit.stroke = "red";

        // how to operate
        this.label1 = Label("←→キーで移動, ↑キーまたはスペースでジャンプ");
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

        this.score = 0;
        this.displayScore = Label("0").addChildTo(this);
        this.displayScore.fill = 'black';
        this.displayScore.fontSize = 15;
        this.displayScore.setPosition(this.gridX.span(14), this.gridY.span(3));

        //ゲームのレベル
        this.level = 0;
        this.displayLevel = Label("0").addChildTo(this);
        this.displayLevel.fill = 'black';
        this.displayLevel.fontSize = 15;
        this.displayLevel.setPosition(this.gridX.span(14), this.gridY.span(4));

        //敵の出現頻度をまとめた配列
        this.frequency = [100, 90, 80, 70, 60, 50, 40, 30]; //frequency[0] ~ [7]

        //次にレベルの変わるスコア
        this.changeLevel = 1000;

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
            this.displayScore.text = this.score;
            this.displayLevel.text = this.level;
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
        this.enemyGroup.children.each(function (elm) {
            // 画面から見えなくなったら敵をグループから削除する
            if (elm.bottom < 0 || elm.top > SCREEN_HEIGHT || elm.left > SCREEN_WIDTH || elm.right < 0){
                elm.remove();
            }
        });

        // 画面に存在する全てのアイテムに対して
        this.itemGroup.children.each(function (elm) {
            // アイテムの移動方向で分岐してそれぞれについて画面から見えなくなったらアイテムをグループから削除する
            switch (elm.direction) {
                case UP:
                    if (elm.bottom === 0) elm.remove();
                case DOWN:
                    if (elm.top === SCREEN_HEIGHT) elm.remove();
                case RIGHT:
                    if (elm.left === SCREEN_WIDTH) elm.remove();
                case LEFT:
                    if (elm.right === 0) elm.remove();
            }
        });


        // 指定フレーム毎に
        if (this.frame % this.frequency[this.level] === 0) {
            // 敵をランダムな方向に動くように出現させる
            if (this.level === 0)
                var enemy = Enemy(Random.randint(0, 1), 0, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
            else if (this.level === 1)
                var enemy = Enemy(Random.randint(2, 3), 1, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
            else if (this.level === 2)
                var enemy = Enemy(Random.randint(0, 3), 2, this.level, Random.randint(0, SCREEN_WIDTH), Random.randint(0, SCREEN_HEIGHT)).addChildTo(this.enemyGroup);
            else if (this.level === 3)
                var enemy = Enemy(Random.randint(0, 3), 3, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
            else if (this.level === 4)
                var enemy = Enemy(Random.randint(0, 3), 3, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
            else if (this.level === 5)
                var enemy = Enemy(Random.randint(0, 3), 3, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
            else if (this.level === 6)
                var enemy = Enemy(Random.randint(0, 3), 3, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
            else if (this.level === 7)
                var enemy = Enemy(Random.randint(0, 3), 3, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
            else if (this.level === 8)
                var enemy = Enemy(Random.randint(0, 3), 3, this.level, this.tomapiko.x, this.tomapiko.y).addChildTo(this.enemyGroup);
        }

        //指定フレームごとに
        if (this.frame % 100 == 0 && this.frame !== 0) {
            // アイテムをランダムな方向に動くように出現させる
            // item0: 65%, item1: 20%, item2: 10%, item3: 5%
            if(this.level === 0)
                var item = Item(Random.randint(0, 3), Random.randint(1, 65)).addChildTo(this.itemGroup);
            else if(this.level < 2)
                var item = Item(Random.randint(0, 3), Random.randint(1, 85)).addChildTo(this.itemGroup);
            else if(this.level < 4)
                var item = Item(Random.randint(0, 3), Random.randint(1, 95)).addChildTo(this.itemGroup);
            else
                var item = Item(Random.randint(0, 3), Random.randint(1, 100)).addChildTo(this.itemGroup);
        }


        // scoreがchangeLevelに格納された値を越えたらlevelを上げる
        if (this.score >= this.changeLevel) {
            this.level++;
            this.changeLevel += 1000;
        }

        var self = this; // 関数のスコープに入るのでthisを預けておく

        // トマピコの当たり判定を計算して専用の矩形を作る
        var tomapikoCollision = Circle(this.tomapiko.x, this.tomapiko.y, this.tomapiko.COLLISION.radius);

        // トマピコが敵と当たったらendFlagを立てる
        this.enemyGroup.children.each(function (elm) {
            var enemyCollision = Circle(elm.x, elm.y, elm.width / 2); // 同じく敵の当たり判定を取り出す
            if (Collision.testCircleCircle(tomapikoCollision, enemyCollision)) {
                self.endFlag = true;
            }
        });

        // トマピコがアイテムと当たったらthis.scoreにアイテムの持つscoreを追加する
        this.itemGroup.children.each(function (elm) {
            var itemCollision = Circle(elm.x, elm.y, elm.width / 2); // 同じく敵の当たり判定を取り出す
            if (Collision.testCircleCircle(tomapikoCollision, itemCollision)) {
                self.score += elm.getScore();
                self.scoreCount += elm.getScore();
                if (DEBUG) console.log("item hit!");
                elm.remove();
            }
        });

        // トマピコが外枠に触れた時console.logに出力
        if (this.tomapiko.top <= this.limit.top) {
            if (DEBUG) console.log("top limit");
        }
        if (this.tomapiko.bottom >= this.limit.bottom) {
            if (DEBUG) console.log("bottom limit");
        }
        if (this.tomapiko.left <= this.limit.left) {
            if (DEBUG) console.log("left limit");
        }
        if (this.tomapiko.right >= this.limit.right) {
            if (DEBUG) console.log("right limit");
        }

        // endFlagが立っていれば終了して次のシーンに移動する
        if (this.endFlag) {
            this.exit("result", {
                score: this.socre
            });
        }
    },

});
