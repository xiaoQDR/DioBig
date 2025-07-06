function generateImage() {
  const prompt = document.getElementById("prompt").value.trim();
  if (!prompt) {
    document.getElementById("status").innerText = "请输入提示词";
    return;
  }
  
  document.getElementById("status").innerText = "正在生成...";

  fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt,
      steps: 20
    })
  })
  .then(response => response.json())
  .then(data => {
    const base64 = data.images[0];
    document.getElementById("status").innerText = "生成完毕，正在导入PS...";
    
    // 调用JSX脚本把图片送进Photoshop
    const script = `importSDImage("${base64}");`;
    new CSInterface().evalScript(script, function(result){
      document.getElementById("status").innerText = "已导入PS";
    });
  })
  .catch(err => {
    console.error(err);
    document.getElementById("status").innerText = "生成失败：" + err;
  });
}
