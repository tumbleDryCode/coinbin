JSSHOP.loadScript("js/tabpane.js", JSSHOP.checkLoader,"js");
JSSHOP.loadScript("js/tab.css", JSSHOP.checkLoader,"css");
JSSHOP.loadScript("js/tbx.css", JSSHOP.checkLoader,"css");



var tpl;






var doTopTip = function(daIndex) {
switch(daIndex) {
case 0:
daTip = "Select Character:";
break;
case 1:
daTip = "Select Background:";
break;
case 2:
daTip = "Select Scene Type:";
break;
case 3:
daTip = "Click Scecne for Prevview:";
 
break;
default:
daTip = "Create Scene:";
}
 
};

var doNada = function() {
};

var doDefBrowser = function(tmpUstr) {
try {
a = "y";
} catch(e) {
alert("doDefBrowser: " + e + " : " + theUrl);
}

};




var tmpSQBArr = null;
var tmpVitemArr = null;
tmpSQBArr = [];
tmpVitemArr = [];
var tmpVindex = 0;
var tmpPrdMediaArr = null;
tmpPrdMediaArr = [];
var serverTime = 3;
var serverTlaps = 3;


var idxBNB = [];
var idxBTC = [];
var idxETH = [];
var idxUSDT = [];

var priceLTC = 0;
var priceBNB = 0;
var priceBTC = 0;
var priceETH = 0;
var priceNEO = 0;


var idxQPrice = {};
idxQPrice["TEST"] = 0.00;
var currIdxSymbol = "ETH";



var currTopAssets = {};
var tmpTopAssets = {};
currTopAssets["ETHUSD"] = 0.00;
var currETHRaiting = "wait";
var currStrQAssets = "";
var currStrAssets = "";
var currStrAssets = "";
var currAppQstr = "";
var currQStrPrices = "";
var currTsellers = [];
var currTopAprices = {};
var currTSellerIdx = 0;
var currOrdersArr = [];
var currBuyOrdersArr = [];
var currSellOrdersArr = [];
var currFullSymbolsArr = [];
var currFullSymbolsIdx = 0;
var currOrdersObj = {};
var currCnRateArr = [];
var currCnRateObj = {};
var currCnRatePrice = {};
var currCoinBRating = {};
var currCoinPopCnt = {};
var currExchangeInfo = null;
var currSceneIncr = 0;
var canBuy = "yes";
var canSell = "yes";
var bkey = "FHi468SSkWOX4ojb3....";  // binance api key.

var runLoop = true;
var runTestLoop = false;
var currOrderMode = "none";
var currOrderUseAI = false;
var currOrderConfirm = false;
var currStreamTry = 0;
var currStreamOn = false;
var currStreamSymb = "ETH";
var currTabName = "Markets";
var currSymQasset = "BNBETH";

var rateMode = false;

var euiFFObjArr = null;
var euiFFObjArr = [];


// rating
var rUrating = 0;
var rUname = "nada";
var sFrating = "0";
var sFname = "nada";
var tFrating = 0;
var tFname = "nada";

var lasOrderTstamp;
var currTabMarkets, currTabTrades, currTabFunds, currTabAccount;

currTLoopThread = 12345678;
var currIdxCache = {};
currIdxCache["USDT"] = JSSHOP.getUnixTimeStamp();
currIdxCache["BTC"] = JSSHOP.getUnixTimeStamp();
currIdxCache["ETH"] = JSSHOP.getUnixTimeStamp();
currIdxCache["BNB"] = JSSHOP.getUnixTimeStamp();
currIdxCache["PAX"] = JSSHOP.getUnixTimeStamp();
currIdxCache["TUSD"] = JSSHOP.getUnixTimeStamp();

var currIdxArr = {};
var currIdxSort = {};
var currSortOrder = {};
var currSortIdx = {};
var currOrderSide = "buy";
var currOrderAsset = "ETH";
var currOrderQAsset = "ETH";
var currOrderAfree= 0;
var currOrderQAfree= 0;
var currOrderAprice= 0;
var currOrderQAprice= 0;



var currCMCapiKey = "...";


function doToQrySpoolArr(tQstr, tQcb) {
app.addToQrySpoolArr(tQstr, tQcb);
if(currSceneIncr < 1) {
app.flushPSpool();
}
}

function getHelpPage() {
try { 
tHstr = document.getElementById("dvMListHelp").innerHTML;
if(tHstr.length < 10) {
mf = window["pfRet"];
JSSHOP.ajax.doNuAjaxPipe("dvMListHelp","tplates/x_help.html", mf);
}
} catch(e) { 
alert("getHelpPage: " + e) 
}
}



if(isJApp == "no") {
// alert("isJApp = no");
if (!window.app) {
app = new Object();
doToQrySpoolArr = function(taQstr, taATQCB) {
// alert("aab addToQrySpoolArr: "  + escape(taQstr) + " :: "+ taATQCB);
mf = window["fnshReqTest"];
tmpArrQ = JSSHOP.ajax.doNuAjaxPipe("me", "app.pst?" + escape(taQstr), mf);
};
app.setCurrQSymStr = function(tSStr) {
};
}
} 




var fnshReqTest = function(aRC, theRCResp, cRC) {
try {
document.getElementById("dvOutput").value = theRCResp;
theAWCResp = document.getElementById("dvOutput").value;
// alert("fnshReqTest: " + theAWCResp);
// strt = JSON.parse(theRCResp);
// alert("fnshReqTest: " + JSON.stringify(strt));
fnishMList(theAWCResp);
} catch(e) { 
alert(e);
}
};




const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function setCurrIdxSymbol(tSStr) {
currIdxSymbol = tSStr;
try {
app.setCurrQSymStr(tSStr);
} catch(e) {
// do something
}
}

function parsePopSocket(tstr) {
try {
if(document.getElementById("dvPopSocket")) {
// if(tp1.getSelectedIndex() == 1) {
// if(currTabName == "tbTradesBuy"){
dvPopSocket.innerHTML = tstr;
currStreamOn = true;
currStreamTry = 0;
} else {
if(currStreamTry > 6) {
currStreamTry = 0;
app.closeSymbolStream();
currStreamOn = false;
}
currStreamTry++;
}
} catch(e) {
alert("parsePopSocket.Error: " + e);
app.closeSymbolStream();
}
}

 

var aLoadSymbolPopCnt = function() {
try {
dvPopSymbolCnt.innerHTML = JSON.stringify(currFullSymbolsArr[currFullSymbolsIdx]);

JSSHOP.shared.setDynFieldVals(currFullSymbolsArr[currFullSymbolsIdx], "dcc_")


} catch(e) {
alert("aLoadSymbolPopCnt.ERROR: " + e);
}
};


var doNumberSlide = function(tmpIname, tIsDecimal, tIsAdding) {
try {
tInmbr = 0;
tFnInumber = 0;
if(tIsDecimal) {
tIfInt = 0.00000001;
} else {
tIfInt = 1;
}
tFinpI = document.getElementById(tmpIname);
tFnInumer = round(tFinpI.value, 8);
// alert(tFnInumer);
 
 
if(tIsAdding) {
if(tIsDecimal) {
tFIInt = round(tFnInumer + tIfInt, 8);
} else {
tFIInt = round(tFnInumer + tIfInt);
}
} else {
if(tIsDecimal) {
tFIInt = round(tFnInumer - tIfInt, 8);
} else {
tFIInt = round(tFnInumer - tIfInt);
}}
tFinpI.value = tFIInt;
// tFinpI.value = tFnInumer + tIfInt;
} catch(e) {
alert("doNumberSlide.ERROR: " + e);
}
};

var doOQchg = function() {
if(currStreamOn == true) {
currStreamTry = 0;
app.closeSymbolStream();
currStreamOn = false;
setTimeout("doOQchg()", 3000);
} else {
if(isJApp == "y") {
tmpSlct = document.getElementById("inpOrderQuote");
tSelectQA = JSSHOP.shared.getCurrSelectOpt(tmpSlct);
tttlss = currOrderAsset + tSelectQA;
app.getSymbolStream(tttlss.toLowerCase());
}
}
checkForOAsset();
};



var getShortIntStr = function(tStrNum) {
try {
tStrMCap = numberWithCommas(Math.round(tStrNum));
tstrSStMC = tStrMCap.substring(0, tStrMCap.indexOf(",") + 2);
if(tStrNum > 999999999) {
tFstrMCap = tstrSStMC + "B";
} else if(tStrNum > 999999) {
tFstrMCap = tstrSStMC + "M";
} else {
tFstrMCap = tstrSStMC + "K";
}
return tFstrMCap;

} catch(e) {
return "NaN";
}

};




var showCinfo = function(tmpIint) {
try {

tfnxArr = null;
tfnxArr = currIdxArr[currStreamSymb][tmpIint];
// alert("showCinfo.tfnxArr: " + JSON.stringify(tfnxArr));
tmpISym = tfnxArr.cp_symbol;
document.getElementById("ddc_cc_max_supply").innerHTML = getShortIntStr(tfnxArr.cc_max_supply);
document.getElementById("ddc_cc_total_supply").innerHTML = getShortIntStr(tfnxArr.cc_total_supply);
document.getElementById("ddc_cc_available_supply").innerHTML = getShortIntStr(tfnxArr.cc_available_supply);



tStrMCap = numberWithCommas(Math.round(tfnxArr.cc_market_cap));
tstrSStMC = tStrMCap.substring(0, tStrMCap.indexOf(",") + 3);
if(tfnxArr.cc_market_cap > 999999999) {
tFstrMCap = tstrSStMC + "B";
} else {
tFstrMCap = tstrSStMC + "M";
}
document.getElementById("ddc_cc_market_cap").innerHTML = getShortIntStr(tfnxArr.cc_market_cap);
document.getElementById("ddc_cc_market_cap").title = tStrMCap;

document.getElementById("modaa_cp_price").value = tfnxArr.cp_price;
document.getElementById("modaa_cc_bsymbol").value = tfnxArr.cc_bsymbol;
document.getElementById("ddc_cc_symbol").innerHTML = tfnxArr.cc_symbol;
document.getElementById("ddc_cc_name").innerHTML = tfnxArr.cc_name;


tSumP = round(tfnxArr.cp_price * idxQPrice[tfnxArr.cc_quote_asset], 2);
frstr = "<div id=\"dvPpPrice" + tmpISym + tfnxArr.cp_bsymbol + "\"  name=\"" + tmpIint + "\" class=\"" + tfnxArr.cp_price_class + "\" data-ison=\"" + iint + "\">" + tfnxArr.cp_price + "<span class=\"txtClrGrey txtSmaller\">" + round(tfnxArr.cp_price * idxQPrice[tfnxArr.cc_quote_asset], 2) + "</span></div>";

 

afrstr = "<div name=\"" + tmpIint + "\" class=\"" + tfnxArr.cp_price_class + "\" data-ison=\"" + iint + "\">" + tfnxArr.cp_price + "<span class=\"txtClrGrey txtSmaller\">" + round(tfnxArr.cp_price * idxQPrice[tfnxArr.cc_quote_asset], 2) + "</span>";
document.getElementById("ddcc_cp_price").innerHTML = afrstr;

document.getElementById("inpAlertHigh").value = tfnxArr.cp_price;
document.getElementById("inpAlertLow").value = tfnxArr.cp_price;


thghPstr = tfnxArr.cp_high_price + "<span class=\"txtClrGrey txtSmaller\">" +  round(tfnxArr.cp_high_price * idxQPrice[tfnxArr.cc_quote_asset], 2) + "</span>";
tlowPstr = tfnxArr.cp_low_price + " <span class=\"txtClrGrey txtSmaller\">"+ round(tfnxArr.cp_low_price * idxQPrice[tfnxArr.cc_quote_asset], 2) + "</span>";
// frstr += "<br>" + tfnxArr.cp_avg_price + " <span class=\"txtClrGrey txtSmaller\">" +   round(tfnxArr.cp_avg_price * idxQPrice[currStreamSymb], 2) + "</span>";
// frstr += "<br><span  class=\"txtBold " + tfnxArr.cp_pct_class + "\">" +  tfnxArr.cc_price_day_chg + "</span>";
document.getElementById("ddc_cp_price").innerHTML = frstr;
document.getElementById("inp_cp_price").value = tfnxArr.cp_price;
document.getElementById("ddc_cp_high_price").innerHTML = thghPstr;
document.getElementById("ddc_cp_low_price").innerHTML = tlowPstr;

document.getElementById("ddcc_cp_high_price").innerHTML = thghPstr;
document.getElementById("ddcc_cp_low_price").innerHTML = tlowPstr;

document.getElementById("ddc_cc_pct_day_chg").innerHTML = tfnxArr.cc_price_day_chg;
document.getElementById("ddc_cp_prices_list").innerHTML = tfnxArr.cp_prices_list;




document.getElementById("ddc_cc_pct_day_chg").className = tfnxArr.cp_pct_class;
document.getElementById("ddc_cp_volume").innerHTML  = getShortIntStr(tfnxArr.cp_volume);
strLprice = round(tfnxArr.cp_price * idxQPrice[tfnxArr.cc_quote_asset], 2);
strDpprice = round(tfnxArr.cc_market_cap / tfnxArr.cc_available_supply, 2);
document.getElementById("ddc_cc_level_price").innerHTML = strDpprice;
document.getElementById("ddcc_cc_level_price").innerHTML = strDpprice;
// this twitter will only work if code is inlined
// tmpStrTweet = "<a class=\"twitter-timeline\" data-width=\"260\" data-height=\"400\" href=\"https://twitter.com/Bancor?ref_src=twsrc%5Etfw\">Tweets by Bancor</a>";
// tmpStrTweet += "<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script> ";
// document.getElementById("dvMediaTwitter").innerHTML = tmpStrTweet;


/*
tturstr = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=" + currCMCapiKey + "&symbol=" + tmpISym;
ttudCStr = app.getUrlRespString(tturstr);
tmunArr = JSON.parse(ttudCStr);
ttudCState = fnshNuCoinPipe(7, "[" + JSON.stringify(tmunArr.data[tmpISym]) + "]");











theSymbolPrice = document.getElementById("modaa_cp_price").value;
theAHighPrice = document.getElementById("inpAlertHigh").value;
theALowPrice = document.getElementById("inpAlertLow").value;

try {

if(tcAlertOn.checked) {
if((theAHighPrice < theSymbolPrice) || (theALowPrice > theSymbolPrice)){
if(theAHighPrice < theSymbolPrice) {
document.getElementById("inpAlertHigh").value = theSymbolPrice;
alert("Option [Higher than] must be greater than current price: " + theSymbolPrice);
} else {
alert("Option [Lower than] must be lower than current price: " + theSymbolPrice);
document.getElementById("inpAlertLow").value = theSymbolPrice;
}

tcAlertOn.checked=false;
tcPersistAlert.disabled=true;
// btnAlertsave.disabled=true;
return;
}
*/







if((tfnxArr.cp_confirm_trans == "5") || (tfnxArr.cp_confirm_trans == "10")) {
chcbAlertOn.checked = true;
}
if((tfnxArr.cp_confirm_trans == "10") || (tfnxArr.cp_confirm_trans == "15")) {
chcbPersistAlert.checked = true;
}
if(tfnxArr.cp_confirm_trans > 0) {
if(tfnxArr.cp_sell_at > 0) {
document.getElementById("inpAlertHigh").value = tfnxArr.cp_sell_at;
}
if(tfnxArr.cp_buy_at > 0) {
document.getElementById("inpAlertLow").value = tfnxArr.cp_buy_at;
}
}




// alert("ttudCState:: " + tfnxArr.cc_dadded)
// alert("ttudCState:: " + JSON.stringify(tmunArr.data) + " :: " + ttudCState);
} catch(e) {
alert("showCinfo.ERROR: " + e + " : " + JSON.stringfy(tfnxArr));
}
};





var dynJSSymbolPopInf = function(theTint) {
try {
setTimeout("showCinfo('" + theTint + "')", 1500);
// setTimeout("showCinfo('" + theTarr.cc_symbol + "')", 700);
} catch(e) {
alert("dynJSSymbolPopInf.ERROR: " + e);
}
};




var dynJSSymbolPopCnt = function(theTStr) {
try {
currOrderSide = "buy";
theStr = app.getJSretstring(theTStr);
tmunArr = null;
tmunArr = JSON.parse(theStr);
tmpOSym = tmunArr[0].cp_symbol;
currOrderAsset = tmpOSym;
 
currOrderAprice = tmunArr[0].cp_price;
tmpQSStr = "::" + tmpOSym;
for(titr = 0; titr < tmunArr.length; titr++) {
// alert(tmunArr[titr].cp_bsymbol);
tmpSlct = document.getElementById("inpOrderQuote");

tmpQsym = getQuoteSymbol(tmunArr[titr].cp_bsymbol);
tmpQSStr += "::" + tmpQsym;
currOrderQAsset = tmpQsym;
JSSHOP.shared.addCurrSelectOpt(tmpSlct, tmpQsym, tmpQsym);
}
tmpQSStr += "::";
// alert(theStr);
JSSHOP.shared.setDynFieldVals(tmunArr[0], "dcc_");
JSSHOP.shared.setFieldVal("inpOLimit",  tmunArr[0].cp_price);
JSSHOP.shared.setFieldVal("inpOStopL",  tmunArr[0].cp_price);
// alert(JSON.stringify(currIdxArr["ASSETS"]));

JSSHOP.shared.setCurrSelectOpt(tmpSlct, getQuoteSymbol(currSymQasset));


for(tiIa = 0; tiIa < currIdxArr["ASSETS"].length; tiIa++) {
if((currIdxArr["ASSETS"][tiIa].ca_symbol == currStreamSymb) && (currOrderSide == "buy")){
dvcurrCAv.innerHTML = currIdxArr["ASSETS"][tiIa].ca_free + "  " + currIdxArr["ASSETS"][tiIa].ca_symbol;
// alert("free: " + currIdxArr["ASSETS"][tiIa].ca_free);
}
if((currIdxArr["ASSETS"][tiIa].ca_symbol == tmpOSym) && (currOrderSide == "sell")) {
dvcurrCAv.innerHTML = currIdxArr["ASSETS"][tiIa].ca_free + "  " + tmpOSym;

}
 

}
frstr = "<div id=\"dvPpPrice" + currStreamSymb + tmunArr[0].cp_bsymbol + "\"   class=\"" + tmunArr[0].cp_price_class + "\" data-ison=\"" + tmunArr[0].idx + "\">" + tmunArr[0].cp_price + " &nbsp;&nbsp;&nbsp; <span class=\"txtClrGrey txtSmaller\">" + round(tmunArr[0].cp_price * idxQPrice[tmunArr[0].cc_quote_asset], 2) + "</span></div>";
document.getElementById("dcc_cp_price").innerHTML = frstr;
checkForOAsset();
} catch(e) {
alert("dynJSSymbolPopCnt.ERROR: " + e);
}
};


var doDynSymbolPop = function(tSymbName, iIndex) {
doNuDynSymbolPop(tSymbName, "trade", 0);
};

var doNuDynSymbolPop = function(tSymbName, tSymbModal, iIndex) {
try {

if((currStreamOn == true) && (tSymbModal == "trade")) {
currStreamTry = 0;
app.closeSymbolStream();
currStreamOn = false;
setTimeout("doDynSymbolPop('" + tSymbName + "')", 3000);

} else {
currSymQasset = tSymbName;
loadJSModal("tplates/aa-mod-ccoin-" + tSymbModal + ".html?tt=" + JSSHOP.getUnixTimeStamp());
tttlss = tSymbName + currIdxSymbol;



if(tSymbModal == "trade") {
oiaqB = "select * from cryptprice, cryptcoin, cryptasset where cryptprice.cp_bsymbol = '"  + tSymbName + "' and  cryptcoin.cc_bsymbol  = cryptprice.cp_bsymbol and  cryptasset.ca_symbol  = cryptprice.cp_symbol group by cryptprice.cp_bsymbol";
doToQrySpoolArr(oiaqB, "dynJSSymbolPopCnt");

 
} else {
// alert(JSON.stringify(currIdxArr[currStreamSymb][iIndex]));

dynJSSymbolPopInf(iIndex);
// doToQrySpoolArr(oiaqB, "dynJSSymbolPopInf");
}
// tp1.setSelectedIndex(1);
// alert("isJApp: " + isJApp);

if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}


}

} catch(e) {
alert("doNuDynSymbolPop.ERROR: " + e);
}

};




var splitOrderQty = function(tmpPrc) {
try {
if(currOrderSide == "buy") {
tmpttlQ = round(((currOrderQAfree * currOrderQAprice) / tmpPrc) / currOrderAprice, 8);
// alert(currOrderQAfree + ":" + currOrderQAprice + ":" + currOrderAprice)
document.getElementById("inpOQty").value = tmpttlQ;
} else {
tmpttlQ = round(currOrderAfree / tmpPrc, 8);
// alert(currOrderQAfree + ":" + currOrderQAprice + ":" + currOrderAprice)
document.getElementById("inpOQty").value = tmpttlQ;
}
} catch(e) {
alert("splitOrderQty.ERROR: " + e);
}
};

var doOrderSideSwitch = function(tOside) {
try {
// alert(tOside  + "  " + currOrderSide);
if(tOside == currOrderSide) {
} else {
currOrderSide = tOside;
if(tOside == "buy") {
JSSHOP.ui.showHideElement("dvSymbTradeStats","hide");
JSSHOP.ui.showHideElement("dvSymbTradeBtns","show");
document.getElementById("dvOSbtnBuy").className = "clsDivBtnDef crsrPointer";
document.getElementById("dvOSbtnSell").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvOSbtnStats").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvBtnSendOrder").className="slmtable brdrClrHdr bkgdClrDlg crsrPointer txtClrWhite";
document.getElementById("dvBtnSendOrder").innerHTML = "Buy";
} else if(tOside == "sell"){
JSSHOP.ui.showHideElement("dvSymbTradeStats","hide");
JSSHOP.ui.showHideElement("dvSymbTradeBtns","show");
document.getElementById("dvOSbtnBuy").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvOSbtnSell").className = "clsDivBtnDef crsrPointer";
document.getElementById("dvOSbtnStats").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvBtnSendOrder").className="slmtable brdrClrHdr bkgdClrHdr crsrPointer txtClrWhite";
document.getElementById("dvBtnSendOrder").innerHTML = "Sell";
} else {
document.getElementById("dvOSbtnBuy").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvOSbtnSell").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvOSbtnStats").className = "clsDivBtnDef crsrPointer";
JSSHOP.ui.showHideElement("dvSymbTradeBtns","hide");
JSSHOP.ui.showHideElement("dvSymbTradeStats","show");
doOQchg();
}
}
checkForOAsset();
} catch(e) {
alert("doOrderSideSwitch.ERROR: " + e);
}
};

var saveNote = function() {
try {
app.saveNote(document.getElementById("dvPopEditNotes").innerHTML, currSymQasset);
} catch(e) {
alert("saveNote.ERROR: " + e);
}
};

var doCInfoSideSwitch = function(tOside) {
try {
// alert(tOside  + "  " + currOrderSide);
 
switch(tOside) {
case "about":

tSymbAbout = document.getElementById("ddc_cc_symbol").innerHTML;


JSSHOP.ajax.doNuAjaxPipe("dvPopSymbolCnt", "tokenGuides/" + tSymbAbout + ".ejs", doServerString);
JSSHOP.ajax.doNuAjaxPipe("dvPopEditNotes", "usernotes/" + tfnxArr.cp_bsymbol + ".txt", doServerString);

// get your own coinmarketcap api key
tStrCMCu = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=" + currCMCapiKey + "&symbol=" + tmpISym;
tStrCMCJ = app.getUContentString(tStrCMCu, "sdata-" + tmpISym + ".ucf");
tmunArr = JSON.parse(tStrCMCJ);
tSCIstr = "";
tLstr = "nada";
if(tmunArr.data[tmpISym].logo) {
aLstr = tmunArr.data[tmpISym].logo;
if(aLstr.indexOf("http") != -1) {
// tLstr = "data:image/png;base64, " + app.doByteArrayFromImageURL(aLstr);
// document.getElementById("imgShwCI").src = aLstr;

// tLstr = base64String;
// alert(tLstr);
} else {
tLstr = aLstr;
// document.getElementById("imgShwCI").src = tLstr;

}







}


tASCIstr = "";
tBSCIstr = "";
hasMore = "no";
if(tmunArr.data[tmpISym].urls) {
ts = tmunArr.data[tmpISym].urls;
        for (var gkey in ts) {
 

	for (var skey in ts[gkey]) {
		if(ts[gkey][skey].length > 4){
 
		tASCIstr = "<span class=\"txtSmall txtClrHdr\">" + gkey + ":<br></span>";
         tBSCIstr += "<div style=\"max-width: 380px;word-wrap: break-word;margin: 0px; padding: 0px\"><a href=\"" + ts[gkey][skey] + "\" class=\"txtSmaller txtClrGrey\">" + ts[gkey][skey] + "</a></div>";
		}

		
	   }

tSCIstr += tASCIstr + tBSCIstr;
tASCIstr = "";
tBSCIstr = "";
	    }
}


document.getElementById("dvPopSymbolCntA").innerHTML = tSCIstr;



document.getElementById("dvCIbtnAbout").className = "clsDivBtnDef crsrPointer";
document.getElementById("dvCIbtnFnx").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnAlerts").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNews").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNotes").className = "clsDivBtnNone crsrPointer";

document.getElementById("dvPopSymbolAbout").style.display = "block";
document.getElementById("dvPopSymbolAbout").style.visibility = "visible";
document.getElementById("dvPopSymbolFnx").style.display = "none";
document.getElementById("dvPopSymbolFnx").style.visibility = "hidden";
document.getElementById("dvPopSymbolAlerts").style.display = "none";
document.getElementById("dvPopSymbolAlerts").style.visibility = "hidden";

document.getElementById("dvPopSymbolNews").style.display = "none";
document.getElementById("dvPopSymbolNews").style.visibility = "hidden";
document.getElementById("dvPopSymbolNotes").style.display = "none";
document.getElementById("dvPopSymbolNotes").style.visibility = "hidden";
break;

case "fnx":
document.getElementById("dvCIbtnAbout").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnFnx").className = "clsDivBtnDef crsrPointer";
document.getElementById("dvCIbtnAlerts").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNews").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNotes").className = "clsDivBtnNone crsrPointer";

document.getElementById("dvPopSymbolAbout").style.display = "none";
document.getElementById("dvPopSymbolAbout").style.visibility = "hidden";
document.getElementById("dvPopSymbolFnx").style.display = "block";
document.getElementById("dvPopSymbolFnx").style.visibility = "visible";
document.getElementById("dvPopSymbolAlerts").style.display = "none";
document.getElementById("dvPopSymbolAlerts").style.visibility = "hidden";
document.getElementById("dvPopSymbolNews").style.display = "none";
document.getElementById("dvPopSymbolNews").style.visibility = "hidden";
document.getElementById("dvPopSymbolNotes").style.display = "none";
document.getElementById("dvPopSymbolNotes").style.visibility = "hidden";


tGRSSstr = "https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&q=" + document.getElementById("ddc_cc_symbol").innerHTML + "-coin-cyrypto&output=rss";
getNuRSSfeed(tGRSSstr, "dvPopEditNews");
break;



case "alerts":
document.getElementById("dvCIbtnAbout").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnFnx").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnAlerts").className = "clsDivBtnDef crsrPointer";
document.getElementById("dvCIbtnNews").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNotes").className = "clsDivBtnNone crsrPointer";

document.getElementById("dvPopSymbolAbout").style.display = "none";
document.getElementById("dvPopSymbolAbout").style.visibility = "hidden";
document.getElementById("dvPopSymbolFnx").style.display = "none";
document.getElementById("dvPopSymbolFnx").style.visibility = "hidden";
document.getElementById("dvPopSymbolAlerts").style.display = "block";
document.getElementById("dvPopSymbolAlerts").style.visibility = "visible";
document.getElementById("dvPopSymbolNews").style.display = "none";
document.getElementById("dvPopSymbolNews").style.visibility = "hidden";
document.getElementById("dvPopSymbolNotes").style.display = "none";
document.getElementById("dvPopSymbolNotes").style.visibility = "hidden";
 
break;


case "news":
document.getElementById("dvCIbtnAbout").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnFnx").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnAlerts").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNews").className = "clsDivBtnDef crsrPointer";
document.getElementById("dvCIbtnNotes").className = "clsDivBtnNone crsrPointer";

document.getElementById("dvPopSymbolAbout").style.display = "none";
document.getElementById("dvPopSymbolAbout").style.visibility = "hidden";
document.getElementById("dvPopSymbolFnx").style.display = "none";
document.getElementById("dvPopSymbolFnx").style.visibility = "hidden";
document.getElementById("dvPopSymbolAlerts").style.display = "none";
document.getElementById("dvPopSymbolAlerts").style.visibility = "hidden";
document.getElementById("dvPopSymbolNews").style.display = "block";
document.getElementById("dvPopSymbolNews").style.visibility = "visible";
document.getElementById("dvPopSymbolNotes").style.display = "none";
document.getElementById("dvPopSymbolNotes").style.visibility = "hidden";
tGRSSstr = "https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&q=" + document.getElementById("ddc_cc_symbol").innerHTML + "-coin-cyrypto&output=rss";
getNuRSSfeed(tGRSSstr, "dvPopEditNews");
break;

default:
document.getElementById("dvCIbtnAbout").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnFnx").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnAlerts").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNews").className = "clsDivBtnNone crsrPointer";
document.getElementById("dvCIbtnNotes").className = "clsDivBtnDef crsrPointer";

document.getElementById("dvPopSymbolAbout").style.display = "none";
document.getElementById("dvPopSymbolAbout").style.visibility = "hidden";
document.getElementById("dvPopSymbolFnx").style.display = "none";
document.getElementById("dvPopSymbolFnx").style.visibility = "hidden";
document.getElementById("dvPopSymbolAlerts").style.display = "none";
document.getElementById("dvPopSymbolAlerts").style.visibility = "hidden";
document.getElementById("dvPopSymbolNews").style.display = "none";
document.getElementById("dvPopSymbolNews").style.visibility = "hidden";
document.getElementById("dvPopSymbolNotes").style.display = "block";
document.getElementById("dvPopSymbolNotes").style.visibility = "visible";
} 
 
} catch(e) {
alert("doOrderSideSwitch.ERROR: " + e);
}
};

var checkForOAsset = function() {
try {
tmpSlct = document.getElementById("inpOrderQuote");
dvcurrCAv.innerHTML = "";
tSelectQA = JSSHOP.shared.getCurrSelectOpt(tmpSlct);
 
for(tiIa = 0; tiIa < currIdxArr["ASSETS"].length; tiIa++) {
if(currIdxArr["ASSETS"][tiIa].ca_symbol == tSelectQA) {
if(currOrderSide == "buy"){
dvcurrCAv.innerHTML = currIdxArr["ASSETS"][tiIa].ca_free + "  " + currIdxArr["ASSETS"][tiIa].ca_symbol;
}
currOrderQAfree = currIdxArr["ASSETS"][tiIa].ca_free;
currOrderQAprice = 1;
}
// alert("free: " + currIdxArr["ASSETS"][tiIa].ca_free);

if(currIdxArr["ASSETS"][tiIa].ca_symbol == currOrderAsset) {
if(currOrderSide == "sell") {
dvcurrCAv.innerHTML = currIdxArr["ASSETS"][tiIa].ca_free + "  " + currOrderAsset;
}
currOrderAfree = currIdxArr["ASSETS"][tiIa].ca_free;

}
}
} catch(e) {
alert("checkForOAsset.ERROR: " + e);
}
};





var fixOFieldsUI = function(theTElem) {
try {
theTTel = document.getElementById(theTElem);
theStr = theTTel.options[theTTel.selectedIndex].value;
if(theStr == "LIMIT") {
JSSHOP.ui.showHideElement("tdBlurMrkPrice","hide");
JSSHOP.ui.showHideElement("tdOLimit","show");
JSSHOP.ui.showHideElement("tdOStopL","hide");
} else if(theStr == "STOP_LOSS_LIMIT") {
JSSHOP.ui.showHideElement("tdBlurMrkPrice","hide");
JSSHOP.ui.showHideElement("tdOLimit","show");
JSSHOP.ui.showHideElement("tdOStopL","show");
} else if(theStr == "MARKET") {
JSSHOP.ui.showHideElement("tdBlurMrkPrice","show");
JSSHOP.ui.showHideElement("tdOLimit","hide");
JSSHOP.ui.showHideElement("tdOStopL","hide");
} else {
}
 
} catch(e) {
alert("fixOFiledsUI.ERROR: " + e);
}
};


function doLJSPrice(ttpLID, theTLTxt) {
try {
 
tpLRnd = round(theTLTxt, 8);
 

tLVtL = document.getElementById(ttpLID).innerText;
tLLastVal = round(theTLTxt, 8);
if(tpLRnd > tLVtL) {
tLstrAJcls = "cellQPriceBuy";
} else if(tpLRnd == tLVtL) {
tLstrAJcls = "cellQPriceHold";
} else {
tLstrAJcls = "cellQPriceSell";
}
JSSHOP.ui.setTinnerText(ttpLID, theTLTxt); 

document.getElementById(ttpLID).className = tLstrAJcls;
 
} catch(e) {
 
alert("doLJSPrice.ERROR: " + e);
}
}



function doAJSPrice(theDID, theTxt) {
try {
if(getQuoteSymbol(theDID) == currStreamSymb){
				sendMsg("doAJSPrice: " + theDID, "dvOutput");
				tArr = null;
 				tArr = [];
				delimPriceID = "dvQPrice" + theDID;
				if(document.getElementById(delimPriceID)) {

				
				// tmpPElem = document.getElementById(delimPriceID);
				// if(tmpPElem.getAttribute("data-ison") != null) {
				// tmpDison = tmpPElem.getAttribute("data-ison");
				// tmpDInt = Math.round(tmpDison);
				// tmpQsymb = getQuoteSymbol(theDID);
				// currIdxSort[tmpQsymb][tmpDInt].cp_price = theTxt;
				// tmpQpstream = currIdxSort[tmpQsymb][tmpDInt].cp_price_stream;
				// currIdxSort[tmpQsymb][tmpDInt].cp_price_stream = tmpQpstream + "|" + theTxt;
				// alert(currIdxSort[tmpQsymb][tmpDInt].cp_symbol);
				// }				
				tArr.push(delimPriceID);
				}
				delimPriceID = "dvAPrice" + theDID;
				if(document.getElementById(delimPriceID)) {
				tArr.push(delimPriceID);
				}
				delimPriceID = "dvTPrice" + theDID;
				if(document.getElementById(delimPriceID)) {
				tArr.push(delimPriceID);
				}
				delimPriceID = "dvRPrice" + theDID;
				if(document.getElementById(delimPriceID)) {
				tArr.push(delimPriceID);
				}
if(tArr.length > 0) {
tpRnd = round(theTxt, 8);
for(itar=0;itar < tArr.length;itar++) {

tVtL = document.getElementById(tArr[itar]).innerText;
tLastVal = round(theTxt, 8);
if(tpRnd > tVtL) {
tstrAJcls = "cellQPriceBuy";
} else if(tpRnd == tVtL) {
tstrAJcls = "cellQPriceHold";
} else {
tstrAJcls = "cellQPriceSell";
}
JSSHOP.ui.setTinnerText(tArr[itar], theTxt); 

document.getElementById(tArr[itar]).className = tstrAJcls;
}

}
 



} // not current quote asset
} catch(e) {
setTimeout("doLJSPrice('" + tArr[itar] + "','" + theTxt + "')", 3000);
// alert("doAJSPrice.ERROR: " + e);
}
}



function doNuJSPrices(theJSStr) {
				try {
document.getElementById("fldChallArray").value = theJSStr;
ttta = document.getElementById("fldChallArray").value;
sttat = ttta.substring(0, ttta.length - 1);
// alert("doJSPrices: " + sttat)
// JSSHOP.ui.setTinnerHTML("dvLoading", "doNuJSPrices: " + sttat);

tParr=sttat.split("|");
 
			for (ijsp=0;ijsp<tParr.length;ijsp++){

				delim_str = tParr[ijsp];
				delim_split = delim_str.split(":");
				tstrAsstP = "0.00000000";
				tstrAsstSym = "BTCUSDT";
                        tstrAJcls = "cellQPriceHold";
				tVtL = "";
				if(delim_split[0] && delim_split[1]) {
				tstrAsstP = delim_split[0];
				tstrAsstSym = delim_split[1];
				delimPriceID = "dvQPrice" + currStreamSymb + tstrAsstSym;
				if(document.getElementById(delimPriceID)) {
                        tVtL = round(document.getElementById(delimPriceID).innerText, 8);
				tpRnd = round(tstrAsstP, 8);
                        if(tpRnd > tVtL) {
                        tstrAJcls = "cellQPriceBuy";
                        } else if(tpRnd == tVtL) {
                        tstrAJcls = "cellQPriceHold";
                        } else {
                        tstrAJcls = "cellQPriceSell";
                        }
				tmpDIU = document.getElementById(delimPriceID).getAttribute("data-ison");
				tmpOUXER = Math.round(tmpDIU);
				tmpQsymb = getQuoteSymbol(tstrAsstSym);
				currIdxSort[currStreamSymb][tmpOUXER].cp_price = tstrAsstP;
				JSSHOP.ui.setTinnerHTML("dvLoading", "doNuJSPrices:tmpDInt " + delim_str + " :: " + currStreamSymb + " :: " + tmpOUXER);



                        document.getElementById(delimPriceID).className = tstrAJcls;
                        JSSHOP.ui.setTinnerText(delimPriceID, tstrAsstP); 

				}
				}

			}
				} catch(e) {
				JSSHOP.ui.setTinnerHTML("dvLoading", "doNuJSPrices: " + e + "<br>" + delim_str + " :: " + currStreamSymb + " :: " + tmpOUXER );
				}
}

function doJSPrices(theJSStr) {
fldChallArray.value = theJSStr;
ttta = fldChallArray.value;
alert("doJSPrices: " + ttta)
try {
tParr=new Array();
tParr=theJSStr.split("|");
			for (ijsp=0;ijsp<tParr.length;ijsp++){
				delim_str = tParr[i];
				delim_split = delim_str.split[":"];
				delimPriceID = "tdAPrice" + delim_split[0];
				if(document.getElementById(delimPriceID)) {
				JSSHOP.ui.setTinnerHTML(delimPriceID, delim_split[1]);
				}
				delimPriceID = "tdQPrice" + delim_split[0];
				if(document.getElementById(delimPriceID)) {
				JSSHOP.ui.setTinnerHTML(delimPriceID, delim_split[1]);
				}
				delimPriceID = "tdTPrice" + delim_split[0];
				if(document.getElementById(delimPriceID)) {
				JSSHOP.ui.setTinnerHTML(delimPriceID, delim_split[1]);
				}
				delimPriceID = "tdRPrice" + delim_split[0];
				if(document.getElementById(delimPriceID)) {
				JSSHOP.ui.setTinnerHTML(delimPriceID, delim_split[1]);
				}
	
			}
} catch(e) {
alert("doJSPrices.ERROR: " + e);
}
}
function getPercentageChange(oldNumber, newNumber){
    var decreaseValue = oldNumber - newNumber;

    return (decreaseValue / oldNumber) * 100;
}



function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}


function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {   
        n = (n * -1).toFixed(2);
    }
    return n;
}




function getSymbol(tmpSStr) {
retStr = "ETH";
if((tmpSStr.indexOf("USDT") != -1) || (tmpSStr.indexOf("TUSD") != -1)) {
retStr = tmpSStr.substring(0, tmpSStr.length - 4);
} else {
retStr = tmpSStr.substring(0, tmpSStr.length - 3);
}
return retStr;
}



function getQuoteSymbol(tmpSStr) {
retStr = "ETH";
if((tmpSStr.indexOf("USDT") != -1) || (tmpSStr.indexOf("TUSD") != -1)) {
retStr = tmpSStr.substring(tmpSStr.length - 4, tmpSStr.length);
} else {
retStr = tmpSStr.substring(tmpSStr.length - 3, tmpSStr.length);
}
return retStr;
}


function converttoETH(tUSDT) {
retStr = 0.00;
return round(tUSDT / idxQPrice["ETH"], 8);
}

function converttoUSDT(tUSDT) {
retStr = 0.00;
return round(tUSDT / idxQPrice["U"], 8);
}

function saveAlert() {
document.getElementById("chcbAlertOn").checked = true;
setTimeout("setPersistAlert()" , 500);
}

function setPersistAlert() {
/*
0 = off
5 = on
10 = on and persistant
15 = off and persistant


inpAlertHigh
inpAlertlow
chcbPersistAlert
chcbAlertOn
mod_cp_bsymbol

mod_cp_price
*/

theAlertCode = "0";
tcPersistAlert = document.getElementById("chcbPersistAlert");
tcAlertOn = document.getElementById("chcbAlertOn");
theAlertBSymbol = document.getElementById("modaa_cc_bsymbol").value;
theSymbolPrice = document.getElementById("modaa_cp_price").value;
theAHighPrice = document.getElementById("inpAlertHigh").value;
theALowPrice = document.getElementById("inpAlertLow").value;

try {

if(tcAlertOn.checked) {
if((theAHighPrice < theSymbolPrice) || (theALowPrice > theSymbolPrice)){
if(theAHighPrice < theSymbolPrice) {
document.getElementById("inpAlertHigh").value = theSymbolPrice;
alert("Option [Higher than] must be greater than current price: " + theSymbolPrice);
} else {
alert("Option [Lower than] must be lower than current price: " + theSymbolPrice);
document.getElementById("inpAlertLow").value = theSymbolPrice;
}

tcAlertOn.checked=false;
tcPersistAlert.disabled=true;
// btnAlertsave.disabled=true;
return;
}
 

if((theAHighPrice == theSymbolPrice) && (theALowPrice == theSymbolPrice)){
alert("Select alert price of [Higher than] and/or [Lower than] current price: " + theSymbolPrice);
tcAlertOn.checked=false;
tcPersistAlert.disabled=true;
// btnAlertsave.disabled=true;
return;
}


tcPersistAlert.disabled=false;
btnAlertsave.disabled=false;
if(tcPersistAlert.checked) {
theAlertCode = 10;
} else {
theAlertCode = 5;
}
 

} else {

if(tcPersistAlert.checked) {
theAlertCode = 15;
}
tcPersistAlert.disabled=true;
// btnAlertsave.disabled=true;
}


    tmpAVpar = null;
    tmpAVpar = [];
	tmpAFobj = null;
	tmpAFobj = {};
    tmpAobjK = {};
    tmpAobjK["t"] = "cp_confirm_trans";
    tmpAobjK["v"] = theAlertCode;
    tmpAVpar.push(tmpAobjK);


    if(theAHighPrice > theSymbolPrice) {
    tmpAobjL = {};
    tmpAobjL["t"] = "cp_sell_at";
    tmpAobjL["v"] = theAHighPrice;
    tmpAVpar.push(tmpAobjL);
    }

    if(theALowPrice < theSymbolPrice) {
    tmpAobjA = {};
    tmpAobjA["t"] = "cp_buy_at";
    tmpAobjA["v"] = theALowPrice;
    tmpAVpar.push(tmpAobjA);
    }



    tmpAFobj["ws"] = "where cp_bsymbol = ?";
    tmpAFobj["wa"] = [theAlertBSymbol];
    tmpAFobj["l"] = ["1"];

    tmpAFobj["knvp"] = tmpAVpar;
    oiA = getNuDBFnvp("cryptprice",7,null,tmpAFobj);




// strUdate = "update cryptprice set cp_confirm_trans = '" + theAlertCode + "' where cp_bsymbol = '" + theAlertBSymbol + "';";
doToQrySpoolArr(oiA["rq"], "doNada");
alert(oiA["rq"]);
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}
} catch(e) {
alert("setPersistAlert: " + e);
}

}


function resetCount() {
strUdate = "update cryptprice set cp_count = '100', cp_lastprices = cp_prices, cp_prices='';";
doToQrySpoolArr(strUdate, "doNada");
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}
}

function resetAssets() {
strUdate = "update cryptasset set ca_free = '0.00';";
doToQrySpoolArr(strUdate, "doNada");
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}
}

function getThreeEthers() {
strUdate = "update cryptasset set ca_free = '3.00' where ca_symbol = 'ETH';";

doToQrySpoolArr(strUdate, "doNada");
strUBdate = "update cryptasset set ca_free = '3.00' where ca_symbol = 'BTC';";

doToQrySpoolArr(strUBdate, "doNada");
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}
}

 

var addNewSymbol = function(tmpSname, tmpSprice) {

};







var doTinfo= function(theTri) {
strTinf = "";
ts = tmpSQBArr[theTri];
strTinf += "id: " + ts.id + "<br>"; 
strTinf += "name: " + ts.name +  "<br>";  
strTinf += "symbol: " + ts.symbol + "<br>"; 
strTinf += "rank: " + ts.rank +  "<br>";  
strTinf += "price_usd: " + ts.price_usd + "<br>";  
strTinf += "price_btc: " + ts.price_btc + "<br>";
strTinf += "day_volume_usd: " + "W" + "<br>";  
strTinf += "market_cap_usd: " + ts.market_cap_usd + "<br>";  
strTinf += "available_supply: " + ts.available_supply + "<br>"; 
strTinf += "total_supply: " + ts.total_supply + "<br>";  
strTinf += "max_supply: " + ts.max_supply + "<br>"; 
strTinf += "percent_change_1h: " + ts.percent_change_1h + "<br>"; 
strTinf += "percent_change_24h: " + ts.percent_change_24h + "<br>";  
strTinf += "percent_change_7d: " + ts.percent_change_7d + "<br>"; 
strTinf += "last_updated: " + ts.last_updated + "<br>"; 
ii = (Math.round(ts.market_cap_usd) / Math.round(ts.price_usd))
strTinf += "<b>" + ii + "</b>"; 

tmpCA = document.getElementById("tcb" + theTri);
tmpCA.innerHTML = strTinf + "<br>" + JSSHOP.ui.doDefBtn("<b>" + ts.symbol + "</b>: " + ts.id,"javascript:doYoAjaxPipe('https://api.coinmarketcap.com/v1/ticker/" + ts.id + "');");
 
};
var doYoAjaxPipe = function(daUrl) {
theResp = document.getElementById("taCMC").value;
try {
var arrToFill = JSON.parse(theResp);
tmpSQBArr = arrToFill;
var len = arrToFill.length;
var iint = 0;
var pcid = 0;
tstr = "";
tmpTblStgs = document.getElementById("tblSettings");
while(iint < len) {
ts = arrToFill[iint];
tmpRowA = tmpTblStgs.insertRow(-1);
tmpCella = tmpRowA.insertCell(-1);
tmpCella.innerHTML = JSSHOP.ui.doDefBtn("<b>" + ts.symbol + "</b>: " + ts.id,"javascript:doTinfo('" + iint + "');"); 
tmpCellb = tmpTblStgs.insertRow(-1);


tmpCellb.id = "tcb" + iint; 	
iint++;
}
 

} catch(e) {
alert(e);
}
};
 

 


var getBalances = function(theQType) {

try {
strL = app.getCryptAssets(theQType);
document.getElementById("taCMC").value = strL;
strAA = document.getElementById("taCMC").value;
strt = JSON.parse(document.getElementById("taCMC").value);


varSym = strt;
var len = varSym.length;
var iint = 0;
var pcid = 0;
tstr = "";
var fllq = [];

tmpTblStgs = document.getElementById("tblSettings");
while(iint < len) {
ts = varSym[iint];
 
 
 
ca_symbol = ts.asset;
ca_free = ts.free;
ca_locked = ts.locked;
ca_dadded = JSSHOP.getUnixTimeStamp();

    tmpVpar = null;
    tmpSobj = null;
    tmpFobj = null; 
    tmpVpar = [];
    tmpSobj = {};
    tmpFobj = {}; 



    tmpSobjC = {};
    tmpSobjC["t"] = "ca_symbol";
    tmpSobjC["v"] = ca_symbol;
    tmpVpar.push(tmpSobjC);


    tmpSobjD = {};
    tmpSobjD["t"] = "ca_free";
    tmpSobjD["v"] = ca_free;
    tmpVpar.push(tmpSobjD);

 

    tmpSobjK = {};
    tmpSobjK["t"] = "ca_locked";
    tmpSobjK["v"] = ca_locked;
    tmpVpar.push(tmpSobjK);

    tmpSobjL = {};
    tmpSobjL["t"] = "ca_dadded";
    tmpSobjL["v"] = ca_dadded;
    tmpVpar.push(tmpSobjL);
 

    tmpFobj["ws"] = "where ca_symbol = ?";
    tmpFobj["wa"] = [ca_symbol];
    tmpFobj["l"] = ["1"];

    tmpFobj["knvp"] = tmpVpar;
    oi = getNuDBFnvp("cryptasset",theQType,null,tmpFobj);
    
 
tac = nCurrCnxOb();
tac["q"] = oi["rq"];
tac["cb"] = "defOutput";
// doNurQComm(tac);

doToQrySpoolArr(oi["rq"], "doNada");

iint++;

}
// alert("total getBalances: " + iint);
// runIDXdisplay(idxBTC);
 
} catch(e) {
alert("getBalances error: " + e);
}


 
};



 




var getOrderObj = function(strqAType,strqSymbol,strqQty,strqAprice,strBuyPrice,strOOMsg) {
aTmpOrderObj = null;
aTmpOrderObj= {};
aTmpOrderObj["type"] = strqAType;
aTmpOrderObj["symbol"] = strqSymbol;
aTmpOrderObj["qty"] = strqQty;
aTmpOrderObj["price"] = strqAprice;
aTmpOrderObj["buyprice"] = strBuyPrice;
aTmpOrderObj["msg"] = strOOMsg;

return aTmpOrderObj;
};



var getNuOrderObj = function() {
try {
aTmpOrderObj = null;
aTmpOrderObj= {};
tmpSlctOT = document.getElementById("inpOrderType");
tSelectVOT = JSSHOP.shared.getCurrSelectOpt(tmpSlctOT);
aTmpOrderObj["ct_type"] = tSelectVOT;
aTmpOrderObj["ct_side"] = currOrderSide.toUpperCase();
aTmpOrderObj["ct_symbol"] = currOrderAsset;
aTmpOrderObj["ct_qtsymbol"] = currOrderQAsset;
aTmpOrderObj["ct_qtprice_usd"] = currOrderQAsset;
aTmpOrderObj["ct_qty"] = document.getElementById("inpOQty").value;
aTmpOrderObj["ct_price"] = round(document.getElementById("inpOLimit").value, 8);
aTmpOrderObj["ct_price_limit"] = round(document.getElementById("inpOLimit").value, 8);
aTmpOrderObj["ct_price_stoplimit"] = round(document.getElementById("inpOStopL").value, 8);
aTmpOrderObj["ct_timeInForce"] = "hh";
aTmpOrderObj["ct_transactTime"] = "hh";
tmpSlctOTA = document.getElementById("selOrderType");
tSelectVOTA = JSSHOP.shared.getCurrSelectOpt(tmpSlctOTA);
aTmpOrderObj["ct_mode"] = tSelectVOTA;
aTmpOrderObj["ct_msg"] = "strOOMsg";
return aTmpOrderObj;
} catch(e) {
alert("getNuOrderObj.ERROR: " + e);
}

};
 

var doNuTestOrder = function(theOrderObj) {
tmpHarr = null;
tmpHarr = [];
tmpHarr.push(theOrderObj);
tmpBuyStr = "noQvalue";
tmpSellStr = "noQvalue";

try  {
if(theOrderObj.ct_side == "SELL") { 
tmpSellStr = JSON.stringify(tmpHarr);
} else {
tmpBuyStr = JSON.stringify(tmpHarr);
}
doAppOrders(tmpBuyStr,tmpSellStr,currOrderMode);
} catch (e) {
alert("doNuTestOrder.ERROR: " + e);
}
};


var doTestMOrder = function(strAType,strSymbol,strQty,strAprice) {
try {
// currOrdersArr.push(getOrderObj(strAType,strSymbol,strQty,strAprice));
sendMsg("doing TestMOrder t:" + strAType + " s: " + strSymbol + " q: " + strQty + " p: " + strAprice, "dvOutput");

/*
app.getTestMOrder(strAType,strSymbol,strQty,strAprice);
if(testMode) {
sendMsg("Sending Test Binance Order :" + " : " + Math.round(strQty) + " : " + strAType + " : " + strSymbol + " : " + strAprice + " res: " + app.doOrderTest(strAType,strSymbol,Math.round(strQty)), "dvOutput");

}
*/
} catch(e) {
alert("doTestMOrder: " + e);
}
};




















var doAssets = function() {
doPlainPipe("nada", "tmp/bnassets.txt", "fnishAssets");
};

var doReloadAssets = function(thestr) {
try {
// alert("doReloadAssets: " + thestr);
doPlainPipe("no", "tmp/bnassets.txt", "fnishAssets");
// setTimeout("app.flushPSpool()", 500);
} catch(e) {
alert("doReloadAssets.error: " + e);
}
};


 

var looperTheater = function() {
if(runLoop == true) {
doTickerPrice();
}
};

var looperScene = function(tIcnt) {
try {
currSceneIncr++;
tNint = Math.round(tIcnt);
switch(tNint) {
case 0:
break;
case 1:
break;
case 4:
doTradeOffs();
break;
case 5:
doAlertsCheck();
break;
case 8:
break;
case 12:
break;
case 14:
doAlertsCheck();
break;
case 16:
doTradeOffs();
break;
case 20:
break;
case 22:
doAlertsCheck();
break;
case 28:
doTradeOffs();
break;
default:
break;
}
} catch(e) {
alert("looperScene.error: " + e);
}
};

var procRunLoop = function(theTmpTCB) {
 
    if(theTmpTCB.checked) {
    runLoop = true;
    app.setRunLoop("true");
    setTimeout("app.flushPSpool()", 500);
    } else {
    app.setRunLoop("false");
    runLoop = false;
    }
};


var fnishQuoteIndexes = function() {
tp1=new WebFXTabPane(document.getElementById('tabPane1'));
currTabHome = tp1.addTabPage(document.getElementById('tpageHome'), tp1, 0);
currTabMarkets = tp1.addTabPage(document.getElementById('tpageMarkets'), tp1, 1);
currTabTrades = tp1.addTabPage(document.getElementById('tpageTrades'), tp1, 2);
currTabFunds = tp1.addTabPage(document.getElementById('tpageFunds'), tp1, 3);
currTabAccounts = tp1.addTabPage(document.getElementById('tpageAccnt'), tp1, 4);
tpMarkets = new WebFXTabPane(document.getElementById('tpaneMarkets'));
tpHome = new WebFXTabPane(document.getElementById('tpaneHome'));
tpAccnt = new WebFXTabPane(document.getElementById('tpaneAccnt'));
setupAllTabs();

doFirstLoad("USDT");
setTimeout("doFirstLoad('ASSETS')", 1500);
setTimeout("getSelectedTabs()", 2500);
};


var doQuoteIndexes = function(theQuoteARR) {
try {
tQAstr = "";
thQArr = JSON.parse(theQuoteARR);
tqi= 0;
while(tqi < thQArr.length) {
tQts = thQArr[tqi];
tQAstr += "<div class=\"tab-page\" id=\"tpMrkt" + tqi + "\">";
tQAstr += "<div class=\"tab\" id=\"tbMkts" + tQts.cc_quote_asset + "\">";
tQAstr += "<div onclick=\"javascript:doFirstLoad('" + tQts.cc_quote_asset + "')\">" + tQts.cc_quote_asset + "</div></div>";
tQAstr += "<table style=\"width: 100%\"><tr>";
tQAstr += "<td class=\"nada\" style=\"height: 23px\">";
tQAstr += "<div id=\"dvMList" + tQts.cc_quote_asset + "\" style=\"min-height:60px\"></div>"; 
tQAstr += "</tr><tr><td style=\"height: 23px\"></td></tr></table>";
tQAstr += "</div>";
tqi++;
}
document.getElementById("tpaneMarkets").innerHTML = tQAstr;
setTimeout("fnishQuoteIndexes()", 2500);
// alert(tQAstr);
} catch(e) {
alert("doQuoteIndexes.ERROR: " + e);
}

};

var dynJSQteIdxTabs = function(theTStr) {
try {
theStr = app.getJSretstring(theTStr);
document.getElementById("taCMC").value = theStr;
theWQWQB = document.getElementById("taCMC").value;
document.getElementById("taCMC").value = "";
// alert("dynJSQteIdxTabs.theWQWQB: " + theWQWQB);
doQuoteIndexes(theWQWQB);
} catch(e) {
alert("dynJSQteIdxTabs.ERROR: " + e);
}
};

var dmyFnishCntLoad = fnishCntLoad;
fnishCntLoad = function() {


document.getElementById("selRunLoop").checked = true;
runLoop = true; // save as preference
document.getElementById("tmp_bnb_key").value = app.fetchConfValString("prfsBinanceKey");
document.getElementById("tmp_bnb_scrt").value = app.fetchConfValString("prfsBinanceScrt");
document.getElementById("tmp_cmc_key").value = app.fetchConfValString("prfsCMCKey");
currCMCapiKey = document.getElementById("tmp_cmc_key").value;

var oiaqQAB = "select distinct cc_quote_asset from cryptcoin;";  // query string
doToQrySpoolArr(oiaqQAB, "dynJSQteIdxTabs"); // JSI_coinBin.java adds the query to the query spool

}; 



var sendNuMsg = function(theMsg, theID, andAppend) {
if(andAppend) {
document.getElementById(theID).innerHTML =  theMsg  + "<br>" + document.getElementById(theID).innerHTML;
} else {
document.getElementById(theID).innerHTML =  theMsg
}
};
var sendMsg = function(theMsg, theID) {
sendNuMsg(theMsg, theID, false)
};
 

var aLoadShowItem = function() {
};

 
function testTabs() {
tp1.setSelectedIndex(0);tpHome.setSelectedIndex(4);
getHelpPage();

/*
// currTabMarkets.show();
el = document.getElementById('tpaneTrades');
el.pages[0].tabPane.select();
JSSHOP.ui.showHideElement("tpTrades1", "show");

	var cs = el.childNodes;
	var n;
	for (var i = 0; i < cs.length; i++) {
		if (cs[i].nodeType == 1 && cs[i].className == "tab-page") {
			// this.addTabPage( cs[i] );
	if(cs[i].id = "tpTrades1") {
	alert("tr");
erl = document.getElementById("tpaneTrades");

	}
		}
	}

*/

}
  




 


var doFavPref = function(tFitm, tFibs) {
try {
tFIsstr = tFitm.src;
if(tFIsstr.indexOf("favs5") != -1) {
tFitm.src = "../images/favs10.gif";
tProp = 10;
} else {
tFitm.src = "../images/favs5.gif";
tProp = 5;
}
oiaqB = "update cryptcoin set cc_props  = '" + tProp + "' where cc_bsymbol = '" + tFibs  + "'";
doToQrySpoolArr(oiaqB, "doNada");

if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}

} catch(e) {
alert("doFavPref:ERROR: " + e);
}
};



var getPriceBlip = function(theGPB, theGPBIdx) {
try {
tSreA = "<div class=\"txtSmall\" style=\"max-height:500px;overflow: scroll\">" + currIdxArr[theGPB][theGPBIdx].cp_symbol +  "<br>" + currIdxArr[theGPB][theGPBIdx].cp_prices_list + "</div>";
JSSHOP.ui.popAndFillLbox(tSreA);
} catch(e) {
alert("getPriceBlip: " + e);
}
};

var showMList = function(theTTAQB, theTTSIdx, theTTSOrder) { 
try {
if(currSortOrder[theTTAQB]["sorder"]) {
if(currSortOrder[theTTAQB]["sorder"] == "sortDesc") {
retStr = "sortAsc";
} else {
retStr = "sortDesc";
}

currSortOrder[theTTAQB]["sorder"] = retStr;

} else {
retStr = "sortAsc";
currSortOrder[theTTAQB]["sorder"] = retStr;

}
currSortOrder[theTTAQB]["sindex"] = theTTSIdx;
showNuMList(theTTAQB, theTTSIdx, retStr);

} catch(e) {
alert("showMList: " + e);
}
};


var showNuMList = function(theAQB, theSIdx, theSOrder) {
// alert("showMlist");
try {
// currSortIdx[theAQB] = theSIdx;
// currSortOrder[theAQB][theSIdx] = theSOrder;

tmpQAsstStr = "BTC";
mainCDiv = document.getElementById("dvMList" + theAQB);
var tSMLArr = null;
tSMLArr = "";
tSMLArr = JSSHOP.shared.sort(currIdxSort[theAQB], currSortOrder[theAQB]["sindex"], currSortOrder[theAQB]["sorder"]);
var ttlDollas = round(0, 8);
var frstr = "";
var dmyFree = 1;


frstr += "<table class=\"striped\"  style=\"width: 100%;\"  cell-padding=\"15px\" cellspacing=\"0px\"><tr>";
frstr += "<td><a id=\"aFld_" + theAQB + "_cp_symbol\" href=\"javascript:showMList('" + theAQB + "','cp_symbol','sortDesc');\" class=\"txtBig txtDecorNone\">Pair</a></td>";
frstr += "<td><a id=\"aFld_" + theAQB + "_cp_price\"  href=\"javascript:showMList('" + theAQB + "','cp_price','sortDesc');\" class=\"txtBig txtDecorNone\">Price</a></td>";
frstr += "<td><a id=\"aFld_" + theAQB + "_cp_level_price\"  href=\"javascript:showMList('" + theAQB + "','cp_level_price','sortDesc');\" class=\"txtBig txtDecorNone\">Level</a></td>";

// frstr += "<td>Level</td>";

frstr += "<td class=\"onlyWideScreen\"><a  id=\"aFld_idx\"  href=\"javascript:showMList('" + theAQB + "','idx','sortDesc');\" class=\"txtBig txtDecorNone\">Hi/Low</td>";
// frstr += "<td class=\"onlyWideScreen\">Avg</td>";
frstr += "<td><a  id=\"aFld_" + theAQB + "_cc_price_day_chg\"  href=\"javascript:showMList('" + theAQB + "','cc_price_day_chg','sortDesc');\" class=\"txtBig txtDecorNone\">24h %Chg</a></td>";
// include later!
// frstr += "<td><a href=\"javascript:showMList('" + theAQB + "','cp_count','sortDesc');\" class=\"txtBig txtDecorNone\">Count</td>";
frstr += "<td class=\"onlyWideScreen\"><a href=\"javascript:showMList('" + theAQB + "','cp_volume','sortDesc');\" class=\"txtBig txtDecorNone\">Volume</a></td>";
if(theAQB == "ASSETS") {
frstr += "<td><a href=\"javascript:showMList('" + theAQB + "','ca_free','sortDesc');\" class=\"txtBig txtDecorNone\">Qty</a></td>";
}

if((currStreamSymb == "TRADES") || (currStreamSymb == "ORDERS")){
frstr += "<td><a href=\"javascript:showMList('" + theAQB + "','ct_qty','sortDesc');\" class=\"txtBig txtDecorNone\">Qty</a></td>";
frstr += "<td><a href=\"javascript:showMList('" + theAQB + "','ct_side','sortDesc');\" class=\"txtBig txtDecorNone\">Action</a></td>";
frstr += "<td><a href=\"javascript:showMList('" + theAQB + "','ct_price_limit','sortDesc');\" class=\"txtBig txtDecorNone\">Limit</a></td>";
frstr += "<td><a href=\"javascript:showMList('" + theAQB + "','ct_price_limit','sortDesc');\" class=\"txtBig txtDecorNone\">Cancel</a></td>";
}
frstr += "<td><a id=\"aFld_" + theAQB + "_cc_props\" href=\"javascript:showMList('" + theAQB + "','cc_props','sortDesc');\" class=\"txtBig txtDecorNone\">Fav</a></td>";

// frstr += "<td>Price Stream</td>";
frstr += "</tr>";
var len = tSMLArr.length;
var iint = 0;
var pcid = 0;
while(iint < len) {
tsa = tSMLArr[iint];
tmpACname = "";
tmpACname = tsa.cc_name.toLowerCase().replace(' ', '-');
tmpCCname = tmpACname.replace(' ', '-');

tmpQAsstStr = getQuoteSymbol(tsa.cp_bsymbol);
strATDpprice = round(tsa.cc_market_cap / tsa.cc_available_supply, 3);
strTDpprice = strATDpprice;
if(strATDpprice < tsa.cp_price) {
strTDpprice = "<b>" + strATDpprice + "</b>";
} 
 
 
if(tmpQAsstStr == "USDT"){  
// if(tsa.cc_quote_asset == "USDT"){  
if((tsa.cc_name == "USDT") && (theAQB !== "ASSETS")){
} else {
frstr += "<tr>";
frstr += "<td style=\"padding-left: 5px;padding-top:8px;padding-bottom:8px\"><a href=\"javascript:doDynSymbolPop('" + tsa.cp_bsymbol + "');\" class=\"txtBold txtBig txtClrHdr\">" +  tsa.cp_symbol + "</a><span class=\"txtClrGrey\">/ " +  tmpQAsstStr + " -" + strTDpprice + "<br>";
// frstr += "<a href=\"https://coinmarketcap.com/currencies/" + tmpCCname + "\">" + tsa.cc_name + "</a></span></td>";
frstr += "<a href=\"javascript:doNuDynSymbolPop('" + tsa.cp_bsymbol + "','info'," + tsa.idx + ");\">" + tsa.cc_name + "</a></span></td>";
frstr += "<td><div id=\"dvQPrice" + theAQB + tsa.cp_bsymbol + "\" name=\"dvQIdx" + iint + "\" class=\"" + tsa.cp_price_class + "\" data-ison=\"" + iint + "\">" + round(tsa.cp_price, 2)  + "</div></td>";

frstr += "<td><div id=\"dvLvlPrice" + theAQB + tsa.cp_bsymbol + "\"  name=\"" + iint + "\" class=\"" + tsa.cp_price_class + "\" data-ison=\"" + iint + "\">" + strTDpprice + " :: " + tsa.cp_level_price + "</div></td>";

frstr += "<td class=\"onlyWideScreen\">" + tsa.cp_high_price + "<br>" + tsa.cp_low_price + "</td>";
// frstr += "<td class=\"onlyWideScreen\">" + tsa.cp_avg_price + "</td>";
frstr += "<td><span  class=\"txtBold " + tsa.cp_pct_class + "\">" +  tsa.cc_price_day_chg + "</span></td>";

// include later!
// frstr += "<td><span class=\"icnbtn slmtable txtSmaller txtBold txtClrWhite bkgdClrDlg\" style=\"margin-top:15px;margin-right:5px\">" + ts.cp_count + "</span></td>";

frstr += "<td class=\"onlyWideScreen\"><span class=\"txtClrGrey\">$ "+ numberWithCommas(tsa.cp_volume) + "</span></td>";

if(theAQB == "ASSETS") {
dmyFree = tsa.ca_free;
if(tsa.ca_locked == "0.00000000") {
frstr += "<td class=\"txtBig txtDecorNone\">" + tsa.ca_free + "<span class=\"txtSmall txtClrGrey\">  " + round(tsa.cp_price * 1 * tsa.ca_free, 2)  + "<br>" + tsa.ca_price + "</span></td>";
} else {
frstr += "<td class=\"txtBig txtDecorNone\">" + tsa.ca_free + "<span class=\"txtSmall txtClrGrey\">  " +   round(tsa.cp_price * 1 * tsa.ca_free , 2) + "</span><br>" + tsa.ca_locked + "<br>" + tsa.ca_price + "</span></td>";
}
fp = round(tsa.cp_price * 1, 2);
fpa = round(fp * dmyFree, 2);
ttlDollas = ttlDollas + fpa;
}


if((currStreamSymb == "TRADES") || (currStreamSymb == "ORDERS")){
frstr += "<td>" + tsa.ct_qty + "</td>";
frstr += "<td>" + tsa.ct_side + "</td>";
frstr += "<td>" + tsa.ct_price_limit + "</td>";
frstr += "<td><a href=\"javascript:cancelTrade('" + tsa.ct_dadded + "','" + tsa.ct_price_limit + "','" + tsa.cp_symbol + "','" + tsa.cc_quote_asset + "','" + tsa.ct_qty + "','" + tsa.ct_side + "');\" class=\"txtBig txtDecorNone\">Cancel</a></td>";
// cancelTrade = function(tradeID, tradePrice, tradeSymbol, tradeQtSymbol, tradeQty, tradeSide)
}



frstr += "<td><img src=\"../images/favs" + tsa.cc_props + ".gif\" alt=\"*\" class=\"icnbtn slmtable crsrPointer\" style=\"max-width: 26px\" onclick=\"javascript:doFavPref(this,'" + tsa.cp_bsymbol + "');\"></td>";

// frstr += "<td style=\"max-width: 110px;word-wrap: break-word\"  class=\"txtClrGrey\"><div style=\"word-wrap: break-word\">" + tstrSellCode + "</div></td>";
frstr += "</tr>";
} // not the USDT clone for assets

} else {


frstr += "<tr>";
frstr += "<td style=\"padding-left: 5px;padding-top:8px;padding-bottom:8px\"><a href=\"javascript:doDynSymbolPop('" + tsa.cp_bsymbol + "');\" class=\"txtBold txtBig txtClrHdr\">" +  tsa.cp_symbol + "</a><span class=\"txtClrGrey\">/ " +  tmpQAsstStr + "<br>";
// frstr += "<a href=\"https://coinmarketcap.com/currencies/" + tmpCCname + "\">" + tsa.cc_name + "</a></span></td>";
frstr += "<a href=\"javascript:doNuDynSymbolPop('" + tsa.cp_bsymbol + "','info'," + tsa.idx + ");\">" + tsa.cc_name + "</a></span></td>";

frstr += "<td><div id=\"dvQPrice" + theAQB + tsa.cp_bsymbol + "\"  name=\"" + iint + "\" class=\"" + tsa.cp_price_class + "\" data-ison=\"" + iint + "\">" + tsa.cp_price + "</div><span class=\"txtClrGrey\">" + round(tsa.cp_price * idxQPrice[tsa.cc_quote_asset], 3) + "</span></td>";
frstr += "<td><div id=\"dvLvlPrice" + theAQB + tsa.cp_bsymbol + "\"  name=\"" + iint + "\" class=\"" + tsa.cp_price_class + "\" data-ison=\"" + iint + "\" title=\"" + tsa.cp_level_price + "\">" + strTDpprice + "</div></td>";

frstr += "<td class=\"onlyWideScreen\"  onclick=\"javascript:getPriceBlip('" + theAQB + "','" + tsa.idx + "');\">" + tsa.cp_high_price + " <span class=\"txtClrGrey\">" +  round(tsa.cp_high_price * idxQPrice[tsa.cc_quote_asset], 3) + "</span><br>" + tsa.cp_low_price + " <span class=\"txtClrGrey\">"+ round(tsa.cp_low_price * idxQPrice[tsa.cc_quote_asset], 3) + "</span></td>";
// frstr += "<td class=\"onlyWideScreen\">" + tsa.cp_avg_price + " <span class=\"txtClrGrey\">" +   round(tsa.cp_avg_price * idxQPrice[tsa.cc_quote_asset], 2) + "</span></td>";
frstr += "<td><span  class=\"txtBold " + tsa.cp_pct_class + "\">" +  tsa.cc_price_day_chg + "</span></td>";

// include later!
// frstr += "<td><span class=\"icnbtn slmtable txtSmaller txtBold txtClrWhite bkgdClrDlg\" style=\"margin-top:15px;margin-right:5px\">" + ts.cp_count + "</span></td>";
frstr += "<td class=\"onlyWideScreen\"><span class=\"txtClrGrey\">$ "+ numberWithCommas(tsa.cp_volume) + "</span></td>";

if(theAQB == "ASSETS") {
dmyFree = tsa.ca_free;
if(tsa.ca_locked == "0.00000000") {
frstr += "<td class=\"txtBig txtDecorNone\">" + tsa.ca_free + "<span class=\"txtSmall txtClrGrey\">  " + round(tsa.cp_price * idxQPrice[tsa.cc_quote_asset] * tsa.ca_free, 2)  + "<br>" + tsa.ca_price + "</span></td>";

} else {
frstr += "<td class=\"txtBig txtDecorNone\">" + tsa.ca_free + "<span class=\"txtSmall txtClrGrey\">  " +   round(tsa.cp_price * idxQPrice[tsa.cc_quote_asset], 2) + "</span><br>" + tsa.ca_locked + "<br>" + tsa.ca_price + "</span></td>";

}

fp = round(tsa.cp_price * idxQPrice[tsa.cc_quote_asset], 2);
fpa = round(fp * tsa.ca_free, 2);
ttlDollas = ttlDollas + fpa;

}


if((currStreamSymb == "TRADES") || (currStreamSymb == "ORDERS")){
frstr += "<td>" + tsa.ct_qty + "</td>";
frstr += "<td>" + tsa.ct_side + "</td>";
frstr += "<td>" + tsa.ct_price_limit + "</td>";
frstr += "<td><a href=\"javascript:cancelTrade('" + tsa.ct_dadded + "','" + tsa.ct_price_limit + "','" + tsa.cp_symbol + "','" + tsa.cc_quote_asset + "','" + tsa.ct_qty + "','" + tsa.ct_side + "');\" class=\"txtBig txtDecorNone\">Cancel</a></td>";

}


frstr += "<td><img src=\"../images/favs" + tsa.cc_props + ".gif\" alt=\"*\" class=\"icnbtn slmtable crsrPointer\" style=\"max-width: 26px\" onclick=\"javascript:doFavPref(this,'" + tsa.cp_bsymbol + "');\">" + tsa.cp_confirm_trans + "</td>";

// frstr += "<td style=\"max-width: 110px;word-wrap: break-word\"  class=\"txtClrGrey\"><div style=\"word-wrap: break-word\">" + tstrSellCode + "</div></td>";
frstr += "</tr>";
}



iint++;
} 
frstr += "</table>";
// if(theAQB == "FAVS") {

if((theAQB == "ASSETS") || (theAQB == "FAVS")){
frstr += "<div>" + ttlDollas + "</div>";
}
// alert("frstr: " + frstr);
mainCDiv.innerHTML = frstr;
currIdxSort[theAQB] = null;
currIdxSort[theAQB] = "";
// currIdxSort[theAQB] = [];
currIdxSort[theAQB] = tSMLArr;
JSSHOP.ui.setTinnerHTML("dvLoading", "");
app.setCurrQSymStr(theAQB);


/*
alen = Math.floor((Math.random() * len) + 1); 
talen = tSMLArr[alen];
ptalen = talen.cp_symbol;
blen = Math.floor((Math.random() * len) + 1);
balen = tSMLArr[blen];
pbalen = balen.cp_symbol;
clen = Math.floor((Math.random() * len) + 1); 
calen = tSMLArr[clen];
pcalen = calen.cp_symbol;
fullname = ptalen + "-" + pbalen + "-" + pcalen;
alert(fullname);
tGRSSstr = "https://news.google.com/news?cf=all&hl=en&pz=1&ned=us&q=" + fullname + "-coin-cyrypto&output=rss";
getNuRSSfeed(tGRSSstr, "dvNewsBtm");
*/


sendMsg("currSceneIncr: " + currSceneIncr, "dvLoading");

// alert(JSON.stringify(idxQPrice));
} catch(e) {
alert("showNuMList:ERROR: " + e);
JSSHOP.ui.setTinnerHTML("dvLoading", "error");
}
if(document.getElementById("aFld_" + theAQB + "_" + currSortOrder[theAQB]["sindex"])){
tItmTtrsh = document.getElementById("aFld_" + theAQB + "_" + currSortOrder[theAQB]["sindex"]);
tItmTtrsh.className = tItmTtrsh.className + " txtBold txtClrHdr";
}
};

 


var cancelTrade = function(tradeID, tradePrice, tradeSymbol, tradeQtSymbol, tradeQty, tradeSide) {
try {
 

ttlval = round(tradePrice * tradeQty, 8);
oiaqB = "update crypttrade set ct_status  = 'CANCELED' where ct_dadded = '" + tradeID  + "'";
doToQrySpoolArr(oiaqB, "doNada");

if(tradeSide == "BUY") {
oiaqw = "update cryptasset set ca_locked = ca_locked  - " + ttlval + " where ca_symbol = '" + tradeQtSymbol + "'";
doToQrySpoolArr(oiaqw,"doNada");
} else {
oiaqaw = "update cryptasset set ca_locked = ca_locked  - " + ttlval + " where ca_symbol = '" + tradeSymbol + "'";
doToQrySpoolArr(oiaqaw,"doNada");
}
 
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}

} catch(e) {
alert("cancelTrade:ERROR: " + e);
}
};



var dynJSfnishMList = function(theTStr) {
try {
theStr = app.getJSretstring(theTStr);
document.getElementById("taCMC").value = theStr;
theWQWQB = document.getElementById("taCMC").value;
document.getElementById("taCMC").value = "";
// alert("dynJSfnishMList.theWQWQB: " + theWQWQB);
fnishMList(theWQWQB);
} catch(e) {
alert("dynJSfnishMList.ERROR: " + e);
}
};

var dynJSFTradeBOffs = function(theTStr) {
try {
theBStr = app.getJSretstring(theTStr);
document.getElementById("taCMC").value = theBStr;
theBWQWQB = document.getElementById("taCMC").value;
document.getElementById("taCMC").value = "";

if(theBWQWQB.indexOf("ct_side") != -1) {
tDTAAFarr = JSON.parse(theBWQWQB);
for(innu = 0; innu < tDTAAFarr.length; innu++) {
ttAOB = tDTAAFarr[innu];
ttalval = round(ttAOB.ct_price_limit * ttAOB.ct_qty, 2);
aqoiaq = "update cryptasset set ca_price = " + ttAOB.ct_price_limit + ", ca_free = ca_free + " + ttAOB.ct_qty + " where ca_symbol = '" + ttAOB.ct_symbol + "'";
doToQrySpoolArr(aqoiaq,"doNada");
aqqoiaqa = "update cryptasset set ca_price = " + ttAOB.ct_price_limit + ", ca_free = ca_free - " + ttalval + " where ca_symbol = '" + ttAOB.ct_qtsymbol + "'";
doToQrySpoolArr(aqqoiaqa,"doNada");
aqaqoiaqB = "update crypttrade set ct_status  = 'COMPLETED' where ct_dadded = '" + ttAOB.ct_dadded  + "'";
doToQrySpoolArr(aqaqoiaqB, "doNada");
}
}
if(!runLoop) {
setTimeout("app.flushPSpool()", 1500);
}

} catch(e) {
alert("dynJSfnishMList.ERROR: " + e);
}
};

var dynJSFTradeAOffs = function(theTStr) {
try {
theStr = app.getJSretstring(theTStr);
document.getElementById("taCMC").value = theStr;
theAWQWQB = document.getElementById("taCMC").value;
document.getElementById("taCMC").value = "";
if(theAWQWQB.indexOf("ct_side") != -1) {
tDTAFarr = JSON.parse(theAWQWQB);
for(inu = 0; inu < tDTAFarr.length; inu++) {
tAOB = tDTAFarr[inu];
ttlval = round(tAOB.ct_price_limit * tAOB.ct_qty, 2);
qoiaq = "update cryptasset set ca_price = " + tAOB.ct_price_limit + ", ca_free = ca_free - " + tAOB.ct_qty + ", ca_locked = ca_locked - " + tAOB.ct_qty + " where ca_symbol = '" + tAOB.ct_symbol + "'";
doToQrySpoolArr(qoiaq,"doNada");
qqoiaqa = "update cryptasset set ca_price = " + tAOB.ct_price_limit + ", ca_free = ca_free + " + ttlval + " where ca_symbol = '" + tAOB.ct_qtsymbol + "'";
doToQrySpoolArr(qqoiaqa,"doNada");
qaqoiaqB = "update crypttrade set ct_status  = 'COMPLETED' where ct_dadded = '" + tAOB.ct_dadded  + "'";
doToQrySpoolArr(qaqoiaqB, "doNada");
}
}
oiaqBB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol and crypttrade.ct_status = 'NEW' and cryptprice.cp_price < crypttrade.ct_price_limit and crypttrade.ct_side = 'BUY' group by crypttrade.ct_dadded order by crypttrade.ct_dadded desc limit 15;";
doToQrySpoolArr(oiaqBB, "dynJSFTradeBOffs");
if(!runLoop) {
setTimeout("app.flushPSpool()", 1500);
}
} catch(e) {
alert("dynJSfnishMList.ERROR: " + e);
}
};

var doTradeOffs = function() {
try {
if(currIdxSort["TRADES"]) {
tCIDXS = currIdxSort["TRADES"];
if(tCIDXS.length > 0) {
oiaqAB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol and crypttrade.ct_status = 'NEW' and cryptprice.cp_price > crypttrade.ct_price_limit and crypttrade.ct_side = 'SELL' group by crypttrade.ct_dadded order by crypttrade.ct_dadded desc limit 15;";
doToQrySpoolArr(oiaqAB, "dynJSFTradeAOffs");
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}
}
}
} catch(e) {
alert("doTradeOffs.ERROR: " + e);
}

};
 

















var dynJSFAlertsCheck = function(theTStr) {
try {
theStr = app.getJSretstring(theTStr);
document.getElementById("taCMC").value = theStr;
theAWQWQB = document.getElementById("taCMC").value;
document.getElementById("taCMC").value = "";
if(theAWQWQB.indexOf("cp_price") != -1) {
tDTAFarr = JSON.parse(theAWQWQB);
tstring = "";
// alert("dynJSFAlertsCheck: " + theAWQWQB);
for(inu = 0; inu < tDTAFarr.length; inu++) {
tAOB = tDTAFarr[inu];
if(tAOB.cp_price > tAOB.cp_sell_at) {
tstring += "Higher on " + tAOB.cc_symbol + " at: " + tAOB.cp_sell_at + " of current price: " + tAOB.cp_price;
}
if((tAOB.cp_buy_at > 0) && (tAOB.cp_price < tAOB.cp_buy_at)) {
tstring += "Lower on " + tAOB.cc_symbol + " at: " + tAOB.cp_buy_at + " of current price: " + tAOB.cp_price;
}



if(tAOB.cp_confirm_trans == 5) {
    tmpAVpar = null;
    tmpAVpar = [];
	tmpAFobj = null;
	tmpAFobj = {};
    tmpAobjK = {};
    tmpAobjK["t"] = "cp_confirm_trans";
    tmpAobjK["v"] = 0;
    tmpAVpar.push(tmpAobjK);

 



    tmpAFobj["ws"] = "where cp_bsymbol = ?";
    tmpAFobj["wa"] = [tAOB.cp_bsymbol];
    tmpAFobj["l"] = ["1"];

    tmpAFobj["knvp"] = tmpAVpar;
    oiA = getNuDBFnvp("cryptprice",7,null,tmpAFobj);
    doToQrySpoolArr(oiA["rq"], "doNada");
}


} // end of for each
JSSHOP.ui.popCntCrnrMsg("dynJSFAlertsCheck: " + tstring);
// alert("dynJSFAlertsCheck: " + tstring);
}





if(!runLoop) {
setTimeout("app.flushPSpool()", 1500);
}
} catch(e) {
alert("dynJSFAlertsCheck.ERROR: " + e);
}
};

var doAlertsCheck = function() {
try {
if(currIdxSort["ALERTS"]) {
tACHXS = currIdxSort["ALERTS"];
if(tACHXS.length > 0) {

oiaqAB = "select * from cryptprice, cryptcoin where (cryptprice.cp_confirm_trans = '10' or cryptprice.cp_confirm_trans = '5') and  cryptprice.cp_bsymbol = cryptcoin.cc_bsymbol and (cryptprice.cp_price > cryptprice.cp_sell_at or cryptprice.cp_price < cryptprice.cp_buy_at) order by cryptprice.cp_price_pct_chg desc";

doToQrySpoolArr(oiaqAB, "dynJSFAlertsCheck");
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}
}
}
} catch(e) {
alert("doAlertsCheck.ERROR: " + e);
}

};
 













var fnishMList = function(theQB) {
try {

nuVarr = null;
nuVarr = "";
nuVarr = JSON.parse(theQB);
var rsetPrices = "no";
currIdxArr[currStreamSymb] = null;
currIdxArr[currStreamSymb] = "";
currIdxArr[currStreamSymb] = [];
currIdxSort[currStreamSymb] = null;
currIdxSort[currStreamSymb] = "";
currIdxSort[currStreamSymb] = [];

var fmlen = nuVarr.length;
var fmint = 0;

while(fmint < fmlen) {
tFLPstream = "";
ts = null;
ts = {};
ts = nuVarr[fmint];

tmpFMLobjA = null;
tmpFMLobjA = {};

if(ts.cp_lastprices) {
tFLPstream += ts.cp_lastprices;
}
if(ts.cp_prices) {
tFLPstream += ts.cp_prices;
}
 
tmpFMLobjA["cp_price_stream"] = tFLPstream;
tTSPrices = tmpFMLobjA["cp_price_stream"];
aTSPrices = tTSPrices.substring(1, tTSPrices.length); // remove the first |
arrTSPrices = aTSPrices.split('|');
arrTmpPrcs = aTSPrices.split('|'); 
aTPLength = arrTSPrices.length;

if(aTPLength > 3) {
bfrLLP = arrTSPrices[aTPLength - 3];
bfrLP = arrTSPrices[aTPLength - 2];
currP = arrTSPrices[aTPLength - 1];
nArr = arrTmpPrcs.sort(function(a,b) { return a - b;});
if(aTPLength > 40) {
rsetPrices = "yes";
}
} else {
bfrLLP = ts.cp_price;
bfrLP = ts.cp_price;
currP = ts.cp_price;
arrTSPrices = [ts.cp_price,ts.cp_price,ts.cp_price];
nArr = [ts.cp_price,ts.cp_price,ts.cp_price];
aTPLength = arrTSPrices.length; 
}

tmpLowPrice = round(nArr[1], 8);
tmpHighPrice = round(nArr[nArr.length - 1], 8);

ial = false;
nint = 0;
tstrSellCode = arrTSPrices[0];
tstrPClss = "cellQPriceHold"; 
var lastprice = "";
var aprice = arrTSPrices[0];
prcTtl = parseFloat("0.000000");
avgPrice = 0.00;
boolCanPush = "yes";
intprcplug = 0;

while(nint < aTPLength) {
boolCanPush = "yes";
lastprice = aprice;
aprice = arrTSPrices[nint];
prcTtl = prcTtl + parseFloat(aprice);
if(intprcplug > 20) {
intprcplug = 0;
tstrSellCode += "<br> " +  aprice;
} else {

if(aprice > lastprice) {
tstrSellCode += "+";
} else if(aprice == lastprice) {
tstrSellCode += "|";
} else {
tstrSellCode += "-";
}
intprcplug++;
}
nint++
}

avgPrice = round(prcTtl / aTPLength, 8);

if(bfrLP > ts.cp_price) {
tstrPClss = "cellQPriceSell"; 
} else if(bfrLP < ts.cp_price) {
tstrPClss = "cellQPriceBuy"; 
} else {
}

tmpStrPChange = round(((ts.cp_price - avgPrice) / avgPrice) * 100, 2);
tmpFMLobjA["cc_price_day_chg"] = tmpStrPChange;
tstrPChclass = "txtClrHdr";
if(tmpStrPChange < 0) {
tstrPChclass = "txtClrRed";
}







tmpFMLobjA["idx"] = fmint;
ts["idx"] = fmint;
tmpFMLobjA["cp_symbol"] = ts.cp_symbol;
tmpFMLobjA["cp_bsymbol"] = ts.cp_bsymbol;
tmpFMLobjA["cc_quote_asset"] = getQuoteSymbol(ts.cp_bsymbol);
tmpFMLobjA["cc_name"] = ts.cc_name;
tmpFMLobjA["cp_price"] = ts.cp_price;
tmpFMLobjA["cp_price_class"] = tstrPClss;
tmpFMLobjA["cp_pct_class"] = tstrPChclass;
tmpFMLobjA["cp_low_price"] = tmpLowPrice;
tmpFMLobjA["cp_high_price"] = tmpHighPrice;
tmpFMLobjA["cp_confirm_trans"] = ts.cp_confirm_trans;

tmpFMLobjA["cp_avg_price"] = avgPrice;



tmpFMLobjA["cc_props"] = ts.cc_props;
tmpFMLobjA["cc_market_cap"] = ts.cc_market_cap;
tmpFMLobjA["cc_available_supply"] = ts.cc_available_supply;



tStrUprice = round(ts.cp_price * idxQPrice[ts.cc_quote_asset], 3);
tStrTmlprice = round(ts.cc_market_cap / ts.cc_available_supply, 3);
if(tStrUprice > tStrTmlprice) {

tStrALprice = round(((tStrUprice - tStrTmlprice) / tStrTmlprice) * 100, 3);
tStrLprice = "+" + tStrALprice + "%";

} else {
tStrALprice = round(((tStrTmlprice - tStrUprice) / tStrTmlprice) * 100, 3);
tStrLprice = "-" + tStrALprice + "%";
}
tmpFMLobjA["cp_level_price"] = tStrALprice;
ts["cp_level_price"] = tStrALprice;


ts["cp_low_price"] = tmpLowPrice;
ts["cp_high_price"] = tmpHighPrice;
ts["cp_pct_class"] = tstrPChclass;
ts["cp_prices_list"] = tstrSellCode;
ts["cp_confirm_trans"] = ts.cp_confirm_trans;


if(currStreamSymb == "ALERTS") {
ts["cp_buy_at"] = ts.cp_buy_at;
ts["cp_sell_at"] = ts.cp_sell_at;
tmpFMLobjA["cp_buy_at"] = ts.cp_buy_at;
tmpFMLobjA["cp_sell_at"] = ts.cp_sell_at;
}



if(ts.cc_quote_asset == "USDT"){  
idxQPrice[ts.cp_symbol] = ts.cp_price;
// if(currStreamSymb == "USDT") {
tmpFMLobjA["cp_volume"] = round(ts.cp_volume * ts.cp_price, 2);
} else {
tmpFMLobjA["cp_volume"] = round(ts.cp_volume * (ts.cp_price * idxQPrice[ts.cc_quote_asset]), 2);
}
fullfree = 0;
if(currStreamSymb == "ASSETS") {
if(ts.cc_quote_asset == "USDT"){  
fullfree = round((ts.ca_free  * ts.cp_price) - ts.ca_locked, 2);
} else {
fullfree = round((ts.ca_free  * (ts.cp_price * idxQPrice[ts.cc_quote_asset]))  - ts.ca_locked, 2);
}
// if(fullfree < 2) {
if((fullfree < 2) || (isNaN(fullfree))) {
boolCanPush = "no";
}
tmpFMLobjA["ca_price"] = ts.ca_price;
tmpFMLobjA["ca_free"] = ts.ca_free;
tmpFMLobjA["ca_locked"] = ts.ca_locked;
}


if((currStreamSymb == "TRADES") || (currStreamSymb == "ORDERS")){
tmpFMLobjA["ct_qty"] = ts.ct_qty;
tmpFMLobjA["ct_side"] = ts.ct_side;
tmpFMLobjA["ct_price_limit"] = ts.ct_price_limit;
tmpFMLobjA["ct_dadded"] = ts.ct_dadded;
}

if(boolCanPush == "yes") {
currIdxSort[currStreamSymb].push(tmpFMLobjA);
currIdxArr[currStreamSymb].push(ts);
if(ts.cc_quote_asset == "USDT"){  
idxQPrice[ts.cp_symbol] = ts.cp_price;
}
}
fmint++;
if(fmint == fmlen) {
tAStr = "cp_volume";
if(currSortOrder[currStreamSymb]["sindex"]) {
tAStr = currSortOrder[currStreamSymb]["sindex"];
} else {
currSortOrder[currStreamSymb]["sindex"] = tAStr;
}
tAAAStr =  "sortDesc";
if(currSortOrder[currStreamSymb]["sorder"]) {
tAAAStr = currSortOrder[currStreamSymb]["sorder"];
} else {
currSortOrder[currStreamSymb]["sorder"] = tAAAStr;
}
if(rsetPrices == "yes") {
resetCount();
}
showNuMList(currStreamSymb, tAStr, tAAAStr);
}
}
// alert(JSON.stringify(currSortOrder))
} catch(e) {
alert("fnishMList:ERROR: " + e);
}
};



var dynJSfnishHmList = function(theTStr) {
try {
theStr = app.getJSretstring(theTStr);
document.getElementById("taCMC").value = theStr;
theWQWQB = document.getElementById("taCMC").value;
document.getElementById("taCMC").value = "";
tmpHOstr = "";
nuHVarr = JSON.parse(theWQWQB);
for(ihm = 0; ihm < nuHVarr.length; ihm++) {
tmpHOstr += "<div style=\"float:left;margin: 20px;\" class=\"crsrPointer txtBold txtSmall slmtable brdrClrHdr\" onclick=\"\">" + nuHVarr[ihm].cc_name + "<br>" + nuHVarr[ihm].cc_market_cap + "</div>";
}
document.getElementById("dvHomePage").innerHTML = tmpHOstr;
} catch(e) {
alert("dynJSfnishMList.ERROR: " + e);
}
};


var doHome = function(tmpHstr) {
try {
oiaqB = "select * from cryptprice, cryptcoin where cryptcoin.cc_bsymbol  = cryptprice.cp_bsymbol order by cryptprice.cp_price_pct_chg desc limit 50";
doToQrySpoolArr(oiaqB, "dynJSfnishHmList");
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}
} catch(e) {
alert("doHome.ERROR: " + e);
}
};



var doFirstLoad = function(theFQA) {
try {
// JSSHOP.stopIntervalEvent("TRADES");
// JSSHOP.stopIntervalEvent("ASSETS");
// alert("doFirstLoad");
currStreamSymb = theFQA;
boolDoReload = "no";
tmpSpinDV = "dvMList" + theFQA;
tmpCstr = document.getElementById("dvMList" + theFQA).innerHTML;

if(currSortOrder[theFQA]) {
} else {
currSortOrder[theFQA] = {};
currSortOrder[theFQA]["sindex"] = "cp_symbol";
currSortOrder[theFQA]["sorder"] = "sortDesc";
}


 
JSSHOP.ui.setTinnerHTML("dvLoading", "loading...");
if((JSSHOP.getUnixTimeStamp() - currIdxCache[theFQA]) > 150) {
boolDoReload = "y";
}
 
if((tmpCstr.length < 3) ||  (tmpCstr.length == undefined) || (tmpCstr.length == null)){
boolDoReload = "y";
}

if((currStreamSymb == "FAVS")  || (currStreamSymb == "ALERTS")  || (currStreamSymb == "ASSETS")  || (currStreamSymb == "TRADES")){
boolDoReload = "y";
}

if(boolDoReload == "y") {

currIdxArr[theFQA] = null;
currIdxArr[theFQA] = "";
currIdxSort[theFQA] = null;
currIdxSort[theFQA] = "";
 
currIdxCache[theFQA] = JSSHOP.getUnixTimeStamp();
if(currStreamSymb == "FAVS") {
oiaqB = "select * from cryptprice, cryptcoin where cryptcoin.cc_props = '10' and  cryptprice.cp_bsymbol = cryptcoin.cc_bsymbol  order by cryptprice.cp_price_pct_chg desc";
} else if(currStreamSymb == "ASSETS") {
oiaqB = "select * from cryptasset, cryptcoin, cryptprice where cryptprice.cp_symbol  = cryptasset.ca_symbol and  cryptcoin.cc_symbol  = cryptasset.ca_symbol  group by cryptasset.ca_symbol  order by cryptasset.ca_locked desc, cryptasset.ca_free desc limit 50;";

// oiaqB = "select * from cryptasset, cryptcoin, cryptprice where cryptprice.cp_symbol  = cryptasset.ca_symbol and  cryptcoin.cc_symbol  = cryptasset.ca_symbol  group by cryptasset.ca_symbol  order by cryptasset.ca_free, cryptasset.ca_locked desc limit 50;";
// JSSHOP.startIntervalEvent("ASSETS", function() { doFirstLoad("ASSETS") }, 6000);


} else if(currStreamSymb == "ALERTS") {
 
// oiaqB = "select * from cryptprice, cryptcoin where cryptcoin.cc_props = '10' and  cryptprice.cp_bsymbol = cryptcoin.cc_bsymbol  order by cryptprice.cp_price_pct_chg desc";

oiaqB = "select * from cryptprice, cryptcoin where (cryptprice.cp_confirm_trans = '10' or cryptprice.cp_confirm_trans = '5') and  cryptprice.cp_bsymbol = cryptcoin.cc_bsymbol  order by cryptprice.cp_price_pct_chg desc";


} else if(currStreamSymb == "TRADES") {
oiaqB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol and crypttrade.ct_status = 'NEW' group by crypttrade.ct_dadded order by crypttrade.ct_dadded desc limit 15;";
// JSSHOP.startIntervalEvent("TRADES", function() { doFirstLoad("TRADES") }, 7000);
// oiaqB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol and crypttrade.ct_status = 'NEW' and cryptprice.cp_price > crypttrade.ct_price_limit and crypttrade.ct_side = 'SELL' group by crypttrade.ct_dadded order by crypttrade.ct_dadded desc limit 15;";
// oiaqB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol and crypttrade.ct_status = 'NEW' and cryptprice.cp_price < crypttrade.ct_price_limit and crypttrade.ct_side = 'BUY' group by crypttrade.ct_dadded order by crypttrade.ct_dadded desc limit 15;";
} else if(currStreamSymb == "ORDERS") {
oiaqB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol order by crypttrade.ct_dadded desc limit 15;";

// oiaqB = "select * from crypttrade order by _id desc limit 200";
} else {
oiaqB = "select * from cryptprice, cryptcoin where cryptprice.cp_bsymbol like '%"  + currStreamSymb + "' and  cryptcoin.cc_bsymbol  = cryptprice.cp_bsymbol order by cryptprice.cp_price_pct_chg desc";
}
currAppQstr = oiaqB;
doToQrySpoolArr(oiaqB, "dynJSfnishMList");
if(!runLoop) {
setTimeout("app.flushPSpool()", 500);
}

} else {
JSSHOP.ui.setTinnerHTML("dvLoading", " ");
}
// alert("doFirstLoad: " + theFQA);
// doPlainPipe(theFQA, "tmp/bnMList" + theFQA + ".txt", "fnishMList");
// doAssets();


} catch(e) {
alert("doFirstLoad:ERROR: " + e);
JSSHOP.ui.setTinnerHTML("dvLoading", "error");
}
};


 
