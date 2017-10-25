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
