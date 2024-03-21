/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.Tree){
ColdFusion.Tree={};
}
ColdFusion.Tree.AttributesCollection=function(){
this.cache=true;
this.fontname=null;
this.bold=false;
this.italic=false;
this.completepath=false;
this.appendkey=false;
this.delimiter=null;
this.formname=null;
this.fontsize=null;
this.formparamname=null;
this.prevspanid=null;
this.prevspanbackground=null;
this.images={};
this.images.folder=_cf_ajaxscriptsrc+"/resources/cf/images/FolderClose.gif";
this.images.cd=_cf_ajaxscriptsrc+"/resources/cf/images/Cd.png";
this.images.computer=_cf_ajaxscriptsrc+"/resources/cf/images/Computer.png";
this.images.document=_cf_ajaxscriptsrc+"/resources/cf/images/Document.gif";
this.images.element=_cf_ajaxscriptsrc+"/resources/cf/images/Elements.png";
this.images.floppy=_cf_ajaxscriptsrc+"/resources/cf/images/Floppy.png";
this.images.fixed=_cf_ajaxscriptsrc+"/resources/cf/images/HardDrive.png";
this.images.remote=_cf_ajaxscriptsrc+"/resources/cf/images/NetworkDrive.png";
this.imagesopen={};
this.imagesopen.folder=_cf_ajaxscriptsrc+"/resources/cf/images/FolderOpen.gif";
this.imagesopen.cd=_cf_ajaxscriptsrc+"/resources/cf/images/Cd.png";
this.imagesopen.computer=_cf_ajaxscriptsrc+"/resources/cf/images/Computer.png";
this.imagesopen.document=_cf_ajaxscriptsrc+"/resources/cf/images/Document.gif";
this.imagesopen.element=_cf_ajaxscriptsrc+"/resources/cf/images/Elements.png";
this.imagesopen.floppy=_cf_ajaxscriptsrc+"/resources/cf/images/Floppy.png";
this.imagesopen.fixed=_cf_ajaxscriptsrc+"/resources/cf/images/HardDrive.png";
this.imagesopen.remote=_cf_ajaxscriptsrc+"/resources/cf/images/NetworkDrive.png";
this.eventcount=0;
this.eventHandlers=new Array();
this.nodeCounter=0;
};
ColdFusion.Tree.refresh=function(_6b2){
var tree=ColdFusion.objectCache[_6b2];
var _6b4=ColdFusion.objectCache[_6b2+"collection"];
if(!tree||YAHOO.widget.TreeView.prototype.isPrototypeOf(tree)==false){
ColdFusion.handleError(null,"tree.refresh.notfound","widget",[_6b2],null,null,true);
return;
}
if(!_6b4.dynLoadFunction){
ColdFusion.Log.info("tree.refresh.statictree","widget");
return;
}
_6b4.dynLoadFunction.call(null,tree.getRoot());
ColdFusion.Log.info("tree.refresh.success","widget",[_6b2]);
};
ColdFusion.Tree.getTreeObject=function(_6b5){
if(!_6b5){
ColdFusion.handleError(null,"tree.gettreeobject.emptyname","widget",null,null,null,true);
return;
}
var _6b6=ColdFusion.objectCache[_6b5];
if(_6b6==null||YAHOO.widget.TreeView.prototype.isPrototypeOf(_6b6)==false){
ColdFusion.handleError(null,"tree.gettreeobject.notfound","widget",[_6b5],null,null,true);
return;
}
return _6b6;
};
ColdFusion.Tree.loadNodes=function(_6b7,_6b8){
var i=0;
var _6ba=ColdFusion.objectCache[_6b8.treeid+"collection"];
var tree=ColdFusion.objectCache[_6b8.treeid];
var _6bc;
var _6bd=false;
if(_6b7&&typeof (_6b7.length)=="number"&&!_6b7.toUpperCase){
if(_6b7.length>0&&typeof (_6b7[0])!="object"){
_6bd=true;
}
}else{
_6bd=true;
}
if(_6bd){
ColdFusion.handleError(tree.onbinderror,"tree.loadnodes.invalidbindvalue","widget",[_6b8.treeid]);
return;
}
if(_6b8.parent&&!_6b8.parent.isRoot()){
tree.removeChildren(_6b8.parent);
}else{
if(_6b8.parent&&_6b8.parent.hasChildren()){
tree.removeChildren(_6b8.parent);
_6b8.parent=tree.getRoot();
}
}
if(!_6b8.parent.leafnode){
for(i=0;i<_6b7.length;i++){
var _6be=_6ba.nodeCounter++;
var node={};
node.id=_6b7[i].VALUE;
if(typeof (_6b7[i].DISPLAY)==undefined||_6b7[i].DISPLAY==null){
node.label=_6b7[i].VALUE;
}else{
node.label=_6b7[i].DISPLAY;
}
node.expand=_6b7[i].EXPAND;
node.appendkey=_6b7[i].APPENDKEY;
node.href=_6b7[i].HREF;
node.img=_6b7[i].IMG;
node.imgOpen=_6b7[i].IMGOPEN;
node.imgid="_cf_image"+_6be;
node.spanid="_cf_span"+_6be;
node.target=_6b7[i].TARGET;
if(_6ba.appendkey&&_6ba.appendkey==true&&node.href){
var _6c0=new String(node.href);
_6c0=_6c0.toLowerCase();
if(_6c0.indexOf("javascript")<0){
if(_6c0.indexOf("?")>=0){
node.href=_6b7[i].HREF+"&";
}else{
node.href=_6b7[i].HREF+"?";
}
node.href=node.href+"CFTREEITEMKEY="+node.id;
}
}
var _6c1="";
if(node.img){
if(_6ba.images[node.img]){
_6c1="<img src='"+_6ba.images[node.img]+"' id='"+node.imgid+"' style='border:0'/>&nbsp;";
}else{
_6c1="<img src='"+node.img+"' id='"+node.imgid+"' style='border:0'/>&nbsp;";
}
}
if(_6ba.fontname||_6ba.italic==true||_6ba.bold==true||_6ba.fontsize){
_6c1=_6c1+"<span id='"+node.spanid+"' style='";
if(_6ba.fontname){
_6c1=_6c1+"font-family:"+_6ba.fontname+";";
}
if(_6ba.italic==true){
_6c1=_6c1+"font-style:italic;";
}
if(_6ba.bold==true){
_6c1=_6c1+"font-weight:bold;";
}
if(_6ba.fontsize){
_6c1=_6c1+"font-size:"+_6ba.fontsize+";";
}
_6c1=_6c1+"'>"+node.label+"</span>";
node.label=_6c1;
}else{
node.label=_6c1+"<span id='"+node.spanid+"'  >"+node.label+"</span>";
}
node.childrenFetched=false;
var _6c2=new YAHOO.widget.TextNode(node,_6b8.parent,false);
var _6c3=false;
if(_6b7[i].LEAFNODE&&_6b7[i].LEAFNODE==true){
_6c3=true;
_6c2.leafnode=true;
_6c2.iconMode=1;
}
if(_6c3==true||(node.expand&&node.expand==true)){
_6c2.expand();
}
}
}
if(!_6b8.parent.isRoot()){
_6b8.parent.data.childrenFetched=true;
}
if(_6b8.onCompleteCallBack){
_6b8.onCompleteCallBack.call();
}else{
_6b8.parent.tree.draw();
}
ColdFusion.Log.info("tree.loadnodes.success","widget",[_6b8.treeid]);
};
ColdFusion.Tree.onExpand=function(node){
if(node.isRoot()){
return;
}
var _6c5=ColdFusion.objectCache[node.tree.id+"collection"];
if(node.data.imgOpen&&typeof (node.leafnode)=="undefined"){
var _6c6=ColdFusion.DOM.getElement(node.data.imgid,node.tree.id);
var src;
if(_6c5.imagesopen[node.data.imgOpen]){
src=_6c5.imagesopen[node.data.imgOpen];
}else{
src=node.data.imgOpen;
}
_6c6.src=src;
}
if(_6c5.cache==false&&node.data.childrenFetched==false&&_6c5.dynLoadFunction){
node.tree.removeChildren(node);
}
};
ColdFusion.Tree.onCollapse=function(node){
if(node.isRoot()){
return;
}
var _6c9=ColdFusion.objectCache[node.tree.id+"collection"];
if(node.data.img){
var _6ca=ColdFusion.DOM.getElement(node.data.imgid,node.tree.id);
var src;
if(_6c9.images[node.data.img]){
src=_6c9.images[node.data.img];
}else{
src=node.data.img;
}
_6ca.src=src;
}
node.data.childrenFetched=false;
};
ColdFusion.Tree.formPath=function(node,_6cd){
var _6ce=ColdFusion.objectCache[node.tree.id+"collection"];
if(_6ce.completepath==true&&node.isRoot()){
return "";
}else{
if(_6ce.completepath==false&&node.parent.isRoot()){
return "";
}
}
if(!_6cd){
_6cd=node;
}
var _6cf=ColdFusion.Tree.formPath(node.parent,_6cd);
_6cf=_6cf+node.data.id;
if(_6cd.data.id!=node.data.id){
_6cf=_6cf+_6ce.delimiter;
}
return _6cf;
};
ColdFusion.Tree.onLabelClick=function(node){
var _6d1="";
var _6d2=ColdFusion.objectCache[node.tree.id+"collection"];
var _6d1=ColdFusion.Tree.formPath(node);
if(_6d2.prevspanid){
var _6d3=ColdFusion.DOM.getElement(_6d2.prevspanid,node.tree.id);
if(_6d3.style){
_6d3.style.backgroundColor=_6d2.prevspanbackground;
}
}
var _6d4=ColdFusion.DOM.getElement(node.data.spanid,node.tree.id);
if(_6d4&&_6d4.style){
_6d2.prevspanbackground=_6d4.style.backgroundColor;
}
_6d4.style.backgroundColor="lightblue";
_6d2.prevspanid=node.data.spanid;
node.tree._cf_path=_6d1;
node.tree._cf_node=node.data.id;
var val="PATH="+_6d1+"; NODE="+node.data.id;
updateHiddenValue(val,_6d2.formname,_6d2.formparamname);
ColdFusion.Tree.fireSelectionChangeEvent(node.tree.id,_6d2.formname);
};
ColdFusion.Tree.fireSelectionChangeEvent=function(id,_6d7){
ColdFusion.Log.info("tree.fireselectionchangeevent.fire","widget",[id]);
ColdFusion.Event.callBindHandlers(id,_6d7,"change");
};
ColdFusion.Tree.getObject=function(_6d8){
var _6d9={};
_6d9.id=_6d8.value;
if(_6d8.href&&_6d8.href!="null"){
_6d9.href=_6d8.href;
}
_6d9.target=_6d8.target;
_6d9.label=_6d8.label;
_6d9.display=_6d8.display;
_6d9.img=_6d8.img;
_6d9.imgOpen=_6d8.imgOpen;
_6d9.imgid=_6d8.imgid;
_6d9.spanid=_6d8.spanid;
_6d9.childrenfetched=_6d8.childrenfetched;
return _6d9;
};
ColdFusion.Tree.initializeTree=function(_6da,_6db,_6dc,bold,_6de,_6df,_6e0,_6e1,_6e2,_6e3,_6e4,_6e5){
var _6e6=new YAHOO.widget.TreeView(_6da);
_6e6.subscribe("expand",ColdFusion.Tree.onExpand);
_6e6.subscribe("collapse",ColdFusion.Tree.onCollapse);
_6e6.subscribe("labelClick",ColdFusion.Tree.onLabelClick);
_6e6._cf_getAttribute=function(_6e7){
_6e7=_6e7.toUpperCase();
if(_6e7=="PATH"){
return _6e6._cf_path;
}else{
if(_6e7=="NODE"){
return _6e6._cf_node;
}else{
return null;
}
}
};
_6e6.onbinderror=_6e3;
ColdFusion.objectCache[_6da]=_6e6;
var _6e8=new ColdFusion.Tree.AttributesCollection();
_6e8.cache=_6db;
_6e8.italic=_6dc;
_6e8.bold=bold;
_6e8.completepath=_6de;
_6e8.delimiter=_6e0;
_6e8.appendkey=_6df;
_6e8.formname=_6e1;
_6e8.formparamname=_6e2;
_6e8.fontsize=_6e4;
_6e8.fontname=_6e5;
ColdFusion.objectCache[_6da+"collection"]=_6e8;
ColdFusion.Log.info("tree.initializetree.success","widget",[_6da]);
return _6e6;
};
