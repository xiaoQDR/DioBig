function doc_cleardata() {
    var whatApp = String(app.name);

    if (whatApp.search("Photoshop") > 0) {
        if (!documents.length) {
            alert("没有打开的文档，请先打开一个文档再执行脚本。");
            return "未执行：无文档";
        }

        if (ExternalObject.AdobeXMPScript == undefined) {
            ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
        }

        var doc = app.activeDocument;
        var xmp = new XMPMeta(doc.xmpMetadata.rawData);

        // 清除文档历史数据
        xmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "DocumentAncestors");
        doc.xmpMetadata.rawData = xmp.serialize();

        // 清除空白图层
        var layers = doc.artLayers;
        var deletedLayersCount = 0;

        for (var i = layers.length - 1; i >= 0; i--) {
            var layer = layers[i];

            // 检查图层是否为空
            if (layer.isBackgroundLayer || !layer.visible || layer.bounds[2] <= layer.bounds[0] || layer.bounds[3] <= layer.bounds[1]) {
                // 删除空白图层
                layer.remove();
                deletedLayersCount++;
            }
        }

        // 提示清理完成
        alert("✅ 文档历史数据和空白图层清理完成！" + (deletedLayersCount > 0 ? " 共删除 " + deletedLayersCount + " 个空白图层。" : ""));
        return "清理完成";
    } else {
        alert("当前宿主不是 Photoshop，脚本未执行。");
        return "未执行：不是Photoshop";
    }
}