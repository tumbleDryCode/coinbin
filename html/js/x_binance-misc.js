var incrNewSymbols = 0;
var currNSymbArr = [];

var dynJSAddNSymbol = function() {
alert("dynJSAddNSymbol: " + currNSymbArr[incrNewSymbols]);
if(incrNewSymbols == currNSymbArr.length) {
currNSymbArr = null;
incrNewSymbols = 0;
} else { 
ttfState = fnshNuBNBXInfo(6, currNSymbArr[incrNewSymbols]);
// alert("ttfState: " + ttfState);
ttgState = fnshTickerStats(6, app.getTickerStatistics(currNSymbArr[incrNewSymbols]));
// ttcState = fnshNuCoinPipe(6, app.getUrlRespString("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=" + currCMCapiKey + "&symbol=" + getSymbol(currNSymbArr[incrNewSymbols])));
ttcState = fnshNuCoinPipe(6, app.getUrlRespString("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=" + currCMCapiKey + "&symbol=" + getSymbol(currNSymbArr[incrNewSymbols])));

incrNewSymbols++;
// JSSHOP.ui.popAndAppendLbox("<br>ttfState : " + ttfState, "n");
// JSSHOP.ui.popAndAppendLbox("<br>ttgState : " + ttgState, "n");
// JSSHOP.ui.popAndAppendLbox("<br>ttcState : " + ttcState, "n");
// alert(" dynJSAddNSymbol: " + ttgState + ":" + currNSymbArr[incrNewSymbols]);
setTimeout("dynJSAddNSymbol()", 7500);
}
};

function testNewSymbAdd(tNSStr) {
try {
currNSymbArr = tNSStr.split(",");
dynJSAddNSymbol();
} catch(e) {
JSSHOP.ui.popAndFillLbox("getBNBXInfo: " + e);
}
}


var doBNBSave = function() {
try {
app.setConfValString("prfsBinanceKey", document.getElementById("tmp_bnb_key").value);
app.setConfValString("prfsBinanceScrt", document.getElementById("tmp_bnb_scrt").value);
alert("Binance Keys Saved");
} catch(e) {
alert("doBNBSave.error: " + e);
}
};


var doCMCSave = function() {
try {
tCMCKval = document.getElementById("tmp_cmc_key").value;
app.setConfValString("prfsCMCKey", tCMCKval);
currCMCapiKey = tCMCKval;
alert("CoinMarketCap.com Key Saved");
} catch(e) {
alert("doCMCSave.error: " + e);
}
};


var getCMCapiKey = function() {
tRetCMCstr = "noQvalue";
try {
tRetCMCstr = app.fetchConfValString("prfsCMCKey");
currCMCapiKey = tRetCMCstr;
return tRetCMCstr;
} catch(e) {
alert("getCMCapiKey.Error: " + e);
}
};






var getBNBXInfo = function(tNC) {
// alert("getBNBXInfo: " + tNC);
try {
if(currExchangeInfo == null) {
tStrGEInf = "https://api.binance.com/api/v1/exchangeInfo";
// tStrAEInf = app.getUrlRespString(tStrGEInf);
tStrAEInf = app.getUContentString(tStrGEInf, "x_sdata-exchangeInfo.ucf");
currExchangeInfo = JSON.parse(tStrAEInf);
// alert("timezone: " + currExchangeInfo.timezone);
}  else {
// JSSHOP.ui.popAndFillLbox(JSON.stringify(currExchangeInfo));
}

// testNewSymbAdd(tNC);
// fnshNuBNBXInfo(6, tNBsymb);
} catch(e) {
JSSHOP.ui.popAndFillLbox("getBNBXInfo: " + e);
}
};


var fnshBNBXInfo = function(taRC, ttheRCResp, tcRC) {
fnshNuBNBXInfo(ttheRCResp);
};

var fnshNuBNBXInfo = function(ttScom, ttheNSymb) {
try {
strt = currExchangeInfo;
varSym = strt.symbols;
var len = varSym.length;
var iint = 0;
var pcid = 0;
tstr = "";
var fllq = [];
var tmpRetStr = "noQvalue";
 
while(iint < len) {
ts = varSym[iint];

tsymb = ts.baseAsset;
tbsymb = ts.symbol;
if(ttheNSymb == tbsymb) {

tBasst = ts.baseAsset;
tQasst = ts.quoteAsset;
tstat = ts.status;
tfilt = ts.filters;
	tac = null;
	oi = null;
    tmpVpar = null;
    tmpSobj = null;
    tmpFobj = null; 
    tmpVpar = [];
    tmpSobj = {};
    tmpFobj = {}; 

    tmpSobjA = {};
    tmpSobjA["t"] = "cc_rtype";
    tmpSobjA["v"] = 5;
    tmpVpar.push(tmpSobjA);
 
    tmpSobjB = {};
    tmpSobjB["t"] = "cc_symbol";
    tmpSobjB["v"] = tBasst;
    tmpVpar.push(tmpSobjB);

    tmpSobjC = {};
    tmpSobjC["t"] = "cc_name";
    tmpSobjC["v"] = "nada";
    tmpVpar.push(tmpSobjC);

    tmpSobjD = {};
    tmpSobjD["t"] = "cc_rank";
    tmpSobjD["v"] = "1";
    tmpVpar.push(tmpSobjD);

    tmpSobjE = {};
    tmpSobjE["t"] = "cc_props";
    tmpSobjE["v"] = "5";
    tmpVpar.push(tmpSobjE);

    tmpSobjF = {};
    tmpSobjF["t"] = "cc_bsymbol";
    tmpSobjF["v"] = tbsymb;
    tmpVpar.push(tmpSobjF);

    tmpSobjG = {};
    tmpSobjG["t"] = "cc_status";
    tmpSobjG["v"] = tstat;
    tmpVpar.push(tmpSobjG);

    tmpSobjH = {};
    tmpSobjH["t"] = "cc_base_asset";
    tmpSobjH["v"] = tBasst;
    tmpVpar.push(tmpSobjH);

    tmpSobjI = {};
    tmpSobjI["t"] = "cc_quote_asset";
    tmpSobjI["v"] = tQasst;
    tmpVpar.push(tmpSobjI);

    tmpSobjJ = {};
    tmpSobjJ["t"] = "cc_filters";
    tmpSobjJ["v"] = JSON.stringify(tfilt);
    tmpVpar.push(tmpSobjJ);

    tmpSobjK = {};
    tmpSobjK["t"] = "cc_market_cap";
    tmpSobjK["v"] = "nada";
    tmpVpar.push(tmpSobjK);

    tmpSobjL = {};
    tmpSobjL["t"] = "cc_available_supply";
    tmpSobjL["v"] = "nada";
    tmpVpar.push(tmpSobjL);

    tmpSobjM = {};
    tmpSobjM["t"] = "cc_total_supply";
    tmpSobjM["v"] = "nada";
    tmpVpar.push(tmpSobjM);

    tmpSobjN = {};
    tmpSobjN["t"] = "cc_max_supply";
    tmpSobjN["v"] = "nada";
    tmpVpar.push(tmpSobjN);

 



    tmpFobj["knvp"] = tmpVpar;
    oi = getNuDBFnvp("cryptcoin",ttScom,null,tmpFobj);
    tac = nCurrCnxOb();
tac["q"] = oi["rq"];
tac["cb"] = "defOutput";
app.addToQrySpoolArr(oi["rq"], "doNada");
tmpRetStr = oi["rq"];
if(ttScom == 6) {
// fnshTickerStats(ttScom, app.getTickerStatistics(tbsymb));
}
}
iint++;
}
return tmpRetStr;
} catch(e) {
alert("fnshNuBNBXInfo: " + e);
return "noQvalue";
}
};



var checkHasXinfo = function(aRC, theRCResp, cRC) {
try {

if(theRCResp.indexOf("_id") != -1) {
fnshBNBXInfo(7,aRC,"ab");
} else {
fnshBNBXInfo(6,aRC,"ab");
}


} catch(e) { 
alert("checkHasXinfo error: " + e);
}
};









var doBNBxinfo = function(theSTr) {

try {
 
 
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where _id > ?";
    tmpDOs["wa"] = [1];
    tmpDOs["l"] = 1;
    oi = getNuDBFnvp("cryptcoin", 5, null, tmpDOs);
 
//alert("mm: " + oi["rq"]);
tac = nCurrCnxOb();
// tac["lz"] = "y";
tac["q"] = oi["rq"];
tac["cb"] = "checkHasXinfo";
//doNurQComm(tac);
doQComm(oi["rq"], theSTr, "checkHasXinfo");
 
} catch(e) { 
alert("doBNBxinfo error: " + e);
}
};










var doTickerPrice = function() {
try {
strL = app.getTickerPrice('6');
} catch(e) { 
alert("doTickerPrice error: " + e);
}
};

var doOldTickerPrice = function() {
try {
strL = app.getTickerPrice('k');
document.getElementById("taCMC").value = strL;
strAA = document.getElementById("taCMC").value;
fnshPrice(7, strAA, "nada");
 
} catch(e) { 
alert("checkHasXinfo error: " + e);
}
};

var checkHasTStats = function(aRC, theRCResp, cRC) {
try {
 
if(theRCResp.indexOf("_id") != -1) {
alert("has price id db: " + theRCResp);
fnshPrice(7, strAA, "nada");
} else {

alert("not has exchange db: " + theRCResp);
fnshPrice(6, strAA, "nada");
/*


alert(strAA);
*/
}
} catch(e) { 
alert("checkHasTStats error: " + e);
}
};

var doTickerStats = function() {

try {


strAA = document.getElementById("taCMC").value;
if(strAA.indexOf("sym") != -1) {
fnshYoAjaxPipe(6, strAA, "nada");
} else {
 
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where _id > ?";
    tmpDOs["wa"] = [1];
    tmpDOs["l"] = 1;
    oi = getNuDBFnvp("cryptprice", 5, null, tmpDOs);
 
 
 doQComm(oi["rq"], null, "checkHasTStats");
}
 
} catch(e) { 
alert("doTickerStats error: " + e);
}
// doXpipe("theE", "https://api.binance.com/api/v1/exchangeInfo", "defOutput");

};











var fnshCMarket = function(theA, theB, theC) {

alert(theB);
};


var doCoinMarket = function() {
try {
fnshCoinPipe();
// https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=" + currCMCapiKey + "&symbol=BTC
// doXpipe("n", "https://api.coinmarketcap.com/v1/ticker/?limit=1500", "fnshACoinPipe");
} catch(e) {
alert(e);
}
};













var fnshCoinPipe = function() {
aastrt = document.getElementById("taCMC").value;
fnshACoinPipe("nada",aastrt,"nep");
};
var fnshTestCoinPipe = function(thelem, tmpstrt, thearr) {
alert("fnshTestCoinPipe: " + tmpstrt);
};


var fnshACoinPipe = function(thelem, tmpstrt, thearr) {
};

var fnshNuCoinPipe = function(tmpSQC, tmpstrt) {
aRC = tmpSQC;
try {
astrtat = JSON.parse(tmpstrt);
strt = astrtat.data;
// alert("fnshNuCoinPipe: " + tmpstrt);
var tFCPRetStr = "noQvalue";
// varSym = strt;
var len = strt.length;

var iint = 0;
var pcid = 0;
tstr = "";
var fllq = [];


while(iint < len) {
ts = strt[iint];

/*
        "id": "bitcoin", 
        "name": "Bitcoin", 
        "symbol": "BTC", 
        "rank": "1", 
        "price_usd": "11187.2", 
        "price_btc": "1.0", 
        "24h_volume_usd": "5667810000.0", 
        "market_cap_usd": "189061576806", 
        "available_supply": "16899812.0", 
        "total_supply": "16899812.0", 
        "max_supply": "21000000.0", 
        "percent_change_1h": "-0.08", 
        "percent_change_24h": "-2.69", 
        "percent_change_7d": "16.63", 
        "last_updated": "1520183065"

*/
tname = ts.name;
// trank = ts.rank;
trank = ts.cmc_rank;
tsymbol = ts.symbol;
tavsp = ts.circulating_supply;
tttlsp = ts.total_supply;
tmxsp = ts.max_supply;




tcap = ts.quote.USD.market_cap;
tpctf = ts.quote.USD.percent_change_24h;
tpcw = ts.quote.USD.percent_change_7d;
  
    tmpVpar = null;
    tmpSobj = null;
    tmpFobj = null; 
    tmpVpar = [];
    tmpSobj = {};
    tmpFobj = {}; 

 

    tmpSobjC = {};
    tmpSobjC["t"] = "cc_name";
    tmpSobjC["v"] = tname;
    tmpVpar.push(tmpSobjC);

    tmpSobjD = {};
    tmpSobjD["t"] = "cc_rank";
    tmpSobjD["v"] = trank;
    tmpVpar.push(tmpSobjD);

 

    tmpSobjK = {};
    tmpSobjK["t"] = "cc_market_cap";
    tmpSobjK["v"] = tcap;
    tmpVpar.push(tmpSobjK);

    tmpSobjL = {};
    tmpSobjL["t"] = "cc_available_supply";
    tmpSobjL["v"] = tavsp;
    tmpVpar.push(tmpSobjL);

    tmpSobjM = {};
    tmpSobjM["t"] = "cc_total_supply";
    tmpSobjM["v"] = tttlsp;
    tmpVpar.push(tmpSobjM);

    tmpSobjN = {};
    tmpSobjN["t"] = "cc_max_supply";
    tmpSobjN["v"] = tmxsp;
    tmpVpar.push(tmpSobjN);


    tmpSobjO = {};
    tmpSobjO["t"] = "cc_price_day_chg";
    tmpSobjO["v"] = tpctf;
    tmpVpar.push(tmpSobjO);


    tmpSobjP = {};
    tmpSobjP["t"] = "cc_price_week_chg";
    tmpSobjP["v"] = tpcw;
    tmpVpar.push(tmpSobjP);

    tmpSobjQ = {};
    tmpSobjQ["t"] = "cc_dadded";
    tmpSobjQ["v"] =  JSSHOP.getUnixTimeStamp();
    tmpVpar.push(tmpSobjQ); 

    tmpFobj["ws"] = "where cc_symbol = ?";
    tmpFobj["wa"] = [tsymbol];
    tmpFobj["l"] = ["1"];

    tmpFobj["knvp"] = tmpVpar;
    oi = getNuDBFnvp("cryptcoin",aRC,null,tmpFobj);
tac = nCurrCnxOb();
tac["q"] = oi["rq"];
tac["cb"] = "defOutput";
app.addToQrySpoolArr(oi["rq"], "noQvalue");
tFCPRetStr = oi["rq"];
iint++;


}
alert("ttl: " + iint);
return tFCPRetStr;
 
// setTimeout("app.flushPSpool()", 500);
} catch(e) {

alert("fnshNuCoinPipe error: " + e + " :: " + tmpstrt);
return "noQvalue";
}

};











var fnshTickerStats = function(ttFTScom, theRstr) {
var aRC = ttFTScom;
try {
// aaarval = app.getTickerStatistics('4');
// document.getElementById("taCMC").value = aaarval;

strAA = theRstr;
varSym = JSON.parse(strAA);
// alert("fnshTickerStats: " + strAA);
var tFTSRetStr = "noQvalue";
 
var len = varSym.length;
var iint = 0;
var pcid = 0;
tstr = "";
var fllq = [];
 
while(iint < len) {
ts = varSym[iint];
 
/*







  cp_rtype int(4), 5
  cp_symbol varchar(11), symbol

  cp_bsymbol varchar(11), symbol
  cp_price varchar(24), lastPrice
  cp_prices text(), x
  cp_price_chg varchar(24), priceChange
  cp_price_pct_chg varchar(24), priceChangePercent
  cp_open_price varchar(24), openPrice
  cp_high_price varchar(24), highPrice
  cp_low_price varchar(24), lowPrice
  cp_volume varchar(24), volume
  cp_count varchar(24), count
  cp_buy_at varchar(24), x
  cp_sell_at varchar(24), x
  cp_confirm_trans varchar(6), x
  cp_dadded varchar(14)
 


*/
 
cpt_symbol = ts.symbol;
if(cpt_symbol.indexOf("USDT") != -1) {
cp_symbol = cpt_symbol.substring(0, cpt_symbol.length - 4);
} else {
cp_symbol = cpt_symbol.substring(0, cpt_symbol.length - 3);
}
cp_bsymbol = cpt_symbol;
cp_price = ts.lastPrice;
cp_price_chg = ts.priceChange;
cp_price_pct_chg = ts.priceChangePercent;
cp_open_price = ts.openPrice;
cp_high_price = ts.highPrice;
cp_low_price = ts.lowPrice;
cp_volume = ts.volume;
cp_count = ts.count;
cp_dadded = JSSHOP.getUnixTimeStamp();

    tmpVpar = null;
    tmpSobj = null;
    tmpFobj = null; 
    tmpVpar = [];
    tmpSobj = {};
    tmpFobj = {}; 


    tmpSobjC = {};
    tmpSobjC["t"] = "cp_symbol";
    tmpSobjC["v"] = cp_symbol;
    tmpVpar.push(tmpSobjC);

    tmpSobjD = {};
    tmpSobjD["t"] = "cp_bsymbol";
    tmpSobjD["v"] = cp_bsymbol;
    tmpVpar.push(tmpSobjD);

     tmpSobjK = {};
    tmpSobjK["t"] = "cp_price";
    tmpSobjK["v"] = cp_price;
    tmpVpar.push(tmpSobjK);

    tmpSobjKA = {};
    tmpSobjKA["t"] = "cp_prices";
    tmpSobjKA["v"] = cp_price;
    tmpVpar.push(tmpSobjKA);

    tmpSobjL = {};
    tmpSobjL["t"] = "cp_price_chg";
    tmpSobjL["v"] = cp_price_chg;
    tmpVpar.push(tmpSobjL);

    tmpSobjM = {};
    tmpSobjM["t"] = "cp_price_pct_chg";
    tmpSobjM["v"] = cp_price_pct_chg;
    tmpVpar.push(tmpSobjM);

    tmpSobjN = {};
    tmpSobjN["t"] = "cp_open_price";
    tmpSobjN["v"] = cp_open_price;
    tmpVpar.push(tmpSobjN);


    tmpSobjW = {};
    tmpSobjW["t"] = "cp_high_price";
    tmpSobjW["v"] = cp_high_price;
    tmpVpar.push(tmpSobjW);


    tmpSobjO = {};
    tmpSobjO["t"] = "cp_low_price";
    tmpSobjO["v"] = cp_low_price;
    tmpVpar.push(tmpSobjO);

     tmpSobjP = {};
    tmpSobjP["t"] = "cp_volume";
    tmpSobjP["v"] = cp_volume;
    tmpVpar.push(tmpSobjP);


     tmpSobjPA = {};
    tmpSobjPA["t"] = "cp_buy_at";
    tmpSobjPA["v"] = "0";
    tmpVpar.push(tmpSobjPA);

     tmpSobjPB = {};
    tmpSobjPB["t"] = "cp_sell_at";
    tmpSobjPB["v"] = "0";
    tmpVpar.push(tmpSobjPB);

     tmpSobjQ = {};
    tmpSobjQ["t"] = "cp_dadded";
    tmpSobjQ["v"] = JSSHOP.getUnixTimeStamp();;
    tmpVpar.push(tmpSobjQ);

    tmpFobj["ws"] = "where cp_bsymbol = ?";
    tmpFobj["wa"] = [cp_bsymbol];
    tmpFobj["l"] = ["1"];

    tmpFobj["knvp"] = tmpVpar;
    oi = getNuDBFnvp("cryptprice",aRC,null,tmpFobj);
    

tac = nCurrCnxOb();
// tac["lz"] = "y";
tac["q"] = oi["rq"];
tac["cb"] = "defOutput";
tFTSRetStr = oi["rq"];

// doNurQComm(tac);
app.addToQrySpoolArr(oi["rq"], "doNada");
// alert("total q: " + tac["q"]);

if(ttFTScom == 6) {
// fnshNuCoinPipe(6, app.getUContentString("https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=" + currCMCapiKey + "&symbol=" + cp_symbol, "cmktc-xsdata-" + cp_symbol));
}
iint++;
}
// alert("total fnshTickerStats: " + iint);
// runIDXdisplay(idxBTC);
return tFTSRetStr; 
} catch(e) {
return "noQvalue";
JSSHOP.ui.popAndAppendLbox("fnshTickerStats : " + e, "n");
// alert("fnshTickerStats error: " + e);
}
};













 


















var fixPrice = function(theRCOnj) {

try {
tmpATTA = JSON.parse(theRCOnj.rs);
newprice = theRCOnj.el;
pprice = tmpATTA[0].cp_price;
pw = newprice - pprice;
pp =  (pw / pprice) * 100;
cp_bsymbol = tmpATTA[0].cp_bsymbol;



 
    tmpVpar = null;
    tmpSobj = null;
    tmpFobj = null; 
    tmpVpar = [];
    tmpSobj = {};
    tmpFobj = {}; 


 
 
    tmpSobjK = {};
    tmpSobjK["t"] = "cp_prices";
    tmpSobjK["v"] = newprice;
    tmpVpar.push(tmpSobjK);

    tmpSobjL = {};
    tmpSobjL["t"] = "cp_price_chg";
    tmpSobjL["v"] = pw;
    tmpVpar.push(tmpSobjL);

    tmpSobjM = {};
    tmpSobjM["t"] = "cp_price_pct_chg";
    tmpSobjM["v"] = pp;
    tmpVpar.push(tmpSobjM);
 

    tmpFobj["ws"] = "where cp_bsymbol = ?";
    tmpFobj["wa"] = [cp_bsymbol];
    tmpFobj["l"] = ["1"];

    tmpFobj["knvp"] = tmpVpar;
    oi = getNuDBFnvp("cryptprice",7,null,tmpFobj);
    
    
/*

tac = nCurrCnxOb();
// tac["lz"] = "y";
tac["q"] = oi["rq"];
tac["cb"] = "defOutput";
doNurQComm(tac);
*/
currQStrPrices += oi["rq"] + ";";
// return oi["rq"];
 
} catch(e) {
// alert("fixPrice error: " + e + " ;; " + theRCOnj.rs);
}
};



var fnshPrice = function(aRC, theRCResp, cRC) {
try {
strt = JSON.parse(theRCResp);
currQStrPrices = "";
if(theRCResp.indexOf("symbol") != -1) {
varSym = strt;
var len = varSym.length;
var iint = 0;
var pcid = 0;
tstr = "";
var fllq = [];

while(iint < len) {
ts = varSym[iint];
tsbs = ts.symbol;
tss = ts.symbol;

tsp = ts.price;

 


    tmpVpar = null;
    tmpSobj = null;
    tmpFobj = null; 
    tmpVpar = [];
    tmpSobj = {};
    tmpFobj = {}; 

 

    tmpDOs["c"] = ["cp_price", "cp_bsymbol"];
    tmpFobj["ws"] = "where cp_bsymbol = ?";
    tmpFobj["wa"] = [tsbs];
    tmpFobj["l"] = ["1"];

    tmpFobj["knvp"] = tmpVpar;
    oi = getNuDBFnvp("cryptprice",5,null,tmpFobj);
    
tac = nCurrCnxOb();
tac["q"] = oi["rq"];
tac["el"] = tsp;
tac["cb"] = "fixPrice";
doNurQComm(tac);



tmpM = "mrkr" + tsbs;
if(document.getElementsByName(tmpM)) {


} // emd if mrkr

iint++;

}


alert("fnshPrice symbols: " + iint); 
} else {
alert("fnshPrice: " + theRCResp);
}
app.doPriceRefresh(currQStrPrices);
//  doQComm(currQStrPrices, null, "looperTheater");
looperTheater();
} catch(e) {
alert("fnshPrice error: " + e);
}
};










var fnshTimePipe = function(aRC, theRCResp, cRC) {
try {
diptime = JSSHOP.getUnixMiliStamp();
// alert(diptime);
strt = JSON.parse(theRCResp);

serTime = Math.round(strt.serverTime);
serverTlaps = JSSHOP.getUnixMiliStamp() - serTime;
alert("diptime: " + diptime + " st. " + strt.serverTime + " serverTlaps: " + serverTlaps);
} catch(e) { 
alert(e);
}
};







var doTimePipe = function() {
try {
tmpCB = window["fnshTimePipe"];
 
fnlUrl = "https://api.binance.com/api/v1/time";
 
var yoReq = JSSHOP.ajax.createXMLHTTPObject();
 
 	 tUTA = JSSHOP.shared.urlToArray(fnlUrl);
	   if(yoReq == false) {
               tmpCB(theElem,"Error",tUTA);

	  } else {
        yoReq.onreadystatechange = function() {
            if (yoReq.readyState == 4) {

 
               tmpCB("theElem",yoReq.responseText,tUTA);
		  
            }  
        }
        yoReq.onerror = function() {
            alert("yuuuikssses, we have a connection problem..." + JSON.stringify(yoReq) + ":" + fnlUrl);
        }
        yoReq.open("GET", fnlUrl, true);
 

	 yoReq.setRequestHeader("X-MBX-APIKEY", bkey);
 
	 picr = yoReq.send(null);
	   }
} catch(e) {
alert(e);
}
 
};




var defOutput = function(aRC, theRCResp, cRC) {
try {
document.getElementById("taCMC").value = theRCResp;
} catch(e) { 
alert(e);
}
};



var doXsign = function(tmpSstr, andBencode) {
sstr = app.sign(tmpSstr, tmpSstr);
document.getElementById("tblSettings").value = sstr;
return document.getElementById("tblSettings").value;
}; 







var doPlainPipe = function(theE, theU, theCB) {
 
try {
tmpCB = window[theCB];

tUTA = {};
if(theU.indexOf("?") != -1) {
tUTA = JSSHOP.shared.urlToArray(theU);
}
 
//  var yoReq = JSSHOP.ajax.createXMLHTTPObject();
var yoReq =  new XMLHttpRequest();

 
 
 
	   if(yoReq == false) {
               tmpCB(theElem,"Error",tUTA);

	  } else {
        yoReq.onreadystatechange = function() {
            if (yoReq.readyState == 4) {
               tmpCB(theE,yoReq.responseText,tUTA);
		  
            }  
        }
        yoReq.onerror = function() {
            alert("doPlainPipe , we have a connection problem..." + JSON.stringify(yoReq) + ":" + fnlUrl);
        }
        yoReq.open("GET", theU, true);
 
 
	 yoReq.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299");
	 yoReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	 yoReq.setRequestHeader("Access-Control-Allow-Origin","*");
 
 
	 picr = yoReq.send(null);
	   }
 
} catch(e) {
alert("doPlainPipe eror: " + e);
}
};







var doXpipe = function(theE, theU, theCB) {
 
try {
tmpCB = window[theCB];

tUTA = {};
if(theU.indexOf("?") != -1) {
tUTA = JSSHOP.shared.urlToArray(theU);
}
fnlUrl = theU;

/*

fnlUrl = "https://yobit.net/api/3/info";
fnlUrl = "https://api.binance.com/api/v1/time";
// fnlUrl = "https://api.binance.com/api/v3/account?timestamp=" + diptime + "&signature=" + document.getElementById("tblSettings").value;
fnlUrl = "https://api.binance.com/api/v1/exchangeInfo";
fnlUrl = "https://api.coinmarketcap.com/v1/ticker/?limit=1500";

theU = fnlUrl;
*/
var yoReq = JSSHOP.ajax.createXMLHTTPObject();
//  var yoReq =  new XMLHttpRequest();

 
 	 tUTA = JSSHOP.shared.urlToArray(fnlUrl);
 
	   if(yoReq == false) {
               tmpCB(theElem,"Error",tUTA);

	  } else {
        yoReq.onreadystatechange = function() {
            if (yoReq.readyState == 4) {
               tmpCB("theElem",yoReq.responseText,tUTA);
		  
            }  
        }
        yoReq.onerror = function() {
            alert("aaayuuuikssses, we have a connection problem..." + JSON.stringify(yoReq) + ":" + fnlUrl);
        }
        yoReq.open("POST", theU);
 
 /*
	 yoReq.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299");
	 yoReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	 yoReq.setRequestHeader("Access-Control-Allow-Origin","*");

	 yoReq.setRequestHeader("X-MBX-APIKEY", bkey);
 */
	 picr = yoReq.send(null);
	   }
 } catch(e) {
alert("doXpipe: " + e);
}
 
};


 


var valStime = function() {
if(serverTlaps < 10) {
doTimePipe();
} else {
olddoYoAjaxPipe();
}
};

 



var doAppOrders = function(tBuyStr,tSellStr,tOtypeStr) {
try {
app.doAppOrders(tBuyStr,tSellStr,tOtypeStr);
} catch(e) {
alert("doAppOrders: " + e);
}
};










 








var listAIOrders = function() {
dvBuyList.innerHTML = "";
dvSellList.innerHTML = "";
try {
iBA = 0;
iSA = 0;
iBL = currBuyOrdersArr.length;
iSL = currSellOrdersArr.length;
while(iBA < iBL){
tOBA = currBuyOrdersArr[iBA];
toderstr = "javascript:doNuTestOrder(getOrderObj('" + tOBA.type + "','" + tOBA.symbol + "','" + tOBA.qty + "','" + tOBA.price + "','" + idxQPrice[currIdxSymbol] + "','" + tOBA.msg + "'));";
tOLink =  "<div><a href=\"" + toderstr + "\">" + tOBA.msg + "</font></a></div>";
dvBuyList.innerHTML = dvBuyList.innerHTML  + tOLink;
iBA++;
if(iBA == iBL) {
currBuyOrdersArr = null;
currBuyOrdersArr = [];
}
}
while(iSA < iSL){
tOSA = currSellOrdersArr[iSA];
toderstr = "javascript:doNuTestOrder(getOrderObj('" + tOSA.type + "','" + tOSA.symbol + "','" + tOSA.qty + "','" + tOSA.price + "','" + idxQPrice[currIdxSymbol] + "','" + tOSA.msg + "'));";
tOLink =  "<div><a href=\"" + toderstr + "\">" + tOSA.msg + "</font></a></div>";
dvSellList.innerHTML = dvSellList.innerHTML  + tOLink;
iSA++;
if(iSA == iSL) {
currSellOrdersArr = null;
currSellOrdersArr = [];
}
}

} catch(e) {
alert("listAIOrders: " + e);
}
};





  






var fnshExchangeInfo = function(tDBQi, theRCResp) {
try {
strt = JSON.parse(theRCResp);

if(theRCResp.indexOf("symbol") != -1) {
varSym = strt.symbols;
var len = varSym.length;
var iint = 0;
var pcid = 0;
tstr = "";
var fllq = [];

tmpTblStgs = document.getElementById("tblSettings");
while(iint < len) {
ts = varSym[iint];

tsymb = ts.baseAsset;
tbsymb = ts.symbol;
tBasst = ts.baseAsset;
tQasst = ts.quoteAsset;
tstat = ts.status;
tfilt = ts.filters;

    tmpVpar = null;
    tmpSobj = null;
    tmpFobj = null; 
    tmpVpar = [];
    tmpSobj = {};
    tmpFobj = {}; 

    tmpSobjA = {};
    tmpSobjA["t"] = "cc_rtype";
    tmpSobjA["v"] = 5;
    tmpVpar.push(tmpSobjA);
 
    tmpSobjB = {};
    tmpSobjB["t"] = "cc_symbol";
    tmpSobjB["v"] = tBasst;
    tmpVpar.push(tmpSobjB);

    tmpSobjC = {};
    tmpSobjC["t"] = "cc_name";
    tmpSobjC["v"] = "nada";
    tmpVpar.push(tmpSobjC);

    tmpSobjD = {};
    tmpSobjD["t"] = "cc_rank";
    tmpSobjD["v"] = "1";
    tmpVpar.push(tmpSobjD);

    tmpSobjE = {};
    tmpSobjE["t"] = "cc_props";
    tmpSobjE["v"] = "5";
    tmpVpar.push(tmpSobjE);

    tmpSobjF = {};
    tmpSobjF["t"] = "cc_bsymbol";
    tmpSobjF["v"] = tbsymb;
    tmpVpar.push(tmpSobjF);

    tmpSobjG = {};
    tmpSobjG["t"] = "cc_status";
    tmpSobjG["v"] = tstat;
    tmpVpar.push(tmpSobjG);

    tmpSobjH = {};
    tmpSobjH["t"] = "cc_base_asset";
    tmpSobjH["v"] = tBasst;
    tmpVpar.push(tmpSobjH);

    tmpSobjI = {};
    tmpSobjI["t"] = "cc_quote_asset";
    tmpSobjI["v"] = tQasst;
    tmpVpar.push(tmpSobjI);

    tmpSobjJ = {};
    tmpSobjJ["t"] = "cc_filters";
    tmpSobjJ["v"] = tfilt;
    tmpVpar.push(tmpSobjJ);

    tmpSobjK = {};
    tmpSobjK["t"] = "cc_market_cap";
    tmpSobjK["v"] = "nada";
    tmpVpar.push(tmpSobjK);

    tmpSobjL = {};
    tmpSobjL["t"] = "cc_available_supply";
    tmpSobjL["v"] = "nada";
    tmpVpar.push(tmpSobjL);

    tmpSobjM = {};
    tmpSobjM["t"] = "cc_total_supply";
    tmpSobjM["v"] = "nada";
    tmpVpar.push(tmpSobjM);

    tmpSobjN = {};
    tmpSobjN["t"] = "cc_max_supply";
    tmpSobjN["v"] = "nada";
    tmpVpar.push(tmpSobjN);


    tmpSobjO = {};
    tmpSobjO["t"] = "cc_dadded";
    tmpSobjO["v"] = JSSHOP.getUnixTimeStamp();
    tmpVpar.push(tmpSobjO);
 




    tmpFobj["knvp"] = tmpVpar;
    oi = getNuDBFnvp("cryptcoin",6,null,tmpFobj);
    

app.addToQrySpoolArr(oi["rq"], "doNada");
iint++;


}
// alert("total symbols: " + iint);
// runIDXdisplay(idxBTC);
} else {

// serverTime = Math.round(strt.serverTime);
// alert("theRCResp: " + theRCResp);
}
} catch(e) {
alert("prepExchangeInfo error: " + e);
}
};



var prepExchangeInfo = function() {
try {
if(runLoop == true) {
alert("Toggle Run Loop to Off");
} else {
 aaarval = app.getUContentString("https://api.binance.com/api/v1/exchangeInfo", "x_sdata-exchangeInfo.ucf");
//aaarval = app.getUrlRespString("https://api.binance.com/api/v1/exchangeInfo");
fnshExchangeInfo(6, aaarval);
}
} catch(e) {
alert("prepExchangeInfo: " +  e + "\r\n" + aaarval);
}
};

var prepTickerStats = function() {
try {
if(runLoop) {
alert("Toggle Run Loop to Off");
} else {
aaarval = app.getUContentString("https://api.binance.com/api/v1/ticker/24hr", "x_sdata-ticker.ucf");
// aaarval = app.getUrlRespString("https://api.binance.com/api/v1/ticker/24hr");
fnshTickerStats(6, aaarval);
}
} catch(e) {
alert("prepTickerStats: " +  e + "\r\n" + aaarval);
}
};


var prepCoinPipe = function() {
try {
if(runLoop) {
alert("Toggle Run Loop to Off");
} else {

aaarval = app.getUContentString("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" + currCMCapiKey + "&start=1&limit=5000", "x_sdata-coinmarketcap.ucf");
// aaarval = app.getUContentString("https://api.coinmarketcap.com/v1/ticker/?limit=1500", "x_sdata-coinmarketcap.ucf");
// aaarval = app.getUrlRespString("https://api.coinmarketcap.com/v1/ticker/?limit=1500");
// strt = JSON.parse(aaarval);
// tdata = strt.data;
document.getElementById("taCMC").value = aaarval;
strTCMCAA = document.getElementById("taCMC").value;
fnshNuCoinPipe(7, strTCMCAA);
}
} catch(e) {
alert("prepCoinPipe: " +  e + "\r\n" + aaarval);
}
};



