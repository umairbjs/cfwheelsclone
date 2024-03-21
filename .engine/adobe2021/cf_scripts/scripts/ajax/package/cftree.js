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
ColdFusion.Tree.refresh=function(_3c9){
var tree=ColdFusion.objectCache[_3c9];
var _3cb=ColdFusion.objectCache[_3c9+"collection"];
if(!tree||YAHOO.widget.TreeView.prototype.isPrototypeOf(tree)==false){
ColdFusion.handleError(null,"tree.refresh.notfound","widget",[_3c9],null,null,true);
return;
}
if(!_3cb.dynLoadFunction){
ColdFusion.Log.info("tree.refresh.statictree","widget");
return;
}
_3cb.dynLoadFunction.call(null,tree.getRoot());
ColdFusion.Log.info("tree.refresh.success","widget",[_3c9]);
};
ColdFusion.Tree.getTreeObject=function(_3cc){
if(!_3cc){
ColdFusion.handleError(null,"tree.gettreeobject.emptyname","widget",null,null,null,true);
return;
}
var _3cd=ColdFusion.objectCache[_3cc];
if(_3cd==null||YAHOO.widget.TreeView.prototype.isPrototypeOf(_3cd)==false){
ColdFusion.handleError(null,"tree.gettreeobject.notfound","widget",[_3cc],null,null,true);
return;
}
return _3cd;
};
ColdFusion.Tree.loadNodes=function(_3ce,_3cf){
var i=0;
var _3d1=ColdFusion.objectCache[_3cf.treeid+"collection"];
var tree=ColdFusion.objectCache[_3cf.treeid];
var _3d3;
var _3d4=false;
if(_3ce&&typeof (_3ce.length)=="number"&&!_3ce.toUpperCase){
if(_3ce.length>0&&typeof (_3ce[0])!="object"){
_3d4=true;
}
}else{
_3d4=true;
}
if(_3d4){
ColdFusion.handleError(tree.onbinderror,"tree.loadnodes.invalidbindvalue","widget",[_3cf.treeid]);
return;
}
if(_3cf.parent&&!_3cf.parent.isRoot()){
tree.removeChildren(_3cf.parent);
}else{
if(_3cf.parent&&_3cf.parent.hasChildren()){
tree.removeChildren(_3cf.parent);
_3cf.parent=tree.getRoot();
}
}
if(!_3cf.parent.leafnode){
for(i=0;i<_3ce.length;i++){
var _3d5=_3d1.nodeCounter++;
var node={};
node.id=_3ce[i].VALUE;
if(typeof (_3ce[i].DISPLAY)==undefined||_3ce[i].DISPLAY==null){
node.label=_3ce[i].VALUE;
}else{
node.label=_3ce[i].DISPLAY;
}
node.expand=_3ce[i].EXPAND;
node.appendkey=_3ce[i].APPENDKEY;
node.href=_3ce[i].HREF;
node.img=_3ce[i].IMG;
node.imgOpen=_3ce[i].IMGOPEN;
node.imgid="_cf_image"+_3d5;
node.spanid="_cf_span"+_3d5;
node.target=_3ce[i].TARGET;
if(_3d1.appendkey&&_3d1.appendkey==true&&node.href){
var _3d7=new String(node.href);
_3d7=_3d7.toLowerCase();
if(_3d7.indexOf("javascript")<0){
if(_3d7.indexOf("?")>=0){
node.href=_3ce[i].HREF+"&";
}else{
node.href=_3ce[i].HREF+"?";
}
node.href=node.href+"CFTREEITEMKEY="+node.id;
}
}
var _3d8="";
if(node.img){
if(_3d1.images[node.img]){
_3d8="<img src='"+_3d1.images[node.img]+"' id='"+node.imgid+"' style='border:0'/>&nbsp;";
}else{
_3d8="<img src='"+node.img+"' id='"+node.imgid+"' style='border:0'/>&nbsp;";
}
}
if(_3d1.fontname||_3d1.italic==true||_3d1.bold==true||_3d1.fontsize){
_3d8=_3d8+"<span id='"+node.spanid+"' style='";
if(_3d1.fontname){
_3d8=_3d8+"font-family:"+_3d1.fontname+";";
}
if(_3d1.italic==true){
_3d8=_3d8+"font-style:italic;";
}
if(_3d1.bold==true){
_3d8=_3d8+"font-weight:bold;";
}
if(_3d1.fontsize){
_3d8=_3d8+"font-size:"+_3d1.fontsize+";";
}
_3d8=_3d8+"'>"+node.label+"</span>";
node.label=_3d8;
}else{
node.label=_3d8+"<span id='"+node.spanid+"'  >"+node.label+"</span>";
}
node.childrenFetched=false;
var _3d9=new YAHOO.widget.TextNode(node,_3cf.parent,false);
var _3da=false;
if(_3ce[i].LEAFNODE&&_3ce[i].LEAFNODE==true){
_3da=true;
_3d9.leafnode=true;
_3d9.iconMode=1;
}
if(_3da==true||(node.expand&&node.expand==true)){
_3d9.expand();
}
}
}
if(!_3cf.parent.isRoot()){
_3cf.parent.data.childrenFetched=true;
}
if(_3cf.onCompleteCallBack){
_3cf.onCompleteCallBack.call();
}else{
_3cf.parent.tree.draw();
}
ColdFusion.Log.info("tree.loadnodes.success","widget",[_3cf.treeid]);
};
ColdFusion.Tree.onExpand=function(node){
if(node.isRoot()){
return;
}
var _3dc=ColdFusion.objectCache[node.tree.id+"collection"];
if(node.data.imgOpen&&typeof (node.leafnode)=="undefined"){
var _3dd=ColdFusion.DOM.getElement(node.data.imgid,node.tree.id);
var src;
if(_3dc.imagesopen[node.data.imgOpen]){
src=_3dc.imagesopen[node.data.imgOpen];
}else{
src=node.data.imgOpen;
}
_3dd.src=src;
}
if(_3dc.cache==false&&node.data.childrenFetched==false&&_3dc.dynLoadFunction){
node.tree.removeChildren(node);
}
};
ColdFusion.Tree.onCollapse=function(node){
if(node.isRoot()){
return;
}
var _3e0=ColdFusion.objectCache[node.tree.id+"collection"];
if(node.data.img){
var _3e1=ColdFusion.DOM.getElement(node.data.imgid,node.tree.id);
var src;
if(_3e0.images[node.data.img]){
src=_3e0.images[node.data.img];
}else{
src=node.data.img;
}
_3e1.src=src;
}
node.data.childrenFetched=false;
};
ColdFusion.Tree.formPath=function(node,_3e4){
var _3e5=ColdFusion.objectCache[node.tree.id+"collection"];
if(_3e5.completepath==true&&node.isRoot()){
return "";
}else{
if(_3e5.completepath==false&&node.parent.isRoot()){
return "";
}
}
if(!_3e4){
_3e4=node;
}
var _3e6=ColdFusion.Tree.formPath(node.parent,_3e4);
_3e6=_3e6+node.data.id;
if(_3e4.data.id!=node.data.id){
_3e6=_3e6+_3e5.delimiter;
}
return _3e6;
};
ColdFusion.Tree.onLabelClick=function(node){
var _3e8="";
var _3e9=ColdFusion.objectCache[node.tree.id+"collection"];
var _3e8=ColdFusion.Tree.formPath(node);
if(_3e9.prevspanid){
var _3ea=ColdFusion.DOM.getElement(_3e9.prevspanid,node.tree.id);
if(_3ea.style){
_3ea.style.backgroundColor=_3e9.prevspanbackground;
}
}
var _3eb=ColdFusion.DOM.getElement(node.data.spanid,node.tree.id);
if(_3eb&&_3eb.style){
_3e9.prevspanbackground=_3eb.style.backgroundColor;
}
_3eb.style.backgroundColor="lightblue";
_3e9.prevspanid=node.data.spanid;
node.tree._cf_path=_3e8;
node.tree._cf_node=node.data.id;
var val="PATH="+_3e8+"; NODE="+node.data.id;
updateHiddenValue(val,_3e9.formname,_3e9.formparamname);
ColdFusion.Tree.fireSelectionChangeEvent(node.tree.id,_3e9.formname);
};
ColdFusion.Tree.fireSelectionChangeEvent=function(id,_3ee){
ColdFusion.Log.info("tree.fireselectionchangeevent.fire","widget",[id]);
ColdFusion.Event.callBindHandlers(id,_3ee,"change");
};
ColdFusion.Tree.getObject=function(_3ef){
var _3f0={};
_3f0.id=_3ef.value;
if(_3ef.href&&_3ef.href!="null"){
_3f0.href=_3ef.href;
}
_3f0.target=_3ef.target;
_3f0.label=_3ef.label;
_3f0.display=_3ef.display;
_3f0.img=_3ef.img;
_3f0.imgOpen=_3ef.imgOpen;
_3f0.imgid=_3ef.imgid;
_3f0.spanid=_3ef.spanid;
_3f0.childrenfetched=_3ef.childrenfetched;
return _3f0;
};
ColdFusion.Tree.initializeTree=function(_3f1,_3f2,_3f3,bold,_3f5,_3f6,_3f7,_3f8,_3f9,_3fa,_3fb,_3fc){
var _3fd=new YAHOO.widget.TreeView(_3f1);
_3fd.subscribe("expand",ColdFusion.Tree.onExpand);
_3fd.subscribe("collapse",ColdFusion.Tree.onCollapse);
_3fd.subscribe("labelClick",ColdFusion.Tree.onLabelClick);
_3fd._cf_getAttribute=function(_3fe){
_3fe=_3fe.toUpperCase();
if(_3fe=="PATH"){
return _3fd._cf_path;
}else{
if(_3fe=="NODE"){
return _3fd._cf_node;
}else{
return null;
}
}
};
_3fd.onbinderror=_3fa;
ColdFusion.objectCache[_3f1]=_3fd;
var _3ff=new ColdFusion.Tree.AttributesCollection();
_3ff.cache=_3f2;
_3ff.italic=_3f3;
_3ff.bold=bold;
_3ff.completepath=_3f5;
_3ff.delimiter=_3f7;
_3ff.appendkey=_3f6;
_3ff.formname=_3f8;
_3ff.formparamname=_3f9;
_3ff.fontsize=_3fb;
_3ff.fontname=_3fc;
ColdFusion.objectCache[_3f1+"collection"]=_3ff;
ColdFusion.Log.info("tree.initializetree.success","widget",[_3f1]);
return _3fd;
};
