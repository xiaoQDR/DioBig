function doContentAwareFill() {
    if (app.documents.length === 0) {
        alert("没有打开任何文档！");
        return;
    }

    if (!app.activeDocument.selection) {
        alert("请先创建一个选区！");
        return;
    }

    var idfill = charIDToTypeID("Fl  ");
    var desc = new ActionDescriptor();
    var iduse = charIDToTypeID("Usng");
    var idfillContent = stringIDToTypeID("fillContent");
    var idcontentAware = stringIDToTypeID("contentAware");
    desc.putEnumerated(iduse, idfillContent, idcontentAware);
    executeAction(idfill, desc, DialogModes.NO);
}