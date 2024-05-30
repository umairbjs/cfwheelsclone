/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
ColdFusion.WebSocket={NS:"coldfusion.websocket.channels",WELCOME:"welcome",AUTHENTICATE:"authenticate",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",PUBLISH:"publish",INVOKE_AND_PUBLISH:"invokeAndPublish",GET_CHANNELS:"getChannels",GET_SUBSCRIBER_COUNT:"getSubscriberCount",GET_SUBSCRIPTIONS:"getSubscriptions",SEND_MESSAGE:"sendMessage",INVOKE_AND_MESSAGE:"invokeAndSend",INVOKE:"invoke",STOP:"stop",init:function(id,_48b,_48c,_48d,_48e,_48f,_490,_491,_492,_493,_494){
if(cf_ws.isWebSocketSupported()){
lWSC=new cf_ws.CFWebSocketWrapper();
ColdFusion.WebSocket[id]=lWSC;
lWSC.options={OnWelcome:this.cfonOpencallBk,OnMessage:this.cfMessageHandlerCallBk,OnClose:_491,onError:_492,appName:_48b,cfauth:_48d,subscribeTo:_48e,referrer:_493};
var _495=self.location.hostname;
if(!(self.WebSocket||self.MozWebSocket)&&_48c==true){
var _496={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"WebSocket over SSL will not work as your browser does not have native WebSockets support."};
var _497=_492!=null?_492:_48f;
_497(_496);
return;
}
if(_48c==false&&_495&&_495=="localhost"){
_495="127.0.0.1";
}
var _498;
var port;
if(_494){
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
_498="/cfws";
}else{
port=_48c?_cf_websocket_ssl_port:_cf_websocket_port;
_498="/cfusion"+"/cfusion";
protocol=_48c?"wss://":"ws://";
}
var lURL=protocol+(_495)+":"+port+_498;
lWSC.options.url=lURL;
var lRes=lWSC.open(lURL,lWSC.options);
lWSC.isOpen=true;
lWSC.processConnected=function(_49c){
};
lWSC.processDisconnected=function(_49d){
};
lWSC.defaultMessageHandler=_48f;
if(_490){
lWSC.appOnOpenHandler=_490;
}
lWSC.channelSpecificResHandlers={};
lWSC.subscribercount_callbackHandlers={};
return lWSC;
}else{
var _496={ns:ColdFusion.WebSocket.NS,reqType:ColdFusion.WebSocket.WELCOME,code:-1,msg:"Browser neither have native WebSocket support nor a flash player for the fallback."};
var _497=_492!=null?_492:_48f;
_497(_496);
}
},welcome:function(_49e,_49f,_4a0){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.WELCOME,authKey:_49e,subscribeTo:_49f,appName:_4a0});
}
return lRes;
},authenticate:function(_4a2,_4a3){
var lRes=this.isConnected();
if(lRes==true){
this.sendToken({ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.AUTHENTICATE,username:_4a2,password:_4a3,appName:this.options.appName});
}
return lRes;
},subscribe:function(_4a5,_4a6,_4a7){
var lRes=this.isConnected();
if(lRes==true){
var _4a9={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SUBSCRIBE,channel:_4a5,appName:this.options.appName};
if(_4a6!=null&&(typeof _4a6=="object")){
_4a9.customOptions=_4a6;
}
this.sendToken(_4a9);
if(_4a7){
this.channelSpecificResHandlers[_4a5]=_4a7;
this.channelName_subscriptionInProcess=_4a5;
}
}
return lRes;
},unsubscribe:function(_4aa){
var lRes=this.isConnected();
if(lRes==true){
var _4ac={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.UNSUBSCRIBE,channel:_4aa,appName:this.options.appName};
this.sendToken(_4ac);
delete this.channelSpecificResHandlers[_4aa];
}
return lRes;
},publish:function(_4ad,_4ae,_4af){
var lRes=this.isConnected();
if(lRes==true){
var _4b1={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.PUBLISH,channel:_4ad,data:_4ae,appName:this.options.appName};
if(_4af!=null&&(typeof _4af=="object")){
_4b1.customOptions=_4af;
}
this.sendToken(_4b1);
}
return lRes;
},invokeAndPublish:function(_4b2,_4b3,_4b4,_4b5,_4b6){
var lRes=this.isConnected();
if(lRes==true){
var _4b8={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_PUBLISH,channel:_4b2,cfcName:_4b3,cfcMethod:_4b4,methodArguments:_4b5,appName:this.options.appName,referrer:this.options.referrer};
if(_4b6!=null&&(typeof _4b6=="object")){
_4b8.customOptions=_4b6;
}
this.sendToken(_4b8);
}
return lRes;
},getSubscriberCount:function(_4b9,_4ba){
var lRes=this.isConnected();
if(lRes==true){
var _4bc={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIBER_COUNT,channel:_4b9,appName:this.options.appName};
this.sendToken(_4bc);
}
if(_4ba){
if(!this.subscribercount_callbackHandlers){
this.subscribercount_callbackHandlers={};
}
this.subscribercount_callbackHandlers[_4b9]=_4ba;
}
return lRes;
},getSubscriptions:function(_4bd){
var lRes=this.isConnected();
if(lRes==true){
var _4bf={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.GET_SUBSCRIPTIONS,appName:this.options.appName};
this.sendToken(_4bf);
}
if(_4bd){
this.subscriptions_callbackHandler=_4bd;
}
return lRes;
},sendMessage:function(_4c0,_4c1,_4c2){
var lRes=this.isConnected();
if(lRes==true){
var _4c4={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.SEND_MESSAGE,targetId:_4c0,data:_4c1,appName:this.options.appName};
if(_4c2!=null&&(typeof _4c2=="object")){
_4c4.customOptions=_4c2;
}
this.sendToken(_4c4);
}
return lRes;
},invokeAndSend:function(_4c5,_4c6,_4c7,_4c8,_4c9){
var lRes=this.isConnected();
if(lRes==true){
var _4cb={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE_AND_MESSAGE,target:_4c5,cfcName:_4c6,cfcMethod:_4c7,methodArguments:_4c8,appName:this.options.appName};
if(_4c9!=null&&(typeof _4c9=="object")){
_4cb.customOptions=_4c9;
}
this.sendToken(_4cb);
}
return lRes;
},invoke:function(_4cc,_4cd,_4ce,_4cf){
var lRes=this.isConnected();
if(lRes==true){
var _4d1={ns:ColdFusion.WebSocket.NS,type:ColdFusion.WebSocket.INVOKE,cfcName:_4cc,cfcMethod:_4cd,methodArguments:_4ce,appName:this.options.appName,referrer:this.options.referrer};
if(_4cf!=null&&(typeof _4cf=="object")){
_4d1.customOptions=_4cf;
}
this.sendToken(_4d1);
}
return lRes;
},openConnection:function(){
var lURL=lWSC.options.url;
this.open(lURL,this.options);
},isConnectionOpen:function(){
var _4d3=this.isConnected();
return _4d3;
},closeConnection:function(){
this.close({fireClose:true});
},cfonOpencallBk:function(_4d4){
if(this.cfauth!=null||this.susbcribeTo!=null){
_4d4.welcome(this.cfauth,this.subscribeTo,this.appName);
}
if(_4d4.appOnOpenHandler){
_4d4.appOnOpenHandler(_4d4);
}
},cfMessageHandlerCallBk:function(_4d5,_4d6){
var _4d7=_4d6.defaultMessageHandler;
if((_4d5.type=="event")&&(_4d5.name=="connect"||_4d5.name=="disconnect")){
return;
}
if((_4d5.reqType=="subscribe")&&_4d6.channelName_subscriptionInProcess!=null){
if(_4d5.code==-1){
delete _4d6.channelSpecificResHandlers[_4d6.channelName_subscriptionInProcess];
}
delete _4d6.channelName_subscriptionInProcess;
}
if((_4d5.reqType=="getSubscriberCount")&&_4d6.subscribercount_callbackHandlers[_4d5.channel]!=null){
_4d6.subscribercount_callbackHandlers[_4d5.channel].call(this,_4d5);
delete _4d6.subscribercount_callbackHandlers[_4d5.channelname];
return;
}
if((_4d5.reqType=="getSubscriptions")&&_4d6.subscriptions_callbackHandler!=null){
_4d6.subscriptions_callbackHandler(_4d5);
delete _4d6.subscriptions_callbackHandler;
return;
}
if(_4d5.type=="data"&&_4d5.channelname){
var _4d8=_4d5.channelname;
var _4d9=_4d6.channelSpecificResHandlers[_4d8];
while(_4d9==null){
var lPos=_4d8.lastIndexOf(".");
if(lPos>0){
_4d8=_4d8.substr(0,lPos);
_4d9=_4d6.channelSpecificResHandlers[_4d8];
}else{
break;
}
}
if(_4d9){
_4d7=_4d9;
}
}
_4d7.call(this,_4d5);
}};
function cfwebsocketinit(){
var _4db=ColdFusion.WebSocket;
ns=cf_ws;
for(var _4dc in _4db){
ns["CFWebSocketWrapper"].prototype[_4dc]=_4db[_4dc];
}
}
cfwebsocketinit();
