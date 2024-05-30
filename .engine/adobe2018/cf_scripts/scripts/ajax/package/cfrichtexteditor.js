/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
ColdFusion.RichText||(ColdFusion.RichText={});
ColdFusion.RichText.editorState={};
ColdFusion.RichText.buffer=null;
ColdFusion.RichText.registerAfterSet=function(_8e6){
if(ColdFusion.RichText.editorState[_8e6]){
var _8e7=function(){
ColdFusion.RichText.fireChangeEvent(_8e6);
};
var _8e8=CKEDITOR.instances[_8e6];
_8e8.on("OnAfterSetHTML",_8e7);
}else{
setTimeout("ColdFusion.RichText.registerAfterSet('"+_8e6+"')",1000);
}
};
ColdFusion.RichText.getEditorObject=function(_8e9){
if(!_8e9){
ColdFusion.handleError(null,"richtext.geteditorobject.missingtextareaname","widget",null,null,null,true);
return;
}
var _8ea=ColdFusion.objectCache[_8e9];
if(_8ea==null||CKEDITOR.editor.prototype.isPrototypeOf(_8ea)==false){
ColdFusion.handleError(null,"richtext.geteditorobject.notfound","widget",[_8e9],null,null,true);
return;
}
return CKEDITOR.instances[_8ea.richtextid];
};
ColdFusion.RichText.setValue=function(_8eb,_8ec){
if(ColdFusion.RichText.editorState[_8eb]){
var _8ed=CKEDITOR.instances[_8eb];
_8ed.setData(_8ec);
_8ed.fire("onAfterSetHTML");
}else{
setTimeout("ColdFusion.RichText.setValue(\""+_8eb+"\",\""+_8ec+"\")",1000);
}
};
ColdFusion.RichText.getValue=function(_8ee){
if(ColdFusion.RichText.editorState[_8ee]){
return CKEDITOR.instances[_8ee].getData();
}else{
ColdFusion.Log.error("richtext.initialize.getvalue.notready","widget",[_8ee]);
return null;
}
};
ColdFusion.RichText.fireChangeEvent=function(_8ef){
var _8f0=ColdFusion.objectCache[_8ef];
ColdFusion.Log.info("richtext.firechangeevent.firechange","widget",[_8f0._cf_name]);
var _8f1=document.getElementById(_8ef);
if(_8f1){
if(_8f1.fireEvent){
_8f1.fireEvent("onchange");
}
if(document.createEvent){
var evt=document.createEvent("HTMLEvents");
if(evt.initEvent){
evt.initEvent("change",true,true);
}
if(_8f1.dispatchEvent){
_8f1.dispatchEvent(evt);
}
}
}
ColdFusion.Event.callBindHandlers(_8ef,null,"change");
};
ColdFusion.RichText.editor_onfocus=function(e){
document.getElementById(e.editor.id+"_top").style.display="block";
};
ColdFusion.RichText.editor_onblur=function(e){
document.getElementById(e.editor.id+"_top").style.display="none";
};
ColdFusion.RichText.setChangeBuffer=function(e){
ColdFusion.RichText.buffer=CKEDITOR.instances[e.editor.name].getData();
};
ColdFusion.RichText.resetChangeBuffer=function(e){
if(ColdFusion.RichText.buffer!=CKEDITOR.instances[e.editor.name].getData()){
ColdFusion.RichText.fireChangeEvent(e.editor.name);
}
ColdFusion.RichText.buffer=null;
};
var parameters={};
CKEDITOR.on("instanceCreated",function(e){
var _8f8=e.editor.name;
if(parameters[_8f8].Id){
ColdFusion.RichText.editorState[parameters[_8f8].Id]=false;
e.editor.richtextid=parameters[_8f8].Id;
ColdFusion.objectCache[parameters[_8f8].Id]=e.editor;
}
if(parameters[_8f8].Name){
e.editor._cf_name=parameters[_8f8].Name;
ColdFusion.objectCache[parameters[_8f8].Name]=e.editor;
}
if(parameters[_8f8].Val){
e.editor.Value=parameters[_8f8].Val;
}
e.editor._cf_setValue=function(_8f9){
ColdFusion.RichText.setValue(_8f8,_8f9);
};
e.editor._cf_getAttribute=function(){
return ColdFusion.RichText.getValue(_8f8);
};
e.editor._cf_register=function(_8fa,_8fb,_8fc){
var _8fd=document.getElementById(_8f8);
if(_8fd){
ColdFusion.Event.addListener(_8fd,_8fa,_8fb,_8fc);
}
};
});
ColdFusion.RichText.initialize=function(Id,Name,Val,_901,_902,_903,_904,_905,_906,Skin,_908,_909,_90a,_90b,_90c){
parameters[Id]={};
parameters[Id].Id=Id;
parameters[Id].Name=Name;
parameters[Id].Val=Val;
var _90d=function(evt){
if(_908==true){
evt.editor.on("focus",ColdFusion.RichText.editor_onfocus);
evt.editor.on("blur",ColdFusion.RichText.editor_onblur);
document.getElementById(evt.editor.id+"_top").style.display="none";
}
evt.editor.on("focus",ColdFusion.RichText.setChangeBuffer);
evt.editor.on("blur",ColdFusion.RichText.resetChangeBuffer);
ColdFusion.RichText.editorState[evt.editor.name]=true;
if(ColdFusion.RichText.OnComplete){
ColdFusion.RichText.OnComplete(evt.editor);
}
};
var _90f={on:{"instanceReady":_90d}};
_90f["toolbar"]="Default";
if(_903!=null){
_90f["height"]=_903;
}
if(_902!=null){
_90f["width"]=_902;
}
if(_904!=null){
_90f["font_names"]=_904;
}
if(_905!=null){
_90f["fontSize_sizes"]=_905;
}
if(_906!=null){
_90f["format_tags"]=_906;
}
if(Skin!=null){
_90f["skin"]=Skin;
}
if(_908==true){
_90f["toolbarCanCollapse"]=false;
}
if(_909!=null){
_90f["toolbar"]=_909;
}
var _910=CKEDITOR.replace(Id,_90f);
};
