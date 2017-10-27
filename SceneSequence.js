// SceneSequenceクラス
phina.define("SceneSequence", {
    // phina.game.ManagerSceneを継承します
    superClass: "phina.game.ManagerScene",
    // 初期化
    init: function () {
        this.superInit({
            scenes: [

                {
                    label: "title",
                    className: "TitleScene",
                    nextlabel: "game"
        },

                {
                    label: "game",
                    className: "GameScene",
                    nextLabel: "result"
        },
                {
                    label: "result",
                    className: "ResultScene",
                    nextlabel: "title"
                }

      ]
        });
    }
});
