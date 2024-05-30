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
ColdFusion.FileUpload.create=function(_674,_675,_676,_677,_678,_679,_67a,_67b,_67c,_67d,_67e,_67f,_680,_681,_682,_683,_684,_685,_686,_687,_688,_689,_68a,_68b,_68c,_68d,_68e,_68f,_690,_691){
var _692={};
_692.uploadDivId=_674;
_692.fileUploadName=fileUploadPrefix+_674;
_692.url_withoutQuery=_675;
_692.url_queryString=_676;
_692.url_CF_cookie=_677;
_692.url=$FS.constructUrl(_675,_676,_677);
_692.onCompleteHandler=_67f;
_692.onUploadCompleteHandler=_680;
_692.onErrorHandler=_681;
_692.progressbar=_68c;
if(_684==null){
_684="";
}
_692.bgcolor=_684;
if(_685==null){
_685="";
}
_692.selectcolor=_685;
if(_686==null){
_686="";
}
_692.rollovercolor=_686;
if(_687==null){
_687="";
}
_692.textcolor=_687;
if(_68a==null){
_68a="left";
}
_692.titletextalign=_68a;
if(_688==null){
_688="";
}
_692.titletextcolor=_688;
if(_689==null){
_689="";
}
_692.headercolor=_689;
_692.bgcolor=_684;
_692.bgcolor=_684;
if(_68b==null){
_68b="";
}
_692.fileFilter=_68b;
_692.disableUploadButton=_68e;
if(_690==null||typeof _690=="undefined"){
_690="window";
}
_692.wmode=_690;
_692.stopOnError=_68f;
if(_678==null||typeof _678==="undefined"){
_678=defaultAddButtonLabel;
}
_692.addIcon=defaultAddIcon;
_692.addButtonLabel=_678;
if(_67a==null||typeof _67a==="undefined"){
_67a=defaultUploadButtonLabel;
}
_692.uploadButtonLabel=_67a;
_692.uploadIcon=defaultUploadIcon;
if(_67c==null||typeof _67c==="undefined"){
_67c="File Upload ";
}
_692.title=_67c;
_692.swfLocation=$FS.defaultSWFLocation;
if(_679==null||typeof _679==="undefined"){
_679=defaultClearButtonLabel;
}
_692.clearButtonLabel=_679;
_692.clearIcon=defaultClearIcon;
if(_67b==null||typeof _67b==="undefined"){
_67b=defaultDeleteButtonLabel;
}
_692.deleteButtonLabel=_67b;
_692.deleteIcon=defaultDeleteIcon;
if(_67d==null||!typeof _67d==="Number"){
_67d=-1;
}
_692.maxFileSelect=_67d;
if(_67e==null||!typeof _67e==="number"){
_67e=defaultUploadSize;
}
_692.maxUploadSize=_67e;
if(_682==null||typeof _682==="undefined"){
_682=420;
}
_692.widthInPx=_682+"px";
_692.width=_682;
if(_683==null||typeof _683==="undefined"){
_683=300;
}
_692.heightInPx=_683+"px";
_692.height=_683;
_692.align=_691;
ColdFusion.objectCache[_674]=_692;
ColdFusion.objectCache[_692.fileUploadName]=_692;
var _693=$FS.constructMarkup(_692);
var _694=document.getElementById(_674);
_694.innerHTML=_693;
ColdFusion.Log.info("fileupload.initialized","widget",[_674]);
};
$FS.constructMarkup=function(_695){
var str="";
if(isIE&&isWin&&!isOpera){
str+="<object width=\""+_695.width+"\" height=\""+_695.height+"\"";
str+=" id=\""+_695.fileUploadName+"\" name=\""+_695.playerName+"\" type=\"application/x-shockwave-flash\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" ";
str+=" data=\""+_695.swfLocation+"\">";
str+="<param name=\"movie\" value=\""+_695.swfLocation+"\" />";
str+="<param name=\"quality\" value=\""+_695.quality+"\" />";
str+="<param name=\"allowFullScreen\" value=\""+_695.fullScreen+"\" />";
str+="<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
str+="<param name=\"wmode\" value=\""+_695.wmode+"\" />";
str+="<param name=\"flashvars\" value=\"uniqueid="+_695.fileUploadName+"&url="+_695.url+"&addLabel="+_695.addButtonLabel+"&deleteLabel="+_695.deleteButtonLabel;
str+="&clearLabel="+_695.clearButtonLabel+"&uploadLabel="+_695.uploadButtonLabel+"&maxUploadSize="+_695.maxUploadSize+"&maxFileSelect="+_695.maxFileSelect+"&progress="+_695.progressbar;
str+="&stopOnError="+_695.stopOnError+"&hideUpload="+_695.disableUploadButton+"&bgcolor="+_695.bgcolor+"&fileFilter="+_695.fileFilter+"&deleteIcon="+_695.deleteIcon+"&title="+_695.title;
str+="&uploadIcon="+_695.uploadIcon+"&textcolor="+_695.textcolor+"&titletextcolor="+_695.titletextcolor+"&headercolor="+_695.headercolor+"&titletextalign="+_695.titletextalign+"&rollovercolor="+_695.rollovercolor+"&selectcolor="+_695.selectcolor+"\" />";
str+="</object>";
}else{
str="<embed src=\""+_695.swfLocation+"\" allowScriptAccess=\"samedomain\" pluginspage=\"http://www.adobe.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" wmode=\""+_695.wmode+"\"";
str+=" name=\""+_695.fileUploadName+"\" width=\""+_695.width+"\" height=\""+_695.height+"\" quality=\" "+_695.quality+"\"";
str+=" flashvars=\"uniqueid="+_695.fileUploadName+"&url="+_695.url+"&addLabel="+_695.addButtonLabel+"&deleteLabel="+_695.deleteButtonLabel;
str+="&clearLabel="+_695.clearButtonLabel+"&uploadLabel="+_695.uploadButtonLabel+"&maxUploadSize="+_695.maxUploadSize+"&maxFileSelect="+_695.maxFileSelect+"&progress="+_695.progressbar;
str+="&stopOnError="+_695.stopOnError+"&hideUpload="+_695.disableUploadButton+"&bgcolor="+_695.bgcolor+"&fileFilter="+_695.fileFilter+"&deleteIcon="+_695.deleteIcon+"&title="+_695.title;
str+="&uploadIcon="+_695.uploadIcon+"&textcolor="+_695.textcolor+"&titletextcolor="+_695.titletextcolor+"&headercolor="+_695.headercolor+"&titletextalign="+_695.titletextalign+"&rollovercolor="+_695.rollovercolor+"&selectcolor="+_695.selectcolor+"\" />";
}
return str;
};
$FS.constructUrl=function(_697,_698,_699){
var url=_697;
if(_698!=null){
url+="?"+_698;
if(_699!=null){
url+="%26"+_699;
}
}else{
if(_699!=null){
url+="?"+_699;
}
}
return url;
};
coldfusion_FileUploadSwf_complete=function(name,_69c){
var _69d=$FS.getFileUploadComponent(name);
var _69e=ColdFusion.objectCache[name];
var _69f=_69e.onCompleteHandler;
if(_69f!=null&&typeof _69f=="function"){
_69f.call(this,_69c);
}
$FS.addResultToArray(_69c,_69e);
};
coldfusion_FileUploadSwf_onError=function(name,_6a1){
var _6a2=$FS.getFileUploadComponent(name);
var _6a3=ColdFusion.objectCache[name];
var _6a4=_6a3.onErrorHandler;
if(_6a4!=null&&typeof _6a4=="function"){
_6a4.call(this,_6a1);
}
$FS.addResultToArray(_6a1,_6a3);
};
coldfusion_FileUploadSwf_UploadCompete=function(name){
var _6a6=$FS.getFileUploadComponent(name);
var _6a7=ColdFusion.objectCache[name];
var _6a8=_6a7.onUploadCompleteHandler;
var _6a9=_6a7.resultArray;
if(_6a8!=null&&typeof _6a8=="function"){
_6a8.call(this,_6a9);
}
_6a7.resultArray=new Array();
};
$FS.addResultToArray=function(_6aa,_6ab){
var _6ac=_6ab.resultArray;
if(_6ac==null||typeof _6ac=="undefined"){
_6ac=_6ab.resultArray=new Array();
}
_6ac.push(_6aa);
};
$FS.cancelUpload=function(name){
var _6ae=fileUploadPrefix+name;
var _6af=$FS.getFileUploadComponent(_6ae);
if(_6af!=null){
_6af.cancelFileUpload();
}else{
ColdFusion.handleError(null,"fileupload.cancelupload.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.cancelupload.cancelled","widget",[name]);
};
$FS.getSelectedFiles=function(name){
var _6b1=fileUploadPrefix+name;
var _6b2=$FS.getFileUploadComponent(_6b1);
if(_6b2!=null){
return _6b2.getSelectedFileArray();
}else{
ColdFusion.handleError(null,"fileupload.getSelectedFiles.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.getSelectedFiles.selected","widget",[name]);
};
$FS.clearAllFiles=function(name){
var _6b4=fileUploadPrefix+name;
var _6b5=$FS.getFileUploadComponent(_6b4);
if(_6b5!=null){
_6b5.clearAllUpload();
}else{
ColdFusion.handleError(null,"fileupload.clearallfiles.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.clearallfiles.cleared","widget",[name]);
};
$FS.setURL=function(name,src){
var _6b8=$FS.getFileUploadComponent(fileUploadPrefix+name);
var _6b9=ColdFusion.objectCache[name];
if(_6b9==null||typeof (_6b9)=="undefined"){
ColdFusion.handleError(null,"fileupload.setURL.notfound","widget",[name],null,null,true);
}
if(!src||src.length==0){
ColdFusion.handleError(null,"fileupload.setURL.invalidurl","widget",[name],null,null,true);
}
var _6ba=null;
if(src.indexOf("?")>0){
_6ba=src.substring(src.indexOf("?")+1);
_6ba=escape(_6ba);
src=src.substring(0,src.indexOf("?"));
}
if(src.charAt(0)!="/"&&src.indexOf("://")<0){
var _6bb=_6b9.url_withoutQuery;
_6bb=unescape(_6bb);
var _6bc="";
if(_6bb||_6bb.indexOf("/")>-1){
_6bc=_6bb.substring(0,_6bb.lastIndexOf("/")+1);
}
var _6bd=_6bc+src;
var _6be=_6bd.split("/");
var _6bf=new Array();
var _6c0=0;
for(var i=0;i<_6be.length;i++){
if(_6be[i]==".."){
_6bf[--_6c0]="";
}else{
_6bf[_6c0++]=_6be[i];
}
}
src=_6bf[0];
for(var i=1;i<_6c0;i++){
src=src+"/"+_6bf[i];
}
}
var _6c2=$FS.constructUrl(src,_6ba,_6b9.url_CF_cookie);
_6b9.url=_6c2;
_6b8.setSrc(_6c2);
ColdFusion.Log.info("fileupload.setURL.urlset","widget",[name,_6c2]);
};
$FS.startUpload=function(name){
var _6c4=fileUploadPrefix+name;
var _6c5=$FS.getFileUploadComponent(_6c4);
if(_6c5!=null){
_6c5.submitUploadForm();
}else{
ColdFusion.handleError(null,"fileupload.startupload.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.startupload.started","widget",[name]);
};
$FS.getFileUploadComponent=function(name){
if(navigator.appName.indexOf("Microsoft")!=-1){
if(window[name]!=null){
return window[name];
}else{
return document[name];
}
}else{
return document[name];
}
};
