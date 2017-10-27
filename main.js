phina.main(function () {
    // アプリケーションを生成
    var app = GameApp({
        startLabel: 'game', // MainScene から開始
        width: SCREEN_WIDTH, // 画面幅
        height: SCREEN_HEIGHT, // 画面高さ
        assets: ASSETS, // アセット読み込み
		scenes: [
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

    app.enableStats();

    //app.replaceScene(SceneSequence());
    // 実行
    app.run();
});
