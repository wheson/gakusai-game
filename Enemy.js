phina.define("Enemy", {
    superClass: "RectangleShape",
    init: function(options){
        this.superInit(options);
    },

    update: function(){
        this.y++;
    },
})
