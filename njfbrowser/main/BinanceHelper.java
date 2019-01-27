package njfbrowser.main;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;
import com.binance.api.client.BinanceApiWebSocketClient;
import com.binance.api.client.SyncedTime;
import com.binance.api.client.domain.TimeInForce;
import com.binance.api.client.domain.account.Account;
import com.binance.api.client.domain.account.AssetBalance;
import com.binance.api.client.domain.account.NewOrder;
import com.binance.api.client.domain.account.NewOrderResponse;
import com.binance.api.client.domain.general.ExchangeInfo;
import com.binance.api.client.domain.general.SymbolInfo;
import com.binance.api.client.domain.market.TickerPrice;
import com.binance.api.client.domain.market.TickerStatistics;
import com.binance.api.client.exception.BinanceApiException;
import com.google.gson.Gson;
import njfbrowser.tasks.taskProcessBReqs;
import njfbrowser.tasks.taskProcessOrders;
import njfbrowser.tasks.taskProcessQSpool;
import njfbrowser.tasks.taskProcessSStream;
import njfbrowser.utils.BasicUtils;
import njfbrowser.utils.StringUtils;
import njfbrowser.utils.UtilSQLAdapter;
import org.json.JSONArray;
import org.json.JSONObject;

import java.text.DecimalFormat;
import java.util.List;

import static com.binance.api.client.domain.account.NewOrder.*;


public class BinanceHelper implements Runnable {
    public boolean threadKilled;
    Thread dm;
    CoinBin parent;
    String strCStrAssets;
    String strCStrQAssets;
    String strCStrTopSellers;
    String strCStrTopRated;
    String[] strTmpQarr;
    UtilSQLAdapter upsqad;
    String currTPriceStr;
    int currUPBint;
    int timestampTPS;
    String currBuyStr;
    String currSellStr;
    String currOTStr;
    String currQSpoolStr;
    String currQSymbolStr;
    JSONArray currQSpoolArr;
    JSONArray currQPricesArr;
    long currQSpoolTstamp;
    int currQPricesInt;
    String currQPricesStr;
    int currQSpoolInt;
    String currLastDadded;
    String currNewSymStr;
    List<TickerPrice> currPrices;
    BasicUtils bUtils;
    JSONObject objJSretstrs;
    BinanceApiWebSocketClient wsMDclient;

    StringUtils stringUtils;
    taskProcessSStream taskPSS;

    boolean boolRfreshAssets;
    String currRunLoop;
    String currAPIKEY = "noQvalue";
    String currAPISECRET = "noQvalue";


    public BinanceHelper(CoinBin pCoinBin) {
        parent = pCoinBin;

        strCStrAssets = "noQvalue";
        strCStrQAssets = "noQvalue";
        strCStrTopSellers = "noQvalue";
        strCStrTopRated = "noQvalue";
        currQPricesStr = "noQvalue";
        currLastDadded = "123";
        currQSpoolStr = "";
        currNewSymStr = "";
        currQSpoolArr = new JSONArray();
        currQPricesArr = new JSONArray();
        currQPricesInt = 0;
        currQSpoolInt = 0;
        currQSpoolTstamp = System.currentTimeMillis() / 1000L;

        upsqad = new UtilSQLAdapter();
        threadKilled = false;
        timestampTPS = getTstamp();
        currTPriceStr = "";
        currUPBint = 0;
        currBuyStr = "noQvalue";
        currSellStr = "noQvalue";
        currOTStr = "dev";
        currQSymbolStr = "ETH";
        stringUtils = new StringUtils();
        objJSretstrs = new JSONObject();
        boolRfreshAssets = false;
	  currRunLoop = "true";
        currAPIKEY = parent.getConfValString("prfsBinanceKey");
        currAPISECRET = parent.getConfValString("prfsBinanceScrt");
        // currAPIKEY = "pd1OHZlpsMDVc2mV3Kss29AkBjqatkumxliAgWQ1mfJnlUDG1aAUkjTWvhGEO5TP";
        // currAPISECRET = "7K2ch9hKRDlI0U8SkbzzsHscg1tQbqYjLFsFoG7OKbk06Sxei345wSLWiIOfjeZ6";

/*

    System.out.println(account.getAssetBalance("ETH"));

    // Get list of trades
    List<Trade> myTrades = client.getMyTrades("NEOETH");
    System.out.println(myTrades);

    // Get withdraw history
    System.out.println(client.getWithdrawHistory("ETH"));

    // Get deposit history
    System.out.println(client.getDepositHistory("ETH"));

    // Get deposit address
    System.out.println(client.getDepositAddress("ETH"));

    // Withdraw
    // client.withdraw("ETH", "0x123", "0.1", null);
*/
        bUtils = new BasicUtils();
        // refreshRunStrings(currQSymbolStr);
        // setRunStrings();
        String oiaqZa = "select DISTINCT cryptprice.cp_bsymbol, cryptcoin.cc_name, cryptcoin.cc_rank from cryptprice, cryptcoin where cryptcoin.cc_bsymbol  = cryptprice.cp_bsymbol";
        addToQrySpoolArr(oiaqZa, "rloadStrACTB");


    }

    public static String getTimeStamp() {
        long l = System.currentTimeMillis() / 1000L;
        String s = Long.toString(l);
        int i = Integer.parseInt(s);
        String s1 = Integer.toString(i);
        return s1;
    }


    public void setRunLoop(String tLstr) {
	currRunLoop = tLstr;
    }

     public String getRunLoop() {
	return currRunLoop;
    }

    public String getAccountBalances() {
        String bstr = "qq:";
        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance(currAPIKEY, currAPISECRET);
        BinanceApiRestClient client = factory.newRestClient();
	  System.out.println("getaAccountBalances: " + currAPIKEY);
	  System.out.println("getaAccountBalances: " + currAPISECRET);
        // Get account balances
        Account account = client.getAccount(6000000L, SyncedTime.getInstance(-1).currentTimeMillis());
        // System.out.println(account.getBalances());
        List<AssetBalance> bbalances = account.getBalances();
        for (AssetBalance list : bbalances) {
	  // System.out.println("list item: " + list.getAsset());
        }
        String json = new Gson().toJson(bbalances);
        return json;
    }



    public String getExchangeInfo() {
        String bstr = "qq:";
        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance();
        BinanceApiRestClient client = factory.newRestClient();
        // Get account balances

        ExchangeInfo exchangeInfo = client.getExchangeInfo();
        // System.out.println(account.getBalances());
        List<SymbolInfo> bsymbls = exchangeInfo.getSymbols();
        for (SymbolInfo list : bsymbls) {

            System.out.println("symbol item: " + list.getSymbol());


        }


        String json = new Gson().toJson(exchangeInfo);

        return json;
    }

    public void doTickerPrice() {
        currQPricesArr = null;
        currQPricesArr = new JSONArray();
        try {
            taskProcessBReqs taskPBQR = new taskProcessBReqs(this, "noBigie");
            taskPBQR.execute();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public String getTickerStatistics(String tmpStrQstr) {
        String bstr = "qq:";
        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance();
        BinanceApiRestClient client = factory.newRestClient();
        // Get account balances


        TickerStatistics tickerStatistics = client.get24HrPriceStatistics(tmpStrQstr);


        String json = new Gson().toJson(tickerStatistics);

        return json;
    }

    public String getNuOrderTest(JSONObject thePOrow) {


        String json = "qq:";
        String tmpSymStr = "qq:";


        // Placing a test MARKET order
        try {

            double dblctQty = Double.parseDouble(String.valueOf(thePOrow.getDouble("ct_qty")));
            double dblctPrice = Double.parseDouble(String.valueOf(thePOrow.getDouble("ct_price")));
            double dblctPriceLimit = Double.parseDouble(String.valueOf(thePOrow.getDouble("ct_price_limit")));
            double dblctPriceStopLimit = Double.parseDouble(String.valueOf(thePOrow.getDouble("ct_price_stoplimit")));


            DecimalFormat df = new DecimalFormat("#.########");
            String ctQty = df.format(dblctQty);
            String ctPrice = df.format(dblctPrice);
            String ctPriceLimit = df.format(dblctPriceLimit);
            String ctPriceStopLimit = df.format(dblctPriceStopLimit);


            double ctRrlVal = dblctQty * dblctPrice;
            String ttlval = df.format(ctRrlVal);
            String ctSymbol = thePOrow.getString("ct_symbol");
            String ctQtSymbol = thePOrow.getString("ct_qtsymbol");

            String ctType = thePOrow.getString("ct_type");
            String ctSide = thePOrow.getString("ct_side");
            String ctMode = thePOrow.getString("ct_mode");
            tmpSymStr = ctSymbol + ctQtSymbol;


            System.out.println(ctSide + " :: " + ctType + " :: " + tmpSymStr + " :: " + ctSymbol + " :: " + ctQtSymbol + " :: " + ctQty + " :: " + ctPrice + " :: " + ctPriceLimit + " :: " + ctPriceStopLimit);


            if (ctSide.equals("SELL")) {

                if (ctType.equals("MARKET")) {
                    String oiaq = "update cryptasset set ca_price = " + ctPrice + ", ca_free = ca_free - " + ctQty + " where ca_symbol = '" + ctSymbol + "'";
                    addToQrySpoolArr(oiaq, "fnshOrderCB");

                    String oiaqa = "update cryptasset set ca_price = " + ctPrice + ", ca_free = ca_free + " + ttlval + " where ca_symbol = '" + ctQtSymbol + "'";
                    addToQrySpoolArr(oiaqa, "fnshOrderCB");

                    if (ctMode.equals("test")) {
                        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance(currAPIKEY, currAPISECRET);
                        BinanceApiRestClient client = factory.newRestClient();
                        client.newOrderTest(marketSell(tmpSymStr, ctQty));
                    }
                } else {
                    String qStr = "insert into crypttrade (ct_rtype,ct_trade,ct_symbol,ct_qty,ct_price,ct_price_limit,ct_price_stoplimit,ct_qtsymbol,ct_side,ct_type,ct_status,ct_transactTime,ct_dadded)";
                    qStr += " values(5,'" + "5" + "','" + ctSymbol + "','" + ctQty + "','" + ctPrice + "','" + ctPriceLimit + "','" + ctPriceStopLimit + "','" + ctQtSymbol + "','" + ctSide + "','" + ctType + "','" + "NEW" + "','" + CoinBin.getTimeStamp() + "','" + CoinBin.getTimeStamp() + "')";
                    addToQrySpoolArr(qStr, "updatetrade");


                    String oiaqw = "update cryptasset set ca_locked = ca_locked + " + ttlval + " where ca_symbol = '" + ctSymbol + "'";
                    addToQrySpoolArr(oiaqw, "fnshOrderCB");


                    if (ctMode.equals("test")) {
                        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance(currAPIKEY, currAPISECRET);
                        BinanceApiRestClient client = factory.newRestClient();
                        client.newOrderTest(limitSell(tmpSymStr, TimeInForce.GTC, ctQty, ctPriceLimit));
                    }
                }

            } else {

                if (ctType.equals("MARKET")) {

                    String oiaq = "update cryptasset set ca_price = " + ctPrice + ", ca_free = ca_free + " + ctQty + " where ca_symbol = '" + ctSymbol + "'";
                    addToQrySpoolArr(oiaq, "fnshOrderCB");
                    String oiaqa = "update cryptasset set ca_price = " + ctPrice + ", ca_free = ca_free - " + ttlval + " where ca_symbol = '" + ctQtSymbol + "'";
                    addToQrySpoolArr(oiaqa, "fnshOrderCB");
                    if (ctMode.equals("test")) {
                        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance(currAPIKEY, currAPISECRET);
                        BinanceApiRestClient client = factory.newRestClient();
                        client.newOrderTest(marketBuy(tmpSymStr, ctQty));
                    }
                } else {

                    String qStr = "insert into crypttrade (ct_rtype,ct_trade,ct_symbol,ct_qty,ct_price,ct_price_limit,ct_price_stoplimit,ct_qtsymbol,ct_side,ct_type,ct_status,ct_transactTime,ct_dadded)";
                    qStr += " values(5,'" + "5" + "','" + ctSymbol + "','" + ctQty + "','" + ctPrice + "','" + ctPriceLimit + "','" + ctPriceStopLimit + "','" + ctQtSymbol + "','" + ctSide + "','" + ctType + "','" + "NEW" + "','" + CoinBin.getTimeStamp() + "','" + CoinBin.getTimeStamp() + "')";
                    addToQrySpoolArr(qStr, "updatetrade");


                    String oiaqw = "update cryptasset set ca_locked = ca_locked + " + ttlval + " where ca_symbol = '" + ctQtSymbol + "'";
                    addToQrySpoolArr(oiaqw, "fnshOrderCB");

                    if (ctMode.equals("test")) {
                        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance(currAPIKEY, currAPISECRET);
                        BinanceApiRestClient client = factory.newRestClient();
                        client.newOrderTest(limitBuy(tmpSymStr, TimeInForce.GTC, ctQty, ctPriceLimit));
                    }
                }
            }
//  doPSpoolDone();
        } catch (Exception e) {
            json = e.toString();
            return json;
        }

        return json;
    }

    public String getOrderTest(String tmpType, String tmpSymStr, String tmpQty) {
        String bstr = "qq:";
        String json = "qq:";
        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance(currAPIKEY, currAPISECRET);
        BinanceApiRestClient client = factory.newRestClient();
        String sqt;
        String symb;
        // Placing a test MARKET order
        try {
            if (tmpType.equals("sell")) {


                client.newOrderTest(marketSell(tmpSymStr, tmpQty));


            } else {


                client.newOrderTest(marketBuy(tmpSymStr, tmpQty));
            }

        } catch (Exception e) {
            json = e.toString();
            return json;
        }

        return json;
    }

    public void doAppOrders() {
        threadKilled = true;
        taskProcessOrders taskPO = new taskProcessOrders(this, currBuyStr, currSellStr, currOTStr);
        taskPO.execute();
    }

    public void setAppOrders(String bStr, String sStr, String tStr) {
        currBuyStr = bStr;
        currSellStr = sStr;
        currOTStr = tStr;
        doAppOrders();
    }

    public String getMarketOrder(String tmpType, String tmpSymStr, String tmpQty) {
        String json = "qq:";
        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("FHi468SSkWOX4ojb3cYkLS5XYMOde6rgvPXEVXH3I83yP5QmPmhDOYqStyIaFvAZ", "j4dN6FRh9addxwzzlIJQN4erYBfXvA2eSqQNtNXNSU6nt9ZS3r589qM6Yd1myoSp");
        BinanceApiRestClient client = factory.newRestClient();

        if (tmpType.equals("sell")) {

            try {
                NewOrderResponse newOrderResponse = client.newOrder(NewOrder.marketSell(tmpSymStr, tmpQty));
                json = new Gson().toJson(newOrderResponse);

            } catch (BinanceApiException e) {
                System.out.println(e.getError().getMsg());
            }


        } else {


            try {
                NewOrderResponse newOrderResponse = client.newOrder(NewOrder.marketBuy(tmpSymStr, tmpQty));
                json = new Gson().toJson(newOrderResponse);
            } catch (BinanceApiException e) {
                System.out.println(e.getError().getMsg());
            }


        }


        return json;
    }

    public void run() {
        do {
            try {
                do {
                    Thread.sleep(30000);
                    System.out.println("AEPE THREAD RUNNING!!!");
                    // doTickerPrice();
                } while (true);
            } catch (InterruptedException interruptedexception) {
                //  setHstatus(interruptedexception.toString(), true);
            }
            // login_bt.setEnabled(true);
        } while (true);
    }


    public String rloadStrACTB(String tstr, String done) {

        try {
            String strT = "";
            String strUCPID = "";
            String strUCPTtl = "";

            String strCatID = "tip:ep:Suggestions|";
            String strCatName = "Suggestionsss are gathered from existing page arrays.|";
            JSONArray array = new JSONArray(tstr);
            StringBuilder bldStrUCPID = new StringBuilder();
            StringBuilder bldStrUCPTtl = new StringBuilder();
            for (int i = 0; i < array.length(); i++) {
                JSONObject row = array.getJSONObject(i);

                // strUCPID += "uccpop:ep:" + row.getString("cp_bsymbol") + "|";
               //  strUCPTtl += row.getString("cp_bsymbol") + " - " + row.getString("cc_name") + "|";
                bldStrUCPID.append("uccpop:ep:" + row.getString("cp_bsymbol") + "|");
                bldStrUCPTtl.append(row.getString("cp_bsymbol") + " - " + row.getString("cc_name") + "|");

            }
            String strFstr = strCatID + ":ea:" + bldStrUCPID.toString() + "::" + strCatName + ":ea:" + bldStrUCPTtl.toString();

            bUtils.saveTextString(tstr, "html/tmp/bnACTB.txt");
        } catch (Exception e) {
            e.printStackTrace();
        }
        // strCStrTopRated = tstr;
        return done;
    }

    public String getStrAssets() {
        return strCStrAssets;
    }

    public String getStrQAssets() {
        return strCStrQAssets;
    }

    public void setStrQAssets(String tstr) {
        strCStrQAssets = tstr;
    }

    public String getStrTopSellers() {
        return strCStrTopSellers;
    }

    public void setStrTopSellers(String tstr) {
        strCStrTopSellers = tstr;
    }

    public String getStrTopRated() {
        return strCStrTopRated;
    }

    public void doTickerPricesDone() {
        sendMsg("doTickerPricesDone from aePe");

    }

    public void doPBReqsDone(JSONArray atmpQPricesArr) {
        currQPricesArr = atmpQPricesArr;

        taskProcessQSpool taskPQS = new taskProcessQSpool(this, "nada");
        taskPQS.execute();
    }



    public void doPODone() {
        System.out.println("doPODone doPODone doPODone");
    }

    public boolean getConfirmMsg(String strMsg) {
        boolean boolARCM = parent.doConfirmMsg(strMsg);
        return boolARCM;
    }


	// this thread should be declared for use

    public void doPSpoolDone() {

        long tmpQSpoolTstamp = System.currentTimeMillis() / 1000L;
        if ((tmpQSpoolTstamp - currQSpoolTstamp) > 4)  {
            currQSpoolTstamp = System.currentTimeMillis() / 1000L;
            taskProcessQSpool taskPQS = new taskProcessQSpool(this, "nada");
            taskPQS.execute();
        } else {
            new Thread() {
                @Override
                public void run() {
                    try {
                        sleep(1500);
                        doPSpoolDone();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }


                    // your code here

                }
            }.start();
        }

    }



    public void processSpoolItm(JSONObject tmpObj) {
        try {
            String tmpCBCstr = tmpObj.getString("cb");
            if (tmpCBCstr.equals("rloadStrAssets")) {
                String trapol = rloadStrAssets(tmpObj.getString("rs"), "processSpoolItm rloadStrAssets returning");
                parent.navigate("doReloadAssets('" + trapol + "')");
            }
            if (tmpCBCstr.equals("setAJSPrices")) {
                String tsStr = tmpObj.getString("rs");
                JSONArray array = new JSONArray(tsStr);
                for (int i = 0; i < array.length(); i++) {
                    JSONObject row = array.getJSONObject(i);

                    currLastDadded = row.getString("cp_dadded");
                    System.out.println("-- processSpoolItm setAJSPrices: cp_dadded: " + row.getString("cp_dadded"));

                    currQPricesStr = currQPricesStr + row.getString("cp_price") + ":" + row.getString("cp_bsymbol") + "|";
                }
                String tmpStr = currQPricesStr;
                parent.setNuJSPrices(tmpStr);
                System.out.println("-- processSpoolItm setAJSPrices: " + currLastDadded);
                currQPricesStr = "";

            }
 
            if (tmpCBCstr.equals("fnshGetAssetsCB")) {
                String trapol = rloadStrAssets(tmpObj.getString("rs"), "processSpoolItm rloadStrAssets returning");
                parent.navigate("doReloadAssets('" + trapol + "')");
            }
            if (tmpCBCstr.equals("fnshOrderCB")) {
                System.out.println("-- fnshOrderCB: " + tmpObj.getString("rs"));

            }
            if (tmpCBCstr.equals("setStrQAssets")) {
                setStrQAssets(tmpObj.getString("rs"));
            }
            if (tmpCBCstr.equals("doPriceUpdate")) {
                if(tmpObj.getString("rs").equals("0")) {
                    currNewSymStr = currNewSymStr + tmpObj.getString("cbs") + ",";
                }
            }
            if (tmpCBCstr.equals("rloadStrACTB")) {
                rloadStrACTB(tmpObj.getString("rs"), "USDT");
            }
            if (tmpCBCstr.startsWith("doAJSPrice")) {
                parent.setAJSPrice(tmpCBCstr);
            }
            if (tmpCBCstr.startsWith("dynJS")) {
                String ttstr = getTimeStamp();
                objJSretstrs.put(ttstr, tmpObj.getString("rs"));
                parent.navigate(tmpCBCstr + "('" + ttstr + "')");
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void doTickerGUI() {
        try {
            System.out.println("doTickerGUI.currQSymbolStr: " + currQSymbolStr);
            String oiaqB = "noQvalue";
            if (currQSymbolStr.equals("noQvalue")) {
            } else if (currQSymbolStr.equals("FAVS")) {
                oiaqB = "select  * from cryptcoin, cryptprice where cryptcoin.cc_props = '10' and  cryptprice.cp_bsymbol = cryptcoin.cc_bsymbol and cryptprice.cp_dadded > '" + currLastDadded + "' order by cp_dadded desc limit 50";

            } else if (currQSymbolStr.equals("TRADES")) {
                oiaqB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol and crypttrade.ct_status = 'NEW' and cryptprice.cp_dadded > '" + currLastDadded + "'  group by crypttrade.ct_dadded order by cryptprice.cp_dadded desc limit 50;";

            } else if (currQSymbolStr.equals("ASSETS")) {
                oiaqB = "select * from cryptasset, cryptcoin, cryptprice where cryptprice.cp_symbol  = cryptasset.ca_symbol and  cryptcoin.cc_symbol  = cryptasset.ca_symbol and cryptprice.cp_dadded > '" + currLastDadded + "' group by cryptasset.ca_symbol order by cryptasset.ca_free desc limit 50;";
            } else if (currQSymbolStr.equals("ALERTS")) {
                oiaqB = "select * from cryptprice, cryptcoin where (cryptprice.cp_confirm_trans = '10' or cryptprice.cp_confirm_trans = '5') and  cryptprice.cp_bsymbol = cryptcoin.cc_bsymbol  order by cryptprice.cp_price_pct_chg desc limit 50;";

            } else if (currQSymbolStr.equals("ORDERS")) {
                oiaqB = "select * from crypttrade, cryptcoin, cryptprice where cryptprice.cp_symbol  = crypttrade.ct_symbol and  cryptcoin.cc_symbol  = crypttrade.ct_symbol and cryptprice.cp_bsymbol  = crypttrade.ct_symbol || crypttrade.ct_qtsymbol and  cryptcoin.cc_quote_asset  = crypttrade.ct_qtsymbol order by crypttrade.ct_dadded desc limit 15;";


            } else {
                oiaqB = "select * from cryptprice, cryptcoin where cryptprice.cp_bsymbol like '%" + currQSymbolStr + "' and  cryptcoin.cc_bsymbol  = cryptprice.cp_bsymbol and cryptprice.cp_dadded > '" + currLastDadded + "' order by cryptprice.cp_dadded";

            }
            if (oiaqB == "noQvalue") {
            } else {
                addToQrySpoolArr(oiaqB, "setAJSPrices");
            }

        } catch (Exception e) {
            System.out.println("doTickerGUI: " + e.toString());
        }
    }

    public JSONArray getQrySpoolArr() {
        JSONArray retArr = new JSONArray();

	  if(currRunLoop.equals("true")) {
        try {

            System.out.println("getQrySpoolArr starting with currQPricesArr.length(): " + currQPricesArr.length() + " currQPricesInt:: " + currQPricesInt);

            if (currQPricesInt < currQPricesArr.length()) {

                JSONArray nnaa = new JSONArray(currQPricesArr.getJSONObject(currQPricesInt).getString("qttl"));
                if (nnaa.length() > 0) {

                    for (int its = 0; its < nnaa.length(); its++) {
                        JSONObject row = nnaa.getJSONObject(its);
                        retArr.put(row);
                        // currQPricesStr = currQPricesStr + row.getString("cb");
                        // currQPricesStr = "noQvalue";
                    }
                    doTickerGUI();
                    parent.doSceneDone(currQPricesInt);
                }
                currQPricesInt++;
            } else {
                System.out.println("getQrySpoolArr all done currQPricesArr.length(): " + currQPricesArr.length() + " currQPricesInt:: " + currQPricesInt);
                currQPricesInt = 0;
                currQPricesArr = null;



                if (currNewSymStr.contains(",")) {
                    parent.navigate("getBNBXInfo('" + currNewSymStr.substring(0, currNewSymStr.length() - 1) + "')");
                }
                doTickerPrice();
                currNewSymStr = "";
            }


        } catch (Exception e) {
            System.out.println("getQrySpoolArr: " + e.toString());

        }

	  } else { // RUNlOOP IS NOT TRUE
	  sendMsg("completing " + currQSpoolInt + " of: " + currQSpoolArr.length() + "...");
        // System.out.println("getQrySpoolArr currQSpoolArr: " + currQSpoolArr.toString());
	  }
        JSONArray tmpSpoolArr = currQSpoolArr;
        System.out.println("getQrySpoolArr currQSpoolArr: " + currQSpoolArr.toString());
        int ileft = 20;
        if (currQSpoolInt < tmpSpoolArr.length()) {
            ileft = tmpSpoolArr.length() - currQSpoolInt;
            int imax = 20;
            if (ileft < imax) {
                imax = ileft;
            }
            int iits = 0;

            while (iits < imax) {
                JSONObject fretObject = tmpSpoolArr.getJSONObject(currQSpoolInt);
                retArr.put(fretObject);
                currQSpoolInt++;
                iits++;
            }

            if (ileft < 20) {
                currQSpoolInt = 0;
                currQSpoolArr = null;
                currQSpoolArr = new JSONArray();
	  	    if(currRunLoop.equals("false")) {
		    sendMsg("completed all queries in spool...");
		    }
            }

        }
        return retArr;
    }

    public void addToQrySpoolArr(String tmpQstr, String tmpCBstr) {
        JSONObject fretObject = new JSONObject();
        fretObject.put("q", tmpQstr);
        fretObject.put("cb", tmpCBstr);
        currQSpoolArr.put(fretObject);
        System.out.println("BH: " + tmpQstr);
    }



    public void sendMsg(String mStr) {
        parent.sendMsg(mStr);
    }

    public int getTstamp() {
        long l = System.currentTimeMillis() / 1000L;
        String s = Long.toString(l);
        int i = Integer.parseInt(s);
        return i;
    }



    public void doJSPrices(String tmpJSstr) {
        System.out.println("AEPE.doJSPrices: " + tmpJSstr);
        parent.setNuJSPrices(tmpJSstr);
    }



    public void setCurrQSymStr(String tmpJSstr) {
        currQSymbolStr = tmpJSstr;
    }

    public String getJSretstring(String tmpJSstr) {
        String ntstr = "nada";
        try {
            ntstr = objJSretstrs.getString(tmpJSstr);

// objJSretstrs.getString(tmpJSstr) = null;
            return ntstr;
        } catch (Exception e) {

            return ntstr;
        }

    }

    public void closeSymbolStream() {
        try {
            taskPSS.kill();
            System.out.println("closeSymbolStream.");

        } catch (Exception e) {
            System.out.println("closeSymbolStream.error: " + e);
        }
    }

    public void sendSymbolStream(String theTsStr) {

        String clnStr = stringUtils.replaceString(theTsStr, "\"", "#");
        System.out.println("sendSymbolStream.theTsStr: " + clnStr);
        parent.navigate("parsePopSocket('" + clnStr + "')");

    }

    public void getSymbolStream(String theTsymbol) {
        try {
            taskPSS = new taskProcessSStream(this, theTsymbol);
            taskPSS.execute();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public String rloadStrAssets(String tstr, String done) {
        strCStrAssets = tstr;
        bUtils.saveTextString(tstr, "html/tmp/bnassets.txt");
        return "done with rloadStrAssets in AEPE";
    }





    /* to delete stuff!


    public void setLastTPQ(int tmpI) {
        currUPBint = tmpI;
    }
    public void setTstampTS() {
        timestampTPS = getTstamp();
    }
    public String getCurrQSymStr() {
        return currQSymbolStr;
    }

    public void dodm(boolean flag) {


        if (flag) {

            dm = new Thread(this);
            dm.start();

        } else {

            if (dm != null)
                dm.stop();
            dm = null;
        }
    }



    public String rloadStrQAssets(String tstr, String done) {
        bUtils.saveTextString(tstr, "html/tmp/bnqassets" + done + ".txt");
        strCStrQAssets = tstr;
        return done;
    }

    public String rloadStrTopSellers(String tstr, String done) {
        bUtils.saveTextString(tstr, "html/tmp/bnMList" + done + ".txt");
        strCStrTopSellers = tstr;
        return done;
    }

    public String rloadStrTopRated(String tstr, String done) {
        bUtils.saveTextString(tstr, "html/tmp/bntoprated" + done + ".txt");
        strCStrTopRated = tstr;
        return done;
    }








    public void doStatsDone() {
        // parent.doBDone();
        // doAppOrders();
    }


    public String refreshRunStrings(String theQA) {
        // sendMsg("refreshRunStrings from AEPA");
        String strResp = "not done";
        try {

            String oiaqB = "select * from cryptprice, cryptcoin where cryptprice.cp_bsymbol like '%" + theQA + "' and cryptprice.cp_price_pct_chg > .02 and  cryptcoin.cc_bsymbol  = cryptprice.cp_bsymbol order by cryptprice.cp_price_pct_chg desc limit 35";

            String rTS = rloadStrTopSellers(upsqad.setDBselectQ(oiaqB), theQA);

            String oiaqA = "select * from cryptprice where cp_bsymbol like '%USDT' order by _id desc limit 10";
            String rTSA = rloadStrQAssets(upsqad.setDBselectQ(oiaqA), theQA);


            String oiaqZ = "select * from cryptprice, cryptcoin where cryptprice.cp_bsymbol like '%" + theQA + "' and  cryptcoin.cc_bsymbol  = cryptprice.cp_bsymbol order by cryptprice.cp_count desc limit 10";
            strResp = rloadStrTopRated(upsqad.setDBselectQ(oiaqZ), theQA);


            // String oiaq = "select * from cryptasset, cryptcoin, cryptprice where cryptprice.cp_symbol  = cryptasset.ca_symbol  and  cryptcoin.cc_symbol  = cryptasset.ca_symbol group by cryptasset.ca_symbol order by cryptprice.cp_dadded asc limit 35";
            String oiaq = "select * from cryptasset, cryptprice where cryptprice.cp_symbol  = cryptasset.ca_symbol and  cryptprice.cp_bsymbol = cryptasset.ca_symbol || '" + theQA + "' or (cryptprice.cp_bsymbol like '%USDT' and cryptasset.ca_symbol = cryptprice.cp_symbol) group by cryptasset.ca_symbol  order by cryptasset.ca_free desc limit 50;";
            String rTQ = rloadStrAssets(upsqad.setDBselectQ(oiaq), theQA);


            String oiaqZa = "select DISTINCT cryptasset.ca_symbol, cryptcoin.cc_name, cryptcoin.cc_rank from cryptasset, cryptcoin where cryptcoin.cc_symbol  = cryptasset.ca_symbol";
            strResp = rloadStrACTB(upsqad.setDBselectQ(oiaqZa), theQA);

        } catch (Exception ie) {
            return ie.toString();
        }
        return strResp;
    }


    public void doPSpoolError() {

    }


     */

}