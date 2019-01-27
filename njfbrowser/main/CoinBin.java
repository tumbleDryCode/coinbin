package njfbrowser.main;


import com.sun.javafx.application.PlatformImpl;
import javafx.application.Platform;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.collections.ObservableList;
import javafx.concurrent.Worker;
import javafx.embed.swing.JFXPanel;
import javafx.event.EventHandler;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebEvent;
import javafx.scene.web.WebHistory;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;
import njfbrowser.js_interfaces.JSI_coinBin;
import njfbrowser.misc.*;
import njfbrowser.misc.StatusBox;
import njfbrowser.tasks.taskProcessRSS;
import njfbrowser.utils.BasicUtils;
import njfbrowser.utils.Bundle;
import njfbrowser.utils.UtilSQLAdapter;
import org.jibble.simplewebserver.SimpleWebServer;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Calendar;
import java.util.Locale;
import java.util.Properties;
import java.util.StringTokenizer;
import java.util.regex.Pattern;


public class CoinBin extends JFrame
        implements ActionListener, KeyListener, ItemListener, MouseListener {
    static final String MAINPANEL = "sharpToolsCard";
    public static boolean qlinksOn = false;
    // stuff to delete
// --------------------------
// --------------------------
    public static boolean qlinksframe1 = false;
    // -------------------------
// end of stuff to delete
// -------------------------
    static Frame frame;
    public String tempRecEdit;
    public String currentDB;
    public String currentDBID;
    public String currentDBHost;
    public String tablename;
    public String fieldname;
    /// --------------------------------------
/// --------------------------------------
/// Database Scheme saving and getting
/// this saveAAPrefs was deprecated
/// Use for something else
    public String criterianame;
    public String tempQResultsString;
    public String nowQ;

    public boolean isIEversion;
    public boolean isFullBowl;
    public boolean useAdminPop;
    public boolean boolDBQBoxOpen;
    public boolean boolAAPrefsdlgOpen;
    public boolean boolAddDBDlgOpen;
    public boolean boolLHelpOpen;
    public boolean boolSharpopOpen;
    public boolean boolBrowDBAOpen;
    public boolean boolstatusBoxOpen;

    public Properties aplangstrings;
    public Properties aamainprefs;


    public String server;

    public java.awt.List comtext;


    public String udString;
    public String fsString;
    public String currentDBTitle;
    public JTextArea QqueryTextArea;
    public Bundle currConfBundle;
    public String currRssStr;
    public String currPageVars;
    public UtilSQLAdapter dbMSQLA;

    protected boolean browircStat;
    protected boolean winOntop;

    protected int ii;
    protected int total;
    protected JLabel statusLabel;
    protected BusyBlip blip;
    BasicUtils bUtils;

    int clbanner;
    String myipnumber;
    String args[];

    Splash mySplash;
    String ircServerstring;

    JMenuBar mb;
    JMenu mFile;
    JMenuItem miQuit;
    JMenuItem miAbout;
    int useproxyAAInt;

    JPanel pnlBrowserCage;
    ClientHttpRequest chttpreq;

    String strngTempDB;
    String strngTempTable;
    String strngTempQStrng;
    Thread dm;

    DefaultListModel tempModelDataList;
    StatusBox statusBox;
    JSI_coinBin jsiCoinBin;
    SimpleWebServer simpleWebServer;
    BinanceHelper bintAEA;
    KeyboardFocusManager keyManager;
    private PrintWriter fileOut;
    private Stage stage;
    private WebView browser;
    private JFXPanel jfxPanel;
    private WebEngine webEngine;


    public CoinBin() {
        setTitle("CoinBin");
        isIEversion = true;
        isFullBowl = false;


        try {
            // Set cross-platform Java L&F (also called "Metal")
            //  UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        udString = System.getProperty("user.dir");
        fsString = File.separator;
        mySplash = new Splash(this, getUfile("cbox/images/splashiti.gif"));
        //      mySplash = new Splash(this, udString + "cbox/images/main.gif");
        loadAAprefs();
        loadAPlangStrings();
        bUtils = new BasicUtils();
        getContentPane().setLayout(new BorderLayout());
        setFont(new java.awt.Font("Arial", 0, 12));
        setBackground(new java.awt.Color(225, 225, 225));
        statusBox = new StatusBox(this);
        currPageVars = "noQvalue";
        currRssStr = "noQvalue";


        bintAEA = new BinanceHelper(this);
        System.out.println("ud: " + udString + "   fs: " + fsString);


// end to delete or use


        myipnumber = "";
        ircServerstring = "";
        int i = 10;


        winOntop = false;

        boolDBQBoxOpen = false;
        boolAAPrefsdlgOpen = false;
        boolAddDBDlgOpen = false;
        boolLHelpOpen = false;
        boolSharpopOpen = false;
        boolBrowDBAOpen = false;
        boolstatusBoxOpen = false;
        browircStat = true;
        useproxyAAInt = 0;


        currentDB = "Demo-Database";
        currentDBHost = "localhost";
        currentDBID = "555";
        currentDBTitle = "";

        tempRecEdit = "";
        tablename = "";
        fieldname = "";
        criterianame = "";
        tempQResultsString = "";
        nowQ = "";

        dbMSQLA = new UtilSQLAdapter();
        jsiCoinBin = new JSI_coinBin(this);

        try {
            simpleWebServer = new SimpleWebServer(this, new File("html"), 80);
        } catch (Exception e) {
            System.out.println(e);
        }

        // currConfBundle = getConfBundle();
        tempModelDataList = new DefaultListModel();
        strngTempDB = "";
        strngTempTable = "";
        strngTempQStrng = "";
        String s1 = "yyyy-MM-dd";

        Calendar calendar = Calendar.getInstance();
        calendar.add(2, -1);


        useAdminPop = true;

        mb = new JMenuBar();

        mFile = new JMenu(aplangstrings.getProperty("text139", "File"));


        mFile.getPopupMenu().setLightWeightPopupEnabled(false);


        miQuit = new JMenuItem(aplangstrings.getProperty("text149", "Quit"));
        miAbout = new JMenuItem(aplangstrings.getProperty("text149", "Quit"));


        mb.add(mFile);

        mFile.addSeparator();
        mFile.add(miQuit);
        mFile.add(miAbout);
        miQuit.addActionListener(this);
        miAbout.addActionListener(this);
        JPanel blipPanel = new JPanel();
        blipPanel.setLayout(new FlowLayout(0));
        blip = new BusyBlip();
        blip.setPreferredSize(new Dimension(100, 20));
        blip.setOpaque(true);

        blip.setForeground(getForeground());
        statusLabel = new JLabel("ready...");
        blipPanel.add(blip);
        blipPanel.add(statusLabel);


        JPanel mainPanel = new JPanel(new BorderLayout());
        JPanel mainBrowserPanel = new JPanel(new BorderLayout());
        pnlBrowserCage = new JPanel(new BorderLayout());

        jfxPanel = new JFXPanel();
        pnlBrowserCage.add("Center", jfxPanel);
        mainBrowserPanel.add("Center", pnlBrowserCage);
        mainBrowserPanel.add("South", blipPanel);


        // mainBrowserPanel.setBorder(raisedbvl);
        setStatusText("Loaded Browser Panel");


        mainPanel.add("Center", mainBrowserPanel);


        getContentPane().add(mainPanel, "Center");

        setJMenuBar(mb);


        addWindowListener(new mySlicWindowListener());
        setVisible(true);
        setLocation(0, 0);
        setSize(Toolkit.getDefaultToolkit().getScreenSize());
        // resize(Toolkit.getDefaultToolkit().getScreenSize());
        createScene();


        keyManager = KeyboardFocusManager.getCurrentKeyboardFocusManager();
        keyManager.addKeyEventDispatcher(new KeyEventDispatcher() {

            @Override
            public boolean dispatchKeyEvent(KeyEvent e) {

                char eventChar = e.getKeyChar();
                int eventCode = e.getKeyCode();


                if (e.getID() == KeyEvent.KEY_PRESSED) {
                    if (eventCode == KeyEvent.VK_F6) {

                        System.out.println("keyPressed.KeyEvent.VK_F6: " + eventChar + " :: " + eventCode);

                    } else if (eventCode == KeyEvent.VK_F7) {
                        System.out.println("keyPressed.KeyEvent.VK_F7: " + eventChar + " :: " + eventCode);

                    }
                }
                return false;
            }

        });


    }

    public static void main(String args1[]) {

        new CoinBin();

    }

    public static String getTimeStamp() {
        long l = System.currentTimeMillis() / 1000L;
        String s = Long.toString(l);
        int i = Integer.parseInt(s);
        return Integer.toString(i);
    }

    public static String[] readmessTokens(String s, String s1) {
        StringTokenizer stringtokenizer = new StringTokenizer(s, s1);
        int i = stringtokenizer.countTokens();
        String as[] = new String[i];
        for (int j = 0; j < i; j++)
            as[j] = stringtokenizer.nextToken();
        return as;
    }


    public static String replaceString(String target, String from, String to) {
        // target is the original string
        // from   is the string to be replaced
        // to     is the string which will used to replace
        int start = target.indexOf(from);
        if (start == -1) return target;
        int lf = from.length();
        char[] targetChars = target.toCharArray();
        StringBuilder buffer = new StringBuilder();
        int copyFrom = 0;
        while (start != -1) {
            buffer.append(targetChars, copyFrom, start - copyFrom);
            buffer.append(to);
            copyFrom = start + lf;
            start = target.indexOf(from, copyFrom);
        }
        buffer.append(targetChars, copyFrom, targetChars.length - copyFrom);
        return buffer.toString();
    }

    public void shutdown() {


        saveAllPrefs();
        dispose();
        System.exit(0);
    }


    public void loadAPlangStrings() {
        aplangstrings = new Properties();
        try {
            String strULangLocale = aamainprefs.getProperty("userLang", "en_US");
            if (strULangLocale.equals("noQvalue")) {
                Locale locale = Locale.getDefault();
                String lang = System.getProperty("user.language");
                String country = System.getProperty("user.country");

                // String lang = locale.getDisplayLanguage();
                // String country = locale.getDisplayCountry();
                System.out.println("loadAPlangStrings:: lang: " + lang + " :: country: " + country);

                if (lang.toLowerCase().indexOf("pt") != -1) {
                    strULangLocale = "pt_PT";
                } else {
                    strULangLocale = "en_US";
                }
                aamainprefs.setProperty("userLang", strULangLocale);
            }
            FileInputStream fileinputstream = new FileInputStream(getUfile("cbox/props/APBundle_" + strULangLocale + ".props"));
            DataInputStream datainputstream = new DataInputStream(fileinputstream);
            aplangstrings.load(fileinputstream);
            fileinputstream.close();
            datainputstream.close();
            setStatusText("Language File loaded");
        } catch (Exception exception) {
            System.out.println(exception.toString());
        }
    }


    public void saveAllPrefs() {
        try {


            FileOutputStream fileoutputstream = new FileOutputStream(getUfile("cbox/prefs/AAPrefs.prfs"));
            PrintStream printstream = new PrintStream(fileoutputstream);
            aamainprefs.store(fileoutputstream, "---No Comment---");
            printstream.close();
            fileoutputstream.close();
            System.out.println(aplangstrings.getProperty("text205"));
        } catch (Exception exception) {
            setQstatus("Error 1602A [CoinBin]: \n" + exception.toString(), true);
        }
    }

    public void loadAAprefs() {
        try {
            aamainprefs = new Properties();
            FileInputStream fileinputstream = new FileInputStream(getUfile("cbox/prefs/AAPrefs.prfs"));
            DataInputStream datainputstream = new DataInputStream(fileinputstream);
            aamainprefs.load(fileinputstream);

            fileinputstream.close();
            datainputstream.close();
            setStatusText("Loaded Main Preferences");
		currConfBundle = getConfBundle();
        } catch (Exception exception) {
            setQstatus("Error 808A [CoinBin]: \n" + exception.toString(), false);
        }
    }

    public void actionPerformed(ActionEvent actionevent) {
        Object obj = actionevent.getSource();

        if (obj == miQuit) {
            shutdown();
        }
        if (obj == miAbout) {
            getStatusBox();
        }

    }

    public void keyPressed(KeyEvent keyevent) {


    }

    public void keyTyped(KeyEvent keyevent) {
    }

    public void keyReleased(KeyEvent keyevent) {
    }

    public void mouseClicked(MouseEvent mouseevent) {
    }

    public void mouseEntered(MouseEvent mouseevent) {
        java.awt.Component component = mouseevent.getComponent();

    }

    public void mouseReleased(MouseEvent mouseevent) {
    }

    public void mousePressed(MouseEvent mouseevent) {
    }

    public void mouseExited(MouseEvent mouseevent) {
        // setDefaultCursor();
        // tiplabel.setText("");
    }


    public void setStatusText(String s) {
        //  statusBox.setCurrStatus(s + "\n");
        System.out.println(s);
    }


    private void createScene() {

        PlatformImpl.startup(new Runnable() {
            @Override
            public void run() {
                try {
                    stage = new Stage();

                    //  stage.setTitle("Hello Java FX");
                    stage.setResizable(true);

                    Group root = new Group();
                    Scene scene = new Scene(root, pnlBrowserCage.getWidth(), pnlBrowserCage.getHeight());


                    stage.setScene(scene);
                    // Set up the embedded browser:
                    browser = new WebView();
                    browser.setPrefSize(pnlBrowserCage.getWidth() - 1, pnlBrowserCage.getHeight() - 1);
                    System.out.println("[3049] browser s: " + browser.getWidth() + " :: " + browser.getHeight());

                    System.out.println("[3049] browser resize: " + pnlBrowserCage.getWidth() + " :: " + pnlBrowserCage.getHeight());
                    webEngine = browser.getEngine();


                    webEngine.getLoadWorker().stateProperty().addListener(new ChangeListener<Worker.State>() {
                        @Override
                        public void changed(ObservableValue<? extends Worker.State> observableValue, Worker.State oldState, Worker.State state) {
                            // System.out.println("prog loaded: " + state + " :: " + webEngine.getLoadWorker().getProgress() + " :: " + webEngine.getLoadWorker().getTotalWork() + " :: " + webEngine.getLoadWorker().getWorkDone() + " :: " + webEngine.getLoadWorker().getMessage() + " :: " + webEngine.getLoadWorker().getTitle());
                            String strdates = "loading...";
                            int iDS = 0;
                            switch (state) {
                                case READY:
                                    System.out.println("Location ready  + " + webEngine.getLocation());
                                    // startTime.set(System.nanoTime());


                                    break;
                                case SCHEDULED:
                                    System.out.println("Location SCHEDULED + " + webEngine.getLocation());
                                    // startTime.set(System.nanoTime());

                                    break;
                                case RUNNING:
                                    iDS = 2;
                                    System.out.println("Location SCHEDULED + " + webEngine.getLocation());
                                    // startTime.set(System.nanoTime());
                                    break;

                                case SUCCEEDED:
                                    System.out.println("Location SUCCEEDED + " + webEngine.getLocation());
                                    // endTime.set(System.nanoTime());
                                    iDS = 3;
                                    String url = webEngine.getLocation();
                                    if (url.contains("/localhost") && url.contains("?")) {
                                        System.out.print("onPageStarted:oride " + url);
                                        String[] temp;
                                        temp = url.split(Pattern.quote("?"));
                                        // showDaToast("is one: " + temp[1]);
                                        // epMainHbook.setCurrPageVars(temp[1]);
                                        currPageVars = temp[1];
                                        //  webEngine.load(temp[0]);
                                    }

                                    strdates = "ready...";

                                    JSObject win = (JSObject) webEngine.executeScript("window");
                                    win.setMember("app", jsiCoinBin);
                                    break;


                                case CANCELLED:
                                    break;
                                case FAILED:
                                    iDS = 4;
                                    strdates = "Location failed: " + webEngine.getLoadWorker().getException().toString();
                                    System.out.println("Location failed + " + webEngine.getLoadWorker().getException().toString());
                                    // endTime.set(System.nanoTime());
                                    System.out.println("Location FAILED + " + webEngine.getLocation());
                                    break;
                                default:
                                    break;
                            }

                            browserProgressChange(iDS, strdates);
                        }

                    });


                    webEngine.load("http://localhost/");


                    webEngine.setOnAlert(new EventHandler<WebEvent<String>>() {
                        @Override
                        public void handle(WebEvent<String> event) {

                            // dcontent.getChildren().addAll(new Label(event.getData()));
                            doMsg(event.getData());

                        }
                    });

                    ObservableList<Node> children = root.getChildren();
                    children.setAll(browser);


                    System.out.println("[3049] browser s: " + scene.getWidth() + " :: " + scene.getHeight());

                    System.out.println("[3049] browser resize: " + pnlBrowserCage.getWidth() + " :: " + pnlBrowserCage.getHeight());


                    jfxPanel.setScene(scene);
                } catch (Exception e) {
                    System.out.println("[932] setScene: " + e);
                    e.printStackTrace();

                }
            }


        });


    }


    public void browserProgressChange(int daState, String s) {
        switch (daState) {
            case 0:
                blip.start();
                blip.setProgress(10, 100);
                statusLabel.setText(s);
                break;
            case 1:
                blip.setProgress(30, 100);
                statusLabel.setText(s);
                break;
            case 2:
                blip.setProgress(65, 100);
                statusLabel.setText(s);
                break;
            case 3:
                blip.stop();
                statusLabel.setText(s);
                break;
            case 4:
                blip.stop();
                statusLabel.setText(s);
                break;
            default:
                break;
        }

    }

    public void navigate(final String strNav) {


        Platform.runLater(new Runnable() {

            @Override
            public void run() {
                try {
                    if (strNav.indexOf("(") != -1) {
                        webEngine.executeScript(strNav);
                    } else {
                        webEngine.load(strNav);
                    }
                } catch (Exception e) {
                    System.out.println("[3210] navigate: " + e);

                }


            }
        });
    }

    public void doMsg(String strMsg) {
        MsgBox aaUPQMsgBox = new MsgBox(this, "JS ALert", strMsg, true);

    }

    public boolean doConfirmMsg(String strMsg) {
        boolean boolRCM = false;
        int dialogButton = JOptionPane.YES_NO_OPTION;
        int dialogResult = JOptionPane.showConfirmDialog(null, strMsg, "Warning", dialogButton);
        if (dialogResult == JOptionPane.YES_OPTION) {
            boolRCM = true;
            System.out.println("doConfirmMsg: " + boolRCM);
        }
        return boolRCM;

    }

    public String goBack() {
        final WebHistory history = webEngine.getHistory();
        ObservableList<WebHistory.Entry> entryList = history.getEntries();
        int currentIndex = history.getCurrentIndex();
//    Out("currentIndex = "+currentIndex);
//    Out(entryList.toString().replace("],","]\n"));

        Platform.runLater(new Runnable() {
            public void run() {
                history.go(-1);
            }
        });
        return entryList.get(currentIndex > 0 ? currentIndex - 1 : currentIndex).getUrl();
    }

    public String goForward() {
        final WebHistory history = webEngine.getHistory();
        ObservableList<WebHistory.Entry> entryList = history.getEntries();
        int currentIndex = history.getCurrentIndex();
        Platform.runLater(new Runnable() {
            public void run() {
                history.go(1);
            }
        });
        return entryList.get(currentIndex < entryList.size() - 1 ? currentIndex + 1 : currentIndex).getUrl();
    }

    public Bundle getConfBundle() {
        Bundle theConfBundle = new Bundle();
        theConfBundle.putInteger("quid", Integer.parseInt(aamainprefs.getProperty("quid", "1")));
        theConfBundle.putString("cartID", aamainprefs.getProperty("cartID", "noQvalue"));
        theConfBundle.putString("usrlang", aamainprefs.getProperty("usrlang", "en_US"));
        theConfBundle.putString("prfsSHOPuser", aamainprefs.getProperty("prfsSHOPuser", "noQvalue"));
        theConfBundle.putString("prfsBinanceKey", aamainprefs.getProperty("prfsBinanceKey", "noQvalue"));
        theConfBundle.putString("prfsBinanceScrt", aamainprefs.getProperty("prfsBinanceScrt", "noQvalue"));
        theConfBundle.putString("prfsCMCKey", aamainprefs.getProperty("prfsCMCKey", "noQvalue"));


        return theConfBundle;
    }

    public String getConfValString(String theKey) {
        String strTheKey = "noQvalue";
        try {
            strTheKey = currConfBundle.getString(theKey);
        } catch (Exception err) {
            System.out.println("Error.getConValString: " + err);
        }
        return strTheKey;
    }

    public Integer getConfValInt(String theKey) {

        int strTheKey = 1234;
        try {
            strTheKey = currConfBundle.getInteger(theKey);
        } catch (Exception err) {
            System.out.println("Error.getConValInt: " + err);
        }
        return strTheKey;
    }

    public void putConfValString(String theKey, String theVal) {


        aamainprefs.setProperty(theKey, theVal);
        currConfBundle = getConfBundle();
	  saveAllPrefs();
	  

    }

    public void putConfValInt(String theKey, Integer theVal) {
        try {
            aamainprefs.setProperty(theKey, String.valueOf(theVal));
            currConfBundle = getConfBundle();
		saveAllPrefs();

        } catch (Exception e) {
            System.out.println("Error.putConfValInt: " + e);
        }

    }

    public String getCurrPageVars(String tmpStrQstr) {

        return currPageVars;
    }

    public String doCryptAssets(String tmpStrQstr) {
        sendMsg("doing doCryptAssets: " + tmpStrQstr);
        return bintAEA.getAccountBalances();
    }

    public String doExchangeInfo(String tmpStrQstr) {

        return bintAEA.getExchangeInfo();
    }

    public String doTickerPrice(String tmpStrQstr) {
        System.out.println("CoinBin doTickerPrice : " + bintAEA.threadKilled);
 

        bintAEA.doTickerPrice();

        return "na";
    }

    public String doTickerStatistics(String tmpStrQstr) {

        return bintAEA.getTickerStatistics(tmpStrQstr);
    }

    public String doMarketOrder(String tmpType, String tmpSymStr, String tmpQty) {

        return bintAEA.getMarketOrder(tmpType, tmpSymStr, tmpQty);
    }

    public String doOrderTest(String tmpType, String tmpSymStr, String tmpQty) {

        return bintAEA.getOrderTest(tmpType, tmpSymStr, tmpQty);
    }

    public void getAppOrders(String bStr, String sStr, String tStr) {
        sendMsg("CoinBin getAppOrders: ");
        bintAEA.setAppOrders(bStr, sStr, tStr);
    }

    public void setAEAThreadKill(boolean bTstate) {
        bintAEA.threadKilled = bTstate;
        sendMsg("doing setAEAThreadKill: " + bTstate + " and nothing else");
    }

    public String getStrAssets() {

        return bintAEA.getStrAssets();
    }

    public String getStrQAssets() {
        return bintAEA.getStrQAssets();
    }

    public String getStrTopSellers() {
        return bintAEA.getStrTopSellers();
    }

    public String getStrTopRated() {
        return bintAEA.getStrTopRated();
    }

    public void doNuBDone(String tdStr) {
        System.out.println("doNuBDone: " + tdStr);
        sendMsg("doNuBDone: " + tdStr);
        navigate("looperTheater();");
    }

    public void doSceneDone(int tdInt) {
        System.out.println("doSceneDone: " + tdInt);
        navigate("looperScene('" + tdInt + "');");
    }

    public void doBDone() {
        System.out.println("doBDone: ");
        navigate("looperTheater();");
    }

    public void doToQrySpoolArr(String tmpQstr, String tmpCBstr) {
        bintAEA.addToQrySpoolArr(tmpQstr, tmpCBstr);
    }

    public void sendMsg(String bnmsg) {
        String nstr = "sendMsg(\"" + bnmsg + "\",\"dvOutput\");";
        System.out.println("CoinBin sendMsg: " + bnmsg);
        navigate(nstr);
    }

    public String getByteArrayFromImageURL(String url) {

        try {
            URL imageUrl = new URL(url);
            URLConnection ucon = imageUrl.openConnection();
            InputStream is = ucon.getInputStream();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int read = 0;
            while ((read = is.read(buffer, 0, buffer.length)) != -1) {
                baos.write(buffer, 0, read);
            }
            baos.flush();
            String uPassStringEncd = new sun.misc.BASE64Encoder().encode(buffer);

            return uPassStringEncd;
        } catch (Exception e) {
            return "Error" + e.toString();
        }

    }

    public String doUrlRespString(String theTurl) {
        try {


            String s1;

            String s2 = "";
            URL url = new URL(theTurl);


            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            return content.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "doUrlRespString No go: " + e.toString();
        }
    }

    public String doUContentString(String theTurl, String tDUOstr) {
        try {

            File f = new File("html/tmp/" + tDUOstr);
            if (f.exists() && !f.isDirectory()) {
                return bUtils.readFileAsString("html/tmp/" + tDUOstr);
            } else {
                String s1;

                String s2 = "";
                URL url = new URL(theTurl);


                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setRequestMethod("GET");
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuffer content = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
                }
                in.close();

                bUtils.saveTextString(content.toString(), "html/tmp/" + tDUOstr);
                return content.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "No go: " + e.toString();
        }
    }

    public void setNuJSPrices(String tmpJSstr) {
        navigate("doNuJSPrices('" + tmpJSstr + "');");
    }

    public void setAJSPrice(String tmpJSstr) {
        navigate(tmpJSstr);
    }

    public void setCurrQSymStr(String tmpJSstr) {
        bintAEA.setCurrQSymStr(tmpJSstr);
    }

    public String doJSretstring(String tmpJSstr) {
        return bintAEA.getJSretstring(tmpJSstr);
    }

    public void setPSpoolDone() {
        bintAEA.doPSpoolDone();
    }

    public void doSymbolStream(String tASS) {
        bintAEA.getSymbolStream(tASS);
    }

    public void doCSymbolStream() {
        bintAEA.closeSymbolStream();
    }

    public String doRssString() {
        return currRssStr;
    }

    public void doRunLoop(String tRstr) {
        bintAEA.setRunLoop(tRstr);
    }
    public String doGetRunLoop() {
       return bintAEA.getRunLoop();
    }

    public void fnshRssLoad(String taPstring) {
        currRssStr = taPstring;
        navigate("parseRssData();");
    }

    public void setRSSParser(String tPstring) {
        taskProcessRSS taskPRss = new taskProcessRSS(this, tPstring);
        taskPRss.execute();
    }

    public String getUfile(String s) {
        String uFileString = "";
        String cleanFileString = replaceString(s, "/", fsString);
        cleanFileString = replaceString(s, "\\", fsString);
        uFileString = udString + fsString + cleanFileString;
        return uFileString;
    }

    public class mySlicWindowListener extends WindowAdapter {
        public mySlicWindowListener() {
        }

        public void windowActivated(WindowEvent windowevent) {
            // System.out.println("windowActivated" + windowevent.getSource().toString());
        }

        public void windowClosing(WindowEvent windowevent) {
            shutdown();
        }
    }

    public void setQstatus(String s, boolean flag) {
        new alertDialog(this, s);

    }


    public void itemStateChanged(ItemEvent itemevent) {

    }

    public void getStatusBox() {
        if (boolstatusBoxOpen) {
            statusBox.requestFocus();
        } else {
            statusBox.setVisible(true);
            boolstatusBoxOpen = true;
        }
    }


    /* to delete!!!!!!!!!!!!!!
    public class MyAuthenticator extends Authenticator {
        // This method is called when a password-protected URL is accessed
        protected PasswordAuthentication getPasswordAuthentication() {
            // Get information about the request
            String promptString = getRequestingPrompt();
            String hostname = getRequestingHost();
            InetAddress ipaddr = getRequestingSite();
            int port = getRequestingPort();

            // Get the username from the user...
            String username = encryptedUname;

            // Get the password from the user...
            String password = encryptedPass;

            // Return the information
            return new PasswordAuthentication(username, password.toCharArray());
        }
    }




    public void adminStatusTextChange(String s) {
        statusLabel.setText(s);
    }

    public void adminTitleChange(String s) {
        setTitle(s + " - CoinBin");
    }

    public void adminDocumentComplete(String s) {
        statusLabel.setText(s);
    }

    public boolean showContextMenu() {

        System.out.println("Context Called");
        return false;
    }


    public void fixWords(String s) {
        String s1 = s;
        int i = 0;
        String as[] = readmessTokens(s1, "<ttok>");
        try {
            while (i < as.length)
                i++;
        } catch (ArrayIndexOutOfBoundsException arrayindexoutofboundsexception) {
            setQstatus("Error 887A [CoinBin]: \n" + arrayindexoutofboundsexception + "\n" + ":\n" + as[i], false);
        }
    }

    private String removeBSpaces(String s) {
        String s1 = "";
        char c = '?';
        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);
            if (c1 != ' ' || c != 32) {
                s1 = s1 + c1;
                c = c1;
            }
        }

        return s1;
    }




    public void setHandCursor() {
        setCursor(12);
    }

    public void setDefaultCursor() {
        // setCursor(0);
        setCursor(Cursor.getPredefinedCursor(0));
    }


    public void delRecords() {

        if (currentDB.length() < 1) {
            setQstatus("Enter a Database!", true);
        }
        if (tablename.length() < 1) {
            setQstatus("Enter a Table!", true);
        }
        if (fieldname.length() < 1) {
            setQstatus("Enter a Field!", true);
        }
        if (criterianame.length() < 1) {
            setQstatus("Enter a Criteria!", true);
        } else {
            String s = "Delete from " + tablename + "  where " + fieldname + " like " + "'" + criterianame + "';|#|";
            // comtext.addItem(s);
            comtext.add(s);
            setQstatus(aplangstrings.getProperty("text523"), true);
        }
    }


    public void getAppStatus() {
        setQstatus(QqueryTextArea.getText(), false);
    }







    public void setAdminPopbool(boolean bool) {
        useAdminPop = bool;
    }

    public void screenShot() {
        String outFileName = "adminstuff/" + getTimeStamp() + ".png";
        try {

            Toolkit toolkit = Toolkit.getDefaultToolkit();
            Dimension screenSize = toolkit.getScreenSize();
            Rectangle screenRect = new Rectangle(screenSize);
            Robot robot = new Robot();
            BufferedImage image = robot.createScreenCapture(screenRect);
            ImageIO.write(image, "png", new File(outFileName));
            setStatusText("Saved screen shot (" + image.getWidth() + " x " + image.getHeight() + " pixels) to file \"" + outFileName + "\".");
        } catch (Exception exception) {
            setQstatus("Screen Shot error: " + exception.toString(), false);
            return;
        }
//         new SmartImage(this, outFileName, "hehe");
        // dispose();
    }

    public void reloadTheCanvas() {
        webEngine.reload();
    }





    */

}