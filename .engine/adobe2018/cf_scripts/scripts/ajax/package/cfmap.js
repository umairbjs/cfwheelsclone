/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Map){
ColdFusion.Map={};
}
var coldFusion_markerObjCache=new Array();
var $MAP=ColdFusion.Map;
$MAP.statusCodeObject={code200:"A directions request could not be successfully parsed. For example, the request may have been rejected if it contained more than the maximum number of waypoints allowed.",code400:"A directions request could not be successfully parsed. For example, the request may have been rejected if it contained more than the maximum number of waypoints allowed.",code500:"A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known",code601:"The HTTP query parameter was either missing or had no value. For geocoding requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input",code602:"No corresponding geographic location could be found for the specified address. This may be due to the fact that the address is relatively new, or it may be incorrect",code603:"The geocode for the given address or the route for the given directions query cannot be returned due to legal or contractual reasons",code604:"The GDirections object could not compute directions between the points mentioned in the query. This is usually because there is no route available between the two points, or because we do not have data for routing in that region",code610:"This request was invalid.",code620:"The webpage has gone over the requests limit in too short a period of time."};
ColdFusion.Map._init=function(_5ec,_5ed,_5ee,type,_5f0,_5f1,_5f2,_5f3,_5f4,_5f5,_5f6,_5f7,_5f8,_5f9,_5fa,_5fb,_5fc,_5fd,_5fe,_5ff,_600,_601,_602,_603,_604,_605,_606,_607,_608,_609,_60a){
var _60b=null;
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(_60c){
if(_60a<1){
_5ff=_60c.coords.latitude;
_600=_60c.coords.longitude;
_5fe=null;
}
if(_60a!==0){
if(_60a<0){
_60a=_60a*-1;
}
_604[_60a-1].latitude=_60c.coords.latitude;
_604[_60a-1].longitude=_60c.coords.longitude;
}
_60b=ColdFusion.Map.init(_5ec,_5ed,_5ee,type,_5f0,_5f1,_5f2,_5f3,_5f4,_5f5,_5f6,_5f7,_5f8,_5f9,_5fa,_5fb,_5fc,_5fd,_5fe,_5ff,_600,_601,_602,_603,_604,_605,_606,_607,_608,_609);
},function(_60d){
_60b=ColdFusion.Map.init(_5ec,_5ed,_5ee,type,_5f0,_5f1,_5f2,_5f3,_5f4,_5f5,_5f6,_5f7,_5f8,_5f9,_5fa,_5fb,_5fc,_5fd,_5fe,_5ff,_600,_601,_602,_603,_604,_605,_606,_607,_608,_609);
});
}else{
_60b=ColdFusion.Map.init(_5ec,_5ed,_5ee,type,_5f0,_5f1,_5f2,_5f3,_5f4,_5f5,_5f6,_5f7,_5f8,_5f9,_5fa,_5fb,_5fc,_5fd,_5fe,_5ff,_600,_601,_602,_603,_604,_605,_606,_607,_608,_609);
}
return _60b;
};
ColdFusion.Map.init=function(_60e,_60f,_610,type,_612,_613,_614,_615,_616,_617,_618,_619,_61a,_61b,_61c,_61d,_61e,_61f,_620,_621,_622,_623,_624,_625,_626,_627,_628,_629,_62a,_62b){
var _62c={divName:_60e,type:type,layout:"fit",renderTo:_60e,centerAddress:_620,centerLatitude:_621,centerLongitude:_622,markerItems:_626,onLoad:_627,onError:_628,showCenterMarker:_61b,showAllMarker:_61c,markerColor:_624,markerIcon:_625,markerBindListener:_62a,initShow:_615};
if(_610!=null&&typeof (_610)!="undefined"){
_62c.width=_610;
}else{
_62c.width=400;
}
if(_60f!=null&&typeof (_60f)!="undefined"){
_62c.height=_60f;
}else{
_62c.height=400;
}
if(_612!=null&&typeof (_612)!="undefined"){
_62c.zoomLevel=_612;
}else{
_62c.zoomLevel=3;
}
_62c.hideBorders=_614;
if(!_614){
if(_613==null||typeof _613==="undefined"||_613.length==0){
_613=" ";
}
_62c.title=_613;
_62c.collapsible=_616;
}
if(_624==null&&_625==null){
_62c.markerColor="#00FF00";
}
var _62d=new Ext.Panel(_62c);
ColdFusion.objectCache[_60e]=_62c;
_62c.mapPanel=_62d;
var _62e=["enableDragging"];
var swz=false;
if(_617){
swz=true;
}
if(_618){
_62e.push("enableDoubleClickZoom");
}else{
_62e.push("disableDoubleClickZoom");
}
if(_619){
_62e.push("enableContinuousZoom");
}else{
_62e.push("disableContinuousZoom");
}
var _630=["NonExistantControl"];
if(_61a){
_630.push("scaleControl");
}
var mtc=false;
var mtco="";
if(_61e&&_61e.toUpperCase()=="BASIC"){
mtc=true;
mtco="google.maps.MapTypeControlStyle.HORIZONTAL_BAR";
}else{
if(_61e&&_61e.toUpperCase()=="ADVANCED"){
mtc="true";
mtco=google.maps.MapTypeControlStyle.DROPDOWN_MENU;
}
}
if(_61d){
_630.push("overviewMapControl");
}
var zc=false;
var zco="";
if(_61f!=null&&_61f!="undefined"){
_61f=_61f.toUpperCase();
switch(_61f){
case "SMALL":
zco=google.maps.ZoomControlStyle.SMALL;
zc=true;
break;
case "SMALL3D":
zco=google.maps.ZoomControlStyle.SMALL;
zc=true;
break;
case "LARGE":
zco=google.maps.ZoomControlStyle.LARGE;
zc=true;
break;
case "LARGE3D":
zco=google.maps.ZoomControlStyle.LARGE;
zc=true;
break;
}
}
var _635=[];
for(i=0;i<_62c.markerItems.length;i++){
var _636=$MAP.parseMarker(_62c.markerItems[i],_60e);
_635.push(_636);
}
if(_623==null||typeof _623==="undefined"){
_623="";
}
var _637={marker:{title:_623,iscenter:true}};
if(_62c.markerColor!=null&&typeof _62c.markerColor!="undefined"){
_637.marker.markercolor=_62c.markerColor;
}else{
if(_62c.markerIcon!=null&&typeof _62c.markerIcon!="undefined"){
_637.marker.markericon=_62c.markerIcon;
}
}
if(_629===true){
_637.listeners={click:$MAP.markerOnClickHandler};
if(_62b!=null){
_637.marker.markerwindowcontent=_62b;
}else{
_637.marker.bindcallback=_62a;
}
_637.marker.name=_60e;
}
if(_62c.centerAddress!=null&&typeof _62c.centerAddress==="string"){
_637.geoCodeAddr=_62c.centerAddress;
_637.marker.address=_62c.centerAddress;
}else{
_637.lat=_62c.centerLatitude;
_637.lng=_62c.centerLongitude;
_637.marker.address=_62c.centerAddress;
}
var _638=false;
if(_61e!=null&&typeof _61e=="string"&&_61e.toUpperCase()=="ADVANCED"){
_638=true;
}
var _639=new Ext.ux.GMapPanel({xtype:"gmappanel",region:"center",zoomLevel:_62c.zoomLevel,gmapType:_62c.type,mapConfOpts:_62e,mapControls:_630,setCenter:_637,markers:_635,border:!_62c.hideBorders,onLoadhandler:$MAP.onLoadCompleteHandler,onErrorhandler:_628,name:_62c.divName,noCenterMarker:!_61b,showAllMarker:_61c,advanceMapTypeControl:_638,initShow:_615,zc:zc,zco:zco,mtc:mtc,mtco:mtco,swz:swz});
_62d.add(_639);
_62c.mapPanelObject=_639;
if(_615===false){
_62d.hide();
}else{
_62d.updateLayout();
}
ColdFusion.Log.info("map.initialized","widget",[_60e]);
return _62d;
};
$MAP.addMarker=function(name,_63b){
var _63c=$MAP.getMapPanelObject(name);
var _63d=$MAP.parseMarker(_63b,name);
var _63e=[];
_63e.push(_63d);
_63c.addMarkers(_63e);
ColdFusion.Log.info("map.addmarker.markeradded","widget",[name,_63e.length]);
};
$MAP.setCenter=function(name,_640){
var _641=$MAP.getMapPanelObject(name);
var lat;
var lng;
if(_640.latitude&&_640.longitude){
if(typeof _640.latitude!="number"||typeof _640.longitude!="number"){
ColdFusion.handleError(null,"map.setcenter.latlngnonnumeric","widget",[name,_640.latitude,_640.longitude],null,null,true);
}else{
lat=_640.latitude;
lng=_640.longitude;
}
var _644=new google.maps.LatLng(lat,lng);
_641.getMap().setCenter(_644,_641.zoomLevel);
var _645={};
_645.markercolor="#00FF00";
_641.addMarker(new google.maps.LatLng(_640.latitude,_640.longitude),_645,null,true);
}else{
if(_640.address){
if(typeof _640.address!="string"){
ColdFusion.handleError(null,"map.setcenter.addressnotstring","widget",[name,_640.address],null,null,true);
}else{
_641.geoCodeLookup(_640.address,null,null,true);
}
}else{
ColdFusion.handleError(null,"map.setcenter.invalidcenter","widget",[name],null,null,true);
}
}
ColdFusion.Log.info("map.setcenter.centerset","widget",[name]);
};
$MAP.getLatitudeLongitude=function(_646,_647){
geocoder=new google.maps.Geocoder();
if(_647==null||!typeof _647==="function"){
_647=$MAP.LatitudeLongitudeHandler;
}
geocoder.geocode({"address":_646},_647);
};
$MAP.addEvent=function(name,_649,_64a,_64b){
if(_649=="singlerightclick"){
_649="rightclick";
}
if(_649=="maptypechanged"){
_649="maptypeid_changed";
}
var _64c=$MAP.getMapPanelObject(name);
_64c.addEventToMap(_649,_64a,_64b);
};
$MAP.setZoomLevel=function(name,_64e){
var _64f=$MAP.getMapPanelObject(name);
_64f.zoomLevel=_64e;
_64f.getMap().setZoom(_64e);
};
$MAP.getMapObject=function(name){
var _651=$MAP.getMapPanelObject(name);
if(_651!=null){
return _651.getMap();
}
};
$MAP.parseMarker=function(_652,_653){
var _654={};
if(_652.latitude&&_652.longitude){
if(typeof _652.latitude!="number"||typeof _652.longitude!="number"){
ColdFusion.handleError(null,"map.marker.latlngnonnumeric","widget",[_652.latitude,_652.longitude],null,null,true);
}else{
_654.lat=_652.latitude;
_654.lng=_652.longitude;
}
}else{
if(_652.address!=null){
if(typeof _652.address!="string"){
ColdFusion.handleError(null,"map.marker.addressnotstring","widget",[_652.address],null,null,true);
}else{
_654.address=_652.address;
}
}
}
var _655={};
if(_652.tip==null){
_655.title="";
}else{
_655.title=_652.tip;
}
if(_652.markercolor!=null&&typeof _652.markercolor!="undefined"){
_655.markercolor=_652.markercolor;
}else{
if(_652.markericon!=null&&typeof _652.markericon!="undefined"){
_655.markericon=_652.markericon;
}
}
if(_652.showmarkerwindow===true||_652.markerwindowcontent!=null){
var _656=ColdFusion.objectCache[_653];
var _657;
if(_656!=null||typeof (_656)!="undefined"){
_657=_656.markerBindListener;
}
if(_657!=null||_652.markerwindowcontent!=null){
_654.listeners={click:$MAP.markerOnClickHandler};
if(_652.markerwindowcontent!=null){
_655.markerwindowcontent=_652.markerwindowcontent;
}else{
_655.bindcallback=_657;
}
_655.name=_652.name;
}
}
_654.marker=_655;
return _654;
};
$MAP.onErrorHandler=function(name,_659){
var _65a=ColdFusion.objectCache[name];
var _65b=$MAP.statusCodeObject;
var _65c=$MAP.retrieveStatueMessage(_659);
var _65d=_65a.onError;
if(_65d!=null&&typeof _65d==="function"){
_65d.call(null,_659,_65c);
}else{
alert("Error: "+_65c);
}
ColdFusion.handleError(null,"map.loadMap.error","map",[name,_659,_65c],null,null,true);
};
$MAP.onLoadCompleteHandler=function(name){
var _65f=ColdFusion.objectCache[name];
var _660=_65f.onLoad;
if(_660!=null&&typeof _660==="function"){
_660.call();
}
};
$MAP.retrieveStatueMessage=function(code){
var _662;
switch(code){
case "ZERO_RESULTS":
_662=$MAP.statusCodeObject.code602;
break;
case "OVER_QUERY_LIMIT":
_662=$MAP.statusCodeObject.code620;
break;
case "REQUEST_DENIED":
_662=$MAP.statusCodeObject.code610;
break;
case "INVALID_REQUEST":
_662=$MAP.statusCodeObject.code610;
break;
}
return _662;
};
var currentopenwindow="";
$MAP.markerOnClickHandler=function(_663){
coldFusion_markerObjCache[this.name]=this.scope.marker;
if(this.bindcallback!=null&&typeof this.bindcallback=="function"){
var _664=this.address;
if(_664==null||typeof _664=="undefined"){
_664="";
}
this.bindcallback.call(null,this.name,_663.latLng.lat(),_663.latLng.lng(),_664);
}else{
if(this.scope.statictext!=null&&typeof this.scope.statictext!="undefined"){
var me=this,infoWindow=new google.maps.InfoWindow({content:this.scope.statictext,position:this.scope.marker.position});
if(currentopenwindow!=""){
currentopenwindow.close();
}
infoWindow.open(this.scope.marker.map);
currentopenwindow=infoWindow;
}
}
};
ColdFusion.Map.loadMarkerWindowInfo=function(data,_667){
var _668=coldFusion_markerObjCache[_667._cf_marker_name];
var me=this,infoWindow=new google.maps.InfoWindow({content:data,position:_668.position});
if(currentopenwindow!=""){
currentopenwindow.close();
}
infoWindow.open(_668.map);
currentopenwindow=infoWindow;
};
ColdFusion.Map.bindOnErrorHandler=function(data,_66b){
ColdFusion.handleError(null,"map.markerbind.binderror","widget",[data],null,null,true);
};
$MAP.getMapPanelObject=function(name){
var _66d=ColdFusion.objectCache[name];
if(_66d==null||typeof (_66d)=="undefined"){
ColdFusion.handleError(null,"map.getmappanelobject.notfound","widget",[name],null,null,true);
}
return _66d.mapPanelObject;
};
$MAP.refresh=function(name){
var _66f=ColdFusion.objectCache[name];
if(_66f==null||typeof (_66f)=="undefined"){
ColdFusion.handleError(null,"map.refresh.notfound","widget",[name],null,null,true);
}
_66f.mapPanel.updateLayout();
};
$MAP.hide=function(name){
var _671=ColdFusion.objectCache[name];
if(_671==null||typeof (_671)=="undefined"){
ColdFusion.handleError(null,"map.hide.notfound","widget",[name],null,null,true);
}
_671.mapPanel.hide();
};
$MAP.show=function(name){
var _673=ColdFusion.objectCache[name];
if(_673==null||typeof (_673)=="undefined"){
ColdFusion.handleError(null,"map.show.notfound","widget",[name],null,null,true);
}
_673.mapPanel.show();
_673.mapPanel.updateLayout();
};
