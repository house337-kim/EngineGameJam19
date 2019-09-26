"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
var constants_1 = require("./constants");
var load_scene_1 = require("./scenes/load-scene");
var menu_scene_1 = require("./scenes/menu-scene");
var scene_one_1 = require("./scenes/scene-one");
var Game = Phaser.Game;
var config = {
    width: constants_1.WORLD_WIDTH,
    height: constants_1.WORLD_HEIGHT,
    type: Phaser.AUTO,
    backgroundColor: '#000',
    scene: [
        load_scene_1.LoadingScene, menu_scene_1.MenuScene, scene_one_1.SceneOne
    ],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};
new Game(config);
//# sourceMappingURL=main.js.map