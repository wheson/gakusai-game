// グローバルに展開
phina.globalize();

// 定数
// デバッグで困るので相対パスを使用
var ASSETS = {
	"image": {
		"logo": "image/pikopiko.png",
		"titleBg": "image/aG5YD.png",
		"bg0": "image/pipo-bg001.jpg",
		"bg1": "image/pipo-bg002.jpg",
		"bg2": "image/pipo-bg003a.jpg",
		"bg3": "image/pipo-bg005a.jpg",
		"bg4": "image/pipo-bg005c.jpg",
		"bg5": "image/pipo-bg005b.jpg",
		"bg6": "image/pipo-bg004.jpg",
		"bg7": "image/pipo-bg004b.jpg",
		"tomapiko": 'image/tomapiko_ss.png',
		"enemy0": "image/sample041.png",
		"enemy1": "image/sample043.png",
		"enemy2": "image/sample042.png",
		"enemy3": "image/sample044.png",
		"item0": "image/jewel2s-5.png",
		"item1": "image/jewel2d-5.png",
		"item2": "image/jewel2l-5.png",
		"item3": "image/jewel2i-5.png",
	},
	"sound": {
		"fall": "sound/fall.wav",
		"get": "sound/power21.wav",
		"jump": "sound/jump00.wav",
		"bgm": "sound/o12.mp3",
		"bgmSpace": "sound/5730_2.mp3",
		"titlese": "sound/pyoro57_a.wav",
		"levelUp": "sound/pyoro68.wav",
	},
	"spritesheet": {
		"tomapikoSS": {
			"frame": {
				"width": 64,
				"height": 64,
				"cols": 6,
				"rows": 3,
			},
			"animations": {
				"flap": {
					"frames": [1, 2],
					"next": "flap",
					"frequency": 4,
				},
				"damage": {
					"frames": [4],
				},
				"down": {
					"frames": [5],
				}
			},
		},
		"enemySS": {
			"frame": {
				"width": 32,
				"height": 32,
				"cols": 3,
				"rows": 4,
			},
			"animations": {
				"UP": {
					"frames": [9,10,11],
					"next": "UP",
					"frequency": 4,
				},
				"DOWN": {
					"frames": [0,1,2],
					"next": "DOWN",
					"frequency": 4,
				},
				"RIGHT": {
					"frames": [6,7,8],
					"next": "RIGHT",
					"frequency": 4,
				},
				"LEFT": {
					"frames": [3,4,5],
					"next": "LEFT",
					"frequency": 4,
				},
			},
		},
	},
};
var SCREEN_WIDTH = 960; // スクリーン幅
var SCREEN_HEIGHT = 720; // スクリーン高さ

var DEBUG = false;

//方向定数
var DOWN = 0;
var UP = 1;
var RIGHT = 2;
var LEFT = 3;

// 背景画像の数
var BG_NUM = 8;

// 全ランキングを表示する関数
function openRankingWindow(){
	window.open("//pikopiko-184802.appspot.com/ranking","_blank");
}