"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        return _super.call(this, {
            key: constants_1.context.scenes.menu
        }) || this;
    }
    MenuScene.prototype.preload = function () {
        // Add using z-index
        // Add logo in the middle and 20% Y axis
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, constants_1.context.images.menu_logo).setDepth(1);
        //Add background,center and fit
        var image = this.add
            .image(0, 0, constants_1.context.images.menu_bg)
            .setOrigin(0)
            .setDepth(0);
        var scaleX = this.cameras.main.width / image.width;
        var scaleY = this.cameras.main.height / image.height;
        var scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
    };
    MenuScene.prototype.init = function () { };
    MenuScene.prototype.create = function () {
        var _this = this;
        console.log('This is the Menu Scene');
        // create the menu scene
        var playButton = this.add
            .image(this.game.renderer.width / 2, this.game.renderer.height / 2, constants_1.context.buttons.play_button)
            .setDepth(0);
        var infoButton = this.add
            .image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, constants_1.context.buttons.info_button)
            .setDepth(0);
        var exitButton = this.add
            .image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, constants_1.context.buttons.exit_button)
            .setDepth(0);
        var hoverSelector = this.add.sprite(100, 100, constants_1.context.buttons.menu_selector);
        hoverSelector.setScale(2);
        hoverSelector.setVisible(false);
        // Make Button image interactive
        playButton.setInteractive();
        infoButton.setInteractive();
        exitButton.setInteractive();
        // Events:
        // pointerover - hovering
        // pointerout - not hovering
        // pointerup - click and release
        // pointerdown - only click
        playButton.on('pointerover', function () {
            hoverSelector.setVisible(true);
            hoverSelector.x = playButton.x - playButton.width;
            hoverSelector.y = playButton.y;
        });
        playButton.on('pointerout', function () {
            hoverSelector.setVisible(false);
        });
        playButton.on('pointerup', function () {
            // Todo: Fetch (from /src/state/game-state.ts) last save status and pass to the next scene (e.g coins, last mission, progress)
            // {coins: 99, mission: { id: 4, progress: 50} }
            // Fire up the scene and pass in our lastSaved state to the scene.
            _this.scene.start(constants_1.context.scenes.scene_one, { coins: '90' });
        });
        infoButton.on('pointerover', function () {
            hoverSelector.setVisible(true);
            hoverSelector.x = infoButton.x - infoButton.width;
            hoverSelector.y = infoButton.y;
        });
        infoButton.on('pointerout', function () {
            hoverSelector.setVisible(false);
        });
        infoButton.on('pointerup', function () {
            console.log('clicked');
        });
        exitButton.on('pointerover', function () {
            hoverSelector.setVisible(true);
            hoverSelector.x = exitButton.x - exitButton.width;
            hoverSelector.y = exitButton.y;
        });
        exitButton.on('pointerout', function () {
            hoverSelector.setVisible(false);
        });
        exitButton.on('pointerup', function () {
            console.log('clicked');
        });
    };
    return MenuScene;
}(Phaser.Scene));
exports.MenuScene = MenuScene;
//# sourceMappingURL=menu-scene.js.map