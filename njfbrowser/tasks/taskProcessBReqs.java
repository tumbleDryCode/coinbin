package njfbrowser.tasks;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;
import com.binance.api.client.domain.market.TickerPrice;
import njfbrowser.main.BinanceHelper;
import njfbrowser.utils.UtilSQLAdapter;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.swing.*;
import java.util.List;


public class taskProcessBReqs extends
        SwingWorker<Void, Void> {
    boolean hasError;
    JSONArray tmpQPricesArr;
    BinanceHelper parent;
    String strngTaskTempQ;
    UtilSQLAdapter usqad;


    public taskProcessBReqs(BinanceHelper aepE, String qStr) {
        parent = aepE;
        strngTaskTempQ = qStr;
        usqad = new UtilSQLAdapter();
        hasError = false;
        tmpQPricesArr = new JSONArray();
    }


    public Void doInBackground() {


        try {

            String currTPriceStr = "";
            int ilttl = 0;
            int iblk = 0;
            int iblkn = 0;
            System.out.println("doTickerPrice from AEPA");

            BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance();
            BinanceApiRestClient client = factory.newRestClient();
            // Get account balances

            List<TickerPrice> allPrices = client.getAllPrices();
            // List<BookTicker> allBookTickers = client.getBookTickers();

            JSONArray tpArr = new JSONArray();

            String strJSPrices = "";

            String strDAPrices = BinanceHelper.getTimeStamp();


            for (TickerPrice list : allPrices) {
                String pstr = list.getPrice();
                String sstr = list.getSymbol();
                strJSPrices += pstr + "|" + sstr + ":";


                String ttTPriceStr = "update cryptprice set cp_prices = cp_prices || '|" + pstr + "', cp_price  = '" + pstr + "', cp_dadded = datetime('now')";


                ttTPriceStr += " where cp_bsymbol = '" + sstr + "';";


                JSONObject retObject = new JSONObject();
                retObject.put("q", ttTPriceStr);
                // retObject.put("cb" , "doAJSPrice('" + sstr + "','" + pstr + "');");
                retObject.put("cb", "doPriceUpdate");
                retObject.put("cbs", sstr);
                retObject.put("cbp", pstr);
                // retObject.put("cb" , sstr + "|" + pstr + ":");
                tpArr.put(retObject);

                if (iblk > 10) {

                    JSONObject detObject = new JSONObject();
                    detObject.put("qttl", tpArr.toString());
                    iblk = 0;
                    tmpQPricesArr.put(detObject);
                    tpArr = null;
                    tpArr = new JSONArray();

                }
                iblk++;
                ilttl++;

            } // for each price list

            System.out.println("doing doTickerPrice from taskPBRs with tempQPricesArr length: " + tmpQPricesArr.length());
            // parent.sendMsg("doing doTickerPrice from taskPBRs with tempQPricesArr total symbols: " + ilttl);


        } catch (Exception ex) {
            hasError = true;
            System.out.println("ERROR: taskProcessBReqs[doInBackground]: " + ex.toString());
            ex.printStackTrace();
        }
        return null;
    }


    protected void done() {
        try {
            System.out.println("DONE: taskProcessBReqs!!!!: ");
            if (!hasError) {

                parent.doPBReqsDone(tmpQPricesArr);
            }
            // dispose();
        } catch (Exception ex) {
            System.out.println("ERROR: taskProcessBReqs[done]: " + ex.toString());
        }
    }


}