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
ColdFusion.FileUpload.create=function(_58e,_58f,_590,_591,_592,_593,_594,_595,_596,_597,_598,_599,_59a,_59b,_59c,_59d,_59e,_59f,_5a0,_5a1,_5a2,_5a3,_5a4,_5a5,_5a6,_5a7,_5a8,_5a9,_5aa,_5ab){
var _5ac={};
_5ac.uploadDivId=_58e;
_5ac.fileUploadName=fileUploadPrefix+_58e;
_5ac.url_withoutQuery=_58f;
_5ac.url_queryString=_590;
_5ac.url_CF_cookie=_591;
_5ac.url=$FS.constructUrl(_58f,_590,_591);
_5ac.onCompleteHandler=_599;
_5ac.onUploadCompleteHandler=_59a;
_5ac.onErrorHandler=_59b;
_5ac.progressbar=_5a6;
if(_59e==null){
_59e="";
}
_5ac.bgcolor=_59e;
if(_59f==null){
_59f="";
}
_5ac.selectcolor=_59f;
if(_5a0==null){
_5a0="";
}
_5ac.rollovercolor=_5a0;
if(_5a1==null){
_5a1="";
}
_5ac.textcolor=_5a1;
if(_5a4==null){
_5a4="left";
}
_5ac.titletextalign=_5a4;
if(_5a2==null){
_5a2="";
}
_5ac.titletextcolor=_5a2;
if(_5a3==null){
_5a3="";
}
_5ac.headercolor=_5a3;
_5ac.bgcolor=_59e;
_5ac.bgcolor=_59e;
if(_5a5==null){
_5a5="";
}
_5ac.fileFilter=_5a5;
_5ac.disableUploadButton=_5a8;
if(_5aa==null||typeof _5aa=="undefined"){
_5aa="window";
}
_5ac.wmode=_5aa;
_5ac.stopOnError=_5a9;
if(_592==null||typeof _592==="undefined"){
_592=defaultAddButtonLabel;
}
_5ac.addIcon=defaultAddIcon;
_5ac.addButtonLabel=_592;
if(_594==null||typeof _594==="undefined"){
_594=defaultUploadButtonLabel;
}
_5ac.uploadButtonLabel=_594;
_5ac.uploadIcon=defaultUploadIcon;
if(_596==null||typeof _596==="undefined"){
_596="File Upload ";
}
_5ac.title=_596;
_5ac.swfLocation=$FS.defaultSWFLocation;
if(_593==null||typeof _593==="undefined"){
_593=defaultClearButtonLabel;
}
_5ac.clearButtonLabel=_593;
_5ac.clearIcon=defaultClearIcon;
if(_595==null||typeof _595==="undefined"){
_595=defaultDeleteButtonLabel;
}
_5ac.deleteButtonLabel=_595;
_5ac.deleteIcon=defaultDeleteIcon;
if(_597==null||!typeof _597==="Number"){
_597=-1;
}
_5ac.maxFileSelect=_597;
if(_598==null||!typeof _598==="number"){
_598=defaultUploadSize;
}
_5ac.maxUploadSize=_598;
if(_59c==null||typeof _59c==="undefined"){
_59c=420;
}
_5ac.widthInPx=_59c+"px";
_5ac.width=_59c;
if(_59d==null||typeof _59d==="undefined"){
_59d=300;
}
_5ac.heightInPx=_59d+"px";
_5ac.height=_59d;
_5ac.align=_5ab;
ColdFusion.objectCache[_58e]=_5ac;
ColdFusion.objectCache[_5ac.fileUploadName]=_5ac;
var _5ad=$FS.constructMarkup(_5ac);
var _5ae=document.getElementById(_58e);
_5ae.innerHTML=_5ad;
ColdFusion.Log.info("fileupload.initialized","widget",[_58e]);
};
$FS.constructMarkup=function(_5af){
var str="";
if(isIE&&isWin&&!isOpera){
str+="<object width=\""+_5af.width+"\" height=\""+_5af.height+"\"";
str+=" id=\""+_5af.fileUploadName+"\" name=\""+_5af.playerName+"\" type=\"application/x-shockwave-flash\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" ";
str+=" data=\""+_5af.swfLocation+"\">";
str+="<param name=\"movie\" value=\""+_5af.swfLocation+"\" />";
str+="<param name=\"quality\" value=\""+_5af.quality+"\" />";
str+="<param name=\"allowFullScreen\" value=\""+_5af.fullScreen+"\" />";
str+="<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
str+="<param name=\"wmode\" value=\""+_5af.wmode+"\" />";
str+="<param name=\"flashvars\" value=\"uniqueid="+_5af.fileUploadName+"&url="+_5af.url+"&addLabel="+_5af.addButtonLabel+"&deleteLabel="+_5af.deleteButtonLabel;
str+="&clearLabel="+_5af.clearButtonLabel+"&uploadLabel="+_5af.uploadButtonLabel+"&maxUploadSize="+_5af.maxUploadSize+"&maxFileSelect="+_5af.maxFileSelect+"&progress="+_5af.progressbar;
str+="&stopOnError="+_5af.stopOnError+"&hideUpload="+_5af.disableUploadButton+"&bgcolor="+_5af.bgcolor+"&fileFilter="+_5af.fileFilter+"&deleteIcon="+_5af.deleteIcon+"&title="+_5af.title;
str+="&uploadIcon="+_5af.uploadIcon+"&textcolor="+_5af.textcolor+"&titletextcolor="+_5af.titletextcolor+"&headercolor="+_5af.headercolor+"&titletextalign="+_5af.titletextalign+"&rollovercolor="+_5af.rollovercolor+"&selectcolor="+_5af.selectcolor+"\" />";
str+="</object>";
}else{
str="<embed src=\""+_5af.swfLocation+"\" allowScriptAccess=\"samedomain\" pluginspage=\"http://www.adobe.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" wmode=\""+_5af.wmode+"\"";
str+=" name=\""+_5af.fileUploadName+"\" width=\""+_5af.width+"\" height=\""+_5af.height+"\" quality=\" "+_5af.quality+"\"";
str+=" flashvars=\"uniqueid="+_5af.fileUploadName+"&url="+_5af.url+"&addLabel="+_5af.addButtonLabel+"&deleteLabel="+_5af.deleteButtonLabel;
str+="&clearLabel="+_5af.clearButtonLabel+"&uploadLabel="+_5af.uploadButtonLabel+"&maxUploadSize="+_5af.maxUploadSize+"&maxFileSelect="+_5af.maxFileSelect+"&progress="+_5af.progressbar;
str+="&stopOnError="+_5af.stopOnError+"&hideUpload="+_5af.disableUploadButton+"&bgcolor="+_5af.bgcolor+"&fileFilter="+_5af.fileFilter+"&deleteIcon="+_5af.deleteIcon+"&title="+_5af.title;
str+="&uploadIcon="+_5af.uploadIcon+"&textcolor="+_5af.textcolor+"&titletextcolor="+_5af.titletextcolor+"&headercolor="+_5af.headercolor+"&titletextalign="+_5af.titletextalign+"&rollovercolor="+_5af.rollovercolor+"&selectcolor="+_5af.selectcolor+"\" />";
}
return str;
};
$FS.constructUrl=function(_5b1,_5b2,_5b3){
var url=_5b1;
if(_5b2!=null){
url+="?"+_5b2;
if(_5b3!=null){
url+="%26"+_5b3;
}
}else{
if(_5b3!=null){
url+="?"+_5b3;
}
}
return url;
};
coldfusion_FileUploadSwf_complete=function(name,_5b6){
var _5b7=$FS.getFileUploadComponent(name);
var _5b8=ColdFusion.objectCache[name];
var _5b9=_5b8.onCompleteHandler;
if(_5b9!=null&&typeof _5b9=="function"){
_5b9.call(this,_5b6);
}
$FS.addResultToArray(_5b6,_5b8);
};
coldfusion_FileUploadSwf_onError=function(name,_5bb){
var _5bc=$FS.getFileUploadComponent(name);
var _5bd=ColdFusion.objectCache[name];
var _5be=_5bd.onErrorHandler;
if(_5be!=null&&typeof _5be=="function"){
_5be.call(this,_5bb);
}
$FS.addResultToArray(_5bb,_5bd);
};
coldfusion_FileUploadSwf_UploadCompete=function(name){
var _5c0=$FS.getFileUploadComponent(name);
var _5c1=ColdFusion.objectCache[name];
var _5c2=_5c1.onUploadCompleteHandler;
var _5c3=_5c1.resultArray;
if(_5c2!=null&&typeof _5c2=="function"){
_5c2.call(this,_5c3);
}
_5c1.resultArray=new Array();
};
$FS.addResultToArray=function(_5c4,_5c5){
var _5c6=_5c5.resultArray;
if(_5c6==null||typeof _5c6=="undefined"){
_5c6=_5c5.resultArray=new Array();
}
_5c6.push(_5c4);
};
$FS.cancelUpload=function(name){
var _5c8=fileUploadPrefix+name;
var _5c9=$FS.getFileUploadComponent(_5c8);
if(_5c9!=null){
_5c9.cancelFileUpload();
}else{
ColdFusion.handleError(null,"fileupload.cancelupload.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.cancelupload.cancelled","widget",[name]);
};
$FS.getSelectedFiles=function(name){
var _5cb=fileUploadPrefix+name;
var _5cc=$FS.getFileUploadComponent(_5cb);
if(_5cc!=null){
return _5cc.getSelectedFileArray();
}else{
ColdFusion.handleError(null,"fileupload.getSelectedFiles.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.getSelectedFiles.selected","widget",[name]);
};
$FS.clearAllFiles=function(name){
var _5ce=fileUploadPrefix+name;
var _5cf=$FS.getFileUploadComponent(_5ce);
if(_5cf!=null){
_5cf.clearAllUpload();
}else{
ColdFusion.handleError(null,"fileupload.clearallfiles.notfound","widget",[name],null,null,true);
}
ColdFusion.Log.info("fileupload.clearallfiles.cleared","widget",[name]);
};
$FS.setURL=function(name,src){
var _5d2=$FS.getFileUploadComponent(fileUploadPrefix+name);
var _5d3=ColdFusion.objectCache[name];
if(_5d3==null||typeof (_5d3)=="undefined"){
ColdFusion.handleError(null,"fileupload.setURL.notfound","widget",[name],null,null,true);
}
if(!src||src.length==0){
ColdFusion.handleError(null,"fileupload.setURL.invalidurl","widget",[name],null,null,true);
}
var _5d4=null;
if(src.indexOf("?")>0){
_5d4=src.substring(src.indexOf("?")+1);
_5d4=escape(_5d4);
src=src.substring(0,src.indexOf("?"));
}
if(src.charAt(0)!="/"&&src.indexOf("://")<0){
var _5d5=_5d3.url_withoutQuery;
_5d5=unescape(_5d5);
var _5d6="";
if(_5d5||_5d5.indexOf("/")>-1){
_5d6=_5d5.substring(0,_5d5.lastIndexOf("/")+1);
}
var _5d7=_5d6+src;
var _5d8=_5d7.split("/");
var _5d9=new Array();
var _5da=0;
for(var i=0;i<_5d8.length;i++){
if(_5d8[i]==".."){
_5d9[--_5da]="";
}else{
_5d9[_5da++]=_5d8[i];
}
}
src=_5d9[0];
for(var i=1;i<_5da;i++){
src=src+"/"+_5d9[i];
}
}
var _5dc=$FS.constructUrl(src,_5d4,_5d3.url_CF_cookie);
_5d3.url=_5dc;
_5d2.setSrc(_5dc);
ColdFusion.Log.info("fileupload.setURL.urlset","widget",[name,_5dc]);
};
$FS.startUpload=function(name){
var _5de=fileUploadPrefix+name;
var _5df=$FS.getFileUploadComponent(_5de);
if(_5df!=null){
_5df.submitUploadForm();
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
