/**
 * 説明
 * バナナダイエットを始めたくまさん。
 * イチゴは体重増加のもとらしい。
 * イチゴをよけて、バナナを取ろう。
 */

enchant();
window.onload = function() {
    var game = new Core(320, 320);
    var score = 0;

    game.preload('chara1.png', 'icon0.png');
    // chara1.png を読み込む
    game.onload = function() {
        // プレイヤー クラス (パペット) をつくる
        var Player = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, width, height);
                // chara1.png をつかう
                // this は作ったクマ自身のこと
                this.image = game.assets['chara1.png'];
            }
        });

        // Player クラスのクマを1匹作る
        var player = new Player(32, 32);
        player.y = 280;
        // 画面に表示する (ひとつだけでる)
        game.rootScene.addChild(player);

        // タッチに付いてくるようにする
        // touchmove: タッチ座標が動いたときのイベント
        game.rootScene.on('touchmove', function(evt) {
            // タッチしている座標が動いたときにここが呼び出される
            // evt.x にタッチのx座標、evt.y にタッチのy座標が入っている
            player.x = evt.x - 16;
        });

        // いちごクラス (パペット) をつくる
        var Ichigo = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, 16, 16);
                this.image = game.assets['icon0.png']; // icon0.png をつかう
                this.frame = 32; // いちごの画像をつかう
                this.x = rand(320 - 16); 
                this.y = -16;
                this.tl.moveBy(0, 320+16, rand(120) + 60); // 5秒間かけて、(-320, 0) だけ移動

                // enterframe: 毎フレーム (1秒間に30回) 発生するイベント
                this.on('enterframe', function() {
                    // いちご と、player と交差しているかどうか判定
                    if (this.intersect(player)) {
                        // rootScene から、player を削除 (画面から消す)
                        game.rootScene.removeChild(player);
                        alert("ダイエット結果: バナナを食べるだけで、なんとくまさんの体重が " + score + "kg も減少!!");
                        game.end();
                    }
                });
            }
        });
        
        var Banana = enchant.Class.create(enchant.Sprite, {
            initialize: function(width, height) {
                enchant.Sprite.call(this, 16, 16);
                this.image = game.assets['icon0.png']; // icon0.png をつかう
                this.frame = 16; // バナナの画像をつかう
                this.x = rand(320 - 16); 
                this.y = -16;
                this.tl.moveBy(0, 320+16, rand(120) + 60); // 5秒間かけて、(-320, 0) だけ移動

                // enterframe: 毎フレーム (1秒間に30回) 発生するイベント
                this.on('enterframe', function() {
                    // バナナと、player と交差しているかどうか判定
                    if (this.intersect(player)) {
                        score++; 
                        game.rootScene.removeChild(this);
                    }
                });
            }
        });
        player.tl.delay(5).then(function() {
            if(rand(100) < (player.age/20) + 10){
                var enemy = new Ichigo();
                game.rootScene.addChild(enemy);
            }

            if(rand(100) < 40 - (player.age/20) + 10){
                var banana = new Banana();
                game.rootScene.addChild(banana);
            }

        }).loop();
    };

    game.start();
};

function rand(num) {
    return Math.floor(Math.random() * num);
}