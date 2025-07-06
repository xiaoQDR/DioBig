
// 新建图层 + 填充颜色 + 设置颜色混合模式
function inspect_tool_gray() {
    var doc = app.activeDocument;

    // 新建图层
    var newLayer = doc.artLayers.add();
    newLayer.name = "DioBigGray";

    // 设置新图层为激活
    doc.activeLayer = newLayer;

    // 创建填充颜色
    var fillColor = new SolidColor();
    fillColor.rgb.red = 128;
    fillColor.rgb.green = 128;
    fillColor.rgb.blue = 128;

    // 全选画布
    doc.selection.selectAll();

    // 填充
    doc.selection.fill(fillColor, ColorBlendMode.NORMAL, 100, false);

    // 取消选区
    doc.selection.deselect();

    // 设置混合模式为“颜色”
    newLayer.blendMode = BlendMode.COLORBLEND;
}

// 新建图层 + 填充颜色 + 设置颜色混合模式
function inspect_tool_color() {
    var doc = app.activeDocument;

    // 新建图层
    var newLayer = doc.artLayers.add();
    newLayer.name = "DioBigColor";

    // 设置新图层为激活
    doc.activeLayer = newLayer;

    // 创建填充颜色
    var fillColor = new SolidColor();
    fillColor.rgb.red = 128;
    fillColor.rgb.green = 128;
    fillColor.rgb.blue = 128;

    // 全选画布
    doc.selection.selectAll();

    // 填充
    doc.selection.fill(fillColor, ColorBlendMode.NORMAL, 100, false);

    // 取消选区
    doc.selection.deselect();

    // 设置混合模式为“颜色”
    //newLayer.blendMode = BlendMode.COLORBLEND;
    newLayer.blendMode = BlendMode.LUMINOSITY;
}
