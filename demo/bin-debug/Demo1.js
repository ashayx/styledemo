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
var Demo1 = (function (_super) {
    __extends(Demo1, _super);
    function Demo1() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Demo1.prototype.onAddToStage = function () {
        var _this = this;
        var width = this.stage.stageWidth;
        var height = this.stage.stageHeight;
        var bg = new egret.Sprite();
        bg.width = width;
        bg.height = height;
        this.addChild(bg);
        var arr = Array.from({ length: 20 }).map(function (v, i) { return i; });
        arr[2] = '面';
        arr[6] = '试';
        arr[15] = '题';
        console.log(arr);
        var _loop_1 = function (i) {
            var x = (i % 4 + 1) * 130;
            var y = Math.floor(i / 4) * 130 + 80;
            var shp = this_1.createShp(x, y, 50);
            shp.touchEnabled = true;
            shp.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                this.touchAnimation(shp, 400, x, y, i == arr[i] ? null : arr[i]);
            }, this_1);
            bg.addChild(shp);
        };
        var this_1 = this;
        for (var i = 0; i < 20; i++) {
            _loop_1(i);
        }
        var next = new egret.TextField();
        next.text = 'next demo';
        next.x = 100;
        next.y = height - 200;
        next.size = 100;
        bg.addChild(next);
        next.touchEnabled = true;
        next.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.changePage(new Demo2);
        }, this);
    };
    Demo1.prototype.createShp = function (x, y, r) {
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.lineStyle(1, 0x000000);
        shp.graphics.beginFill(0x000000, 1);
        shp.graphics.drawCircle(0, 0, r);
        shp.graphics.endFill();
        return shp;
    };
    Demo1.prototype.touchAnimation = function (shp, time, x, y, changeText) {
        var _this = this;
        egret.Tween.get(shp)
            .call(function () {
            shp.graphics.clear();
            shp.graphics.lineStyle(1, _this.getColor());
            shp.graphics.beginFill(_this.getColor(), 1);
            shp.graphics.drawCircle(0, 0, 50);
            shp.graphics.endFill();
        })
            .to({ scaleX: 1.5, scaleY: 1.5, alpha: .3 }, time, egret.Ease.cubicOut)
            .call(function () {
            shp.graphics.clear();
            shp.graphics.lineStyle(1, _this.getColor());
            shp.graphics.beginFill(_this.getColor(), 1);
            shp.graphics.drawCircle(0, 0, 50);
            shp.graphics.endFill();
        })
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, time, egret.Ease.cubicOut)
            .call(function () {
            if (changeText) {
                shp.graphics.clear();
                var label = new egret.TextField();
                label.text = changeText;
                label.x = x - 18;
                label.y = y - 18;
                label.width = label.height = 60;
                _this.addChild(label);
            }
        });
    };
    Demo1.prototype.getColor = function () {
        //定义字符串变量colorValue存放可以构成十六进制颜色值的值
        var colorValue = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
        var colorArray = colorValue.split(",");
        var color = "0x";
        for (var i = 0; i < 6; i++) {
            color += colorArray[Math.floor(Math.random() * 16)];
        }
        return parseInt(color);
    };
    Demo1.prototype.changePage = function (p) {
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
    return Demo1;
}(egret.Sprite));
__reflect(Demo1.prototype, "Demo1");
