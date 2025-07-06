// 新建图层
function btn_layer_new() {
    var newLayer = app.activeDocument.artLayers.add();
    newLayer.name = "DioBig";
}

// 删除当前图层
function btn_layer_delete() {
    if (app.activeDocument.activeLayer.isBackgroundLayer) {
        alert("不能删除背景图层");
    } else {
        app.activeDocument.activeLayer.remove();
    }
}


// 给当前图层或组添加蒙版（根据是否有选区）
function btn_layer_addmask() {
    var doc = app.activeDocument;

    // 判断是否有选区
    var hasSelection = false;
    try {
        doc.selection.bounds; // 如果没有选区，这里会抛异常
        hasSelection = true;
    } catch(e) {
        hasSelection = false;
    }

    // 创建蒙版
    var idMk = charIDToTypeID("Mk  ");
    var desc = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc.putClass(idNw, idChnl);

    var idAt = charIDToTypeID("At  ");
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("Msk "));
    desc.putReference(idAt, ref);

    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");

    if (hasSelection) {
        // 按选区生成蒙版
        var idRvlS = charIDToTypeID("RvlS"); // Reveal Selection
        desc.putEnumerated(idUsng, idUsrM, idRvlS);
    } else {
        // 创建白色蒙版
        var idRvlA = charIDToTypeID("RvlA"); // Reveal All
        desc.putEnumerated(idUsng, idUsrM, idRvlA);
    }

    executeAction(idMk, desc, DialogModes.NO);
}


// 创建组并把当前图层作为组的子图层，并给组添加图层蒙版
function btn_layer_Gmask() {
    var doc = app.activeDocument;

    // 获取当前图层
    var originalLayer = doc.activeLayer;

    // 把当前图层重命名
    originalLayer.name = "@DioBig";

    // 创建新组
    var group = doc.layerSets.add();
    group.name = "@DioBigG";

    // 把当前图层移入组
    originalLayer.move(group, ElementPlacement.INSIDE);

    // 选中组
    doc.activeLayer = group;

    // 添加空的图层蒙版
    var idMk = charIDToTypeID("Mk  ");
    var desc = new ActionDescriptor();
    var idNw = charIDToTypeID("Nw  ");
    var idChnl = charIDToTypeID("Chnl");
    desc.putClass(idNw, idChnl);

    var idAt = charIDToTypeID("At  ");
    var ref = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idMsk = charIDToTypeID("Msk ");
    ref.putEnumerated(idChnl, idChnl, idMsk);
    desc.putReference(idAt, ref);

    var idUsng = charIDToTypeID("Usng");
    var idUsrM = charIDToTypeID("UsrM");
    var idRvlA = charIDToTypeID("RvlA"); // Reveal All
    desc.putEnumerated(idUsng, idUsrM, idRvlA);

    executeAction(idMk, desc, DialogModes.NO);
}









function btn_layer_solidcolor() {
    var idMk = charIDToTypeID("Mk  ");
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(stringIDToTypeID("contentLayer"));
    desc.putReference(charIDToTypeID("null"), ref);
    var descColor = new ActionDescriptor();
    var descSolidColorLayer = new ActionDescriptor();
    var color = new ActionDescriptor();
    color.putDouble(charIDToTypeID("Rd  "), 255);
    color.putDouble(charIDToTypeID("Grn "), 0);
    color.putDouble(charIDToTypeID("Bl  "), 0);
    descSolidColorLayer.putObject(charIDToTypeID("Clr "), charIDToTypeID("RGBC"), color);
    descColor.putObject(charIDToTypeID("Type"), stringIDToTypeID("solidColorLayer"), descSolidColorLayer);
    desc.putObject(charIDToTypeID("Usng"), stringIDToTypeID("contentLayer"), descColor);
    executeAction(idMk, desc, DialogModes.NO);
}

// 新建亮度/对比度调整图层
function btn_layer_brightnessContrast() {
    var doc = app.activeDocument;
    
    // 开始历史记录
    app.activeDocument.suspendHistory("创建亮度/对比度调整图层", "executeCreateBrightnessContrast()");
    
    function executeCreateBrightnessContrast() {
        // 创建新的调整图层
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass(stringIDToTypeID("adjustmentLayer"));
        desc.putReference(charIDToTypeID("null"), ref);
        
        // 设置调整图层类型为亮度/对比度
        var desc2 = new ActionDescriptor();
        desc2.putClass(stringIDToTypeID("type"), stringIDToTypeID("brightnessEvent"));
        desc.putObject(charIDToTypeID("Usng"), stringIDToTypeID("adjustmentLayer"), desc2);
        
        // 执行创建
        executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
        
        // 获取新创建的图层
        var newLayer = doc.activeLayer;
        newLayer.name = "亮度/对比度";
        
        // 设置亮度和对比度值
        setBrightnessContrastValues(0, 0); // 默认值为0，可以修改
    }
    
    function setBrightnessContrastValues(brightness, contrast) {
        // 创建设置亮度对比度的描述符
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        var desc3 = new ActionDescriptor();
        
        // 设置亮度值 (-100 到 100)
        desc3.putInteger(charIDToTypeID("Brgh"), brightness);
        
        // 设置对比度值 (-100 到 100)
        desc3.putInteger(charIDToTypeID("Cntr"), contrast);
        
        desc2.putObject(stringIDToTypeID("brightnessContrast"), stringIDToTypeID("brightnessContrastType"), desc3);
        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Adjs"), desc2);
        
        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    }
}

// 新建色阶调整图层
function btn_layer_levels() {
    app.activeDocument.suspendHistory("创建色阶调整图层", "executeCreateLevels()");
    
    function executeCreateLevels() {
        // 创建色阶调整图层
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass(stringIDToTypeID("adjustmentLayer"));
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        desc2.putClass(stringIDToTypeID("type"), stringIDToTypeID("levels"));
        desc.putObject(charIDToTypeID("Usng"), stringIDToTypeID("adjustmentLayer"), desc2);
        
        executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
        
        // 获取新创建的图层
        var doc = app.activeDocument;
        var layer = doc.activeLayer;
        layer.name = "色阶";
        
        // 设置默认色阶参数
        setLevelsParameters();
    }
    
    function setLevelsParameters() {
        // 获取当前图层引用
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        
        // 设置色阶参数
        var desc = new ActionDescriptor();
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        var desc3 = new ActionDescriptor();
        
        // 设置主通道色阶值
        var list = new ActionList();
        list.putDouble(0);    // 黑点
        list.putDouble(1.0);  // 灰点
        list.putDouble(255);  // 白点
        desc3.putList(charIDToTypeID("Lvls"), list);
        
        // 设置通道为RGB主通道
        desc3.putInteger(charIDToTypeID("Chnl"), 0);
        
        desc2.putObject(stringIDToTypeID("levels"), stringIDToTypeID("levelsType"), desc3);
        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Adjs"), desc2);
        
        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    }
}

// 新建曲线调整图层
function btn_layer_curves() {
    // 开始历史记录
    app.activeDocument.suspendHistory("创建曲线调整图层", "executeCreateCurves()");
    
    function executeCreateCurves() {
        // 创建曲线调整图层
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass(stringIDToTypeID("adjustmentLayer"));
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        desc2.putClass(stringIDToTypeID("type"), stringIDToTypeID("curves"));
        desc.putObject(charIDToTypeID("Usng"), stringIDToTypeID("adjustmentLayer"), desc2);
        
        executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
        
        // 获取新创建的图层
        var doc = app.activeDocument;
        var layer = doc.activeLayer;
        layer.name = "曲线";
        
        // 设置默认曲线参数 (线性无调整)
        setCurvesParameters();
    }
    
    function setCurvesParameters() {
        // 获取当前图层引用
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        
        // 设置曲线参数
        var desc = new ActionDescriptor();
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        var desc3 = new ActionDescriptor();
        
        // 设置通道为RGB主通道
        desc3.putInteger(charIDToTypeID("Chnl"), 0);
        
        // 设置曲线点 (线性: 黑点、中点、白点)
        var pointList = new ActionList();
        
        // 添加黑点 (0,0)
        var pointDesc1 = new ActionDescriptor();
        pointDesc1.putDouble(charIDToTypeID("Hrzn"), 0);     // 输入值
        pointDesc1.putDouble(charIDToTypeID("Vrtc"), 0);     // 输出值
        pointList.putObject(charIDToTypeID("Pnt "), pointDesc1);
        
        // 添加中点 (128,128)
        var pointDesc2 = new ActionDescriptor();
        pointDesc2.putDouble(charIDToTypeID("Hrzn"), 128);   // 输入值
        pointDesc2.putDouble(charIDToTypeID("Vrtc"), 128);   // 输出值
        pointList.putObject(charIDToTypeID("Pnt "), pointDesc2);
        
        // 添加白点 (255,255)
        var pointDesc3 = new ActionDescriptor();
        pointDesc3.putDouble(charIDToTypeID("Hrzn"), 255);   // 输入值
        pointDesc3.putDouble(charIDToTypeID("Vrtc"), 255);   // 输出值
        pointList.putObject(charIDToTypeID("Pnt "), pointDesc3);
        
        desc3.putList(charIDToTypeID("CrvA"), pointList);
        desc2.putObject(stringIDToTypeID("curves"), stringIDToTypeID("curvesType"), desc3);
        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Adjs"), desc2);
        
        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    }
}

// 新建色相/饱和度调整图层
function btn_layer_hueSaturation() {
    app.activeDocument.suspendHistory("创建色相/饱和度调整图层", "executeCreateHueSaturation()");
    
    function executeCreateHueSaturation() {
        // 创建调整图层
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass(stringIDToTypeID("adjustmentLayer"));
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        desc2.putClass(stringIDToTypeID("type"), stringIDToTypeID("hueSaturation"));
        desc.putObject(charIDToTypeID("Usng"), stringIDToTypeID("adjustmentLayer"), desc2);
        
        executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
        
        // 命名图层
        var layer = app.activeDocument.activeLayer;
        layer.name = "色相/饱和度";
        
        // 设置默认参数 (无变化)
        setHueSaturationParameters(0, 0, 0); // 色相=0, 饱和度=0, 明度=0
    }
    
    function setHueSaturationParameters(hue, saturation, lightness) {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        
        var desc = new ActionDescriptor();
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        var desc3 = new ActionDescriptor();
        
        // 设置主通道调整
        desc3.putInteger(charIDToTypeID("H   "), hue);         // 色相 (-180 to 180)
        desc3.putInteger(charIDToTypeID("Strt"), saturation); // 饱和度 (-100 to 100)
        desc3.putInteger(charIDToTypeID("Lght"), lightness);  // 明度 (-100 to 100)
        
        // 启用主通道
        desc3.putBoolean(stringIDToTypeID("colorize"), false);
        
        desc2.putObject(stringIDToTypeID("hueSaturation"), stringIDToTypeID("hueSaturationType"), desc3);
        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Adjs"), desc2);
        
        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    }
}

// 新建色彩平衡调整图层
function btn_layer_colorBalance() {
    app.activeDocument.suspendHistory("创建色彩平衡调整图层", "executeCreateColorBalance()");
    
    function executeCreateColorBalance() {
        // 创建调整图层
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putClass(stringIDToTypeID("adjustmentLayer"));
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        desc2.putClass(stringIDToTypeID("type"), stringIDToTypeID("colorBalance"));
        desc.putObject(charIDToTypeID("Usng"), stringIDToTypeID("adjustmentLayer"), desc2);
        
        executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
        
        // 命名图层
        var layer = app.activeDocument.activeLayer;
        layer.name = "色彩平衡";
        
        // 设置默认参数 (无变化)
        setColorBalanceParameters(0, 0, 0);
    }
    
    function setColorBalanceParameters(shadows, midtones, highlights) {
        var ref = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        
        var desc = new ActionDescriptor();
        desc.putReference(charIDToTypeID("null"), ref);
        
        var desc2 = new ActionDescriptor();
        var desc3 = new ActionDescriptor();
        
        // 设置暗调平衡 (青-红, 洋红-绿, 黄-蓝)
        var shadowsList = new ActionList();
        shadowsList.putInteger(0); // 青色-红色
        shadowsList.putInteger(0); // 洋红-绿色
        shadowsList.putInteger(0); // 黄色-蓝色
        desc3.putList(charIDToTypeID("Shdw"), shadowsList);
        
        // 设置中间调平衡
        var midtonesList = new ActionList();
        midtonesList.putInteger(0);
        midtonesList.putInteger(0);
        midtonesList.putInteger(0);
        desc3.putList(charIDToTypeID("Mdtn"), midtonesList);
        
        // 设置高光平衡
        var highlightsList = new ActionList();
        highlightsList.putInteger(0);
        highlightsList.putInteger(0);
        highlightsList.putInteger(0);
        desc3.putList(charIDToTypeID("Hglt"), highlightsList);
        
        // 保持明度
        desc3.putBoolean(charIDToTypeID("prsL"), true);
        
        desc2.putObject(stringIDToTypeID("colorBalance"), stringIDToTypeID("colorBalanceType"), desc3);
        desc.putObject(charIDToTypeID("T   "), charIDToTypeID("Adjs"), desc2);
        
        executeAction(charIDToTypeID("setd"), desc, DialogModes.NO);
    }
}
