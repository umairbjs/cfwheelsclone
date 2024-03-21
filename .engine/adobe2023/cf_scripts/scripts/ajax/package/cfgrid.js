/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
cfinitgrid=function(){
Ext.override(Ext.form.field.Number,{decimalPrecision:6});
if(!ColdFusion.Grid){
ColdFusion.Grid={};
}
var $G=ColdFusion.Grid;
if(!$G.GridBindelementsMap){
$G.GridBindelementsMap={};
}
var $L=ColdFusion.Log;
$G.init=function(id,_86,_87,_88,_89,_8a,_8b,_8c,_8d,_8e,_8f,_90,_91,_92,_93,_94,_95,_96,_97,_98,_99,_9a,_9b,_9c,_9d,_9e,_9f,_a0,_a1,_a2){
var _a3;
var _a4;
var _a5=false;
if(_96&&typeof (_96)!="undefined"){
_a4=_96;
_a5=true;
}else{
_a4="rowmodel";
_a4=new Ext.selection.RowModel({mode:"SINGLE"});
}
var _a6=_8d;
var _a7={store:_8e,columns:_8d,selModel:_a4,autoSizeColumns:_8b,autoSizeHeaders:_8b,stripeRows:_91,autoExpandColumnId:_8c};
if(_a0!=null&&typeof _a0!="undefined"){
_a7.plugins=_a0;
}
var _a8=ColdFusion.objectCache[id];
var _a9=document.getElementById(_a8.gridId);
if(_a9!=null){
var _aa=_a9.style.cssText;
if(typeof _aa=="undefined"){
_aa="";
}
_aa="width:"+_8f+"px;"+_aa;
_a9.style.cssText=_aa;
}
_a7.width=_8f;
if(_8b===true){
_a7.viewConfig={forceFit:true};
_a7.forceFit=true;
}else{
if(_96&&typeof (_96)!="undefined"){
_a7.autoExpandColumn=_8c;
}else{
_a7.autoExpandColumn=_8c;
}
}
if(_90){
_a7.height=_90;
}else{
_a7.autoHeight=true;
var _ab=".x-grid3-header {position: relative;}";
Ext.util.CSS.createStyleSheet(_ab,"_cf_grid"+id);
}
if(_98&&typeof (_98)!="undefined"){
_a7.features={ftype:"grouping",groupHeaderTpl:"{columnName}: {groupValue} ({rows.length} items)"};
}
_a7.title=_99;
_a7.collapsible=_97;
if(_97&&_99==null){
_a7.title="  ";
}
var _ac=ColdFusion.objectCache[id];
_ac.bindOnLoad=_8a;
_ac.dynamic=_88;
_ac.styles=_92;
_ac.grouping=_98;
_ac.onLoadFunction=_9f;
_ac.multiRowSelection=_a5;
_a7.renderTo=_ac.gridId;
Ext.onReady(function(){
_a7.dockedItems={xtype:"toolbar",dock:"top"};
_a7.tbar=new Ext.Toolbar({hidden:true});
if(_88){
_a7.bbar=new Ext.PagingToolbar({pageSize:_93,store:_8e});
if(_9d&&(_9a||_9b)){
var _ad=_a7.bbar;
if(_9a){
_ad.add({xtype:"button",text:_9a,handler:$G.insertRow,scope:_ac});
_ad.add({xtype:"button",text:" save ",handler:$G.saveNewRecord,scope:_ac});
_ad.add({xtype:"button",text:" cancel ",handler:$G.cancelNewRecord,scope:_ac});
}
if(_9b){
_ad.add({xtype:"button",text:_9b,handler:$G.deleteRow,scope:_ac});
}
}
}
if(_89&&!_88){
var _ae=new Ext.Toolbar();
if(_9a||_9b){
if(_9a){
_ae.add({xtype:"button",text:_9a,handler:$G.insertRow,scope:_ac});
}
if(_9b){
_ae.add({xtype:"button",text:_9b,handler:$G.deleteRow,scope:_ac});
}
}else{
var _ae=new Ext.Toolbar({hidden:true});
}
_a7.bbar=_ae;
}
_8e.pageSize=_93;
var fn=function(){
_a3=Ext.create("Ext.grid.Panel",_a7);
$G.Ext_caseInsensitive_sorting();
_8e.addListener("load",$G.Actions.onLoad,_ac,{delay:50});
_a3.view.addListener("beforeshow",function(_b0){
var _b1=_a6.getColumnCount();
for(var i=0;i<_b1;i++){
if("CFGRIDROWINDEX"==_a6.getDataIndex(i)){
_b0.remove(_b0.items["items"][i]);
break;
}
}
},this);
_ac.grid=_a3;
if(!_88){
_8e.addListener("load",$G.Actions.onLoad,_ac,{delay:50});
_8e.load();
}
if(_88){
_8e._cf_errorHandler=_9e;
_8e.proxy._cf_actions=_ac;
if(_ac.bindOnLoad){
_8e.load({params:{start:0,limit:_93}});
}else{
_ac.bindOnLoad=true;
}
}else{
$G.applyStyles(_ac);
}
if(_a1){
ColdFusion.Bind.register(_a1,{actions:_ac},$G.bindHandler,false);
}
$L.info("grid.init.created","widget",[id]);
_ac.init(id,_86,_87,_9c,_88,_89,_9d,_9e,_95,_93,_94,_98);
};
if(_88&&_a2){
setTimeout(fn,0);
}else{
fn();
}
});
};
$G.applyStyles=function(_b3){
Ext.util.CSS.createStyleSheet(_b3.styles);
_b3.stylesApplied=true;
};
$G.bindHandler=function(e,_b5){
$G.refresh(_b5.actions.id,_b5.actions.preservePageOnSort);
};
$G.bindHandler._cf_bindhandler=true;
$G.refresh=function(_b6,_b7){
var _b8=ColdFusion.objectCache[_b6];
if(_b8&&$G.Actions.prototype.isPrototypeOf(_b8)==true){
var _b9=_b8.grid.getStore();
if(_b8.dynamic){
_b8.editOldValue=null;
_b8.selectedRow=-1;
var _ba=$G.GridBindelementsMap[_b6];
if(_ba){
var url=_b9.proxy.url;
var _bc=_ba.split(";");
for(i=0;i<_bc.length;i++){
var _bd=_bc[i].split(",");
indx=url.indexOf("&"+_bd[0]+"=");
var _be=0;
if(indx<1){
indx=url.indexOf(_bd[0]+"=");
_be=indx;
}else{
_be=indx+1;
}
url1=url.substring(0,indx);
nxtindx=url.indexOf("&",_be);
url2=url.substring(nxtindx);
var val=_bd[2];
var _c0="";
if(_bd[2]&&_bd[2].endsWith("()")){
val=_bd[2].substring(0,val.length-2);
_c0=window[val]();
}else{
if(_bd[2]){
_c0=ColdFusion.Bind.getBindElementValue(_bd[1],val,_bd[3]);
}else{
_c0=_bd[1];
}
}
url=url1+"&"+_bd[0]+"="+_c0+url2;
}
_b9.proxy.url=url;
}
if(_b7){
_b9.reload();
}else{
if(_b9.lastOptions){
_b9.lastOptions.page=1;
}
_b9.currentPage=1;
_b9.reload({params:{start:0,limit:_b8.pageSize}});
}
}
}else{
ColdFusion.handleError(null,"grid.refresh.notfound","widget",[_b6],null,null,true);
return;
}
if(_b8.multiRowSelection){
}
$L.info("grid.refresh.success","widget",[_b6]);
};
$G.Ext_caseInsensitive_sorting=function(){
Ext.data.Store.prototype.sortData=function(f,_c2){
_c2=_c2||"ASC";
var st=this.fields.get(f).sortType;
var fn=function(r1,r2){
var v1=st(r1.data[f]),v2=st(r2.data[f]);
if(v1.toLowerCase){
v1=v1.toLowerCase();
v2=v2.toLowerCase();
}
return v1>v2?1:(v1<v2?-1:0);
};
this.data.sort(_c2,fn);
if(this.snapshot&&this.snapshot!=this.data){
this.snapshot.sort(_c2,fn);
}
};
};
$G.getTopToolbar=function(_c8){
var _c9=ColdFusion.objectCache[_c8];
if(!_c9){
ColdFusion.handleError(null,"grid.getTopToolbar.notfound","widget",[_c8],null,null,true);
return;
}
return _c9.grid.getDockedItems()[1];
};
$G.showTopToolbar=function(_ca){
var _cb=ColdFusion.objectCache[_ca];
if(!_cb){
ColdFusion.handleError(null,"grid.showTopToolbar.notfound","widget",[_ca],null,null,true);
return;
}
var _cc=_cb.grid.getDockedItems()[1];
if(!_cc){
ColdFusion.handleError(null,"grid.showTopToolbar.toolbarNotDefined","widget",[_ca],null,null,true);
return;
}
_cc.show();
};
$G.hideTopToolbar=function(_cd){
var _ce=ColdFusion.objectCache[_cd];
if(!_ce){
ColdFusion.handleError(null,"grid.hideTopToolbar.notfound","widget",[_cd],null,null,true);
return;
}
var _cf=_ce.grid.getDockedItems()[1];
if(!_cf){
ColdFusion.handleError(null,"grid.hideTopToolbar.toolbarNotDefined","widget",[_cd],null,null,true);
return;
}
_cf.hide();
};
$G.refreshTopToolbar=function(_d0){
var _d1=ColdFusion.objectCache[_d0];
if(!_d1){
ColdFusion.handleError(null,"grid.refreshTopToolbar.notfound","widget",[_d0],null,null,true);
return;
}
var _d2=_d1.grid.getDockedItems()[1];
if(!_d2){
ColdFusion.handleError(null,"grid.refreshTopToolbar.toolbarNotDefined","widget",[_d0],null,null,true);
return;
}
_d2.doLayout();
if(_d2.isVisible()==false){
_d2.show();
}
};
$G.getBottomToolbar=function(_d3){
var _d4=ColdFusion.objectCache[_d3];
if(!_d4){
ColdFusion.handleError(null,"grid.getBottomToolbar.notfound","widget",[_d3],null,null,true);
return;
}
return _d4.grid.getDockedItems()[_d4.grid.getDockedItems().length-1];
};
$G.showBottomToolbar=function(_d5){
var _d6=ColdFusion.objectCache[_d5];
if(!_d6){
ColdFusion.handleError(null,"grid.showBottomToolbar.notfound","widget",[_d5],null,null,true);
return;
}
var _d7=_d6.grid.getDockedItems()[_d6.grid.getDockedItems().length-1];
if(!_d7){
ColdFusion.handleError(null,"grid.showBottomToolbar.toolbarNotDefined","widget",[_d5],null,null,true);
return;
}
_d7.show();
};
$G.hideBottomToolbar=function(_d8){
var _d9=ColdFusion.objectCache[_d8];
if(!_d9){
ColdFusion.handleError(null,"grid.hideBottomToolbar.notfound","widget",[_d8],null,null,true);
return;
}
var _da=_d9.grid.getDockedItems()[_d9.grid.getDockedItems().length-1];
if(!_da){
ColdFusion.handleError(null,"grid.hideBottomToolbar.toolbarNotDefined","widget",[_d8],null,null,true);
return;
}
_da.hide();
};
$G.refreshBottomToolbar=function(_db){
var _dc=ColdFusion.objectCache[_db];
if(!_dc){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.notfound","widget",[_db],null,null,true);
return;
}
var _dd=_dc.grid.getDockedItems()[_dc.grid.getDockedItems().length-1];
if(!_dd){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.toolbarNotDefined","widget",[_db],null,null,true);
return;
}
_dd.doLayout();
if(_dd.isVisible()==false){
_dd.show();
}
};
$G.sort=function(_de,_df,_e0){
var _e1=ColdFusion.objectCache[_de];
if(!_e1){
ColdFusion.handleError(null,"grid.sort.notfound","widget",[_de],null,null,true);
return;
}
_df=_df.toUpperCase();
var _e2=-1;
var _e3=_e1.grid.columns;
for(var i=0;i<_e3.length-1;i++){
if(_df==_e3[i].colName){
_e2=i;
break;
}
}
if(_e2==-1){
ColdFusion.handleError(null,"grid.sort.colnotfound","widget",[_df,_de],null,null,true);
return;
}
if(!_e0){
_e0="ASC";
}
_e0=_e0.toUpperCase();
if(_e0!="ASC"&&_e0!="DESC"){
ColdFusion.handleError(null,"grid.sort.invalidsortdir","widget",[_e0,_de],null,null,true);
return;
}
var _e5=_e1.grid.getStore();
_e5.sort(_df,_e0);
};
$G.getGridObject=function(_e6){
if(!_e6){
ColdFusion.handleError(null,"grid.getgridobject.missinggridname","widget",null,null,null,true);
return;
}
var _e7=ColdFusion.objectCache[_e6];
if(_e7==null||$G.Actions.prototype.isPrototypeOf(_e7)==false){
ColdFusion.handleError(null,"grid.getgridobject.notfound","widget",[_e6],null,null,true);
return;
}
return _e7.grid;
};
$G.getSelectedRows=function(_e8){
if(!_e8){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _e9=ColdFusion.objectCache[_e8];
var _ea=new Array();
var _eb=_e9.grid.getSelectionModel();
var _ec=_eb.selected;
var _ed=_e9.grid.columns;
var _ee=0;
if(_e9.multiRowSelection===true&&_e9.dynamic===false){
_ee++;
}
for(i=0;i<_ec.length;i++){
var _ef=_ec.items[i].data;
var _f0={};
for(var _f1=_ee;_f1<_ed.length-1;_f1++){
var key=_ed[_f1].dataIndex;
_f0[key]=_ef[key];
}
_ea[i]=_f0;
}
return _ea;
};
$G.clearSelectedRows=function(_f3){
if(!_f3){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _f4=ColdFusion.objectCache[_f3];
var _f5=_f4.grid.getSelectionModel();
_f5.deselectAll();
if(_f4.multiRowSelection){
}
};
$G.Actions=function(_f6){
this.gridId=_f6;
this.init=$G.Actions.init;
this.onChangeHandler=$G.Actions.onChangeHandler;
this.onChangeHandler_MultiRowsDelete=$G.Actions.onChangeHandler_MultiRowsDelete;
this.selectionChangeEvent=new ColdFusion.Event.CustomEvent("cfGridSelectionChange",_f6);
this.fireSelectionChangeEvent=$G.fireSelectionChangeEvent;
this._cf_getAttribute=$G.Actions._cf_getAttribute;
this._cf_register=$G.Actions._cf_register;
this.loaded=false;
};
$G.Actions.init=function(id,_f8,_f9,_fa,_fb,_fc,_fd,_fe,_ff,_100,_101,_102){
this.id=id;
this.gridName=_f8;
this.formId=_f9;
this.form=document.getElementById(_f9);
this.cellClickInfo=_fa;
this.edit=_fc;
this.onChangeFunction=_fd;
this.onErrorFunction=_fe;
this.preservePageOnSort=_ff;
this.pageSize=_100;
this.selectedRow=-1;
this.selectOnLoad=_101;
this.grouping=_102;
this.grid.addListener("cellclick",$G.cellClick,this,true);
this.editField=document.createElement("input");
this.editField.setAttribute("name",_f8);
this.editField.setAttribute("type","hidden");
this.form.appendChild(this.editField);
if(_fc){
if(!_fb){
var _103=this.grid.columns;
this.editFieldPrefix="__CFGRID__EDIT__=";
var i=0;
var _105=_103.length-1;
if(this.multiRowSelection===true&&this.dynamic===false){
i++;
_105--;
}
this.editFieldPrefix+=_105+$G.Actions.fieldSep;
var _106=true;
for(i;i<_103.length-1;i++){
if(!_106){
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldPrefix+=_103[i].colName;
this.editFieldPrefix+=$G.Actions.valueSep;
if(_103[i].getEditor()){
this.editFieldPrefix+="Y";
}else{
this.editFieldPrefix+="N";
}
_106=false;
}
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldState=[];
this.editFieldState.length=this.grid.getStore().getTotalCount();
$G.Actions.computeEditField(this);
this.insertInProgress=false;
this.insertEvent=null;
this.grid.addListener("beforeedit",$G.Actions.beforeEdit,this);
this.grid.addListener("edit",$G.Actions.afterEdit,this,true);
}
if(_fb){
this.grid.getStore().addListener("beforeload",$G.Actions.beforeLoad,this,true);
}
this.grid.getSelectionModel().addListener("select",$G.rowSelect,this,true);
this.grid.getSelectionModel().addListener("beforerowselect",$G.beforeRowSelect,this,true);
};
$G.Actions.beforeLoad=function(_107,_108){
var _109=_107.sortInfo;
var _10a=(_108.sorters&&_108.sorters[0]&&_108.sorters[0].property!=this.sortCol);
if(_10a&&!this.preservePageOnSort){
_108.start=0;
_108.page=1;
_107.currentPage=1;
}
if(_108.sorters&&_108.sorters[0]){
this.sortCol=_108.sorters[0].property;
this.sortDir=_108.sorters[0].direction;
}
};
$G.Actions.onLoad=function(_10b){
this.editOldValue=null;
this.selectedRow=-1;
this.insertInProgress=false;
var _10c=0;
if((this.bindOnLoad||!this.dynamic)&&this.selectOnLoad&&!this.grouping){
this.grid.getSelectionModel().select(_10c,false);
}
if(!this.gridRendered&&this.onLoadFunction&&typeof this.onLoadFunction=="function"){
this.gridRendered=true;
this.onLoadFunction.call(null,this.grid);
}
$G.applyStyles(_10b);
try{
var _10d=Ext.ComponentQuery.query("tabpanel");
if(_10d&&this.grid&&this.loaded==false){
for(var i=0;i<_10d.length;i++){
if(_10d[i].body.dom.innerHTML.indexOf(this.grid.id)>0){
_10d[i].updateLayout();
this.loaded=true;
}
}
}
}
catch(exception){
}
};
$G.Actions._cf_getAttribute=function(_10f){
_10f=_10f.toUpperCase();
var _110=this.selectedRow;
var _111=null;
if(_110!=0&&(!_110||_110==-1)){
return _111;
}
var ds=this.grid.getStore();
var _113=(this.dynamic)?ds.getAt(_110):ds.getById(_110);
_111=_113.get(_10f);
return _111;
};
$G.Actions._cf_register=function(_114,_115,_116){
this.selectionChangeEvent.subscribe(_115,_116);
};
$G.rowSelect=function(_117,_118,row){
var _11a="";
var _11b=_117.selected.items;
if(_11b.length==0){
return;
}
var _11c=_11b[0].get("CFGRIDROWINDEX")||row;
if(_11c&&(_11c+"").indexOf("cf_gridmodel")==0){
_11c=row;
}
if(this.selectedRow!=_11c){
this.selectedRow=_11c;
var _11d=true;
for(col in _11b[0].data){
if(col=="CFGRIDROWINDEX"){
continue;
}
if(typeof col=="undefined"||col=="undefined"){
continue;
}
if(!_11d){
_11a+="; ";
}
_11a+="__CFGRID__COLUMN__="+col+"; ";
_11a+="__CFGRID__DATA__="+_11b[0].data[col];
_11d=false;
}
this.fireSelectionChangeEvent();
this.insertInProgress=false;
}
};
$G.beforeRowSelect=function(_11e,row){
var ds=this.grid.getStore();
var _121=ds.getAt(row);
return !$G.isNullRow(_121.data);
};
$G.isNullRow=function(data){
var _123=true;
for(col in data){
if(data[col]!=null){
_123=false;
break;
}
}
return _123;
};
$G.fireSelectionChangeEvent=function(){
$L.info("grid.fireselectionchangeevent.fire","widget",[this.id]);
this.selectionChangeEvent.fire();
};
$G.cellClick=function(grid,td,_126,_127,tr,_129,e,_12b){
var _12c=this.cellClickInfo.colInfo[_126];
if(_12c){
var _12d=grid.getSelectionModel().selected;
var url;
if(_12d.items.length>0&&_12d.items[0].data){
url=_12d.items[0].data[_12c.href.toUpperCase()];
}
if(!url){
url=_12c.href;
}
var _12f=_12c.hrefKey;
var _130=_12c.target;
var _131=this.appendKey;
if(this.cellClickInfo.appendKey){
var _132;
if(_12f||_12f==0){
var _133=grid.getStore().getAt(_129);
var _134=grid.panel.columns[_12f].dataIndex;
_132=_133.get(_134);
}else{
var _135=this.grid.columns;
_132=_12d.items[0].get(_135[0].dataIndex);
for(var i=1;i<_135.length-1;i++){
_132+=","+_12d.items[0].get(_135[i].dataIndex);
}
}
if(url.indexOf("?")!=-1){
url+="&CFGRIDKEY="+_132;
}else{
url+="?CFGRIDKEY="+_132;
}
}
if(_130){
_130=_130.toLowerCase();
if(_130=="_top"){
_130="top";
}else{
if(_130=="_parent"){
_130="parent";
}else{
if(_130=="_self"){
_130=window.name;
}else{
if(_130=="_blank"){
window.open(encodeURI(url));
return;
}
}
}
}
if(!parent[_130]){
ColdFusion.handleError(null,"grid.cellclick.targetnotfound","widget",[_130]);
return;
}
parent[_130].location=encodeURI(url);
}else{
window.location=encodeURI(url);
}
}
};
$G.insertRow=function(){
if(this.insertInProgress&&this.dynamic){
ColdFusion.handleError(null,"Multiple row insert is not supported","Grid",[this.gridId],null,null,true);
return;
}
var _137={action:"I",values:[]};
var _138=this.grid.columns;
var _139=this.grid.getStore();
var _13a={};
var _13b="{";
for(var i=0;i<_138.length-1;i++){
var _13d="";
_137.values[i]=[_13d,_13d];
_13a[_138[i].dataIndex]=_13d;
_13b=_13b+"\""+_138[i].colName+"\":\""+_13d+"\",";
}
_13a["CFGRIDROWINDEX"]=_139.getCount()+1;
_13b=_13b+"\"CFGRIDROWINDEX\":\""+(_139.getCount()+1)+"\"}";
_139.add(JSON.parse(_13b));
_139.getAt(_139.getCount()-1).data["CFGRIDROWINDEX"]=_139.getCount();
if(this.dynamic==true){
this.selectedRow=_139.getCount();
}
this.editFieldState.push(_137);
this.grid.getSelectionModel().select(_139.getCount()-1);
this.insertInProgress=true;
$G.Actions.computeEditField(this);
};
$G.saveNewRecord=function(){
if(!this.insertInProgress){
return;
}
var _13e=this.selectedRow;
var _13f=this.insertEvent;
if(_13e==-1){
return;
}
if(this.onChangeFunction){
this.onChangeHandler("I",_13e-1,_13f,$G.insertRowCallback);
}else{
if(this.dynamic==false){
var _140=this.grid.getStore();
var _141=_13f.record;
var _142=new Array(1);
_142[0]=_141;
var _143=_140.getAt(this.selectedRow-1);
_140.remove(_143);
_140.add(_142);
}
}
this.insertInProgress=false;
this.insertEvent=null;
};
$G.cancelNewRecord=function(){
if(!this.insertInProgress){
return;
}
this.editFieldState.pop();
var _144=this.grid.getStore();
var _145=_144.getAt(this.selectedRow-1);
_144.remove(_145);
this.insertInProgress=false;
this.insertEvent=null;
this.selectedRow=this.selectedrow-1;
};
$G.deleteRow=function(){
var _146=null;
var _147;
if(this.multiRowSelection===true){
var _148=this.grid.getSelectionModel();
_146=_148.selected;
}
_146=this.grid.getSelectionModel().getSelection();
if(_146!=null&&_146.length<2){
_146=null;
}
if(_146==null){
_147=this.selectedRow;
}
if(_147==-1&&_146==null){
return;
}
if(this.onChangeFunction){
if(_146!=null){
this.onChangeHandler_MultiRowsDelete("D",_146,null,$G.deleteRowCallback);
}else{
this.onChangeHandler("D",_147,null,$G.deleteRowCallback);
}
}else{
if(!this.dynamic){
var _149=this.grid.getStore();
if(_146!=null){
for(i=0;i<_146.length;i++){
var _14a=_149.indexOf(_146[i]);
var _14b=this.editFieldState[_14a];
if(_14b){
_14b.action="D";
}else{
_14b=$G.Actions.initEditState(this,"D",_146[i],_14a+1);
}
}
for(i=0;i<_146.length;i++){
_149.remove(_146[i]);
}
}else{
var _14b=this.editFieldState[_147-1];
if(_14b){
_14b.action="D";
}else{
var _14c=this.grid.getStore().getById(_147);
_14b=$G.Actions.initEditState(this,"D",_14c,_147);
}
_149.remove(this.grid.getSelectionModel().getSelection());
}
$G.Actions.computeEditField(this);
this.grid.editingPlugin.completeEdit();
this.selectedRow=-1;
}
}
};
$G.deleteRowCallback=function(_14d,_14e){
var _14f=_14e._cf_grid.getStore();
var _150=_14e._cf_grid_properties;
var _14e=_14f.lastOptions;
var key="start";
if(_14f.getCount()==1){
if(_14e.start>=_14e.limit){
_14e.start=_14e.start-_14e.limit;
}
_14e.page=_14e.page-1;
_14f.reload(_14e);
}else{
_14f.reload();
}
if(_150.multiRowSelection){
var _152=_150.grid.getView().headerCt(0);
if(_152!=null){
var _153=Ext.Element.get(_152).first();
if(_153){
_153.replaceClass("x-grid3-hd-checker-on");
}
}
}
};
$G.insertRowCallback=function(_154,_155){
var _156=_155._cf_grid.getStore();
var _157=_155._cf_grid.actions;
_156.reload();
};
$G.Actions.beforeEdit=function(_158,e,_15a){
if($G.isNullRow(e.record.data)){
return false;
}
this.editColumn=e.column;
this.editOldValue=e.value;
};
$G.Actions.afterEdit=function(_15b,_15c,_15d){
var _15e=_15c.value;
if(_15e==this.editOldValue){
return;
}
if(this.insertInProgress==false&&this.onChangeFunction){
this.onChangeHandler("U",this.selectedRow,_15c);
}else{
if(!this.dynamic){
rowidx=_15c.rowIdx;
if(!rowidx&&rowidx!=0){
rowidx=_15c.row;
}
var _15f=$G.computeActualRow_editField(this.editFieldState,_15c.record.data.CFGRIDROWINDEX);
var _160=this.editFieldState[_15f-1];
var _161=_15c.colIdx;
if(!_161&&_161!=0){
_161=_15c.column;
}
var cols=_15b.grid.columns;
var _163=_15c.field;
for(i=0;i<cols.length;i++){
var col=cols[i];
if(_163==col.colName){
_161=i;
}
}
if(_160){
if(this.multiRowSelection===true&&this.insertInProgress==true){
_161=_161-1;
}
_160.values[_161][1]=_15e;
}else{
var _165=this.grid.getStore().getById(_15c.record.data.CFGRIDROWINDEX);
_160=$G.Actions.initEditState(this,"U",_165,_15f);
var _166=this.editOldValue+"";
if(_15c.column.type=="date"){
if(_166&&typeof _166=="string"){
_166=new Date(_166);
}
var _167="F, j Y H:i:s";
if(_15c.column&&_15c.column.format){
_167=_15c.column.format;
}
_160.values[_161][1]=Ext.Date.format(_15e,_167);
_160.values[_161][0]=_166?Ext.Date.format(_166,_167):_166;
}else{
_160.values[_161][0]=_166;
_160.values[_161][1]=_15e;
}
}
$G.Actions.computeEditField(this);
}
}
this.editOldValue=null;
this.fireSelectionChangeEvent();
};
$G.computeActualRow_editField=function(_168,_169){
if(_168.length==_169){
return _169;
}
var _16a=0;
var _16b=0;
for(;_16b<_168.length&&_16a<_169;_16b++){
var _16c=_168[_16b];
if(!_16c||_16c.action!="D"){
_16a++;
}
}
return _16b;
};
$G.Actions.onChangeHandler=function(_16d,_16e,_16f,_170){
var _171={};
var _172={};
var data="";
if(null==_16f){
data=this.grid.getStore().getAt(_16e).data;
}else{
data=_16f?_16f.record.data:this.grid.getStore().getAt(_16e).data;
}
for(col in data){
_171[col]=data[col];
}
if(_16d=="U"){
if((_16f.value==null||_16f.value=="")&&(_16f.originalValue==null||_16f.originalValue=="")){
return;
}
if(_16f.value&&_16f.column.type=="date"){
if(typeof _16f.originalValue=="string"){
var _174=new Date(_16f.originalValue);
}
if(_174!=null&&_174.getElapsed(_16f.value)==0){
return;
}else{
_171[_16f.field]=_16f.originalValue;
var _175="F, j Y H:i:s";
if(_16f.column.format){
_175=_16f.column.format;
}
_172[_16f.field]=Ext.Date.format(_16f.value,_175);
}
}else{
_171[_16f.field]=_16f.originalValue;
_172[_16f.field]=_16f.value;
}
}
this.onChangeFunction(_16d,_171,_172,_170,this.grid,this.onErrorFunction,this);
};
$G.Actions.onChangeHandler_MultiRowsDelete=function(_176,_177,_178,_179){
var _17a=new Array();
var _17b={};
for(i=0;i<_177.length;i++){
_17a[i]=_177.items[i].data;
}
this.onChangeFunction(_176,_17a,_17b,_179,this.grid,this.onErrorFunction,this);
};
$G.Actions.initEditState=function(_17c,_17d,_17e,_17f){
var _180={action:_17d,values:[]};
var _181=_17c.grid.columns;
var _182=_181.length-1;
_180.values.length=_182;
var i=0;
if(_17c.multiRowSelection===true&&_17c.dynamic===false){
i=i++;
}
for(i;i<_182;i++){
var _184=_17e.get(_181[i].colName);
_180.values[i]=[_184,_184];
}
_17c.editFieldState[_17f-1]=_180;
return _180;
};
$G.Actions.fieldSep=eval("'\\u0001'");
$G.Actions.valueSep=eval("'\\u0002'");
$G.Actions.nullValue=eval("'\\u0003'");
$G.Actions.computeEditField=function(_185){
if(_185.dynamic){
return;
}
var _186=_185.editFieldPrefix;
var _187=_185.editFieldState;
var _188=_185.grid.columns;
var _189=0;
var _18a="";
for(var i=0;i<_187.length;i++){
var _18c=_187[i];
if(_18c){
_189++;
_18a+=$G.Actions.fieldSep;
_18a+=_18c.action+$G.Actions.valueSep;
var _18d=_18c.values;
if(_185.multiRowSelection===true&&_185.dynamic===false&&_18c.action!="I"){
_18d=_18d.slice(1,_18d.length);
}
for(var j=0;j<_18d.length;j++){
if(j>0){
_18a+=$G.Actions.valueSep;
}
var _18f=($G.Actions.isNull(_18d[j][0]))?$G.Actions.nullValue:_18d[j][0];
var _190=($G.Actions.isNull(_18d[j][1]))?$G.Actions.nullValue:_18d[j][1];
var _191=j;
if(_185.multiRowSelection===true){
_191++;
}
if(_188[_191].getEditor()&&_190==$G.Actions.nullValue&&_188[_191].getEditor().xtype=="checkbox"){
_190="0";
}
if(_18c.action!="I"||(_18c.action=="I"&&_188[_191].getEditor())){
_18a+=_190;
if(_18c.action=="U"&&_188[_191].getEditor()){
_18a+=$G.Actions.valueSep+_18f;
}
}
}
}
}
_186+=_189+_18a;
_185.editField.setAttribute("value",_186);
};
$G.Actions.isNull=function(val){
var ret=(val==null||typeof (val)=="undefined"||val.length==0);
return ret;
};
$G.loadData=function(data,_195){
_195._cf_gridDataProxy.loadResponse(data,_195);
var _196=ColdFusion.objectCache[_195._cf_gridname];
$G.applyStyles(_196);
$L.info("grid.loaddata.loaded","widget",[_195._cf_gridname]);
if($G.Actions.isNull(data.TOTALROWCOUNT)==false&&data.TOTALROWCOUNT==0){
_196.fireSelectionChangeEvent();
}
};
$G.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
str+=value;
}
return str;
};
$G.formatBoolean=function(v,p,_19b){
return "<div class=\"x-grid3-check-col"+(v?"-on":"")+" x-grid3-cc-"+this.id+"\">&#160;</div>";
};
$G.formatDate=function(_19c,p,_19e){
if(_19c&&!_19c.dateFormat){
_19c=new Date(_19c);
}
var _19f=this.dateFormat?this.dateFormat:"m/d/y";
return _19c?Ext.Date.dateFormat(_19c,_19f):"";
};
$G.convertDate=function(_1a0,p,_1a2){
if(_1a0&&!_1a0.dateFormat){
_1a0=new Date(_1a0);
}
var _1a3=this.dateFormat?this.dateFormat:"m/d/y";
return _1a0;
};
$G.ExtProxy=function(_1a4,_1a5){
this.api={load:true,create:undefined,save:undefined,destroy:undefined};
$G.ExtProxy.superclass.constructor.call(this);
this.bindHandler=_1a4;
this.errorHandler=_1a5;
};
Ext.extend($G.ExtProxy,Ext.data.DataProxy,{_cf_firstLoad:true,load:function(_1a6,_1a7,_1a8,_1a9,arg){
if(!this._cf_actions.bindOnLoad){
var _1ab={"_cf_reader":_1a7,"_cf_grid_errorhandler":this.errorHandler,"_cf_scope":_1a9,"_cf_gridDataProxy":this,"_cf_gridname":this._cf_gridName,"_cf_arg":arg,"_cf_callback":_1a8,"ignoreData":true};
var data=[];
for(i=0;i<_1a6.limit;i++){
data.push(new Ext.data.Record({}));
}
this.loadResponse(data,_1ab);
this._cf_actions.bindOnLoad=true;
}else{
var _1ad=(_1a6.start/_1a6.limit)+1;
if(!_1a6.sort){
_1a6.sort="";
}
if(!_1a6.dir){
_1a6.dir="";
}
this.bindHandler(this,_1ad,_1a6.limit,_1a6.sort,_1a6.dir,this.errorHandler,_1a8,_1a9,arg,_1a7);
}
},loadResponse:function(data,_1af){
var _1b0=null;
if(_1af.ignoreData){
_1b0={success:true,records:data,totalRecords:data.length};
}else{
var _1b1;
if(!data){
_1b1="grid.extproxy.loadresponse.emptyresponse";
}else{
if(!data.TOTALROWCOUNT&&data.TOTALROWCOUNT!=0){
_1b1="grid.extproxy.loadresponse.totalrowcountmissing";
}else{
if(!ColdFusion.Util.isInteger(data.TOTALROWCOUNT)){
_1b1="grid.extproxy.loadresponse.totalrowcountinvalid";
}else{
if(!data.QUERY){
_1b1="grid.extproxy.loadresponse.querymissing";
}else{
if(!data.QUERY.COLUMNS||!ColdFusion.Util.isArray(data.QUERY.COLUMNS)||!data.QUERY.DATA||!ColdFusion.Util.isArray(data.QUERY.DATA)||(data.QUERY.DATA.length>0&&!ColdFusion.Util.isArray(data.QUERY.DATA[0]))){
_1b1="grid.extproxy.loadresponse.queryinvalid";
}
}
}
}
}
if(_1b1){
ColdFusion.handleError(_1af._cf_grid_errorHandler,_1b1,"widget");
this.fireEvent("loadexception",this,_1af,data,e);
return;
}
_1b0=_1af._cf_reader.readRecords(data);
}
this.fireEvent("load",this,_1af,_1af._cf_arg);
_1af._cf_callback.call(_1af._cf_scope,_1b0,_1af._cf_arg,true);
},update:function(_1b2){
},updateResponse:function(_1b3){
}});
$G.ExtReader=function(_1b4){
this.recordType=Ext.data.Record.create(_1b4);
};
Ext.extend($G.ExtReader,Ext.data.DataReader,{readRecords:function(_1b5){
var _1b6=[];
var cols=_1b5.QUERY.COLUMNS;
var data=_1b5.QUERY.DATA;
for(var i=0;i<data.length;i++){
var _1ba={};
for(var j=0;j<cols.length;j++){
_1ba[cols[j]]=data[i][j];
}
_1b6.push(new Ext.data.Record(_1ba));
}
return {success:true,records:_1b6,totalRecords:_1b5.TOTALROWCOUNT};
}});
$G.CheckColumn=function(_1bc){
Ext.apply(this,_1bc);
if(!this.id){
this.id=Ext.id();
}
this.renderer=this.renderer.bind(this);
};
$G.findColumnIndex=function(grid,_1be){
var _1bf=grid.headerCt.getGridColumns();
for(var i=0;i<_1bf.length;i++){
if(_1bf[i].dataIndex==_1be){
return i;
}
}
};
$G.CheckColumn.prototype={init:function(grid){
this.grid=grid;
this.count=0;
this.columnIndex=$G.findColumnIndex(this.grid,this.dataIndex);
this.grid.on("render",function(){
var view=this.grid.getView();
if(this.editable==true){
this.grid.addListener("itemmousedown",this.onMouseDown,this);
}
},this);
},onMouseDown:function(thi,_1c4,item,_1c6,e,_1c8){
var t=e.target;
if(t.className&&t.className.indexOf("x-grid-cc-"+this.id)!=-1){
e.stopEvent();
var _1ca=ColdFusion.clone(_1c4);
_1ca.data=ColdFusion.clone(_1c4.data);
this.grid.getSelectionModel().select(_1c6);
this.grid.getSelectionModel().fireEvent("rowselect",this.grid.getSelectionModel(),_1c6);
this.grid.fireEvent("beforeedit",this,{grid:this.grid,row:_1c6,record:_1c4,column:this.columnIndex,field:this.dataIndex,value:_1c4.data[this.dataIndex]});
_1c4.set(this.dataIndex,this.toggleBooleanValue(_1c4.data[this.dataIndex]));
this.grid.fireEvent("edit",this,{grid:this.grid,row:_1c6,record:_1ca,column:this.columnIndex,field:this.dataIndex,value:_1c4.data[this.dataIndex],originalValue:_1ca.data[this.dataIndex]});
}
},toggleBooleanValue:function(v){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "N";
}
if(v==="N"){
return "Y";
}
if(v===true){
return false;
}
if(v===false){
return true;
}
if(v===0){
return 1;
}
if(v===1){
return 0;
}
if(v==="YES"){
return "NO";
}
if(v==="NO"){
return "YES";
}
if(v==="T"){
return "F";
}
if(v==="F"){
return "T";
}
return "Y";
},renderer:function(v,p,_1ce){
p.css+=" x-grid-check-col-td";
var _1cf=false;
v=(typeof v=="string")?v.toUpperCase():v;
if(typeof v!="undefined"&&(v==1||v=="1"||v=="Y"||v=="YES"||v=="TRUE"||v===true||v==="T")){
_1cf=true;
}
return "<div style=\"background-repeat: no-repeat;background-position:center center;width:auto\" class=\"x-grid-cell-checker"+(_1cf!=true?"-off":"")+" x-grid-cc-"+this.id+"\">&#160;</div>";
}};
$G.convertBoolean=function(v,_1d1){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "YES";
}
if(v==="N"){
return "NO";
}
if(v===true){
return "YES";
}
if(v===false){
return "NO";
}
if(v===0){
return "NO";
}
if(v===1){
return "YES";
}
if(v==="YES"){
return "YES";
}
if(v==="NO"){
return "NO";
}
if(v==="T"){
return "YES";
}
if(v==="F"){
return "NO";
}
if(v==="FALSE"){
return "NO";
}
if(v==""){
return "NO";
}
if(v.toUpperCase()=="NULL"){
return "NO";
}
return "YES";
};
Ext.define("MyReader",{extend:"Ext.data.reader.Json",alias:"reader.my-json",read:function(_1d2){
var _1d3;
if(_1d2.request){
_1d3=_1d2.request.proxy;
}
var _1d4=_1d2.responseText;
if(!_1d4){
_1d4=_1d2.responseJson;
}
if(!_1d4){
_1d4=_1d2;
}
var _1d5="";
if(_1d3&&!_1d3._cf_actions.bindOnLoad){
_1d5="{  totalrows:0, data :[] }";
_1d3._cf_actions.bindOnLoad=true;
}else{
_1d5=$G.queryToJson(_1d4);
}
if(_1d3){
$G.applyStyles(_1d3._cf_actions);
}
Ext.USE_NATIVE_JSON=false;
return this.callParent([Ext.decode(_1d5)]);
}});
Ext.define("customcfajax",{extend:"Ext.data.proxy.Ajax",alias:"proxy.customcfajax",getParams:function(_1d6){
params=this.callParent(arguments);
if(!(this.sortParam&&_1d6.config.sorters&&_1d6.config.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
}});
Ext.define("Ext.data.proxy.JsProxy",{requires:["Ext.util.MixedCollection","Ext.Ajax"],extend:"Ext.data.proxy.Server",alias:"proxy.jsajax",alternateClassName:["Ext.data.HttpProxy","Ext.data.JsProxy"],actionMethods:{create:"POST",read:"GET",update:"POST",destroy:"POST"},binary:false,jsfunction:"",extraparams:[],getParams:function(_1d7){
params=this.callParent(arguments);
if(_1d7.config&&_1d7.config.sorters){
_1d7.sorters=_1d7.config.sorters;
}
if(!(this.sortParam&&_1d7.sorters&&_1d7.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
},processResponse:function(_1d8,_1d9,_1da,_1db){
var me=this,exception,reader,resultSet,meta,destroyOp;
if(me.destroying||me.destroyed){
return;
}
me.fireEvent("beginprocessresponse",me,_1db,_1d9);
if(_1d8===true){
reader=me.getReader();
if(_1db.status===204){
resultSet=reader.getNullResultSet();
}else{
resultSet=reader.read(me.extractResponseData(_1db),{recordCreator:_1d9.getRecordCreator()||reader.defaultRecordCreatorFromServer});
}
if(!_1d9.$destroyOwner){
_1d9.$destroyOwner=me;
destroyOp=true;
}
_1d9.process(resultSet,_1da,_1db);
exception=!_1d9.wasSuccessful();
}else{
me.setException(_1d9,_1db);
exception=true;
}
if(me.destroyed){
if(!_1d9.destroyed&&destroyOp&&_1d9.$destroyOwner===me){
_1d9.destroy();
}
return;
}
if(exception){
me.fireEvent("exception",me,_1db,_1d9);
}else{
meta=resultSet.getMetadata();
if(meta){
me.onMetaChange(meta);
}
}
if(me.destroyed){
if(!_1d9.destroyed&&destroyOp&&_1d9.$destroyOwner===me){
_1d9.destroy();
}
return;
}
me.fireEvent("endprocessresponse",me,_1db,_1d9);
if(!_1d9.destroyed&&destroyOp&&_1d9.$destroyOwner===me){
_1d9.destroy();
}
},doRequest:function(_1dd,_1de,_1df){
var me=this;
op=_1dd;
if(!op.page){
op.page=op._page;
}
sorters=_1dd.sorters;
sortcol="";
sortdir="ASC";
if(sorters&&sorters.length>0){
sortcol=sorters[0].property;
sortdir=sorters[0].direction;
}
if(this._cf_actions.bindOnLoad){
result=eval(this.jsfunction);
}else{
var _1e1=[];
for(i=0;i<this._cf_actions.grid.columns.length;i++){
var _1e2=this._cf_actions.grid.columns[i];
_1e1[i]=_1e2.colName;
}
result="{  totalrows:0, QUERY : { COLUMNS : "+_1e1+" data :[] }}";
}
me.processResponse(true,_1dd,"",result,_1de,_1df);
return null;
},getMethod:function(_1e3){
return this.actionMethods[_1e3.action];
},createRequestCallback:function(_1e4,_1e5,_1e6,_1e7){
var me=this;
return function(_1e9,_1ea,_1eb){
me.processResponse(_1ea,_1e5,_1e4,_1eb,_1e6,_1e7);
};
}},function(){
Ext.data.HttpProxy=this;
});
$G.queryToJson=function(data){
var _1ed=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _1ef="{  totalrows:"+jsondata.TOTALROWCOUNT+", data :[";
for(var i=0;i<data.length;i++){
var _1f1={};
_1ef=_1ef+"{";
for(var j=0;j<cols.length;j++){
if(data[i][j]==null){
data[i][j]="";
}
_1f1[cols[j]]=data[i][j];
encodedata=ColdFusion.AjaxProxy.JSON.encode(data[i][j]);
_1ef=_1ef+cols[j]+":"+encodedata;
if(j!=cols.length-1){
_1ef=_1ef+",";
}
}
_1ef=_1ef+"}";
if(i!=data.length-1){
_1ef=_1ef+",";
}
}
_1ef=_1ef+"]}";
return _1ef;
};
$G.queryToArray=function(data){
var _1f4=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _1f6=new Array();
for(var i=0;i<data.length;i++){
var _1f8=new Array(1);
for(var j=0;j<cols.length;j++){
_1f8[j]=data[i][j];
}
_1f6[i]=_1f8;
}
return _1f6;
};
};
cfinitgrid();
