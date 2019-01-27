// Various Scripts pertaining to the pages.
var onlyNums = new RegExp(/^\d{10}$/); // allow only numbers 
// var pipeDir = "http://localhost/evenflow/webdroid/assets/quickorder/";
var pipeDir = "noQvalue";
var forceCache = "n";
var currCacheVer = "1";
var timeout_handles = [];
var loaded_scripts = [];
var loaded_streams = [];
var arrUprefs = [];
var trgr_bclck = [];
var canLoad = "no";
var pid = "index_main";
var ppid = 0;
var cid = 0;
var catid = 0;
var itemid = 0;
var pgpq = "noQvalue";
var arrDBnDocFNames = [];
var arrDBnDocFNVpar = [];
var arrDBFNames = [];
var arrAllForms = [];
var tmpSQBArr = [];
var tmpVindex = 0; 
var ntImgCtr = []; // array counter for images
var currMresp = "";
var quid = 0;
var cartID = "noQvalue"
var currRQstr =  "noQvalue";
var currRQdb = "qbits";
var currRQtable = "qbit";
var currDBUGstr = "";
var currMenuObj;
var currACTBstr = "";
var currMenuArr = [];
var currItemArr = [];
var currItemsArr = [];
var currMItemsArr = [];
var currProdsArr = [];
var currQcommsArr = [];
var currFrmQArr = [];
var currPgTitle = "QQQ";
var currAdmnMode = "n";
var currImgSleep = 280; // sleeping before setting image source
var currUrlArr = {};
var currCnxOb = {};
var currFFieldOb = {};
var currFFinitArr = [];
var currPgIndex = 0; // pagination starts at 1
var currProdsPPg = 10; // pagination  - number of items per page
var stxt = [];
var usrlang = "en_us";
var actbSearch;
var actbLoaded = false; // boolean show js_actb.js  is loaded
var shopDir = document.location.href;
path = shopDir;
n = path.lastIndexOf("/");
q = path.lastIndexOf("?");
if (n >= 0) {
shopDir = path.substring(0, n+ 1);
} else {
shopDir += "/";
}





// creates a form component object for uniform
// events and validation
var nCurrFFieldOb = function() {
aCurrFFieldOb = null;
aCurrFFieldOb= {};
aCurrFFieldOb["fid"] = "noQvalue"; // field id
aCurrFFieldOb["fty"] = "noQvalue"; // field type - for future use
aCurrFFieldOb["fdc"] = "cls_input_text"; // field default class
aCurrFFieldOb["ffc"] = "cls_input_text cls_input_text_focus"; // field focus class
aCurrFFieldOb["fdv"] = "noQvalue"; // field default value
aCurrFFieldOb["fda"] = "noQvalue"; // field allow validation of default value - default is false
aCurrFFieldOb["fvr"] = "noQvalue"; // field validation - raw regex
aCurrFFieldOb["fve"] = "noQvalue"; // field validation error text
aCurrFFieldOb["fof"] = "noQvalue"; // field onfocus
aCurrFFieldOb["fob"] = "noQvalue"; // field onblur
aCurrFFieldOb["fcl"] = "noQvalue"; // click
aCurrFFieldOb["fku"] = "noQvalue"; // keyup
aCurrFFieldOb["fkd"] = "noQvalue"; // keydown
aCurrFFieldOb["lid"] = "noQvalue"; // labelid
aCurrFFieldOb["ltxt"] = "noQvalue"; // label text
return aCurrFFieldOb;
};



var nCurrCnxOb = function() {
acurrCnxOb = null;
acurrCnxOb = {};
acurrCnxOb["st"] = "noQvalue"; // status
acurrCnxOb["fn"] = "noQvalue"; // file name
acurrCnxOb["ts"] = "123"; // timepstamp
acurrCnxOb["fc"] = getFrcCacheRLoad("n"); // force cache. check if tc is passed in url
acurrCnxOb["lz"] = "n"; // zip compress
acurrCnxOb["ls"] = "n"; // lcl storage
acurrCnxOb["el"] = "noQvalue"; // element for callback
acurrCnxOb["cb"] = "noQvalue"; // callback
acurrCnxOb["q"] = "noQvalue"; // query string
acurrCnxOb["ur"] = shopDir + "_p/do.php?"; // ajax url
acurrCnxOb["rs"] = "noQvalue"; // response string
acurrCnxOb["er"] = "noQvalue"; // error string
acurrCnxOb["ui"] = "noQvalue"; // current user interface
return acurrCnxOb;
};

currCnxOb = nCurrCnxOb();
currFFielOb = nCurrFFieldOb();






function getNuLclStrg(lsObj, lsKey, lsDefVal) {
	try {
        if (localStorage[lsKey]) {
           return localStorage[lsKey];
        } else {
		// alert("getNuLclStrg-nada: " + lsKey);
           return lsDefVal;
        }
	} catch(e) {
	alert("getNuLclStrg: " + e);
           return lsDefVal;
	}
}
function clearNuLclStrg(lsObj, lsKey) {
	try {
    if(typeof(Storage) !== "undefined") {
		localStorage.removeItem(lsKey);
    }
	} catch(e) {
           alert("clearNuLclStrg: " + e);
	}
}
function setNuLclStrg(lsObj, lsKey, lsVal) {
	try {
	// alert("setNuLclStrg: " + " : " + lsKey + " : " + lsVal);
    if(typeof(Storage) !== "undefined") {
        localStorage[lsKey] = lsVal;
    }
	} catch(e) {
         //   alert("setNuLclStrg: " + e);
	}
}





function getLclStrg(lsName, lsDefVal) {
        if (localStorage[lsName]) {
           return localStorage[lsName];
        } else {
           return lsDefVal;
        }
}


function clearLclStrg(lsName) {
    if(typeof(Storage) !== "undefined") {
		localStorage.removeItem(lsName);
    }
}
function setLclStrg(lsName, lsVal) {
    if(typeof(Storage) !== "undefined") {
        localStorage[lsName] = lsVal;
    }
}


 

var getCurrUrl = function() {
var strTurl = "noQvalue";
strCurl = document.location.href;
if(strCurl.indexOf("?") != -1) {
strTurl = strCurl.substring(strCurl.indexOf('?') + 1);
}
if((isPhP == "no") && (isJApp == "y")) {
try  {
JSSHOP.loadScript('css/x_japp.css', JSSHOP.checkLoader,'css');
strTurl = app.getCurrPageVars("nada");
document.getElementById("fldChallArray").value = strTurl;
strTurl = document.getElementById("fldChallArray").value;
} catch(e) {
alert("getCurrUrl: " + e);
}
}
return strTurl;
// if(strTurl == "noQvalue") {} else {}
// newArr = JSSHOP.shared.urlToArray(strTurl);
};


 



var pfRet = function(theElem, theResp, marble) {
document.getElementById(theElem).innerHTML = theResp;
};


var doCloseAdd = function(theElem, theResp, marble) {
fullResp = "<div onclick=\"JSSHOP.ui.closeLbox();\" style=\"float:right\">Close</div>" + theResp;
document.getElementById(theElem).innerHTML = theResp;
};

var doServerString = function(theElem, theResp, marble) {
if(theResp.startsWith("File Not Found")) {
document.getElementById(theElem).innerHTML = "---";
} else {
document.getElementById(theElem).innerHTML = stripHTML(theResp);
}
};

var loadNuJSModal = function (theMinc, theClass) {
    if(theMinc.indexOf("images/") != -1) {
    JSSHOP.ui.popAndFillLbox("<img src=\"" + theMinc + "\">");
    } else {
 	JSSHOP.ajax.doNuAjaxPipe("lightbox_content", theMinc, doCloseAdd);
 	JSSHOP.ui.popAndFillLbox(theClass);
    }
};

var loadJSModal = function (theMinc) {
    loadNuJSModal(theMinc, "noQvalue");
};
 

 

JSSHOP.logJSdbug = function(theFunction, theArgs, theMsg) {
tmpStrArgs = "noQvalue";
tmpAStrArgs = "noQvalue";
try {
// fullArgs = theArgs;
tmpStrArgs = JSON.stringify(theArgs);
} catch(e) {
tmpStrArgs = theArgs;
}
if(tmpStrArgs.length > 12) {
tmpAStrArgs = "<span onclick=\"javascript:alert(this.innerHTML);\" style=\"max-width:120px;max-height:90px;overflow:hidden;\">" + tmpStrArgs + "</span>";
} else {
tmpAStrArgs = tmpStrArgs;
}
currDBUGstr += "<br><br>: " + JSSHOP.getUnixTimeStamp() + " :: " + theFunction + " :: " + tmpAStrArgs + " :: " +  theMsg;
};


JSSHOP.logJSerror = function(theError, theArgs, theMsg) {
// alert(JSON.stringify(theError));
fullArgs = new Array();
if(theArgs.length) {
fullArgs = theArgs;
fullArgs = JSON.stringify(theArgs);
} else {
fullArgs = "noQvalue";
}
// fullSError = theError.toString();
fullSError = JSON.stringify(theError);
if(theError.lineNumber) {
fullSError += "Line: " + theError.lineNumber + "\r\n";
}
if(theError.fileName) {
fullSError += "File: " + theError.fileName + "\r\n";
}
if(theError.msg) {
fullSError += "msg: " + theError.msg  + "\r\n";
}
if(theError.constructor) {
fullSError += theError.constructor;
}
// if(JSSHOP.cookies.getCookie("dbug")) {}
// alert("epconsole.error: " + fullSError + " :: " + fullArgs + " :: " +  theMsg);

    setTimeout(function() {
   ermsg = "epconsole.error: " + fullSError + " :: " + fullArgs + " :: " +  theMsg;

        throw new Error(ermsg);
    }, 0);
};
  

JSSHOP.startNuIntrvlEvnt = function(theObjTag, theFunction, theInterval) {
try {
eval(theObjTag + " = " + window.setInterval(theFunction,theInterval));
// theObjTag = window.setInterval(theFunction,theInterval); 
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.startNuIntrvlEvnt");
}
};

JSSHOP.stopNuIntrvlEvnt = function(theObjTag) {
try {
window.clearInterval(theObjTag);
theObjTag = null;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.stopNuIntrvlEvnt");
}
};



JSSHOP.startIntervalEvent = function(theObjTag, theFunction, theInterval) {
try {
timeout_handles[theObjTag] = window.setInterval(theFunction,theInterval); 
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.startIntervalEvent");
}
};

JSSHOP.stopIntervalEvent = function(theObjTag) {
try {
window.clearInterval(timeout_handles[theObjTag]);
timeout_handles[theObjTag] = null;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.stopIntervalEvent");
}
};

JSSHOP.getUnixMiliStamp = function() {
try {
ts = Math.round(new Date().getTime());
return ts;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.getUnixTimeStamp");
}
};

JSSHOP.getUnixTimeStamp = function() {
try {
ts = Math.round(new Date().getTime() / 1000);
return ts;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.getUnixTimeStamp");
}
};
 



JSSHOP.loadScript = function(path, callback, filetype) {
		// alert(loaded_scripts.length);
        n = path.lastIndexOf("/");
        q = path.lastIndexOf("?");
        if (filetype == "js") { //if filename is a external JavaScript file
            var scr = document.createElement('script')
            scr.setAttribute("type", "text/javascript")
            scr.src = path;
        } else if (filetype == "css") { //if filename is an external CSS file
            var scr = document.createElement("link")
            scr.setAttribute("rel", "stylesheet")
            scr.setAttribute("type", "text/css")
            scr.href = path;
        }
        var done = false;
        scr.onload = handleLoad;
        scr.onreadystatechange = handleReadyStateChange;
        scr.onerror = handleError;
        if (n >= 0) {
            if (q >= 0) {
                tid = path.substring(n + 1, q);
            } else {
                tid = path.substring(n + 1);
            }
            scr.id = tid;
        }
        document.getElementsByTagName("head")[0].appendChild(scr);
        // document.body.appendChild(scr);
        function handleLoad() {
            if (!done) {
                done = true;
                callback(path, "ok");
            }
        }

        function handleReadyStateChange() {
            var state;
            if (!done) {
                state = scr.readyState;
                if (state === "complete") {
                    handleLoad();
                }
            }
        }

        function handleError() {
            if (!done) {
                done = true;
                callback(path, "error");
            }
        }
     try {   } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.loadScript");
    }
};

JSSHOP.checkLoader = function(thePath, theMessage) {
    try {
        ttlLoaded = loaded_scripts.length;
        loaded_scripts[ttlLoaded] = thePath;
        //  alert(loaded_scripts[ttlLoaded] + " :: " + loaded_scripts.length + "msg: " + theMessage);
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.checkLoader");
    }
};





















/* cookies
*/

if (!window.JSSHOP.cookies) {
    JSSHOP.cookies = new Object();
}

JSSHOP.cookies.getCookie = function(check_name) {
var cretval;
var tval;
// alert("isPhP: " + isPhP + "  :isJApp: " + isJApp);
if((isPhP == "no") && (isJApp == "y")) {
try {
if(check_name == "quid") {
tval = app.fetchConfValInt(check_name);
} else {
tval = app.fetchConfValString(check_name);
}
cretval = tval;
// default null string for android preferences
// alert("cretval: " + cretval);
if(cretval == "noQvalue")  { 
return null;
} else {
return cretval;
}
} catch(e) {
alert("getCookie: " + e);
return null;
}

} else {


	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}

}
};


JSSHOP.cookies.setCookie = function(name,value,expires,path,domain,secure) 
{


if((isPhP == "no") && (isJApp == "y")) {
try {

if(name == "quid") {
app.setConfValInt(name,value);
} else {
app.setConfValString(name,value); 
}
} catch(e) {
alert("setCookie.E: " + e)
}

} else {
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );
/*
if the expires variable is set, make the correct 
expires time, the current script below will set 
it for x number of days, to make it for hours, 
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );
document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
( ( path ) ? ";path=" + path : "" ) + 
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );

}
};

JSSHOP.cookies.deleteCookie = function(name,path,domain) {
if((isPhP == "no") && (isJApp == "y")) {
try {

if(name == "quid") {
app.setConfValInt(name,"noQvalue");
} else {
app.setConfValString(name,"noQvalue"); 
}
} catch(e) {
alert("setCookie.E: " + e)
}

} else {
if(JSSHOP.cookies.getCookie(name)) document.cookie = name + "=" + ( ( path ) ? ";path=" + path : "") + ( ( domain ) ? ";domain=" + domain : "" ) + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
};








/ª shared functions */
if (!window.JSSHOP.shared) {
    JSSHOP.shared = new Object();
}

JSSHOP.shared.endsWith = function(str,suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

JSSHOP.shared.urlToArray = function(url) {
// alert(url);
    try {
        var request = {};
        var arr = [];
        var pairs = url.substring(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');

          //check we have an array here - add array numeric indexes so the key elem[] is not identical.
          if(JSSHOP.shared.endsWith(decodeURIComponent(pair[0]), '[]') ) {
              var arrName = decodeURIComponent(pair[0]).substring(0, decodeURIComponent(pair[0]).length - 2);
              if(!(arrName in arr)) {
                  arr.push(arrName);
                  arr[arrName] = [];
              }

              arr[arrName].push(decodeURIComponent(pair[1]));
              request[arrName] = arr[arrName];
          } else {
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
        }
        return request;
    } catch (e) {
	// alert(e);
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.urlToArray");
        return "noQvalue";
    }

    };











/* USer Functions */

if (!window.JSSHOP.user) {
    JSSHOP.user = new Object();
}

JSSHOP.user.decPrefCky = function(cString) {
	try {
        strPa = cString.split("x1").join("[{\"");
        strPb = strPa.split("x2").join("\":\"");
        strPc = strPb.split("x3").join("\",\"");
        strPd = strPc.split("x4").join("\":");
        strPe = strPd.split("x5").join(",\"");
        strPf = strPe.split("x6").join("\"}]");
        strPg = strPf.split("x7").join("}]");
	  return strPg;
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.decPrefCky");
	  return "noQvalue";
	}

};

JSSHOP.user.encPrefCky = function(cString) {
 
	try {
        strPa = cString.split("[{\"").join("x1");
        strPb = strPa.split("\":\"").join("x2");
        strPc = strPb.split("\",\"").join("x3");
        strPd = strPc.split("\":").join("x4");
        strPe = strPd.split(",\"").join("x5");
        strPf = strPe.split("\"}]").join("x6");
        strPg = strPf.split("}]").join("x7");
	  return strPg;
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.encPrefCky");
	  return "noQvalue";
	}
 
};


JSSHOP.user.setCkieUprefs = function(ckyP) {  
try {
// alert("setCkieUprefs: " + JSON.stringify(arrUprefs[ckyP]));
if(JSSHOP.cookies.getCookie(ckyP)) {
// JSSHOP.cookies.deleteCookie(ckyP, "","");
}
JSSHOP.cookies.setCookie(ckyP, JSSHOP.user.encPrefCky(JSON.stringify(arrUprefs[ckyP])), "30", "", "", "");
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.user.setCkieUprefs");
}
};


JSSHOP.user.setCkiePrfKV = function(dCky,key,val) {  
try {
arrUprefs[dCky][0][key] = val;
JSSHOP.user.setCkieUprefs(dCky);
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.user.setCkiePrfKV");
}
};

JSSHOP.user.setCkiePrfDispVal = function(ckyName,key,rowname) {  
/*
* swithced true to false since being called before click event
*/
	try {
    	val = false;
    	theRow = document.getElementById(rowname);
    	if (theRow.style.display=="none") {
      val = true;
    	} 
	arrUprefs[ckyName][0][key] = val;
	JSSHOP.user.setCkieUprefs(ckyName);
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.setCkiePrfDispVal");
	}

};


JSSHOP.user.doCkieUprefs = function(daCky) {
	try {
if(JSSHOP.cookies.getCookie(daCky)) { 
fldChallArray.value = JSSHOP.cookies.getCookie(daCky);
tval = fldChallArray.value;
arrUprefs[daCky] = JSON.parse(JSSHOP.user.decPrefCky(tval));
} else {
arrUprefs[daCky] = [{"prfDspLmenu":false,"scv":"g"}];
JSSHOP.user.setCkieUprefs(daCky);
}
// alert("doCkieUprefs: " + JSON.stringify(arrUprefs[daCky]));
	}catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.user.doCkieUprefs");
	}
};



 




var getNuDBFnvp = function(t,m,da,de) {
icce = 0;
tmpV = [];
tmpFV = [];
xol = null;

xol = {};
xol["m"] = m; // mode
xol["t"] = t; // table
xol["c"] = null; // columns
xol["o"] = "_id Desc"; 
xol["l"] =  100;
xol["knvp"] = null;
if(de != null) {
if(de["ws"] != null) {
xol["ws"] = de["ws"]; 
}
if(de["wa"] != null) {
xol["wa"] = de["wa"]; 
}
if(de["o"] != null) {
xol["o"] = de["o"]; 
}
if(de["l"] != null) {
xol["l"] = de["l"]; 
}
if(de["c"] != null) {
xol["c"] = de["c"]; 
}
if(de["knvp"] != null) {
xol["knvp"] = de["knvp"]; 
}
} else {
xol["ws"] = "where _id=?"; 
xol["wa"] = [ppid];

}



if(xol["knvp"] == null){

/**/
// len = xol["knvp"].length;
tlen = arrDBnDocFNames.length;
if(tlen > 0) {
} else {
nint = 0;
if(da != null) {
while(nint < da.length) {
arrDBnDocFNames.push(da[nint]);
arrDBFNames.push(da[nint]);
nint++;
}
}
}

arrDBnDocFNVpar = null;
arrDBnDocFNVpar = [];

while(icce < arrDBnDocFNames.length) {
nnvo = {};

nvk = arrDBnDocFNames[icce];
nvl = document.getElementById(arrDBnDocFNames[icce]).value;
nnvo["t"] = nvk;
nnvo["v"] = nvl;
tmpStrSWA = "";
arrDBnDocFNVpar.push(nnvo);
icce++;
}

xol["knvp"] = null;
xol["knvp"] = arrDBnDocFNVpar;

} // end if xol["knvp"] = null






len = xol["knvp"].length;
arrDBFNames["_id"] = ppid; // _id

if(xol["ws"] != null) {
tmpStrSWA = switchOccurrences(xol["ws"], "?", xol["wa"]);
}
sqs = "";
switch(m) {
case 5:
sqs = "select ";
if(xol["c"] != null) {
if(xol["c"].length > 0) {
sqs += xol["c"] + " ";
} else {
sqs += "* ";
}
} else {
sqs += "* ";
}
sqs += "from " + t + " " + tmpStrSWA + " order by " + xol["o"] + " limit " + xol["l"];
break;
case 6:
var iint = 0;
ts = "";
tv = "";
ark = [];
while(iint < len) {
if(xol["knvp"][iint].t == "_id") { // dont include it
} else {
ts += xol["knvp"][iint].t + ",";
theVstrClean = xol["knvp"][iint].v;
// theVstrClean = decodeURIComponent(removeDiacritics(xol["knvp"][iint].v));
tv += "'" + theVstrClean + "',";
}
iint++;
}
sqs = "insert into " + t + "(" +  ts.substring(0, ts.length-1) + ") values (" + tv.substring(0, tv.length-1) + ")";
break;
case 7:
var iint = 0;
ts = "";
tv = "";
ark = [];
while(iint < len) {
if(xol["knvp"][iint].t == "_id") { // dont include it
} else {
ts += xol["knvp"][iint].t + "=";
theVstrClean = decodeURIComponent(xol["knvp"][iint].v);
ts += "'" + theVstrClean + "',";
}
iint++;
}
sqs = "update " + t + " set " + ts.substring(0, ts.length-1) + " " + tmpStrSWA;
break;
case 8:
sqs = "delete from " + t + " " + tmpStrSWA;
break;

// trying the replace into function
case 9:

 
var iint = 0;
ts = "";
tv = "";
ark = [];
while(iint < len) {
 
ts += xol["knvp"][iint].t + ",";
theVstrClean = xol["knvp"][iint].v;
// theVstrClean = decodeURIComponent(removeDiacritics(xol["knvp"][iint].v));
tv += "'" + theVstrClean + "',";
iint++;
}

sqs = "replace into " + t + " values (" + tv.substring(0, tv.length-1) + ")";
iint = 0;
break;

default:
sqs = "select";
}
xol["rq"] = sqs;

return xol;
};


var doFrmQArr = function(strQ, theElem, theCB) {
nnvo = null;
nnvo = {};
nnvo["f"] = theCB;
nnvo["v"] = strQ;
nnvo["e"] = theElem;
currFrmQArr.push(nnvo);
};


var addFrmQArr = function(theForm, theTmpId, theTmpCB) {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where _id=?";
    tmpDOs["wa"] = [theTmpId];
    oi = getNuDBFnvp(theForm, 5, null, tmpDOs);
    doFrmQArr(oi["rq"],theForm,theTmpCB);
};

var addNuFrmQArr = function(theForm, theTmpFld, theTmpId, theTmpCB) {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where " + theTmpFld + "=?";
    tmpDOs["wa"] = [theTmpId];
    oi = getNuDBFnvp(theForm, 5, null, tmpDOs);
    doFrmQArr(oi["rq"],theForm,theTmpCB);
};

var doDynQArrComm = function(theTarr, strQ, theElem, theCB) {
 
nnvo = null;
nnvo = {};
nnvo["f"] = theCB;
nnvo["v"] = strQ;
nnvo["e"] = theElem;
theTarr.push(nnvo);

};



var doQArrComm = function(strQ, theElem, theCB) {
 
nnvo = null;
nnvo = {};
nnvo["f"] = theCB;
nnvo["v"] = strQ;
nnvo["e"] = theElem;
currQcommsArr.push(nnvo);

};


var addQArrComm = function(theForm, theTmpId, theTmpCB) {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where _id=?";
    tmpDOs["wa"] = [theTmpId];
    oi = getNuDBFnvp(theForm, 5, null, tmpDOs);
    doQArrComm(oi["rq"],theForm,theTmpCB);
};



  




 



navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();
 

var remp = function(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
};



var fnishCntLoad = function() {
};
var fnishUserForm = function() {
};
var fnishCartForm = function() {
};
var pushActbArr = function(theArr) {
};
var clearActbArr = function() {
};
var mfnishCntLoad = function() {

if(currAdmnMode == "y") {
tmpStrLgotxt = "Admin";
} else {
// tmpStrLgotxt = JSSHOP.shared.getFieldVal("c_title", "CoinBin - Binance API Demo");
tmpStrLgotxt = "CoinBin - Binance API Demo"
}
JSSHOP.ui.setTinnerHTML("ancLogoTxt", tmpStrLgotxt);


 
xae = document.getElementsByTagName("ti");
var iint = 0;
while(iint < xae.length) {
nuDW(xae[iint]);
iint++;
}


if(isJavaFx == "yes") {
xid = document.getElementsByTagName("i");
var diint = 0;
    image = null;
    image = new Image();
    image.src = "images/trans.gif";
while(diint < xid.length) {
tmpItxt = xid[diint].innerText;
tmpNtxt = tmpItxt.substring(0, 1).toUpperCase();
xid[diint].innerHTML = tmpNtxt;
xid[diint].className = "txtXLrg";
diint++;
}
}



fnishCntLoad();
};
 

var mpushActbArr = function(tmpActArr) {
pushActbArr(tmpActArr);
};

var mclearActbArr = function() {
clearActbArr();
}; 





var doNurQComm = function(tComObj) { 
// alert(tmpQstr);
if(pipeDir == "noQvalue") {
if((isPhP == "no") && (isJApp == "y")) {
try {
atmpArrQ = app.getNuDBselectQ(tComObj.q);
document.getElementById("fldChallArray").value = atmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
tmpNewArrO = null;
tmpNewArrO = {};
tmpNewArrO = JSON.parse(tmpArrQ);
var nNAxObj = null;
nNAxObj = tComObj;
nNAxObj["rs"] = tmpNewArrO.data;
if(tComObj.el == "give") {
return tmpArrQ;
} else {
mf = window[tComObj.cb];
mf(nNAxObj);
}
} catch (e) {
alert(e);
// rstr = shopDir + "_p/jsdo.php?cb=" + tComObj.cb + "&" + tmpQstr;
// remp(rstr);
}
} else {
tmpArrQ = JSSHOP.ajax.doRequestPrep(tComObj);
}
} else { // pipeDir is remote
tComObj.ur = pipeDir + "_p/do.php?";
tmpArrQ = JSSHOP.ajax.doRequestPrep(tComObj);
}

// alert(JSON.stringify(tComObj));
// alert(tmpQstr);

};




var doNuQComm = function(strCQname, isRefrsh, dstamp, strQ, theElem, theCB) {
tmpArrQ = "noQvalue";
tmpQstr = "";


tmpQstr += "t=" + dstamp + "&";
tmpQstr += "f=" + isRefrsh + "&";
if(strCQname == "noQvalue") {
} else {
tmpQstr += "c=" + strCQname + "&";
}
tmpQstr += "q=" + JSSHOP.shared.utf8_encode(strQ);

// alert(tmpQstr);
if(pipeDir == "noQvalue") {
if((isPhP == "no") && (isJApp == "y")) {
try {
atmpArrQ = app.getDBselectQ(strQ);
document.getElementById("fldChallArray").value = atmpArrQ;
tmpArrQ = document.getElementById("fldChallArray").value;
tmpNewArr = null;
tmpNewArr = [];
tmpNewArr = JSON.parse(tmpArrQ);

if(theElem == "give") {
return tmpArrQ;
} else {
mf = window[theCB];
mf(theElem, tmpArrQ, null);
}
} catch (e) {
rstr = shopDir + "_p/jsdo.php?cb=" + theCB + "&" + tmpQstr;
remp(rstr);
}
} else {
mf = window[theCB];
tmpArrQ = JSSHOP.ajax.doNuAjaxPipe(theElem, shopDir + "_p/do.php?" + tmpQstr, mf);
}
} else { // pipeDir is remote
mf = window[theCB];
tmpArrQ = JSSHOP.ajax.doNuAjaxPipe(theElem, pipeDir + "_p/do.php?" + tmpQstr, mf);
}
};


var doQComm = function(strQ, theElem, theCB) {
doNuQComm("noQvalue", "n", "123",  strQ, theElem, theCB);

};





 

 


var loadLmenu = function() {

// alert("setLoadACTB: " + theACb);
// alert("mArrFb " + JSON.stringify(currMenuArr));

      var tmpmainUL = document.createElement("ul");
	tmpmainUL.className="animenu__nav";
 


      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";	
	tmpA = document.createElement('a');
	linkText = document.createTextNode("Recent");
	tmpA.appendChild(linkText);
	tmpA.title = "Recent";
	// tmpA.href = "void(";
	tmpLI.appendChild(tmpA);
	tmpRPUL = document.createElement("ul");
 
	// tmpRPUL.className="animenu__nav__child";
	tmpLI.appendChild(tmpRPUL);
	tmpmainUL.appendChild(tmpLI);



      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";	
	tmpA = document.createElement('a');
	linkText = document.createTextNode("Searches");
	// tmpA.appendChild(linkText);
	tmpA.title = "Searches";
	// tmpA.href = "void(";
	tmpLI.appendChild(tmpA);
	tmpRSUL = document.createElement("ul");
	// tmpRSUL.className="animenu__nav__child";
	tmpLI.appendChild(tmpRSUL);
	  tmpmainUL.appendChild(tmpLI);
	// tmpLI.appendChild(tmpUL);
	// tmpmainUL.appendChild(tmpLI);

strCatID =  "tip:ep:Smart Autocomplete|";
strCatName =  "This will be a smart auto-complete search box.|";
strULPID = "";
strULPTtl = "";
strULSID = "";
strULSTtl = "";
fullIDstr = "";
fullIDttl = "";
theLMarr = arrAllForms.qextras; 
len = theLMarr.length;
tstr = "";
iint = 0;
inop = 0;
inos = 0;


var tmpSTrSorE = "show";
if(currAdmnMode == "y") {
tmpSTrSorE = "edit";
}

while(iint < len) {
ts = null
ts = theLMarr[iint];







switch(ts.e_rtype) {
case "10":

strLML = "index.php?pid=aa-" + tmpSTrSorE + "-item&itemid=" + ts.e_vala + "&cid=" + ts.e_valb + "&catid=" + ts.e_valc;
strLMTtl = ts.e_vald;


      if(inop < 8) {
      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";
 	
	tmpA = document.createElement('a');


	linkText = document.createTextNode(strLMTtl);
	tmpA.appendChild(linkText);
	tmpA.title = strLMTtl + "&nbsp;&nbsp;&nbsp;&nbsp;";
	tmpA.href = strLML;

	tmpLI.appendChild(tmpA); 
	tmpRPUL.appendChild(tmpLI);
	}
	inop++;
break;
case "11":
strLML = "index.php?pid=aa-show-search&cid=" + ts.e_valb + "&sw=" + ts.e_vala;
strLMTtl = ts.e_vala;



      tmpLI = document.createElement("li");
	tmpLI.className="omenuartigo";
 	
	tmpA = document.createElement('a');


	linkText = document.createTextNode(strLMTtl);
	tmpA.appendChild(linkText);
	tmpA.title = strLMTtl + "&nbsp;&nbsp;&nbsp;&nbsp;";
	tmpA.href = strLML;

	tmpLI.appendChild(tmpA); 
	tmpRSUL.appendChild(tmpLI);
	inos++;
break;
default:
break;
}




iint++;
}
 
try {

// document.getElementById('tdLMenu').appendChild(tmpmainUL);

// JSSHOP.ui.toggleVisibility("tdLMenu");
} catch(e) {
alert("loadLmenu: " + e);
}	


};





var setLoadACTB = function(theACb) {

try {

if((pid == "aa-show-category") || (pid == "aa-show-yo") || (pid == "index_main")){
// alert("pid = aa-show-category");
} else {
// alert("setLoadACTB: " + theACb);
// alert("mArrFb " + JSON.stringify(currMenuArr));

var arrToFill = null;
arrToFill = JSON.parse(theACb.rs);
arrAllForms["qextras"] = arrToFill;

strCatID =  "tip:ep:Smart Autocomplete|";
strCatName =  "This will be a smart auto-complete search box.|";
strULPID = "";
strULPTtl = "";
strULSID = "";
strULSTtl = "";
fullIDstr = "";
fullIDttl = "";




if(theACb.rs.indexOf("_id") != -1) {


var tmpSTrSorE = "show";
if(currAdmnMode == "y") {
tmpSTrSorE = "edit";
}



len = arrToFill.length;
tstr = "";
iint = 0;
while(iint < len) {
ts = arrToFill[iint];
switch(ts.e_rtype) {
case "10":

strULPID += "ulp:ep:index.php?pid=aa-" + tmpSTrSorE + "-item&itemid=" + ts.e_vala + "&cid=" + ts.e_valb + "&catid=" + ts.e_valc + "|";
strULPTtl += ts.e_vald + "|";

break;
case "11":
strULSID += "uls:ep:" + ts.e_vala + "|";
strULSTtl += ts.e_vala + "|";
break;
default:
break;
}

iint++;
}

 
 
fullIDstr = strULSID + ":ea:" + strULPID;
fullIDttl = strULSTtl + ":ea:" + strULPTtl;
}
strCatID += fullIDstr + ":ea:";
strCatName += fullIDttl + ":ea:";

strCatID +=  "tip:ep:Suggestions|";
strCatName +=  "Suggestionsss are gathered from existing page arrays.|";
// ijUFeedSearch.value = "hehahs";
currACTBstr = strCatID + "::" + strCatName;
actbSearch = loadListACTB(currACTBstr, "ijUFeedSearch");
 loadLmenu();
}
} catch(e) {
 alert("setLoadACTB.error: " + e);
}



};


var doLoadACTB = function() {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["l"] = "30"; 
    tmpDOs["ws"] = "where e_uid=?";
    tmpDOs["wa"] = [quid]; 
    oi = getNuDBFnvp("qextras",5,null,tmpDOs);
	// alert("doLoadACTB: " + oi["rq"]);
atac = null;
atac = nCurrCnxOb();
atac["q"] = oi["rq"];
atac["cb"] = "setLoadACTB";
atac["ls"] = "localStorage";
// atac["fc"] = "y";
// atac["lz"] = "y";
doNurQComm(atac);
};

 


var doCntLoad = function(a,b,c) {
try {
document.getElementById(a).innerHTML = b;
} catch(e) {
alert("doCntLoad.error: " + a + " : " + e);
}
};





// called when all content loaded
var fnish = function(a,b,c) {
 
 
accA = null;
accA = [];
tmpAfnish = null;
tmpAfnish = [];
tmpAfnish = JSON.parse(b);

if(isJApp == "no") {
accA = tmpAfnish;
} else {
accA = tmpAfnish[0];
}
 
 

for(var gkey in accA) {
try {
// alert(accA[gkey].f + "::" + JSON.stringify(accA[gkey].v));
 mf = window[accA[gkey].f];
/*
if(isJApp == "no") {
 mf(accA[gkey].e, JSON.stringify(accA[gkey].v), null);
} else {
 mf(accA[gkey].e, JSON.stringify(accA[gkey].v), null);
// alert(accA[gkey].f + ":f:" + JSON.stringify(accA[gkey].v));
}
*/
 mf(accA[gkey].e, JSON.stringify(accA[gkey].v), null);
} catch(e) {
alert("fnish; " + e);
}
 


}

};


var bootACTB = function(theElem, theResp, marble) {
document.getElementById(theElem).innerHTML = theResp;
JSSHOP.loadScript("js/js_actb.js", doLoadACTB,"js");
JSSHOP.ui.toggleVisibility("dvSearchBoxSlim");
};


var doWinResizeE = function() {
document.getElementById("dvSearchBoxSlim").innerHTML = "";
document.getElementById("dvSearchBox").innerHTML = "";
tmpSBox = "dvSearchBoxSlim";
if(getViewportWidth() > 500) {
tmpSBox = "dvSearchBox";
// JSSHOP.ui.showHideElement("tdLMenu", "show");
}
JSSHOP.ajax.doNuAjaxPipe(tmpSBox, 'tplates/aa-cmp-search.html', bootACTB);
// document.getElementById("tdLMenu").className = "onlyWideScreen clsLeftMenu";
// JSSHOP.ui.addEvent(window, "resize", doWinResizeE);
};

var doWinResizeA = function() {
tmpSIobj = document.getElementById("ijUFeedSearch");
if((tmpSIobj === document.activeElement) || (isJApp == "y")){
} else {
// document.location.href = document.location.href + "&rt=232";
// doWinResizeE();
}
};


 
var finishCntLoad = function(a,b,c) {
try {
document.getElementById(a).innerHTML = b;
doWinResizeE(); // all things changed on window resize
setTimeout("mfnishCntLoad()", 500);
} catch(e) {
alert("finishCntLoad.error: " + a + " : " + e);
}
};

var doMainFooter = function(a,b,c) {
document.getElementById(a).innerHTML = b;
JSSHOP.ajax.doNuAjaxPipe("includedFooter",  "tplates/" + fCa[3] + ".html", finishCntLoad);
doMMenuLd();
};

var doMainContent = function(a,b,c) {
document.getElementById(a).innerHTML = b;
fCa = getFArr();
JSSHOP.ajax.doNuAjaxPipe("includedContent", "tplates/" + pid + ".html", doMainFooter);
};

 

 

 



var doBootLoad = function(thef) {
try {

JSSHOP.user.doCkieUprefs('prfsSHOPuser');
if(JSSHOP.cookies.getCookie("cartID") == null) {
tmpcid = Math.random().toString(36).slice(2);
JSSHOP.cookies.setCookie("cartID",tmpcid,"30","","","");
cartID = tmpcid;
} else {
cartID = JSSHOP.cookies.getCookie("cartID");
}
if(JSSHOP.cookies.getCookie("usrlang") !== null) {
usrlang = JSSHOP.cookies.getCookie("usrlang");
}
JSSHOP.loadScript("js/aa-" + usrlang + ".js", JSSHOP.checkLoader,"js");
fCa = getFArr();
JSSHOP.ajax.doNuAjaxPipe("includedNav",  "tplates/" + fCa[1] + ".html", doMainContent);
} catch(e) {
alert("doBootLoad error: " + e)
JSSHOP.logJSerror(e, arguments, "doBootLoad");
} 
};
 

