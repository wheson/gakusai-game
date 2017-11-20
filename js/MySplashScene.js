phina.define("MySplashScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
		
		// ナビ
		(function(self){
			Label({
				text:"wheson\n&\nvividorange\n",
				x:self.gridX.center(),
				y:self.gridY.center(),
				fill:'black',
				fontSize:30,
			}).addChildTo(self)
			.tweener.wait(1000)
			.to({alpha:0})
			.set({
				text:"音が出ます",
			})
			.wait(1)
			.set({
				alpha:1,
			})
			.wait(1000)
			.to({alpha:0})
			.call(function(){self.exit()});
		})(this);
	},
});
