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
