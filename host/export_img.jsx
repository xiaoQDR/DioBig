// 选择导出文件夹，返回路径
function selectExportFolder() {
    var folder = Folder.selectDialog("请选择导出文件夹");
    if (folder) {
        return folder.fsName;
    } else {
        return "";
    }
}

// 不缩放，直接导出JPG
function exportJPGToPath(outputPath) {
    if (!outputPath) {
        alert("未设置导出路径！");
        return;
    }
    if (app.documents.length === 0) {
        alert("没有打开的文档！");
        return;
    }

    var doc = app.activeDocument;
    var fileName = doc.name.replace(/\.[^\.]+$/, '');
    var jpgFile = new File(outputPath + "/" + fileName + ".jpg");

    var jpgOptions = new JPEGSaveOptions();
    jpgOptions.quality = 12;
    jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgOptions.scans = 3;
    jpgOptions.matte = MatteType.NONE;

    doc.saveAs(jpgFile, jpgOptions, true);
    alert("✅ JPG文件已保存至: " + jpgFile.fsName);
}

// 不缩放，直接导出PNG
function exportPNGToPath(outputPath) {
    if (!outputPath) {
        alert("未设置导出路径！");
        return;
    }
    if (app.documents.length === 0) {
        alert("没有打开的文档！");
        return;
    }

    var doc = app.activeDocument;
    var fileName = doc.name.replace(/\.[^\.]+$/, '');
    var pngFile = new File(outputPath + "/" + fileName + ".png");

    var pngOptions = new PNGSaveOptions();
    pngOptions.interlaced = false;

    doc.saveAs(pngFile, pngOptions, true, Extension.LOWERCASE);
    alert("✅ PNG文件已保存至: " + pngFile.fsName);
}

// 缩放后导出JPG
function exportJPGToPathWithSize(outputPath, width, height) {
    if (!outputPath) {
        alert("未设置导出路径！");
        return;
    }
    if (app.documents.length === 0) {
        alert("没有打开的文档！");
        return;
    }

    var doc = app.activeDocument;
    var fileName = doc.name.replace(/\.[^\.]+$/, '');
    var dup = doc.duplicate(); // 复制
    dup.resizeImage(UnitValue(width, "px"), UnitValue(height, "px"), null, ResampleMethod.BICUBIC);

    var jpgFile = new File(outputPath + "/" + fileName + "_" + width + "x" + height + ".jpg");

    var jpgOptions = new JPEGSaveOptions();
    jpgOptions.quality = 12;
    jpgOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgOptions.scans = 3;
    jpgOptions.matte = MatteType.NONE;

    dup.saveAs(jpgFile, jpgOptions, true);
    dup.close(SaveOptions.DONOTSAVECHANGES);

    alert("✅ JPG文件已导出: " + jpgFile.fsName);
}

// 缩放后导出PNG
function exportPNGToPathWithSize(outputPath, width, height) {
    if (!outputPath) {
        alert("未设置导出路径！");
        return;
    }
    if (app.documents.length === 0) {
        alert("没有打开的文档！");
        return;
    }

    var doc = app.activeDocument;
    var fileName = doc.name.replace(/\.[^\.]+$/, '');
    var dup = doc.duplicate(); // 复制
    dup.resizeImage(UnitValue(width, "px"), UnitValue(height, "px"), null, ResampleMethod.BICUBIC);

    var pngFile = new File(outputPath + "/" + fileName + "_" + width + "x" + height + ".png");

    var pngOptions = new PNGSaveOptions();
    pngOptions.interlaced = false;

    dup.saveAs(pngFile, pngOptions, true, Extension.LOWERCASE);
    dup.close(SaveOptions.DONOTSAVECHANGES);

    alert("✅ PNG文件已导出: " + pngFile.fsName);
}