package njfbrowser.tasks;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;


import njfbrowser.utils.UtilSQLAdapter;
import njfbrowser.utils.StringUtils; 
import njfbrowser.main.BinanceHelper; 
import javax.swing.*;
import java.text.DecimalFormat;
import java.math.BigDecimal;
import java.lang.*;
public class taskProcessOrders extends
        SwingWorker<Void, Void> {




    public taskProcessOrders(BinanceHelper aepE, String tbuyStr, String tsellStr, String totypeStr) {
    parent = aepE;
    strngBuyArr = tbuyStr;
    strngSellArr = tsellStr;
    strngOtype = totypeStr;
    usqad = new UtilSQLAdapter();
    }










  public void processOrder(JSONObject thepOPIPOrow) {


 String wrt = parent.getNuOrderTest(thepOPIPOrow); 
System.out.println("taskProcessOrders.processOrder: " +  wrt);


/*
	 if(ctSide.equals("sell")) {
	
	 String oiaq = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free - " + qt + " where ca_symbol = '" + symb + "'";
	// parent.sendMsg(oiaq);
 	// usqad.setDBselectQ(oiaq);
	parent.addToQrySpoolArr(oiaq,"fnshOrderCB");


	String oiaqa = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free + " + ttlval + " where ca_symbol = '" + sqt + "'";
	System.out.println("sell m: " + oiaqa);
	// parent.sendMsg(oiaqa);
 	// usqad.setDBselectQ(oiaqa);
 	parent.addToQrySpoolArr(oiaqa,"fnshOrderCB");
} else {
	String oiaq = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free + " + qt + " where ca_symbol = '" + symb + "'";
	System.out.println("buy: " + oiaq);
	// parent.sendMsg(oiaq);
 	// usqad.setDBselectQ(oiaq);
 	parent.addToQrySpoolArr(oiaq,"fnshOrderCB");

	String oiaqa = "update cryptasset set ca_price = " + qtvalt + ", ca_free = ca_free - " + ttlval + " where ca_symbol = '" + sqt + "'";
	System.out.println("buym: " + oiaqa);
	// parent.sendMsg(oiaqa);
 	// usqad.setDBselectQ(oiaqa);
 	parent.addToQrySpoolArr(oiaqa,"fnshOrderCB");
 
	
}


//   testMode, testModeAI, testModeConf, liveMode, liveModeAI, liveModeAIConf

 if(tmpOType.equals("test")) {
System.out.println("taskProcessOrders.testMode running: ");
String wrt = parent.getOrderTest(tmpType, tmpSymStr, String.valueOf(Math.round(qt))); 
System.out.println("taskProcessOrders.testMode: " +  wrt);
}

 if(tmpOType.equals("live")) {
System.out.println("taskProcessOrders.liveMode running: ");
String wrt = parent.getMarketOrder(tmpType, tmpSymStr, String.valueOf(Math.round(qt))); 
System.out.println("----||-----||-----taskProcessOrders.LIVE: " +  wrt);
}

String qStr = "insert into crypttrade (ct_rtype,ct_trade,ct_symbol,ct_qty,ct_price,ct_qtsymbol,ct_qtprice_usd,ct_dadded) values(5,'" + tmpType + "','" + symb + "','" + qt + "','" + str1r + "','" + sqt + "','" + tmpQSymPrice + "','" + parent.getTimeStamp() + "')";
	System.out.println("update crypttrades: " + qStr);
	// parent.sendMsg(oiaqa);
 	// usqad.setDBselectQ(qStr);
 	parent.addToQrySpoolArr(qStr,"updatetrade");
// }
 
*/


}




public void processOrders(String buyStr, String sellStr, String oRule) {
parent.sendMsg("doAppOrders.processOrders started: ");

if(buyStr.equals("noQvalue")) {

parent.sendMsg("processOrders no buy orders: " + " :: " + buyStr);
} else {
try {
JSONArray resultSet = new JSONArray(buyStr);
for (int i = 0; i < resultSet.length(); i++) {
JSONObject row = resultSet.getJSONObject(i);
parent.sendMsg("processOrders buy orders: " + row.getString("ct_symbol"));
processOrder(row);
}

} catch(Exception ee) {
parent.sendMsg("processOrders buy orders error: " + ee);
}
}


if(sellStr.equals("noQvalue")) {
parent.sendMsg("processOrders no sell orders: " + " :: " + sellStr);
} else {
try {
JSONArray resultSetS = new JSONArray(sellStr);
for (int iqq = 0; iqq < resultSetS.length(); iqq++) {
JSONObject rowqq = resultSetS.getJSONObject(iqq);
parent.sendMsg("processOrders sell orders: " + rowqq.getString("ct_symbol"));
processOrder(rowqq);
}
} catch(Exception ee) {
parent.sendMsg("processOrders error: " + ee);
}
}

}









    public Void doInBackground() {
        try {
 
		parent.sendMsg("doInBackground taskProcessOrders: ");
            processOrders(strngBuyArr, strngSellArr, strngOtype);
 
        } catch (Exception ex) {

             parent.sendMsg("ERROR: taskUpdateBPrices[doInBackground]: " + ex.toString());
        }
        return null;
    }


    protected void done() {
        try {
             parent.sendMsg("DONE: taskProcessOrders!!!!: ");
		parent.doPODone();
            //  dispose();
        } catch (Exception ex) {
            parent.sendMsg("ERROR: taskProcessOrders[done]: " + ex.toString());
        }
    }
 

 
    BinanceHelper aepE;
    BinanceHelper parent;
    String strngTaskTempQ;
    String strngBuyArr;
    String strngSellArr;
    String strngOtype;
    UtilSQLAdapter usqad;
    public int iLastQ;
}