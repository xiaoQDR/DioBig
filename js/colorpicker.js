// 创建 iro.js 颜色选择器
var colorPicker = new iro.ColorPicker("#picker", {
  width: 250,
  layout: [
    { component: iro.ui.Box },
    { component: iro.ui.Slider, options: { sliderType: 'hue' } },
    { component: iro.ui.Slider, options: { sliderType: 'saturation' } },
    { component: iro.ui.Slider, options: { sliderType: 'value' } },
    { component: iro.ui.Slider, options: { sliderType: 'red' } },
    { component: iro.ui.Slider, options: { sliderType: 'blue' } }
  ],
  color: "#ff00ff"
});

// 当面板内颜色变化时，同步PS前景色
colorPicker.on("color:change", function(color) {
  var r = Math.round(color.rgb.r);
  var g = Math.round(color.rgb.g);
  var b = Math.round(color.rgb.b);

  cs.evalScript(`
    var c = new SolidColor();
    c.rgb.red = ${r};
    c.rgb.green = ${g};
    c.rgb.blue = ${b};
    app.foregroundColor = c;
  `);
});

// 手动刷新按钮
document.getElementById("btn_refresh_color").addEventListener("click", function() {
  cs.evalScript(`
    (function(){
      var c = app.foregroundColor.rgb;
      return c.red + "," + c.green + "," + c.blue;
    })();
  `, function(result) {
    if (result && typeof result === "string") {
      var parts = result.split(",");
      if (parts.length === 3) {
        var r = Math.round(parseFloat(parts[0]));
        var g = Math.round(parseFloat(parts[1]));
        var b = Math.round(parseFloat(parts[2]));
        // 更新色盘
        colorPicker.color.set({ r, g, b });
      }
    }
  });
});
