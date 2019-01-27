if (!window.JSSHOP) {
    var JSSHOP = new Object();
}
if (!window.JSSHOP.ajax) {
    JSSHOP.ajax = new Object();
}
if (!window.JSSHOP.hookloader) {
    JSSHOP.hookloader = new Object();
}
if (!window.JSSHOP.jndroid) {
    JSSHOP.jndroid = new Object();
}
if (!window.JSSHOP.shared) {
    JSSHOP.shared = new Object();
}
if (!window.JSSHOP.ui) {
    JSSHOP.ui = new Object();
}

if (!window.JSSHOP.shop) {
    JSSHOP.shop = new Object();
}

 

var getFrcCacheRLoad = function(tmpDRV) {
if(currUrlArr.fc){
return currUrlArr.fc;
} else {
return tmpDRV;
}
};


try {
tmpNvstr = navigator.userAgent;
if(tmpNvstr.indexOf("JavaFX") != -1) {
isJavaFx = "yes";
isJApp = "y";

}
} catch(e) {
}


    
        var intervals = [];
 
        function clear(i){
            return function(){
                clearInterval(intervals[i]);
            }
        }
        function restart(i, fn, ts){ //Start AND restart
            return function(){
                clear(i)();
                // increase(i)();
                intervals[i] = setInterval(fn, ts);
            }
        }
   
 


function scrollToElement(id) {

    var elem = document.getElementById(id);
    var x = 0;
    var y = 0;

    while (elem != null) {
        x += elem.offsetLeft;
        y += elem.offsetTop;
        elem = elem.offsetParent;
    }
	if(isJApp == "no") {
	window.scrollTo(0,y);
	} else {
      app.getWVScrollPoint(0,y);
      // window.scrollTo(0,y);
	}
}



function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight;
	return window.undefined;
}

function getViewportWidth() {
	var offset = 17;
	if (window.innerWidth!=window.undefined) return window.innerWidth;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth;
	if (document.body) return document.body.clientWidth;
	return offset;
}


function getScrollTop() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollTop;
	}
}




JSSHOP.shared.getAppReq = function() {
    try {
	app.doDB("q2:|:cryptprice:|:" + currAppQstr);
    } catch (e) {
	alert(e);
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getAppReq");
    }
};

JSSHOP.shared.getQryVar = function(theUrlString, theVar) {
    try {
  strQVal = null;
  var query = theUrlString;
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == theVar) {
      strQVal =  pair[1];
    }
  }
  return strQVal;
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getQryVar");
        return "NotGood";
    }
};



JSSHOP.shared.getElemDUrl = function(theElem) {
try {
if(theElem.getAttribute("data-ison") != null) {
tDb = "";
tDison = theElem.getAttribute("data-ison");
tDa = tDison.replace(/:/gi,"&");
tDb = tDa.replace(/;/gi,"=");
tDb += "&v=" + theElem.value + "&n=" + theElem.name;
return tDb;
} else {
return null;
}
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.getElemDUrl");
}
};





JSSHOP.shared.nodesToString = function(node) {
    if (typeof node === "string") {
        node = document.getElementById(node);
    }

    var arrayOfText = [];
            var tmpUstring = "";
function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

    function pushVal(currentNode) {
            tmpNID = "";
		tmpNVal = "";

  		if(currentNode.nodeType === 1) {
 		if((currentNode.id) || (currentNode.name)) {
       		if(currentNode.id){
                  tmpNID = currentNode.id;
			} else {
			tmpNID = currentNode.name;			
			}      
            tNodeName = currentNode.nodeName.toUpperCase();
            switch(tNodeName) {
            case "INPUT":
		tmpNVal = currentNode.value;
		break;
            case "TEXTAREA":
		tmpNVal = currentNode.value;
		break;
            case "SELECT":
		tmpNVal = currentNode.value;
		break;
		default:
		if(currentNode.firstChild.nodeValue) {
		tmpNVal = currentNode.firstChild.nodeValue;
		}
		}
		tmpUstring += "&" + tmpNID.trim() + "=" + tmpNVal.trim();		}		
//		tmpUstring += "&" + escape(JSSHOP.shared.trim(tmpNID)) + "=" + escape(JSSHOP.shared.trim(tmpNVal));		}		
		}

    }
    walkTheDOM(node, pushVal);
    return tmpUstring;
};
 

JSSHOP.shared.getOptIndex = function(selection, indexVal) {
        	theOptIndex = 0;
 
        		for(var i = 0; i < selection.length; i++) {
        			 currIndexVal = selection.options[i].value;
        			if(currIndexVal == indexVal) {
        				theOptIndex = i;
        				break;
        			}
 
        	}
        	return theOptIndex;
};

JSSHOP.shared.setCurrSelectOpt = function(theObj, indexVal) {
        	theIndexVal = "noQvalue";
        	var selection = theObj;
        	if(selection) {
        		for(var i = 0; i < selection.length; i++) {
        			var currIndexVal = selection.options[i].value;
        			if(currIndexVal == indexVal) {
        				theIndexVal = currIndexVal;
        				selection.selectedIndex = i;
        				break;
        			}
        		}
        	}
        	return theIndexVal;
        };

JSSHOP.shared.getCurrSelectOpt = function(theObj) {
        	var theSelIndex = theObj.selectedIndex;
        	var theString = theObj.options[theSelIndex].text;
        	var theVal = theObj.options[theSelIndex].value;
        	// alert(theString +  " : " + theVal);
        	return theVal;
        };

JSSHOP.shared.addCurrSelectOpt = function(theObj, theVal, theText, theCssClsn) {
        	theObj.options[theObj.options.length] = new Option(theText, theVal);
        };

JSSHOP.shared.addOptAtIndex = function(theObj, theIndex, theVal, theText, theCssClsn) {
            theOpt = document.createElement("OPTION");
		theOpt.innerText = theText;
		theOpt.value = theVal;
		theOpt.className = theCssClsn;
        	theObj.options.add(theOpt, theObj.options[theIndex]);
        };

JSSHOP.shared.addOptAtVal = function(theObj, theIVal, theVal, theText, theCssClsn) {
        	var selection = theObj;
		tmpVhasV = "no";
			if(theIVal == "noQvalue") {
        		JSSHOP.shared.addOptAtIndex(theObj, theObj.options.length, theVal, theText, theCssClsn);
			} else {
        		for(var i = 0; i < selection.length; i++) {
				tmpVhasV = "no";
        			currIndexVal = selection.options[i].value;
        			if(currIndexVal == theIVal) {
				 tmpVhasV = "yes";
        			 JSSHOP.shared.addOptAtIndex(theObj, i+1, theVal, theText, theCssClsn);
        			}
 
        		}
			if(tmpVhasV == "no") {
        		JSSHOP.shared.addOptAtIndex(theObj, theObj.options.length, theVal, theText, theCssClsn);
			}
		}
        };
JSSHOP.shared.removeOptions = function(selectbox)
{
    var iop;
    for(iop = selectbox.options.length - 1 ; iop >= 0 ; iop--)
    {
        selectbox.remove(iop);
    }
};



/*
* validation method using data-ison attr in element 
* to validate it (form fields)
* parsing values delmited  by : 
* data-ison="y:3:22"
*/ 


JSSHOP.shared.valVOarr = function(theVOarr, theErrDiv) {
try {
    strVldErr = "<b>Oooops..</b>";
document.getElementById(theErrDiv).innerHTML = "";
    iint = 0;
    isValid = true;
    isFValid = true;
    len = theVOarr.length;
    
    while (iint < len) {
	  isFValid = true;
        ts = null;
        ts = theVOarr[iint];
theVB = null;
theVB = document.getElementById(ts.fid);
// alert(theVB.nodeName.toUpperCase());
if(theVB.nodeName.toUpperCase() === "DIV") {

theVBval = theVB.innerText;
} else {
theVBval = theVB.value;
}
if(document.getElementById(ts.lid)) {
// document.getElementById(ts.lid).innerHTML = ts.ltxt;
}
if(ts.fvr !== "noQvalue") {
ttest = ts.fvr;



if(ts.fda == false) {
if(theVBval == ts.fdv) {
alert("shr: " + ts.fda);
    isValid = false;
	isFValid = false;
}
}
if(!ttest.test(theVBval)) {
alert("no ttest: " + theVBval);
    isValid = false;
	isFValid = false;
}



if(isFValid === false) {
strVldErr += "<br>" + ts.fve;
}




}
iint++;
}

if(isValid == false) {
strVldErr += "<br>" + ts.fve;
theEdiv = document.createElement("div");
theEdiv.className = "cls-error-form";
theEdiv.innerHTML = strVldErr;
document.getElementById(theErrDiv).appendChild(theEdiv);
}
return isValid;
} catch(e) {
alert("JSSHOP.shared.valVOarr.error: " + e);
}

};


JSSHOP.shared.valFieldVals = function(theArrElem) {
// n = null default do nada
// v = validate
isFullyVal = true;
actType = "n";
try {
var len = theArrElem.length;
var iint = 0;
while (iint < len) {

if(document.getElementById(theArrElem[iint])) {
theElem = document.getElementById(theArrElem[iint]);
if(theElem.getAttribute("data-ison") != null) {
tDison = theElem.getAttribute("data-ison");
if(tDison.indexOf(":") != -1) {
tmpTDivars = tDison.split(":");
actType = tmpTDivars[0];
if(actType == "v") {
veType = tmpTDivars[1];
veMinLen = tmpTDivars[2];
veMaxLength = tmpTDivars[3]; 
veDefVal = tmpTDivars[4];
veLblElID = tmpTDivars[5];
veAlertStr = tmpTDivars[6]; 
veDefTtl = tmpTDivars[7];
veDefCls = tmpTDivars[8];


// v:s:5:8:49:lbl_u_pass:2:49:clsFrmInpLabel


document.getElementById(veLblElID).className = veDefCls;
document.getElementById(veLblElID).innerHTML = stxt[veDefTtl];
theElVal = theElem.value;
if(theElVal.length < veMinLen) {
isFullyVal = false;
if(veDefVal == "null")  {
} else {
theElem.value = stxt[veDefVal];
}
theElem.focus();
document.getElementById(veLblElID).className = "txtBold txtClrRed";
document.getElementById(veLblElID).innerHTML = stxt[veAlertStr];
}
} 
}
}
}

iint++;
}
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.valFieldVals");
return false;
}
return isFullyVal;
};



JSSHOP.shared.initFrmComps = function(theFCmpArr) {
    iint = 0;
 
    len = theFCmpArr.length;
    while (iint < len) {

        ts = theFCmpArr[iint];

theB = null;
theB = document.getElementById(ts.fid);

if(ts.fcl !== "noQvalue") {
JSSHOP.ui.addEvent(theB,"click",ts.fcl);
}
if(ts.lid !== "noQvalue") {
tlid = ts.lid;
try {
document.getElementById(tlid).className = "txtSmall txtBold txtClrDlg";
document.getElementById(tlid).innerText = ts.ltxt;



JSSHOP.ui.setLblHighlight(theB,ts.fdv,document.getElementById(tlid),ts.ltxt);
} catch(e) {
alert("dd "  + e + " : " + JSON.stringify(ts));
}
}



if(ts.fdv !== "noQvalue") {
 
if(ts.fty == "button") {
theB.style.color = "#ffffff";
} else {
JSSHOP.ui.setDefFval(theB, ts.fdv, ts.fda);
}

}

if(ts.fda !== "noQvalue") {

}
 
	  iint++;
    }


};


JSSHOP.shared.setFieldVal = function(theField, theVal) {
	try {
      document.getElementById(theField).value = theVal;
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.setFieldVal");
	}
};


JSSHOP.shared.getFieldVal = function(theField, theVal) {
	try {
      return document.getElementById(theField).value;
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getFieldVal");
	return theVal;
	}
};

JSSHOP.shared.setFrmFieldVal = function(theForm, theField, theVal) {
	try {
      document[theForm][theField].value = theVal;
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.setFrmFieldVal");
	}
};

JSSHOP.shared.getFrmFieldVal = function(theForm, theField, theVal) {
	try {
      return document[theForm][theField].value;
	} catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.shared.getFrmFieldVal");
	return theVal;
	}
};







JSSHOP.shared.sort = function(data, theIndex, theOrder) {
  var i, j;
  var currentValue;
  var currentObj;
  var compareObj;
  var compareValue;
    
	if(theOrder == "sortAsc") {
// this is where the order comparison is done:	
// while(j >=0 && compareValue > currentValue) {

  for(i=1; i<data.length;i++) {
    currentObj = data[i];
    currentValue = currentObj[theIndex];
    j= i-1;
    compareObj = data[j];
    compareValue = compareObj[theIndex];  
    while(j >=0 && compareValue > currentValue) {
      data[j+1] = data[j];
      j--;
      if (j >=0) {
        compareObj = data[j];
        compareValue = compareObj[theIndex];
      }        
    }
    data[j+1] = currentObj;
  }
  
	} else {
	
	
  for(i=1; i<data.length;i++) {
    currentObj = data[i];
    currentValue = currentObj[theIndex];
    j= i-1;
    compareObj = data[j];
    compareValue = compareObj[theIndex];  
    while(j >=0 && compareValue < currentValue) {
      data[j+1] = data[j];
      j--;
      if (j >=0) {
        compareObj = data[j];
        compareValue = compareObj[theIndex];
      }        
    }
    data[j+1] = currentObj;
  }
  
	
    }
  
  return data;
   }

 



 


JSSHOP.shared.setArrVals = function(theMarr, theAIndx, theArr) {
	  tmpVpar =  null;
	  tmpVpar = [];
	  tmpSobj = null;
	  tmpSobj = {};
        var len = theArr.length;
        var iint = 0;

    	  while (iint < len) {
        ts = theArr[iint];
 	  tmpSobj = null;
	  tmpSobj = {};
        for (var gkey in ts) {
          if(theMarr[theAIndx][gkey]) {
	    theMarr[theAIndx][gkey] = ts[gkey];
	    }
        }
        iint++;
        }
       return theMarr;
};

JSSHOP.shared.getKNVParr = function(theArr) {
	  tmpVpar =  null;
	  tmpVpar = [];
	  tmpSobj = null;
	  tmpSobj = {};
        var len = theArr.length;
        var iint = 0;

    	  while (iint < len) {
        ts = theArr[iint];

 	  tmpSobj = null;
	  tmpSobj = {};
        for (var gkey in ts) {
          tmpSobj["t"] = gkey;
	    tmpSobj["v"] = ts[gkey];
	    tmpVpar.push(tmpSobj);
        }
        iint++;
        }
       return tmpVpar;
};


JSSHOP.shared.setDynFrmVals = function(oFormElement, dPrfx) {
 
        var oField, sFieldType, nFile, sSearch;
	  tmpVpar =  null;
	  tmpVpar = [];
	  tmpSobj = {};
	  var allNs = "";
        for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
            oField = oFormElement.elements[nItem];
            if (!oField.getAttribute("name")) {
                continue;
            }
	  	tmpSobj = null;
       	tmpSobj = {};
            sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
            if (sFieldType === "FILE") {
                for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
            } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
            fn = oField.name;
		fv = oField.value;
		fnode = dPrfx + fn;

		if(dPrfx == "clear") {
		oField.value = "";
		} else {
            if(document.getElementById(fnode)) {



 


		if((dPrfx == "dyn_") || (document.getElementById(fnode).nodeName.toUpperCase() == "DIV")){
		document.getElementById(fnode).innerHTML = fv;
		} else {
		allNs += fnode + ",";
		// alert(fnode + " ;; " + fv);
		JSSHOP.shared.setFieldVal(fnode, fv);
		}		
            }
 
		}

		}
        }
 // alert(allNs);
};

JSSHOP.shared.getDynFrmVals = function(oFormElement, dPrfx) {
	try {
        } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxSbmt");
    	  }
        var oField, sFieldType, nFile, sSearch;
	  tmpVpar =  null;
	  tmpVpar = [];
	  tmpSobj = null;
	  tmpSobj = {};
        for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
            oField = oFormElement.elements[nItem];
            if (!oField.getAttribute("name")) {
                continue;
            }
	  	tmpSobj = null;
       	tmpSobj = {};
            sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
            if (sFieldType === "FILE") {
                for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
            } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
            fn = oField.name;
		fnode = dPrfx + fn;
            if(document.getElementById(fnode)) {
		tNN = document.getElementById(fnode).nodeName.toUpperCase();
		if(tNN == "DIV") {
		fv = document.getElementById(fnode).innerHTML;		
		} else {
		fv = document.getElementById(fnode).value;
		}
		oField.value = fv;
            } else {
		fv = oField.value;
		}
		tmpSobj[fn] = fv;
		// if(fv.length > 0) {
		// tmpSobj["t"] = fn;
		// tmpSobj["v"] = fv;
		tmpVpar.push(tmpSobj);
		// }
            }
        }
		 //alert("getDynFormVals: " + JSON.stringify(tmpVpar));
		return tmpVpar;
};



JSSHOP.shared.getFrmVals = function(oFormElement, oHdrStr) {


        var oField, sFieldType, nFile, sSearch;
	  tmpVpar =  null;
	  tmpVpar = [];
	  tmpSobj = {};
        for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
  	try {          
            oField = oFormElement.elements[nItem];
            if (!oField.getAttribute("name")) {
                continue;
            }
	  	tmpSobj = null;
       	  tmpSobj = {};
		 
            sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
            if (sFieldType === "FILE") {
                for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
            } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
            fn = escape(oField.name);
		fv = escape(oField.value);
		if(fv.length >= 0) {
		
		tmpSobj["t"] = fn;
		tmpSobj["v"] = fv;
		tmpVpar.push(tmpSobj);
		}
            }


        } catch (e) {
		alert(e + " : " + oField.getAttribute("name"));
        // JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxSbmt");
    	  }


        }
		// alert("getFormVals: " + JSON.stringify(tmpVpar));
		return tmpVpar;
};



JSSHOP.shared.setDynFieldVals = function(theResp, thePrefx) {

if(theResp) {
var len = theResp.length;
 
var arrToFill = theResp;
 
 
var iint = 0;

for(var gkey in theResp) {
try {

		fnode = thePrefx + gkey;
            if(document.getElementById(fnode)) {
if(document.getElementById(fnode).nodeName.toUpperCase() == "DIV") {
document.getElementById(fnode).innerHTML = theResp[gkey];
} else {
document.getElementById(fnode).value = theResp[gkey];
}

 
}
} catch(e) {
}
iint++;


}

 
}
};


JSSHOP.shared.setFrmVals = function(theForm, theResp, theTmpCB) {
// alert("setFrmVals ; " + JSON.stringify(theResp));
if(theResp) {
// var arrToFill = theResp;
var len = theResp.length;
var iint = 0;

for(var gkey in theResp) {
if(document[theForm][gkey]) {
document[theForm][gkey].value = theResp[gkey];
// alert(JSON.stringify(theResp[gkey]));
}
}
 
theTmpCB();
 
}
};

 
 


JSSHOP.shared.utf8_encode = function( argString ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Ulrich
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
};



// end of shared funtions




//   ---- AJAX functions


JSSHOP.ajax.fnishGeneric = function(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML) {
    try {
        document.getElementById(cbElem).innerHTML = cbElemHTML;
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.fnishGeneric");
    }
};


JSSHOP.ajax.procAjaxRet = function(strRet, prvdr, action, ukey, id, msg, cbElem, cbElemHTML) {
    try {
    switch (action) {
        case "parseU":
            JSSHOP.ajax.fnishGeneric(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML);
            break;
        default:
            JSSHOP.ajax.fnishGeneric(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML);
            break;
    }
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.procAjaxRet");
    }
};


JSSHOP.ajax.procRet = function(strRet, arrFelemnts) {
    try {

        if(arrFelemnts[0]["name"]) {
        if(arrFelemnts[0]["name"].toLowerCase() == "aaction") {
        tmpAVal = arrFelemnts[0]["value"];
    switch(tmpAVal) {
        case "CViewEditAdminSettings":
		JSSHOP.ui.popAndFillLbox("new: " + JSON.stringify(arrFelemnts) + " <br> " + strRet);
            break;
        default:
            JSSHOP.ajax.fnishGeneric(strRet, prvdr, action, ukey, id, cbElem, cbElemHTML);
            break;
    }
    }
    }
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.procRet");
    }
};

JSSHOP.ajax.createXMLHTTPObject = function() {
    var xmlhttp = false;
var XMLHttpFactories = [
    function() {
        return new XMLHttpRequest()
    },
    function() {
        return new ActiveXObject("Msxml2.XMLHTTP")
    },
    function() {
        return new ActiveXObject("Msxml3.XMLHTTP")
    },
    function() {
        return new ActiveXObject("Microsoft.XMLHTTP")
    }
];
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        } catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
};

 
JSSHOP.ajax.doNuResponse = function(tmpArrDRS) {
// alert("doNuResponse: " + tmpArrDRS.cb + " : " + tmpArrDRS.rs);
// JSSHOP.ui.popAndFillLbox("doNuResponse: " + tmpArrDRS.cb + " : " + tmpArrDRS.rs);
tmpNArrDRS = null;
tmpNArrDRS = {};
tmpNArrDRS = tmpArrDRS;

if(tmpArrDRS.st == "nofile") {
JSSHOP.ajax.doResponseSave(tmpArrDRS);
} else {
if(tmpArrDRS.lz == "y") { 
strTmpDAS = tmpArrDRS.rs;
strTmpDS = strTmpDAS.replace("\"", "");
tmpDFEUStr = LZString.decompressFromEncodedURIComponent(strTmpDS);
tmpNArrDRS.rs = tmpDFEUStr;
// alert("tmpDFEUStr: " + tmpDFEUStr);	
}  

if(tmpArrDRS.ls == "n") {
} else {
if(tmpArrDRS.st == "pending") {
// alert("tmpArrDRS.st: " + tmpArrDRS.st);
setNuLclStrg("localStorage", tmpArrDRS.cb, tmpArrDRS.rs);

}
}

}


theRespCB = window[tmpArrDRS.cb];
theRespCB(tmpNArrDRS);


};


JSSHOP.ajax.doResponseSave = function(tmpsArrDRS) {
// alert("doResponseSave: " + tmpsArrDRS.cb  + " : " + tmpsArrDRS.fn + " : " + tmpsArrDRS.rs );
if(tmpsArrDRS.lz == "y") { 
JSSHOP.shared.setFrmFieldVal("qconn", "rs",  LZString.compressToEncodedURIComponent(tmpsArrDRS.rs));
} else {
JSSHOP.shared.setFrmFieldVal("qconn", "rs", tmpsArrDRS.rs.replace(/\\(.)/mg, "$1"));
}	
JSSHOP.shared.setFrmFieldVal("qconn", "fn", tmpsArrDRS.fn);
JSSHOP.shared.setFrmFieldVal("qconn", "fc", "save");
document["qconn"].submit();

};



JSSHOP.ajax.doRespConstruct = function(tmpDRCArr, tmpRCstr) {
// alert("doRespConstruct: " + tmpDRCArr.cb + " : " + tmpRCstr);
tmpNDRCArr = null;
tmpNDRCArr = {};
tmpNDRCArr = tmpDRCArr;
            try {
          aRespArr = JSON.parse(tmpRCstr);
          tmpNDRCArr.st = "error";
		} catch(e) {
	    tmpNDRCArr.rs = "noQvalue";
		}
 	     // alert("aRespArr.data: " + " : " + aRespArr.data);	
           try {
	    tmpNDRCArr.rs = JSON.stringify(aRespArr.data);
	    JSSHOP.ajax.doNuResponse(tmpNDRCArr);
		} catch(e) {
	    tmpNDRCArr.rs = aRespArr.data;
	    JSSHOP.ajax.doNuResponse(tmpNDRCArr);
		}
 
};

 


JSSHOP.ajax.doNurAjaxPipe = function(theAxObj) {

// going to stop spinner here
hasLclStrg = "n";

aRespArr = null;
aRespArr = {};
tmpQstr = "";
tmpFRSstr = "";
tmpQstr += "fc=" + theAxObj.fc + "&";
tmpQstr += "ts=" + theAxObj.ts + "&";
tmpQstr += "fn=" + theAxObj.fn + "&";
tmpQstr += "lz=" + theAxObj.lz + "&";
tmpQstr += "rs=" + theAxObj.rs + "&";
tmpQstr += "q=" + JSSHOP.shared.utf8_encode(theAxObj.q);

pUrl = theAxObj.ur + tmpQstr;

       var oReq = JSSHOP.ajax.createXMLHTTPObject();
	 //  oReq.setRequestHeader("connection", "close");
	 tUTA = JSSHOP.shared.urlToArray(pUrl);

 
	   if(oReq == false) {
		
            theCB(theNAxObj);
	  } else {

        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4) {
                JSSHOP.ajax.doRespConstruct(theAxObj, oReq.responseText);
			
            }  
        }
        oReq.onerror = function() {
	  // theNAxObj.st = "error";
        // theNAxObj.rs = "error: " + oReq;
        alert("yikes, we have a connection problem..." + oReq);
        }
        oReq.open("GET", pUrl, true);
        picr = oReq.send(null);
	   }
};



// prepare the request 
JSSHOP.ajax.doRequestPrep = function(tmppArrDRP) {
tmppNArrDRP = null;
tmppNArrDRP = {};
tmppNArrDRP = tmppArrDRP;

if(tmppArrDRP.ls == "n") {
JSSHOP.ajax.doNurAjaxPipe(tmppArrDRP);
} else {
tLSStr = getNuLclStrg(tmppArrDRP.ls, tmppArrDRP.cb, "noQvalue");
if(tLSStr == "noQvalue") {
JSSHOP.ajax.doNurAjaxPipe(tmppArrDRP);
} else {
tmppNArrDRP.rs =  tLSStr;
tmppNArrDRP.st = "saved";
// alert("getNuLclStrg: " + tLSStr);
JSSHOP.ajax.doNuResponse(tmppNArrDRP);
}  // tLSStr not noQvalue
} // ls is not "n";

};


JSSHOP.ajax.doNuAjaxPipe = function(theElem,pUrl,tmpCB) {

	// going to stop spinner here

    try {
       var oReq = JSSHOP.ajax.createXMLHTTPObject();
	 //  oReq.setRequestHeader("connection", "close");
	 tUTA = JSSHOP.shared.urlToArray(pUrl);
	   if(oReq == false) {
               tmpCB(theElem,"Error",tUTA);

	  } else {
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4) {

			//  return oReq.responseText;
		  if(theElem == "give") {  } 
 		  // alert(oReq.responseText);

		   // alert(tmpCB + " :: " + oReq.responseText);
               tmpCB(theElem,oReq.responseText,tUTA);
		  
            }  
        }
        oReq.onerror = function() {
            //  alert("yikes, we have a connection problem...");
        }
        oReq.open("GET", pUrl, true);
        picr = oReq.send(null);
	   }
        } catch (e) { 
		alert("doNuAjaxPipe: " + e);
               tmpCB(theElem,"Error: " + e,tUTA);
    	  }
};

JSSHOP.ajax.doAjaxPipe = function(pUrl,tmpCB) {
    try {
       JSSHOP.ajax.doNuAjaxPipe(null,pUrl,tmpCB);
        } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxPipe");
    	  }
};

JSSHOP.ajax.prepAjaxSbmt = function(tmpBtn, oFormElement,tmpCB) {
	try {
       tmpBtn.className="cls_button cls_button-medium cls_button-disabled";
       tmpBtn.disabled=true;
       JSSHOP.ajax.doAjaxSbmt(oFormElement,tmpCB);
        } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.prepAjaxSbmt");
    		}
};

JSSHOP.ajax.prepAjaxPipe = function(tmpBtn,pUrl,tmpCB) {
	try {
	  if(tmpBtn != null) {
       // tmpBtn.className="cls_button cls_button-medium cls_button-disabled";
       tmpBtn.disabled=true;
	 }
       JSSHOP.ajax.doNuAjaxPipe(tmpBtn,pUrl,tmpCB);
        } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.prepAjaxPipe");
    	  }
};

JSSHOP.ajax.doAjaxSbmt = function(oFormElement,tmpCB) {
	try {
    if (!oFormElement.action) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxSbmt: !! No form action set !!");
        return;
    }
    var oReq = JSSHOP.ajax.createXMLHTTPObject();
        var oField, sFieldType, nFile, sSearch;
        for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
            oField = oFormElement.elements[nItem];
            if (!oField.getAttribute("name")) {
                continue;
            }
            sFieldType = oField.nodeName.toUpperCase() === "INPUT" ? oField.getAttribute("type").toUpperCase() : "TEXT";
            if (sFieldType === "FILE") {
                for (nFile = 0; nFile < oField.files.length; sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
            } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
                sSearch += "&" + escape(oField.name) + "=" + escape(oField.value);
            }
        }
        oReq.onreadystatechange = function() {
            if (oReq.readyState == 4) {
               tmpCB(oReq.responseText,oFormElement.elements);
            }
        }
        oReq.open(oFormElement.method, oFormElement.action + "?" + sSearch, true);
        oReq.send(null);
        } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ajax.doAjaxSbmt");
    	  }
};


/*
* hookloader functions
*/

JSSHOP.hookloader.hooks = {};
JSSHOP.hookloader.register = function(name, callback) {
    if('undefined' == typeof(JSSHOP.hookloader.hooks[name]))
    JSSHOP.hookloader.hooks[name] = [];
    JSSHOP.hookloader.hooks[name].push(callback);
  };

JSSHOP.hookloader.call = function(name, arguments) {
    if('undefined' != typeof(JSSHOP.hookloader.hooks[name]))
      for(i = 0; i < JSSHOP.hookloader.hooks[name].length; ++i)
        if( true != JSSHOP.hookloader.hooks[name][i]( arguments )) { break; }
};





JSSHOP.ui.textAreaAdjust = function(theTarea){
currH = theTarea.scrollHeight;
theTarea.style.height = "1px";
theTarea.style.height = "auto";
theTarea.style.height = (25 + theTarea.scrollHeight);
};


JSSHOP.ui.setTinnerHTML = function(theElemId, theInnerHtml){
try {
if(theInnerHtml == "loading") { // just set the loading image
theInnerHtml = "<img src=\"images/misc/loading.gif\">";
}
document.getElementById(theElemId).innerHTML = theInnerHtml;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "setTinnerHTML");
alert("setTinnerHTML: " + theElemId + " :: " + theInnerHtml + " :: " + e);
}
};

JSSHOP.ui.setTinnerText = function(theElemId, theInnerText){
try {
document.getElementById(theElemId).innerHTML = theInnerText;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "setTinnerText");
alert("setTinnerText: " + theElemId + " :: " + theInnerText + " :: " + e);
}
};


JSSHOP.ui.showHideElement = function(rowname, showHide) {
    try {
        theElement = document.getElementById(rowname);
        if (showHide == "show") {
            theElement.style.visibility = "visible";
            theElement.style.display = "block";
        } else {
            theElement.style.visibility = "hidden";
            theElement.style.display = "none";
        }
    } catch (e) {
		alert(e);
        // JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.showHideElement");
    }
};

JSSHOP.ui.toggleVisibility = function(rowname) {
    try {
        theRow = document.getElementById(rowname);
        if(theRow.style.display == "none") {
            theRow.style.display = "block";
            theRow.style.visibility = "visible";
        } else {
            theRow.style.display = "none";
            theRow.style.visibility = "hidden";
        }
    } catch (e) {
    JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleVisibility");
    }
};

JSSHOP.ui.toggleMnuVisibility = function(rowname) {
	// alert("toggleMnuVisibility");
	// scrollToElement("idlogo");
    try {
            theRow = document.getElementById(rowname);    
            // 	alert(theRow.style.display);

    	// JSSHOP.ui.showHideElement("mmn","hide");
    	    } catch (e) {
    JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleVisibility");
    }
    try {
        theRow = document.getElementById(rowname);    
         
        if((theRow.style.display == "block") || (theRow.style.display == "inline-block")) {
                                          gmnu = document.getElementById("dvMnuT").innerHTML;
                                          	document.getElementById("dvMnuT").innerHTML = "";
                 		 document.getElementById("mnuT").innerHTML = gmnu;

            theRow.style.display = "none";
            theRow.style.visibility = "hidden";

        } else {
                                 gmnu = document.getElementById("mnuT").innerHTML;
                            document.getElementById("mnuT").innerHTML = "";
                 		 document.getElementById("dvMnuT").innerHTML = gmnu;
            theRow.style.display = "block";
            theRow.style.visibility = "visible";
        //  alert(gmnu);

        }
	
    } catch (e) {
    JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleVisibility");
    }
};


JSSHOP.ui.toggleModule = function(linkElem, tglElemID, showMore, showLess) {
    try {
        caption = document.getElementById(linkElem).innerHTML;
        JSSHOP.ui.toggleVisibility(tglElemID);
        if (showMore === "noQvalue") { // dont change inner HTML
        } else {
            if (caption === showMore) {
                document.getElementById(linkElem).innerHTML = showLess;
            } else {
                document.getElementById(linkElem).innerHTML = showMore;
            }
        }
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleModule");
    }
};


JSSHOP.ui.toggleNuModule = function(linkElem, tglElemID) {
    try {
        caption = document.getElementById(linkElem).innerHTML;
 
        JSSHOP.ui.toggleVisibility(tglElemID);
   
            if (caption.indexOf("more") != -1) {
                document.getElementById(linkElem).innerHTML = "<i class=\"small-material-icons\" style=\"font-size:24px\">expand_less</i>";
            } else {
                document.getElementById(linkElem).innerHTML = "<i class=\"small-material-icons\" style=\"font-size:24px\">expand_more</i>";
            }
 
    } catch (e) {
        JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.toggleNuModule");
    }
};


JSSHOP.ui.setCBBClickEnd = function(theElem, theID, theCBclss, theCB) {
    try {
   } catch(e) {
	JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.setCBBClickEnd");
    }
      theElem.className = theCBclss;
      JSSHOP.stopIntervalEvent(trgr_bclck[theID]);
      theCB();
      return;
};


// setCBBClickClr(dvBtnSTImg, 'rtable bkgdClrHdr', 'rtable bkgdClrNrml crsrPointer', function() { y = 'y'; });
JSSHOP.ui.setCBBClickClr = function(theElem, theCclss, theCBclss, theCB) {
    try {
    		strJobThread = JSSHOP.getUnixTimeStamp();
   		//  theMElem = document.getElementById(theElem);
    		theElem.className = theCclss;
            if (theElem.getAttribute("data-dblclick") == null) { // preventing double clicks
            theElem.setAttribute("data-dblclick", 1);
            setTimeout(function () {
            if (theElem.getAttribute("data-dblclick") == 1) {
		JSSHOP.startIntervalEvent(trgr_bclck[strJobThread], function() { JSSHOP.ui.setCBBClickEnd(theElem, strJobThread, theCBclss, theCB);}, 380);
            }
            theElem.removeAttribute("data-dblclick");
            }, 250);
            } else {
            theElem.removeAttribute("data-dblclick");
            }
    } catch(e) {
    		JSSHOP.startIntervalEvent(trgr_bclck[strJobThread], function() { JSSHOP.ui.setCBBClickEnd(theElem, strJobThread, theCBclss, theCB);}, 380);

		// alert(e);
         JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.setCBBClickClr");
    }
};

JSSHOP.ui.doDefBtn = function(tmpTxt, tmpCallback) {
tmpRd = "<div class=\"crsrPointer\"><div onclick=\"javascript:JSSHOP.ui.setCBBClickClr(this,'slmtable brdrClrNrml','slmtable brdrClrHdr', function(){" + tmpCallback + "});\" class=\"txtBig slmtable brdrClrHdr\">";
tmpRd += tmpTxt + "</div></div>";
return tmpRd;
};

JSSHOP.ui.doDefCBBCC = function(theObj,b,dcb) {
// JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','txtClrHdr clsDummy', function() { dcb });
JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'txtClrHdr','clsDummy', function() { dcb });

};

JSSHOP.ui.popLmenu = function() {
try {
timerID = setInterval("JSFX.MakeFloatingLayer.animate()", 30);
setTimeout('clearInterval(timerID)', 2000);
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.popLmenu");
}
};

JSSHOP.ui.deleteRow = function(r) {
try {
    tmpTRowI = r.parentNode.parentNode.rowIndex;
    // document.getElementById("myTable").deleteRow(tmpTRowI);
    r.parentNode.parentNode.deleteRow(tmpTRowI);	
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.ui.deleteRow");
}
};


JSSHOP.ui.popAndAppendLbox = function(theFill, clearLB) {
 
try {
tmpLbox = document.getElementById('lightbox');
tmpLCbox = document.getElementById('lightbox_content');
tmpLbox.style.display='inline';

if(clearLB == "y"){
tmpLCbox.innerHTML = "";
}
tmpLCbox.appendChild(theFill);
tmpVheight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
if(tmpLCbox.clientHeight >= tmpVheight) {
tmpLbox.style.position="absolute";
newel = document.createElement('div');
newel.innerHTML = "New Inserted";
tmpLCbox.appendChild(newel);
tmpLbox.style.height = tmpLCbox.clientHeight + 180;
}
tmpLCbox.style.display='block';
tmpLCbox.style.position="relative";
stop = getScrollTop();
// tmpLCbox.style.top=stop+"px";
scrollToElement("dvHdr");
window.scrollTo(0,0);
tmpLCbox.style.top="5px";

} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.popAndAppendLbox");
}
};


JSSHOP.ui.popAndFillLbox = function(theFill) {

try {
tmpLbox = document.getElementById('lightbox');
tmpLCbox = document.getElementById('lightbox_content');
tmpLbox.style.display='inline';
if(theFill == "noQvalue") {
} else if(theFill == "trans") {
// tmpLCbox.className = "lightbox_table";
} else {
tmpLCbox.innerHTML=theFill;
}
tmpVwidth = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;

tmpVheight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;
tmpLCwidth = tmpLCbox.clientWidth || tmpLCbox.innerWidth;
 

if(tmpLCbox.clientHeight >= tmpVheight) {
tmpLbox.style.position="absolute";
newel = document.createElement('div');
newel.innerHTML = "New Inserted";
tmpLCbox.appendChild(newel);
tmpLbox.style.height = tmpLCbox.clientHeight + 180;
}
 
window.scrollTo(0,0);
tmpLCbox.style.top="5px";

 
if(tmpVwidth > 400) {
iMdl = Math.round((tmpVwidth  / 2) - (tmpLCwidth  / 2));
} else {
iMdl = 2;
}
tmpLCbox.style.left=iMdl+"px";

tmpLCbox.style.position="fixed";
tmpLCbox.style.display='block';
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.popAndFillLbox");
}
};

JSSHOP.ui.popLbox = function() {
try {
document.getElementById('lightbox').style.display='inline';
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.popLbox");
}
};

JSSHOP.ui.closeLbox = function() {
try {

document.getElementById('lightbox').style.display='none';
document.getElementById('lightbox_content').style.top='-800px';
document.getElementById('lightbox_content').style.display='none';
document.getElementById('lightbox_content').innerHTML = "";
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.closeLbox");
}
};





JSSHOP.ui.popCntCrnrMsg = function(theFill) {

try {
tmpCrnrbox = document.getElementById("dvCntCrnrMsg");
document.getElementById("dvCrnrMsg").innerHTML = theFill; 
tmpVheight = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

trgeigh = tmpVheight - 210;
tmpCrnrbox.style.top = trgeigh + "px";
tmpCrnrbox.style.right="15px";
tmpCrnrbox.style.position="fixed";
tmpCrnrbox.style.display="block";
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.popCntCrnrMsg");
}
};

 



 
JSSHOP.ui.closeCntCrnrMsg = function() {
try {
document.getElementById('dvCntCrnrMsg').style.top='-800px';
document.getElementById('dvCntCrnrMsg').style.display='none';
document.getElementById('dvCrnrMsg').innerHTML = "";
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.closeCntCrnrMsg");
}
};


JSSHOP.ui.setfaction = function(fname, sumbmitbool, alertstring)
{
try {
if(alertstring != null){
if((confirm(alertstring)) && (sumbmitbool)) {
document[fname].submit();
} else {
alertstring = "";
}
}
if(sumbmitbool) {
document[fname].submit();
}
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.setfaction");
}
};


JSSHOP.ui.setTopTip = function(tmpTipStr) {
try {
strTip = "<img src=\"images/checked_g.gif\" class=\"clsToolTipImage\">";
strTip += "&nbsp;<span class=\"txtSmall txtClrDlg\">" + tmpTipStr + "</span>";
return strTip;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.setfaction");
return " - ";
}
};
 
JSSHOP.ui.setLblHighlight = function(theTmpFld,theTmpFldTxt,theTmpLbl,theTmpLblTxt) {
try {
// var fvTFI = theTmpFld.id;

JSSHOP.ui.addEvent(theTmpFld, "focus", function() {  theTmpLbl.className = "txtSmall txtBold txtClrHdr";ax = theTmpFld.value;theTmpFld.value = '';theTmpFld.value=ax;  theTmpFld.selectionStart = theTmpFld.selectionEnd = 10000;});
JSSHOP.ui.addEvent(theTmpFld, "blur", function() {  theTmpLbl.className = "txtSmall txtBold txtClrDlg";return false; });
// JSSHOP.ui.addEvent(theTmpfld, "blur", function() { theTmpLbl.className = 'txtClrDlg' });

} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.setLblHighlight");
}
};



JSSHOP.ui.doInpDVFocusEv = function(theElem, theDefText) {
try {
if(theElem.value==theDefText) {
theElem.value = "";
}
theElem.style.color="#000000";
} catch(e) {
JSSHOP.logJSerror(e, arguments, doInputFocusEv);
}
};
 
JSSHOP.ui.doInpDVBlurEv = function(theElem, theDefText) {
try {
if(theElem.value == ""){
theElem.value=theDefText;
}
theElem.style.color="#999966";
} catch(e) {
JSSHOP.logJSerror(e, arguments, "doInputBlurEv");
}
};



JSSHOP.ui.doDivDVFocusEv = function(theElem, theDefText) {
try {
if(theElem.innerText==theDefText){
theElem.innerText="";
}
theElem.style.color="#000000";
} catch(e) {
JSSHOP.logJSerror(e, arguments, doDivFocusEv);
}
};
 
JSSHOP.ui.doDivDVBlurEv = function(theElem, theDefText) {
try {
if(theElem.innerText.length < 3){
theElem.innerText=theDefText;
}
theElem.style.color="#999966";
} catch(e) {
JSSHOP.logJSerror(e, arguments, "doDivBlurEv");
}
};


JSSHOP.ui.doClassSet = function(theElem, theDefClass) {
try {
theElem.className=theDefClass;
} catch(e) {
JSSHOP.logJSerror(e, arguments, "doClassSet");
}
};

JSSHOP.ui.setDefFval = function(theTmpfld, theTmpFVal, theTmpFill) {
try {

if(theB.nodeName.toUpperCase() === "DIV") {
if(theTmpFill !== "noQvalue") {
JSSHOP.ui.doDivDVBlurEv(theTmpfld,theTmpFVal);
}
JSSHOP.ui.addEvent(theTmpfld, "focus", function() { JSSHOP.ui.doDivDVFocusEv(theTmpfld,theTmpFVal) });
JSSHOP.ui.addEvent(theTmpfld, "blur", function() { JSSHOP.ui.doDivDVBlurEv(theTmpfld,theTmpFVal) });
} else {
if(theTmpFill !== "noQvalue") {
JSSHOP.ui.doInpDVBlurEv(theTmpfld,theTmpFVal);
}
JSSHOP.ui.addEvent(theTmpfld, "focus", function() { JSSHOP.ui.doInpDVFocusEv(theTmpfld,theTmpFVal) });
JSSHOP.ui.addEvent(theTmpfld, "blur", function() { JSSHOP.ui.doInpDVBlurEv(theTmpfld,theTmpFVal) });
}
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.setDefFval");
return " - ";
}
};


/* Event Functions */

// Add an event to the obj given
// event_name refers to the event trigger, without the "on", like click or mouseover
// func_name refers to the function callback when event is triggered
JSSHOP.ui.addEvent = function(obj,event_name,func_name){

	if (obj.attachEvent){
		obj.attachEvent("on"+event_name, func_name);
	}else if(obj.addEventListener){
		obj.addEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = func_name;
	}
};

// Removes an event from the object
JSSHOP.ui.removeEvent = function(obj,event_name,func_name){
	if (obj.detachEvent){
		obj.detachEvent("on"+event_name,func_name);
	}else if(obj.removeEventListener){
		obj.removeEventListener(event_name,func_name,true);
	}else{
		obj["on"+event_name] = null;
	}
};

// Stop an event from bubbling up the event DOM
JSSHOP.ui.stopEvent = function(evt){
	evt || window.event;
	if (evt.stopPropagation){
		evt.stopPropagation();
		evt.preventDefault();
	}else if(typeof evt.cancelBubble != "undefined"){
		evt.cancelBubble = true;
		evt.returnValue = false;
	}
	return false;
};



/*
* shop funcitions
*/







JSSHOP.shop.setCurrItemArr = function(tmpIarr) {
currItemArr = null;
currItemArr = tmpIarr;
};
JSSHOP.shop.getCurrItemArr = function() {
return currItemArr;
};
JSSHOP.shop.setCurrItemsArr = function(tmpIarr) {
currItemsArr = null;
currItemsArr = tmpIarr;
};
JSSHOP.shop.getCurrItemsArr = function() {
return currItemsArr;
};
JSSHOP.shop.setCurrMItemsArr = function(tmpIarr) {
currMItemsArr = null;
currMItemsArr = tmpIarr;
};
JSSHOP.shop.getCurrMItemsArr = function() {
return currMItemsArr;
};
JSSHOP.shop.getCurrIArrIndex = function(tIint) {
// alert("getCurrIArrIndex " + JSON.stringify(currItemsArr[tIint]));
return currItemsArr[tIint];
};
JSSHOP.shop.getCurrMIArrIndex = function(tIint) {
// alert("getCurrMIArrIndex " + JSON.stringify(currMItemsArr[tIint]));
return currMItemsArr[tIint];
};



xdoAddFnsh = function(theObj,b,iei) {
JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','txtClrHdr bkgdClrWhite', function(){JSSHOP.shop.doCartAddPop()});

// JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'cls_button cls_button-medium brdrClrDlg txtClrHdr','txtClrHdr bkgdClrWhite', function(){window.scrollTo(0,0);JSSHOP.ui.setCBBClickClr(document.getElementById('ahCartIcon'),'cls_button cls_button-medium brdrClrDlg txtClrHdr','clsDummy', function(){void(0)})});
};

var xrenderCartPop = function(theObj,b, iei) {

tmpDOs = null;
tmpDOs = {};

tmpQtInt = 6;
if(b.indexOf("_id") != -1) {
// alert(b);
var arrToFill = null;
arrToFill = JSON.parse(b);
ts = arrToFill[0];
JSSHOP.shared.setFrmFieldVal("qcartitem", "_id", ts._id);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_cartqty", Math.round(ts.ci_cartqty) + 1);
tmpDOs["ws"] = "where ci_uid=? and ci_coid=? and ci_pid=?";
tmpDOs["wa"] = [quid,cid,strRecID];
tmpQtInt = 7;
} else {
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_cartqty", 1);
}
tmpDOs["knvp"] = JSSHOP.shared.getFrmVals(document["qcartitem"], "nada");
// alert("renderCartPop: " + oi["rq"]);
oi = getNuDBFnvp("qcartitem",tmpQtInt,theObj,tmpDOs);
doQComm(oi["rq"], theObj, "xdoAddFnsh");
};

JSSHOP.shop.doQIadd = function(thePrdsArna, theObj,theId, iei){
try {
tmpVindex = iei;
tsa = {};
tsa = currProdsArr[thePrdsArna][iei];
// alert("JSSHOP.shop.doQIadd"  + thePrdsArna + ":: " + iei + ":: " + JSON.stringify(currProdsArr[thePrdsArna][iei]));
 
strRecID = tsa._id;
strRecType = 51;

var today = new Date().getTime();
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_uid", quid);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_cartid", cartID);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_coid", cid);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_catid", tsa.i_catid);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_pid", strRecID);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_title", tsa.i_title);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_price_a", tsa.i_price_a);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_price_b", tsa.i_price_b);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_dimen_n", tsa.i_dimen_n);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_dimen_v", tsa.i_dimen_v);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_img", tsa.i_img);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_vala", tsa.i_vala);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_valb", catid);
JSSHOP.shared.setFrmFieldVal("qcartitem", "ci_dadded", today);


tmpDOs = null;
tmpDOs = {};
tmpDOs["ws"] = "where ci_uid=? and ci_coid=? and ci_pid=?";
tmpDOs["wa"] = [quid,cid,strRecID];
oi = getNuDBFnvp("qcartitem",5,null,tmpDOs);
// alert(oi["rq"]);
doQComm(oi["rq"], theObj, "xrenderCartPop");
} catch(e) {
alert(e);
}
};




JSSHOP.shop.doItemShowPop = function() {
    loadNuJSModal("tplates/aa-mod-show-item.html?tt=" + JSSHOP.getUnixTimeStamp(), "trans");
};

JSSHOP.shop.doCartAddPop = function() {
    loadJSModal("tplates/aa-mod-show-cartadd.html?tt=" + JSSHOP.getUnixTimeStamp(), "trans");
};

JSSHOP.shop.doCAshow = function(thePrdsArna, theObj) {
JSSHOP.ui.setCBBClickClr(document.getElementById(theObj),'crsrPointer icndbtn slmtable bkgdClrTtl brdrClrHdr txtClrHdr fltrImgInvClr','crsrPointer icndbtn', function(){void(0)});
    JSSHOP.shared.setFrmVals("qitem",tmpVitemArr[tmpVindex],function() {doCartAddPop()});
};

JSSHOP.shop.doIshow = function(thePrdsArna, iei) {
     // alert("JSSHOP.shop.doIshow "  + thePrdsArna + ":: " + iei + ":: " + JSON.stringify(currProdsArr[thePrdsArna][iei]));
    JSSHOP.shop.setCurrItemArr(currProdsArr[thePrdsArna][iei]);
    JSSHOP.shared.setFrmVals("qitem", currProdsArr[thePrdsArna][iei], function () {
        JSSHOP.shop.doItemShowPop();
    });
};


JSSHOP.shop.getIShowstr = function (thePrdsArna, rid, tmprhtml) {
    strTret = "<div onclick=\"JSSHOP.ui.setCBBClickClr(this,'crsrPointer brdrClrHdr','crsrPointer brdrNone', function(){JSSHOP.shop.doIshow('" + thePrdsArna + "'," + rid + ");});\" class=\"crsrPointer brdrNone\">";
    strTret += tmprhtml + "</div>";
    return strTret;
};



JSSHOP.shop.getPrdPriceStr = function(thePrdsArna, prcInt, prcID, prcA, prcB){
 
	retStrPrHtml =  "<br><span class=\"txtBig txtClrDlg\">" + prcB + "</span>";
	// retStrPrHtml +=  "<img src=\"images/cart_r.gif\" class=\"crsrPointer icndbtn\"  id=\"tdCI" + thePrdsArna  + prcID + "\" onclick=\"javascript:JSSHOP.shop.doQIadd('" + thePrdsArna + "',this.id," + prcID + "," + prcInt + ");\">";

 
		try {
 	na = prcA - prcB;
	nd = Math.round((na / prcA) * 100);
	retStrPrHtml = "";

	retStrPrHtml =  "<br><span class=\"txtBig txtClrDlg\">" + prcB + "</span>";
	// retStrPrHtml +=  "<img src=\"images/cart_r.gif\" class=\"crsrPointer icndbtn\"  id=\"tdCI" + thePrdsArna + prcID + "\" onclick=\"javascript:JSSHOP.shop.doQIadd('" + thePrdsArna + "',this.id," + prcID + "," + prcInt + ");\">";


		return retStrPrHtml;
		} catch(e) {
		return retStrPrHtml;
		}
};

JSSHOP.shop.getPrdImgStr = function(tTAnme, tmpVala){

		retIstrI = "images/menu_iconl.jpg";
		try {
		tmpValb = tmpVala;
 		if((tmpValb.indexOf("lcl-") != -1) || (tmpValb.indexOf("rem-") != -1)) {
		tmpVala = tmpValb.substring(4, tmpValb.length);
		}
 		if(tmpVala.indexOf(".") != -1) {
		if((tTAnme == "prodpg") || (tTAnme == "modItem")) {
		retIstrI = "images/pimgs/" + tmpVala;	
		} else {
		retIstrI = "images/pimgs/s_thumb" + tmpVala;	
		}  
		}
if((isPhP == "no") && (isJApp == "y")) {

 		if((tmpVala.indexOf(".gif") != -1) && (tTAnme == "prodpg")) {
		tmpEstr = app.doGifStr(tmpVala);
		document.getElementById("fldChallArray").value = tmpEstr;
		fullIstr = document.getElementById("fldChallArray").value;
		retIstrI = "data:image/gif;base64, " + fullIstr;
		} else if(tmpVala.indexOf(".mp4") != -1) {
		tmpEstr = app.doGifStr(tmpVala);
		document.getElementById("fldChallArray").value = tmpEstr;
		fullIstr = document.getElementById("fldChallArray").value;
		retIstrI = "data:video/mp4;base64, " + fullIstr;
		} else {
		tmpEstr = app.doThmbStr(tmpVala);
		document.getElementById("fldChallArray").value = tmpEstr;
		fullIstr = document.getElementById("fldChallArray").value;
		retIstrI = "data:image/jpeg;base64, " + fullIstr;
		}

		}
		return retIstrI;
		} catch(e) {
		return retIstrI;
		}
};




JSSHOP.shop.setPrdImg = function(tsCatArrNm, tCIL) {
try {
 
if(ntImgCtr[tsCatArrNm] >= tCIL){
clear(tsCatArrNm)();
currPgTitle = "c" + JSSHOP.getUnixTimeStamp();
document.title = currPgTitle; 
} else {
ass = null;
ass = currProdsArr[tsCatArrNm][ntImgCtr[tsCatArrNm]];

    image = null;
    image = new Image();
    image.onload = function() {
        if(document.getElementById(tsCatArrNm + ass._id)) {
        document.getElementById(tsCatArrNm + ass._id).src = image.src;
	   } else { 
	   // alert(tsCatArrNm + ass._id);
	   }
	ntImgCtr[tsCatArrNm] = ntImgCtr[tsCatArrNm] + 1;
	// currPgTitle = JSSHOP.getUnixTimeStamp();
	// document.title = currPgTitle; 
    }
    image.src = JSSHOP.shop.getPrdImgStr(tsCatArrNm, ass.i_img);


// document.getElementById(tsCatArrNm + ass._id).src = JSSHOP.shop.getPrdImgStr(tsCatArrNm, ass.i_img);

}

} catch(e) {
// alert("ntImgCtr[tsCatArrNm]: " + ntImgCtr[tsCatArrNm] + " :: tsCatArrNm: " + tsCatArrNm + " :: " + "tCIL: " + tCIL);
ntImgCtr[tsCatArrNm] = ntImgCtr[tsCatArrNm] + 1;
// alert(e);
// clear(tsCatArrNm)();
}
};
 
 
JSSHOP.shop.setCatPrdImgs = function(tCatArrNm) {
try {
 
ntImgCtr[tCatArrNm] = 0;
restart(tCatArrNm, function() { JSSHOP.shop.setPrdImg(tCatArrNm, currProdsArr[tCatArrNm].length) }, currImgSleep)();
// JSSHOP.startNuIntrvlEvnt(tCatArrNm,  function() { JSSHOP.shop.setPrdImg(tCatArrNm, currProdsArr[tCatArrNm].length) }, currImgSleep);
} catch(e) {
alert("setCatPrdImgs " + e);
}
};

JSSHOP.shop.rndrPrdMedia = function(aa,bb,cc) {
 alert(bb);
try {
if(bb.indexOf("_id") != -1) {
// tmpRPMArr  = JSON.parse(bb);

}
} catch(e) {
alert("rndrPrdMedia " + e);
}
};


JSSHOP.shop.getPrdMedia = function(tmpCatId,tmpIid,tmpGPMCB) {
 
try {
    tmpDOs = null;
    tmpDOs = {};
    tmpDOs["ws"] = "where m_coid=? and  m_catid=? and m_pid=? and m_rtype=?";
    tmpDOs["wa"] = [cid,tmpCatId,tmpIid,"5"];
    oi = getNuDBFnvp("qmedia", 5, null, tmpDOs);
    doQComm(oi["rq"], null,tmpGPMCB); 
} catch(e) {
alert("setCatPrdImgs " + e);
}
};
 


JSSHOP.shop.getPrdsFullStr = function(thePrdsArna, thePrdsArr, thePrdsClss, thePrdsElem, thePrdsCB){
 

currProdsArr[thePrdsArna] = thePrdsArr;
// alert("getPrdsFullStr: " + JSON.stringify(thePrdsArr));

  try {
var upRefs = arrUprefs["prfsSHOPuser"][0].scv;
} catch(e) {
var upRefs = "r";
}

try {
var upPrixRef = arrUprefs["prfsSHOPuser"][0].scp;
} catch(e) {
var upPrixRef = "u";
}


strUCPID = "";
strUCPTtl = "";
strCatID = "";
strCatName = "";
strHtml = "";
strMLinks = "";
strImgDsct = "";

var len = thePrdsArr.length;
 
tstr = "";
iint = 0;

// product-grid
strHtml += "<ol class=\"float\">";
 
ts = null;

while(iint < len) {
// ts = null;
try {
ts = thePrdsArr[iint];
if(ts._id) {
strImgDsct = "";
      subTIdesc = ts.i_desc;


	if((thePrdsArna == "prodpg") || (pid == "aa-show-item")){
	subIdesc = subTIdesc;
      strImgDsct += "<img onclick=\"document.location.href = this.src\" id=\"" + thePrdsArna +  ts._id + "\" src=\"images/misc/trans.gif\" class=\"activator prodBigImage crsrPointer\">";
	} else {
	subIdesc = subTIdesc.substring(0, 15);
      strImgDsct += "<a href=\"index.php?pid=aa-show-item&itemid=" + ts._id + "&cid=" + ts.i_coid + "&catid=" + ts.i_catid + "\">";
	if(upRefs == "r") {
      strImgDsct += "<img id=\"" + thePrdsArna +  ts._id + "\" src=\"images/misc/trans.gif\" class=\"prodBigImage\">";
	} else {	
      strImgDsct += "<img id=\"" + thePrdsArna +  ts._id + "\" src=\"images/misc/trans.gif\" class=\"prodImage\">";
	}
      strImgDsct += "</a>";
	}
   

	if((thePrdsArna == "prodpg") && (pid == "aa-show-item")){
 	strHtml += "<li  class=\"prodBigBox\">";
 	} else {
 	// strHtml += "<li  class=\"prodBigBox\"  style=\"min-width:200px;max-width:40%;min-height:250px;max-height:251px;float: left;\">";
 	strHtml += "<li class=\"float-item\" style=\"\">";

	}



	strHtml += "<div class=\"txtBold\" style=\"padding: 3px;\">";
 
	strHtml += ts.i_title;

	strHtml += "</div>";

	strHtml += "<div>" + strImgDsct + "</div>";

	if(thePrdsArna == "prodpg") {


 



	strHtml += "<div id=\"dvPrdMedia\"></div>";



	}

	strHtml +=  "<span class=\"txtSmall txtClrHdr\" style=\"padding:6px;\">";
	strHtml +=  subIdesc;
	strHtml +=  "</span>";

 
 	

	strHtml += "<div  id=\"tdCI" + ts._id + "\" onclick=\"javascript:JSSHOP.shop.doQIadd('" + thePrdsArna + "',this.id,'" + ts._id + "','" + iint + "');\"><img src=\"images/cart_r.gif\" class=\"icnsmlbtn brdrClrWhite\">";
	strHtml += "<input type=\"hidden\" id=\"prd" + 5 + iint + "\" value=\"\">";
	strHtml += "</div>";



 	strPriceHtml =  JSSHOP.shop.getPrdPriceStr(thePrdsArna, iint, ts._id, ts.i_price_a, ts.i_price_b);

	 strHtml += "<div style=\"float: left;\">" + strPriceHtml + "</div>";

 

	strHtml += "</li>";
 
	}
 
} catch(e) {
// strHtml += e + "<br>";
}
iint++;
} 
strHtml += "</ol>";

return strHtml;
};



 


JSSHOP.shop.getDefaultPageNav = function(currentPage, nrOfPages) {


try {
// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
var delta = 1,range = [];
pgnString = "<ol class=\"pagination\">";
startPg = (currentPage - delta) > 0 ? currentPage - delta : 1;
endPg = (currentPage + delta + 2) > nrOfPages ? nrOfPages : currentPage + delta + 2; 

for(ika = startPg; ika < endPg; ika++) {
range.push(ika);
}  
range.push(endPg);

		if(startPg - 2 > 0) {
		currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + 1 + ")";
	      pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">1</a></li>";
		}

		if(startPg - 1 > 0) {
		currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + (startPg - 1) + ")";
		if(startPg - 1 == 1) {
	      pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">1</a></li>";
		} else {
	      pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">...</a></li>";
		}
		}	
 
		for(idd = 0; idd < range.length; idd++) {
 
		currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + range[idd] + ")";
 		if(range[idd] == currentPage + 1) {
	      pgnString += "<li class=\"page\"><b>" + range[idd] + "</b></li>";
		} else {
	      pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">" + range[idd] + "</a></li>";
		}

        	} // end of for idd

		if(endPg + 1 <= nrOfPages) {
		currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + (endPg + 1) + ")";
		if(endPg + 1 == nrOfPages) {
	      pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">" + nrOfPages + "</a></li>";
		} else {
	      pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">...</a></li>";
		}
		}		


 		if(endPg + 2 <= nrOfPages) {
		currPAlink = "javascript:scrollToElement('dvHdr');loadCatChunk(" + nrOfPages + ")";
	      pgnString += "<li class=\"page\"><a href=\"" + currPAlink + "\">" + nrOfPages + "</a></li>";
		}	
            pgnString += "</ol>";
    		return pgnString;

} catch(e) {
alert(e);
}
};

 

/*
*sql tools
*
*/




var showDumpRes = function(theElem, theResp, marble){

var arrToFill = null;
arrToFill = JSON.parse(theResp);
var len = arrToFill.length;
strHtml = "";
tstr = "";
iint = 0;
// alert("renderNuTQBItems: " + theResp);
// alert("renderNuTQBItems JSON: " + JSON.stringify(arrToFill));
// strHtml += "<table>";
while(iint < len) {
ts = arrToFill[iint];
tmpVitemObj = null;
tmpVitemObj = {};


strHtml += "<tr>";

for(var gkey in ts) {
	strHtml += "<td>";
	strHtml +=  ts[gkey];
	strHtml += "</td>";
}  


	strHtml += "</tr>";
 
iint++;
}

iint = 0;
strTHhtml = "<thead><tr>";
// alert("renderNuTQBItems: " + theResp);
// alert("renderNuTQBItems JSON: " + JSON.stringify(arrToFill));
// strHtml += "<table>";
qint = ts.length;
for(var gkey in ts) {
strTHhtml += "<th>" + Object.keys(ts)[iint] + "</th>";
iint++;
}
strTHhtml += "</tr></thead>";
newel = document.createElement('div');
tmpFstr = "<table class=\"striped highlight responsive-table\">" + strTHhtml +  strHtml + "</table>";

newel.innerHTML = tmpFstr;
tmpTDQI = document.getElementById("tdSql");
tmpTDQI.innerHTML = "";
tmpTDQI.appendChild(newel);
};


var aLoadDump = function() {
	try {
tmpDOs = null;
tmpDOs = {};
tmpDOs["ws"] = "where _id>?";
tmpDOs["wa"] = [0];
oi = getNuDBFnvp("qbit",5,null,tmpDOs);
doQComm(JSSHOP.shared.getFieldVal("taSql", "select * from qco"), null, "showDumpRes");
	//  alert(oi["rq"]);
	}catch(e) {
	alert(e);
	}
// doQComm('select * from prod_options order by OptionType desc limit 500', null, "rEditProdOptions")
};






/*
* java and android funcitions
*/

JSSHOP.jndroid.doPagePopUp = function(theUrl, theHTML) {
	try {
	app.doPagePopUp(theUrl, theHTML);
} catch(e) {
JSSHOP.logJSerror(e, arguments, "JSSHOP.jndroid.doPagePopUp");
}
};

JSSHOP.jndroid.appRetImgUload = function(theImg, theUri) {
try {
JSSHOP.shared.setFrmFieldVal("qitem","i_vala",theImg);
JSSHOP.shared.setFrmFieldVal("qitem","i_valb",theImg);
document.getElementById("mod_i_vala").value = theImg;
document.getElementById("mod_i_valb").value = theUri;
tIUID = JSSHOP.shared.getFrmFieldVal("qitem","_id",0);
tImgstr = "data:image/png;base64, " + theImg;
doItemEdit();
} catch(e) {
alert(e);
}
};


