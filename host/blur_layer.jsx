function mergeAndBlurCopies() {
    if (app.documents.length > 0) {
        var doc = app.activeDocument;

        // 选择整个画布
        doc.selection.selectAll();

        // 执行“编辑 > 复制合并”
        var idCpyM = charIDToTypeID("CpyM");
        executeAction(idCpyM, undefined, DialogModes.NO);

        // 取消选区
        doc.selection.deselect();

        // 新建图层
        var newLayer = doc.artLayers.add();
        doc.activeLayer = newLayer;

        // 粘贴合并内容
        doc.paste();

        // 当前图层就是粘贴好的合并图层
        var baseLayer = doc.activeLayer;

        // 要应用的模糊值 (3,2,1)
        var blurValues = [3, 2, 1];

        for (var i = 0; i < blurValues.length; i++) {
            // 复制
            var duplicateLayer = baseLayer.duplicate();
            duplicateLayer.name = "Merged Copy Blur " + blurValues[i] + "px";

            // 设置为当前活动图层
            doc.activeLayer = duplicateLayer;

            // 应用高斯模糊
            duplicateLayer.applyGaussianBlur(blurValues[i]);

            // 创建黑色蒙版 (隐藏全部)
            var hasSelection = false;

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

            // Hide All (黑色蒙版)
            var idHid = charIDToTypeID("HdAl");
            desc.putEnumerated(idUsng, idUsrM, idHid);

            executeAction(idMk, desc, DialogModes.NO);
        }

    } else {
        alert("请先打开一个文档！");
    }
}