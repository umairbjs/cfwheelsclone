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
ColdFusion.Map._init=function(_59,_5a,_5b,_5c,_5d,_5e,_5f,_60,_61,_62,_63,_64,_65,_66,_67,_68,_69,_6a,_6b,_6c,_6d,_6e,_6f,_70,_71,_72,_73,_74,_75,_76,_77){
var _78=null;
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(_79){
if(_77<1){
_6c=_79.coords.latitude;
_6d=_79.coords.longitude;
_6b=null;
}
if(_77!==0){
if(_77<0){
_77=_77*-1;
}
_71[_77-1].latitude=_79.coords.latitude;
_71[_77-1].longitude=_79.coords.longitude;
}
_78=ColdFusion.Map.init(_59,_5a,_5b,_5c,_5d,_5e,_5f,_60,_61,_62,_63,_64,_65,_66,_67,_68,_69,_6a,_6b,_6c,_6d,_6e,_6f,_70,_71,_72,_73,_74,_75,_76);
},function(_7a){
_78=ColdFusion.Map.init(_59,_5a,_5b,_5c,_5d,_5e,_5f,_60,_61,_62,_63,_64,_65,_66,_67,_68,_69,_6a,_6b,_6c,_6d,_6e,_6f,_70,_71,_72,_73,_74,_75,_76);
});
}else{
_78=ColdFusion.Map.init(_59,_5a,_5b,_5c,_5d,_5e,_5f,_60,_61,_62,_63,_64,_65,_66,_67,_68,_69,_6a,_6b,_6c,_6d,_6e,_6f,_70,_71,_72,_73,_74,_75,_76);
}
return _78;
};
ColdFusion.Map.init=function(_7b,_7c,_7d,_7e,_7f,_80,_81,_82,_83,_84,_85,_86,_87,_88,_89,_8a,_8b,_8c,_8d,_8e,_8f,_90,_91,_92,_93,_94,_95,_96,_97,_98){
var _99={divName:_7b,type:_7e,layout:"fit",renderTo:_7b,centerAddress:_8d,centerLatitude:_8e,centerLongitude:_8f,markerItems:_93,onLoad:_94,onError:_95,showCenterMarker:_88,showAllMarker:_89,markerColor:_91,markerIcon:_92,markerBindListener:_97,initShow:_82};
if(_7d!=null&&typeof (_7d)!="undefined"){
_99.width=_7d;
}else{
_99.width=400;
}
if(_7c!=null&&typeof (_7c)!="undefined"){
_99.height=_7c;
}else{
_99.height=400;
}
if(_7f!=null&&typeof (_7f)!="undefined"){
_99.zoomLevel=_7f;
}else{
_99.zoomLevel=3;
}
_99.hideBorders=_81;
if(!_81){
if(_80==null||typeof _80==="undefined"||_80.length==0){
_80=" ";
}
_99.title=_80;
_99.collapsible=_83;
}
if(_91==null&&_92==null){
_99.markerColor="#00FF00";
}
var _9a=new Ext.Panel(_99);
ColdFusion.objectCache[_7b]=_99;
_99.mapPanel=_9a;
var _9b=["enableDragging"];
var swz=false;
if(_84){
swz=true;
}
if(_85){
_9b.push("enableDoubleClickZoom");
}else{
_9b.push("disableDoubleClickZoom");
}
if(_86){
_9b.push("enableContinuousZoom");
}else{
_9b.push("disableContinuousZoom");
}
var _9d=["NonExistantControl"];
if(_87){
_9d.push("scaleControl");
}
var mtc=false;
var _9f="";
if(_8b&&_8b.toUpperCase()=="BASIC"){
mtc=true;
_9f="google.maps.MapTypeControlStyle.HORIZONTAL_BAR";
}else{
if(_8b&&_8b.toUpperCase()=="ADVANCED"){
mtc="true";
_9f=google.maps.MapTypeControlStyle.DROPDOWN_MENU;
}
}
if(_8a){
_9d.push("overviewMapControl");
}
var zc=false;
var zco="";
if(_8c!=null&&_8c!="undefined"){
_8c=_8c.toUpperCase();
switch(_8c){
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
var _a2=[];
for(i=0;i<_99.markerItems.length;i++){
var _a3=$MAP.parseMarker(_99.markerItems[i],_7b);
_a2.push(_a3);
}
if(_90==null||typeof _90==="undefined"){
_90="";
}
var _a4={marker:{title:_90,iscenter:true}};
if(_99.markerColor!=null&&typeof _99.markerColor!="undefined"){
_a4.marker.markercolor=_99.markerColor;
}else{
if(_99.markerIcon!=null&&typeof _99.markerIcon!="undefined"){
_a4.marker.markericon=_99.markerIcon;
}
}
if(_96===true){
_a4.listeners={click:$MAP.markerOnClickHandler};
if(_98!=null){
_a4.marker.markerwindowcontent=_98;
}else{
_a4.marker.bindcallback=_97;
}
_a4.marker.name=_7b;
}
if(_99.centerAddress!=null&&typeof _99.centerAddress==="string"){
_a4.geoCodeAddr=_99.centerAddress;
_a4.marker.address=_99.centerAddress;
}else{
_a4.lat=_99.centerLatitude;
_a4.lng=_99.centerLongitude;
_a4.marker.address=_99.centerAddress;
}
var _a5=false;
if(_8b!=null&&typeof _8b=="string"&&_8b.toUpperCase()=="ADVANCED"){
_a5=true;
}
var _a6=new Ext.ux.GMapPanel({xtype:"gmappanel",region:"center",zoomLevel:_99.zoomLevel,gmapType:_99.type,mapConfOpts:_9b,mapControls:_9d,setCenter:_a4,markers:_a2,border:!_99.hideBorders,onLoadhandler:$MAP.onLoadCompleteHandler,onErrorhandler:_95,name:_99.divName,noCenterMarker:!_88,showAllMarker:_89,advanceMapTypeControl:_a5,initShow:_82,zc:zc,zco:zco,mtc:mtc,mtco:_9f,swz:swz});
_9a.add(_a6);
_99.mapPanelObject=_a6;
if(_82===false){
_9a.hide();
}else{
_9a.updateLayout();
}
ColdFusion.Log.info("map.initialized","widget",[_7b]);
return _9a;
};
$MAP.addMarker=function(_a7,_a8){
var _a9=$MAP.getMapPanelObject(_a7);
var _aa=$MAP.parseMarker(_a8,_a7);
var _ab=[];
_ab.push(_aa);
_a9.addMarkers(_ab);
ColdFusion.Log.info("map.addmarker.markeradded","widget",[_a7,_ab.length]);
};
$MAP.setCenter=function(_ac,_ad){
var _ae=$MAP.getMapPanelObject(_ac);
var lat;
var lng;
if(_ad.latitude&&_ad.longitude){
if(typeof _ad.latitude!="number"||typeof _ad.longitude!="number"){
ColdFusion.handleError(null,"map.setcenter.latlngnonnumeric","widget",[_ac,_ad.latitude,_ad.longitude],null,null,true);
}else{
lat=_ad.latitude;
lng=_ad.longitude;
}
var _b1=new google.maps.LatLng(lat,lng);
_ae.getMap().setCenter(_b1,_ae.zoomLevel);
var _b2={};
_b2.markercolor="#00FF00";
_ae.addMarker(new google.maps.LatLng(_ad.latitude,_ad.longitude),_b2,null,true);
}else{
if(_ad.address){
if(typeof _ad.address!="string"){
ColdFusion.handleError(null,"map.setcenter.addressnotstring","widget",[_ac,_ad.address],null,null,true);
}else{
_ae.geoCodeLookup(_ad.address,null,null,true);
}
}else{
ColdFusion.handleError(null,"map.setcenter.invalidcenter","widget",[_ac],null,null,true);
}
}
ColdFusion.Log.info("map.setcenter.centerset","widget",[_ac]);
};
$MAP.getLatitudeLongitude=function(_b3,_b4){
geocoder=new google.maps.Geocoder();
if(_b4==null||!typeof _b4==="function"){
_b4=$MAP.LatitudeLongitudeHandler;
}
geocoder.geocode({"address":_b3},_b4);
};
$MAP.addEvent=function(_b5,_b6,_b7,_b8){
if(_b6=="singlerightclick"){
_b6="rightclick";
}
if(_b6=="maptypechanged"){
_b6="maptypeid_changed";
}
var _b9=$MAP.getMapPanelObject(_b5);
_b9.addEventToMap(_b6,_b7,_b8);
};
$MAP.setZoomLevel=function(_ba,_bb){
var _bc=$MAP.getMapPanelObject(_ba);
_bc.zoomLevel=_bb;
_bc.getMap().setZoom(_bb);
};
$MAP.getMapObject=function(_bd){
var _be=$MAP.getMapPanelObject(_bd);
if(_be!=null){
return _be.getMap();
}
};
$MAP.parseMarker=function(_bf,_c0){
var _c1={};
if(_bf.latitude&&_bf.longitude){
if(typeof _bf.latitude!="number"||typeof _bf.longitude!="number"){
ColdFusion.handleError(null,"map.marker.latlngnonnumeric","widget",[_bf.latitude,_bf.longitude],null,null,true);
}else{
_c1.lat=_bf.latitude;
_c1.lng=_bf.longitude;
}
}else{
if(_bf.address!=null){
if(typeof _bf.address!="string"){
ColdFusion.handleError(null,"map.marker.addressnotstring","widget",[_bf.address],null,null,true);
}else{
_c1.address=_bf.address;
}
}
}
var _c2={};
if(_bf.tip==null){
_c2.title="";
}else{
_c2.title=_bf.tip;
}
if(_bf.markercolor!=null&&typeof _bf.markercolor!="undefined"){
_c2.markercolor=_bf.markercolor;
}else{
if(_bf.markericon!=null&&typeof _bf.markericon!="undefined"){
_c2.markericon=_bf.markericon;
}
}
if(_bf.showmarkerwindow===true||_bf.markerwindowcontent!=null){
var _c3=ColdFusion.objectCache[_c0];
var _c4;
if(_c3!=null||typeof (_c3)!="undefined"){
_c4=_c3.markerBindListener;
}
if(_c4!=null||_bf.markerwindowcontent!=null){
_c1.listeners={click:$MAP.markerOnClickHandler};
if(_bf.markerwindowcontent!=null){
_c2.markerwindowcontent=_bf.markerwindowcontent;
}else{
_c2.bindcallback=_c4;
}
_c2.name=_bf.name;
}
}
_c1.marker=_c2;
return _c1;
};
$MAP.onErrorHandler=function(_c5,_c6){
var _c7=ColdFusion.objectCache[_c5];
var _c8=$MAP.statusCodeObject;
var _c9=$MAP.retrieveStatueMessage(_c6);
var _ca=_c7.onError;
if(_ca!=null&&typeof _ca==="function"){
_ca.call(null,_c6,_c9);
}else{
alert("Error: "+_c9);
}
ColdFusion.handleError(null,"map.loadMap.error","map",[_c5,_c6,_c9],null,null,true);
};
$MAP.onLoadCompleteHandler=function(_cb){
var _cc=ColdFusion.objectCache[_cb];
var _cd=_cc.onLoad;
if(_cd!=null&&typeof _cd==="function"){
_cd.call();
}
};
$MAP.retrieveStatueMessage=function(_ce){
var _cf;
switch(_ce){
case "ZERO_RESULTS":
_cf=$MAP.statusCodeObject.code602;
break;
case "OVER_QUERY_LIMIT":
_cf=$MAP.statusCodeObject.code620;
break;
case "REQUEST_DENIED":
_cf=$MAP.statusCodeObject.code610;
break;
case "INVALID_REQUEST":
_cf=$MAP.statusCodeObject.code610;
break;
}
return _cf;
};
var currentopenwindow="";
$MAP.markerOnClickHandler=function(_d0){
coldFusion_markerObjCache[this.name]=this.scope.marker;
if(this.bindcallback!=null&&typeof this.bindcallback=="function"){
var _d1=this.address;
if(_d1==null||typeof _d1=="undefined"){
_d1="";
}
this.bindcallback.call(null,this.name,_d0.latLng.lat(),_d0.latLng.lng(),_d1);
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
ColdFusion.Map.loadMarkerWindowInfo=function(_d3,_d4){
var _d5=coldFusion_markerObjCache[_d4._cf_marker_name];
var me=this,infoWindow=new google.maps.InfoWindow({content:_d3,position:_d5.position});
if(currentopenwindow!=""){
currentopenwindow.close();
}
infoWindow.open(_d5.map);
currentopenwindow=infoWindow;
};
ColdFusion.Map.bindOnErrorHandler=function(_d7,_d8){
ColdFusion.handleError(null,"map.markerbind.binderror","widget",[_d7],null,null,true);
};
$MAP.getMapPanelObject=function(_d9){
var _da=ColdFusion.objectCache[_d9];
if(_da==null||typeof (_da)=="undefined"){
ColdFusion.handleError(null,"map.getmappanelobject.notfound","widget",[_d9],null,null,true);
}
return _da.mapPanelObject;
};
$MAP.refresh=function(_db){
var _dc=ColdFusion.objectCache[_db];
if(_dc==null||typeof (_dc)=="undefined"){
ColdFusion.handleError(null,"map.refresh.notfound","widget",[_db],null,null,true);
}
_dc.mapPanel.updateLayout();
};
$MAP.hide=function(_dd){
var _de=ColdFusion.objectCache[_dd];
if(_de==null||typeof (_de)=="undefined"){
ColdFusion.handleError(null,"map.hide.notfound","widget",[_dd],null,null,true);
}
_de.mapPanel.hide();
};
$MAP.show=function(_df){
var _e0=ColdFusion.objectCache[_df];
if(_e0==null||typeof (_e0)=="undefined"){
ColdFusion.handleError(null,"map.show.notfound","widget",[_df],null,null,true);
}
_e0.mapPanel.show();
_e0.mapPanel.updateLayout();
};
