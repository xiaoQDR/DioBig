// 创建 iro.js 颜色选择器
var colorPicker = new iro.ColorPicker("#picker", {
  width: 250,
  layout: [
    { 
      component: iro.ui.Box 
    },
    { 
      component: iro.ui.Slider, 
      options: { sliderType: 'hue' }
    },
    { 
      component: iro.ui.Slider, 
      options: { sliderType: 'saturation' }
    },
    { 
      component: iro.ui.Slider, 
      options: { sliderType: 'value' }
    },
    // { 
    //   // L 近似 (HSL Lightness)
    //   component: iro.ui.Slider,
    //   options: { sliderType: 'lightness' }
    // },
    { 
      // a 通道近似 (Red)
      component: iro.ui.Slider,
      options: { sliderType: 'red' }
    },
    { 
      // b 通道近似 (Blue)
      component: iro.ui.Slider,
      options: { sliderType: 'blue' }
    }
  ],
  color: "#ff00ff"
});

// 当颜色变化时触发
colorPicker.on("color:change", function(color) {
  // 将颜色转为 Photoshop 的 RGB 格式
  var r = Math.round(color.rgb.r);
  var g = Math.round(color.rgb.g);
  var b = Math.round(color.rgb.b);

  // 通过 evalScript 调用 ExtendScript 设置前景色
  cs.evalScript(`
    var color = new SolidColor();
    color.rgb.red = ${r};
    color.rgb.green = ${g};
    color.rgb.blue = ${b};
    app.foregroundColor = color;
  `);
});
