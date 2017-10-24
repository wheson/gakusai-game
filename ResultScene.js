phina.define("ResultScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({'width': SCREEN_WIDTH, 'height': SCREEN_HEIGHT});
        this.backgroundColor = '#185674';
        this.gameTitle = Label("終了");
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
