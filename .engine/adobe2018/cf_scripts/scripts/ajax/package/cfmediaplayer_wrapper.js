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
ColdFusion.MediaPlayer.init=function(_3c4){
var _3c5=$MP.defaultOptions;
_3c5.id=_3c4.id;
var _3c6={};
var _3c7={};
var _3c8={};
var _3c9=null;
var _3ca={onStart:null,onComplete:null,onPause:null,onError:null,onLoad:null,onStartCallback:playbackStart,onPauseCallback:playbackPause};
if(_3c4.width!=null&&typeof (_3c4.width)!="undefined"){
_3c5.width=_3c4.width;
}else{
_3c5.width=480;
}
if(_3c4.height!=null&&typeof (_3c4.height)!="undefined"){
_3c5.height=_3c4.height;
}else{
_3c5.height=275;
}
if(_3c4.baseURI!=null){
$MP.baseURI=_3c4.baseURI;
}
if(_3c4.src!=null&&_3c4.src!=""){
_3c5.src=resolveSource(_3c4.src);
}else{
_3c5.src="";
}
if(_3c4.PosterImage!=null&&_3c4.PosterImage!=""){
_3c5.poster=resolveSource(_3c4.PosterImage);
}else{
_3c5.poster="";
}
if(_3c4.javascriptControls==null){
_3c5.javascriptControls=true;
}
if(_3c4.playButtonOverlay==null){
_3c5.playButtonOverlay=true;
}
if(_3c4.repeat!=null){
if(_3c4.repeat=="true"){
_3c5.loop=true;
}else{
_3c5.loop=false;
}
}else{
_3c5.loop=false;
}
if(_3c4.autoPlay!=null){
if(_3c4.autoPlay=="true"){
_3c5.autoPlay=true;
}else{
_3c5.autoPlay=false;
}
}else{
_3c5.autoPlay=false;
}
if(_3c4.bgcolor!=null){
_3c5.backgroundColor=_3c4.bgcolor;
_3c7.bgColor=_3c4.bgcolor;
}
if(_3c4.controlbar!=null){
if(_3c4.controlbar==false){
_3c5.controlBarMode="none";
}else{
_3c5.controlBarMode="docked";
}
}
if(_3c4.skin!=null){
_3c5.skin=resolveSource(_3c4.skin);
}else{
_3c5.skin="";
}
if(_3c4.onComplete!=null){
_3ca.onComplete=_3c4.onComplete;
}
if(_3c4.onLoad!=null){
_3ca.onLoad=_3c4.onLoad;
}
if(_3c4.onStart!=null){
_3ca.onStart=_3c4.onStart;
}
if(_3c4.onPause!=null){
_3ca.onPause=_3c4.onPause;
}
if(_3c4.onError!=null){
_3ca.onError=_3c4.onError;
}
if(_3c4.onBind!=null){
_3ca.onBind=_3c4.onBind;
}
if(_3c4.hideTitle!=null){
_3c6.hideTitle=_3c4.hideTitle;
}
if(_3c4.title!=null){
_3c6.title=_3c4.title;
}
if(_3c4.title_text_color!=null){
_3c6.title_text_color=_3c4.title_text_color;
}
if(_3c4.title_bgcolor!=null){
_3c6.title_bgcolor=_3c4.title_bgcolor;
}
if(_3c4.border_left!=null){
_3c7.border_left=_3c4.border_left;
}
if(_3c4.border_right!=null){
_3c7.border_right=_3c4.border_right;
}
if(_3c4.border_top!=null){
_3c7.border_top=_3c4.border_top;
}
if(_3c4.border_bottom!=null){
_3c7.border_bottom=_3c4.border_bottom;
}
if(_3c4.progress_color!=null){
_3c8.progress_color=_3c4.progress_color;
}
if(_3c4.progress_bgcolor!=null){
_3c8.progress_bgcolor=_3c4.progress_bgcolor;
}
if(_3c4.controls_color!=null){
_3c8.controls_color=_3c4.controls_color;
}
if(_3c4.controlbar_bgcolor!=null){
_3c8.controlbar_bgcolor=_3c4.controlbar_bgcolor;
}
if(!_3c5.javascriptControls){
$(".strobeMediaPlaybackControlBar,.smp-error,.playoverlay").show();
}
if(_3c4.bindData!=null&&_3c4.bindData!="undefined"){
_3c9=$.extend(true,{},_3c5);
handleBindingMediaPlayer(_3c9,_3c4.bindData,_3c4.type,_3ca);
return;
}
handleWmode(_3c4,_3c5);
playerInitialization(_3c5,_3c4.type,_3ca,_3c6,_3c7,_3c8);
};
function handleWmode(_3cb,_3cc){
if(navigator.platform.indexOf("Linux")!=-1){
_3cc.wmode="direct";
return;
}
if(_3cb.wmode!=null){
_3cc.wmode=_3cb.wmode;
}else{
_3cc.wmode="direct";
}
var _3cd=document.getElementById(_3cc.id+"_"+"videoTitle");
if((_3cd!==null&&(_3cb.hideTitle==null||_3cb.hideTitle==false))||(_3cc.backgroundColor!=null&&_3cc.backgroundColor.trim()!="")){
_3cc.wmode="transparent";
}
}
function isValidSourceElementExist(_3ce,type){
if(_3ce.src!=null&&_3ce.src!=""){
if(type=="html"&&$MP.hasHTML5VideoPlaybackSupport&&isHTMLFileFormatSupported(_3ce.src)){
return true;
}else{
if(type=="flash"&&isFlashSupported()&&isFlashFileFormatSupported(_3ce.src)){
return true;
}
}
}
var _3d0=document.getElementById(_3ce.id+"_extendData");
if(_3d0==null||_3d0.childNodes==null||!isFlashSupported()){
return false;
}
var _3d1=_3d0.getElementsByTagName("source");
for(var k=0;k<_3d1.length;k++){
var src=_3d1[k].getAttribute("src");
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
var _3d5=document.getElementById(id+"_"+"videoTitle");
if(_3d5==null){
id=id.substring(0,id.indexOf("_strobemediaplayback-video"));
_3d5=document.getElementById(id+"_"+"videoTitle");
}
if(_3d5!=null){
$("#"+id+"_"+"videoTitle").fadeOut(600,null);
}
}
function playbackStart(id){
var _3d7=getFuncMap(id);
if(_3d7.onStart!=null){
_3d7.onStart();
}
var _3d8=getWrapper(id);
if(_3d8!=null){
_3d8.playOverlay.fadeOut(600);
}
hideTitle(id);
}
function showTitle(id){
var _3da=document.getElementById(id+"_"+"videoTitle");
if(_3da==null){
id=id.substring(0,id.indexOf("_strobemediaplayback-video"));
_3da=document.getElementById(id+"_"+"videoTitle");
}
if(_3da!=null){
$("#"+id+"_"+"videoTitle").fadeIn(1,null);
}
}
function playbackPause(id){
var _3dc=getFuncMap(id);
if(_3dc.onPause!=null){
_3dc.onPause();
}
var _3dd=getWrapper(id);
if(_3dd!=null){
_3dd.playOverlay.fadeIn(600);
}
showTitle(id);
}
function playbackComplete(id){
var _3df=getFuncMap(id);
if(_3df.onComplete!=null){
_3df.onComplete();
}
var _3e0=getWrapper(id);
if(_3e0!=null){
_3e0.playOverlay.fadeIn(600);
_3e0.slider.css("left",0+"px");
_3e0.currenttime.html("0:00");
}
showTitle(id);
}
function updateFlashVideoSource(_3e1){
if(_3e1.src!=null&&_3e1.src!=""){
if(isFlashSupported()&&isFlashFileFormatSupported(_3e1.src)){
return;
}
}
var _3e2=document.getElementById(_3e1.id+"_extendData");
if(_3e2==null||_3e2.childNodes==null||!isFlashSupported()){
return;
}
var _3e3=_3e2.getElementsByTagName("source");
for(var k=0;k<_3e3.length;k++){
var src=_3e3[k].getAttribute("src");
if(isFlashSupported()&&isFlashFileFormatSupported(src)){
_3e1.src=resolveSource(src);
return;
}
}
return;
}
function playerInitialization(_3e6,type,_3e8,_3e9,_3ea,_3eb){
var _3ec=true;
var _3ed=isValidSourceElementExist(_3e6,"html");
var _3ee=isValidSourceElementExist(_3e6,"flash");
var _3ef=$MP.handleUserDefinedFlashParams(_3e6,type);
if(_3ef){
_3e6.favorFlashOverHtml5Video=true;
}else{
if(isFlashSupported()){
if(type==null||type=="flash"){
if(_3ee){
_3e6.favorFlashOverHtml5Video=true;
}else{
if(_3ed){
_3e6.favorFlashOverHtml5Video=false;
}else{
_3ec=false;
}
}
}else{
if(_3ed){
_3e6.favorFlashOverHtml5Video=false;
}else{
if(_3ee){
_3e6.favorFlashOverHtml5Video=true;
}else{
_3ec=false;
}
}
}
}else{
if($MP.hasHTML5VideoPlaybackSupport){
_3e6.favorFlashOverHtml5Video=false;
}else{
_3ec=false;
}
}
}
if(_3e6.favorFlashOverHtml5Video){
updateFlashVideoSource(_3e6);
}
if(!_3ec){
if($MP.hasHTML5VideoPlaybackSupport){
_3e6.favorFlashOverHtml5Video=false;
}else{
$(".playoverlay").hide();
ColdFusion.MediaPlayer.logError(_3e6.id,"The video could not be loaded");
return;
}
}
var _3f0={"tablet":{"startSize":{"width":+_3e6.width,"height":+_3e6.height},"name":_3e6.id+"_"+"strobemediaplayback-video"},"smartphone":{"startSize":{"width":+_3e6.width,"height":+_3e6.height},"name":_3e6.id+"_"+"strobemediaplayback-video"},"default":{"startSize":{"width":+_3e6.width,"height":+_3e6.height},"name":_3e6.id+"_"+"strobemediaplayback-video"}};
strobeMediaPlayback.draw(_3e6.id+"_"+"strobemediaplayback-video",_3f0,_3e6);
var _3f1=$("#"+_3e6.id+"_"+"strobemediaplayback-video");
var _3f2=$("#"+_3e6.id);
var _3f3=_3f2.get(0);
var _3f4;
if(_3f3==null){
_3e6.id=_3e6.id+"_strobemediaplayback-video";
$MP.playerOptionsMap[_3e6.id]=_3e6;
$MP.videoMonitorMap[_3e6.id]={paused:true,muted:false};
}else{
_3f4=$("#"+_3e6.id+"_"+"strobemediaplayback-video  .html5player").strobemediaplaybackhtml5(_3e6,_3e8);
$MP.playerMap[_3e6.id]=_3f3;
$MP.playerWrapperMap[_3e6.id]=_3f4;
$MP.playerOptionsMap[_3e6.id]=_3e6;
}
$MP.jsFunctionMap[_3e6.id]=_3e8;
$MP.titleDataMap[_3e6.id]=_3e9;
if(_3f3!=null&&_3f3.nodeName!=null&&_3f3.nodeName.toLowerCase()=="video"){
handleVolumeSlider(_3e6.id);
_3f3.volume=0.6;
handlePlayoverlay(_3e6.id,_3e6.width,_3e6.height);
handleErrorElement(_3e6.id,_3e6.width,_3e6.height);
var _3f5=$MP.playerWrapperMap[_3e6.id];
_3f5.playOverlay.css("display","block");
_3f1.css("width","100%");
_3f1.css("height","100%");
handlebackgroundColor(_3e6);
handleControlsStyle(_3e6.id,_3eb);
_3f4.useHTML5=true;
var _3f6=document.getElementById(_3e6.id+"_extendData");
if(_3f6!=null){
$MP.handleUserDefinedHTML5Element(_3f3,_3e6.id+"_extendData");
}else{
handleTitle(_3e6.id,_3e6.src,_3e9);
var _3f7=getFuncMap(_3e6.id);
var _3f8=document.getElementById(_3e6.id);
var _3f9=_3f8.getElementsByTagName("source");
if(_3f9!=null&&_3f9.length!=0){
_3f9[0].setAttribute("onerror","onError(event)");
}
}
}else{
handleTitle(_3e6.id,_3e6.src,_3e9);
}
handleBorderStyle(_3e6.id,_3ea);
if($MP.bindInfoMap[_3e6.id]==null){
var _3fa=document.getElementById(_3e6.id+"_extendData");
if(_3fa==null){
var id=_3e6.id.substring(0,_3e6.id.indexOf("_"));
_3fa=document.getElementById(id+"_extendData");
}
if(_3fa!=null&&_3fa.parentNode!=null){
_3fa.parentNode.removeChild(_3fa);
}
}
}
function handleVolumeChangeUI(_3fc,_3fd){
var _3fe=getWrapper(_3fc);
if(_3fd<=0){
_3fe.volumeHigh.css("background-position","0px -72px");
}else{
if(_3fd<=0.3){
_3fe.volumeHigh.css("background-position","-24px -72px");
}else{
if(_3fd<=0.7){
_3fe.volumeHigh.css("background-position","-48px -72px");
}else{
_3fe.volumeHigh.css("background-position","-72px -72px");
}
}
}
}
function handleVolumeSlider(_3ff){
var _400=getWrapper(_3ff);
var _401=_400.volumeSlider;
_401.slider({orientation:"vertical",range:"min",min:0,max:90,value:60,slide:function(_402,ui){
var _404=ui.value/100;
_400.currentVolume=_404;
handleChangeVolume(_3ff,_404);
}});
_400.volumeHigh.mouseover(function(){
var _405=getWrapper(_3ff);
var _406=_405.volumeSlider;
_406.css("display","block");
_405.volumeContainer.css("display","block");
});
_400.volumeHigh.mouseout(function(_407){
var _408=getWrapper(_3ff);
var _409=_408.volumeSlider;
var _40a=_408.volumeContainer;
var _40b=_407.relatedTarget;
if(_40b.className!="controls"){
_409.css("display","none");
_40a.css("display","none");
}
});
_400.volumeHigh.click(function(_40c){
var _40d=getWrapper(_3ff);
if(_40d.currentVolume==null){
_40d.currentVolume=0.6;
}
var pos=_400.volumeHigh.css("background-position");
if(pos.indexOf("0px")!=0){
_400.volumeHigh.css("background-position","0px -72px");
_400.volumeSlider.slider("value",0);
handleChangeVolume(_3ff,0);
}else{
_400.volumeSlider.slider("value",_40d.currentVolume*100);
if(_40d.currentVolume<=0.1){
_400.volumeHigh.css("background-position","0px -72px");
}else{
if(_40d.currentVolume<=0.3){
_400.volumeHigh.css("background-position","-24px -72px");
}else{
if(_40d.currentVolume<=0.7){
_400.volumeHigh.css("background-position","-48px -72px");
}else{
_400.volumeHigh.css("background-position","-72px -72px");
}
}
}
handleChangeVolume(_3ff,_40d.currentVolume);
}
});
_400.controlbar.mouseout(function(_40f){
if(_40f.relatedTarget==null){
return;
}
var _410=_40f.relatedTarget.className;
if(_40f.relatedTarget.className!="controls"&&_410!="volume-container"&&_410.indexOf("ui-slider")==-1){
var _411=getWrapper(_3ff);
var _412=_411.volumeSlider;
var _413=_411.volumeContainer;
_412.css("display","none");
_413.css("display","none");
}
});
}
function handleBindingMediaPlayer(_414,_415,type,_417){
var _418=document.getElementById(_414.id+"_"+"html5MediaPlayback");
if(_418==null){
return;
}
var _419=_418.innerHTML;
if(_419==null){
return;
}
var _41a={};
_41a.videoContent=_419;
_41a.type=type;
_41a.player_options=_414;
_41a.jsfunction=_417;
$MP.bindInfoMap[_414.id]=_41a;
var _41b=-1;
var _41c=0;
var _41d=_415;
do{
var _41e;
_41b=_415.indexOf(",",_41c);
if(_41b!=-1){
_41e=_415.substring(_41c,_41b);
_41c=_41b+1;
_41d=_415.substring(_41b+1);
}else{
_41e=_41d;
}
var _41f=_41e;
var _420;
if(_41e.indexOf("@")!=-1){
_41f=_41e.substring(0,_41e.indexOf("@"));
_420=_41e.substring(_41e.indexOf("@")+1);
}else{
_41f=_41e;
_420="onClick";
}
var _421=document.getElementById(_41f);
if(_421==null){
continue;
}
handleTitle(_414.id,_414.src);
var _422=getVideoTitle(_414.src);
if(_420==null||_420.toLowerCase()=="onclick"){
bindFancyBox(false,true,_41f,_420,_414,type,_417,_419,_422);
}else{
var _423=document.getElementById(_41f);
_420=_420.substring(2);
$("#"+_41f).live(_420.toLowerCase(),function(e){
bindFancyBox(true,true,_41f,_420,_414,type,_417,_419,_422);
});
}
}while(_41b!=-1);
var _425=document.getElementById(_414.id+"_"+"mediacontainer");
_425.parentNode.removeChild(_425);
}
function bindFancyBox(fire,_427,_428,_429,_42a,type,_42c,_42d,_42e){
var _42f=document.getElementById(_42a.id+"_"+"videoTitle");
if(_42f==null){
_42e="";
}else{
if(_42e==null||_42e==""){
_42e="video";
}
}
if(fire){
$("#"+_428).fancybox({content:_42d,overlayShow:true,overlayOpacity:0.7,width:_42a.width+$MP.fancyBoxLeftBorderOffset,height:_42a.height+$MP.fancyBoxBottonBorderOffset,title:_42e,autoDimensions:false,onComplete:function(){
var _430=$.extend(true,{},$MP.bindInfoMap[_42a.id].player_options);
if(_427&&_42c.onBind!=null){
_42c.onBind(_428,_429);
}
var _431=$MP.bindInfoMap[_42a.id].player_options;
playerInitialization(_431,type,_42c);
handleBindEvents(_431,$MP.bindInfoMap[_42a.id]);
$MP.bindInfoMap[_42a.id].player_options=$.extend(true,{},_430);
}}).trigger("click");
}else{
$("#"+_428).fancybox({content:_42d,overlayShow:true,overlayOpacity:0.7,width:_42a.width+$MP.fancyBoxLeftBorderOffset,height:_42a.height+$MP.fancyBoxBottonBorderOffset,title:_42e,autoDimensions:false,onComplete:function(){
var _432=$.extend(true,{},$MP.bindInfoMap[_42a.id].player_options);
if(_427&&_42c.onBind!=null){
_42c.onBind(_428,_429);
}
var _433=$MP.bindInfoMap[_42a.id].player_options;
playerInitialization(_433,type,_42c);
handleBindEvents(_433,$MP.bindInfoMap[_42a.id]);
$MP.bindInfoMap[_42a.id].player_options=$.extend(true,{},_432);
}});
}
}
function handleBindEvents(_434,_435){
var _436=$MP.getPlayer(_434.id);
if(_435.mute!=null){
_436.muted=mute;
}
if(_435.volume!=null){
handleChangeVolume(_434.id,_435.volume);
}
if(_435.startPlay!=null){
_436.start();
}
if(_435.stopPlay!=null){
_436.pause();
}
}
function updateVideoType(_437){
var _438=_437.childNodes;
if(_438==null){
return;
}
var _439=_437.getElementsByTagName("source");
if(_439==null||_439.length===0){
return;
}
var _43a=_439[0].getAttribute("src");
if(_43a==null){
return;
}
var type=_439[0].getAttribute("type");
if(type!=null){
return;
}
if(_43a.lastIndexOf(".")==-1){
return;
}
var _43c=_43a.substring(_43a.lastIndexOf(".")+1);
_43c=_43c.toLowerCase();
if(_43c=="mp4"){
_439[0].setAttribute("type","video/mp4");
}else{
if(_43c=="ogv"){
_439[0].setAttribute("type","video/ogg");
}else{
if(_43c=="webm"){
_439[0].setAttribute("type","video/webm");
}
}
}
}
$MP.handleUserDefinedHTML5Element=function(_43d,_43e){
var _43f=document.getElementById(_43e);
var _440=_43f.childNodes;
var _441=false;
updateVideoType(_43d);
if(_440!=null){
var _442=null;
for(var k=0;k<_440.length;k++){
var _444=_440[k];
if(_444.tagName!=null&&_444.tagName.toLowerCase()=="video"){
_442=_444;
break;
}
}
if(_442==null){
return;
}
_440=_442.childNodes;
var _445=null;
var _446;
for(var i=0;i<_440.length;i++){
var _444=_440[i];
if(_444.tagName!=null&&_444.tagName.toLowerCase()=="track"){
_43d.appendChild(_444);
}else{
if(_444.tagName!=null&&_444.tagName.toLowerCase()=="source"){
if(!_441){
var _448=_43d.getAttribute("src");
if(_448==null){
var _449=_43d.childNodes;
if(_449!=null){
for(var l=0;l<_449.length;l++){
if(_449[l].tagName.toLowerCase()=="source"){
var src=_449[l].getAttribute("src");
if(src!=null&&src.trim()!=0&&isHTMLFileFormatSupported(src)){
_445=src;
break;
}
}
}
}
}
if(_448!=null&&_448!=""&&_448.lastIndexOf(".")!=-1){
var _44c=document.createElement("source");
_44c.setAttribute("src",_448);
var _44d=_448.substring(_448.lastIndexOf(".")+1);
if(_44d=="mp4"){
_44c.setAttribute("type","video/mp4");
}else{
if(_44d=="ogv"){
_44c.setAttribute("type","video/ogg");
}else{
if(_44d=="webm"){
_44c.setAttribute("type","video/webm");
}
}
}
_43d.appendChild(_44c);
}
if(_445==null&&isHTMLFileFormatSupported(_448)){
_445=_448;
}
_43d.removeAttribute("src");
}
var src=_444.getAttribute("src");
src=resolveSource(src);
_444.setAttribute("src",src);
_43d.appendChild(_444);
_441=true;
_446=_444;
if(_445==null&&isHTMLFileFormatSupported(src)){
_445=src;
}
}
}
}
if(_445!=null){
handleTitle(_43d.id,_445);
}
if(_446!=null){
_446.setAttribute("onerror","onError(event)");
}
}
_43d.load();
};
$MP.handleUserDefinedFlashParams=function(_44e,type){
var _450=document.getElementById(_44e.id+"_extendData");
if(_450==null||_450.childNodes==null||!isFlashSupported()){
return;
}
var _451=_450.childNodes;
var _452=false;
if(_451!=null){
var _453=null;
for(var k=0;k<_451.length;k++){
var _455=_451[k];
if(_455.tagName!=null&&(_455.tagName.toLowerCase()=="object"||_455.tagName.toLowerCase()=="video")){
_453=_455;
var _456=_453.childNodes;
for(var i=0;i<_456.length;i++){
var _455=_456[i];
if(_455.tagName!=null&&_455.tagName.toLowerCase()=="param"){
_452=true;
var _458=_455.getAttribute("name");
if(_458=="flashvars"){
var _459=_455.getAttribute("value");
var _45a=0;
var _45b=_459;
do{
var _45c=_45b.indexOf("&");
var _45d;
if(_45c>0){
_45d=_45b.substring(_45a,_45c);
}else{
_45d=_45b;
}
if(_45d.indexOf("=")>0){
var _45e=_45d.substring(0,_45d.indexOf("="));
var _45f=_45d.substring(_45d.indexOf("=")+1);
if(_45e!=""||_45f!=""){
_44e[_45e]=resolveSource(_45f);
}
}
_45a=_45c+1;
_45b=_45b.substring(_45a);
}while(_45c>0);
}
}
}
}
}
return _452;
}
};
function isFlashSupported(){
return swfobject.hasFlashPlayerVersion("1");
}
function isFlashFileFormatSupported(_460){
if(_460.indexOf("rtmp")==0){
return true;
}
var _461=["flv","f4v","f4m","m3u","mp4","swf","mpeg-4","m4v","f4f","3gpp","mp3","3gpp2","pbg","gif","jpg","jpeg","aac","speex","nellymoser","QuickTime"];
var _462=_460.lastIndexOf(".");
var _463=_460.substring(_462+1,_460.length);
_463=_463.toLowerCase();
for(var i=0;i<_461.length;i++){
if(_461[i]==_463){
return true;
}
}
return false;
}
function isHTMLFileFormatSupported(_465){
if(_465==null){
return false;
}
var _466=["webm","mp4","ogv"];
var _467=_465.lastIndexOf(".");
var _468=_465.substring(_467+1,_465.length);
_468=_468.toLowerCase();
var elem=document.createElement("video");
var ogg=elem.canPlayType("video/ogg; codecs=\"theora\"");
var h264="video/mp4; codecs=\"avc1.42E01E";
var mp4=elem.canPlayType(h264+"\"")||elem.canPlayType(h264+", mp4a.40.2\"");
var webm=elem.canPlayType("video/webm; codecs=\"vp8, vorbis\"");
for(var i=0;i<_466.length;i++){
if(_466[i]==_468){
if(_468=="ogv"){
return ogg;
}else{
if(_468=="webm"){
return webm;
}else{
if(_468=="mp4"){
return mp4;
}
}
}
}
}
return false;
}
function getWrapper(name){
var _470=$MP.playerWrapperMap[name];
if(_470==null||typeof (_470)=="undefined"){
return $MP.playerWrapperMap[name+"_strobemediaplayback-video"];
}
return _470;
}
function getFuncMap(name){
var _472=$MP.jsFunctionMap[name];
if(_472==null||typeof (_472)=="undefined"){
return $MP.jsFunctionMap[name+"_strobemediaplayback-video"];
}
return _472;
}
ColdFusion.MediaPlayer.setMute=function(name,mute){
if($MP.bindInfoMap[name]!=null){
var _475=getBindInfo(name);
if(_475==null){
return;
}
_475.mute=mute;
return;
}
var _476=$MP.getPlayer(name);
var _477=$MP.getType(name);
var _478=getWrapper(name);
if(_477=="html"){
_476.muted=mute;
if(mute){
_478.volumeHigh.css("background-position","0px -72px");
_478.volumeSlider.slider("value",0);
}else{
handleChangeVolume(name,_476.volume);
}
}else{
if(_477=="flash"){
_476.setMuted(mute);
}
}
};
function resolveSource(src){
if(src==null){
return null;
}
if(src.charAt(0)!="/"&&src.indexOf("://")<0){
var _47a="";
var _47b=document.location.href;
if(_47b||_47b.indexOf("/")>-1){
_47a=_47b.substring(0,_47b.lastIndexOf("/")+1);
}
var _47c=_47a+src;
var _47d=_47c.split("/");
var _47e=new Array();
var _47f=0;
for(var i=0;i<_47d.length;i++){
if(_47d[i]==".."){
_47e[--_47f]="";
}else{
_47e[_47f++]=_47d[i];
}
}
src=_47e[0];
for(var i=1;i<_47f;i++){
src=src+"/"+_47e[i];
}
}
if(src.indexOf("/")==0){
src=$MP.baseURI+src;
}
return src;
}
ColdFusion.MediaPlayer.getPlayer=function(name){
var _482=$MP.playerMap[name];
if(_482==null||typeof (_482)=="undefined"){
_482=$MP.playerMap[name+"_strobemediaplayback-video"];
if(_482==null||typeof (_482)=="undefined"){
ColdFusion.handleError(null,"mediaplayer.getplayer.notfound","widget",[name],null,null,true);
}
}
return _482;
};
ColdFusion.MediaPlayer.setTitle=function(name,_484){
if(_484==null){
ColdFusion.handleError(null,"mediaplayer.settitle.invalidtitle","widget",[name],null,null,true);
}
var _485=$MP.titleDataMap[name];
if(_485==null){
_485={};
$MP.titleDataMap[name]=_485;
}
var _486=document.getElementById(name+"_videoTitle");
if(_486==null){
var _487="<div id=\""+name+"_videoTitle\">";
$("#"+name+"_videoContainer").prepend(_487);
}
_485.hideTitle=false;
_485.title=_484;
handleTitle(name,_484,_485);
};
ColdFusion.MediaPlayer.setSource=function(name,src){
if(src==null||src=="undefined"){
ColdFusion.handleError(null,"mediaplayer.setsource.invalidsource","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _48a=getBindInfo(name);
if(_48a==null){
return;
}
_48a.player_options.src=resolveSource(src);
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_48a.player_options.favorFlashOverHtml5Video=true;
}else{
_48a.player_options.favorFlashOverHtml5Video=false;
}
_48a.videoTitle=getVideoTitle(src);
return;
}
var _48b=$MP.getPlayer(name);
var _48c=$MP.getType(name);
src=resolveSource(src);
var _48d=getWrapper(name);
var _48e,jsFunctionMap;
if(_48d!=null&&_48d.errorwindow!=null){
_48d.errorwindow.html("");
_48d.errorwindow.hide();
_48e=$MP.playerOptionsMap[_48d.options.id];
}else{
_48e=$MP.playerOptionsMap[name+"_"+"strobemediaplayback-video"];
jsFunctionMap=$MP.jsFunctionMap[name+"_"+"strobemediaplayback-video"];
}
if(_48e==null){
_48e=$MP.defaultOptions;
}
var _48f={"tablet":{"name":_48e.id+"_"+"strobemediaplayback-video"},"smartphone":{"startSize":{"width":360,"height":200},"name":_48e.id+"_"+"strobemediaplayback-video"},"default":{"startSize":{"width":+_48e.width,"height":+_48e.height},"name":_48e.id+"_"+"strobemediaplayback-video"}};
if(_48c=="html"){
if(isHTMLFileFormatSupported(src)){
_48b.src=src;
_48b.load();
_48b.pause();
_48d.playOverlay.fadeIn(600);
_48d.playtoggle.removeClass("paused");
_48d.slider.css({"left":"0%"});
_48d.playedbar.css({"width":"0%"});
_48d.currenttime.html("0:00");
_48d.duration.html("0:00");
var css={"left":"0%","width":"0%"};
_48d.bufferbar.removeClass("done");
_48d.bufferbar.css(css);
var _491=$MP.titleDataMap[_48e.id];
handleTitle(name,src,_491);
}else{
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_48e.isHTML5=false;
_48e.favorFlashOverHtml5Video=true;
_48e.src=src;
var _491=$MP.titleDataMap[_48e.id];
if(_491.hideTitle!=null&&!_491.hideTitle){
_48e.wmode="opaque";
}
strobeMediaPlayback.draw(_48e.id+"_"+"strobemediaplayback-video",_48f,_48e);
var _492=$("#"+_48e.id+"_"+"strobemediaplayback-video");
var _493=_492.find("video");
var _494=_493.get(0);
var _495=$("#"+_48e.id+"_"+"strobemediaplayback-video  .html5player").strobemediaplaybackhtml5(_48e,_48d.jsCallbackFunctions);
$MP.playerMap[_48e.id]=_494;
$MP.playerWrapperMap[_48e.id]=_495;
handleTitle(_48e.id,_48e.src,_491);
}
}
}else{
if(_48c=="flash"){
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_48b.setMediaResourceURL(src);
handleTitle(name,src,$MP.titleDataMap[id]);
}else{
if(isHTMLFileFormatSupported(src)){
var id=_48e.id+"_strobemediaplayback-video";
$("#"+id).replaceWith("<div  id=\""+id+"\"></div>");
$("#"+id).css("visibility","visible");
_48e.isHTML5=true;
_48e.favorFlashOverHtml5Video=false;
_48e.src=src;
strobeMediaPlayback.draw(id,_48f,_48e);
var _492=$("#"+id);
var _493=_492.find("video");
var _494=_493.get(0);
if(_494==null){
return;
}
var _497=getFuncMap(id);
var _495=$("#"+id+"  .html5player").strobemediaplaybackhtml5(_48e,_497);
$MP.playerMap[_48e.id]=_494;
$MP.playerWrapperMap[_48e.id]=_495;
handlePlayoverlay(_48e.id,_48e.width,_48e.height);
handleErrorElement(_48e.id,_48e.width,_48e.height);
_495.playOverlay.css("display","block");
handleTitle(_48e.id,_48e.src,$MP.titleDataMap[id]);
_494.load();
if(_48e.autoPlay==false){
_494.pause();
}
}
}
}
}
};
function getBindInfo(name){
var _499=$MP.bindInfoMap[name];
if(_499!=null){
return _499;
}
return;
}
function handleBindElements(_49a){
if(_49a!=null){
if(_49a.bindEvent==null||_49a.bindEvent.toLowerCase()=="onclick"){
bindFancyBox(false,false,_49a.bindElement,_49a.player_options,_49a.type,_49a.jsFuncc,_49a.videoContent,_49a.videoTitle);
}else{
var _49b=document.getElementById(_49a.bindElement);
var _49c=_49a.bindEvent.substring(2);
$("#"+_49a.bindElement).live(_49c.toLowerCase(),function(e){
bindFancyBox(true,false,_49a.bindElement,_49a.player_options,_49a.type,_49a.jsFuncc,_49a.videoContent,_49a.videoTitle);
});
}
}
}
function handleChangeVolume(name,_49f){
var _4a0=$MP.getPlayer(name);
var _4a1=$MP.getType(name);
if(_4a1=="html"){
if(_4a0.muted){
_4a0.muted=false;
}
_4a0.volume=_49f;
var _4a2=getWrapper(name);
var _4a3=_4a2.volumeSlider;
_4a3.slider("value",_49f*100);
handleVolumeChangeUI(name,_49f);
}else{
if(_4a1=="flash"){
_4a0.setVolume(_49f);
}
}
}
ColdFusion.MediaPlayer.setVolume=function(name,_4a5){
if(_4a5<=0){
ColdFusion.handleError(null,"mediaplayer.setvolume.invalidvalue","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _4a6=getBindInfo(name);
if(_4a6==null){
return;
}
_4a6.volume=_4a5;
return;
}
handleChangeVolume(name,_4a5);
};
ColdFusion.MediaPlayer.resize=function(name,_4a8,_4a9){
if(_4a8<=0||_4a9<=0){
ColdFusion.handleError(null,"mediaplayer.resize.invalidvalue","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _4aa=getBindInfo(name);
if(_4aa==null){
return;
}
_4aa.player_options.width=_4a8;
_4aa.player_options.height=_4a9;
return;
}
var _4ab=false;
var _4ac=$MP.getPlayer(name);
var _4ad=$MP.getType(name);
var _4ae=getWrapper(name);
_4ac.width=_4a8;
_4ac.height=_4a9;
if(_4ae!=null){
_4ae.options.width=_4a8;
_4ae.options.height=_4a9;
_4ae.controlbar.css("width",_4a8-1.5);
if(_4ae.options.width>180){
_4ae.progressbar.css("width",_4a8-180);
_4ae.trackswidth=_4a8-180;
}else{
_4ae.progressbar.css("width","50%");
_4ae.trackswidth="50%";
}
handlePlayoverlay(name,_4a8,_4a9);
handleErrorElement(name,_4a8,_4a9);
}
$("#"+name+"_"+"videoContainer").css("width",_4a8);
$("#"+name+"_"+"videoContainer").css("height",_4a9);
if(_4ac.paused==false){
_4ae.playOverlay.hide();
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
var _4b3=getBindInfo(name);
if(_4b3==null){
return;
}
_4b3.startPlay=true;
return;
}
var _4b4=$MP.getPlayer(name);
var _4b5=$MP.getType(name);
if(_4b5=="html"){
_4b4.play();
}else{
if(_4b5=="flash"){
_4b4.play2();
}
}
};
ColdFusion.MediaPlayer.stopPlay=function(name){
if($MP.bindInfoMap[name]!=null){
var _4b7=getBindInfo(name);
if(_4b7==null){
return;
}
_4b7.stopPlay=true;
return;
}
var _4b8=$MP.getPlayer(name);
_4b8.pause();
};
ColdFusion.MediaPlayer.logError=function(name,_4ba){
if(name==null||_4ba==null){
return;
}
var _4bb=$MP.playerWrapperMap[name];
if(_4bb==null){
_4bb=$MP.playerWrapperMap[name+"_strobemediaplayback-video"];
if(_4bb==null){
return;
}
}
_4bb.errorwindow.html(_4ba);
_4bb.errorwindow.show();
_4bb.playOverlay.hide();
};
function handlePlayoverlay(name,_4bd,_4be){
if(!isDesktop){
return;
}
var _4bf=getWrapper(name);
_4bf.playOverlay.css("left","");
_4bf.playOverlay.css("top","");
_4bf.playOverlay.css("left",(_4bd-116)/2+"px");
_4bf.playOverlay.css("top",(_4be-107)/2+"px");
}
function handleErrorElement(name,_4c1,_4c2){
var _4c3=getWrapper(name);
_4c3.playOverlay.css("display","none");
_4c3.errorwindow.css("left","");
_4c3.errorwindow.css("top","");
_4c3.errorwindow.css("display","none");
var _4c4=_4c3.controlbar;
var _4c5=0;
if(_4c4!=null){
_4c5=_4c4.css("height");
if(_4c5!=null&&_4c5.indexOf("px")!=-1){
_4c5=_4c5.substring(0,_4c5.indexOf("px"));
}else{
_4c5=0;
}
}
_4c3.errorwindow.css("margin-top",_4c2/2-_4c5+"px");
}
function handleTitleResize(id,_4c7,_4c8){
$("#"+id+"_videoTitle").css("width","");
$("#"+id+"_videoTitle").css("width",_4c7+"px");
}
function handleTitle(_4c9,_4ca,_4cb){
var _4cc=document.getElementById(_4c9+"_"+"videoTitle");
if(_4cc==null){
_4c9=_4c9.substring(0,_4c9.indexOf("_strobemediaplayback-video"));
_4cc=document.getElementById(_4c9+"_"+"videoTitle");
}
var _4cd=document.getElementById("fancybox-title-float-main");
if(_4cc!=null){
if(_4cb==null){
_4cb=$MP.titleDataMap[_4c9];
if(_4cb==null||_4cb.hideTitle){
var _4ce=_4cc.parentNode;
_4ce.removeChild(_4cc);
return;
}
}else{
if(_4cb.hideTitle){
var _4ce=_4cc.parentNode;
_4ce.removeChild(_4cc);
return;
}
}
var _4cf=_4cb.title;
if(_4cb==null||_4cb.title==null||_4cb.title.trim()==""){
_4cf=getVideoTitle(_4ca);
}
if(_4cf!=""){
_4cc.innerHTML=_4cf;
}else{
return;
}
$("#"+_4c9+"_"+"videoTitle").css("position","absolute");
$("#"+_4c9+"_"+"videoTitle").css("z-index",2);
if(_4cb==null||_4cb.title_text_color==null){
$("#"+_4c9+"_"+"videoTitle").css("color","white");
}else{
$("#"+_4c9+"_"+"videoTitle").css("color",_4cb.title_text_color);
}
if(_4cb!=null&&_4cb.title_bgcolor!=null){
$("#"+_4c9+"_"+"videoTitle").css("background-color",_4cb.title_bgcolor);
}
$("#"+_4c9+"_"+"videoTitle").css("font-weight","bold");
$("#"+_4c9+"_"+"videoTitle").css("font-family","Arial,Helvetica,sans-serif");
$("#"+_4c9+"_"+"videoTitle").css("font-size","13px");
$("#"+_4c9+"_"+"videoTitle").css("word-wrap","break-word");
if(_4cc.style.backgroundColor==null||_4cc.style.backgroundColor==""){
$("#"+_4c9+"_"+"videoTitle").css("margin-left","5px");
}
$("#"+_4c9+"_"+"videoTitle").show();
$("#"+_4c9+"_"+"strobemediaplayback").css("z-index",1);
}else{
if(_4cd!=null&&_4ca!=null){
$("#fancybox-title-float-main").text(_4ca);
}
}
}
function getVideoTitle(_4d0){
var _4d1=null;
if(_4d0!=null&&_4d0!=""){
var _4d2=_4d0.lastIndexOf("/");
if(_4d2==-1){
_4d2=_4d0.lastIndexOf("\\");
}
if(_4d2==-1){
_4d1=_4d0;
}
if(_4d1==null){
_4d1=_4d0.substring(_4d2+1,_4d0.length);
}
}
if(_4d1==null||_4d1.indexOf(".")<0){
return _4d0;
}else{
return _4d1;
}
}
function handlebackgroundColor(_4d3){
if(_4d3.backgroundColor==null){
return;
}
var _4d4=document.getElementById(_4d3.id);
if(_4d4==null){
return;
}
_4d4.setAttribute("style","background-color:"+_4d3.backgroundColor+";");
}
function handleBorderStyle(_4d5,_4d6){
if(_4d6.hideBorder){
return;
}
var _4d7="#fff";
if(_4d6.bgColor){
_4d7=_4d6.bgColor;
}
var _4d8=document.getElementById(_4d5+"_"+"videoContainer");
if(_4d8==null){
_4d5=_4d5.substring(0,_4d5.indexOf("_"));
}
if(_4d6.border_left!=null){
$("#"+_4d5+"_"+"videoContainer").css("border-left",_4d6.border_left+"px"+" solid "+_4d7);
}
if(_4d6.border_right!=null){
$("#"+_4d5+"_"+"videoContainer").css("border-right",_4d6.border_right+"px"+" solid "+_4d7);
}
if(_4d6.border_top!=null){
$("#"+_4d5+"_"+"videoContainer").css("border-top",_4d6.border_top+"px"+" solid "+_4d7);
}
if(_4d6.border_bottom!=null){
$("#"+_4d5+"_"+"videoContainer").css("border-bottom",_4d6.border_bottom+"px"+" solid "+_4d7);
}
}
function handleControlsStyle(_4d9,_4da){
var _4db=getWrapper(_4d9);
if(_4da.controlbar_bgcolor!=null){
_4db.controlbar.css("background-color",_4da.controlbar_bgcolor);
}
if(_4da.controls_color!=null){
_4db.playtoggle.css("background-color",_4da.controls_color);
_4db.slider.css("background-color",_4da.controls_color);
_4db.fullview.css("background-color",_4da.controls_color);
_4db.currenttime.css("color",_4da.controls_color);
_4db.duration.css("color",_4da.controls_color);
_4db.seekbar.css("background-color",_4da.controls_color);
_4db.volumeHigh.css("background-color",_4da.controls_color);
}
if(_4da.progress_bgcolor!=null){
_4db.bufferbar.css("background-color",_4da.progress_bgcolor);
}
if(_4da.progress_color!=null){
_4db.playedbar.css("background-color",_4da.progress_color);
}
}
function triggerHandler(id,_4dd,_4de){
if(_4dd=="onJavaScriptBridgeCreated"){
return;
}else{
if(_4dd=="play"){
var _4df=getFuncMap(id);
var _4e0=$MP.videoMonitorMap[id];
if(_4df.onStartCallback!=null&&_4e0.paused){
_4df.onStartCallback(id);
_4e0.paused=false;
}
hideTitle(id);
}else{
if(_4dd=="pause"){
var _4df=getFuncMap(id);
var _4e0=$MP.videoMonitorMap[id];
if(_4df.onPauseCallback!=null&&!_4e0.paused){
_4df.onPauseCallback(id);
_4e0.paused=true;
}
showTitle(id);
}else{
if(_4dd=="complete"){
var _4df=getFuncMap(id);
if(_4df.onComplete!=null){
_4df.onComplete();
}
var _4e0=$MP.videoMonitorMap[id];
_4e0.paused=true;
showTitle(id);
}else{
if(_4dd=="loadedmetadata"){
var _4df=getFuncMap(id);
if(_4df.onLoad!=null){
_4df.onLoad();
}
}else{
if(_4dd=="error"){
var _4df=getFuncMap(id);
if(_4df.onError!=null){
_4df.onError();
}
}else{
if(_4dd=="volumechange"){
var _4e0=$MP.videoMonitorMap[id];
_4e0.muted=_4de.muted;
}
}
}
}
}
}
}
}
function onError(_4e1){
var _4e2;
var _4e3;
var _4e4;
var _4e5;
if(_4e1.target!=null&&_4e1.target.tagName.toLowerCase()=="video"){
_4e4=getFuncMap(_4e1.target.id);
if(_4e1.target.error!=null){
_4e3=_4e1.target.error.code;
}
_4e5=getWrapper(_4e1.target.id);
}else{
if(_4e1.target!=null&&_4e1.target.tagName.toLowerCase()=="source"){
var _4e6=_4e1.target.getAttribute("src");
var _4e7=_4e1.target.getAttribute("onerror");
if(_4e6!=null&&_4e7!=null){
_4e3=4;
}else{
return;
}
}
var _4e8=_4e1.target.parentNode;
_4e4=getFuncMap(_4e8.id);
_4e5=getWrapper(_4e8.id);
}
if(_4e3==null){
return;
}
if(_4e4.onError!=null){
_4e4.onError(_4e3);
return;
}
switch(_4e3){
case 1:
_4e2="You aborted the video playback.";
break;
case 2:
_4e2="A network error caused the video download to fail part-way.";
break;
case 3:
_4e2="The video playback was aborted due to a corruption problem or because the video used features your browser did not support.";
break;
case 4:
_4e2="The video could not be loaded, either because the server or network failed or because the format is not supported.";
break;
default:
_4e2="An unknown error occurred.";
break;
}
_4e5.playOverlay.css("display","none");
_4e5.errorwindow.html(_4e2);
_4e5.errorwindow.show();
}
function onFlashEmbedComplete(_4e9){
var _4ea=$("#"+_4e9.id);
var _4eb=_4ea.get(0);
$MP.playerMap[_4e9.id]=_4eb;
}
function removejscssfile(_4ec,_4ed){
var _4ee=(_4ed=="js")?"script":(_4ed=="css")?"link":"none";
var _4ef=(_4ed=="js")?"src":(_4ed=="css")?"href":"none";
var _4f0=document.getElementsByTagName(_4ee);
for(var i=_4f0.length;i>=0;i--){
if(_4f0[i]&&_4f0[i].getAttribute(_4ef)!=null&&_4f0[i].getAttribute(_4ef).indexOf(_4ec)!=-1){
_4f0[i].parentNode.removeChild(_4f0[i]);
}
}
}
