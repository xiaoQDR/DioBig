
// 新建图层 + 填充颜色 + 设置颜色混合模式
function inspect_tool_gray() {
    var doc = app.activeDocument;

    // 检查是否已存在 "DioBigGray" 图层
    var found = false;
    for (var i = 0; i < doc.artLayers.length; i++) {
        if (doc.artLayers[i].name == "DioBigGray") {
            // 找到了，删除它
            doc.artLayers[i].remove();
            found = true;
            break;
        }
    }

    // 如果找到了并删除，就直接结束
    if (found) {
        return;
    }

    // 否则执行原来的逻辑
    var newLayer = doc.artLayers.add();
    newLayer.name = "DioBigGray";

    doc.activeLayer = newLayer;

    var fillColor = new SolidColor();
    fillColor.rgb.red = 128;
    fillColor.rgb.green = 128;
    fillColor.rgb.blue = 128;

    doc.selection.selectAll();
    doc.selection.fill(fillColor, ColorBlendMode.NORMAL, 100, false);
    doc.selection.deselect();

    newLayer.blendMode = BlendMode.COLORBLEND;
}


// 新建图层 + 填充颜色 + 设置颜色混合模式
function inspect_tool_color() {
    var doc = app.activeDocument;

    // 检查是否已存在 "DioBigColor" 图层
    var found = false;
    for (var i = 0; i < doc.artLayers.length; i++) {
        if (doc.artLayers[i].name == "DioBigColor") {
            // 找到了，删除它
            doc.artLayers[i].remove();
            found = true;
            break;
        }
    }

    // 如果找到了并删除，就直接结束
    if (found) {
        return;
    }

    // 否则执行原来的逻辑
    var newLayer = doc.artLayers.add();
    newLayer.name = "DioBigColor";

    doc.activeLayer = newLayer;

    var fillColor = new SolidColor();
    fillColor.rgb.red = 128;
    fillColor.rgb.green = 128;
    fillColor.rgb.blue = 128;

    doc.selection.selectAll();
    doc.selection.fill(fillColor, ColorBlendMode.NORMAL, 100, false);
    doc.selection.deselect();

    // 设置混合模式为“亮度”
    newLayer.blendMode = BlendMode.LUMINOSITY;
}
