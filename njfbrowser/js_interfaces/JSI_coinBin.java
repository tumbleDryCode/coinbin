package njfbrowser.js_interfaces;

import com.google.gson.Gson;
import njfbrowser.main.CoinBin;
import njfbrowser.utils.BasicUtils;
import org.horrabin.horrorss.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.text.DecimalFormat;
import java.util.List;


public class JSI_coinBin {
    CoinBin webMobia;
    BasicUtils bUtils;

    public JSI_coinBin(CoinBin theWebMobia) {
        webMobia = theWebMobia;
        bUtils = new BasicUtils();

    }


    public void setConfValString(String theString, String theVal) {
        webMobia.putConfValString(theString, theVal);
    }

    public void setConfValInt(String theString, String theVal) {
        webMobia.putConfValInt(theString, Integer.parseInt(theVal));
    }

    public String fetchConfValString(String theString) {
        String confStr = webMobia.getConfValString(theString);
        return confStr;
    }

    public String fetchConfValInt(String theString) {
        String confStr = String.valueOf(webMobia.getConfValInt(theString));
        return confStr;
    }

    public String getCurrPageVars(String tmpStrQstr) {
        String cpv = webMobia.getCurrPageVars(tmpStrQstr);
        System.out.print("getCurrPageVars: " + cpv);

        return cpv;
    }


    public String getNuDBselectQ(String tmpStrQstr) {
        String strHtml = "noQvalue";
        try {

            JSONObject fulretObject = new JSONObject();
            JSONArray resultSet = new JSONArray();
            JSONObject fretObject = new JSONObject();
            String tmpCB;
            String tmpEl;
            String tmpV;
            String tmpQFstring;


            if (tmpStrQstr.startsWith("batch")) {
                tmpQFstring = tmpStrQstr.substring(5, tmpStrQstr.length());
                JSONArray array = new JSONArray(tmpQFstring);
                System.out.println("batch of" + tmpQFstring);

                for (int i = 0; i < array.length(); i++) {
                    JSONObject row = array.getJSONObject(i);
                    JSONObject retObject = new JSONObject();

                    JSONObject vObject = new JSONObject();

                    tmpCB = row.getString("f");
                    tmpEl = row.getString("e");
                    tmpV = row.getString("v");
                    String retQstr = webMobia.dbMSQLA.setDBselectQ(tmpV);
                    retObject.put("f", tmpCB);
                    retObject.put("v", new JSONArray(retQstr));
                    retObject.put("e", tmpEl);
                    fretObject.put(tmpEl, retObject);
                    resultSet.put(fretObject);
                    System.out.println("batch of: " + tmpCB);
                }
                fulretObject.put("status", "fromandroid");
                fulretObject.put("data", fretObject.toString());


            } else {
                fulretObject.put("status", "fromandroid");
                fulretObject.put("data", webMobia.dbMSQLA.setDBselectQ(tmpStrQstr));

            }

            strHtml = fulretObject.toString();
            return strHtml;
        } catch (Exception ee) {
            System.out.println("getNuDBselectQ: " + ee);
            ee.printStackTrace();
            return strHtml;
        }

    }

    public String getDBselectQ(String tmpStrQstr) {
        String strHtml = "noQvalue";
        if (tmpStrQstr.startsWith("batch")) {
            String tmpCB;
            String tmpEl;
            String tmpV;
            String tmpQFstring = tmpStrQstr.substring(5, tmpStrQstr.length());
            System.out.println("batch of" + tmpQFstring);
            try {
                JSONObject fulretObject = new JSONObject();
                JSONArray resultSet = new JSONArray();
                JSONArray array = new JSONArray(tmpQFstring);
                JSONObject fretObject = new JSONObject();
                for (int i = 0; i < array.length(); i++) {
                    JSONObject row = array.getJSONObject(i);
                    JSONObject retObject = new JSONObject();

                    JSONObject vObject = new JSONObject();

                    tmpCB = row.getString("f");
                    tmpEl = row.getString("e");
                    tmpV = row.getString("v");
                    String retQstr = webMobia.dbMSQLA.setDBselectQ(tmpV);
                    retObject.put("f", tmpCB);
                    retObject.put("v", new JSONArray(retQstr));
                    retObject.put("e", tmpEl);
                    fretObject.put(tmpEl, retObject);
                    resultSet.put(fretObject);
                    System.out.println("batch of: " + tmpCB);
                }
                strHtml = fretObject.toString();
            } catch (Exception ee) {
                System.out.println("batch of error: " + ee);
                return strHtml;
            }

        } else {

            strHtml = webMobia.dbMSQLA.setDBselectQ(tmpStrQstr);
        }
        return strHtml;
    }


    public String getCryptAssets(String tmpStrQstr) {

        return webMobia.doCryptAssets(tmpStrQstr);
    }

    public String getExchangeInfo(String tmpStrQstr) {

        return webMobia.doExchangeInfo(tmpStrQstr);
    }

    public String getTickerPrice(String tmpStrQstr) {

        return webMobia.doTickerPrice(tmpStrQstr);
    }

    public String getTickerStatistics(String tmpStrQstr) {

        return webMobia.doTickerStatistics(tmpStrQstr);
    }

    public String getMarketOrder(String tmpType, String tmpSymStr, String tmpQty) {

        return webMobia.doMarketOrder(tmpType, tmpSymStr, tmpQty);
    }

    public String doOrderTest(String tmpType, String tmpSymStr, String tmpQty) {

        return webMobia.doOrderTest(tmpType, tmpSymStr, tmpQty);
    }


    public String getStrAssets() {
        return webMobia.getStrAssets();
    }

    public String getStrQAssets() {
        return webMobia.getStrQAssets();
    }

    public String getStrTopSellers() {
        return webMobia.getStrTopSellers();
    }

    public String getStrTopRated() {
        return webMobia.getStrTopRated();
    }


    public void doAppOrders(String tmpBuyStrA, String tmpSellStrA, String tmpTypeStrA) {
        webMobia.sendMsg("JSI doAppOrders: ");
        webMobia.getAppOrders(tmpBuyStrA, tmpSellStrA, tmpTypeStrA);
    }

    public String getTestMOrder(String tmpType, String tmpSymStr, String tmpQty, String qtval) {
        String bstr = "qq:";
        String json = "qq:";
        webMobia.setAEAThreadKill(true);
        String sqt;
        String symb;
        DecimalFormat df = new DecimalFormat("#.######");
        double qt = Double.parseDouble(tmpQty);
        double qtvalt = Double.parseDouble(qtval);
        double ttlval = qt * qtvalt;
        String str1 = df.format(ttlval);
        ttlval = Double.parseDouble(str1);


        if (tmpSymStr.endsWith("USDT")) {
            sqt = "USDT";
            symb = tmpSymStr.substring(0, tmpSymStr.length() - 4);
        } else {
            sqt = tmpSymStr.substring(tmpSymStr.length() - 3, tmpSymStr.length());
            symb = tmpSymStr.substring(0, tmpSymStr.length() - 3);
        }


        if (tmpType.equals("sell")) {
            String oiaq = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free - " + qt + " where ca_symbol = '" + symb + "'";
            System.out.println("sell: " + oiaq);
            webMobia.sendMsg(oiaq);
            webMobia.dbMSQLA.setDBselectQ(oiaq);

            String oiaqa = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free + " + ttlval + " where ca_symbol = '" + sqt + "'";
            System.out.println("sell m: " + oiaqa);
            webMobia.sendMsg(oiaqa);
            webMobia.dbMSQLA.setDBselectQ(oiaqa);
        } else {
            String oiaq = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free + " + qt + " where ca_symbol = '" + symb + "'";
            System.out.println("buy : " + oiaq);
            webMobia.sendMsg(oiaq);
            webMobia.dbMSQLA.setDBselectQ(oiaq);

            String oiaqa = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free - " + ttlval + " where ca_symbol = '" + sqt + "'";
            System.out.println("buy m: " + oiaqa);
            webMobia.sendMsg(oiaqa);
            webMobia.dbMSQLA.setDBselectQ(oiaqa);

        }
/*
String wrt = webMobia.doOrderTest(tmpType, tmpSymStr, tmpQty); 
webMobia.sendMsg("Doing order test: " + wrt);
*/
        webMobia.setAEAThreadKill(false);
        return json;
    }


    public void addToQrySpoolArr(String atmpQstr, String atmpCBstr) {
        webMobia.doToQrySpoolArr(atmpQstr, atmpCBstr);
	  /*
	  if(webMobia.doGetRunLoop().equals("false")){
	  if(webMobia.doConfirmMsg("Flush Query Spool?")) {
		flushPSpool();
	   }
	  }
	  */
    }


    public void setCurrQSymStr(String atmpQstr) {
        webMobia.setCurrQSymStr(atmpQstr);
    }


    public void doRSSParser(String tUrlSTr) {
        try {
            webMobia.setRSSParser(tUrlSTr);
        } catch (Exception e) {
            System.out.println("doRSSParser.: " + e);
        }

    }

    public String getRSSStr() {
        String retRssStr = "noQvalue";
        try {

            String aretRssStr = webMobia.doRssString();
            return aretRssStr;
        } catch (Exception e) {
            System.out.println("getRSSStr.: " + e);
            return retRssStr;
        }

    }

    public String doOldRSSParser(String tUrlSTr) {

        String json = "noQvalue";


        try {
            RssParser rss = new RssParser();
            rss.enableCache("cbox/rsscache", 1800000); // 30 minute cache

            RssFeed feed = rss.load(tUrlSTr);
            // Gets the channel information of the feed and
            // display its title
            RssChannelBean channel = feed.getChannel();
            System.out.println("Feed Title: " + channel.getTitle());

            // Gets the image of the feed and display the image URL
            RssImageBean image = feed.getImage();
            System.out.println("Feed Image: " + image.getUrl());

            // Gets and iterate the items of the feed
            List<RssItemBean> items = feed.getItems();

	/*
    for (int i=0; i<items.size(); i++){
             RssItemBean item = items.get(i); 
             System.out.println("Title: " + item.getTitle());
             System.out.println("Link : " + item.getLink());
             System.out.println("Desc.: " + item.getDescription());				
	}
	*/

            json = new Gson().toJson(items);


        } catch (Exception e) {
            System.out.println("doRSSParser.: " + e);
            return e.toString();
        }


        return json;
    }


    public String doByteArrayFromImageURL(String theTurl) {
        String sa2 = "nada";
        try {


            sa2 = webMobia.getByteArrayFromImageURL(theTurl);
            return sa2;
        } catch (Exception e) {
            return "Error.doByteArrayFromImageURL: " + e.toString();
        }
    }


    public String getUrlRespString(String theTurl) {
        String sa2 = "nada";
        try {


            sa2 = webMobia.doUrlRespString(theTurl);
            return sa2;
        } catch (Exception e) {
            return "getUrlRespString No go: " + e.toString();
        }
    }


    public String getUContentString(String theTurl, String tDUOstr) {
        String sa2 = "nada";
        try {


            sa2 = webMobia.doUContentString(theTurl, tDUOstr);
            return sa2;
        } catch (Exception e) {
            return "No go: " + e.toString();
        }
    }

    public String getJSretstring(String tstr) {
        return webMobia.doJSretstring(tstr);
    }

    public void flushPSpool() {
        webMobia.setPSpoolDone();
    }

    public void getSymbolStream(String tSS) {
        webMobia.doSymbolStream(tSS);
    }

    public void closeSymbolStream() {
        webMobia.doCSymbolStream();
    }


    public void setRunLoop(String tRLstr) {
        webMobia.doRunLoop(tRLstr);
    }


    public void setCurrStreamSymb() {
    }

    public void saveNote(String theContent, String theFname) {
        try {
            bUtils.saveTextString(theContent, "html/usernotes/" + theFname + ".txt");
            webMobia.navigate("javascript:alert('saved')");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}