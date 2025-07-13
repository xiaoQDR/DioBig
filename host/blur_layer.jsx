function duplicateAndBlur() {
    if (app.documents.length === 0) {
        alert("没有打开任何文档！");
        return;
    }

    var doc = app.activeDocument;
    var activeLayer = doc.activeLayer;

    if (!activeLayer.isBackgroundLayer && activeLayer.visible) {
        // 复制第一份
        activeLayer.duplicate();
        // 复制第二份
        activeLayer.duplicate();
        alert("已复制两份图层！");
    } else {
        alert("当前图层不可操作（可能是背景层或不可见）。");
    }
}