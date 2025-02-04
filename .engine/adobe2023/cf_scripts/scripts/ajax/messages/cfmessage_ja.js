// ADOBE SYSTEMS INCORPORATED Copyright 2007 Adobe Systems Incorporated All Rights Reserved.
// NOTICE: Adobe permits you to use, modify, and distribute this file in accordance with the
// terms of the Adobe license agreement accompanying it. If you have received this file from
// a source other than Adobe, then your use, modification, or distribution of it requires the
// prior written permission of Adobe.

CFMessage={};
cfinitmsg = function() { // Wrap in a function so the var scoped variables stay local
var m=CFMessage;
// cfajax.js messages
m['http']='http'
m['bind']='バインド'
m['widget']='ウィジェット'
m['global']='グローバル'
m['debug']='デバッグ'
m['info']='情報'
m['error']='エラー'
m['window']='ウィンドウ'
m['loading']='ロード中...'
m['globalErrorHandler.alert']=' [詳細情報を表示するには、URL パラメータに \'cfdebug\' を追加してデバッグを有効にしてください]'
m['ajax.sendmessage.get']='HTTP GET {0}'
m['ajax.sendmessage.post']='HTTP POST {0}、パラメータ : {1}'
m['ajax.sendmessage.error']='{0} エラー : {1}'
m['ajax.submitform.formnotfound']='ColdFusion.Ajax.submitForm:フォームが見つかりません。フォーム ID: {0}'
m['ajax.submitform.submitting']='フォームを送信中。ID:  {0}'
m['ajax.submitform.success']='フォームの送信に成功しました。フォーム ID: {0}'
m['ajax.submitform.error']='ColdFusion.Ajax.submitForm:{0} フォームの送信エラーです。ID: {1} : {2}'
m['navigate.urlrequired']='ColdFusion.navigate: URL が必要です'
m['navigate.invalidhttpmethod']='ColdFusion.navigate: HTTP メソッド {0} は無効です。HTTP メソッドは GET か POST である必要があります'
m['navigate.formnotfound']='ColdFusion.navigate: フォーム {0} が見つかりません'
m['navigate.towindow']='移動中 : {0}'
m['navigate.tocontainer']='コンテナ内の {0} に移動中 :  {1}'
m['ajax.replacehtml.elnotfound']='HTML の置き換えでエラーが発生しました。要素が見つかりません : {0}'
m['ajax.replacehtml.replacing']='URL {1} の {0} にパラメータ {2} を指定して、要素のマークアップを置き換え中'
m['ajax.replacehtml.error']='{0} 要素 {1} のマークアップの取得でエラーが発生しました : {2}'
m['ajax.replacehtml.connectionerror']='要素 {0} のマークアップの取得でエラーが発生しました。URL {1} への接続を開けません : {2}'
m['ajax.replacehtml.connectionerrordisplay']='エラー : URL {0} への接続を開けません : {1}'
m['ajax.replacehtml.success']='要素のマークアップが置き換えられました : {0}'
m['ajax.replacehtml.jserror']='要素 {0} のマークアップの JavaScript の処理でエラーが発生しました : {1}'
m['ajax.checkimportedtag.error']='タグ {0} のインポートが欠けています。CFAJAXIMPORT を使用してメインページにインポートしてください。'
m['bind.register.elnotfound']='バインドに失敗しました。要素が見つかりません : {0}'
m['bind.register.duplicateel']='バインドに失敗しました。ID または名前 {0} に対する重複した要素が見つかりました'
m['bind.assignvalue.elnotfound']='バインドに失敗しました。要素が見つかりません : {0}'
m['bind.assignvalue.selboxerror']='選択ボックス {0} のバインドに失敗しました。バインド値が 2D 配列ではないか、有効なシリアル化クエリーではありません'
m['bind.assignvalue.selboxmissingvaldisplay']='選択ボックス {0} のバインドに失敗しました。クエリーにバインドする場合は、cfselect タグで値と表示属性のいずれかまたは両方を指定する必要があります'
m['bind.assignvalue.selboxinvalidvaldisplay']='選択ボックス {0} のバインドに失敗しました。cfselect タグで指定されている値または表示属性に一致する列がクエリーにありません'
m['bind.assignvalue.success']='{1}.{2} に対して \'{0}\' というバインド値が割り当てられました'
m['bind.jsbindhandler.invoking']='JavaScript バインド。関数を呼び出し中 : {0}'
m['bind.urlbindhandler.response']='URL 呼び出しレスポンス : {0}'
m['bind.urlbindhandler.jsonerror']='JSON レスポンスの解析エラーです : {0}'
m['bind.urlbindhandler.httperror']='{0} URL {1} の呼び出しエラーです : {2}'
m['ajax.urlbindhandler.connectionerror']='URL {0} への接続を開けません :  {1}'
m['getelementvalue.noelementname']='ColdFusion.getElementValue:この関数には要素名が必要です'
m['getelementvalue.elnotfound']='ColdFusion.getElementValue:{0}.{1} が見つかりません'
m['bind.getbindelementvalue.elnotfound']='要素が見つかりません : {0}'
m['bind.getbindelementvalue.simplevalrequired']='要素 {0}.{1} のバインド値は単純値であることが必要です'
m['log.title']='ColdFusion AJAX ロガー'
m['log.collapse']='折り畳む'
m['log.pause']='一時停止'
m['log.clear']='クリア'
m['spry.setupcomplete']='CF/Spry 統合セットアップが完了しました'
m['spry.bindhandler.loadingcfc']='Spry データセット {0} を次のデータとともにロード中。CFC:{1}、関数 :{2}、引数 : {3}'
m['spry.bindhandler.loadingurl']='Spry データセット {0} を次のデータとともにロード中。URL: {1}'
m['spry.bindhandler.error']='Spry データセット {0} のロードエラーです。URL:{1}、指定パラメータ : {2}'
m['ajaxproxy.invoke.invoking']='次を起動中です。CFC:{0}、関数 :{1}、引数 : {2}'
m['ajaxproxy.invoke.response']='CFC 起動応答 : {0}'
m['ajaxproxy.invoke.error']='{0} CFC {1} の呼び出しエラーです : {2}'
m['ajaxproxy.sethttpmethod.invalidmethod']='CFAJAXPROXY.setHTTPMethod、無効な HTTP メソッドです :{0}。HTTP メソッドは GET か POST である必要があります'
m['ajaxproxy.setqueryformat.invalidformat']='CFAJAXPROXY.setQueryFormat、無効なクエリー形式です :{0}。クエリー形式は row か column である必要があります'
m['ajaxproxy.setreturnformat.invalidformat']='CFAJAXPROXY.setReturnFormat、無効な戻り値の形式です :{0}。戻り値の形式は plain、json、または wddx である必要があります'
m['ajaxproxy.init.created']='CFC の JavaScript プロキシが作成されました : {0}'

// cfautosuggest.js
m['autosuggest.loadautosuggest.invalidvalue']='autosuggest {0} のバインドに失敗しました。バインド値が文字列の 1D 配列ではありません'
m['autosuggest.checktomakebindcall.fetching']='次のデータの取り込み中。autosuggest ID:{0}、現在の値 : \'{1}\''
m['autosuggest.getAutosuggestObject.notfound']='ColdFusion.Autosuggest.getAutosuggestObject: {0} という名前の autosuggest は存在しません'

// cfgrid.js
m['grid.init.created']='グリッドを作成しました。ID: {0}'
m['grid.init.toolbar.page']='ページ'
m['grid.init.toolbar.of']='/ {0}'
m['grid.refresh.notfound']='ColdFusion.Grid.refresh: {0} という名前のグリッドが見つかりませんでした'
m['grid.refresh.success']='グリッドを更新しました。ID: {0}'
m['grid.sort.notfound']='ColdFusion.Grid.sort: グリッドが見つかりません。ID: {0}'
m['grid.sort.colnotfound']='ColdFusion.Grid.sort: 列が見つかりません : グリッド ID {1} の {0}'
m['grid.sort.invalidsortdir']='ColdFusion.Grid.sort: 無効なソート方向です : グリッド ID {1} の {0}。ソート方向は ASC か DESC である必要があります'
m['grid.getgridobject.missinggridname']='ColdFusion.Grid.getGridObject: この関数にはグリッド名が必要です'
m['grid.getgridobject.notfound']='ColdFusion.Grid.getGridObject: {0} という名前のグリッドは存在しません'
m['grid.fireselectionchangeevent.fire']='選択変更イベントを発行中。グリッド ID: {0}'
m['grid.cellclick.targetnotfound']='グリッドの HREF ターゲットが見つかりませんでした : {0}'
m['grid.loaddata.loaded']='グリッドにデータがロードされました。ID: {0}'
m['grid.extproxy.loadresponse.emptyresponse']='CFGRID: レスポンスが空です'
m['grid.extproxy.loadresponse.totalrowcountmissing']='CFGRID: レスポンスデータに TOTALROWCOUNT がありません'
m['grid.extproxy.loadresponse.totalrowcountinvalid']='CFGRID: TOTALROWCOUNT は正の整数である必要があります'
m['grid.extproxy.loadresponse.querymissing']='CFGRID: レスポンスオブジェクトに QUERY がありません'
m['grid.extproxy.loadresponse.queryinvalid']='CFGRID: QUERY は有効なシリアル化クエリーオブジェクトではありません'

m['grid.getTopToolbar.notfound']='ColdFusion.Grid.getTopToolbar: {0} という名前のグリッドは存在しません'
m['grid.showTopToolbar.notfound']='ColdFusion.Grid.showTopToolbar: {0} という名前のグリッドは存在しません'
m['grid.hideTopToolbar.notfound']='ColdFusion.Grid.hideTopToolbar: {0} という名前のグリッドは存在しません'
m['grid.refreshTopToolbar.notfound']='ColdFusion.Grid.refreshTopToolbar: {0} という名前のグリッドは存在しません'
m['grid.getBottomToolbar.notfound']='ColdFusion.Grid.getBottomToolbar: {0} という名前のグリッドは存在しません'
m['grid.showBottomToolbar.notfound']='ColdFusion.Grid.showBottomToolbar: {0} という名前のグリッドは存在しません'
m['grid.hideBottomToolbar.notfound']='ColdFusion.Grid.hideBottomToolbar: {0} という名前のグリッドは存在しません'
m['grid.refreshBottomToolbar.notfound']='ColdFusion.Grid.refreshBottomToolbar: {0} という名前のグリッドは存在しません'


// cflayout.js
m['layout.gettablayout.notfound']='ColdFusion.Layout.getTabLayout: タブレイアウトが見つかりません。ID: {0}'
m['layout.enabletab.enabled']='タブを有効にしました。ID: {0}、タブコンテナの ID: {1}'
m['layout.enabletab.notfound']='ColdFusion.Layout.enableTab: タブレイアウトが見つかりません。ID: {0}'
m['layout.disabletab.disabled']='タブを無効にしました。ID: {0}、タブコンテナの ID: {1}'
m['layout.disabletab.notfound']='ColdFusion.Layout.disableTab: タブレイアウトが見つかりません。ID: {0}'
m['layout.selecttab.selected']='タブを選択しました。ID: {0}、タブコンテナの ID: {1}'
m['layout.selecttab.notfound']='ColdFusion.Layout.selectTab: タブレイアウトが見つかりません。ID: {0}'
m['layout.hidetab.hide']='タブを非表示にします。ID: {0}、タブコンテナの ID: {1}'
m['layout.hidetab.notfound']='ColdFusion.Layout.hideTab: タブレイアウトが見つかりません。ID: {0}'
m['layout.showtab.show']='タブを表示します。ID: {0}、タブコンテナの ID: {1}'
m['layout.showtab.notfound']='ColdFusion.Layout.showTab: タブレイアウトが見つかりません。ID: {0}'
m['layout.createtab.invalidname']='ColdFusion.Layout.createTab: タブのレイアウト名は文字列値である必要があります'
m['layout.createtab.emptyname']='ColdFusion.Layout.createTab: タブのレイアウト名は必須であり空にすることはできません'
m['layout.createtab.invalidareaname']='ColdFusion.Layout.createTab: タブのレイアウト領域名は文字列値である必要があります'
m['layout.createtab.emptyareaname']='ColdFusion.Layout.createTab: タブのレイアウト領域名は必須であり空にすることはできません'
m['layout.createtab.invalidtitle']='ColdFusion.Layout.createTab: タブのタイトルは文字列値である必要があります'
m['layout.createtab.emptytitle']='ColdFusion.Layout.createTab: タブのタイトルは必須であり空にすることはできません'
m['layout.createtab.invalidurl']='ColdFusion.Layout.createTab: タブの URL は文字列値である必要があります'
m['layout.createtab.emptyurl']='ColdFusion.Layout.createTab: タブの URL は必須であり空にすることはできません'
m['layout.createtab.duplicateel']='ColdFusion.Layout.createTab: 同じ ID の要素が既に存在します。ID: {0}'
m['layout.createtab.invalidconfig']='ColdFusion.Layout.createTab: 無効な config オブジェクトが渡されました'
m['layout.createtab.invalidoverflow']='ColdFusion.Layout.createTab: オーバーフローの値が無効です。有効な値は、VISIBLE、SCROLL、AUTO、HIDDEN のみです'
m['layout.createtab.notfound']='ColdFusion.Layout.createTab: タブレイアウトが見つかりません。ID: {0}'
m['layout.createtab.success']='ColdFusion.Layout.createTab: タブレイアウト {1} に新しいタブ {0} を作成しました'
m['layout.getborderlayout.notfound']='ColdFusion.Layout.getBorderLayout: ボーダーレイアウトが見つかりません。ID: {0}'
m['layout.showarea.shown']='ボーダーレイアウト ID {1} の {0} 領域が表示されました'
m['layout.showarea.areanotfound']='ColdFusion.Layout.showArea: ボーダーレイアウト領域が見つかりません : {0}'
m['layout.showarea.notfound']='ColdFusion.Layout.showArea: ボーダーレイアウトが見つかりません。ID: {0}'
m['layout.hidearea.hidden']='ボーダーレイアウト ID {1} の {0} 領域が非表示にされました'
m['layout.hidearea.areanotfound']='ColdFusion.Layout.hideArea: ボーダーレイアウト領域が見つかりません : {0}'
m['layout.hidearea.notfound']='ColdFusion.Layout.hideArea: ボーダーレイアウトが見つかりません。ID: {0}'
m['layout.collpasearea.collapsed']='ボーダーレイアウト ID {1} の {0} 領域が折り畳まれました'
m['layout.collpasearea.areanotfound']='ColdFusion.Layout.collapseArea: ボーダーレイアウト領域が見つかりません : {0}'
m['layout.collpasearea.notfound']='ColdFusion.Layout.collapseArea: ボーダーレイアウトが見つかりません。ID: {0}'
m['layout.expandarea.expanded']='ボーダーレイアウト ID {1} の {0} 領域が展開されました'
m['layout.expandarea.areanotfound']='ColdFusion.Layout.expandArea: ボーダーレイアウト領域が見つかりません : {0}'
m['layout.expandarea.notfound']='ColdFusion.Layout.expandArea: ボーダーレイアウトが見つかりません。ID: {0}'

m['layout.accordion.initialized']='ID {0} のアコーディオンレイアウトが初期化されました'
m['layout.accordion.childinitialized']='ID {0} のアコーディオンパネルが初期化されました'
m['layout.getaccordionlayout.notfound']='ColdFusion.Layout.getAccordionLayout: アコーディオンレイアウトが見つかりません。ID: {0}'
m['layout.hideaccordion.layoutnotfound']='ColdFusion.Layout.hideAccordion: アコーディオンレイアウトが見つかりません。ID: {0}'
m['layout.hideaccordion.panelnotfound']='ColdFusion.Layout.hideAccordion: アコーディオン子パネルが見つかりません。ID: {0}'
m['layout.showaccordion.layoutnotfound']='ColdFusion.Layout.showAccordion: アコーディオンレイアウトが見つかりません。ID: {0}'
m['layout.showaccordion.panelnotfound']='ColdFusion.Layout.showAccordion: アコーディオン子パネルが見つかりません。ID: {0}'
m['layout.showaccordion.layoutnotfound']='ColdFusion.Layout.showAccordion: アコーディオンレイアウトが見つかりません。ID: {0}'
m['layout.showaccordion.panelnotfound']='ColdFusion.Layout.showAccordion: アコーディオン子パネルが見つかりません。ID: {0}'
m['layout.expandaccordion.layoutnotfound']='ColdFusion.Layout.expandAccordion: アコーディオンレイアウトが見つかりません。ID: {0}'
m['layout.expandaccordion.panelnotfound']='ColdFusion.Layout.expandAccordion: アコーディオン子パネルが見つかりません。ID: {0}'
m['layout.collapseaccordion.layoutnotfound']='ColdFusion.Layout.collapseAccordion: アコーディオンレイアウトが見つかりません。ID: {0}'
m['layout.collapseaccordion.panelnotfound']='ColdFusion.Layout.collapseAccordion: アコーディオン子パネルが見つかりません。ID: {0}'
m['layout.hideaccordion.hidden']='アコーディオンレイアウト ID {1} の {0} パネルが非表示にされました'
m['layout.showaccordion.shown']='アコーディオンレイアウト ID {1} の {0} パネルが表示されました'
m['layout.expandaccordion.expanded']='アコーディオンレイアウト ID {1} の {0} パネルが展開されました'
m['layout.collapseaccordion.collapsed']='アコーディオンレイアウト ID {1} の {0} パネルが折り畳まれました'


m['layout.createaccordionpanel.invalidaccordionpanelname']='ColdFusion.Layout.createAccordionPanel: アコーディオンパネルの name の値を null または文字列以外のオブジェクトにすることはできません。ID: {0}'
m['layout.createaccordionpanel.emptyaccordionpanelname']='ColdFusion.Layout.createAccordionPanel: アコーディオンパネルの name の値を空の文字列にすることはできません。ID: {0}'
m['layout.createaccordionpanel.invalidtitle']='ColdFusion.Layout.createAccordionPanel: title の値を null、空、または文字列以外のオブジェクトにすることはできません。ID: {0}'
m['layout.createaccordionpanel.invalidurl']='ColdFusion.Layout.createAccordionPanel: url の値を null、空、または文字列以外のオブジェクトにすることはできません。ID: {0}'
m['layout.createaccordionpanel.duplicateel']='ColdFusion.Layout.createAccordionPanel: 同じ ID の要素が既に存在します。ID: {0}'
m['layout.createaccordionpanel.invalidconfig']='ColdFusion.Layout.createAccordionPanel: 無効な config オブジェクトが渡されました'
m['layout.createaccordionpanel.invalidoverflow']='ColdFusion.Layout.createAccordionPanel: オーバーフローの値が無効です。有効な値は VISIBLE、SCROLL、AUTO、HIDDEN のみです'
m['layout.createaccordionpanel.invalidtitleicon']='ColdFusion.Layout.createAccordionPanel: titleicon の値を定義する場合は、文字列型を使用する必要があります。ID: {0}'
m['layout.createaccordionpanel.invalidoverflowforfillheight']='ColdFusion.Layout.createAccordionPanel: fillheight が true に設定されている場合、有効な overflow の値は SCROLL と AUTO です'
m['layout.createaccordionpanel.created']='ID {0} のアコーディオン子パネルが作成されました'

// cfpod.js
m['pod.init.creating']='ポッドの作成中 : {0}'

//cftooltip.js
m['tooltip.gettooltip.fetch']='ツールヒントのマークアップを取得中。ID: {0}'

// cftree.js
m['tree.refresh.notfound']='ColdFusion.Tree.refresh: {0} という名前のツリーが見つかりませんでした'
m['tree.refresh.statictree']='ColdFusion.Tree.refresh: 静的ツリーは更新されません'
m['tree.refresh.success']='ツリーが更新されました。ID: {0}'
m['tree.gettreeobject.emptyname']='ColdFusion.Tree.getTreeObject: この関数にはツリー名が必要です'
m['tree.gettreeobject.notfound']='ColdFusion.Tree.getTreeObject: {0} という名前のツリーは存在しません'
m['tree.loadnodes.invalidbindvalue']='{0} というツリーのバインドに失敗しました。バインド値がキーと値のペアの 1D 配列ではありません'
m['tree.loadnodes.success']='ツリーにノードがロードされました。ID: {0}'
m['tree.fireselectionchangeevent.fire']='選択変更イベントを発行中。ツリー ID: {0}'
m['tree.initializetree.success']='ツリーが作成されました。ID: {0}'

// cfwindow.js
m['window.create.nullname']='ColdFusion.Window.create: ウィンドウ名を指定する必要があります'
m['window.create.emptyname']='ColdFusion.Window.create: ウィンドウ名は空にできません'
m['window.create.duplicatename']='ウィンドウ {0} の作成でエラーが発生しました。同じ名前を持つ別のウィンドウが見つかりました。各ウィンドウは固有の名前を持つ必要があります。'
m['window.create.creating']='ウィンドウの作成中 : {0}'
m['window.getupdatedconfigobject.invalidconfig']='ColdFusion.Window.create: ウィンドウ {0} に無効な config オブジェクトが渡されました'
m['window.getupdatedconfigobject.invalidinitshow']='ColdFusion.Window.create: config オブジェクトの initshow の値は、ウィンドウ {0} に対するブール値である必要があります'
m['window.getupdatedconfigobject.invalidcenter']='ColdFusion.Window.create: config オブジェクトの center の値は、ウィンドウ {0} に対するブール値である必要があります'
m['window.getupdatedconfigobject.invalidresizable']='ColdFusion.Window.create: config オブジェクトの resizable の値は、ウィンドウ {0} に対するブール値である必要があります'
m['window.getupdatedconfigobject.invaliddraggable']='ColdFusion.Window.create: config オブジェクトの draggable の値は、ウィンドウ {0} に対するブール値である必要があります'
m['window.getupdatedconfigobject.invalidclosable']='ColdFusion.Window.create: config オブジェクトの closable の値は、ウィンドウ {0} に対するブール値である必要があります'
m['window.getupdatedconfigobject.invalidmodal']='ColdFusion.Window.create: config オブジェクトの modal の値は、ウィンドウ {0} に対するブール値である必要があります'
m['window.getupdatedconfigobject.invalidrefreshonshow']='ColdFusion.Window.create: config オブジェクトの refreshonshow の値は、ウィンドウ {0} に対するブール値である必要があります'
m['window.getupdatedconfigobject.invalidheight']='ColdFusion.Window.create: config オブジェクトの height の値は、ウィンドウ {0} に対する正の整数である必要があります'
m['window.getupdatedconfigobject.invalidwidth']='ColdFusion.Window.create: config オブジェクトの width の値は、ウィンドウ {0} に対する正の整数である必要があります'
m['window.getupdatedconfigobject.invalidminwidth']='ColdFusion.Window.create: config オブジェクトの minwidth の値は、ウィンドウ {0} に対する正の整数である必要があります'
m['window.getupdatedconfigobject.invalidminheight']='ColdFusion.Window.create: config オブジェクトの minheight の値は、ウィンドウ {0} に対する正の整数である必要があります'
m['window.getupdatedconfigobject.invalidheightvalue']='ColdFusion.Window.create: height の値は、ウィンドウ {0} の minheight の値よりも大きくする必要があります'
m['window.getupdatedconfigobject.invalidx']='ColdFusion.Window.create: config オブジェクトの x の値は、ウィンドウ {0} に対する正の整数である必要があります'
m['window.getupdatedconfigobject.invalidy']='ColdFusion.Window.create: config オブジェクトの y の値は、ウィンドウ {0} に対する正の整数である必要があります'
m['window.getupdatedconfigobject.minhwnotallowed']='ColdFusion.Window.create: ウィンドウに resizable=false が指定されている場合、minwidth や minheight は使用できません : {0}'
m['window.show.shown']='ウィンドウが表示されました。ID: {0}'
m['window.show.notfound']='ColdFusion.Window.show: ウィンドウが見つかりません。ID: {0}'
m['window.hide.hidden']='ウィンドウが非表示にされました。ID: {0}'
m['window.hide.notfound']='ColdFusion.Window.hide: ウィンドウが見つかりません。ID: {0}'
m['window.onshow.notfound']='ColdFusion.Window.onShow: ウィンドウが見つかりません。ID: {0}'
m['window.onhide.notfound']='ColdFusion.Window.onHide: ウィンドウが見つかりません。ID: {0}'
m['window.getwindowobject.emptyname']='ColdFusion.Window.getWindowObject: この関数にはウィンドウ名が必要です'
m['window.getwindowobject.notfound']='ColdFusion.Window.getWindowObject: {0} という名前のウィンドウは存在しません'


// cfrichtexteditor.js
m['richtext.initialize.success']='リッチテキストエディタを作成しました : {0}'
m['richtext.firechangeevent.firechange']='リッチテキストエディタの変更イベントを発行中 : {0}'
m['richtext.initialize.getvalue.notready']='警告 : リッチテキストエディタからバインド値を取得できませんでした : {0}。ロード時にリッチテキストエディタにバインドしないでください。ページのロード時に完全に初期化されない場合があります。'
m['richtext.geteditorobject.missingtextareaname'] ='ColdFusion.RichText.getEditorObject: この関数にはテキスト領域名が必要です'
m['richtext.geteditorobject.notfound']='ColdFusion.RichText.getEditorObject: {0} という名前のリッチテキストエディタは存在しません'


// cfprogressBar

m['progressbar.create.created']='ProgressBar が作成されました。ID: {0}'
m['progressbar.start.started']='ProgressBar が開始されました。ID: {0}'
m['progressbar.stop.stopped']='ProgressBar が停止されました。ID: {0}'
m['progressbar.stop.nonrunning']='ColdFusion.ProgressBar.stop: Progressbar が動作していません。ID: {0}'
m['progressbar.getProgressBarObject.missingprogressbarid']='ColdFusion.ProgressBar: ID {0} の ProgressBar config オブジェクトが見つかりません'
m['progressbar.getProgressBarObject.missingprogressbarcomponent']='ColdFusion.ProgressBar: ID {0} の ProgressBar コンポーネントが初期化されていません'
m['progressbar.update.invalidoncomplete']='ColdFusion.ProgressBar.update: oncomplete の値は有効な js 関数に設定する必要があります。ID: {0}'
m['progressbar.update.invalidinterval']='ColdFusion.ProgressBar.update: interval の値は正の数値 (ミリ秒) に設定する必要があります。ID: {0}'
m['progressbar.update.invalidduration']='ColdFusion.ProgressBar.update: duration の値は正の数値 (ミリ秒) に設定する必要があります。ID: {0}'
m['progressBar.update.notfound']='ColdFusion.ProgressBar.update: ID {0} の ProgressBar オブジェクトが見つかりません'
m['progressbar.updatestatus.invalidstatus']='ColdFusion.ProgressBar.updateStatus: status の値 {1} は数値にする必要があります。ID: {0}'
m['progressbar.show.shown']='ProgressBar が表示されました。ID: {0}'
m['progressbar.reset.reset']='ProgressBar のリセットが完了しました。ID: {0}'
m['progressbar.hide.hidden']='ProgressBar が非表示になりました。ID: {0}'
m['progressbar.update.updated']='ProgressBar が更新されました。ID: {0}'
m['progressbar.updatestatus.updated']='ProgressBar のステータスが更新されました。ID: {0}'


// cfmessagebox.js
m['messagebox.show.shown']='メッセージボックスが表示されました。ID: {0}'
m['message.create.created']='メッセージボックスが作成されました。ID: {0}、タイプ {1}'
m['messagebox.updatemessage.updated']='メッセージボックスのメッセージが更新されました。ID: {0}'
m['messagebox.updatetitle.updated']='メッセージボックスのタイトルが更新されました。ID: {0}'
m['messagebox.update.updated']='メッセージボックスが更新されました。ID: {0}'
m['messagebox.getmessageboxobject.missingmessageboxid']='ColdFusion.MessageBox.getMessageBoxObject: ID {0} のメッセージボックスオブジェクトが見つかりません'
m['messagebox.show.invalidbuttontype']='ColdFusion.MessageBox.show: buttontype の値 {1} は ID {0} のメッセージボックスの buttontype として有効な値ではありません。'
m['messagebox.create.invalidname']='ColdFusion.MessageBox.create: name の値を null、空、または文字列以外の値にすることはできません。'
m['messagebox.create.duplicatename']='ColdFusion.MessageBox.create: 作成に失敗しました。重複するメッセージボックスが見つかりました。ID: {0}'
m['messagebox.create.invalidmessage']='ColdFusion.MessageBox.create: message の値を null、空、または文字列以外の値にすることはできません。ID: {0}'
m['messagebox.create.invalidtitle']='ColdFusion.MessageBox.create: title の値を null、空、または文字列以外の値にすることはできません。ID: {0}'
m['messagebox.create.invalidtype']='ColdFusion.MessageBox.create: type の値を null または文字列以外の値にすることはできません。ID: {0}'
m['messagebox.create.emptytype']='ColdFusion.MessageBox.create: type の値を空にすることはできません。ID: {0}'
m['messagebox.create.invalidcallback']='ColdFusion.MessageBox.create: コールバックが関数オブジェクトではありません。ID: {0}'
m['messagebox.create.invalidtypeandbuttontypecombination']='ColdFusion.MessageBox.create: confirm 以外のタイプでメッセージボックスの buttontype を定義することはできません。ID: {0}'
m['messagebox.create.invalidbuttontype']='ColdFusion.MessageBox.create: buttontype の値 {1} は confirm タイプに対しては無効です。ID: {0}'
m['messagebox.create.widthnotnumeric']='ColdFusion.MessageBox.create: width の値 {1} は数値にする必要があります。ID: {0}'
m['messagebox.create.xnotnumeric']='ColdFusion.MessageBox.create: x の値 {1} は数値にする必要があります。ID: {0}'
m['messagebox.create.ynotnumeric']='ColdFusion.MessageBox.create: y の値 {1} は数値にする必要があります。ID: {0}'
m['messagebox.create.invalidicon']='ColdFusion.MessageBox.create: ID: icon の値 {1} は ID {0} に対しては無効です。有効な値は error、info、question、および warning です。'
m['messagebox.update.invalidconfigobject']='ColdFusion.MessageBox.update: 更新対象として渡された config オブジェクトは ID {0} に対して有効な javascript オブジェクトではありません'
m['messagebox.update.nameupdatenotallowed']='ColdFusion.MessageBox.update: メッセージボックス名を更新できません。ID: {0}'
m['messagebox.update.typeupdatenotallowed']='ColdFusion.MessageBox.update: メッセージボックスタイプを更新できません。meddaid: {0}'
m['messagebox.update.invalidmessage']='ColdFusion.MessageBox.update: message の値を文字列以外の値にすることはできません。ID: {0}'
m['messagebox.update.invalidtitle']='ColdFusion.MessageBox.update: title の値を文字列以外の値にすることはできません。ID: {0}'
m['messagebox.update.invalidlabelok']='ColdFusion.MessageBox.update: labelok の値を null、空、または文字列以外の値にすることはできません。ID: {0}'
m['messagebox.update.invalidlabelno']='ColdFusion.MessageBox.update: labelno の値を null、空、または文字列以外の値にすることはできません。ID: {0}'
m['messagebox.update.invalidlabelyes']='ColdFusion.MessageBox.update: labelyes の値を null、空、または文字列以外の値にすることはできません。ID: {0}'
m['messagebox.update.invalidlabelcancel']='ColdFusion.MessageBox.update: labelcancel の値を null、空、または文字列以外の値にすることはできません。ID: {0}'
m['messagebox.update.invalidtypeformultiline']='ColdFusion.MessageBox.update: Prompt 以外のタイプで multiline プロパティを定義することはできません'
m['messagebox.update.invalidwidth']='ColdFusion.MessageBox.update: width の値は数値にする必要があります。ID: {0}'
m['messagebox.update.invalidicon']='ColdFusion.MessageBox.update: icon の値 {1} は ID {0} に対しては無効です。有効な値は error、info、question、および warning です。'
m['messagebox.update.invalidcallbackhandler']='ColdFusion.MessageBox.update: コールバックは関数オブジェクトにする必要があります。ID: {0}'
m['messagebox.update.xnotnumeric']='ColdFusion.MessageBox.update: x の値 {1} は数値にする必要があります。ID: {0}'
m['messagebox.update.ynotnumeric']='ColdFusion.MessageBox.update: y の値 {1} は数値にする必要があります。ID: {0}'
m['messagebox.update.invalidbodystyle']='ColdFusion.MessageBox.update: invalidbodystyle の値は文字列オブジェクトにする必要があります。ID: {0}'
m['messagebox.update.invalidtypeandbuttontypecombination']='ColdFusion.MessageBox.update: confirm 以外のタイプでメッセージボックスの buttontype を定義することはできません。ID: {0}'
m['messagebox.update.invalidbuttontype']='ColdFusion.MessageBox.update: confirm タイプでは、buttontype の値を YESNO または YESNOCANCEL に設定する必要があります。ID: {0}'


// cfmediaplayer.js
m['mediaplayer.onfinish.called']='ColdFusion.MediaPlayer: onFinish js 関数が呼び出されました。ID: {0}'
m['mediaplayer.onstart.called']='ColdFusion.MediaPlayer: onStart js 関数が呼び出されました。ID: {0}'
m['mediaplayer.onload.called']='ColdFusion.MediaPlayer: onLoad js 関数が呼び出されました。ID: {0}'
m['mediaplayer.initialized']='ColdFusion.MediaPlayer: Player が初期化されました。ID: {0}'
m['mediaplayer.setsource.notfound']='ColdFusion.MediaPlayer.setSource: MediaPlayer が見つかりません。ID: {0}'
m['mediaplayer.resize.notfound']='ColdFusion.MediaPlayer.resize: MediaPlayer が見つかりません。ID: {0}'
m['mediaplayer.stopplay.notfound']='ColdFusion.MediaPlayer.stopPlay: MediaPlayer が見つかりません。ID: {0}'
m['mediaplayer.setmute.notfound']='ColdFusion.MediaPlayer.setMute: MediaPlayer が見つかりません。ID: {0}'
m['mediaplayer.setvolume.notfound']='ColdFusion.MediaPlayer.setVolume: MediaPlayer が見つかりません。ID: {0}'
m['mediaplayer.setvolume.invalidvalue']='ColdFusion.MediaPlayer.setVolume : 無効なボリューム範囲が指定されました。ID : {0}。指定できる範囲は 0 ～ 1 です'
m['mediaplayer.startplay.notfound']='ColdFusion.MediaPlayer.startPlay: MediaPlayer が見つかりません。ID: {0}'
m['mediaplayer.setsource.sourceset']='ColdFusion.MediaPlayer.setsource: MediaPlayer のソースが {1} に設定されていました : {0}'
m['mediaplayer.resize.invalidvalue']='ColdFusion.MediaPlayer.resize : 無効な幅または高さが指定されました。ID : {0}'
m['mediaplayer.getplayer.notfound']='ColdFusion.MediaPlayer.getPlayer : MediaPlayer が見つかりません。ID : {0}'
m['mediaplayer.settitle.invalidtitle']='ColdFusion.MediaPlayer.setTitle : 無効なタイトルが指定されました'

// cffileupload_swf.js
m['fileupload.initialized']='ColdFusion.FileUpload: ID {0} の FileUpload コンポーネントが初期化されました'
m['fileupload.cancelupload.notfound']='ColdFusion.FileUpload.cancelUpload: ID {0} の FileUpload コンポーネントが見つかりません'
m['fileupload.clearallfiles.notfound']='ColdFusion.FileUpload.clearAllFiles: ID {0} の FileUpload コンポーネントが見つかりません'
m['fileupload.startupload.notfound']='ColdFusion.FileUpload.startUpload: ID {0} の FileUpload コンポーネントが見つかりません'
m['fileupload.cancelupload.cancelled']='ColdFusion.FileUpload.cancelUpload: ID {0} のアップロードがキャンセルされました'
m['fileupload.startupload.started']='ColdFusion.FileUpload.startUpload: ID {0} のアップロードが開始されました'
m['fileupload.clearallfiles.cleared']='ColdFusion.FileUpload.clearAllFiles: ID: {0} の、アップロードの対象として選択されたファイルがクリアされました。'
m['fileupload.getSelectedFiles.notfound']='ColdFusion.FileUpload.getSelectedFiles: ID {0} の FileUpload コンポーネントが見つかりません'

// cfbutton.js
m['button.initialized']='ColdFusion.Button: ID {0} のボタンコンポーネントが初期化されました'
m['button.component.notfound']='ColdFusion.Button: ID {0} のボタンコンポーネントが見つかりません'
m['button.show.shown']='ColdFusion.Button.show: ボタンが表示されました。ID: {0}'
m['button.hide.hidden']='ColdFusion.Button.hide: ボタンが非表示になりました。ID: {0}'
m['button.enable.enabled']='ColdFusion.Button.enable: ボタンが有効化されました。ID: {0}'
m['button.disable.disabled']='ColdFusion.Button.disable: ボタンが無効化されました。ID: {0}'


// cfslider.js
m['slider.disable.notfound']='ColdFusion.Slider.disable: ID {0} のスライダが見つかりません'
m['slider.enable.notfound']='ColdFusion.Slider.enable: ID {0} のスライダが見つかりません'
m['slider.hide.notfound']='ColdFusion.Slider.hide: ID {0} のスライダが見つかりません'
m['slider.show.notfound']='ColdFusion.Slider.show: ID {0} のスライダが見つかりません'
m['slider.setvalue.notfound']='ColdFusion.Slider.setValue: ID {0} のスライダが見つかりません'
m['slider.getvalue.notfound']='ColdFusion.Slider.getValue: ID {0} のスライダが見つかりません'
m['slider.initialized']='ColdFusion.Slider: ID {0} のスライダコンポーネントが初期化されました'
m['slider.show.shown']='ColdFusion.Slider.show: ID {0} のスライダが表示されました'
m['slider.hide.hidden']='ColdFusion.Slider.hide: ID {0} のスライダが非表示になりました'
m['slider.disable.disabled']='ColdFusion.Slider.disable: ID {0} のスライダが無効化されました'
m['slider.enable.enabled']='ColdFusion.Slider.enable: ID {0} のスライダが有効化されました'

// cfmap.js

m['map.initialized']='ColdFusion.Map: ID {0} のマップコンポーネントが初期化されました'
m['map.setcenter.latlngnonnumeric']='ColdFusion.Map.setCenter: latitude|longitude の値 ({1}|{2}) は ID {0} に対しては数値にする必要があります。'
m['map.setcenter.addressnotstring']='ColdFusion.Map.setCenter: ID: {0} のアドレスは文字列オブジェクトにする必要があります。'
m['map.setcenter.invalidcenter']='ColdFusion.Map.setCenter: center は文字アドレスまたは latitude/longitude のペアで指定する必要があります。ID: {0}'
m['map.marker.addressnotstring']='ColdFusion.Map.parseMarker: アドレスは文字列オブジェクトにする必要があります'
m['map.marker.latlngnonnumeric']='ColdFusion.Map.parseMarker: latitude|longitude の値 ({0} | {1}) は数値にする必要があります。'
m['map.marker.latlngnonnumeric']='ColdFusion.Map.parseMarker: latitude|longitude の値 ({0} | {1}) は数値にする必要があります。'
m['map.loadMap.error']='ColdFusion.Map.onError: マップのロード中にエラーが発生しました。エラーコード ({1}){2}'
m['map.markerbind.binderror']='ColdFusion.Map.binderror: BindError:{0}'
m['map.getmappanelobject.notfound']='ColdFusion.Map.getMapObject: ID {0} のマップが見つかりません'
m['map.addmarker.addressnotfound']='ColdFusion.Map.addMarker: マップアイテムのアドレス "{0}" が見つかりません'
m['map.addmarker.markeradded']='ColdFusion.Map.addMarker: {1} マーカーがマップ {0} に追加されました'
m['map.setcenter.centerset']='ColdFusion.Map.setCenter: マップ {0} の中心が設定されました'
m['map.hide.notfound']='ColdFusion.Map.hide: ID {0} のマップが見つかりません'
m['map.show.notfound']='ColdFusion.Map.show: ID {0} のマップが見つかりません'
m['map.refresh.notfound']='ColdFusion.Map.refresh: ID {0} のマップが見つかりません'

} // close cfinitmsg function
cfinitmsg(); // Call function to init
