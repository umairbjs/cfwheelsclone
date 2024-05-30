/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var KT_focusedEl=null;
KT_validateSingle=function(_96d,_96e){
var _96f=_96d.charCodeAt(0);
switch(_96e){
case "9":
if(_96f<58&&_96f>47){
return true;
}
break;
case "A":
if((_96f<91&&_96f>64)||(_96f<123&&_96f>96)){
return true;
}
break;
case "X":
if((_96f<91&&_96f>64)||(_96f<123&&_96f>96)||(_96f<58&&_96f>47)){
return true;
}
break;
case "?":
return true;
break;
default:
return true;
break;
}
};
KT_maskDefaultValue=function(_970){
switch(_970){
case "9":
return "0";
break;
case "A":
return "a";
break;
case "X":
return "0";
break;
case "?":
return "0";
break;
default:
return "0";
break;
}
};
KT_isSpecialChar=function(_971){
if(_971=="9"||_971=="A"||_971=="X"||_971=="?"){
return true;
}else{
return false;
}
};
mask_onValueChanged=function(){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
if(KT_focusedEl==null||KT_focusedEl.mask==null||KT_focusedEl.mask==""){
return;
}
var mask=KT_focusedEl.mask;
var val=KT_focusedEl.value;
var i=0;
var _975=false;
if(val==KT_focusedEl.oldText){
return;
}
if(val.length>mask.length){
val=val.substr(0,mask.length);
_975=true;
}
for(;i<mask.length;i++){
if(val.charCodeAt(i).toString()!="NaN"){
if(KT_isSpecialChar(mask.charAt(i))){
if(KT_validateSingle(val.charAt(i),mask.charAt(i))){
continue;
}else{
val=KT_focusedEl.oldText;
i=mask.length;
break;
}
}else{
if(val.charAt(i)!=mask.charAt(i)){
if(i==val.length-1){
var _976=val.substr(val.length-1,val.length);
val=val.substr(0,val.length-1)+mask.charAt(i)+_976;
_975=true;
continue;
}else{
val=KT_focusedEl.oldText;
i=mask.length;
}
break;
}
}
}else{
if(val.length<KT_focusedEl.oldText.length){
break;
}
for(;i<mask.length;i++){
if(!KT_isSpecialChar(mask.charAt(i))){
val+=mask.charAt(i);
_975=true;
}else{
break;
}
}
break;
}
}
if(val.length>mask.length){
val=val.substr(0,mask.length);
_975=true;
}
if(KT_focusedEl.value!=val){
KT_focusedEl.value=val;
}
KT_focusedEl.oldText=val;
if(_975){
}
};
mask_parseFirstTime=function(_977,mask){
var _979="";
var _97a="";
cond=1;
imask=0;
ival=0;
cnt=0;
while(cond==1){
cond=1;
if(!KT_isSpecialChar(mask.charAt(imask))){
if(_977.charCodeAt(ival).toString()!="NaN"){
if(mask.charAt(imask)==_977.charAt(ival)){
imask++;
ival++;
}else{
_977=_977.substr(0,ival)+mask.charAt(imask)+_977.substr(ival,_977.length);
imask=0;
ival=0;
cond=1;
}
}else{
_977+=KT_maskDefaultValue(mask.charAt(imask));
}
}else{
imask++;
ival++;
}
if(imask>=mask.length||ival>=_977.length){
cond=0;
}
}
for(i=0;i<mask.length;i++){
if(KT_isSpecialChar(mask.charAt(i))){
_979+=mask.charAt(i);
if(_977.charCodeAt(i).toString()!="NaN"){
_97a+=_977.charAt(i);
}else{
_97a+=KT_maskDefaultValue(mask.charAt(i));
}
}
}
oldvalue=_977;
_977=_97a;
var _97b="";
for(i=0;i<_979.length;i++){
if(!KT_validateSingle(_977.charAt(i),_979.charAt(i))){
_97b+=KT_maskDefaultValue(_979.charAt(i));
}else{
_97b+=_977.charAt(i);
}
}
var _97c="";
var j=0;
for(i=0;i<mask.length;i++){
if(KT_isSpecialChar(mask.charAt(i))){
_97c+=_97b.charAt(j++);
}else{
_97c+=mask.charAt(i);
}
}
return _97c;
};
mask_onSetFocus=function(obj,mask){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
if(typeof obj.mask=="undefined"){
ret="";
if(obj.value!=""){
ret=mask_parseFirstTime(obj.value,mask);
}
obj.value=ret;
obj.mask=mask;
}
KT_focusedEl=obj;
if(typeof KT_focusedEl.oldText=="undefined"){
KT_focusedEl.oldText=obj.value;
mask_onValueChanged();
}
};
mask_onKillFocus=function(){
if((typeof window.getSelection=="undefined"&&typeof document.selection=="undefined")){
return;
}
mask_onValueChanged();
KT_focusedEl=null;
};
