class BulletinBoard extends egret.DisplayObjectContainer{
    private _parent:egret.DisplayObjectContainer;
    public constructor(container:egret.DisplayObjectContainer,w:number,h:number){
        super();
        this._parent = container;
        this.init(w,h);
    }
    private init(w,h){
        let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg_png"));
        this.addChild(bg);
        bg.width = w;
        bg.height = h;

        // 关闭按钮
        let close = new egret.Bitmap(RES.getRes("close_png"));
        close.width = close.height = 40;
        close.x = this.width-close.height-20;
        close.y = 20;
        this.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);

        // 公告
        // 标题
        let title = new egret.TextField();
        title.text = "游戏公告";
        title.x = (this.width - title.width) >> 1;
        title.y = 20;
        title.textColor = 0;
        this.addChild(title);
        // 内容
        let content = new egret.TextField();
        content.multiline = true;
        let scrollView:egret.ScrollView = new egret.ScrollView();
        scrollView.setContent(content);
        scrollView.width = 280;
        scrollView.height = 200;
        scrollView.x = (this.width - scrollView.width) >> 1;
        scrollView.y = (this.height - scrollView.height) >> 1;
        this.addChild(scrollView);
        content.width = 280;

        content.size = 20;
        content.text = "抵制不良游戏 拒绝盗版游戏\n注意自我保护 谨防受骗上当\n适度游戏益脑 沉迷游戏伤身\n合理安排时间 享受健康生活\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Hic expedita facere libero repellat ut numquam accusamus illum alias reiciendis soluta? Neque provident excepturi doloribus modi perspiciatis, cumque non! Laborum eum, tempore sit totam, expedita excepturi. Dolorem voluptatem iste molestiae obcaecati excepturi ipsam sequi eveniet quod saepe, in quo neque consequuntur, vel ducimus commodi, suscipit a unde fuga asperiores libero. Tenetur recusandae, rem obcaecati consequatur! Laboriosam cum vitae eligendi suscipit vel temporibus obcaecati distinctio officia consectetur";
        console.log(this.height);
        content.textAlign = egret.HorizontalAlign.CENTER;
        this.x = this._parent.width - this.width >> 1;
        this.y = this._parent.height - scrollView.height - 100 >> 1;
    }
    private onClose(){
        this.hide();
    }
    public show(){
        if(!this._parent.contains(this)){
            this._parent.addChild(this);
        }
    }
    public hide(){
        if(this._parent.contains(this)){
            this._parent.removeChild(this);
        }
    }
}