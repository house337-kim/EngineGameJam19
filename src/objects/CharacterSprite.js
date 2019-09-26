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
var CharacterSprite = /** @class */ (function (_super) {
    __extends(CharacterSprite, _super);
    function CharacterSprite(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        scene.sys.updateList.add(_this);
        scene.sys.displayList.add(_this);
        _this.setScale(2);
        scene.physics.world.enableBody(_this);
        _this.setActive(true);
        _this.hp = 100;
        return _this;
    }
    return CharacterSprite;
}(Phaser.Physics.Arcade.Sprite));
exports.CharacterSprite = CharacterSprite;
//# sourceMappingURL=CharacterSprite.js.map