phina.define("MySplashScene", {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit({
            'width': SCREEN_WIDTH,
            'height': SCREEN_HEIGHT
        });
		
		
		// ナビ
		(function(self){
			if(phina.isMobile()){
				// 背景
				self.bg = Sprite("titleBg").addChildTo(self);
				self.bg.origin.set(0, 0); // 左上基準に変更
				self.bg.width = SCREEN_WIDTH;
				self.bg.height = SCREEN_HEIGHT;

				// ロゴ
				self.logo = Sprite("logo").setPosition(self.gridX.center(),self.gridY.span(4)).addChildTo(self);
				Label({
					text:"IE以外のパソコンブラウザに対応しています",
					x:self.gridX.center(),
					y:self.gridY.span(9),
					fill:'black',
					fontSize:30,
				}).addChildTo(self);
				self.openRankingWindowButton = Button({
					x:self.gridX.span(8),
					y:self.gridY.span(11),
					width:200,
					height:30,
					text:"ランキングを見る",
					fontColor:"white",
					fontSize: 24,
					cornerRadius:5,
					fill:"coral",
					stroke:"forestgreen",
				}).addChildTo(self).onclick = openRankingWindow;
				return;
			}
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
