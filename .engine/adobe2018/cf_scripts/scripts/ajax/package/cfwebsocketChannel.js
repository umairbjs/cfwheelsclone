/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
ColdFusion.WebSocket={NS:"coldfusion.websocket.channels",WELCOME:"welcome",AUTHENTICATE:"authenticate",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",PUBLISH:"publish",INVOKE_AND_PUBLISH:"invokeAndPublish",GET_CHANNELS:"getChannels",GET_SUBSCRIBER_COUNT:"getSubscriberCount",GET_SUBSCRIPTIONS:"getSubscriptions",SEND_MESSAGE:"sendMessage",INVOKE_AND_MESSAGE:"invokeAndSend",INVOKE:"invoke",STOP:"stop",init:function(id,_1ab,_1ac,_1ad,_1ae,_1af,_1b0,_1b1,_1b2,_1b3,_1b4){
if(cf_ws.isWebSocketSupported()){
lWSC=new cf_ws.CFWebSocketWrapper();
ColdFusion.WebSocket[id]=lWSC;
lWSC.options={OnWelcome:this.cfonOpencallBk,OnMessage:this.cfMessageHandlerCallBk,OnClose:_1b1,onError:_1b2,appName:_1ab,cfauth:_1ad,subscribeTo:_1ae,referrer:_1b3};
var _1b5=self.location.hostname;
if(!(self.WebSocket||self.MozWebSocket)&&_1ac==true){
var _1b6={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"WebSocket over SSL will not work as your browser does not have native WebSockets support."};
var _1b7=_1b2!=null?_1b2:_1af;
_1b7(_1b6);
return;
}
if(_1ac==false&&_1b5&&_1b5=="localhost"){
_1b5="127.0.0.1";
}
var _1b8;
var port;
if(_1b4){
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
_1b8="/cfws";
}else{
port=_1ac?_cf_websocket_ssl_port:_cf_websocket_port;
_1b8="/cfusion"+"/cfusion";
protocol=_1ac?"wss://":"ws://";
}
var lURL=protocol+(_1b5)+":"+port+_1b8;
lWSC.options.url=lURL;
var lRes=lWSC.open(lURL,lWSC.options);
lWSC.isOpen=true;
lWSC.processConnected=function(_1bc){
};
lWSC.processDisconnected=function(_1bd){
};
lWSC.defaultMessageHandler=_1af;
if(_1b0){
lWSC.appOnOpenHandler=_1b0;
}
lWSC.channelSpecificResHandlers={};
lWSC.subscribercount_callbackHandlers={};
return lWSC;
}else{
var _1b6={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"Browser neither have native WebSocket support nor a flash player for the fallback."};
var _1b7=_1b2!=null?_1b2:_1af;
_1b7(_1b6);
}
},welcome:function(_1be,_1bf,_1c0){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.WELCOME,authKey:_1be,subscribeTo:_1bf,appName:_1c0});
}
return lRes;
},authenticate:function(_1c2,_1c3){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.AUTHENTICATE,username:_1c2,password:_1c3,appName:this.options.appName});
}
return lRes;
},subscribe:function(_1c5,_1c6,_1c7){
var lRes=this.isConnected();
if(lRes==true){
var _1c9={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SUBSCRIBE,channel:_1c5,appName:this.options.appName};
if(_1c6!=null&&(typeof _1c6=="object")){
_1c9.customOptions=_1c6;
}
this.sendToken(_1c9);
if(_1c7){
this.channelSpecificResHandlers[_1c5]=_1c7;
this.channelName_subscriptionInProcess=_1c5;
}
}
return lRes;
},unsubscribe:function(_1ca){
var lRes=this.isConnected();
if(lRes==true){
var _1cc={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.UNSUBSCRIBE,channel:_1ca,appName:this.options.appName};
this.sendToken(_1cc);
delete this.channelSpecificResHandlers[_1ca];
}
return lRes;
},publish:function(_1cd,_1ce,_1cf){
var lRes=this.isConnected();
if(lRes==true){
var _1d1={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.PUBLISH,channel:_1cd,data:_1ce,appName:this.options.appName};
if(_1cf!=null&&(typeof _1cf=="object")){
_1d1.customOptions=_1cf;
}
this.sendToken(_1d1);
}
return lRes;
},invokeAndPublish:function(_1d2,_1d3,_1d4,_1d5,_1d6){
var lRes=this.isConnected();
if(lRes==true){
var _1d8={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_PUBLISH,channel:_1d2,cfcName:_1d3,cfcMethod:_1d4,methodArguments:_1d5,appName:this.options.appName,referrer:this.options.referrer};
if(_1d6!=null&&(typeof _1d6=="object")){
_1d8.customOptions=_1d6;
}
this.sendToken(_1d8);
}
return lRes;
},getSubscriberCount:function(_1d9,_1da){
var lRes=this.isConnected();
if(lRes==true){
var _1dc={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIBER_COUNT,channel:_1d9,appName:this.options.appName};
this.sendToken(_1dc);
}
if(_1da){
if(!this.subscribercount_callbackHandlers){
this.subscribercount_callbackHandlers={};
}
this.subscribercount_callbackHandlers[_1d9]=_1da;
}
return lRes;
},getSubscriptions:function(_1dd){
var lRes=this.isConnected();
if(lRes==true){
var _1df={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIPTIONS,appName:this.options.appName};
this.sendToken(_1df);
}
if(_1dd){
this.subscriptions_callbackHandler=_1dd;
}
return lRes;
},sendMessage:function(_1e0,_1e1,_1e2){
var lRes=this.isConnected();
if(lRes==true){
var _1e4={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SEND_MESSAGE,targetId:_1e0,data:_1e1,appName:this.options.appName};
if(_1e2!=null&&(typeof _1e2=="object")){
_1e4.customOptions=_1e2;
}
this.sendToken(_1e4);
}
return lRes;
},invokeAndSend:function(_1e5,_1e6,_1e7,_1e8,_1e9){
var lRes=this.isConnected();
if(lRes==true){
var _1eb={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_MESSAGE,target:_1e5,cfcName:_1e6,cfcMethod:_1e7,methodArguments:_1e8,appName:this.options.appName};
if(_1e9!=null&&(typeof _1e9=="object")){
_1eb.customOptions=_1e9;
}
this.sendToken(_1eb);
}
return lRes;
},invoke:function(_1ec,_1ed,_1ee,_1ef){
var lRes=this.isConnected();
if(lRes==true){
var _1f1={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE,cfcName:_1ec,cfcMethod:_1ed,methodArguments:_1ee,appName:this.options.appName,referrer:this.options.referrer};
if(_1ef!=null&&(typeof _1ef=="object")){
_1f1.customOptions=_1ef;
}
this.sendToken(_1f1);
}
return lRes;
},openConnection:function(){
var lURL=lWSC.options.url;
this.open(lURL,this.options);
},isConnectionOpen:function(){
var _1f3=this.isConnected();
return _1f3;
},closeConnection:function(){
this.close({fireClose:true});
},cfonOpencallBk:function(_1f4){
if(this.cfauth!=null||this.susbcribeTo!=null){
_1f4.welcome(this.cfauth,this.subscribeTo,this.appName);
}
if(_1f4.appOnOpenHandler){
_1f4.appOnOpenHandler(_1f4);
}
},cfMessageHandlerCallBk:function(_1f5,_1f6){
var _1f7=_1f6.defaultMessageHandler;
if((_1f5.type=="event")&&(_1f5.name=="connect"||_1f5.name=="disconnect")){
return;
}
if((_1f5.reqType=="subscribe")&&_1f6.channelName_subscriptionInProcess!=null){
if(_1f5.code==-1){
delete _1f6.channelSpecificResHandlers[_1f6.channelName_subscriptionInProcess];
}
delete _1f6.channelName_subscriptionInProcess;
}
if((_1f5.reqType=="getSubscriberCount")&&_1f6.subscribercount_callbackHandlers[_1f5.channel]!=null){
_1f6.subscribercount_callbackHandlers[_1f5.channel].call(this,_1f5);
delete _1f6.subscribercount_callbackHandlers[_1f5.channelname];
return;
}
if((_1f5.reqType=="getSubscriptions")&&_1f6.subscriptions_callbackHandler!=null){
_1f6.subscriptions_callbackHandler(_1f5);
delete _1f6.subscriptions_callbackHandler;
return;
}
if(_1f5.type=="data"&&_1f5.channelname){
var _1f8=_1f5.channelname;
var _1f9=_1f6.channelSpecificResHandlers[_1f8];
while(_1f9==null){
var lPos=_1f8.lastIndexOf(".");
if(lPos>0){
_1f8=_1f8.substr(0,lPos);
_1f9=_1f6.channelSpecificResHandlers[_1f8];
}else{
break;
}
}
if(_1f9){
_1f7=_1f9;
}
}
_1f7.call(this,_1f5);
}};
function cfwebsocketinit(){
var _1fb=ColdFusion.WebSocket;
ns=cf_ws;
for(var _1fc in _1fb){
ns["CFWebSocketWrapper"].prototype[_1fc]=_1fb[_1fc];
}
}
cfwebsocketinit();
