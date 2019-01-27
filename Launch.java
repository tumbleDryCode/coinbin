import njfbrowser.main.CoinBin;
import njfbrowser.misc.Splash;
import njfbrowser.utils.UtilSQLAdapter;
import njfbrowser.utils.BasicUtils;
import njfbrowser.main.BinanceHelper;
import njfbrowser.js_interfaces.JSI_coinBin;
import com.binance.api.client.impl.BinanceApiService;
import com.binance.api.client.impl.BinanceApiRestClientImpl;
import com.binance.api.client.domain.account.NewOrder;
 
import njfbrowser.tasks.taskProcessBReqs;
import njfbrowser.tasks.taskProcessBReqs;
import njfbrowser.tasks.taskProcessSStream;
import njfbrowser.tasks.taskProcessQSpool;
import njfbrowser.tasks.taskProcessRSS;
import njfbrowser.utils.UtilSQLAdapter;
import org.jibble.simplewebserver.SimpleWebServer;
import org.jibble.simplewebserver.RequestThread;
import com.binance.api.client.BinanceApiWebSocketClient;
import com.binance.api.client.impl.BinanceApiWebSocketClientImpl;
import com.binance.api.client.impl.BinanceApiWebSocketListener;



/**
 *
 * @author sqlitetutorial.net
 */
public class Launch {
 
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        new CoinBin();
    }
}