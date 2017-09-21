var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.createGameScene = function () {
        var gfont = RES.getRes("gfont_fnt");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var bg = this.createBitmapByName("bg_png");
        bg.width = stageW;
        bg.height = stageH;
        this.addChild(bg);
        var title = new egret.BitmapText();
        title.text = "登录";
        title.font = gfont;
        title.y = 100;
        title.x = (stageW - title.width) >> 1;
        this.addChild(title);
        var userLabel = new egret.BitmapText();
        userLabel.text = "用户名：";
        userLabel.font = gfont;
        userLabel.x = 70;
        userLabel.y = 260;
        this.addChild(userLabel);
        var passLabel = new egret.BitmapText();
        passLabel.text = "密  码：";
        passLabel.font = gfont;
        passLabel.x = 70;
        passLabel.y = 330;
        this.addChild(passLabel);
        var userInput = new egret.TextField();
        userInput.type = egret.TextFieldType.INPUT;
        userInput.text = "";
        userInput.border = true;
        userInput.background = true;
        userInput.size = 28;
        userInput.width = 200;
        userInput.textColor = 0;
        userInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        userInput.x = userLabel.x + userLabel.width + 10;
        userInput.y = userLabel.y + 10;
        this.userInput = userInput;
        this.addChild(this.userInput);
        var passInput = new egret.TextField();
        passInput.type = egret.TextFieldType.INPUT;
        passInput.displayAsPassword = true;
        passInput.text = "";
        passInput.border = true;
        passInput.background = true;
        passInput.size = 28;
        passInput.width = 200;
        passInput.textColor = 0;
        passInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        passInput.x = userLabel.x + userLabel.width + 10;
        passInput.y = passLabel.y + 10;
        this.passInput = passInput;
        this.addChild(this.passInput);
        var btn = new egret.Bitmap(RES.getRes("button_png"));
        btn.width = 150;
        btn.height = 60;
        btn.x = (stageW - btn.width) >> 1;
        btn.y = 500;
        this.addChild(btn);
        var submit = new egret.TextField();
        submit.x = btn.x;
        submit.y = btn.y;
        submit.width = btn.width;
        submit.height = btn.height;
        submit.textAlign = egret.HorizontalAlign.CENTER;
        submit.verticalAlign = egret.VerticalAlign.MIDDLE;
        submit.text = "确  定";
        submit.size = 30;
        this.addChild(submit);
        submit.touchEnabled = true;
        submit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
    };
    Main.prototype.onLogin = function () {
        console.log("用户名:" + this.userInput.text);
        console.log("密码:" + this.passInput.text);
        var bb = new BulletinBoard(this, this.stage.stageWidth - 100, 300);
        bb.show();
    };
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map