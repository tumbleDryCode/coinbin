var currRSSODiv = "dvRss";
// -----------------------  start cutstring.js  ---------------------


/*jsl:option explicit*/
/*jsl:declare document*/
/*
This class is used to cut the string which is having html tags. 
It does not count the html tags, it just count the string inside tags and keeps
the tags as it is.

ex: If the string is "welcome to <b>JS World</b> <br> JS is bla". and If we want to cut the string of 12 charaters then output will be "welcome to <b>JS</b>". 

Here while cutting the string it keeps the tags for the cutting string and skip the rest and without distorbing the div structure.

USAGE:
 var obj = new cutString("welcome to <b>JS World</b> <br> JS is",12);
 var newCutString = obj.cut();
*/
function CutString(string,limit){
    // temparary node to parse the html tags in the string
    this.tempDiv = document.createElement('div');
    this.tempDiv.id = "TempNodeForTest";
    this.tempDiv.innerHTML = string;
    // while parsing text no of characters parsed
    this.charCount = 0;
    this.limit = limit;

}
CutString.prototype.cut = function(){
    var newDiv = document.createElement('div');
    this.searchEnd(this.tempDiv, newDiv);
    return newDiv.innerHTML;
};

CutString.prototype.searchEnd = function(parseDiv, newParent){
    var ele;
    var newEle;
    for(var j=0; j< parseDiv.childNodes.length; j++){
	ele = parseDiv.childNodes[j];

	// not text node
	if(ele.nodeType != 3){
	    newEle = ele.cloneNode(true);

	    newParent.appendChild(newEle);
	    if(ele.childNodes.length === 0)
		continue;
	    newEle.innerHTML = '';
	    var res = this.searchEnd(ele,newEle);
	    if(res)
		return res;
	    else{
		continue;
	    }
	}

	// the limit of the char count reached
	if(ele.nodeValue.length + this.charCount >= this.limit){
	    newEle = ele.cloneNode(true);
	    newEle.nodeValue = ele.nodeValue.substr(0, this.limit - this.charCount);
	    newParent.appendChild(newEle);
	    return true;
	}
	newEle = ele.cloneNode(true);
	newParent.appendChild(newEle);

	this.charCount += ele.nodeValue.length;
    }
    return false;
};

function cutHtmlString($string, $limit){
    var output = new CutString($string,$limit);
	nerAval = output.cut();
 
 // cvalue = bvalue.replace(nullRA,  '$1"$2"');
 // bvalue =  ieInnerHTML(nerAval, true);
return nerAval;
    // return output.cut();
}
 



// -----------------------  end cutstring.js  ---------------------


function strip_tags(str, allowed_tags) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
 
    var key = '', tag = '', allowed = false;
    var matches = allowed_array = [];
 
    var replacer = function(search, replace, str) {
        return str.split(search).join(replace);
    };
 
    // Build allowes tags associative array
    if (allowed_tags) {
        allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi);
    }
  
    str += '';
 
    // Match tags
    matches = str.match(/(<\/?[^>]+>)/gi);
 
    // Go through all HTML tags
    for (key in matches) {
        if (isNaN(key)) {
            // IE7 Hack
            continue;
        }
 
        // Save HTML tag
        html = matches[key].toString();
 
        // Is tag not in allowed list? Remove from str!
        allowed = false;
 
        // Go through all allowed tags
        for (k in allowed_array) {
            // Init
            allowed_tag = allowed_array[k];
            i = -1;
 
            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'>');}
            if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+' ');}
            if (i != 0) { i = html.toLowerCase().indexOf('</'+allowed_tag)   ;}
 
            // Determine
            if (i == 0) {
                allowed = true;
                break;
            }
        }
 
        if (!allowed) {
            str = replacer(html, "", str); // Custom replace. No regexing
        }
    }
 
    return str;
}



var addslashes = function(theStr){
	return theStr.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
var trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};




function stripHTML(oldString) {
	//function to strip all html
	var newString = oldString.replace(/(<([^>]+)>)/ig,"");
	
	//replace carriage returns and line feeds
   newString = newString.replace(/\r\n/g," ");
   newString = newString.replace(/\n/g," ");
   newString = newString.replace(/\r/g," ");
	
	//trim string
	newString = newString.trim();
	
	return newString;
}





function getNuRSSfeed(trssfUrl, tRSSODiv) {
try {
currRSSODiv = tRSSODiv;

tRssStr = app.doRSSParser(trssfUrl);
} catch(e) {
alert("getRSSfeed:ERROR: " + e);
}
}




function getRSSfeed(trssfUrl) {
try {
tRssStr = app.doRSSParser(trssfUrl);
} catch(e) {
alert("getRSSfeed:ERROR: " + e);
}
//  parseRssData(tRssStr);
//formatRSS(300, tRssStr, 50);
}





function parseRssData() {
var tpRssRetStr = "";
try {
aRssData = app.getRSSStr();
fldChallArray.value = aRssData;
theRssData = fldChallArray.value;
tval = fldChallArray.value;
boolWithImgs = true;
var fullString = "";
powpostCharTrim = 5;
strMobilePost = "";
currRSSDescClr = "#809080";
currRSSTitleClr = "#000000";
if(theRssData.indexOf("title") != -1) {
theRssJson = JSON.parse(theRssData);
// theRssJson = eval(theRssData);
var rlen = theRssJson.length;
var riint = 0;


while(riint < rlen) {
tRssItem = theRssJson[riint];
chanTitle = tRssItem.title;
chanDesc = tRssItem.description;
chanLink = tRssItem.link;
chanAuthor = tRssItem.author;
chanPubDate = tRssItem.pubDate;
 

   pchanLink = chanLink.toLowerCase();
 
   tagStrippedTitle = stripHTML(chanTitle).substring(0, 140);
   tagStrippedDesc = stripHTML(chanDesc).substring(0, 840);
   if(tagStrippedDesc.length > 140) {
   tagStrippedDesc +=  "...";
   }
   if(tagStrippedTitle.length > 140) {
   tagStrippedTitle +=  "...";
   } else if(tagStrippedTitle.length < 3) {
   tagStrippedTitle = tagStrippedDesc.substring(0, 140) + "...";
   }
 

   chanTitle = tagStrippedTitle.replace(/["']{1}/gi,""); 
   chanDesc = tagStrippedDesc.replace(/["']{1}/gi,""); 
   chanID = chanTitle.substring(5, 15);
 

	var strRestOfPost = "";
      var rssFlashTitle = "";
      var rssFlashLink = "";
      var aLongdescription = "";
      var aStrpdDescription = "";
      var rssFlashDescription = "";
      var rssFlashDate = "";
      var iRIC = 0;

 

      arssFlashTitle = chanTitle;
      rssFlashTitle = "<u>"+arssFlashTitle.substring(0,1)+"</u>"+arssFlashTitle.substring(1);
	// cleanFlashTitle = rssFlashTitle.replace(/["']/g, "");
	cleanFlashTitle = addslashes(rssFlashTitle);
      rssFlashLink = chanLink;
	rssFlashLink = rssFlashLink.replace(/'/g, "\\'");
	rssFlashDate = chanPubDate; 
      aLongdescription = chanDesc;


	if(boolWithImgs) {
	iStrpdDescription = strip_tags(aLongdescription, "<a><b><img><font><i><u><br><li><span><p><TEXTFORMAT></TEXTFORMAT>");
	aStrpdDescription = iStrpdDescription.split('<img ').join('<img class="feedImg" ');
	} else {
	aStrpdDescription = strip_tags(aLongdescription, "<a><b><font><i><u><br><li><span><p><TEXTFORMAT></TEXTFORMAT>");
	}
	aRssFlashDescription = cutHtmlString(aStrpdDescription, 8000);	
	
      bRssFlashDescription = aRssFlashDescription.split('<A ').join('<a target="_top" ').split('</A>').join('</a>');
      cRssFlashDescription = bRssFlashDescription.split('<A ').join('<a target="_top" ').split('</A>').join('</a>');
      dRssFlashDescription = cRssFlashDescription.replace(/[\n\r\t]/g, "");
      eRssFlashDescription = dRssFlashDescription.replace(/<br><br><br>/gi, "<br>");
      rssFlashDescription = eRssFlashDescription.replace(/<br><br>/gi, "<br>");
	qRssFlashDescription = cutHtmlString(rssFlashDescription, 1350);
      if(rssFlashDescription.length > 350) {
      strRestOfPost = rssFlashDescription.substr(qRssFlashDescription.length, rssFlashDescription.length - qRssFlashDescription.length);
      } 
	arssFlashLink = "javascript:JSSHOP.ui.toggleModule('lnkMP" + chanID + iRIC + "','spn" + chanID + iRIC + "','more..','..less');";
	theShareLink = "javascript:setEPstoryShare('" + addslashes(cleanFlashTitle) + "','" + rssFlashLink + "');";
      if(rssFlashDescription.length > 350) {
	fnlFlashDescription = qRssFlashDescription + " <span id=\"spn" + chanID + iRIC + "\" style=\"display:none;visibility:hidden;\">" +  strRestOfPost + "</span><br><a href=\"" + arssFlashLink + "\"><span id=\"lnkMP" + chanID + iRIC + "\">more..</span></a>   [<a href=\"" + theShareLink + "\"><font class=\"txtSmall txtClrHdr\">share</font></a>]";
	} else {
	fnlFlashDescription = qRssFlashDescription + "  <br>[<a href=\"" + theShareLink + "\"><font class=\"txtSmall txtClrHdr\">share</font></a>]";
	}
	// mobile strins
	strAMobileTitle = rssFlashTitle.replace(/["']{1}/gi,"");
	strMobileTitle = strip_tags(strAMobileTitle, "");

   	strMobileLink = rssFlashLink;

	strAMobileDesc = strip_tags(aRssFlashDescription, "");
   	strBMobileDesc = strAMobileDesc.substring(0, 220) + "...";
   	strMobileDesc = strBMobileDesc.replace(/["']{1}/gi,"");

	if(powpostCharTrim == "4000") {
	// just one user generated post, dont need title
	fullString += rssFlashDescription;
	strMobilePost += strMobileDesc; 

	} else if(powpostCharTrim == "5") {
	strMobilePost += strMobileTitle + "\r\n" + strMobileLink + "\r\n\r\n"; 

	// just wants titles
	fullString += "<b><font class=\"txtBold\"><u><a  target=\"_blank\" href=\"" + rssFlashLink + "\">" + rssFlashTitle + "</a></u></font></b><br><font class=\"txtSmall\">--</font><br>";
	} else {
	strMobilePost += "ref: http://technewsi.com/?epr=adZ23Qz0KKa<center><b>" + strMobileTitle + "</b></center><center>" + strMobileDesc + "</center><center>-------</center>"; 

 
	fullString += "<div id=\"divBoxStory" + chanID + iRIC + "\" ><div class=\"boxStoryDiv\" style=\"padding:8px;\">"; 	
	fullString += "<div id=\"divTitleDesc" + chanID + iRIC + "\" class=\"txtSmall txtBold boxTitleDiv\"><a  target=\"_blank\"  href=\"" + rssFlashLink + "\"><font data-ftitle=\"" + chanID + iRIC + "\" color=\"" + currRSSTitleClr + "\">" + rssFlashTitle + "</font></a></div>";
	fullString += "<div id=\"divFeedDesc" + chanID + iRIC + "\" class=\"txtSmall boxDescDiv\"><font color=\"" + currRSSDescClr + "\" data-fdesc=\"" + chanID + iRIC + "\">" + chanDesc + "</font></div>";
	fullString += "<div id=\"divDateDesc" + chanID + iRIC + "\" class=\"txtSmall txtClrGrey\">" + rssFlashDate + "</div><br><br>";
	fullString += "</div></div>"; 
	fullString += "<div style=\"height:20px;\"></div>"; 	
	}


    tagStrippedTitle = null;
    tagStrippedDesc = null;
    rssFlashDescription = "";


 
chanTitle = null;
chanDesc = null;
chanLink = null;
chanFeedUrl = null;
pchanLink = null;
chanID = null;


	
 


 	++riint;
 
   }





 } else {
fullString = "Error";
}

} catch(e) {
fullString += e;
alert(e);
// return(e);
}

document.getElementById(currRSSODiv).innerHTML = fullString;
 
}




 

