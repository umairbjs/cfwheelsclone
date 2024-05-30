/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
ColdFusion.WebSocket={NS:"coldfusion.websocket.channels",WELCOME:"welcome",AUTHENTICATE:"authenticate",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",PUBLISH:"publish",INVOKE_AND_PUBLISH:"invokeAndPublish",GET_CHANNELS:"getChannels",GET_SUBSCRIBER_COUNT:"getSubscriberCount",GET_SUBSCRIPTIONS:"getSubscriptions",SEND_MESSAGE:"sendMessage",INVOKE_AND_MESSAGE:"invokeAndSend",INVOKE:"invoke",STOP:"stop",init:function(id,_15c,_15d,_15e,_15f,_160,_161,_162,_163,_164,_165){
if(cf_ws.isWebSocketSupported()){
lWSC=new cf_ws.CFWebSocketWrapper();
ColdFusion.WebSocket[id]=lWSC;
lWSC.options={OnWelcome:this.cfonOpencallBk,OnMessage:this.cfMessageHandlerCallBk,OnClose:_162,onError:_163,appName:_15c,cfauth:_15e,subscribeTo:_15f,referrer:_164};
var _166=self.location.hostname;
if(!(self.WebSocket||self.MozWebSocket)&&_15d==true){
var _167={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"WebSocket over SSL will not work as your browser does not have native WebSockets support."};
var _168=_163!=null?_163:_160;
_168(_167);
return;
}
if(_15d==false&&_166&&_166=="localhost"){
_166="127.0.0.1";
}
var _169;
var port;
if(_165){
if(self.location.port!=""){
port=self.location.port;
}else{
if(self.location.protocol!=""&&self.location.protocol=="https:"){
port=443;
}else{
port=80;
}
}
if(self.location.protocol!=""&&self.location.protocol=="https:"){
protocol="wss://";
}else{
protocol="ws://";
}
_169="/cfws";
}else{
port=_15d?_cf_websocket_ssl_port:_cf_websocket_port;
_169="/cfusion"+"/cfusion";
protocol=_15d?"wss://":"ws://";
}
var lURL=protocol+(_166)+":"+port+_169;
lWSC.options.url=lURL;
var lRes=lWSC.open(lURL,lWSC.options);
lWSC.isOpen=true;
lWSC.processConnected=function(_16d){
};
lWSC.processDisconnected=function(_16e){
};
lWSC.defaultMessageHandler=_160;
if(_161){
lWSC.appOnOpenHandler=_161;
}
lWSC.channelSpecificResHandlers={};
lWSC.subscribercount_callbackHandlers={};
return lWSC;
}else{
var _167={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"Browser neither have native WebSocket support nor a flash player for the fallback."};
var _168=_163!=null?_163:_160;
_168(_167);
}
},welcome:function(_16f,_170,_171){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.WELCOME,authKey:_16f,subscribeTo:_170,appName:_171});
}
return lRes;
},authenticate:function(_173,_174){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.AUTHENTICATE,username:_173,password:_174,appName:this.options.appName});
}
return lRes;
},subscribe:function(_176,_177,_178){
var lRes=this.isConnected();
if(lRes==true){
var _17a={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SUBSCRIBE,channel:_176,appName:this.options.appName};
if(_177!=null&&(typeof _177=="object")){
_17a.customOptions=_177;
}
this.sendToken(_17a);
if(_178){
this.channelSpecificResHandlers[_176]=_178;
this.channelName_subscriptionInProcess=_176;
}
}
return lRes;
},unsubscribe:function(_17b){
var lRes=this.isConnected();
if(lRes==true){
var _17d={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.UNSUBSCRIBE,channel:_17b,appName:this.options.appName};
this.sendToken(_17d);
delete this.channelSpecificResHandlers[_17b];
}
return lRes;
},publish:function(_17e,_17f,_180){
var lRes=this.isConnected();
if(lRes==true){
var _182={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.PUBLISH,channel:_17e,data:_17f,appName:this.options.appName};
if(_180!=null&&(typeof _180=="object")){
_182.customOptions=_180;
}
this.sendToken(_182);
}
return lRes;
},invokeAndPublish:function(_183,_184,_185,_186,_187){
var lRes=this.isConnected();
if(lRes==true){
var _189={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_PUBLISH,channel:_183,cfcName:_184,cfcMethod:_185,methodArguments:_186,appName:this.options.appName,referrer:this.options.referrer};
if(_187!=null&&(typeof _187=="object")){
_189.customOptions=_187;
}
this.sendToken(_189);
}
return lRes;
},getSubscriberCount:function(_18a,_18b){
var lRes=this.isConnected();
if(lRes==true){
var _18d={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIBER_COUNT,channel:_18a,appName:this.options.appName};
this.sendToken(_18d);
}
if(_18b){
if(!this.subscribercount_callbackHandlers){
this.subscribercount_callbackHandlers={};
}
this.subscribercount_callbackHandlers[_18a]=_18b;
}
return lRes;
},getSubscriptions:function(_18e){
var lRes=this.isConnected();
if(lRes==true){
var _190={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIPTIONS,appName:this.options.appName};
this.sendToken(_190);
}
if(_18e){
this.subscriptions_callbackHandler=_18e;
}
return lRes;
},sendMessage:function(_191,_192,_193){
var lRes=this.isConnected();
if(lRes==true){
var _195={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SEND_MESSAGE,targetId:_191,data:_192,appName:this.options.appName};
if(_193!=null&&(typeof _193=="object")){
_195.customOptions=_193;
}
this.sendToken(_195);
}
return lRes;
},invokeAndSend:function(_196,_197,_198,_199,_19a){
var lRes=this.isConnected();
if(lRes==true){
var _19c={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_MESSAGE,target:_196,cfcName:_197,cfcMethod:_198,methodArguments:_199,appName:this.options.appName};
if(_19a!=null&&(typeof _19a=="object")){
_19c.customOptions=_19a;
}
this.sendToken(_19c);
}
return lRes;
},invoke:function(_19d,_19e,_19f,_1a0){
var lRes=this.isConnected();
if(lRes==true){
var _1a2={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE,cfcName:_19d,cfcMethod:_19e,methodArguments:_19f,appName:this.options.appName,referrer:this.options.referrer};
if(_1a0!=null&&(typeof _1a0=="object")){
_1a2.customOptions=_1a0;
}
this.sendToken(_1a2);
}
return lRes;
},openConnection:function(){
var lURL=lWSC.options.url;
this.open(lURL,this.options);
},isConnectionOpen:function(){
var _1a4=this.isConnected();
return _1a4;
},closeConnection:function(){
this.close({fireClose:true});
},cfonOpencallBk:function(_1a5){
if(this.cfauth!=null||this.susbcribeTo!=null){
_1a5.welcome(this.cfauth,this.subscribeTo,this.appName);
}
if(_1a5.appOnOpenHandler){
_1a5.appOnOpenHandler(_1a5);
}
},cfMessageHandlerCallBk:function(_1a6,_1a7){
var _1a8=_1a7.defaultMessageHandler;
if((_1a6.type=="event")&&(_1a6.name=="connect"||_1a6.name=="disconnect")){
return;
}
if((_1a6.reqType=="subscribe")&&_1a7.channelName_subscriptionInProcess!=null){
if(_1a6.code==-1){
delete _1a7.channelSpecificResHandlers[_1a7.channelName_subscriptionInProcess];
}
delete _1a7.channelName_subscriptionInProcess;
}
if((_1a6.reqType=="getSubscriberCount")&&_1a7.subscribercount_callbackHandlers[_1a6.channel]!=null){
_1a7.subscribercount_callbackHandlers[_1a6.channel].call(this,_1a6);
delete _1a7.subscribercount_callbackHandlers[_1a6.channelname];
return;
}
if((_1a6.reqType=="getSubscriptions")&&_1a7.subscriptions_callbackHandler!=null){
_1a7.subscriptions_callbackHandler(_1a6);
delete _1a7.subscriptions_callbackHandler;
return;
}
if(_1a6.type=="data"&&_1a6.channelname){
var _1a9=_1a6.channelname;
var _1aa=_1a7.channelSpecificResHandlers[_1a9];
while(_1aa==null){
var lPos=_1a9.lastIndexOf(".");
if(lPos>0){
_1a9=_1a9.substr(0,lPos);
_1aa=_1a7.channelSpecificResHandlers[_1a9];
}else{
break;
}
}
if(_1aa){
_1a8=_1aa;
}
}
_1a8.call(this,_1a6);
}};
function cfwebsocketinit(){
var _1ac=ColdFusion.WebSocket;
ns=cf_ws;
for(var _1ad in _1ac){
ns["CFWebSocketWrapper"].prototype[_1ad]=_1ac[_1ad];
}
}
cfwebsocketinit();
