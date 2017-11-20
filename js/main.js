// 矢印キー入力によるスクロールの無効化
window.addEventListener("keydown",
function( event ) {
	switch(event.keyCode) {
		case 37: // ←
		case 38: // ↑
		case 39: // →
		case 40: // ↓
		event.preventDefault();
	}
}, true);

phina.main(function () {
    // アプリケーションを生成
    var app = GameApp({
        startLabel: 'mySplash', // スプラッシュシーン から開始
        width: SCREEN_WIDTH, // 画面幅
        height: SCREEN_HEIGHT, // 画面高さ
        assets: ASSETS, // アセット読み込み
        scenes: [
            {
                label: "mySplash",
                className: "MySplashScene",
                nextLabel: "title"
			},
            {
                label: "title",
                className: "TitleScene",
                nextLabel: "game"
			},
            {
                label: "game",
                className: "GameScene",
                nextLabel: "result"
			},
            {
                label: "result",
                className: "ResultScene",
                nextLabel: "title"
			}
		],
    });

    //app.replaceScene(SceneSequence());
    // 実行
    app.run();
});
