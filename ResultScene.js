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
