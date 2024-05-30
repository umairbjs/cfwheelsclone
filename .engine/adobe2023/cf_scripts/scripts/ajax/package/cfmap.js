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
ColdFusion.Map._init=function(_3bb,_3bc,_3bd,type,_3bf,_3c0,_3c1,_3c2,_3c3,_3c4,_3c5,_3c6,_3c7,_3c8,_3c9,_3ca,_3cb,_3cc,_3cd,_3ce,_3cf,_3d0,_3d1,_3d2,_3d3,_3d4,_3d5,_3d6,_3d7,_3d8,_3d9){
var _3da=null;
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(_3db){
if(_3d9<1){
_3ce=_3db.coords.latitude;
_3cf=_3db.coords.longitude;
_3cd=null;
}
if(_3d9!==0){
if(_3d9<0){
_3d9=_3d9*-1;
}
_3d3[_3d9-1].latitude=_3db.coords.latitude;
_3d3[_3d9-1].longitude=_3db.coords.longitude;
}
_3da=ColdFusion.Map.init(_3bb,_3bc,_3bd,type,_3bf,_3c0,_3c1,_3c2,_3c3,_3c4,_3c5,_3c6,_3c7,_3c8,_3c9,_3ca,_3cb,_3cc,_3cd,_3ce,_3cf,_3d0,_3d1,_3d2,_3d3,_3d4,_3d5,_3d6,_3d7,_3d8);
},function(_3dc){
_3da=ColdFusion.Map.init(_3bb,_3bc,_3bd,type,_3bf,_3c0,_3c1,_3c2,_3c3,_3c4,_3c5,_3c6,_3c7,_3c8,_3c9,_3ca,_3cb,_3cc,_3cd,_3ce,_3cf,_3d0,_3d1,_3d2,_3d3,_3d4,_3d5,_3d6,_3d7,_3d8);
});
}else{
_3da=ColdFusion.Map.init(_3bb,_3bc,_3bd,type,_3bf,_3c0,_3c1,_3c2,_3c3,_3c4,_3c5,_3c6,_3c7,_3c8,_3c9,_3ca,_3cb,_3cc,_3cd,_3ce,_3cf,_3d0,_3d1,_3d2,_3d3,_3d4,_3d5,_3d6,_3d7,_3d8);
}
return _3da;
};
ColdFusion.Map.init=function(_3dd,_3de,_3df,type,_3e1,_3e2,_3e3,_3e4,_3e5,_3e6,_3e7,_3e8,_3e9,_3ea,_3eb,_3ec,_3ed,_3ee,_3ef,_3f0,_3f1,_3f2,_3f3,_3f4,_3f5,_3f6,_3f7,_3f8,_3f9,_3fa){
var _3fb={divName:_3dd,type:type,layout:"fit",renderTo:_3dd,centerAddress:_3ef,centerLatitude:_3f0,centerLongitude:_3f1,markerItems:_3f5,onLoad:_3f6,onError:_3f7,showCenterMarker:_3ea,showAllMarker:_3eb,markerColor:_3f3,markerIcon:_3f4,markerBindListener:_3f9,initShow:_3e4};
if(_3df!=null&&typeof (_3df)!="undefined"){
_3fb.width=_3df;
}else{
_3fb.width=400;
}
if(_3de!=null&&typeof (_3de)!="undefined"){
_3fb.height=_3de;
}else{
_3fb.height=400;
}
if(_3e1!=null&&typeof (_3e1)!="undefined"){
_3fb.zoomLevel=_3e1;
}else{
_3fb.zoomLevel=3;
}
_3fb.hideBorders=_3e3;
if(!_3e3){
if(_3e2==null||typeof _3e2==="undefined"||_3e2.length==0){
_3e2=" ";
}
_3fb.title=_3e2;
_3fb.collapsible=_3e5;
}
if(_3f3==null&&_3f4==null){
_3fb.markerColor="#00FF00";
}
var _3fc=new Ext.Panel(_3fb);
ColdFusion.objectCache[_3dd]=_3fb;
_3fb.mapPanel=_3fc;
var _3fd=["enableDragging"];
var swz=false;
if(_3e6){
swz=true;
}
if(_3e7){
_3fd.push("enableDoubleClickZoom");
}else{
_3fd.push("disableDoubleClickZoom");
}
if(_3e8){
_3fd.push("enableContinuousZoom");
}else{
_3fd.push("disableContinuousZoom");
}
var _3ff=["NonExistantControl"];
if(_3e9){
_3ff.push("scaleControl");
}
var mtc=false;
var mtco="";
if(_3ed&&_3ed.toUpperCase()=="BASIC"){
mtc=true;
mtco="google.maps.MapTypeControlStyle.HORIZONTAL_BAR";
}else{
if(_3ed&&_3ed.toUpperCase()=="ADVANCED"){
mtc="true";
mtco=google.maps.MapTypeControlStyle.DROPDOWN_MENU;
}
}
if(_3ec){
_3ff.push("overviewMapControl");
}
var zc=false;
var zco="";
if(_3ee!=null&&_3ee!="undefined"){
_3ee=_3ee.toUpperCase();
switch(_3ee){
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
var _404=[];
for(i=0;i<_3fb.markerItems.length;i++){
var _405=$MAP.parseMarker(_3fb.markerItems[i],_3dd);
_404.push(_405);
}
if(_3f2==null||typeof _3f2==="undefined"){
_3f2="";
}
var _406={marker:{title:_3f2,iscenter:true}};
if(_3fb.markerColor!=null&&typeof _3fb.markerColor!="undefined"){
_406.marker.markercolor=_3fb.markerColor;
}else{
if(_3fb.markerIcon!=null&&typeof _3fb.markerIcon!="undefined"){
_406.marker.markericon=_3fb.markerIcon;
}
}
if(_3f8===true){
_406.listeners={click:$MAP.markerOnClickHandler};
if(_3fa!=null){
_406.marker.markerwindowcontent=_3fa;
}else{
_406.marker.bindcallback=_3f9;
}
_406.marker.name=_3dd;
}
if(_3fb.centerAddress!=null&&typeof _3fb.centerAddress==="string"){
_406.geoCodeAddr=_3fb.centerAddress;
_406.marker.address=_3fb.centerAddress;
}else{
_406.lat=_3fb.centerLatitude;
_406.lng=_3fb.centerLongitude;
_406.marker.address=_3fb.centerAddress;
}
var _407=false;
if(_3ed!=null&&typeof _3ed=="string"&&_3ed.toUpperCase()=="ADVANCED"){
_407=true;
}
var _408=new Ext.ux.GMapPanel({xtype:"gmappanel",region:"center",zoomLevel:_3fb.zoomLevel,gmapType:_3fb.type,mapConfOpts:_3fd,mapControls:_3ff,setCenter:_406,markers:_404,border:!_3fb.hideBorders,onLoadhandler:$MAP.onLoadCompleteHandler,onErrorhandler:_3f7,name:_3fb.divName,noCenterMarker:!_3ea,showAllMarker:_3eb,advanceMapTypeControl:_407,initShow:_3e4,zc:zc,zco:zco,mtc:mtc,mtco:mtco,swz:swz});
_3fc.add(_408);
_3fb.mapPanelObject=_408;
if(_3e4===false){
_3fc.hide();
}else{
_3fc.updateLayout();
}
ColdFusion.Log.info("map.initialized","widget",[_3dd]);
return _3fc;
};
$MAP.addMarker=function(name,_40a){
var _40b=$MAP.getMapPanelObject(name);
var _40c=$MAP.parseMarker(_40a,name);
var _40d=[];
_40d.push(_40c);
_40b.addMarkers(_40d);
ColdFusion.Log.info("map.addmarker.markeradded","widget",[name,_40d.length]);
};
$MAP.setCenter=function(name,_40f){
var _410=$MAP.getMapPanelObject(name);
var lat;
var lng;
if(_40f.latitude&&_40f.longitude){
if(typeof _40f.latitude!="number"||typeof _40f.longitude!="number"){
ColdFusion.handleError(null,"map.setcenter.latlngnonnumeric","widget",[name,_40f.latitude,_40f.longitude],null,null,true);
}else{
lat=_40f.latitude;
lng=_40f.longitude;
}
var _413=new google.maps.LatLng(lat,lng);
_410.getMap().setCenter(_413,_410.zoomLevel);
var _414={};
_414.markercolor="#00FF00";
_410.addMarker(new google.maps.LatLng(_40f.latitude,_40f.longitude),_414,null,true);
}else{
if(_40f.address){
if(typeof _40f.address!="string"){
ColdFusion.handleError(null,"map.setcenter.addressnotstring","widget",[name,_40f.address],null,null,true);
}else{
_410.geoCodeLookup(_40f.address,null,null,true);
}
}else{
ColdFusion.handleError(null,"map.setcenter.invalidcenter","widget",[name],null,null,true);
}
}
ColdFusion.Log.info("map.setcenter.centerset","widget",[name]);
};
$MAP.getLatitudeLongitude=function(_415,_416){
geocoder=new google.maps.Geocoder();
if(_416==null||!typeof _416==="function"){
_416=$MAP.LatitudeLongitudeHandler;
}
geocoder.geocode({"address":_415},_416);
};
$MAP.addEvent=function(name,_418,_419,_41a){
if(_418=="singlerightclick"){
_418="rightclick";
}
if(_418=="maptypechanged"){
_418="maptypeid_changed";
}
var _41b=$MAP.getMapPanelObject(name);
_41b.addEventToMap(_418,_419,_41a);
};
$MAP.setZoomLevel=function(name,_41d){
var _41e=$MAP.getMapPanelObject(name);
_41e.zoomLevel=_41d;
_41e.getMap().setZoom(_41d);
};
$MAP.getMapObject=function(name){
var _420=$MAP.getMapPanelObject(name);
if(_420!=null){
return _420.getMap();
}
};
$MAP.parseMarker=function(_421,_422){
var _423={};
if(_421.latitude&&_421.longitude){
if(typeof _421.latitude!="number"||typeof _421.longitude!="number"){
ColdFusion.handleError(null,"map.marker.latlngnonnumeric","widget",[_421.latitude,_421.longitude],null,null,true);
}else{
_423.lat=_421.latitude;
_423.lng=_421.longitude;
}
}else{
if(_421.address!=null){
if(typeof _421.address!="string"){
ColdFusion.handleError(null,"map.marker.addressnotstring","widget",[_421.address],null,null,true);
}else{
_423.address=_421.address;
}
}
}
var _424={};
if(_421.tip==null){
_424.title="";
}else{
_424.title=_421.tip;
}
if(_421.markercolor!=null&&typeof _421.markercolor!="undefined"){
_424.markercolor=_421.markercolor;
}else{
if(_421.markericon!=null&&typeof _421.markericon!="undefined"){
_424.markericon=_421.markericon;
}
}
if(_421.showmarkerwindow===true||_421.markerwindowcontent!=null){
var _425=ColdFusion.objectCache[_422];
var _426;
if(_425!=null||typeof (_425)!="undefined"){
_426=_425.markerBindListener;
}
if(_426!=null||_421.markerwindowcontent!=null){
_423.listeners={click:$MAP.markerOnClickHandler};
if(_421.markerwindowcontent!=null){
_424.markerwindowcontent=_421.markerwindowcontent;
}else{
_424.bindcallback=_426;
}
_424.name=_421.name;
}
}
_423.marker=_424;
return _423;
};
$MAP.onErrorHandler=function(name,_428){
var _429=ColdFusion.objectCache[name];
var _42a=$MAP.statusCodeObject;
var _42b=$MAP.retrieveStatueMessage(_428);
var _42c=_429.onError;
if(_42c!=null&&typeof _42c==="function"){
_42c.call(null,_428,_42b);
}else{
alert("Error: "+_42b);
}
ColdFusion.handleError(null,"map.loadMap.error","map",[name,_428,_42b],null,null,true);
};
$MAP.onLoadCompleteHandler=function(name){
var _42e=ColdFusion.objectCache[name];
var _42f=_42e.onLoad;
if(_42f!=null&&typeof _42f==="function"){
_42f.call();
}
};
$MAP.retrieveStatueMessage=function(code){
var _431;
switch(code){
case "ZERO_RESULTS":
_431=$MAP.statusCodeObject.code602;
break;
case "OVER_QUERY_LIMIT":
_431=$MAP.statusCodeObject.code620;
break;
case "REQUEST_DENIED":
_431=$MAP.statusCodeObject.code610;
break;
case "INVALID_REQUEST":
_431=$MAP.statusCodeObject.code610;
break;
}
return _431;
};
var currentopenwindow="";
$MAP.markerOnClickHandler=function(_432){
coldFusion_markerObjCache[this.name]=this.scope.marker;
if(this.bindcallback!=null&&typeof this.bindcallback=="function"){
var _433=this.address;
if(_433==null||typeof _433=="undefined"){
_433="";
}
this.bindcallback.call(null,this.name,_432.latLng.lat(),_432.latLng.lng(),_433);
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
ColdFusion.Map.loadMarkerWindowInfo=function(data,_436){
var _437=coldFusion_markerObjCache[_436._cf_marker_name];
var me=this,infoWindow=new google.maps.InfoWindow({content:data,position:_437.position});
if(currentopenwindow!=""){
currentopenwindow.close();
}
infoWindow.open(_437.map);
currentopenwindow=infoWindow;
};
ColdFusion.Map.bindOnErrorHandler=function(data,_43a){
ColdFusion.handleError(null,"map.markerbind.binderror","widget",[data],null,null,true);
};
$MAP.getMapPanelObject=function(name){
var _43c=ColdFusion.objectCache[name];
if(_43c==null||typeof (_43c)=="undefined"){
ColdFusion.handleError(null,"map.getmappanelobject.notfound","widget",[name],null,null,true);
}
return _43c.mapPanelObject;
};
$MAP.refresh=function(name){
var _43e=ColdFusion.objectCache[name];
if(_43e==null||typeof (_43e)=="undefined"){
ColdFusion.handleError(null,"map.refresh.notfound","widget",[name],null,null,true);
}
_43e.mapPanel.updateLayout();
};
$MAP.hide=function(name){
var _440=ColdFusion.objectCache[name];
if(_440==null||typeof (_440)=="undefined"){
ColdFusion.handleError(null,"map.hide.notfound","widget",[name],null,null,true);
}
_440.mapPanel.hide();
};
$MAP.show=function(name){
var _442=ColdFusion.objectCache[name];
if(_442==null||typeof (_442)=="undefined"){
ColdFusion.handleError(null,"map.show.notfound","widget",[name],null,null,true);
}
_442.mapPanel.show();
_442.mapPanel.updateLayout();
};
