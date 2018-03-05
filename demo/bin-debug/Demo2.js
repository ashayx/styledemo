var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Demo2 = (function (_super) {
    __extends(Demo2, _super);
    function Demo2() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        console.log('demo2');
        return _this;
    }
    Demo2.prototype.onAddToStage = function () {
        var _this = this;
        var width = this.stage.stageWidth;
        var height = this.stage.stageHeight;
        var bg = this.createBitmap('0_jpg');
        bg.width = width;
        bg.height = height;
        this.addChild(bg);
        var white = new egret.Shape();
        white.x = 0;
        white.y = 0;
        white.graphics.lineStyle(1, 0xffffff);
        white.graphics.beginFill(0xffffff, 1);
        white.graphics.drawRect(width * .11, height * .12, width * .76, height * .76);
        white.graphics.endFill();
        white.alpha = 0;
        this.addChild(white);
        var finger = this.createBitmap('finger_png');
        finger.x = width * .5 - finger.width / 2;
        finger.y = height * .5 - finger.height / 2;
        this.addChild(finger);
        finger.touchEnabled = true;
        finger.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var _this = this;
            egret.Tween.get(finger).to({ alpha: 0 }, 200).call(function () {
                _this.removeChild(finger);
                egret.Tween.get(white).to({ alpha: 1 }, 300);
            });
        }, this);
        var label1 = new egret.TextField();
        label1.text = '全球首款';
        label1.size = 100;
        label1.textColor = 0x000000;
        label1.x = width * .5 - label1.width / 2;
        label1.y = height * .3;
        this.addChild(label1);
        var label2 = new egret.TextField();
        label2.text = '屏幕指纹手机';
        label2.size = 80;
        label2.textColor = 0x000000;
        label2.x = width * .5 - label2.width / 2;
        label2.y = height * .45;
        this.addChild(label2);
        var label3 = new egret.TextField();
        label3.text = '外';
        label3.size = 100;
        label3.textColor = 0x000000;
        label3.x = width * .2 - label3.width / 2 + 100;
        label3.y = height * .25;
        this.addChild(label3);
        var label4 = new egret.TextField();
        label4.text = '观';
        label4.size = 100;
        label4.textColor = 0x000000;
        label4.x = width * .5 - label4.width / 2 + 100;
        label4.y = height * .25;
        this.addChild(label4);
        var label5 = new egret.TextField();
        label5.text = '超';
        label5.size = 100;
        label5.textColor = 0x000000;
        label5.x = width * .2 - label5.width / 2 + 100;
        label5.y = height * .55;
        this.addChild(label5);
        var label6 = new egret.TextField();
        label6.text = '酷';
        label6.size = 100;
        label6.textColor = 0x000000;
        label6.x = width * .5 - label6.width / 2 + 100;
        label6.y = height * .55;
        this.addChild(label6);
        label1.alpha = label2.alpha = label3.alpha = label4.alpha = label5.alpha = label6.alpha = 0;
        var next = new egret.TextField();
        next.text = 'next demo';
        next.x = 100;
        next.y = height - 500;
        next.size = 100;
        next.touchEnabled = true;
        next.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changePage(new Demo1);
        }, this);
        // 屏幕点击
        white.touchEnabled = true;
        white.once(egret.TouchEvent.TOUCH_TAP, function () {
            white.touchEnabled = false;
            egret.Tween.get(label1)
                .to({ rotation: 45 }, 0)
                .to({ rotation: 0, alpha: 1 }, 300)
                .call(function () {
                egret.Tween.get(label2)
                    .to({ rotation: 45 }, 0)
                    .to({ rotation: 0, alpha: 1 }, 300)
                    .call(function () {
                    white.touchEnabled = true;
                    white.once(egret.TouchEvent.TOUCH_TAP, function () {
                        white.touchEnabled = false;
                        label1.alpha = label2.alpha = 0;
                        egret.Tween.get(white)
                            .to({ alpha: 0 }, 100)
                            .to({ alpha: 1 }, 100)
                            .to({ alpha: 0 }, 100)
                            .to({ alpha: 1 }, 100)
                            .call(function () {
                            egret.Tween.get(label3).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 130).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130).call(function () {
                                egret.Tween.get(label4).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 130).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130).call(function () {
                                    egret.Tween.get(label5).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 130).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130).call(function () {
                                        egret.Tween.get(label6).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 130).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 130).call(function () {
                                            white.touchEnabled = true;
                                            white.once(egret.TouchEvent.TOUCH_TAP, function () {
                                                egret.Tween.get(white).to({ alpha: 0, x: -width }, 300).call(function () {
                                                    _this.addChild(next);
                                                });
                                            }, _this);
                                        });
                                    });
                                });
                            });
                        });
                    }, _this);
                });
            });
        }, this);
    };
    Demo2.prototype.createBitmap = function (resKey, isACenter) {
        if (isACenter === void 0) { isACenter = false; }
        var bmp = new egret.Bitmap(RES.getRes(resKey));
        if (isACenter) {
            bmp.anchorOffsetX = bmp.width / 2;
            bmp.anchorOffsetY = bmp.height / 2;
        }
        return bmp;
    };
    Demo2.prototype.changePage = function (p) {
        var _this = this;
        if (this.parent == null)
            return;
        var func = function (obj) {
            for (var i = 0; i < obj.numChildren; i++) {
                egret.Tween.removeTweens(obj.getChildAt(i));
                if (obj.mask != null) {
                    obj.mask.parent.removeChild(obj.mask);
                    obj.mask = null;
                }
                if (obj instanceof egret.DisplayObjectContainer) {
                    func(obj.getChildAt(i));
                }
                if (obj instanceof egret.MovieClip) {
                    obj.stop();
                }
            }
        };
        func(this);
        p.alpha = 0;
        p.scaleX = p.scaleY = 1.3;
        this.parent.addChild(p);
        egret.Tween.get(p).to({ "alpha": 1, "scaleX": 1, "scaleY": 1 }, 500, egret.Ease.cubicOut).call(function () {
            if (_this.parent == null)
                return;
            _this.parent.removeChild(_this);
        }, this);
    };
    return Demo2;
}(egret.Sprite));
__reflect(Demo2.prototype, "Demo2");
