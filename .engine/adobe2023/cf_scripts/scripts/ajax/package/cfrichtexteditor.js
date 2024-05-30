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
ColdFusion.RichText.registerAfterSet=function(_6f2){
if(ColdFusion.RichText.editorState[_6f2]){
var _6f3=function(){
ColdFusion.RichText.fireChangeEvent(_6f2);
};
var _6f4=CKEDITOR.instances[_6f2];
_6f4.on("OnAfterSetHTML",_6f3);
}else{
setTimeout(function(){
ColdFusion.RichText.registerAfterSet(_6f2);
},1000);
}
};
ColdFusion.RichText.getEditorObject=function(_6f5){
if(!_6f5){
ColdFusion.handleError(null,"richtext.geteditorobject.missingtextareaname","widget",null,null,null,true);
return;
}
var _6f6=ColdFusion.objectCache[_6f5];
if(_6f6==null||CKEDITOR.editor.prototype.isPrototypeOf(_6f6)==false){
ColdFusion.handleError(null,"richtext.geteditorobject.notfound","widget",[_6f5],null,null,true);
return;
}
return CKEDITOR.instances[_6f6.richtextid];
};
ColdFusion.RichText.setValue=function(_6f7,_6f8){
if(ColdFusion.RichText.editorState[_6f7]){
var _6f9=CKEDITOR.instances[_6f7];
_6f9.setData(_6f8);
_6f9.fire("onAfterSetHTML");
}else{
setTimeout(function(){
ColdFusion.RichText.setValue(_6f7,_6f8);
},1000);
}
};
ColdFusion.RichText.getValue=function(_6fa){
if(ColdFusion.RichText.editorState[_6fa]){
return CKEDITOR.instances[_6fa].getData();
}else{
ColdFusion.Log.error("richtext.initialize.getvalue.notready","widget",[_6fa]);
return null;
}
};
ColdFusion.RichText.fireChangeEvent=function(_6fb){
var _6fc=ColdFusion.objectCache[_6fb];
ColdFusion.Log.info("richtext.firechangeevent.firechange","widget",[_6fc._cf_name]);
var _6fd=document.getElementById(_6fb);
if(_6fd){
if(_6fd.fireEvent){
_6fd.fireEvent("onchange");
}
if(document.createEvent){
var evt=document.createEvent("HTMLEvents");
if(evt.initEvent){
evt.initEvent("change",true,true);
}
if(_6fd.dispatchEvent){
_6fd.dispatchEvent(evt);
}
}
}
ColdFusion.Event.callBindHandlers(_6fb,null,"change");
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
var _704=e.editor.name;
if(parameters[_704].Id){
ColdFusion.RichText.editorState[parameters[_704].Id]=false;
e.editor.richtextid=parameters[_704].Id;
ColdFusion.objectCache[parameters[_704].Id]=e.editor;
}
if(parameters[_704].Name){
e.editor._cf_name=parameters[_704].Name;
ColdFusion.objectCache[parameters[_704].Name]=e.editor;
}
if(parameters[_704].Val){
e.editor.Value=parameters[_704].Val;
}
e.editor._cf_setValue=function(_705){
ColdFusion.RichText.setValue(_704,_705);
};
e.editor._cf_getAttribute=function(){
return ColdFusion.RichText.getValue(_704);
};
e.editor._cf_register=function(_706,_707,_708){
var _709=document.getElementById(_704);
if(_709){
ColdFusion.Event.addListener(_709,_706,_707,_708);
}
};
});
ColdFusion.RichText.initialize=function(Id,Name,Val,_70d,_70e,_70f,_710,_711,_712,Skin,_714,_715,_716,_717,_718){
parameters[Id]={};
parameters[Id].Id=Id;
parameters[Id].Name=Name;
parameters[Id].Val=Val;
var _719=function(evt){
if(_714==true){
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
var _71b={on:{"instanceReady":_719}};
_71b["toolbar"]="Default";
if(_70f!=null){
_71b["height"]=_70f;
}
if(_70e!=null){
_71b["width"]=_70e;
}
if(_710!=null){
_71b["font_names"]=_710;
}
if(_711!=null){
_71b["fontSize_sizes"]=_711;
}
if(_712!=null){
_71b["format_tags"]=_712;
}
if(Skin!=null){
_71b["skin"]=Skin;
}
if(_714==true){
_71b["toolbarCanCollapse"]=false;
}
if(_715!=null){
_71b["toolbar"]=_715;
}
var _71c=CKEDITOR.replace(Id,_71b);
};
