package njfbrowser.tasks;

import njfbrowser.utils.UtilSQLAdapter;
import njfbrowser.utils.StringUtils; 
import njfbrowser.main.BinanceHelper; 
import javax.swing.*;
import org.json.JSONArray;
import org.json.JSONObject;


public class taskProcessQSpool extends
        SwingWorker<Void, Void> {
        boolean hasError;



    public taskProcessQSpool(BinanceHelper aepE, String qStr) {
    parent = aepE;
    strngTaskTempQ = qStr;
    usqad = new UtilSQLAdapter();
    hasError = false;
    }


    public Void doInBackground() {
        try {
 
	System.out.println("doInBackground taskProcessQSpool: ");


 

JSONArray tmpSpoolArr = parent.getQrySpoolArr();
// System.out.println("Started: taskProcessQSpool with array: " + tmpSpoolArr.toString());
if(tmpSpoolArr.length() > 0) {
for (int its = 0; its < tmpSpoolArr.length(); its++) {
   JSONObject row = new JSONObject();
    row = tmpSpoolArr.getJSONObject(its);
    String tmpReqStr = row.getString("q");
    String tmpReqCBStr = row.getString("cb");
    if(tmpReqCBStr.equals("fnshDynDBapp")){
    String tmpGBstr = usqad.setTabsQ(tmpReqStr);
    row.put("rs", tmpGBstr); 
    } else {
    String tmpGBstr = usqad.setDBselectQ(tmpReqStr);
    row.put("rs", tmpGBstr); 
    }

   
    parent.processSpoolItm(row);
} 
 
} else {
		hasError = true;
             System.out.println("ERROR: taskProcessQSpool[doInBackground]: array is 0");
}

 

 
        } catch (Exception ex) {
		hasError = true;
             System.out.println("ERROR: taskProcessQSpool[doInBackground]: " + ex.toString());
    ex.printStackTrace();
        }
        return null;
    }


    protected void done() {
        try {
             System.out.println("DONE: taskProcessQSpool!!!!: ");
		if(!hasError) {
		
		 parent.doPSpoolDone();
		}
             // dispose();
        } catch (Exception ex) {
            System.out.println("ERROR: taskUpdateBPrices[done]: " + ex.toString());
        }
    }
 

 
 

    BinanceHelper parent;
    String strngTaskTempQ;
    UtilSQLAdapter usqad;
  
}