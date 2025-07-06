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

        xmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "DocumentAncestors");
        doc.xmpMetadata.rawData = xmp.serialize();

        alert("✅ 文档历史数据清理完成！");
        return "清理完成";
    } else {
        alert("当前宿主不是 Photoshop，脚本未执行。");
        return "未执行：不是Photoshop";
    }
}

