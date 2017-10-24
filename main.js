phina.main(function () {
    // アプリケーションを生成
    var app = GameApp({
        startLabel: 'main', // MainScene から開始
        width: SCREEN_WIDTH, // 画面幅
        height: SCREEN_HEIGHT, // 画面高さ
        assets: ASSETS, // アセット読み込み
    });

    app.enableStats();

    app.replaceScene(SceneSequence());
    // 実行
    app.run();
});
