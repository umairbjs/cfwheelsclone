/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.FileUpload){
ColdFusion.FileUpload={};
}
var $FS=ColdFusion.FileUpload;
$FS.defaultSWFLocation=_cf_ajaxscriptsrc+"/resources/cf/assets/MultiFileUpload.swf";
var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;
var isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;
var isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;
var defaultAddButtonLabel="Add Files";
var defaultUploadButtonLabel="Upload";
var defaultClearButtonLabel="Clear All";
var defaultDeleteButtonLabel="Delete";
var defaultAddIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/addfile.png";
var defaultUploadIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/upload.png";
var defaultClearIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/clear.gif";
var defaultDeleteIcon=_cf_ajaxscriptsrc+"/resources/cf/images/fileupload/delete.png";
var defaultUploadSize=10*1024*1024;
var fileUploadPrefix="cf_fileUpload_";
ColdFusion.FileUpload.create=function(_30,_31,_32,_33,_34,_35,_36,_37,_38,_39,_3a,_3b,_3c,_3d,_3e,_3f,_40,_41,_42,_43,_44,_45,_46,_47,_48,_49,_4a,_4b,_4c,_4d){
var _4e={};
_4e.uploadDivId=_30;
_4e.fileUploadName=fileUploadPrefix+_30;
_4e.url_withoutQuery=_31;
_4e.url_queryString=_32;
_4e.url_CF_cookie=_33;
_4e.url=$FS.constructUrl(_31,_32,_33);
_4e.onCompleteHandler=_3b;
_4e.onUploadCompleteHandler=_3c;
_4e.onErrorHandler=_3d;
_4e.progressbar=_48;
if(_40==null){
_40="";
}
_4e.bgcolor=_40;
if(_41==null){
_41="";
}
_4e.selectcolor=_41;
if(_42==null){
_42="";
}
_4e.rollovercolor=_42;
if(_43==null){
_43="";
}
_4e.textcolor=_43;
if(_46==null){
_46="left";
}
_4e.titletextalign=_46;
if(_44==null){
_44="";
}
_4e.titletextcolor=_44;
if(_45==null){
_45="";
}
_4e.headercolor=_45;
_4e.bgcolor=_40;
_4e.bgcolor=_40;
if(_47==null){
_47="";
}
_4e.fileFilter=_47;
_4e.disableUploadButton=_4a;
if(_4c==null||typeof _4c=="undefined"){
_4c="window";
}
_4e.wmode=_4c;
_4e.stopOnError=_4b;
if(_34==null||typeof _34==="undefined"){
_34=defaultAddButtonLabel;
}
_4e.addIcon=defaultAddIcon;
_4e.addButtonLabel=_34;
if(_36==null||typeof _36==="undefined"){
_36=defaultUploadButtonLabel;
}
_4e.uploadButtonLabel=_36;
_4e.uploadIcon=defaultUploadIcon;
if(_38==null||typeof _38==="undefined"){
_38="File Upload ";
}
_4e.title=_38;
_4e.swfLocation=$FS.defaultSWFLocation;
if(_35==null||typeof _35==="undefined"){
_35=defaultClearButtonLabel;
}
_4e.clearButtonLabel=_35;
_4e.clearIcon=defaultClearIcon;
if(_37==null||typeof _37==="undefined"){
_37=defaultDeleteButtonLabel;
}
_4e.deleteButtonLabel=_37;
_4e.deleteIcon=defaultDeleteIcon;
if(_39==null||!typeof _39==="Number"){
_39=-1;
}
_4e.maxFileSelect=_39;
if(_3a==null||!typeof _3a==="number"){
_3a=defaultUploadSize;
}
_4e.maxUploadSize=_3a;
if(_3e==null||typeof _3e==="undefined"){
_3e=420;
}
_4e.widthInPx=_3e+"px";
_4e.width=_3e;
if(_3f==null||typeof _3f==="undefined"){
_3f=300;
}
_4e.heightInPx=_3f+"px";
_4e.height=_3f;
_4e.align=_4d;
ColdFusion.objectCache[_30]=_4e;
ColdFusion.objectCache[_4e.fileUploadName]=_4e;
var _4f=$FS.constructMarkup(_4e);
var _50=document.getElementById(_30);
_50.innerHTML=_4f;
ColdFusion.Log.info("fileupload.initialized","widget",[_30]);
};
$FS.constructMarkup=function(_51){
var str="";
if(isIE&&isWin&&!isOpera){
str+="<object width=\""+_51.width+"\" height=\""+_51.height+"\"";
str+=" id=\""+_51.fileUploadName+"\" name=\""+_51.playerName+"\" type=\"application/x-shockwave-flash\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" ";
str+=" data=\""+_51.swfLocation+"\">";
str+="<param name=\"movie\" value=\""+_51.swfLocation+"\" />";
str+="<param name=\"quality\" value=\""+_51.quality+"\" />";
str+="<param name=\"allowFullScreen\" value=\""+_51.fullScreen+"\" />";
str+="<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
str+="<param name=\"wmode\" value=\""+_51.wmode+"\" />";
str+="<param name=\"flashvars\" value=\"uniqueid="+_51.fileUploadName+"&url="+_51.url+"&addLabel="+_51.addButtonLabel+"&deleteLabel="+_51.deleteButtonLabel;
str+="&clearLabel="+_51.clearButtonLabel+"&uploadLabel="+_51.uploadButtonLabel+"&maxUploadSize="+_51.maxUploadSize+"&maxFileSelect="+_51.maxFileSelect+"&progress="+_51.progressbar;
str+="&stopOnError="+_51.stopOnError+"&hideUpload="+_51.disableUploadButton+"&bgcolor="+_51.bgcolor+"&fileFilter="+_51.fileFilter+"&deleteIcon="+_51.deleteIcon+"&title="+_51.title;
str+="&uploadIcon="+_51.uploadIcon+"&textcolor="+_51.textcolor+"&titletextcolor="+_51.titletextcolor+"&headercolor="+_51.headercolor+"&titletextalign="+_51.titletextalign+"&rollovercolor="+_51.rollovercolor+"&selectcolor="+_51.selectcolor+"\" />";
str+="</object>";
}else{
str="<embed src=\""+_51.swfLocation+"\" allowScriptAccess=\"samedomain\" pluginspage=\"http://www.adobe.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" wmode=\""+_51.wmode+"\"";
str+=" name=\""+_51.fileUploadName+"\" width=\""+_51.width+"\" height=\""+_51.height+"\" quality=\" "+_51.quality+"\"";
str+=" flashvars=\"uniqueid="+_51.fileUploadName+"&url="+_51.url+"&addLabel="+_51.addButtonLabel+"&deleteLabel="+_51.deleteButtonLabel;
str+="&clearLabel="+_51.clearButtonLabel+"&uploadLabel="+_51.uploadButtonLabel+"&maxUploadSize="+_51.maxUploadSize+"&maxFileSelect="+_51.maxFileSelect+"&progress="+_51.progressbar;
str+="&stopOnError="+_51.stopOnError+"&hideUpload="+_51.disableUploadButton+"&bgcolor="+_51.bgcolor+"&fileFilter="+_51.fileFilter+"&deleteIcon="+_51.deleteIcon+"&title="+_51.title;
str+="&uploadIcon="+_51.uploadIcon+"&textcolor="+_51.textcolor+"&titletextcolor="+_51.titletextcolor+"&headercolor="+_51.headercolor+"&titletextalign="+_51.titletextalign+"&rollovercolor="+_51.rollovercolor+"&selectcolor="+_51.selectcolor+"\" />";
}
return str;
};
$FS.constructUrl=function(_53,_54,_55){
var url=_53;
if(_54!=null){
url+="?"+_54;
if(_55!=null){
url+="%26"+_55;
}
}else{
if(_55!=null){
url+="?"+_55;
}
}
return url;
};
coldfusion_FileUploadSwf_complete=function(_57,_58){
var _59=$FS.getFileUploadComponent(_57);
var _5a=ColdFusion.objectCache[_57];
var _5b=_5a.onCompleteHandler;
if(_5b!=null&&typeof _5b=="function"){
_5b.call(this,_58);
}
$FS.addResultToArray(_58,_5a);
};
coldfusion_FileUploadSwf_onError=function(_5c,_5d){
var _5e=$FS.getFileUploadComponent(_5c);
var _5f=ColdFusion.objectCache[_5c];
var _60=_5f.onErrorHandler;
if(_60!=null&&typeof _60=="function"){
_60.call(this,_5d);
}
$FS.addResultToArray(_5d,_5f);
};
coldfusion_FileUploadSwf_UploadCompete=function(_61){
var _62=$FS.getFileUploadComponent(_61);
var _63=ColdFusion.objectCache[_61];
var _64=_63.onUploadCompleteHandler;
var _65=_63.resultArray;
if(_64!=null&&typeof _64=="function"){
_64.call(this,_65);
}
_63.resultArray=new Array();
};
$FS.addResultToArray=function(_66,_67){
var _68=_67.resultArray;
if(_68==null||typeof _68=="undefined"){
_68=_67.resultArray=new Array();
}
_68.push(_66);
};
$FS.cancelUpload=function(_69){
var _6a=fileUploadPrefix+_69;
var _6b=$FS.getFileUploadComponent(_6a);
if(_6b!=null){
_6b.cancelFileUpload();
}else{
ColdFusion.handleError(null,"fileupload.cancelupload.notfound","widget",[_69],null,null,true);
}
ColdFusion.Log.info("fileupload.cancelupload.cancelled","widget",[_69]);
};
$FS.getSelectedFiles=function(_6c){
var _6d=fileUploadPrefix+_6c;
var _6e=$FS.getFileUploadComponent(_6d);
if(_6e!=null){
return _6e.getSelectedFileArray();
}else{
ColdFusion.handleError(null,"fileupload.getSelectedFiles.notfound","widget",[_6c],null,null,true);
}
ColdFusion.Log.info("fileupload.getSelectedFiles.selected","widget",[_6c]);
};
$FS.clearAllFiles=function(_6f){
var _70=fileUploadPrefix+_6f;
var _71=$FS.getFileUploadComponent(_70);
if(_71!=null){
_71.clearAllUpload();
}else{
ColdFusion.handleError(null,"fileupload.clearallfiles.notfound","widget",[_6f],null,null,true);
}
ColdFusion.Log.info("fileupload.clearallfiles.cleared","widget",[_6f]);
};
$FS.setURL=function(_72,src){
var _74=$FS.getFileUploadComponent(fileUploadPrefix+_72);
var _75=ColdFusion.objectCache[_72];
if(_75==null||typeof (_75)=="undefined"){
ColdFusion.handleError(null,"fileupload.setURL.notfound","widget",[_72],null,null,true);
}
if(!src||src.length==0){
ColdFusion.handleError(null,"fileupload.setURL.invalidurl","widget",[_72],null,null,true);
}
var _76=null;
if(src.indexOf("?")>0){
_76=src.substring(src.indexOf("?")+1);
_76=escape(_76);
src=src.substring(0,src.indexOf("?"));
}
if(src.charAt(0)!="/"&&src.indexOf("://")<0){
var _77=_75.url_withoutQuery;
_77=unescape(_77);
var _78="";
if(_77||_77.indexOf("/")>-1){
_78=_77.substring(0,_77.lastIndexOf("/")+1);
}
var _79=_78+src;
var _7a=_79.split("/");
var _7b=new Array();
var _7c=0;
for(var i=0;i<_7a.length;i++){
if(_7a[i]==".."){
_7b[--_7c]="";
}else{
_7b[_7c++]=_7a[i];
}
}
src=_7b[0];
for(var i=1;i<_7c;i++){
src=src+"/"+_7b[i];
}
}
var _7e=$FS.constructUrl(src,_76,_75.url_CF_cookie);
_75.url=_7e;
_74.setSrc(_7e);
ColdFusion.Log.info("fileupload.setURL.urlset","widget",[_72,_7e]);
};
$FS.startUpload=function(_7f){
var _80=fileUploadPrefix+_7f;
var _81=$FS.getFileUploadComponent(_80);
if(_81!=null){
_81.submitUploadForm();
}else{
ColdFusion.handleError(null,"fileupload.startupload.notfound","widget",[_7f],null,null,true);
}
ColdFusion.Log.info("fileupload.startupload.started","widget",[_7f]);
};
$FS.getFileUploadComponent=function(_82){
if(navigator.appName.indexOf("Microsoft")!=-1){
if(window[_82]!=null){
return window[_82];
}else{
return document[_82];
}
}else{
return document[_82];
}
};
