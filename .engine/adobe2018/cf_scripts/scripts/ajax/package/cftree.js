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
ColdFusion.Tree.refresh=function(_173){
var tree=ColdFusion.objectCache[_173];
var _175=ColdFusion.objectCache[_173+"collection"];
if(!tree||YAHOO.widget.TreeView.prototype.isPrototypeOf(tree)==false){
ColdFusion.handleError(null,"tree.refresh.notfound","widget",[_173],null,null,true);
return;
}
if(!_175.dynLoadFunction){
ColdFusion.Log.info("tree.refresh.statictree","widget");
return;
}
_175.dynLoadFunction.call(null,tree.getRoot());
ColdFusion.Log.info("tree.refresh.success","widget",[_173]);
};
ColdFusion.Tree.getTreeObject=function(_176){
if(!_176){
ColdFusion.handleError(null,"tree.gettreeobject.emptyname","widget",null,null,null,true);
return;
}
var _177=ColdFusion.objectCache[_176];
if(_177==null||YAHOO.widget.TreeView.prototype.isPrototypeOf(_177)==false){
ColdFusion.handleError(null,"tree.gettreeobject.notfound","widget",[_176],null,null,true);
return;
}
return _177;
};
ColdFusion.Tree.loadNodes=function(_178,_179){
var i=0;
var _17b=ColdFusion.objectCache[_179.treeid+"collection"];
var tree=ColdFusion.objectCache[_179.treeid];
var _17d;
var _17e=false;
if(_178&&typeof (_178.length)=="number"&&!_178.toUpperCase){
if(_178.length>0&&typeof (_178[0])!="object"){
_17e=true;
}
}else{
_17e=true;
}
if(_17e){
ColdFusion.handleError(tree.onbinderror,"tree.loadnodes.invalidbindvalue","widget",[_179.treeid]);
return;
}
if(_179.parent&&!_179.parent.isRoot()){
tree.removeChildren(_179.parent);
}else{
if(_179.parent&&_179.parent.hasChildren()){
tree.removeChildren(_179.parent);
_179.parent=tree.getRoot();
}
}
if(!_179.parent.leafnode){
for(i=0;i<_178.length;i++){
var _17f=_17b.nodeCounter++;
var node={};
node.id=_178[i].VALUE;
if(typeof (_178[i].DISPLAY)==undefined||_178[i].DISPLAY==null){
node.label=_178[i].VALUE;
}else{
node.label=_178[i].DISPLAY;
}
node.expand=_178[i].EXPAND;
node.appendkey=_178[i].APPENDKEY;
node.href=_178[i].HREF;
node.img=_178[i].IMG;
node.imgOpen=_178[i].IMGOPEN;
node.imgid="_cf_image"+_17f;
node.spanid="_cf_span"+_17f;
node.target=_178[i].TARGET;
if(_17b.appendkey&&_17b.appendkey==true&&node.href){
var _181=new String(node.href);
_181=_181.toLowerCase();
if(_181.indexOf("javascript")<0){
if(_181.indexOf("?")>=0){
node.href=_178[i].HREF+"&";
}else{
node.href=_178[i].HREF+"?";
}
node.href=node.href+"CFTREEITEMKEY="+node.id;
}
}
var _182="";
if(node.img){
if(_17b.images[node.img]){
_182="<img src='"+_17b.images[node.img]+"' id='"+node.imgid+"' style='border:0'/>&nbsp;";
}else{
_182="<img src='"+node.img+"' id='"+node.imgid+"' style='border:0'/>&nbsp;";
}
}
if(_17b.fontname||_17b.italic==true||_17b.bold==true||_17b.fontsize){
_182=_182+"<span id='"+node.spanid+"' style='";
if(_17b.fontname){
_182=_182+"font-family:"+_17b.fontname+";";
}
if(_17b.italic==true){
_182=_182+"font-style:italic;";
}
if(_17b.bold==true){
_182=_182+"font-weight:bold;";
}
if(_17b.fontsize){
_182=_182+"font-size:"+_17b.fontsize+";";
}
_182=_182+"'>"+node.label+"</span>";
node.label=_182;
}else{
node.label=_182+"<span id='"+node.spanid+"'  >"+node.label+"</span>";
}
node.childrenFetched=false;
var _183=new YAHOO.widget.TextNode(node,_179.parent,false);
var _184=false;
if(_178[i].LEAFNODE&&_178[i].LEAFNODE==true){
_184=true;
_183.leafnode=true;
_183.iconMode=1;
}
if(_184==true||(node.expand&&node.expand==true)){
_183.expand();
}
}
}
if(!_179.parent.isRoot()){
_179.parent.data.childrenFetched=true;
}
if(_179.onCompleteCallBack){
_179.onCompleteCallBack.call();
}else{
_179.parent.tree.draw();
}
ColdFusion.Log.info("tree.loadnodes.success","widget",[_179.treeid]);
};
ColdFusion.Tree.onExpand=function(node){
if(node.isRoot()){
return;
}
var _186=ColdFusion.objectCache[node.tree.id+"collection"];
if(node.data.imgOpen&&typeof (node.leafnode)=="undefined"){
var _187=ColdFusion.DOM.getElement(node.data.imgid,node.tree.id);
var src;
if(_186.imagesopen[node.data.imgOpen]){
src=_186.imagesopen[node.data.imgOpen];
}else{
src=node.data.imgOpen;
}
_187.src=src;
}
if(_186.cache==false&&node.data.childrenFetched==false&&_186.dynLoadFunction){
node.tree.removeChildren(node);
}
};
ColdFusion.Tree.onCollapse=function(node){
if(node.isRoot()){
return;
}
var _18a=ColdFusion.objectCache[node.tree.id+"collection"];
if(node.data.img){
var _18b=ColdFusion.DOM.getElement(node.data.imgid,node.tree.id);
var src;
if(_18a.images[node.data.img]){
src=_18a.images[node.data.img];
}else{
src=node.data.img;
}
_18b.src=src;
}
node.data.childrenFetched=false;
};
ColdFusion.Tree.formPath=function(node,_18e){
var _18f=ColdFusion.objectCache[node.tree.id+"collection"];
if(_18f.completepath==true&&node.isRoot()){
return "";
}else{
if(_18f.completepath==false&&node.parent.isRoot()){
return "";
}
}
if(!_18e){
_18e=node;
}
var _190=ColdFusion.Tree.formPath(node.parent,_18e);
_190=_190+node.data.id;
if(_18e.data.id!=node.data.id){
_190=_190+_18f.delimiter;
}
return _190;
};
ColdFusion.Tree.onLabelClick=function(node){
var _192="";
var _193=ColdFusion.objectCache[node.tree.id+"collection"];
var _192=ColdFusion.Tree.formPath(node);
if(_193.prevspanid){
var _194=ColdFusion.DOM.getElement(_193.prevspanid,node.tree.id);
if(_194.style){
_194.style.backgroundColor=_193.prevspanbackground;
}
}
var _195=ColdFusion.DOM.getElement(node.data.spanid,node.tree.id);
if(_195&&_195.style){
_193.prevspanbackground=_195.style.backgroundColor;
}
_195.style.backgroundColor="lightblue";
_193.prevspanid=node.data.spanid;
node.tree._cf_path=_192;
node.tree._cf_node=node.data.id;
var val="PATH="+_192+"; NODE="+node.data.id;
updateHiddenValue(val,_193.formname,_193.formparamname);
ColdFusion.Tree.fireSelectionChangeEvent(node.tree.id,_193.formname);
};
ColdFusion.Tree.fireSelectionChangeEvent=function(id,_198){
ColdFusion.Log.info("tree.fireselectionchangeevent.fire","widget",[id]);
ColdFusion.Event.callBindHandlers(id,_198,"change");
};
ColdFusion.Tree.getObject=function(_199){
var _19a={};
_19a.id=_199.value;
if(_199.href&&_199.href!="null"){
_19a.href=_199.href;
}
_19a.target=_199.target;
_19a.label=_199.label;
_19a.display=_199.display;
_19a.img=_199.img;
_19a.imgOpen=_199.imgOpen;
_19a.imgid=_199.imgid;
_19a.spanid=_199.spanid;
_19a.childrenfetched=_199.childrenfetched;
return _19a;
};
ColdFusion.Tree.initializeTree=function(_19b,_19c,_19d,bold,_19f,_1a0,_1a1,_1a2,_1a3,_1a4,_1a5,_1a6){
var _1a7=new YAHOO.widget.TreeView(_19b);
_1a7.subscribe("expand",ColdFusion.Tree.onExpand);
_1a7.subscribe("collapse",ColdFusion.Tree.onCollapse);
_1a7.subscribe("labelClick",ColdFusion.Tree.onLabelClick);
_1a7._cf_getAttribute=function(_1a8){
_1a8=_1a8.toUpperCase();
if(_1a8=="PATH"){
return _1a7._cf_path;
}else{
if(_1a8=="NODE"){
return _1a7._cf_node;
}else{
return null;
}
}
};
_1a7.onbinderror=_1a4;
ColdFusion.objectCache[_19b]=_1a7;
var _1a9=new ColdFusion.Tree.AttributesCollection();
_1a9.cache=_19c;
_1a9.italic=_19d;
_1a9.bold=bold;
_1a9.completepath=_19f;
_1a9.delimiter=_1a1;
_1a9.appendkey=_1a0;
_1a9.formname=_1a2;
_1a9.formparamname=_1a3;
_1a9.fontsize=_1a5;
_1a9.fontname=_1a6;
ColdFusion.objectCache[_19b+"collection"]=_1a9;
ColdFusion.Log.info("tree.initializetree.success","widget",[_19b]);
return _1a7;
};
