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
ColdFusion.MediaPlayer.init=function(_7e0){
var _7e1=$MP.defaultOptions;
_7e1.id=_7e0.id;
var _7e2={};
var _7e3={};
var _7e4={};
var _7e5=null;
var _7e6={onStart:null,onComplete:null,onPause:null,onError:null,onLoad:null,onStartCallback:playbackStart,onPauseCallback:playbackPause};
if(_7e0.width!=null&&typeof (_7e0.width)!="undefined"){
_7e1.width=_7e0.width;
}else{
_7e1.width=480;
}
if(_7e0.height!=null&&typeof (_7e0.height)!="undefined"){
_7e1.height=_7e0.height;
}else{
_7e1.height=275;
}
if(_7e0.baseURI!=null){
$MP.baseURI=_7e0.baseURI;
}
if(_7e0.src!=null&&_7e0.src!=""){
_7e1.src=resolveSource(_7e0.src);
}else{
_7e1.src="";
}
if(_7e0.PosterImage!=null&&_7e0.PosterImage!=""){
_7e1.poster=resolveSource(_7e0.PosterImage);
}else{
_7e1.poster="";
}
if(_7e0.javascriptControls==null){
_7e1.javascriptControls=true;
}
if(_7e0.playButtonOverlay==null){
_7e1.playButtonOverlay=true;
}
if(_7e0.repeat!=null){
if(_7e0.repeat=="true"){
_7e1.loop=true;
}else{
_7e1.loop=false;
}
}else{
_7e1.loop=false;
}
if(_7e0.autoPlay!=null){
if(_7e0.autoPlay=="true"){
_7e1.autoPlay=true;
}else{
_7e1.autoPlay=false;
}
}else{
_7e1.autoPlay=false;
}
if(_7e0.bgcolor!=null){
_7e1.backgroundColor=_7e0.bgcolor;
_7e3.bgColor=_7e0.bgcolor;
}
if(_7e0.controlbar!=null){
if(_7e0.controlbar==false){
_7e1.controlBarMode="none";
}else{
_7e1.controlBarMode="docked";
}
}
if(_7e0.skin!=null){
_7e1.skin=resolveSource(_7e0.skin);
}else{
_7e1.skin="";
}
if(_7e0.onComplete!=null){
_7e6.onComplete=_7e0.onComplete;
}
if(_7e0.onLoad!=null){
_7e6.onLoad=_7e0.onLoad;
}
if(_7e0.onStart!=null){
_7e6.onStart=_7e0.onStart;
}
if(_7e0.onPause!=null){
_7e6.onPause=_7e0.onPause;
}
if(_7e0.onError!=null){
_7e6.onError=_7e0.onError;
}
if(_7e0.onBind!=null){
_7e6.onBind=_7e0.onBind;
}
if(_7e0.hideTitle!=null){
_7e2.hideTitle=_7e0.hideTitle;
}
if(_7e0.title!=null){
_7e2.title=_7e0.title;
}
if(_7e0.title_text_color!=null){
_7e2.title_text_color=_7e0.title_text_color;
}
if(_7e0.title_bgcolor!=null){
_7e2.title_bgcolor=_7e0.title_bgcolor;
}
if(_7e0.border_left!=null){
_7e3.border_left=_7e0.border_left;
}
if(_7e0.border_right!=null){
_7e3.border_right=_7e0.border_right;
}
if(_7e0.border_top!=null){
_7e3.border_top=_7e0.border_top;
}
if(_7e0.border_bottom!=null){
_7e3.border_bottom=_7e0.border_bottom;
}
if(_7e0.progress_color!=null){
_7e4.progress_color=_7e0.progress_color;
}
if(_7e0.progress_bgcolor!=null){
_7e4.progress_bgcolor=_7e0.progress_bgcolor;
}
if(_7e0.controls_color!=null){
_7e4.controls_color=_7e0.controls_color;
}
if(_7e0.controlbar_bgcolor!=null){
_7e4.controlbar_bgcolor=_7e0.controlbar_bgcolor;
}
if(!_7e1.javascriptControls){
$(".strobeMediaPlaybackControlBar,.smp-error,.playoverlay").show();
}
if(_7e0.bindData!=null&&_7e0.bindData!="undefined"){
_7e5=$.extend(true,{},_7e1);
handleBindingMediaPlayer(_7e5,_7e0.bindData,_7e0.type,_7e6);
return;
}
handleWmode(_7e0,_7e1);
playerInitialization(_7e1,_7e0.type,_7e6,_7e2,_7e3,_7e4);
};
function handleWmode(_7e7,_7e8){
if(navigator.platform.indexOf("Linux")!=-1){
_7e8.wmode="direct";
return;
}
if(_7e7.wmode!=null){
_7e8.wmode=_7e7.wmode;
}else{
_7e8.wmode="direct";
}
var _7e9=document.getElementById(_7e8.id+"_"+"videoTitle");
if((_7e9!==null&&(_7e7.hideTitle==null||_7e7.hideTitle==false))||(_7e8.backgroundColor!=null&&_7e8.backgroundColor.trim()!="")){
_7e8.wmode="transparent";
}
}
function isValidSourceElementExist(_7ea,type){
if(_7ea.src!=null&&_7ea.src!=""){
if(type=="html"&&$MP.hasHTML5VideoPlaybackSupport&&isHTMLFileFormatSupported(_7ea.src)){
return true;
}else{
if(type=="flash"&&isFlashSupported()&&isFlashFileFormatSupported(_7ea.src)){
return true;
}
}
}
var _7ec=document.getElementById(_7ea.id+"_extendData");
if(_7ec==null||_7ec.childNodes==null||!isFlashSupported()){
return false;
}
var _7ed=_7ec.getElementsByTagName("source");
for(var k=0;k<_7ed.length;k++){
var src=_7ed[k].getAttribute("src");
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
var _7f1=document.getElementById(id+"_"+"videoTitle");
if(_7f1==null){
id=id.substring(0,id.indexOf("_strobemediaplayback-video"));
_7f1=document.getElementById(id+"_"+"videoTitle");
}
if(_7f1!=null){
$("#"+id+"_"+"videoTitle").fadeOut(600,null);
}
}
function playbackStart(id){
var _7f3=getFuncMap(id);
if(_7f3.onStart!=null){
_7f3.onStart();
}
var _7f4=getWrapper(id);
if(_7f4!=null){
_7f4.playOverlay.fadeOut(600);
}
hideTitle(id);
}
function showTitle(id){
var _7f6=document.getElementById(id+"_"+"videoTitle");
if(_7f6==null){
id=id.substring(0,id.indexOf("_strobemediaplayback-video"));
_7f6=document.getElementById(id+"_"+"videoTitle");
}
if(_7f6!=null){
$("#"+id+"_"+"videoTitle").fadeIn(1,null);
}
}
function playbackPause(id){
var _7f8=getFuncMap(id);
if(_7f8.onPause!=null){
_7f8.onPause();
}
var _7f9=getWrapper(id);
if(_7f9!=null){
_7f9.playOverlay.fadeIn(600);
}
showTitle(id);
}
function playbackComplete(id){
var _7fb=getFuncMap(id);
if(_7fb.onComplete!=null){
_7fb.onComplete();
}
var _7fc=getWrapper(id);
if(_7fc!=null){
_7fc.playOverlay.fadeIn(600);
_7fc.slider.css("left",0+"px");
_7fc.currenttime.html("0:00");
}
showTitle(id);
}
function updateFlashVideoSource(_7fd){
if(_7fd.src!=null&&_7fd.src!=""){
if(isFlashSupported()&&isFlashFileFormatSupported(_7fd.src)){
return;
}
}
var _7fe=document.getElementById(_7fd.id+"_extendData");
if(_7fe==null||_7fe.childNodes==null||!isFlashSupported()){
return;
}
var _7ff=_7fe.getElementsByTagName("source");
for(var k=0;k<_7ff.length;k++){
var src=_7ff[k].getAttribute("src");
if(isFlashSupported()&&isFlashFileFormatSupported(src)){
_7fd.src=resolveSource(src);
return;
}
}
return;
}
function playerInitialization(_802,type,_804,_805,_806,_807){
var _808=true;
var _809=isValidSourceElementExist(_802,"html");
var _80a=isValidSourceElementExist(_802,"flash");
var _80b=$MP.handleUserDefinedFlashParams(_802,type);
if(_80b){
_802.favorFlashOverHtml5Video=true;
}else{
if(isFlashSupported()){
if(type==null||type=="flash"){
if(_80a){
_802.favorFlashOverHtml5Video=true;
}else{
if(_809){
_802.favorFlashOverHtml5Video=false;
}else{
_808=false;
}
}
}else{
if(_809){
_802.favorFlashOverHtml5Video=false;
}else{
if(_80a){
_802.favorFlashOverHtml5Video=true;
}else{
_808=false;
}
}
}
}else{
if($MP.hasHTML5VideoPlaybackSupport){
_802.favorFlashOverHtml5Video=false;
}else{
_808=false;
}
}
}
if(_802.favorFlashOverHtml5Video){
updateFlashVideoSource(_802);
}
if(!_808){
if($MP.hasHTML5VideoPlaybackSupport){
_802.favorFlashOverHtml5Video=false;
}else{
$(".playoverlay").hide();
ColdFusion.MediaPlayer.logError(_802.id,"The video could not be loaded");
return;
}
}
var _80c={"tablet":{"startSize":{"width":+_802.width,"height":+_802.height},"name":_802.id+"_"+"strobemediaplayback-video"},"smartphone":{"startSize":{"width":+_802.width,"height":+_802.height},"name":_802.id+"_"+"strobemediaplayback-video"},"default":{"startSize":{"width":+_802.width,"height":+_802.height},"name":_802.id+"_"+"strobemediaplayback-video"}};
strobeMediaPlayback.draw(_802.id+"_"+"strobemediaplayback-video",_80c,_802);
var _80d=$("#"+_802.id+"_"+"strobemediaplayback-video");
var _80e=$("#"+_802.id);
var _80f=_80e.get(0);
var _810;
if(_80f==null){
_802.id=_802.id+"_strobemediaplayback-video";
$MP.playerOptionsMap[_802.id]=_802;
$MP.videoMonitorMap[_802.id]={paused:true,muted:false};
}else{
_810=$("#"+_802.id+"_"+"strobemediaplayback-video  .html5player").strobemediaplaybackhtml5(_802,_804);
$MP.playerMap[_802.id]=_80f;
$MP.playerWrapperMap[_802.id]=_810;
$MP.playerOptionsMap[_802.id]=_802;
}
$MP.jsFunctionMap[_802.id]=_804;
$MP.titleDataMap[_802.id]=_805;
if(_80f!=null&&_80f.nodeName!=null&&_80f.nodeName.toLowerCase()=="video"){
handleVolumeSlider(_802.id);
_80f.volume=0.6;
handlePlayoverlay(_802.id,_802.width,_802.height);
handleErrorElement(_802.id,_802.width,_802.height);
var _811=$MP.playerWrapperMap[_802.id];
_811.playOverlay.css("display","block");
_80d.css("width","100%");
_80d.css("height","100%");
handlebackgroundColor(_802);
handleControlsStyle(_802.id,_807);
_810.useHTML5=true;
var _812=document.getElementById(_802.id+"_extendData");
if(_812!=null){
$MP.handleUserDefinedHTML5Element(_80f,_802.id+"_extendData");
}else{
handleTitle(_802.id,_802.src,_805);
var _813=getFuncMap(_802.id);
var _814=document.getElementById(_802.id);
var _815=_814.getElementsByTagName("source");
if(_815!=null&&_815.length!=0){
_815[0].setAttribute("onerror","onError(event)");
}
}
}else{
handleTitle(_802.id,_802.src,_805);
}
handleBorderStyle(_802.id,_806);
if($MP.bindInfoMap[_802.id]==null){
var _816=document.getElementById(_802.id+"_extendData");
if(_816==null){
var id=_802.id.substring(0,_802.id.indexOf("_"));
_816=document.getElementById(id+"_extendData");
}
if(_816!=null&&_816.parentNode!=null){
_816.parentNode.removeChild(_816);
}
}
}
function handleVolumeChangeUI(_818,_819){
var _81a=getWrapper(_818);
if(_819<=0){
_81a.volumeHigh.css("background-position","0px -72px");
}else{
if(_819<=0.3){
_81a.volumeHigh.css("background-position","-24px -72px");
}else{
if(_819<=0.7){
_81a.volumeHigh.css("background-position","-48px -72px");
}else{
_81a.volumeHigh.css("background-position","-72px -72px");
}
}
}
}
function handleVolumeSlider(_81b){
var _81c=getWrapper(_81b);
var _81d=_81c.volumeSlider;
_81d.slider({orientation:"vertical",range:"min",min:0,max:90,value:60,slide:function(_81e,ui){
var _820=ui.value/100;
_81c.currentVolume=_820;
handleChangeVolume(_81b,_820);
}});
_81c.volumeHigh.mouseover(function(){
var _821=getWrapper(_81b);
var _822=_821.volumeSlider;
_822.css("display","block");
_821.volumeContainer.css("display","block");
});
_81c.volumeHigh.mouseout(function(_823){
var _824=getWrapper(_81b);
var _825=_824.volumeSlider;
var _826=_824.volumeContainer;
var _827=_823.relatedTarget;
if(_827.className!="controls"){
_825.css("display","none");
_826.css("display","none");
}
});
_81c.volumeHigh.click(function(_828){
var _829=getWrapper(_81b);
if(_829.currentVolume==null){
_829.currentVolume=0.6;
}
var pos=_81c.volumeHigh.css("background-position");
if(pos.indexOf("0px")!=0){
_81c.volumeHigh.css("background-position","0px -72px");
_81c.volumeSlider.slider("value",0);
handleChangeVolume(_81b,0);
}else{
_81c.volumeSlider.slider("value",_829.currentVolume*100);
if(_829.currentVolume<=0.1){
_81c.volumeHigh.css("background-position","0px -72px");
}else{
if(_829.currentVolume<=0.3){
_81c.volumeHigh.css("background-position","-24px -72px");
}else{
if(_829.currentVolume<=0.7){
_81c.volumeHigh.css("background-position","-48px -72px");
}else{
_81c.volumeHigh.css("background-position","-72px -72px");
}
}
}
handleChangeVolume(_81b,_829.currentVolume);
}
});
_81c.controlbar.mouseout(function(_82b){
if(_82b.relatedTarget==null){
return;
}
var _82c=_82b.relatedTarget.className;
if(_82b.relatedTarget.className!="controls"&&_82c!="volume-container"&&_82c.indexOf("ui-slider")==-1){
var _82d=getWrapper(_81b);
var _82e=_82d.volumeSlider;
var _82f=_82d.volumeContainer;
_82e.css("display","none");
_82f.css("display","none");
}
});
}
function handleBindingMediaPlayer(_830,_831,type,_833){
var _834=document.getElementById(_830.id+"_"+"html5MediaPlayback");
if(_834==null){
return;
}
var _835=_834.innerHTML;
if(_835==null){
return;
}
var _836={};
_836.videoContent=_835;
_836.type=type;
_836.player_options=_830;
_836.jsfunction=_833;
$MP.bindInfoMap[_830.id]=_836;
var _837=-1;
var _838=0;
var _839=_831;
do{
var _83a;
_837=_831.indexOf(",",_838);
if(_837!=-1){
_83a=_831.substring(_838,_837);
_838=_837+1;
_839=_831.substring(_837+1);
}else{
_83a=_839;
}
var _83b=_83a;
var _83c;
if(_83a.indexOf("@")!=-1){
_83b=_83a.substring(0,_83a.indexOf("@"));
_83c=_83a.substring(_83a.indexOf("@")+1);
}else{
_83b=_83a;
_83c="onClick";
}
var _83d=document.getElementById(_83b);
if(_83d==null){
continue;
}
handleTitle(_830.id,_830.src);
var _83e=getVideoTitle(_830.src);
if(_83c==null||_83c.toLowerCase()=="onclick"){
bindFancyBox(false,true,_83b,_83c,_830,type,_833,_835,_83e);
}else{
var _83f=document.getElementById(_83b);
_83c=_83c.substring(2);
$("#"+_83b).live(_83c.toLowerCase(),function(e){
bindFancyBox(true,true,_83b,_83c,_830,type,_833,_835,_83e);
});
}
}while(_837!=-1);
var _841=document.getElementById(_830.id+"_"+"mediacontainer");
_841.parentNode.removeChild(_841);
}
function bindFancyBox(fire,_843,_844,_845,_846,type,_848,_849,_84a){
var _84b=document.getElementById(_846.id+"_"+"videoTitle");
if(_84b==null){
_84a="";
}else{
if(_84a==null||_84a==""){
_84a="video";
}
}
if(fire){
$("#"+_844).fancybox({content:_849,overlayShow:true,overlayOpacity:0.7,width:_846.width+$MP.fancyBoxLeftBorderOffset,height:_846.height+$MP.fancyBoxBottonBorderOffset,title:_84a,autoDimensions:false,onComplete:function(){
var _84c=$.extend(true,{},$MP.bindInfoMap[_846.id].player_options);
if(_843&&_848.onBind!=null){
_848.onBind(_844,_845);
}
var _84d=$MP.bindInfoMap[_846.id].player_options;
playerInitialization(_84d,type,_848);
handleBindEvents(_84d,$MP.bindInfoMap[_846.id]);
$MP.bindInfoMap[_846.id].player_options=$.extend(true,{},_84c);
}}).trigger("click");
}else{
$("#"+_844).fancybox({content:_849,overlayShow:true,overlayOpacity:0.7,width:_846.width+$MP.fancyBoxLeftBorderOffset,height:_846.height+$MP.fancyBoxBottonBorderOffset,title:_84a,autoDimensions:false,onComplete:function(){
var _84e=$.extend(true,{},$MP.bindInfoMap[_846.id].player_options);
if(_843&&_848.onBind!=null){
_848.onBind(_844,_845);
}
var _84f=$MP.bindInfoMap[_846.id].player_options;
playerInitialization(_84f,type,_848);
handleBindEvents(_84f,$MP.bindInfoMap[_846.id]);
$MP.bindInfoMap[_846.id].player_options=$.extend(true,{},_84e);
}});
}
}
function handleBindEvents(_850,_851){
var _852=$MP.getPlayer(_850.id);
if(_851.mute!=null){
_852.muted=mute;
}
if(_851.volume!=null){
handleChangeVolume(_850.id,_851.volume);
}
if(_851.startPlay!=null){
_852.start();
}
if(_851.stopPlay!=null){
_852.pause();
}
}
function updateVideoType(_853){
var _854=_853.childNodes;
if(_854==null){
return;
}
var _855=_853.getElementsByTagName("source");
if(_855==null||_855.length===0){
return;
}
var _856=_855[0].getAttribute("src");
if(_856==null){
return;
}
var type=_855[0].getAttribute("type");
if(type!=null){
return;
}
if(_856.lastIndexOf(".")==-1){
return;
}
var _858=_856.substring(_856.lastIndexOf(".")+1);
_858=_858.toLowerCase();
if(_858=="mp4"){
_855[0].setAttribute("type","video/mp4");
}else{
if(_858=="ogv"){
_855[0].setAttribute("type","video/ogg");
}else{
if(_858=="webm"){
_855[0].setAttribute("type","video/webm");
}
}
}
}
$MP.handleUserDefinedHTML5Element=function(_859,_85a){
var _85b=document.getElementById(_85a);
var _85c=_85b.childNodes;
var _85d=false;
updateVideoType(_859);
if(_85c!=null){
var _85e=null;
for(var k=0;k<_85c.length;k++){
var _860=_85c[k];
if(_860.tagName!=null&&_860.tagName.toLowerCase()=="video"){
_85e=_860;
break;
}
}
if(_85e==null){
return;
}
_85c=_85e.childNodes;
var _861=null;
var _862;
for(var i=0;i<_85c.length;i++){
var _860=_85c[i];
if(_860.tagName!=null&&_860.tagName.toLowerCase()=="track"){
_859.appendChild(_860);
}else{
if(_860.tagName!=null&&_860.tagName.toLowerCase()=="source"){
if(!_85d){
var _864=_859.getAttribute("src");
if(_864==null){
var _865=_859.childNodes;
if(_865!=null){
for(var l=0;l<_865.length;l++){
if(_865[l].tagName.toLowerCase()=="source"){
var src=_865[l].getAttribute("src");
if(src!=null&&src.trim()!=0&&isHTMLFileFormatSupported(src)){
_861=src;
break;
}
}
}
}
}
if(_864!=null&&_864!=""&&_864.lastIndexOf(".")!=-1){
var _868=document.createElement("source");
_868.setAttribute("src",_864);
var _869=_864.substring(_864.lastIndexOf(".")+1);
if(_869=="mp4"){
_868.setAttribute("type","video/mp4");
}else{
if(_869=="ogv"){
_868.setAttribute("type","video/ogg");
}else{
if(_869=="webm"){
_868.setAttribute("type","video/webm");
}
}
}
_859.appendChild(_868);
}
if(_861==null&&isHTMLFileFormatSupported(_864)){
_861=_864;
}
_859.removeAttribute("src");
}
var src=_860.getAttribute("src");
src=resolveSource(src);
_860.setAttribute("src",src);
_859.appendChild(_860);
_85d=true;
_862=_860;
if(_861==null&&isHTMLFileFormatSupported(src)){
_861=src;
}
}
}
}
if(_861!=null){
handleTitle(_859.id,_861);
}
if(_862!=null){
_862.setAttribute("onerror","onError(event)");
}
}
_859.load();
};
$MP.handleUserDefinedFlashParams=function(_86a,type){
var _86c=document.getElementById(_86a.id+"_extendData");
if(_86c==null||_86c.childNodes==null||!isFlashSupported()){
return;
}
var _86d=_86c.childNodes;
var _86e=false;
if(_86d!=null){
var _86f=null;
for(var k=0;k<_86d.length;k++){
var _871=_86d[k];
if(_871.tagName!=null&&(_871.tagName.toLowerCase()=="object"||_871.tagName.toLowerCase()=="video")){
_86f=_871;
var _872=_86f.childNodes;
for(var i=0;i<_872.length;i++){
var _871=_872[i];
if(_871.tagName!=null&&_871.tagName.toLowerCase()=="param"){
_86e=true;
var _874=_871.getAttribute("name");
if(_874=="flashvars"){
var _875=_871.getAttribute("value");
var _876=0;
var _877=_875;
do{
var _878=_877.indexOf("&");
var _879;
if(_878>0){
_879=_877.substring(_876,_878);
}else{
_879=_877;
}
if(_879.indexOf("=")>0){
var _87a=_879.substring(0,_879.indexOf("="));
var _87b=_879.substring(_879.indexOf("=")+1);
if(_87a!=""||_87b!=""){
_86a[_87a]=resolveSource(_87b);
}
}
_876=_878+1;
_877=_877.substring(_876);
}while(_878>0);
}
}
}
}
}
return _86e;
}
};
function isFlashSupported(){
return swfobject.hasFlashPlayerVersion("1");
}
function isFlashFileFormatSupported(_87c){
if(_87c.indexOf("rtmp")==0){
return true;
}
var _87d=["flv","f4v","f4m","m3u","mp4","swf","mpeg-4","m4v","f4f","3gpp","mp3","3gpp2","pbg","gif","jpg","jpeg","aac","speex","nellymoser","QuickTime"];
var _87e=_87c.lastIndexOf(".");
var _87f=_87c.substring(_87e+1,_87c.length);
_87f=_87f.toLowerCase();
for(var i=0;i<_87d.length;i++){
if(_87d[i]==_87f){
return true;
}
}
return false;
}
function isHTMLFileFormatSupported(_881){
if(_881==null){
return false;
}
var _882=["webm","mp4","ogv"];
var _883=_881.lastIndexOf(".");
var _884=_881.substring(_883+1,_881.length);
_884=_884.toLowerCase();
var elem=document.createElement("video");
var ogg=elem.canPlayType("video/ogg; codecs=\"theora\"");
var h264="video/mp4; codecs=\"avc1.42E01E";
var mp4=elem.canPlayType(h264+"\"")||elem.canPlayType(h264+", mp4a.40.2\"");
var webm=elem.canPlayType("video/webm; codecs=\"vp8, vorbis\"");
for(var i=0;i<_882.length;i++){
if(_882[i]==_884){
if(_884=="ogv"){
return ogg;
}else{
if(_884=="webm"){
return webm;
}else{
if(_884=="mp4"){
return mp4;
}
}
}
}
}
return false;
}
function getWrapper(name){
var _88c=$MP.playerWrapperMap[name];
if(_88c==null||typeof (_88c)=="undefined"){
return $MP.playerWrapperMap[name+"_strobemediaplayback-video"];
}
return _88c;
}
function getFuncMap(name){
var _88e=$MP.jsFunctionMap[name];
if(_88e==null||typeof (_88e)=="undefined"){
return $MP.jsFunctionMap[name+"_strobemediaplayback-video"];
}
return _88e;
}
ColdFusion.MediaPlayer.setMute=function(name,mute){
if($MP.bindInfoMap[name]!=null){
var _891=getBindInfo(name);
if(_891==null){
return;
}
_891.mute=mute;
return;
}
var _892=$MP.getPlayer(name);
var _893=$MP.getType(name);
var _894=getWrapper(name);
if(_893=="html"){
_892.muted=mute;
if(mute){
_894.volumeHigh.css("background-position","0px -72px");
_894.volumeSlider.slider("value",0);
}else{
handleChangeVolume(name,_892.volume);
}
}else{
if(_893=="flash"){
_892.setMuted(mute);
}
}
};
function resolveSource(src){
if(src==null){
return null;
}
if(src.charAt(0)!="/"&&src.indexOf("://")<0){
var _896="";
var _897=document.location.href;
if(_897||_897.indexOf("/")>-1){
_896=_897.substring(0,_897.lastIndexOf("/")+1);
}
var _898=_896+src;
var _899=_898.split("/");
var _89a=new Array();
var _89b=0;
for(var i=0;i<_899.length;i++){
if(_899[i]==".."){
_89a[--_89b]="";
}else{
_89a[_89b++]=_899[i];
}
}
src=_89a[0];
for(var i=1;i<_89b;i++){
src=src+"/"+_89a[i];
}
}
if(src.indexOf("/")==0){
src=$MP.baseURI+src;
}
return src;
}
ColdFusion.MediaPlayer.getPlayer=function(name){
var _89e=$MP.playerMap[name];
if(_89e==null||typeof (_89e)=="undefined"){
_89e=$MP.playerMap[name+"_strobemediaplayback-video"];
if(_89e==null||typeof (_89e)=="undefined"){
ColdFusion.handleError(null,"mediaplayer.getplayer.notfound","widget",[name],null,null,true);
}
}
return _89e;
};
ColdFusion.MediaPlayer.setTitle=function(name,_8a0){
if(_8a0==null){
ColdFusion.handleError(null,"mediaplayer.settitle.invalidtitle","widget",[name],null,null,true);
}
var _8a1=$MP.titleDataMap[name];
if(_8a1==null){
_8a1={};
$MP.titleDataMap[name]=_8a1;
}
var _8a2=document.getElementById(name+"_videoTitle");
if(_8a2==null){
var _8a3="<div id=\""+name+"_videoTitle\">";
$("#"+name+"_videoContainer").prepend(_8a3);
}
_8a1.hideTitle=false;
_8a1.title=_8a0;
handleTitle(name,_8a0,_8a1);
};
ColdFusion.MediaPlayer.setSource=function(name,src){
if(src==null||src=="undefined"){
ColdFusion.handleError(null,"mediaplayer.setsource.invalidsource","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _8a6=getBindInfo(name);
if(_8a6==null){
return;
}
_8a6.player_options.src=resolveSource(src);
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_8a6.player_options.favorFlashOverHtml5Video=true;
}else{
_8a6.player_options.favorFlashOverHtml5Video=false;
}
_8a6.videoTitle=getVideoTitle(src);
return;
}
var _8a7=$MP.getPlayer(name);
var _8a8=$MP.getType(name);
src=resolveSource(src);
var _8a9=getWrapper(name);
var _8aa,jsFunctionMap;
if(_8a9!=null&&_8a9.errorwindow!=null){
_8a9.errorwindow.html("");
_8a9.errorwindow.hide();
_8aa=$MP.playerOptionsMap[_8a9.options.id];
}else{
_8aa=$MP.playerOptionsMap[name+"_"+"strobemediaplayback-video"];
jsFunctionMap=$MP.jsFunctionMap[name+"_"+"strobemediaplayback-video"];
}
if(_8aa==null){
_8aa=$MP.defaultOptions;
}
var _8ab={"tablet":{"name":_8aa.id+"_"+"strobemediaplayback-video"},"smartphone":{"startSize":{"width":360,"height":200},"name":_8aa.id+"_"+"strobemediaplayback-video"},"default":{"startSize":{"width":+_8aa.width,"height":+_8aa.height},"name":_8aa.id+"_"+"strobemediaplayback-video"}};
if(_8a8=="html"){
if(isHTMLFileFormatSupported(src)){
_8a7.src=src;
_8a7.load();
_8a7.pause();
_8a9.playOverlay.fadeIn(600);
_8a9.playtoggle.removeClass("paused");
_8a9.slider.css({"left":"0%"});
_8a9.playedbar.css({"width":"0%"});
_8a9.currenttime.html("0:00");
_8a9.duration.html("0:00");
var css={"left":"0%","width":"0%"};
_8a9.bufferbar.removeClass("done");
_8a9.bufferbar.css(css);
var _8ad=$MP.titleDataMap[_8aa.id];
handleTitle(name,src,_8ad);
}else{
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_8aa.isHTML5=false;
_8aa.favorFlashOverHtml5Video=true;
_8aa.src=src;
var _8ad=$MP.titleDataMap[_8aa.id];
if(_8ad.hideTitle!=null&&!_8ad.hideTitle){
_8aa.wmode="opaque";
}
strobeMediaPlayback.draw(_8aa.id+"_"+"strobemediaplayback-video",_8ab,_8aa);
var _8ae=$("#"+_8aa.id+"_"+"strobemediaplayback-video");
var _8af=_8ae.find("video");
var _8b0=_8af.get(0);
var _8b1=$("#"+_8aa.id+"_"+"strobemediaplayback-video  .html5player").strobemediaplaybackhtml5(_8aa,_8a9.jsCallbackFunctions);
$MP.playerMap[_8aa.id]=_8b0;
$MP.playerWrapperMap[_8aa.id]=_8b1;
handleTitle(_8aa.id,_8aa.src,_8ad);
}
}
}else{
if(_8a8=="flash"){
if(isFlashFileFormatSupported(src)&&isFlashSupported()){
_8a7.setMediaResourceURL(src);
handleTitle(name,src,$MP.titleDataMap[id]);
}else{
if(isHTMLFileFormatSupported(src)){
var id=_8aa.id+"_strobemediaplayback-video";
$("#"+id).replaceWith("<div  id=\""+id+"\"></div>");
$("#"+id).css("visibility","visible");
_8aa.isHTML5=true;
_8aa.favorFlashOverHtml5Video=false;
_8aa.src=src;
strobeMediaPlayback.draw(id,_8ab,_8aa);
var _8ae=$("#"+id);
var _8af=_8ae.find("video");
var _8b0=_8af.get(0);
if(_8b0==null){
return;
}
var _8b3=getFuncMap(id);
var _8b1=$("#"+id+"  .html5player").strobemediaplaybackhtml5(_8aa,_8b3);
$MP.playerMap[_8aa.id]=_8b0;
$MP.playerWrapperMap[_8aa.id]=_8b1;
handlePlayoverlay(_8aa.id,_8aa.width,_8aa.height);
handleErrorElement(_8aa.id,_8aa.width,_8aa.height);
_8b1.playOverlay.css("display","block");
handleTitle(_8aa.id,_8aa.src,$MP.titleDataMap[id]);
_8b0.load();
if(_8aa.autoPlay==false){
_8b0.pause();
}
}
}
}
}
};
function getBindInfo(name){
var _8b5=$MP.bindInfoMap[name];
if(_8b5!=null){
return _8b5;
}
return;
}
function handleBindElements(_8b6){
if(_8b6!=null){
if(_8b6.bindEvent==null||_8b6.bindEvent.toLowerCase()=="onclick"){
bindFancyBox(false,false,_8b6.bindElement,_8b6.player_options,_8b6.type,_8b6.jsFuncc,_8b6.videoContent,_8b6.videoTitle);
}else{
var _8b7=document.getElementById(_8b6.bindElement);
var _8b8=_8b6.bindEvent.substring(2);
$("#"+_8b6.bindElement).live(_8b8.toLowerCase(),function(e){
bindFancyBox(true,false,_8b6.bindElement,_8b6.player_options,_8b6.type,_8b6.jsFuncc,_8b6.videoContent,_8b6.videoTitle);
});
}
}
}
function handleChangeVolume(name,_8bb){
var _8bc=$MP.getPlayer(name);
var _8bd=$MP.getType(name);
if(_8bd=="html"){
if(_8bc.muted){
_8bc.muted=false;
}
_8bc.volume=_8bb;
var _8be=getWrapper(name);
var _8bf=_8be.volumeSlider;
_8bf.slider("value",_8bb*100);
handleVolumeChangeUI(name,_8bb);
}else{
if(_8bd=="flash"){
_8bc.setVolume(_8bb);
}
}
}
ColdFusion.MediaPlayer.setVolume=function(name,_8c1){
if(_8c1<=0){
ColdFusion.handleError(null,"mediaplayer.setvolume.invalidvalue","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _8c2=getBindInfo(name);
if(_8c2==null){
return;
}
_8c2.volume=_8c1;
return;
}
handleChangeVolume(name,_8c1);
};
ColdFusion.MediaPlayer.resize=function(name,_8c4,_8c5){
if(_8c4<=0||_8c5<=0){
ColdFusion.handleError(null,"mediaplayer.resize.invalidvalue","widget",[name],null,null,true);
}
if($MP.bindInfoMap[name]!=null){
var _8c6=getBindInfo(name);
if(_8c6==null){
return;
}
_8c6.player_options.width=_8c4;
_8c6.player_options.height=_8c5;
return;
}
var _8c7=false;
var _8c8=$MP.getPlayer(name);
var _8c9=$MP.getType(name);
var _8ca=getWrapper(name);
_8c8.width=_8c4;
_8c8.height=_8c5;
if(_8ca!=null){
_8ca.options.width=_8c4;
_8ca.options.height=_8c5;
_8ca.controlbar.css("width",_8c4-1.5);
if(_8ca.options.width>180){
_8ca.progressbar.css("width",_8c4-180);
_8ca.trackswidth=_8c4-180;
}else{
_8ca.progressbar.css("width","50%");
_8ca.trackswidth="50%";
}
handlePlayoverlay(name,_8c4,_8c5);
handleErrorElement(name,_8c4,_8c5);
}
$("#"+name+"_"+"videoContainer").css("width",_8c4);
$("#"+name+"_"+"videoContainer").css("height",_8c5);
if(_8c8.paused==false){
_8ca.playOverlay.hide();
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
var _8cf=getBindInfo(name);
if(_8cf==null){
return;
}
_8cf.startPlay=true;
return;
}
var _8d0=$MP.getPlayer(name);
var _8d1=$MP.getType(name);
if(_8d1=="html"){
_8d0.play();
}else{
if(_8d1=="flash"){
_8d0.play2();
}
}
};
ColdFusion.MediaPlayer.stopPlay=function(name){
if($MP.bindInfoMap[name]!=null){
var _8d3=getBindInfo(name);
if(_8d3==null){
return;
}
_8d3.stopPlay=true;
return;
}
var _8d4=$MP.getPlayer(name);
_8d4.pause();
};
ColdFusion.MediaPlayer.logError=function(name,_8d6){
if(name==null||_8d6==null){
return;
}
var _8d7=$MP.playerWrapperMap[name];
if(_8d7==null){
_8d7=$MP.playerWrapperMap[name+"_strobemediaplayback-video"];
if(_8d7==null){
return;
}
}
_8d7.errorwindow.html(_8d6);
_8d7.errorwindow.show();
_8d7.playOverlay.hide();
};
function handlePlayoverlay(name,_8d9,_8da){
if(!isDesktop){
return;
}
var _8db=getWrapper(name);
_8db.playOverlay.css("left","");
_8db.playOverlay.css("top","");
_8db.playOverlay.css("left",(_8d9-116)/2+"px");
_8db.playOverlay.css("top",(_8da-107)/2+"px");
}
function handleErrorElement(name,_8dd,_8de){
var _8df=getWrapper(name);
_8df.playOverlay.css("display","none");
_8df.errorwindow.css("left","");
_8df.errorwindow.css("top","");
_8df.errorwindow.css("display","none");
var _8e0=_8df.controlbar;
var _8e1=0;
if(_8e0!=null){
_8e1=_8e0.css("height");
if(_8e1!=null&&_8e1.indexOf("px")!=-1){
_8e1=_8e1.substring(0,_8e1.indexOf("px"));
}else{
_8e1=0;
}
}
_8df.errorwindow.css("margin-top",_8de/2-_8e1+"px");
}
function handleTitleResize(id,_8e3,_8e4){
$("#"+id+"_videoTitle").css("width","");
$("#"+id+"_videoTitle").css("width",_8e3+"px");
}
function handleTitle(_8e5,_8e6,_8e7){
var _8e8=document.getElementById(_8e5+"_"+"videoTitle");
if(_8e8==null){
_8e5=_8e5.substring(0,_8e5.indexOf("_strobemediaplayback-video"));
_8e8=document.getElementById(_8e5+"_"+"videoTitle");
}
var _8e9=document.getElementById("fancybox-title-float-main");
if(_8e8!=null){
if(_8e7==null){
_8e7=$MP.titleDataMap[_8e5];
if(_8e7==null||_8e7.hideTitle){
var _8ea=_8e8.parentNode;
_8ea.removeChild(_8e8);
return;
}
}else{
if(_8e7.hideTitle){
var _8ea=_8e8.parentNode;
_8ea.removeChild(_8e8);
return;
}
}
var _8eb=_8e7.title;
if(_8e7==null||_8e7.title==null||_8e7.title.trim()==""){
_8eb=getVideoTitle(_8e6);
}
if(_8eb!=""){
_8e8.innerHTML=_8eb;
}else{
return;
}
$("#"+_8e5+"_"+"videoTitle").css("position","absolute");
$("#"+_8e5+"_"+"videoTitle").css("z-index",2);
if(_8e7==null||_8e7.title_text_color==null){
$("#"+_8e5+"_"+"videoTitle").css("color","white");
}else{
$("#"+_8e5+"_"+"videoTitle").css("color",_8e7.title_text_color);
}
if(_8e7!=null&&_8e7.title_bgcolor!=null){
$("#"+_8e5+"_"+"videoTitle").css("background-color",_8e7.title_bgcolor);
}
$("#"+_8e5+"_"+"videoTitle").css("font-weight","bold");
$("#"+_8e5+"_"+"videoTitle").css("font-family","Arial,Helvetica,sans-serif");
$("#"+_8e5+"_"+"videoTitle").css("font-size","13px");
$("#"+_8e5+"_"+"videoTitle").css("word-wrap","break-word");
if(_8e8.style.backgroundColor==null||_8e8.style.backgroundColor==""){
$("#"+_8e5+"_"+"videoTitle").css("margin-left","5px");
}
$("#"+_8e5+"_"+"videoTitle").show();
$("#"+_8e5+"_"+"strobemediaplayback").css("z-index",1);
}else{
if(_8e9!=null&&_8e6!=null){
$("#fancybox-title-float-main").text(_8e6);
}
}
}
function getVideoTitle(_8ec){
var _8ed=null;
if(_8ec!=null&&_8ec!=""){
var _8ee=_8ec.lastIndexOf("/");
if(_8ee==-1){
_8ee=_8ec.lastIndexOf("\\");
}
if(_8ee==-1){
_8ed=_8ec;
}
if(_8ed==null){
_8ed=_8ec.substring(_8ee+1,_8ec.length);
}
}
if(_8ed==null||_8ed.indexOf(".")<0){
return _8ec;
}else{
return _8ed;
}
}
function handlebackgroundColor(_8ef){
if(_8ef.backgroundColor==null){
return;
}
var _8f0=document.getElementById(_8ef.id);
if(_8f0==null){
return;
}
_8f0.setAttribute("style","background-color:"+_8ef.backgroundColor+";");
}
function handleBorderStyle(_8f1,_8f2){
if(_8f2.hideBorder){
return;
}
var _8f3="#fff";
if(_8f2.bgColor){
_8f3=_8f2.bgColor;
}
var _8f4=document.getElementById(_8f1+"_"+"videoContainer");
if(_8f4==null){
_8f1=_8f1.substring(0,_8f1.indexOf("_"));
}
if(_8f2.border_left!=null){
$("#"+_8f1+"_"+"videoContainer").css("border-left",_8f2.border_left+"px"+" solid "+_8f3);
}
if(_8f2.border_right!=null){
$("#"+_8f1+"_"+"videoContainer").css("border-right",_8f2.border_right+"px"+" solid "+_8f3);
}
if(_8f2.border_top!=null){
$("#"+_8f1+"_"+"videoContainer").css("border-top",_8f2.border_top+"px"+" solid "+_8f3);
}
if(_8f2.border_bottom!=null){
$("#"+_8f1+"_"+"videoContainer").css("border-bottom",_8f2.border_bottom+"px"+" solid "+_8f3);
}
}
function handleControlsStyle(_8f5,_8f6){
var _8f7=getWrapper(_8f5);
if(_8f6.controlbar_bgcolor!=null){
_8f7.controlbar.css("background-color",_8f6.controlbar_bgcolor);
}
if(_8f6.controls_color!=null){
_8f7.playtoggle.css("background-color",_8f6.controls_color);
_8f7.slider.css("background-color",_8f6.controls_color);
_8f7.fullview.css("background-color",_8f6.controls_color);
_8f7.currenttime.css("color",_8f6.controls_color);
_8f7.duration.css("color",_8f6.controls_color);
_8f7.seekbar.css("background-color",_8f6.controls_color);
_8f7.volumeHigh.css("background-color",_8f6.controls_color);
}
if(_8f6.progress_bgcolor!=null){
_8f7.bufferbar.css("background-color",_8f6.progress_bgcolor);
}
if(_8f6.progress_color!=null){
_8f7.playedbar.css("background-color",_8f6.progress_color);
}
}
function triggerHandler(id,_8f9,_8fa){
if(_8f9=="onJavaScriptBridgeCreated"){
return;
}else{
if(_8f9=="play"){
var _8fb=getFuncMap(id);
var _8fc=$MP.videoMonitorMap[id];
if(_8fb.onStartCallback!=null&&_8fc.paused){
_8fb.onStartCallback(id);
_8fc.paused=false;
}
hideTitle(id);
}else{
if(_8f9=="pause"){
var _8fb=getFuncMap(id);
var _8fc=$MP.videoMonitorMap[id];
if(_8fb.onPauseCallback!=null&&!_8fc.paused){
_8fb.onPauseCallback(id);
_8fc.paused=true;
}
showTitle(id);
}else{
if(_8f9=="complete"){
var _8fb=getFuncMap(id);
if(_8fb.onComplete!=null){
_8fb.onComplete();
}
var _8fc=$MP.videoMonitorMap[id];
_8fc.paused=true;
showTitle(id);
}else{
if(_8f9=="loadedmetadata"){
var _8fb=getFuncMap(id);
if(_8fb.onLoad!=null){
_8fb.onLoad();
}
}else{
if(_8f9=="error"){
var _8fb=getFuncMap(id);
if(_8fb.onError!=null){
_8fb.onError();
}
}else{
if(_8f9=="volumechange"){
var _8fc=$MP.videoMonitorMap[id];
_8fc.muted=_8fa.muted;
}
}
}
}
}
}
}
}
function onError(_8fd){
var _8fe;
var _8ff;
var _900;
var _901;
if(_8fd.target!=null&&_8fd.target.tagName.toLowerCase()=="video"){
_900=getFuncMap(_8fd.target.id);
if(_8fd.target.error!=null){
_8ff=_8fd.target.error.code;
}
_901=getWrapper(_8fd.target.id);
}else{
if(_8fd.target!=null&&_8fd.target.tagName.toLowerCase()=="source"){
var _902=_8fd.target.getAttribute("src");
var _903=_8fd.target.getAttribute("onerror");
if(_902!=null&&_903!=null){
_8ff=4;
}else{
return;
}
}
var _904=_8fd.target.parentNode;
_900=getFuncMap(_904.id);
_901=getWrapper(_904.id);
}
if(_8ff==null){
return;
}
if(_900.onError!=null){
_900.onError(_8ff);
return;
}
switch(_8ff){
case 1:
_8fe="You aborted the video playback.";
break;
case 2:
_8fe="A network error caused the video download to fail part-way.";
break;
case 3:
_8fe="The video playback was aborted due to a corruption problem or because the video used features your browser did not support.";
break;
case 4:
_8fe="The video could not be loaded, either because the server or network failed or because the format is not supported.";
break;
default:
_8fe="An unknown error occurred.";
break;
}
_901.playOverlay.css("display","none");
_901.errorwindow.html(_8fe);
_901.errorwindow.show();
}
function onFlashEmbedComplete(_905){
var _906=$("#"+_905.id);
var _907=_906.get(0);
$MP.playerMap[_905.id]=_907;
}
function removejscssfile(_908,_909){
var _90a=(_909=="js")?"script":(_909=="css")?"link":"none";
var _90b=(_909=="js")?"src":(_909=="css")?"href":"none";
var _90c=document.getElementsByTagName(_90a);
for(var i=_90c.length;i>=0;i--){
if(_90c[i]&&_90c[i].getAttribute(_90b)!=null&&_90c[i].getAttribute(_90b).indexOf(_908)!=-1){
_90c[i].parentNode.removeChild(_90c[i]);
}
}
}
