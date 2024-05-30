/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var _CF_error_messages=new Array();
var _CF_error_fields=new Object();
var _CF_FirstErrorField=null;
var _CF_submit_status=new Array();
_CF_signalLoad=function(){
_CF_loaded=1;
};
_CF_onError=function(_91c,_91d,_91e,_91f){
if(_CF_error_fields[_91d]==null){
if(_CF_FirstErrorField==null){
_CF_FirstErrorField=_91d;
}
_CF_error_exists=true;
_CF_error_fields[_91d]=_91f;
_CF_error_messages[_CF_error_messages.length]=_91f;
}
};
_CF_onErrorAlert=function(_920){
var _921="";
for(var i=0;i<_920.length;i++){
_921+=_920[i]+"\n";
}
alert(_921);
return false;
};
updateHiddenValue=function(val,form,name){
if(form==null||form==""){
form=0;
}
if(document.forms[form]==null||document.forms[form][name]==null){
return;
}
document.forms[form][name].value=val;
};
_CF_hasValue=function(obj,_927,_928){
if(_927=="TEXT"||_927=="FILE"||_927=="PASSWORD"||_927=="CFTEXTAREA"||_927=="TEXTAREA"||_927=="CFTEXTINPUT"||_927=="DATEFIELD"){
if(obj.value.length==0){
return false;
}else{
if(_928){
str=obj.value.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
}
return true;
}else{
if(_927=="SELECT"){
for(i=0;i<obj.length;i++){
if(obj.options[i].selected&&obj.options[i].value.length>0){
return true;
}
}
return false;
}else{
if(_927=="SINGLE_VALUE_RADIO"||_927=="SINGLE_VALUE_CHECKBOX"){
if(obj.checked){
return true;
}else{
return false;
}
}else{
if(_927=="RADIO"||_927=="CHECKBOX"){
if(obj.length==undefined&&obj.checked){
return true;
}else{
for(i=0;i<obj.length;i++){
if(obj[i].checked){
return true;
}
}
}
return false;
}else{
if(_927=="CFTREE"){
if(obj["value"].length>0){
return true;
}else{
return false;
}
}else{
if(_927=="RICHTEXT"){
var _929=FCKeditorAPI.GetInstance(obj.id);
var val=_929.GetXHTML();
if(val.length==0){
return false;
}else{
if(_928){
str=val.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
return true;
}
}else{
return true;
}
}
}
}
}
}
};
_CF_checkdate=function(_92b,_92c){
_92b=_92b.replace(/^\s+/,"").replace(/\s+$/,"");
_92b=_92b=_92b.replace(/{d \'/,"").replace(/'}/,"");
if(_92c){
if(_92b.length==0){
return false;
}
}else{
if(_92b.length==0){
return true;
}
}
if(_92b.length==0){
return true;
}
isplit=_92b.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_92b.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_92b.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_92b.length){
return false;
}
var _92d=_92b.substring(0,isplit);
if(_92d.length==4){
sYear=_92b.substring(0,isplit);
isplit=_92b.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_92b.length){
return false;
}
sMonth=_92b.substring((sYear.length+1),isplit);
sDay=_92b.substring(isplit+1);
}else{
sMonth=_92b.substring(0,isplit);
isplit=_92b.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_92b.length){
return false;
}
sDay=_92b.substring((sMonth.length+1),isplit);
sYear=_92b.substring(isplit+1);
}
if((sDay.length==0)||(sMonth.length==0)||(sYear.length==0)){
return false;
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(sYear.length!=1&&sYear.length!=2&&sYear.length!=4){
return false;
}else{
if(!_CF_checkrange(sYear,0,9999)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
}
};
_CF_checkeurodate=function(_92e,_92f){
_92e=_92e.replace(/^\s+/,"").replace(/\s+$/,"");
_92e=_92e=_92e.replace(/{d \'/,"").replace(/'}/,"");
if(_92f){
if(_92e.length==0){
return false;
}
}else{
if(_92e.length==0){
return true;
}
}
isplit=_92e.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_92e.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_92e.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_92e.length){
return false;
}
var _930=_92e.substring(0,isplit);
if(_930.length==4){
sYear=_92e.substring(0,isplit);
isplit=_92e.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_92e.length){
return false;
}
sMonth=_92e.substring((sYear.length+1),isplit);
sDay=_92e.substring(isplit+1);
}else{
sDay=_92e.substring(0,isplit);
isplit=_92e.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_92e.length){
return false;
}
sMonth=_92e.substring((sDay.length+1),isplit);
sYear=_92e.substring(isplit+1);
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(!_CF_checkrange(sYear,0,null)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
};
_CF_checkday=function(_931,_932,_933){
maxDay=31;
if(_932==4||_932==6||_932==9||_932==11){
maxDay=30;
}else{
if(_932==2){
if(_931%4>0){
maxDay=28;
}else{
if(_931%100==0&&_931%400>0){
maxDay=28;
}else{
maxDay=29;
}
}
}
}
return _CF_checkrange(_933,1,maxDay);
};
_CF_checkinteger=function(_934,_935){
_934=_934.replace(/^\s+/,"").replace(/\s+$/,"");
_934=_934.replace(/[$Â£Â¥â‚¬,~+]?/g,"");
if(_935){
if(_934.length==0){
return false;
}
}else{
if(_934.length==0){
return true;
}
}
var _936=".";
var _937=_934.indexOf(_936);
if(_937==-1){
return _CF_checknumber(_934);
}else{
return false;
}
};
_CF_numberrange=function(_938,_939,_93a,_93b){
if(_93b){
if(_938.length==0){
return false;
}
}else{
if(_938.length==0){
return true;
}
}
if(_939!=null){
if(_938<_939){
return false;
}
}
if(_93a!=null){
if(_938>_93a){
return false;
}
}
return true;
};
_CF_checknumber=function(_93c,_93d){
var _93e=" .+-0123456789";
var _93f=" .0123456789";
var _940;
var _941=false;
var _942=false;
var _943=false;
_93c=_93c.replace(/^\s+/,"").replace(/\s+$/,"");
_93c=_93c.replace(/[$Â£Â¥â‚¬,~+]?/g,"");
if(_93d){
if(_93c.length==0){
return false;
}
}else{
if(_93c.length==0){
return true;
}
}
_940=_93e.indexOf(_93c.charAt(0));
if(_940==1){
_941=true;
}else{
if(_940<1){
return false;
}
}
for(var i=1;i<_93c.length;i++){
_940=_93f.indexOf(_93c.charAt(i));
if(_940<0){
return false;
}else{
if(_940==1){
if(_941){
return false;
}else{
_941=true;
}
}else{
if(_940==0){
if(_941||_943){
_942=true;
}
}else{
if(_942){
return false;
}else{
_943=true;
}
}
}
}
}
return true;
};
_CF_checkrange=function(_945,_946,_947,_948){
_945=_945.replace(/^\s+/,"").replace(/\s+$/,"");
if(_948){
if(_945.length==0){
return false;
}
}else{
if(_945.length==0){
return true;
}
}
if(!_CF_checknumber(_945)){
return false;
}else{
return (_CF_numberrange((eval(_945)),_946,_947));
}
return true;
};
_CF_checktime=function(_949,_94a){
_949=_949.replace(/^\s+/,"").replace(/\s+$/,"");
_949=_949.replace(/\s+:\s+/,":");
_949=_949=_949.replace(/{t \'/,"").replace(/'}/,"");
if(_94a){
if(_949.length==0){
return false;
}
}else{
if(_949.length==0){
return true;
}
}
var _94b=_CF_checkregex(_949,/^((([0-1]?\d)|(2[0-3])):[0-5]?\d)?(:[0-5]?\d)? ?([AP]M|[AP]m|[ap]m|[ap]M)?$/,_94a);
return _94b;
};
_CF_checkphone=function(_94c,_94d){
_94c=_94c.replace(/^\s+/,"").replace(/\s+$/,"");
if(_94d){
if(_94c.length==0){
return false;
}
}else{
if(_94c.length==0){
return true;
}
}
if(_94c.length==0){
return true;
}
return _CF_checkregex(_94c,/^(((1))?[ ,\-,\.]?([\\(]?([1-9][0-9]{2})[\\)]?))?[ ,\-,\.]?([^0-1]){1}([0-9]){2}[ ,\-,\.]?([0-9]){4}(( )((x){0,1}([0-9]){1,5}){0,1})?$/,_94d);
};
_CF_checkzip=function(_94e,_94f){
_94e=_94e.replace(/^\s+/,"").replace(/\s+$/,"");
if(_94f){
if(_94e.length==0){
return false;
}
}else{
if(_94e.length==0){
return true;
}
}
return _CF_checkregex(_94e,/^([0-9]){5,5}$|(([0-9]){5,5}(-| ){1}([0-9]){4,4}$)/,_94f);
};
_CF_checkcreditcard=function(_950,_951){
_950=_950.replace(/^\s+/,"").replace(/\s+$/,"");
if(_951){
if(_950.length==0){
return false;
}
}else{
if(_950.length==0){
return true;
}
}
if(_950.length==0){
return true;
}
var _952=" -";
var _953="";
var _954;
for(var i=0;i<_950.length;i++){
_954=_952.indexOf(_950.charAt(i));
if(_954<0){
_953+=_950.substring(i,(i+1));
}
}
if(_953.length<13||_953.length>19){
return false;
}
if(_953.charAt(0)=="+"){
return false;
}
if(!_CF_checkinteger(_953)){
return false;
}
var _956=_953.length%2==1?false:true;
var _957=0;
var _958;
for(var i=0;i<_953.length;i++){
_958=eval(_953.charAt(i));
if(_956){
_958*=2;
_957+=(_958%10);
if((_958/10)>=1){
_957++;
}
_956=false;
}else{
_957+=_958;
_956=true;
}
}
return (_957%10)==0?true:false;
};
_CF_checkssn=function(_959,_95a){
_959=_959.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95a){
if(_959.length==0){
return false;
}
}else{
if(_959.length==0){
return true;
}
}
return _CF_checkregex(_959,/^[0-9]{3}(-| )[0-9]{2}(-| )[0-9]{4}$/,_95a);
};
_CF_checkEmail=function(_95b,_95c){
_95b=_95b.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95c){
if(_95b.length==0){
return false;
}
}else{
if(_95b.length==0){
return true;
}
}
return _CF_checkregex(_95b,/^[a-zA-Z_0-9-'\+~]+(\.[a-zA-Z_0-9-'\+~]+)*@([a-zA-Z_0-9-]+\.)+[a-zA-Z]*$/,_95c);
};
_CF_checkURL=function(_95d,_95e){
_95d=_95d.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95e){
if(_95d.length==0){
return false;
}
}else{
if(_95d.length==0){
return true;
}
}
return _CF_checkregex(_95d.toLowerCase(),/^((http|https|ftp|file)\:\/\/([a-zA-Z0-0]*:[a-zA-Z0-0]*(@))?[a-zA-Z0-9-\.]+(\.[a-zA-Z]{2,3})?(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9-\._\?\,\'\/\+&amp;%\$#\=~])*)|((mailto)\:[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]*)|((news)\:[a-zA-Z0-9\.]*)$/,_95e);
};
_CF_checkUUID=function(_95f,_960){
_95f=_95f.replace(/^\s+/,"").replace(/\s+$/,"");
if(_960){
if(_95f.length==0){
return false;
}
}else{
if(_95f.length==0){
return true;
}
}
return _CF_checkregex(_95f,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{16,16}/,_960);
};
_CF_checkGUID=function(_961,_962){
_961=_961.replace(/^\s+/,"").replace(/\s+$/,"");
if(_962){
if(_961.length==0){
return false;
}
}else{
if(_961.length==0){
return true;
}
}
return _CF_checkregex(_961,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{12,12}/,_962);
};
_CF_checkBoolean=function(_963,_964){
_963=_963.replace(/^\s+/,"").replace(/\s+$/,"");
if(_964){
if(_963.length==0){
return false;
}
}else{
if(_963.length==0){
return true;
}
}
if(_963.toUpperCase()=="TRUE"||_963.toUpperCase()=="YES"||(_CF_checknumber(_963)&&_963!="0")){
return true;
}else{
if(_963.toUpperCase()=="FALSE"||_963.toUpperCase()=="NO"||_963=="0"){
return true;
}else{
return false;
}
}
};
_CF_setFormParam=function(_965,_966,_967){
var _968="document['"+_965+"']['"+_966+"']";
var obj=eval(_968);
if(obj==undefined){
return false;
}else{
obj.value=_967;
return true;
}
};
_CF_checkregex=function(_96a,_96b,_96c){
if(_96c){
if(_96a.length==0){
return false;
}
}else{
if(_96a.length==0){
return true;
}
}
return _96b.test(_96a);
};
