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
ColdFusion.RichText.registerAfterSet=function(_422){
if(ColdFusion.RichText.editorState[_422]){
var _423=function(){
ColdFusion.RichText.fireChangeEvent(_422);
};
var _424=CKEDITOR.instances[_422];
_424.on("OnAfterSetHTML",_423);
}else{
setTimeout(function(){
ColdFusion.RichText.registerAfterSet(_422);
},1000);
}
};
ColdFusion.RichText.getEditorObject=function(_425){
if(!_425){
ColdFusion.handleError(null,"richtext.geteditorobject.missingtextareaname","widget",null,null,null,true);
return;
}
var _426=ColdFusion.objectCache[_425];
if(_426==null||CKEDITOR.editor.prototype.isPrototypeOf(_426)==false){
ColdFusion.handleError(null,"richtext.geteditorobject.notfound","widget",[_425],null,null,true);
return;
}
return CKEDITOR.instances[_426.richtextid];
};
ColdFusion.RichText.setValue=function(_427,_428){
if(ColdFusion.RichText.editorState[_427]){
var _429=CKEDITOR.instances[_427];
_429.setData(_428);
_429.fire("onAfterSetHTML");
}else{
setTimeout(function(){
ColdFusion.RichText.setValue(_427,_428);
},1000);
}
};
ColdFusion.RichText.getValue=function(_42a){
if(ColdFusion.RichText.editorState[_42a]){
return CKEDITOR.instances[_42a].getData();
}else{
ColdFusion.Log.error("richtext.initialize.getvalue.notready","widget",[_42a]);
return null;
}
};
ColdFusion.RichText.fireChangeEvent=function(_42b){
var _42c=ColdFusion.objectCache[_42b];
ColdFusion.Log.info("richtext.firechangeevent.firechange","widget",[_42c._cf_name]);
var _42d=document.getElementById(_42b);
if(_42d){
if(_42d.fireEvent){
_42d.fireEvent("onchange");
}
if(document.createEvent){
var evt=document.createEvent("HTMLEvents");
if(evt.initEvent){
evt.initEvent("change",true,true);
}
if(_42d.dispatchEvent){
_42d.dispatchEvent(evt);
}
}
}
ColdFusion.Event.callBindHandlers(_42b,null,"change");
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
var _434=e.editor.name;
if(parameters[_434].Id){
ColdFusion.RichText.editorState[parameters[_434].Id]=false;
e.editor.richtextid=parameters[_434].Id;
ColdFusion.objectCache[parameters[_434].Id]=e.editor;
}
if(parameters[_434].Name){
e.editor._cf_name=parameters[_434].Name;
ColdFusion.objectCache[parameters[_434].Name]=e.editor;
}
if(parameters[_434].Val){
e.editor.Value=parameters[_434].Val;
}
e.editor._cf_setValue=function(_435){
ColdFusion.RichText.setValue(_434,_435);
};
e.editor._cf_getAttribute=function(){
return ColdFusion.RichText.getValue(_434);
};
e.editor._cf_register=function(_436,_437,_438){
var _439=document.getElementById(_434);
if(_439){
ColdFusion.Event.addListener(_439,_436,_437,_438);
}
};
});
ColdFusion.RichText.initialize=function(Id,Name,Val,_43d,_43e,_43f,_440,_441,_442,Skin,_444,_445,_446,_447,_448){
parameters[Id]={};
parameters[Id].Id=Id;
parameters[Id].Name=Name;
parameters[Id].Val=Val;
var _449=function(evt){
if(_444==true){
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
var _44b={on:{"instanceReady":_449}};
_44b["toolbar"]="Default";
if(_43f!=null){
_44b["height"]=_43f;
}
if(_43e!=null){
_44b["width"]=_43e;
}
if(_440!=null){
_44b["font_names"]=_440;
}
if(_441!=null){
_44b["fontSize_sizes"]=_441;
}
if(_442!=null){
_44b["format_tags"]=_442;
}
if(Skin!=null){
_44b["skin"]=Skin;
}
if(_444==true){
_44b["toolbarCanCollapse"]=false;
}
if(_445!=null){
_44b["toolbar"]=_445;
}
var _44c=CKEDITOR.replace(Id,_44b);
};
