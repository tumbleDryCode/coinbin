 
         
        function setConfValInt(theKey, theVal) {
        	app.setConfValInt(theKey, theVal);
        }

        function setConfValString(theKey, theVal) {
        	if(theKey == "confBrowBkgd") {
        		document.body.style.backgroundColor = theVal;
        	}
        	app.setConfValString(theKey, theVal);
        }

        function getConfValInt(theKey) {
        	strConf = app.fetchConfValInt(theKey);
        	return strConf;
        }

        function getConfValString(theKey) {
        	strConf = app.fetchConfValString(theKey);
        	return strConf;
        }

