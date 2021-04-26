var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -5,
            "gameItems": [
                /*{ "type": "sawblade", "x": 800, "y": groundY -10},
                { "type": "sawblade", "x": 1100, "y": groundY -10},
                { "type": "sawblade", "x": 1600, "y": groundY -100},
                { "type": "sawblade", "x": 800, "y": groundY -10},*/
                { "type": "banana", "x": 1100, "y": groundY -10},
                { "type": "banana", "x": 1600, "y": groundY -10},
                { "type": "banana", "x": 2500, "y": groundY -10},
                { "type": "banana", "x": 2800, "y": groundY -10},
                { "type": "banana","x": 3100, "y": groundY -10},
                { "type": "banana", "x": 3200, "y": groundY -10},
                { "type": "banana", "x": 3600, "y": groundY -10},
                { "type": "banana", "x": 3700, "y": groundY -10},
                { "type": "banana", "x": 3800, "y": groundY -10},
                { "type": "banana","x": 4100, "y": groundY -10},
                /*{ "type": "orb", "x": 2000, "y": groundY -190},
                { "type": "orb", "x": 3500, "y": groundY -190},
                /*{ "type": "enemy1", "x": 3000, "y": groundY -50 },
                { "type": "enemy1", "x": 4000, "y": groundY -50 },
                { "type": "enemy1", "x": 4500, "y": groundY -50 },
                { "type": "enemy1", "x": 4800, "y": groundY -50 },*/
                { "type": "coconut", "x": 3000, "y": groundY -50 },
                { "type": "coconut", "x": 4000, "y": groundY -50 },
                { "type": "coconut", "x": 4500, "y": groundY -50 },
                { "type": "coconut", "x": 4800, "y": groundY -50 },
                { "type": "coconut", "x": 5200, "y": groundY -50 },
                { "type": "coconut", "x": 5800, "y": groundY -50 },
                { "type": "coconut", "x": 5900, "y": groundY -50 },
                { "type": "coconut", "x": 6500, "y": groundY -50 },
                { "type": "coconut", "x": 6800, "y": groundY -50 },
                { "type": "coconut", "x": 7000, "y": groundY -50 },
                { "type": "coconut", "x": 7200, "y": groundY -50 },
                { "type": "coconut", "x": 7800, "y": groundY -50 },
                { "type": "coconut", "x": 9000, "y": groundY -50 },
                { "type": "coconut", "x": 9300, "y": groundY -50 },
                { "type": "coconut", "x": 10000, "y": groundY -50 },
                { "type": "coconut", "x": 13000, "y": groundY -50 },
                { "type": "coconut", "x": 15000, "y": groundY -50 },
                { "type": "coconut", "x": 17000, "y": groundY -50 },
                { "type": "coconut", "x": 18000, "y": groundY -50 },
                { "type": "coconut", "x": 18200, "y": groundY -50 },
                { "type": "coconut", "x": 18500, "y": groundY -50 },
                { "type": "coconut", "x": 18800, "y": groundY -50 },
                { "type": "coconut", "x": 18290, "y": groundY -50 },
                { "type": "coconut", "x": 18900, "y": groundY -50 },
                { "type": "coconut", "x": 19900, "y": groundY -50 },
                { "type": "coconut", "x": 19500, "y": groundY -50 },
                { "type": "coconut", "x": 19800, "y": groundY -50 },
                { "type": "coconut", "x": 20000, "y": groundY -50 },
                { "type": "coconut", "x": 27200, "y": groundY -50 },
                { "type": "coconut", "x": 27800, "y": groundY -50 },
                { "type": "coconut", "x": 29000, "y": groundY -50 },
                { "type": "coconut", "x": 29300, "y": groundY -50 },
                { "type": "coconut", "x": 21000, "y": groundY -50 },
                { "type": "coconut", "x": 21300, "y": groundY -50 },
                { "type": "coconut", "x": 21500, "y": groundY -50 },
                { "type": "coconut", "x": 21700, "y": groundY -50 },
                { "type": "enemy2", "x": 3000, "y": groundY -75 },
                { "type": "enemy2", "x": 5000, "y": groundY -75 },
                { "type": "enemy2", "x": 2000, "y": groundY -75 },
                { "type": "enemy2", "x": 7000, "y": groundY -75 },
                { "type": "enemy2", "x": 4000, "y": groundY -75 },
                { "type": "enemy2", "x": 6000, "y": groundY -75 },
                { "type": "reward", "x": 6500, "y": groundY -50 },
                
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        
        //SAWBLADE//

        function createBanana(x, y) {
            var hitZoneSize = 20;
            var damageFromObstacle = 10;
            var bananaHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            bananaHitZone.x = x;
            bananaHitZone.y = y;
            game.addGameItem(bananaHitZone);   
            var obstacleImage = draw.bitmap('img/banana.png')
            obstacleImage.x = -40;
            obstacleImage.y = -20;
            obstacleImage.scaleX = 0.08;
            obstacleImage.scaleY = 0.08;
            bananaHitZone.addChild(obstacleImage);
        };
        

        //MY OBSTACLE//

        function createMyObstacle(x, y) {
            var hitZoneSize = 100;
            var damageFromObstacle = 100000000;
            var orbHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            orbHitZone.x = x;
            orbHitZone.y = y;
            game.addGameItem(orbHitZone);
            var obstacleImage = draw.bitmap('img/orb.png');
            obstacleImage.x = -180;
            obstacleImage.y = -180;
            obstacleImage.scaleX = 0.4;
            obstacleImage.scaleY = 0.4;
            orbHitZone.addChild(obstacleImage);
        };
        

        //ENEMY//

        /*function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy1',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -20;
            enemy.rotationalVelocity = 100;

            enemy.onPlayerCollision = function(onPlayerCollision) {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeout()
            };
            enemy.onProjectileCollision = function( onProjectileCollision) {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.shrink()
            };
        };*/
        

        //ENEMY2//

         function createEnemy2(x, y) {
            var enemy2 = game.createGameItem('enemy2',80);
            var enemy2Image = draw.bitmap('img/monkyT.png');
            enemy2Image.x = -333;
            enemy2Image.y = -180;
            enemy2Image.scaleX = 1;
            enemy2Image.scaleY = 1;
            enemy2.addChild(enemy2Image);
            enemy2.x = x;
            enemy2.y = y;
            game.addGameItem(enemy2);
            enemy2.velocityX = -1;

            enemy2.onPlayerCollision = function(onPlayerCollision) {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-999999999);
                enemy2.fadeout()
            };
            enemy2.onProjectileCollision = function( onProjectileCollision) {
                console.log('Halle has hit the enemy');
                game.increaseScore(0);
                enemy2.shrink()
            };
        };

        function createCoconut(x, y) {
            var coconut = game.createGameItem('coconut',23);
            var coconutImage = draw.bitmap('img/coconut.png');
            coconutImage.x = -23;
            coconutImage.y = -25;
            coconutImage.scaleX = 0.02;
            coconutImage.scaleY = 0.02;
            coconut.addChild(coconutImage);
            coconut.x = x;
            coconut.y = y;
            game.addGameItem(coconut);
            coconut.velocityX = -20;

            coconut.onPlayerCollision = function(onPlayerCollision) {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-999999999);
                coconut.fadeout()
            };
            coconut.onProjectileCollision = function( onProjectileCollision) {
                console.log('Halle has hit the enemy');
                game.increaseScore(0);
                coconut.shrink()
            };
        };


        //REWARD//

        function createReward(x, y) {
            var reward = game.createGameItem('reward',25);
            var rewardImage = draw.bitmap('img/banana reward.png');
            rewardImage.x = 0;
            rewardImage.y = 0;
            reward.addChild(rewardImage);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -2;

            reward.onPlayerCollision = function(onPlayerCollision) {
                console.log('Halle has gained health');
                game.changeIntegrity(30);
                reward.shrink()
            }; 
        };
        

        //FOR LOOP//
       
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var obj = levelData.gameItems[i];
            var objX = obj.x;
            var objY = obj.y;
            var firstType = obj.type;

            if (firstType === "banana"){
                createBanana(objX, objY);
            } else if (firstType === "orb"){
                createMyObstacle(objX, objY);
            } else if (firstType === "enemy2"){
                createEnemy2(objX, objY);
            } else if (firstType === "coconut"){
                createCoconut(objX, objY);
            } else {
                createReward(objX, objY);
            }
        }


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
