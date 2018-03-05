class Demo1 extends egret.Sprite{
    constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }
    private onAddToStage() {
        let width = this.stage.stageWidth
        let height = this.stage.stageHeight

        let bg = new egret.Sprite()
        bg.width = width
        bg.height = height
        this.addChild(bg)

        let arr = Array.from({length:20}).map((v,i) => i)
        arr[2] = '面'
        arr[6] = '试'
        arr[15] = '题'
        console.log(arr)
       
        for (let i = 0;i < 20; i++) {
            let x = (i % 4 + 1) * 130 
            let y = Math.floor(i / 4) * 130 + 80

            let shp = this.createShp(x, y, 50)

            shp.touchEnabled = true
            shp.addEventListener(egret.TouchEvent.TOUCH_TAP, function() {
                this.touchAnimation(shp, 400, x, y, i == arr[i]?null:arr[i])
            }, this)
            bg.addChild(shp)
        }

        var next:egret.TextField = new egret.TextField()
        next.text = 'next demo'
        next.x = 100
        next.y = height - 200
        next.size = 100
        bg.addChild( next )

        next.touchEnabled = true
        next.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=> {
           this.changePage(new Demo2)
        }, this)

       
    }
    private createShp(x:number,y:number,r:number):egret.Shape {
        var shp:egret.Shape = new egret.Shape()
        shp.x = x
        shp.y = y
        shp.graphics.lineStyle( 1, 0x000000 )
        shp.graphics.beginFill( 0x000000, 1)
        shp.graphics.drawCircle( 0, 0, r )
        shp.graphics.endFill()
        return shp
    }
    private touchAnimation(shp:egret.Shape,time:number,x:number,y:number,changeText:any) {
        egret.Tween.get(shp)
            .call(() => {
                shp.graphics.clear()
                shp.graphics.lineStyle( 1, this.getColor() )
                shp.graphics.beginFill( this.getColor(), 1)
                shp.graphics.drawCircle( 0, 0, 50 )
                shp.graphics.endFill()
            })
            .to({scaleX: 1.5,scaleY: 1.5,alpha: .3}, time, egret.Ease.cubicOut)
            .call(() => {
                shp.graphics.clear()
                shp.graphics.lineStyle( 1, this.getColor() )
                shp.graphics.beginFill( this.getColor(), 1)
                shp.graphics.drawCircle( 0, 0, 50 )
                shp.graphics.endFill()
            })
            .to({scaleX: 1,scaleY: 1,alpha: 1}, time, egret.Ease.cubicOut)
            .call(() => {
                if(changeText) {
                    shp.graphics.clear()

                    var label:egret.TextField = new egret.TextField()
                    label.text = changeText
                    label.x = x - 18
                    label.y = y - 18
                    label.width = label.height = 60
                    this.addChild( label )

                }
               
            })
    }
    private getColor(){
        //定义字符串变量colorValue存放可以构成十六进制颜色值的值
        var colorValue="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
        var colorArray = colorValue.split(",")
        var color="0x"
        for(var i=0;i<6;i++){
            color += colorArray[Math.floor(Math.random()*16)];
        }
        return parseInt(color)
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