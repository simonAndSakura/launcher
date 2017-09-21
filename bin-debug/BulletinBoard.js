var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BulletinBoard = (function (_super) {
    __extends(BulletinBoard, _super);
    function BulletinBoard(container, w, h) {
        var _this = _super.call(this) || this;
        _this._parent = container;
        _this.init(w, h);
        return _this;
    }
    BulletinBoard.prototype.init = function (w, h) {
        var bg = new egret.Bitmap(RES.getRes("bg_png"));
        this.addChild(bg);
        bg.width = w;
        bg.height = h;
        // 关闭按钮
        var close = new egret.Bitmap(RES.getRes("close_png"));
        close.width = close.height = 40;
        close.x = this.width - close.height - 20;
        close.y = 20;
        this.addChild(close);
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        // 公告
        // 标题
        var title = new egret.TextField();
        title.text = "游戏公告";
        title.x = (this.width - title.width) >> 1;
        title.y = 20;
        title.textColor = 0;
        this.addChild(title);
        // 内容
        var content = new egret.TextField();
        content.multiline = true;
        var scrollView = new egret.ScrollView();
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
    };
    BulletinBoard.prototype.onClose = function () {
        this.hide();
    };
    BulletinBoard.prototype.show = function () {
        if (!this._parent.contains(this)) {
            this._parent.addChild(this);
        }
    };
    BulletinBoard.prototype.hide = function () {
        if (this._parent.contains(this)) {
            this._parent.removeChild(this);
        }
    };
    return BulletinBoard;
}(egret.DisplayObjectContainer));
__reflect(BulletinBoard.prototype, "BulletinBoard");
//# sourceMappingURL=BulletinBoard.js.map