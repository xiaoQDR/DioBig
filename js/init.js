// 初始化
var cs = new CSInterface();
var extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/host/";

// 加载 JSX 脚本
cs.evalScript('$.evalFile("' + extensionRoot + 'doc_tool.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'layer_tool.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'inspect_tool.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'ps_tool.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'sd.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'text.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'listenForegroundColor.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'content_aware_fill.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'blur_layer.jsx")');
cs.evalScript('$.evalFile("' + extensionRoot + 'export_img.jsx")');


