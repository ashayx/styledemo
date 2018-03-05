class Demo2 extends egret.Sprite{
    constructor() {
        super()
         this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
         console.log('demo2')
    }
    private onAddToStage() {
        let width = this.stage.stageWidth
        let height = this.stage.stageHeight

        let bg = this.createBitmap('0_jpg')
        bg.width = width
        bg.height = height
        this.addChild(bg)

        var white:egret.Shape = new egret.Shape()
        white.x = 0
        white.y = 0
        white.graphics.lineStyle( 1, 0xffffff )
        white.graphics.beginFill( 0xffffff, 1)
        white.graphics.drawRect( width * .11, height * .12, width * .76, height * .76 )
        white.graphics.endFill()
        white.alpha = 0 
        this.addChild(white)

        let finger = this.createBitmap('finger_png')
        finger.x = width * .5 - finger.width /2
        finger.y = height * .5 - finger.height /2
        this.addChild(finger)


        finger.touchEnabled = true
        finger.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
            egret.Tween.get(finger).to({alpha: 0},200).call(()=>{
                this.removeChild(finger)
                egret.Tween.get(white).to({alpha: 1},300)
            })
        }, this)

        var label1:egret.TextField = new egret.TextField()
        label1.text = '全球首款'
        label1.size = 100
        label1.textColor = 0x000000
        label1.x = width * .5 - label1.width  / 2
        label1.y = height * .3
        this.addChild( label1 )

        var label2:egret.TextField = new egret.TextField()
        label2.text = '屏幕指纹手机'
        label2.size = 80
        label2.textColor = 0x000000
        label2.x = width * .5 - label2.width  / 2
        label2.y = height * .45
        this.addChild( label2 )

        var label3:egret.TextField = new egret.TextField()
        label3.text = '外'
        label3.size = 100
        label3.textColor = 0x000000
        label3.x = width * .2 - label3.width  / 2  + 100
        label3.y = height * .25
        this.addChild( label3 )

        var label4:egret.TextField = new egret.TextField()
        label4.text = '观'
        label4.size = 100
        label4.textColor = 0x000000
        label4.x = width * .5 - label4.width  / 2  + 100
        label4.y = height * .25
        this.addChild( label4 )

        var label5:egret.TextField = new egret.TextField()
        label5.text = '超'
        label5.size = 100
        label5.textColor = 0x000000
        label5.x = width * .2 - label5.width  / 2  + 100
        label5.y = height * .55
        this.addChild( label5 )

        var label6:egret.TextField = new egret.TextField()
        label6.text = '酷'
        label6.size = 100
        label6.textColor = 0x000000
        label6.x = width * .5 - label6.width  / 2  + 100
        label6.y = height * .55
        this.addChild(label6)

        label1.alpha = label2.alpha = label3.alpha = label4.alpha =label5.alpha = label6.alpha = 0

        var next:egret.TextField = new egret.TextField()
        next.text = 'next demo'
        next.x = 100
        next.y = height - 500
        next.size = 100
        
        next.touchEnabled = true
        next.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=> {
           this.changePage(new Demo1)
        }, this)

        // 屏幕点击
        white.touchEnabled = true
        white.once(egret.TouchEvent.TOUCH_TAP, ()=> {
            white.touchEnabled = false
            egret.Tween.get(label1)
                .to({rotation: 45},0)
                .to({rotation: 0,alpha: 1},300)
                .call( ()=> {
                    egret.Tween.get(label2)
                    .to({rotation: 45},0)
                    .to({rotation: 0,alpha: 1},300)
                    .call( ()=> {
                        white.touchEnabled = true
                        white.once(egret.TouchEvent.TOUCH_TAP, () => { 
                            white.touchEnabled = false
                            label1.alpha = label2.alpha =0
                            egret.Tween.get(white)
                                .to({alpha: 0},100)
                                .to({alpha: 1},100)
                                .to({alpha: 0},100)
                                .to({alpha: 1},100)
                                .call(() => {
                                    
                                    egret.Tween.get(label3).to({scaleX: 1.2,scaleY: 1.2,alpha: 1},130).to({scaleX: 1,scaleY: 1,alpha: 1},130).call(()=>{
                                        egret.Tween.get(label4).to({scaleX: 1.2,scaleY: 1.2,alpha: 1},130).to({scaleX: 1,scaleY: 1,alpha: 1},130).call(()=>{
                                            egret.Tween.get(label5).to({scaleX: 1.2,scaleY: 1.2,alpha: 1},130).to({scaleX: 1,scaleY: 1,alpha: 1},130).call(()=>{
                                                egret.Tween.get(label6).to({scaleX: 1.2,scaleY: 1.2,alpha: 1},130).to({scaleX: 1,scaleY: 1,alpha: 1},130).call(()=>{
                                                    white.touchEnabled = true
                                                    white.once(egret.TouchEvent.TOUCH_TAP, () => {
                                                        egret.Tween.get(white).to({alpha: 0,x: -width},300).call(()=>{
                                                            this.addChild(next)
                                                        })
                                                    },this)
                                                })
                                            })
                                        })
                                    })
                                    
                                })
                        },this)
                    })
                })
        }, this)

    }

    protected createBitmap(resKey: string, isACenter: boolean = false): egret.Bitmap {
        let bmp: egret.Bitmap = new egret.Bitmap(RES.getRes(resKey))
        if (isACenter) {
            bmp.anchorOffsetX = bmp.width / 2
            bmp.anchorOffsetY = bmp.height / 2
        }
        return bmp;
    }
    public changePage(p): void {
        if (this.parent == null) return;

        let func: Function = (obj: egret.DisplayObjectContainer) => {
            for (let i: number = 0; i < obj.numChildren; i++) {
                egret.Tween.removeTweens(obj.getChildAt(i));
                if (obj.mask != null) {
                    (<egret.DisplayObject>obj.mask).parent.removeChild((<egret.DisplayObject>obj.mask));
                    obj.mask = null;
                }
                if (obj instanceof egret.DisplayObjectContainer) {
                    func(obj.getChildAt(i));
                }
                if (obj instanceof egret.MovieClip) {
                    (<egret.MovieClip>obj).stop();
                }
            }
        };

        func(this);

        p.alpha = 0;
        p.scaleX = p.scaleY = 1.3;

        this.parent.addChild(p);
        egret.Tween.get(p).to({"alpha": 1, "scaleX": 1, "scaleY": 1}, 500, egret.Ease.cubicOut).call(() => {
            if (this.parent == null) return;
            this.parent.removeChild(this);
        }, this);

    }
    
}