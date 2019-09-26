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
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        return _super.call(this, {
            key: constants_1.context.scenes.loading
        }) || this;
    }
    /**
     * Loads all buttons under the path using the constants file
     */
    LoadingScene.prototype.loadButtons = function () {
        this.load.setPath('/assets/buttons');
        for (var prop in constants_1.context.buttons) {
            this.load.image(constants_1.context.buttons[prop], constants_1.context.buttons[prop]);
        }
    };
    /**
     * Loads all images under the path using the constants file
     */
    LoadingScene.prototype.loadImages = function () {
        this.load.setPath('/assets/images');
        for (var prop in constants_1.context.images) {
            this.load.image(constants_1.context.images[prop], constants_1.context.images[prop]);
        }
    };
    /**
     * Loads all sprites under the path using the constants file
     */
    LoadingScene.prototype.loadSprites = function (frameConfig) {
        this.load.setPath('./assets/sprites');
        for (var prop in constants_1.context.sprites) {
            this.load.spritesheet(constants_1.context.sprites[prop], constants_1.context.sprites[prop], frameConfig);
        }
    };
    LoadingScene.prototype.init = function () { };
    LoadingScene.prototype.preload = function () {
        var _this = this;
        this.loadButtons();
        this.loadImages();
        this.loadSprites({
            frameWidth: 32,
            frameHeight: 48
        });
        //Create loading bar
        var loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            }
        });
        var loadingBox = this.add.graphics({
            fillStyle: {
                color: 0x222222,
                alpha: 0.8
            }
        });
        loadingBox.fillRect(this.game.renderer.height / 2 - 20, this.game.renderer.height / 2 - 20, 340, 70);
        // Loader events:
        // progress - loader progress in decimal
        // complete - when finished loading the assets
        this.load.on('progress', function (percent) {
            loadingBar.clear();
            loadingBar.fillStyle(0xffffff, 1);
            loadingBar.fillRect(_this.game.renderer.height / 2, _this.game.renderer.height / 2, 300 * percent, 30);
        });
        this.load.on('complete', function () {
            _this.scene.start(constants_1.context.scenes.menu);
        });
    };
    LoadingScene.prototype.create = function () {
        console.log('This is the Loader Scene');
    };
    return LoadingScene;
}(Phaser.Scene));
exports.LoadingScene = LoadingScene;
//# sourceMappingURL=load-scene.js.map