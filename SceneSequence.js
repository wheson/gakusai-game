// SceneSequenceクラス
phina.define("SceneSequence", {
    // phina.game.ManagerSceneを継承します
    superClass: "phina.game.ManagerScene",
    // 初期化
    init: function () {
        this.superInit({
            scenes: [

                {
                    label: "タイトル",
                    className: "TitleScene",
                    nextlabel: "ゲーム"
        },

                {
                    label: "ゲーム",
                    className: "GameScene",
                    nextLabel: "終了"
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
