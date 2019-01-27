package njfbrowser.tasks;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiWebSocketClient;
import com.binance.api.client.domain.market.CandlestickInterval;
import com.google.gson.Gson;
import njfbrowser.main.BinanceHelper;

import javax.swing.*;


public class taskProcessSStream extends SwingWorker<Void, Void> {
    boolean hasError;
    BinanceHelper parent;
    String strngTaskTempQ;


    BinanceApiWebSocketClient wsMDclient;

    public taskProcessSStream(BinanceHelper aepE, String qStr) {
        parent = aepE;
        strngTaskTempQ = qStr;
        hasError = false;
        wsMDclient = BinanceApiClientFactory.newInstance().newWebSocketClient();

    }


    public Void doInBackground() {

        try {

            // Listen for aggregated trade events for ETH/BTC
            wsMDclient.onAggTradeEvent(strngTaskTempQ, response -> parent.sendSymbolStream(new Gson().toJson(response)));

            // Listen for changes in the order book in ETH/BTC
            wsMDclient.onDepthEvent(strngTaskTempQ, response -> parent.sendSymbolStream(new Gson().toJson(response)));

            // Obtain 1m candlesticks in real-time for ETH/BTC
            wsMDclient.onCandlestickEvent(strngTaskTempQ, CandlestickInterval.ONE_MINUTE, response -> parent.sendSymbolStream(new Gson().toJson(response)));
        } catch (Exception ex) {
            hasError = true;
            System.out.println("ERROR: taskProcessSStream[doInBackground]: " + ex.toString());
            ex.printStackTrace();
            wsMDclient.doKill();
            this.cancel(true);

        }


        return null;
    }


    public void done() {
        try {
            System.out.println("DONE: taskProcessSStream!!!!: ");
            if (!hasError) {
                System.out.println("NOERROR: taskProcessSStream[done]: ");
            } else {
                wsMDclient.doKill();
                this.cancel(true);

            }

        } catch (Exception ex) {
            System.out.println("ERROR: taskProcessSStream[done]: " + ex.toString());
            ex.printStackTrace();
            wsMDclient.doKill();
            this.cancel(true);
        }
    }


    public void kill() {
        try {
            System.out.println("kill: taskProcessSStream!!!!: ");

            wsMDclient.doKill();
            this.cancel(true);
        } catch (Exception ex) {
            System.out.println("ERROR: taskProcessSStream[kill]: " + ex.toString());
            ex.printStackTrace();
        }
    }


}