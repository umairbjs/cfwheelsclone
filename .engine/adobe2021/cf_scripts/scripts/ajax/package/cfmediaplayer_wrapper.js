/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.MediaPlayer){
ColdFusion.MediaPlayer={};
}
var $MP=ColdFusion.MediaPlayer;
$MP.defaultSWFLocation=_cf_ajaxscriptsrc+"/resources/cf/assets/StrobeMediaPlayback.swf",$MP.defaultOptions={swf:$MP.defaultSWFLocation,width:480,height:275,src:"",javascriptControls:true,playButtonOverlay:true,loop:false,autoPlay:false,controlBarMode:"docked",javascriptCallbackFunction:"triggerHandler"};
$MP.playerMap={};
$MP.playerWrapperMap={};
$MP.playerOptionsMap={};
$MP.jsFunctionMap={};
$MP.titleDataMap={};
$MP.videoMonitorMap={};
$MP.bindInfoMap={};
$MP.bindElements={};
$MP.baseURI;
$MP.fancyBoxLeftBorderOffset=5;
$MP.fancyBoxBottonBorderOffset=6;
$MP.hasHTML5VideoPlaybackSupport=!!document.createElement("video").canPlayType;
String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
};
ColdFusion.MediaPlayer.init=function(_29b){
var _29c=$MP.defaultOptions;
_29c.id=_29b.id;
var _29d={};
var _29e={};
var _29f={};
var _2a0=null;
var _2a1={onStart:null,onComplete:null,onPause:null,onError:null,onLoad:null,onStartCallback:playbackStart,onPauseCallback:playbackPause};
if(_29b.width!=null&&typeof (_29b.width)!="undefined"){
_29c.width=_29b.width;
}else{
_29c.width=480;
}
if(_29b.height!=null&&typeof (_29b.height)!="undefined"){
_29c.height=_29b.height;
}else{
_29c.height=275;
}
if(_29b.baseURI!=null){
$MP.baseURI=_29b.baseURI;
}
if(_29b.src!=null&&_29b.src!=""){
_29c.src=resolveSource(_29b.src);
}else{
_29c.src="";
}
if(_29b.PosterImage!=null&&_29b.PosterImage!=""){
_29c.poster=resolveSource(_29b.PosterImage);
}else{
_29c.poster="";
}
if(_29b.javascriptControls==null){
_29c.javascriptControls=true;
}
if(_29b.playButtonOverlay==null){
_29c.playButtonOverlay=true;
}
if(_29b.repeat!=null){
if(_29b.repeat=="true"){
_29c.loop=true;
}else{
_29c.loop=false;
}
}else{
_29c.loop=false;
}
if(_29b.autoPlay!=null){
if(_29b.autoPlay=="true"){
_29c.autoPlay=true;
}else{
_29c.autoPlay=false;
}
}else{
_29c.autoPlay=false;
}
if(_29b.bgcolor!=null){
_29c.backgroundColor=_29b.bgcolor;
_29e.bgColor=_29b.bgcolor;
}
if(_29b.controlbar!=null){
if(_29b.controlbar==false){
_29c.controlBarMode="none";
}else{
_29c.controlBarMode="docked";
}
}
if(_29b.skin!=null){
_29c.skin=resolveSource(_29b.skin);
}else{
_29c.skin="";
}
if(_29b.onComplete!=null){
_2a1.onComplete=_29b.onComplete;
}
if(_29b.onLoad!=null){
_2a1.onLoad=_29b.onLoad;
}
if(_29b.onStart!=null){
_2a1.onStart=_29b.onStart;
}
if(_29b.onPause!=null){
_2a1.onPause=_29b.onPause;
}
if(_29b.onError!=null){
_2a1.onError=_29b.onError;
}
if(_29b.onBind!=null){
_2a1.onBind=_29b.onBind;
}
if(_29b.hideTitle!=null){
_29d.hideTitle=_29b.hideTitle;
}
if(_29b.title!=null){
_29d.title=_29b.title;
}
if(_29b.title_text_color!=null){
_29d.title_text_color=_29b.title_text_color;
}
if(_29b.title_bgcolor!=null){
_29d.title_bgcolor=_29b.title_bgcolor;
}
if(_29b.border_left!=null){
_29e.border_left=_29b.border_left;
}
if(_29b.border_right!=null){
_29e.border_right=_29b.border_right;
}
if(_29b.border_top!=null){
_29e.border_top=_29b.border_top;
}
if(_29b.border_bottom!=null){
_29e.border_bottom=_29b.border_bottom;
}
if(_29b.progress_color!=null){
_29f.progress_color=_29b.progress_color;
}
if(_29b.progress_bgcolor!=null){
_29f.progress_bgcolor=_29b.progress_bgcolor;
}
if(_29b.controls_color!=null){
_29f.controls_color=_29b.controls_color;
}
if(_29b.controlbar_bgcolor!=null){
_29f.controlbar_bgcolor=_29b.controlbar_bgcolor;
}
if(!_29c.javascriptControls){
$(".strobeMediaPlaybackControlBar,.smp-error,.playoverlay").show();
}
if(_29b.bindData!=null&&_29b.bindData!="undefined"){
_2a0=$.extend(true,{},_29c);
handleBindingMediaPlayer(_2a0,_29b.bindData,_29b.type,_2a1);
return;
}
handleWmode(_29b,_29c);
playerInitialization(_29c,_29b.type,_2a1,_29d,_29e,_29f);
};
function handleWmode(_2a2,_2a3){
if(navigator.platform.indexOf("Linux")!=-1){
_2a3.wmode="direct";
return;
}
if(_2a2.wmode!=null){
_2a3.wmode=_2a2.wmode;
}else{
_2a3.wmode="direct";
}
var _2a4=document.getElementById(_2a3.id+"_"+"videoTitle");
if((_2a4!==null&&(_2a2.hideTitle==null||_2a2.hideTitle==false))||(_2a3.backgroundColor!=null&&_2a3.backgroundColor.trim()!="")){
_2a3.wmode="transparent";
}
}
function isValidSourceElementExist(_2a5,type){
if(_2a5.src!=null&&_2a5.src!=""){
if(type=="html"&&$MP.hasHTML5VideoPlaybackSupport&&isHTMLFileFormatSupported(_2a5.src)){
return true;
}else{
if(type=="flash"&&isFlashSupported()&&isFlashFileFormatSupported(_2a5.src)){
return true;
}
}
}
var _2a7=document.getElementById(_2a5.id+"_extendData");
if(_2a7==null||_2a7.childNodes==null||!isFlashSupported()){
return false;
}
var _2a8=_2a7.getElementsByTagName("source");
for(var k=0;k<_2a8.length;k++){
var src=_2a8[k].getAttribute("src");
if(type=="html"&&$MP.hasHTML5VideoPlaybackSupport&&isHTMLFileFormatSupported(src)){
return true;
}else{
if(type=="flash"&&isFlashSupported()&&isFlashFileFormatSupported(src)){
return true;
}
}
}
return false;
}
function hideTitle(id){
var _2ac=document.getElementById(id+"_"+"videoTitle");
if(_2ac==null){
id=id.substring(0,id.indexOf("_strobemediaplayback-video"));
_2ac=document.getElementById(id+"_"+"videoTitle");
}
if(_2ac!=null){
$("#"+id+"_"+"videoTitle").fadeOut(600,null);
}
}
function playbackStart(id){
var _2ae=getFuncMap(id);
if(_2ae.onStart!=null){
_2ae.onStart();
}
var _2af=getWrapper(id);
if(_2af!=null){
_2af.playOverlay.fadeOut(600);
}
hideTitle(id);
}
function showTitle(id){
var _2b1=document.getElementById(id+"_"+"videoTitle");
if(_2b1==null){
id=id.substring(0,id.indexOf("_strobemediaplayback-video"));
_2b1=document.getElementById(id+"_"+"videoTitle");
}
if(_2b1!=null){
$("#"+id+"_"+"videoTitle").fadeIn(1,null);
}
}
function playbackPause(id){
var _2b3=getFuncMap(id);
if(_2b3.onPause!=null){
_2b3.onPause();
}
var _2b4=getWrapper(id);
if(_2b4!=null){
_2b4.playOverlay.fadeIn(600);
}
showTitle(id);
}
function playbackComplete(id){
var _2b6=getFuncMap(id);
if(_2b6.onComplete!=null){
_2b6.onComplete();
}
var _2b7=getWrapper(id);
if(_2b7!=null){
_2b7.playOverlay.fadeIn(600);
_2b7.slider.css("left",0+"px");
_2b7.currenttime.html("0:00");
}
showTitle(id);
}
function updateFlashVideoSource(_2b8){
if(_2b8.src!=null&&_2b8.src!=""){
if(isFlashSupported()&&isFlashFileFormatSupported(_2b8.src)){
return;
}
}
var _2b9=document.getElementById(_2b8.id+"_extendData");
if(_2b9==null||_2b9.childNodes==null||!isFlashSupported()){
return;
}
var _2ba=_2b9.getElementsByTagName("source");
for(var k=0;k<_2ba.length;k++){
var src=_2ba[k].getAttribute("src");
if(isFlashSupported()&&isFlashFileFormatSupported(src)){
_2b8.src=resolveSource(src);
return;
}
}
return;
}
function playerInitialization(_2bd,type,_2bf,_2c0,_2c1,_2c2){
var _2c3=true;
var _2c4=isValidSourceElementExist(_2bd,"html");
var _2c5=isValidSourceElementExist(_2bd,"flash");
var _2c6=$MP.handleUserDefinedFlashParams(_2bd,type);
if(_2c6){
_2bd.favorFlashOverHtml5Video=true;
}else{
if(isFlashSupported()){
if(type==null||type=="flash"){
if(_2c5){
_2bd.favorFlashOverHtml5Video=true;
}else{
if(_2c4){
_2bd.favorFlashOverHtml5Video=false;
}else{
_2c3=false;
}
}
}else{
if(_2c4){
_2bd.favorFlashOverHtml5Video=false;
}else{
if(_2c5){
_2bd.favorFlashOverHtml5Video=true;
}else{
_2c3=false;
}
}
}
}else{
if($MP.hasHTML5VideoPlaybackSupport){
_2bd.favorFlashOverHtml5Video=false;
}else{
_2c3=false;
}
}
}
if(_2bd.favorFlashOverHtml5Video){
updateFlashVideoSource(_2bd);
}
if(!_2c3){
if($MP.hasHTML5VideoPlaybackSupport){
_2bd.favorFlashOverHtml5Video=false;
}else{
$(".playoverlay").hide();
ColdFusion.MediaPlayer.logError(_2bd.id,"The video could not be loaded");
return;
}
}
var _2c7={"tablet":{"startSize":{"width":+_2bd.width,"height":+_2bd.height},"name":_2bd.id+"_"+"strobemediaplayback-video"},"smartphone":{"startSize":{"width":+_2bd.width,"height":+_2bd.height},"name":_2bd.id+"_"+"strobemediaplayback-video"},"default":{"startSize":{"width":+_2bd.width,"height":+_2bd.height},"name":_2bd.id+"_"+"strobemediaplayback-video"}};
strobeMediaPlayback.draw(_2bd.id+"_"+"strobemediaplayback-video",_2c7,_2bd);
var _2c8=$("#"+_2bd.id+"_"+"strobemediaplayback-video");
var _2c9=$("#"+_2bd.id);
var _2ca=_2c9.get(0);
var _2cb;
if(_2ca==null){
_2bd.id=_2bd.id+"_strobemediaplayback-video";
$MP.playerOptionsMap[_2bd.id]=_2bd;
$MP.videoMonitorMap[_2bd.id]={paused:true,muted:false};
}else{
_2cb=$("#"+_2bd.id+"_"+"strobemediaplayback-video  .html5player").strobemediaplaybackhtml5(_2bd,_2bf);
$MP.playerMap[_2bd.id]=_2ca;
$MP.playerWrapperMap[_2bd.id]=_2cb;
$MP.playerOptionsMap[_2bd.id]=_2bd;
}
$MP.jsFunctionMap[_2bd.id]=_2bf;
$MP.titleDataMap[_2bd.id]=_2c0;
if(_2ca!=null&&_2ca.nodeName!=null&&_2ca.nodeName.toLowerCase()=="video"){
handleVolumeSlider(_2bd.id);
_2ca.volume=0.6;
handlePlayoverlay(_2bd.id,_2bd.width,_2bd.height);
handleErrorElement(_2bd.id,_2bd.width,_2bd.height);
var _2cc=$MP.playerWrapperMap[_2bd.id];
_2cc.playOverlay.css("display","block");
_2c8.css("width","100%");
_2c8.css("height","100%");
handlebackgroundColor(_2bd);
handleControlsStyle(_2bd.id,_2c2);
_2cb.useHTML5=true;
var _2cd=document.getElementById(_2bd.id+"_extendData");
if(_2cd!=null){
$MP.handleUserDefinedHTML5Element(_2ca,_2bd.id+"_extendData");
}else{
handleTitle(_2bd.id,_2bd.src,_2c0);
var _2ce=getFuncMap(_2bd.id);
var _2cf=document.getElementById(_2bd.id);
var _2d0=_2cf.getElementsByTagName("source");
if(_2d0!=null&&_2d0.length!=0){
_2d0[0].setAttribute("onerror","onError(event)");
}
}
}else{
handleTitle(_2bd.id,_2bd.src,_2c0);
}
handleBorderStyle(_2bd.id,_2c1);
if($MP.bindInfoMap[_2bd.id]==null){
var _2d1=document.getElementById(_2bd.id+"_extendData");
if(_2d1==null){
var id=_2bd.id.substring(0,_2bd.id.indexOf("_"));
_2d1=document.getElementById(id+"_extendData");
}
if(_2d1!=null&&_2d1.parentNode!=null){
_2d1.parentNode.removeChild(_2d1);
}
}
}
function handleVolumeChangeUI(_2d3,_2d4){
var _2d5=getWrapper(_2d3);
if(_2d4<=0){
_2d5.volumeHigh.css("background-position","0px -72px");
}else{
if(_2d4<=0.3){
_2d5.volumeHigh.css("background-position","-24px -72px");
}else{
if(_2d4<=0.7){
_2d5.volumeHigh.css("background-position","-48px -72px");
}else{
_2d5.volumeHigh.css("background-position","-72px -72px");
}
}
}
}
function handleVolumeSlider(_2d6){
var _2d7=getWrapper(_2d6);
var _2d8=_2d7.volumeSlider;
_2d8.slider({orientation:"vertical",range:"min",min:0,max:90,value:60,slide:function(_2d9,ui){
var _2db=ui.value/100;
_2d7.currentVolume=_2db;
handleChangeVolume(_2d6,_2db);
}});
_2d7.volumeHigh.mouseover(function(){
var _2dc=getWrapper(_2d6);
var _2dd=_2dc.volumeSlider;
_2dd.css("display","block");
_2dc.volumeContainer.css("display","block");
});
_2d7.volumeHigh.mouseout(function(_2de){
var _2df=getWrapper(_2d6);
var _2e0=_2df.volumeSlider;
var _2e1=_2df.volumeContainer;
var _2e2=_2de.relatedTarget;
if(_2e2.className!="controls"){
_2e0.css("display","none");
_2e1.css("display","none");
}
});
_2d7.volumeHigh.click(function(_2e3){
var _2e4=getWrapper(_2d6);
if(_2e4.currentVolume==null){
_2e4.currentVolume=0.6;
}
var pos=_2d7.volumeHigh.css("background-position");
if(pos.indexOf("0px")!=0){
_2d7.volumeHigh.css("background-position","0px -72px");
_2d7.volumeSlider.slider("value",0);
handleChangeVolume(_2d6,0);
}else{
_2d7.volumeSlider.slider("value",_2e4.currentVolume*100);
if(_2e4.currentVolume<=0.1){
_2d7.volumeHigh.css("background-position","0px -72px");
}else{
if(_2e4.currentVolume<=0.3){
_2d7.volumeHigh.css("background-position","-24px -72px");
}else{
if(_2e4.currentVolume<=0.7){
_2d7.volumeHigh.css("background-position","-48px -72px");
}else{
_2d7.volumeHigh.css("background-position","-72px -72px");
}
}
}
handleChangeVolume(_2d6,_2e4.currentVolume);
}
});
_2d7.controlbar.mouseout(function(_2e6){
if(_2e6.relatedTarget==null){
return;
}
var _2e7=_2e6.relatedTarget.className;
if(_2e6.relatedTarget.className!="controls"&&_2e7!="volume-container"&&_2e7.indexOf("ui-slider")==-1){
var _2e8=getWrapper(_2d6);
var _2e9=_2e8.volumeSlider;
var _2ea=_2e8.volumeContainer;
_2e9.css("display","none");
_2ea.css("display","none");
}
});
}
function handleBindingMediaPlayer(_2eb,_2ec,type,_2ee){
var _2ef=document.getElementById(_2eb.id+"_"+"html5MediaPlayback");
if(_2ef==null){
return;
}
var _2f0=_2ef.innerHTML;
if(_2f0==null){
return;
}
var _2f1={};
_2f1.videoContent=_2f0;
_2f1.type=type;
_2f1.player_options=_2eb;
_2f1.jsfunction=_2ee;
$MP.bindInfoMap[_2eb.id]=_2f1;
var _2f2=-1;
var _2f3=0;
var _2f4=_2ec;
do{
var _2f5;
_2f2=_2ec.indexOf(",",_2f3);
if(_2f2!=-1){
_2f5=_2ec.substring(_2f3,_2f2);
_2f3=_2f2+1;
_2f4=_2ec.substring(_2f2+1);
}else{
_2f5=_2f4;
}
var _2f6=_2f5;
var _2f7;
if(_2f5.indexOf("@")!=-1){
_2f6=_2f5.substring(0,_2f5.indexOf("@"));
_2f7=_2f5.substring(_2f5.indexOf("@")+1);
}else{
_2f6=_2f5;
_2f7="onClick";
}
var _2f8=document.getElementById(_2f6);
if(_2f8==null){
continue;
}
handleTitle(_2eb.id,_2eb.src);
var _2f9=getVideoTitle(_2eb.src);
if(_2f7==null||_2f7.toLowerCase()=="onclick"){
bindFancyBox(false,true,_2f6,_2f7,_2eb,type,_2ee,_2f0,_2f9);
}else{
var _2fa=document.getElementById(_2f6);
_2f7=_2f7.substring(2);
$("#"+_2f6).live(_2f7.toLowerCase(),function(e){
bindFancyBox(true,true,_2f6,_2f7,_2eb,type,_2ee,_2f0,_2f9);
});
}
}while(_2f2!=-1);
var _2fc=document.getElementById(_2eb.id+"_"+"mediacontainer");
_2fc.parentNode.removeChild(_2fc);
}
function bindFancyBox(fire,_2fe,_2ff,_300,_301,type,_303,_304,_305){
var _306=document.getElementById(_301.id+"_"+"videoTitle");
if(_306==null){
_305="";
}else{
if(_305==null||_305==""){
_305="video";
}
}
if(fire){
$("#"+_2ff).fancybox({content:_304,overlayShow:true,overlayOpacity:0.7,width:_301.width+$MP.fancyBoxLeftBorderOffset,height:_301.height+$MP.fancyBoxBottonBorderOffset,title:_305,autoDimensions:false,onComplete:function(){
var _307=$.extend(true,{},$MP.bindInfoMap[_301.id].player_options);
if(_2fe&&_303.onBind!=null){
_303.onBind(_2ff,_300);
}
var _308=$MP.bindInfoMap[_301.id].player_options;
playerInitialization(_308,type,_303);
handleBindEvents(_308,$MP.bindInfoMap[_301.id]);
$MP.bindInfoMap[_301.id].player_options=$.extend(true,{},_307);
}}).trigger("click");
}else{
$("#"+_2ff).fancybox({content:_304,overlayShow:true,overlayOpacity:0.7,width:_301.width+$MP.fancyBoxLeftBorderOffset,height:_301.height+$MP.fancyBoxBottonBorderOffset,title:_305,autoDimensions:false,onComplete:function(){
var _309=$.extend(true,{},$MP.bindInfoMap[_301.id].player_options);
if(_2fe&&_303.onBind!=null){
_303.onBind(_2ff,_300);
}
var _30a=$MP.bindInfoMap[_301.id].player_options;
playerInitialization(_30a,type,_303);
handleBindEvents(_30a,$MP.bindInfoMap[_301.id]);
$MP.bindInfoMap[_301.id].player_options=$.extend(true,{},_309);
}});
}
}
function handleBindEvents(_30b,_30c){
var _30d=$MP.getPlayer(_30b.id);
if(_30c.mute!=null){
_30d.muted=mute;
}
if(_30c.volume!=null){
handleChangeVolume(_30b.id,_30c.volume);
}
if(_30c.startPlay!=null){
_30d.start();
}
if(_30c.stopPlay!=null){
_30d.pause();
}
}
function updateVideoType(_30e){
var _30f=_30e.childNodes;
if(_30f==null){
return;
}
var _310=_30e.getElementsByTagName("source");
if(_310==null||_310.length===0){
return;
}
var _311=_310[0].getAttribute("src");
if(_311==null){
return;
}
var type=_310[0].getAttribute("type");
if(type!=null){
return;
}
if(_311.lastIndexOf(".")==-1){
return;
}
var _313=_311.substring(_311.lastIndexOf(".")+1);
_313=_313.toLowerCase();
if(_313=="mp4"){
_310[0].setAttribute("type","video/mp4");
}else{
if(_313=="ogv"){
_310[0].setAttribute("type","video/ogg");
}else{
if(_313=="webm"){
_310[0].setAttribute("type","video/webm");
}
}
}
}
$MP.handleUserDefinedHTML5Element=function(_314,_315){
var _316=document.getElementById(_315);
var _317=_316.childNodes;
var _318=false;
updateVideoType(_314);
if(_317!=null){
var _319=null;
for(var k=0;k<_317.length;k++){
var _31b=_317[k];
if(_31b.tagName!=null&&_31b.tagName.toLowerCase()=="video"){
_319=_31b;
break;
}
}
if(_319==null){
return;
}
_317=_319.childNodes;
var _31c=null;
var _31d;
for(var i=0;i<_317.length;i++){
var _31b=_317[i];
if(_31b.tagName!=null&&_31b.tagName.toLowerCase()=="track"){
_314.appendChild(_31b);
}else{
if(_31b.tagName!=null&&_31b.tagName.toLowerCase()=="source"){
if(!_318){
var _31f=_314.getAttribute("src");
if(_31f==null){
var _320=_314.childNodes;
if(_320!=null){
for(var l=0;l<_320.length;l++){
if(_320[l].tagName.toLowerCase()=="source"){
var src=_320[l].getAttribute("src");
if(src!=null&&src.trim()!=0&&isHTMLFileFormatSupported(src)){
_31c=src;
break;
}
}
}
}
}
if(_31f!=null&&_31f!=""&&_31f.lastIndexOf(".")!=-1){
var _323=document.createElement("source");
_323.setAttribute("src",_31f);
var _324=_31f.substring(_31f.lastIndexOf(".")+1);
if(_324=="mp4"){
_323.setAttribute("type","video/mp4");
}else{
if(_324=="ogv"){
_323.setAttribute("type","video/ogg");
}else{
if(_324=="webm"){
_323.setAttribute("type","video/webm");
}
}
}
_314.appendChild(_323);
}
if(_31c==null&&isHTMLFileFormatSupported(_31f)){
_31c=_31f;
}
_314.removeAttribute("src");
}
var src=_31b.getAttribute("src");
src=resolveSource(src);
_31b.setAttribute("src",src);
_314.appendChild(_31b);
_318=true;
_31d=_31b;
if(_31c==null&&isHTMLFileFormatSupported(src)){
_31c=src;
}
}
}
}
if(_31c!=null){
handleTitle(_314.id,_31c);
}
if(_31d!=null){
_31d.setAttribute("onerror","onError(event)");
}
}
_314.load();
};
$MP.handleUserDefinedFlashParams=function(_325,type){
var _327=document.getElementById(_325.id+"_extendData");
if(_327==null||_327.childNodes==null||!isFlashSupported()){
return;
}
var _328=_327.childNodes;
var _329=false;
if(_328!=null){
var _32a=null;
for(var k=0;k<_328.length;k++){
var _32c=_328[k];
if(_32c.tagName!=null&&(_32c.tagName.toLowerCase()=="object"||_32c.tagName.toLowerCase()=="video")){
_32a=_32c;
var _32d=_32a.childNodes;
for(var i=0;i<_32d.length;i++){
var _32c=_32d[i];
if(_32c.tagName!=null&&_32c.tagName.toLowerCase()=="param"){
_329=true;
var _32f=_32c.getAttribute("name");
if(_32f=="flashvars"){
var _330=_32c.getAttribute("value");
var _331=0;
var _332=_330;
do{
var _333=_332.indexOf("&");
var _334;
if(_333>0){
_334=_332.substring(_331,_333);
}else{
_334=_332;
}
if(_334.indexOf("=")>0){
var _335=_334.substring(0,_334.indexOf("="));
var _336=_334.substring(_334.indexOf("=")+1);
if(_335!=""||_336!=""){
_325[_335]=resolveSource(_336);
}
}
_331=_333+1;
_332=_332.substring(_331);
}while(_333>0);
}
}
}
}
}
return _329;
}
};
function isFlashSupported(){
return swfobject.hasFlashPlayerVersion("1");
}
function isFlashFileFormatSupported(_337){
if(_337.indexOf("rtmp")==0){
return true;
}
var _338=["flv","f4v","f4m","m3u","mp4","swf","mpeg-4","m4v","f4f","3gpp","mp3","3gpp2","pbg","gif","jpg","jpeg","aac","speex","nellymoser","QuickTime"];
var _339=_337.lastIndexOf(".");
var _33a=_337.substring(_339+1,_337.length);
_33a=_33a.toLowerCase();
for(var i=0;i<_338.length;i++){
if(_338[i]==_33a){
return true;
}
}
return false;
}
function isHTMLFileFormatSupported(_33c){
if(_33c==null){
return false;
}
var _33d=["webm","mp4","ogv"];
var _33e=_33c.lastIndexOf(".");
var _33f=_33c.substring(_33e+1,_33c.length);
_33f=_33f.toLowerCase();
var elem=document.createElement("video");
var ogg=elem.canPlayType("video/ogg; codecs=\"theora\"");
var h264="video/mp4; codecs=\"avc1.42E01E";
var mp4=elem.canPlayType(h264+"\"")||elem.canPlayType(h264+", mp4a.40.2\"");
var webm=elem.canPlayType("video/webm; codecs=\"vp8, vorbis\"");
for(var i=0;i<_33d.length;i++){
if(_33d[i]==_33f){
if(_33f=="ogv"){
return ogg;
}else{
if(_33f=="webm"){
return webm;
}else{
if(_33f=="mp4"){
return mp4;
}
}
}
}
}
return false;
}
function getWrapper(name){
var _347=$MP.playerWrapperMap[name];
if(_347==null||typeof (_347)=="undefined"){
return $MP.playerWrapperMap[name+"_strobemediaplayback-video"];
}
return _347;
}
function getFuncMap(name){
var _349=$MP.jsFunctionMap[name];
if(_349==null||typeof (_349)=="undefined"){
return $MP.jsFunctionMap[name+"_strobemediaplayback-video"];
}
return _349;
}
ColdFusion.MediaPlayer.setMute=function(name,mute){
if($MP.bindInfoMap[name]!=null){
var _34c=getBindInfo(name);
if(_34c==null){
return;
}
_34c.mute=mute;
return;
}
var _34d=$MP.getPlayer(name);
var _34e=$MP.getType(name);
var _34f=getWrapper(name);
if(_34e=="html"){
_34d.muted=mute;
if(mute){
_34f.volumeHigh.css("background-position","0px -72px");
_34f.volumeSlider.slider("value",0);
}else{
handleChangeVolume(name,_34d.volume);
}
}else{
if(_34e=="flash"){
_34d.setMuted(mute);
}
}
};
function resolveSource(src){
if(src==null){
return null;
}
if(src.charAt(0)!="/"&&src.indexOf("://")<0){
var _351="";
var _352=document.location.href;
if(_352||_352.indexOf("/")>-1){
_351=_352.substring(0,_352.lastIndexOf("/")+1);
}
var _353=_351+src;
var _354=_353.split("/");
var _355=new Array();
var _356=0;
for(var i=0;i<_354.length;i++){
if(_354[i]==".."){
_355[--_356]="";
}else{
_355[_356++]=_354[i];
}
}
src=_355[0];
for(var i=1;i<_356;i++){
src=src+"/"+_355[i];
}
}
if(src.indexOf("/")==0){
src=$MP.baseURI+src;
}
return src;
}
ColdFusion.MediaPlayer.getPlayer=function(name){
var _359=$MP.playerMap[name];
if(_359==null||typeof (_359)=="undefined"){
_359=$MP.playerMap[name+"_strobemediaplayback-video"];
if(_359==null||typeof (_359)=="undefined"){
ColdFusion.handleError(null,"mediaplayer.getplayer.notfound","widget",[name],null,null,true);
}
}
return _359;
};
ColdFusion.MediaPlayer.setTitle=function(name,_35b){
if(_35b==null){
ColdFusion.handleError(null,"mediaplayer.settitle.invalidtitle","widget",[name],null,null,true);
}
var _35c=$MP.titleDataMap[name];
if(_35c==null){
_35c={};
$MP.titleDataMap[name]=_35c;
}
var _35d=document.getElementById(name+"_videoTitle");
if(_35d==null){
var _35e="<div id=\""+name+"_videoTitle\">";
$("#"+name+"_videoContainer").prepend(_35e);
}
_35c.hideTitle=false;
_35c.title=_35b;
handleTitle(name,_35b,_35c);
};
ColdFusion.MediaPlayer.setSource=function(name,src){
if(src==null||src=="undefined"){
ColdFusion.handleError(null,"mediaplayer.setsource.invalidsource","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _361=getBindInfo(name);
if(_361==null){
return;
}
_361.player_options.src=resolveSource(src);
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_361.player_options.favorFlashOverHtml5Video=true;
}else{
_361.player_options.favorFlashOverHtml5Video=false;
}
_361.videoTitle=getVideoTitle(src);
return;
}
var _362=$MP.getPlayer(name);
var _363=$MP.getType(name);
src=resolveSource(src);
var _364=getWrapper(name);
var _365,jsFunctionMap;
if(_364!=null&&_364.errorwindow!=null){
_364.errorwindow.html("");
_364.errorwindow.hide();
_365=$MP.playerOptionsMap[_364.options.id];
}else{
_365=$MP.playerOptionsMap[name+"_"+"strobemediaplayback-video"];
jsFunctionMap=$MP.jsFunctionMap[name+"_"+"strobemediaplayback-video"];
}
if(_365==null){
_365=$MP.defaultOptions;
}
var _366={"tablet":{"name":_365.id+"_"+"strobemediaplayback-video"},"smartphone":{"startSize":{"width":360,"height":200},"name":_365.id+"_"+"strobemediaplayback-video"},"default":{"startSize":{"width":+_365.width,"height":+_365.height},"name":_365.id+"_"+"strobemediaplayback-video"}};
if(_363=="html"){
if(isHTMLFileFormatSupported(src)){
_362.src=src;
_362.load();
_362.pause();
_364.playOverlay.fadeIn(600);
_364.playtoggle.removeClass("paused");
_364.slider.css({"left":"0%"});
_364.playedbar.css({"width":"0%"});
_364.currenttime.html("0:00");
_364.duration.html("0:00");
var css={"left":"0%","width":"0%"};
_364.bufferbar.removeClass("done");
_364.bufferbar.css(css);
var _368=$MP.titleDataMap[_365.id];
handleTitle(name,src,_368);
}else{
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_365.isHTML5=false;
_365.favorFlashOverHtml5Video=true;
_365.src=src;
var _368=$MP.titleDataMap[_365.id];
if(_368.hideTitle!=null&&!_368.hideTitle){
_365.wmode="opaque";
}
strobeMediaPlayback.draw(_365.id+"_"+"strobemediaplayback-video",_366,_365);
var _369=$("#"+_365.id+"_"+"strobemediaplayback-video");
var _36a=_369.find("video");
var _36b=_36a.get(0);
var _36c=$("#"+_365.id+"_"+"strobemediaplayback-video  .html5player").strobemediaplaybackhtml5(_365,_364.jsCallbackFunctions);
$MP.playerMap[_365.id]=_36b;
$MP.playerWrapperMap[_365.id]=_36c;
handleTitle(_365.id,_365.src,_368);
}
}
}else{
if(_363=="flash"){
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_362.setMediaResourceURL(src);
handleTitle(name,src,$MP.titleDataMap[id]);
}else{
if(isHTMLFileFormatSupported(src)){
var id=_365.id+"_strobemediaplayback-video";
$("#"+id).replaceWith("<div  id=\""+id+"\"></div>");
$("#"+id).css("visibility","visible");
_365.isHTML5=true;
_365.favorFlashOverHtml5Video=false;
_365.src=src;
strobeMediaPlayback.draw(id,_366,_365);
var _369=$("#"+id);
var _36a=_369.find("video");
var _36b=_36a.get(0);
if(_36b==null){
return;
}
var _36e=getFuncMap(id);
var _36c=$("#"+id+"  .html5player").strobemediaplaybackhtml5(_365,_36e);
$MP.playerMap[_365.id]=_36b;
$MP.playerWrapperMap[_365.id]=_36c;
handlePlayoverlay(_365.id,_365.width,_365.height);
handleErrorElement(_365.id,_365.width,_365.height);
_36c.playOverlay.css("display","block");
handleTitle(_365.id,_365.src,$MP.titleDataMap[id]);
_36b.load();
if(_365.autoPlay==false){
_36b.pause();
}
}
}
}
}
};
function getBindInfo(name){
var _370=$MP.bindInfoMap[name];
if(_370!=null){
return _370;
}
return;
}
function handleBindElements(_371){
if(_371!=null){
if(_371.bindEvent==null||_371.bindEvent.toLowerCase()=="onclick"){
bindFancyBox(false,false,_371.bindElement,_371.player_options,_371.type,_371.jsFuncc,_371.videoContent,_371.videoTitle);
}else{
var _372=document.getElementById(_371.bindElement);
var _373=_371.bindEvent.substring(2);
$("#"+_371.bindElement).live(_373.toLowerCase(),function(e){
bindFancyBox(true,false,_371.bindElement,_371.player_options,_371.type,_371.jsFuncc,_371.videoContent,_371.videoTitle);
});
}
}
}
function handleChangeVolume(name,_376){
var _377=$MP.getPlayer(name);
var _378=$MP.getType(name);
if(_378=="html"){
if(_377.muted){
_377.muted=false;
}
_377.volume=_376;
var _379=getWrapper(name);
var _37a=_379.volumeSlider;
_37a.slider("value",_376*100);
handleVolumeChangeUI(name,_376);
}else{
if(_378=="flash"){
_377.setVolume(_376);
}
}
}
ColdFusion.MediaPlayer.setVolume=function(name,_37c){
if(_37c<=0){
ColdFusion.handleError(null,"mediaplayer.setvolume.invalidvalue","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _37d=getBindInfo(name);
if(_37d==null){
return;
}
_37d.volume=_37c;
return;
}
handleChangeVolume(name,_37c);
};
ColdFusion.MediaPlayer.resize=function(name,_37f,_380){
if(_37f<=0||_380<=0){
ColdFusion.handleError(null,"mediaplayer.resize.invalidvalue","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _381=getBindInfo(name);
if(_381==null){
return;
}
_381.player_options.width=_37f;
_381.player_options.height=_380;
return;
}
var _382=false;
var _383=$MP.getPlayer(name);
var _384=$MP.getType(name);
var _385=getWrapper(name);
_383.width=_37f;
_383.height=_380;
if(_385!=null){
_385.options.width=_37f;
_385.options.height=_380;
_385.controlbar.css("width",_37f-1.5);
if(_385.options.width>180){
_385.progressbar.css("width",_37f-180);
_385.trackswidth=_37f-180;
}else{
_385.progressbar.css("width","50%");
_385.trackswidth="50%";
}
handlePlayoverlay(name,_37f,_380);
handleErrorElement(name,_37f,_380);
}
$("#"+name+"_"+"videoContainer").css("width",_37f);
$("#"+name+"_"+"videoContainer").css("height",_380);
if(_383.paused==false){
_385.playOverlay.hide();
}
};
ColdFusion.MediaPlayer.getType=function(name){
var elem=document.getElementById(name);
if(elem==null||elem=="undefined"){
elem=document.getElementById(name+"_strobemediaplayback-video");
if(elem==null||typeof (elem)=="undefined"){
return "unknown";
}
}
var type=elem.nodeName;
if(type==null){
return "unknown";
}
type=type.toLowerCase();
if(type=="video"){
return "html";
}else{
if(type=="object"){
return "flash";
}else{
return "unknown";
}
}
};
ColdFusion.MediaPlayer.startPlay=function(name){
if($MP.bindInfoMap[name]!=null){
var _38a=getBindInfo(name);
if(_38a==null){
return;
}
_38a.startPlay=true;
return;
}
var _38b=$MP.getPlayer(name);
var _38c=$MP.getType(name);
if(_38c=="html"){
_38b.play();
}else{
if(_38c=="flash"){
_38b.play2();
}
}
};
ColdFusion.MediaPlayer.stopPlay=function(name){
if($MP.bindInfoMap[name]!=null){
var _38e=getBindInfo(name);
if(_38e==null){
return;
}
_38e.stopPlay=true;
return;
}
var _38f=$MP.getPlayer(name);
_38f.pause();
};
ColdFusion.MediaPlayer.logError=function(name,_391){
if(name==null||_391==null){
return;
}
var _392=$MP.playerWrapperMap[name];
if(_392==null){
_392=$MP.playerWrapperMap[name+"_strobemediaplayback-video"];
if(_392==null){
return;
}
}
_392.errorwindow.html(_391);
_392.errorwindow.show();
_392.playOverlay.hide();
};
function handlePlayoverlay(name,_394,_395){
if(!isDesktop){
return;
}
var _396=getWrapper(name);
_396.playOverlay.css("left","");
_396.playOverlay.css("top","");
_396.playOverlay.css("left",(_394-116)/2+"px");
_396.playOverlay.css("top",(_395-107)/2+"px");
}
function handleErrorElement(name,_398,_399){
var _39a=getWrapper(name);
_39a.playOverlay.css("display","none");
_39a.errorwindow.css("left","");
_39a.errorwindow.css("top","");
_39a.errorwindow.css("display","none");
var _39b=_39a.controlbar;
var _39c=0;
if(_39b!=null){
_39c=_39b.css("height");
if(_39c!=null&&_39c.indexOf("px")!=-1){
_39c=_39c.substring(0,_39c.indexOf("px"));
}else{
_39c=0;
}
}
_39a.errorwindow.css("margin-top",_399/2-_39c+"px");
}
function handleTitleResize(id,_39e,_39f){
$("#"+id+"_videoTitle").css("width","");
$("#"+id+"_videoTitle").css("width",_39e+"px");
}
function handleTitle(_3a0,_3a1,_3a2){
var _3a3=document.getElementById(_3a0+"_"+"videoTitle");
if(_3a3==null){
_3a0=_3a0.substring(0,_3a0.indexOf("_strobemediaplayback-video"));
_3a3=document.getElementById(_3a0+"_"+"videoTitle");
}
var _3a4=document.getElementById("fancybox-title-float-main");
if(_3a3!=null){
if(_3a2==null){
_3a2=$MP.titleDataMap[_3a0];
if(_3a2==null||_3a2.hideTitle){
var _3a5=_3a3.parentNode;
_3a5.removeChild(_3a3);
return;
}
}else{
if(_3a2.hideTitle){
var _3a5=_3a3.parentNode;
_3a5.removeChild(_3a3);
return;
}
}
var _3a6=_3a2.title;
if(_3a2==null||_3a2.title==null||_3a2.title.trim()==""){
_3a6=getVideoTitle(_3a1);
}
if(_3a6!=""){
_3a3.innerHTML=_3a6;
}else{
return;
}
$("#"+_3a0+"_"+"videoTitle").css("position","absolute");
$("#"+_3a0+"_"+"videoTitle").css("z-index",2);
if(_3a2==null||_3a2.title_text_color==null){
$("#"+_3a0+"_"+"videoTitle").css("color","white");
}else{
$("#"+_3a0+"_"+"videoTitle").css("color",_3a2.title_text_color);
}
if(_3a2!=null&&_3a2.title_bgcolor!=null){
$("#"+_3a0+"_"+"videoTitle").css("background-color",_3a2.title_bgcolor);
}
$("#"+_3a0+"_"+"videoTitle").css("font-weight","bold");
$("#"+_3a0+"_"+"videoTitle").css("font-family","Arial,Helvetica,sans-serif");
$("#"+_3a0+"_"+"videoTitle").css("font-size","13px");
$("#"+_3a0+"_"+"videoTitle").css("word-wrap","break-word");
if(_3a3.style.backgroundColor==null||_3a3.style.backgroundColor==""){
$("#"+_3a0+"_"+"videoTitle").css("margin-left","5px");
}
$("#"+_3a0+"_"+"videoTitle").show();
$("#"+_3a0+"_"+"strobemediaplayback").css("z-index",1);
}else{
if(_3a4!=null&&_3a1!=null){
$("#fancybox-title-float-main").text(_3a1);
}
}
}
function getVideoTitle(_3a7){
var _3a8=null;
if(_3a7!=null&&_3a7!=""){
var _3a9=_3a7.lastIndexOf("/");
if(_3a9==-1){
_3a9=_3a7.lastIndexOf("\\");
}
if(_3a9==-1){
_3a8=_3a7;
}
if(_3a8==null){
_3a8=_3a7.substring(_3a9+1,_3a7.length);
}
}
if(_3a8==null||_3a8.indexOf(".")<0){
return _3a7;
}else{
return _3a8;
}
}
function handlebackgroundColor(_3aa){
if(_3aa.backgroundColor==null){
return;
}
var _3ab=document.getElementById(_3aa.id);
if(_3ab==null){
return;
}
_3ab.setAttribute("style","background-color:"+_3aa.backgroundColor+";");
}
function handleBorderStyle(_3ac,_3ad){
if(_3ad.hideBorder){
return;
}
var _3ae="#fff";
if(_3ad.bgColor){
_3ae=_3ad.bgColor;
}
var _3af=document.getElementById(_3ac+"_"+"videoContainer");
if(_3af==null){
_3ac=_3ac.substring(0,_3ac.indexOf("_"));
}
if(_3ad.border_left!=null){
$("#"+_3ac+"_"+"videoContainer").css("border-left",_3ad.border_left+"px"+" solid "+_3ae);
}
if(_3ad.border_right!=null){
$("#"+_3ac+"_"+"videoContainer").css("border-right",_3ad.border_right+"px"+" solid "+_3ae);
}
if(_3ad.border_top!=null){
$("#"+_3ac+"_"+"videoContainer").css("border-top",_3ad.border_top+"px"+" solid "+_3ae);
}
if(_3ad.border_bottom!=null){
$("#"+_3ac+"_"+"videoContainer").css("border-bottom",_3ad.border_bottom+"px"+" solid "+_3ae);
}
}
function handleControlsStyle(_3b0,_3b1){
var _3b2=getWrapper(_3b0);
if(_3b1.controlbar_bgcolor!=null){
_3b2.controlbar.css("background-color",_3b1.controlbar_bgcolor);
}
if(_3b1.controls_color!=null){
_3b2.playtoggle.css("background-color",_3b1.controls_color);
_3b2.slider.css("background-color",_3b1.controls_color);
_3b2.fullview.css("background-color",_3b1.controls_color);
_3b2.currenttime.css("color",_3b1.controls_color);
_3b2.duration.css("color",_3b1.controls_color);
_3b2.seekbar.css("background-color",_3b1.controls_color);
_3b2.volumeHigh.css("background-color",_3b1.controls_color);
}
if(_3b1.progress_bgcolor!=null){
_3b2.bufferbar.css("background-color",_3b1.progress_bgcolor);
}
if(_3b1.progress_color!=null){
_3b2.playedbar.css("background-color",_3b1.progress_color);
}
}
function triggerHandler(id,_3b4,_3b5){
if(_3b4=="onJavaScriptBridgeCreated"){
return;
}else{
if(_3b4=="play"){
var _3b6=getFuncMap(id);
var _3b7=$MP.videoMonitorMap[id];
if(_3b6.onStartCallback!=null&&_3b7.paused){
_3b6.onStartCallback(id);
_3b7.paused=false;
}
hideTitle(id);
}else{
if(_3b4=="pause"){
var _3b6=getFuncMap(id);
var _3b7=$MP.videoMonitorMap[id];
if(_3b6.onPauseCallback!=null&&!_3b7.paused){
_3b6.onPauseCallback(id);
_3b7.paused=true;
}
showTitle(id);
}else{
if(_3b4=="complete"){
var _3b6=getFuncMap(id);
if(_3b6.onComplete!=null){
_3b6.onComplete();
}
var _3b7=$MP.videoMonitorMap[id];
_3b7.paused=true;
showTitle(id);
}else{
if(_3b4=="loadedmetadata"){
var _3b6=getFuncMap(id);
if(_3b6.onLoad!=null){
_3b6.onLoad();
}
}else{
if(_3b4=="error"){
var _3b6=getFuncMap(id);
if(_3b6.onError!=null){
_3b6.onError();
}
}else{
if(_3b4=="volumechange"){
var _3b7=$MP.videoMonitorMap[id];
_3b7.muted=_3b5.muted;
}
}
}
}
}
}
}
}
function onError(_3b8){
var _3b9;
var _3ba;
var _3bb;
var _3bc;
if(_3b8.target!=null&&_3b8.target.tagName.toLowerCase()=="video"){
_3bb=getFuncMap(_3b8.target.id);
if(_3b8.target.error!=null){
_3ba=_3b8.target.error.code;
}
_3bc=getWrapper(_3b8.target.id);
}else{
if(_3b8.target!=null&&_3b8.target.tagName.toLowerCase()=="source"){
var _3bd=_3b8.target.getAttribute("src");
var _3be=_3b8.target.getAttribute("onerror");
if(_3bd!=null&&_3be!=null){
_3ba=4;
}else{
return;
}
}
var _3bf=_3b8.target.parentNode;
_3bb=getFuncMap(_3bf.id);
_3bc=getWrapper(_3bf.id);
}
if(_3ba==null){
return;
}
if(_3bb.onError!=null){
_3bb.onError(_3ba);
return;
}
switch(_3ba){
case 1:
_3b9="You aborted the video playback.";
break;
case 2:
_3b9="A network error caused the video download to fail part-way.";
break;
case 3:
_3b9="The video playback was aborted due to a corruption problem or because the video used features your browser did not support.";
break;
case 4:
_3b9="The video could not be loaded, either because the server or network failed or because the format is not supported.";
break;
default:
_3b9="An unknown error occurred.";
break;
}
_3bc.playOverlay.css("display","none");
_3bc.errorwindow.html(_3b9);
_3bc.errorwindow.show();
}
function onFlashEmbedComplete(_3c0){
var _3c1=$("#"+_3c0.id);
var _3c2=_3c1.get(0);
$MP.playerMap[_3c0.id]=_3c2;
}
function removejscssfile(_3c3,_3c4){
var _3c5=(_3c4=="js")?"script":(_3c4=="css")?"link":"none";
var _3c6=(_3c4=="js")?"src":(_3c4=="css")?"href":"none";
var _3c7=document.getElementsByTagName(_3c5);
for(var i=_3c7.length;i>=0;i--){
if(_3c7[i]&&_3c7[i].getAttribute(_3c6)!=null&&_3c7[i].getAttribute(_3c6).indexOf(_3c3)!=-1){
_3c7[i].parentNode.removeChild(_3c7[i]);
}
}
}
