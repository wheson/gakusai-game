// SceneSequenceクラス
phina.define("SceneSequence", {
    // phina.game.ManagerSceneを継承します
    superClass: "phina.game.ManagerScene",
    // 初期化
    init: function () {
        this.superInit({
            scenes: [
        // A
                {
                    label: "タイトル", // ラベル。参照用
                    className: "TitleScene", // シーンAのクラス名
                    nextlabel: "ゲーム"
        },
        // B
                {
                    label: "ゲーム",
                    className: "GameScene",
                    nextLabel: "終了" // シーン終了時に次に遷移するシーンのラベル
        },
                {
                    label: "終了",
                    className: "ResultScene",
                    nextlabel: "タイトル"
                }

      ]
        });
    }
});
