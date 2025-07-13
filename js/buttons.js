
//ps工具类
// 套索工具
document.getElementById("btn_tool_Lasso").addEventListener("click", function () {
  cs.evalScript("tool_ps_Lasso()");
});

// 多边形套索
document.getElementById("btn_tool_PolygonLasso").addEventListener("click", function () {
  cs.evalScript("tool_ps_PolygonLasso()");
});

// 矩形选框
document.getElementById("btn_tool_RectMarquee").addEventListener("click", function () {
  cs.evalScript("tool_ps_RectMarquee()");
});

// 椭圆选框
document.getElementById("btn_tool_EllipticalMarquee").addEventListener("click", function () {
  cs.evalScript("tool_ps_EllipticalMarquee()");
});

// 单行选择
document.getElementById("btn_tool_SingleRow").addEventListener("click", function () {
  cs.evalScript("tool_ps_SingleRowMarquee()");
});

// 单列选择
document.getElementById("btn_tool_SingleColumn").addEventListener("click", function () {
  cs.evalScript("tool_ps_SingleColumnMarquee()");
});



document.getElementById("btn_content_fill").addEventListener("click", function () {
  cs.evalScript("doContentAwareFill()");
});


//文档工具类
// 清理元数据
document.getElementById("btn_doc_cleardata").addEventListener("click", function () {
  cs.evalScript("doc_cleardata()");
});







//通道操作
// 显示红通道
document.getElementById("btn_show_red").addEventListener("click", function () {
  cs.evalScript(`
        var red = app.activeDocument.channels.getByName("红");
        app.activeDocument.activeChannels = [red];
    `);
});

// 显示绿通道
document.getElementById("btn_show_green").addEventListener("click", function () {
  cs.evalScript(`
        var green = app.activeDocument.channels.getByName("绿");
        app.activeDocument.activeChannels = [green];
    `);
});

// 显示蓝通道
document.getElementById("btn_show_blue").addEventListener("click", function () {
  cs.evalScript(`
        var blue = app.activeDocument.channels.getByName("蓝");
        app.activeDocument.activeChannels = [blue];
    `);
});

// 恢复RGB
document.getElementById("btn_show_rgb").addEventListener("click", function () {
  cs.evalScript(`
        app.activeDocument.activeChannels = [
            app.activeDocument.channels.getByName("红"),
            app.activeDocument.channels.getByName("绿"),
            app.activeDocument.channels.getByName("蓝")
        ];
    `);
});







//图层操作
// 新建图层
document.getElementById("btn_layer_new").addEventListener("click", function () {
  cs.evalScript("btn_layer_new()");
});

document.getElementById("btn_layer_delete").addEventListener("click", function () {
  cs.evalScript("btn_layer_delete()");
});

document.getElementById("btn_layer_addmask").addEventListener("click", function () {
  cs.evalScript("btn_layer_addmask()");
});

document.getElementById("btn_layer_Gmask").addEventListener("click", function () {
  cs.evalScript("btn_layer_Gmask()");
});

document.getElementById("btn_layer_pathmask").addEventListener("click", function () {
  cs.evalScript("btn_laye_pathmask()");
});



document.getElementById("btn_new_solidcolor").addEventListener("click", function () {
  cs.evalScript("btn_layer_solidcolor()");
});
document.getElementById("btn_new_brightness").addEventListener("click", function () {
  cs.evalScript("btn_layer_brightnessContrast()");
});
document.getElementById("btn_new_levels").addEventListener("click", function () {
  cs.evalScript("btn_layer_levels()");
});
document.getElementById("btn_new_curves").addEventListener("click", function () {
  cs.evalScript("btn_layer_curves()");
});
document.getElementById("btn_new_hue").addEventListener("click", function () {
  cs.evalScript("btn_layer_hueSaturation()");
});
document.getElementById("btn_new_colorbalance").addEventListener("click", function () {
  cs.evalScript("btn_layer_colorBalance()");
});


//视图检查
document.getElementById("btn_inspect_gray").addEventListener("click", function () {
  cs.evalScript("inspect_tool_gray()");
});
document.getElementById("btn_inspect_color").addEventListener("click", function () {
  cs.evalScript("inspect_tool_color()");
});

//模糊
document.getElementById("btn_blur_image").addEventListener("click", function () {
  // 这里可以改 radius 数值
  var radius = 10;
  cs.evalScript("applyGaussianBlur(" + radius + ")");
});


//text
document.getElementById("text").addEventListener("click", function () {
  alert("text1");
  cs.evalScript("text()");
});








document.getElementById("btn_duplicate_blur").addEventListener("click", function () {
  cs.evalScript("alert(typeof duplicateAndBlur)");
});