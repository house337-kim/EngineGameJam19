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
var CharacterSprite_1 = require("../objects/CharacterSprite");
var SceneOne = /** @class */ (function (_super) {
    __extends(SceneOne, _super);
    function SceneOne() {
        return _super.call(this, {
            key: constants_1.context.scenes.scene_one
        }) || this;
    }
    SceneOne.prototype.addAnimations = function () {
        this.anims.create({
            key: 'walk_left',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(constants_1.context.sprites.hero, {
                start: 0,
                end: 3
            })
        });
        this.anims.create({
            key: 'walk_right',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(constants_1.context.sprites.hero, {
                start: 5,
                end: 8
            })
        });
        this.anims.create({
            key: 'idle',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers(constants_1.context.sprites.hero, {
                start: 4
            })
        });
    };
    SceneOne.prototype.preload = function () {
        //Add background,center and fit
        var image = this.add
            .image(0, 0, constants_1.context.images.scene_one_bf)
            .setOrigin(0)
            .setDepth(0);
        var scaleX = this.cameras.main.width / image.width;
        var scaleY = this.cameras.main.height / image.height;
        var scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
        this.addAnimations();
    };
    SceneOne.prototype.init = function (data) {
        console.log('Received from previous scene:', data);
    };
    SceneOne.prototype.update = function (time, delta) {
        var _this = this;
        this.input.on('pointerup', function (pointer) {
            if (_this.hero.active === true) {
                if (pointer.worldX > _this.hero.x) {
                    // Move Right
                    _this.hero.setActive(false);
                    _this.hero.setVelocityX(128);
                    _this.walkToPositionFromOriginPosition(Math.round(_this.hero.x), Math.round(_this.hero.y), Math.round(pointer.worldX), Math.round(pointer.worldY));
                    _this.hero.setActive(true);
                }
                else {
                    //move left
                    _this.hero.setActive(false);
                    _this.hero.setVelocityX(-128);
                    _this.walkToPositionFromOriginPosition(Math.round(_this.hero.x), Math.round(_this.hero.y), Math.round(pointer.worldX), Math.round(pointer.worldY));
                    _this.hero.setActive(true);
                }
            }
        });
    };
    SceneOne.prototype.create = function () {
        console.log('Scene One - Scene');
        this.hero = new CharacterSprite_1.CharacterSprite(this, 400, 400, constants_1.context.sprites.hero, 4);
    };
    SceneOne.prototype.walkToPositionFromOriginPosition = function (originPositionX, originPositionY, destinationPositionX, destinationPositionY) {
        if (this.hero.body.velocity.x > 0) {
            //moving right
            this.hero.play('walk_right', true);
        }
        else if (this.hero.body.velocity.x < 0) {
            //moving left
            this.hero.play('walk_left', true);
        }
        this.checkPoint = new MovementDestination(this, destinationPositionX, destinationPositionY);
        if (this.checkOverlap(this.hero, destinationPositionX, destinationPositionY)) {
            //perform full stop
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = 0;
        }
    };
    SceneOne.prototype.checkOverlap = function (hero, destinationPositionX, destinationPositionY) {
        var boundsA = hero.getBounds();
        var checkpoint = this.add.sprite(destinationPositionX, destinationPositionY, null);
        var boundsB = checkpoint.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    };
    return SceneOne;
}(Phaser.Scene));
exports.SceneOne = SceneOne;
//# sourceMappingURL=scene-one.js.map