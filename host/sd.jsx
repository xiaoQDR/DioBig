function importSDImage(base64) {
    // 把Base64字符串转成二进制
    var decoded = decodeBase64(base64);

    // 创建临时文件
    var tempFile = new File(Folder.temp + "/sd_temp.png");
    tempFile.encoding = "BINARY";
    tempFile.open("w");
    tempFile.write(decoded);
    tempFile.close();

    // 在Photoshop中打开该文件
    var doc = app.open(tempFile);

    // 可选：把它复制进当前文档
    /*
    var targetDoc = app.activeDocument;
    doc.activeLayer.duplicate(targetDoc, ElementPlacement.PLACEATBEGINNING);
    doc.close(SaveOptions.DONOTSAVECHANGES);
    */

    // 如果要保留新文档，就注释上面3行
}

// 把Base64字符串转二进制
function decodeBase64(b64) {
    var binary = "";
    var bytes = $.base64DecToArr(b64);
    for (var i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}

// ExtendScript的Base64解码
$.base64DecToArr = function(sBase64, nBlocksSize) {
    var sB64Enc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var sB64EncIdx = {};
    for (var i = 0; i < sB64Enc.length; i++) {
        sB64EncIdx[sB64Enc.charAt(i)] = i;
    }
    var nInLen = sBase64.length;
    var nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >>> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >>> 2;
    var taBytes = [];
    var nMod3;
    var nMod4;
    var nUint24 = 0;
    var nOutIdx = 0;
    for (var nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= sB64EncIdx[sBase64.charAt(nInIdx)] << (18 - 6 * nMod4);
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = (nUint24 >>> (16 >>> nMod3 & 24)) & 255;
            }
            nUint24 = 0;
        }
    }
    return taBytes;
};
