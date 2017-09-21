class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }


    private userInput:egret.TextField;
    private passInput:egret.TextField;
    
    private createGameScene() {
        let gfont:egret.BitmapFont = RES.getRes("gfont_fnt");
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        let bg = this.createBitmapByName("bg_png");
        bg.width = stageW;
        bg.height = stageH;
        this.addChild(bg);

        let title = new egret.BitmapText();
        title.text = "登录";
        title.font = gfont;
        title.y = 100;
        title.x = (stageW - title.width) >> 1;
        this.addChild(title);
        
        let userLabel = new egret.BitmapText();
        userLabel.text = "用户名：";
        userLabel.font = gfont;
        userLabel.x = 70;
        userLabel.y = 260;
        this.addChild(userLabel);

        let passLabel = new egret.BitmapText();
        passLabel.text = "密  码：";
        passLabel.font = gfont;
        passLabel.x = 70;
        passLabel.y = 330;
        this.addChild(passLabel);

        let userInput = new egret.TextField();
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

        let passInput = new egret.TextField();
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

        let btn = new egret.Bitmap(RES.getRes("button_png"));
        btn.width = 150;
        btn.height = 60;
        btn.x = (stageW - btn.width) >> 1;
        btn.y = 500;
        this.addChild(btn);

        let submit = new egret.TextField();
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
        submit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLogin,this);

    }

    private onLogin(){
        console.log("用户名:" + this.userInput.text);
        console.log("密码:" + this.passInput.text);
        
        let bb = new BulletinBoard(this,this.stage.stageWidth - 100,300);
        bb.show();

    }
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


