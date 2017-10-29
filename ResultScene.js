phina.define("ResultScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
        this.backgroundColor = '#185674';
        this.gameTitle = Label("終了");
        this.gameTitle.addChildTo(this);
        this.gameTitle.x = 50;
        this.gameTitle.y = 50;
        this.gameTitle.fill = 'black';
        this.gameTitle.fontSize = 15;

        // frame
        this.time = options.time;
        this.displayTime = Label("0").addChildTo(this);
        this.displayTime.fill = 'black';
        this.displayTime.fontSize = 15;
        this.displayTime.setPosition(this.gridX.span(14), this.gridY.span(2));

        this.score = options.score;
        this.displayScore = Label("0").addChildTo(this);
        this.displayScore.fill = 'black';
        this.displayScore.fontSize = 15;
        this.displayScore.setPosition(this.gridX.span(14), this.gridY.span(3));

        //ゲームのレベル
        this.level = options.level;
        this.displayLevel = Label("0").addChildTo(this);
        this.displayLevel.fill = 'black';
        this.displayLevel.fontSize = 15;
        this.displayLevel.setPosition(this.gridX.span(14), this.gridY.span(4));

        this.displayTime.text = "time: " + this.time;
        this.displayScore.text = "score: " + this.score;
        this.displayLevel.text = "level: " + this.level;

        var input = document.querySelector('#input');
        input.oninput = function () {
            label.text = input.value;
        };

        var label = Label('名前を入力してね').addChildTo(this);
        label.x = this.gridX.center();
        label.y = this.gridY.center();
        label.fontSize = 64;
        label.setInteractive(true);
        label.width = 400;
        label.height = 80;

        input.focus();
        label.onpointstart = function () {
            input.focus();
        };
    },
    /*
        onclick: function () {
            this.exit();
        }
    */
});
