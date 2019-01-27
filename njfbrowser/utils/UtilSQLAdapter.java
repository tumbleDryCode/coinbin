package njfbrowser.utils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.*;
import java.util.StringTokenizer;

public class UtilSQLAdapter {


    public static final String MYDATABASE_NAME = "coinbin.db";
    public static final String MYDATABASE_TABLE = "quser";
    public static final int MYDATABASE_VERSION = 3;


    String dburl = "jdbc:sqlite:";
    StringUtils stringUtils;
    BasicUtils basicUtils;
    Connection conn = null;


    public UtilSQLAdapter() {

        stringUtils = new StringUtils();
        basicUtils = new BasicUtils();
        String furl = "jdbc:sqlite:" + basicUtils.getUfile("coinbin.db");
        dburl = furl;
        try {
            conn = DriverManager.getConnection(dburl);
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                doTblTest();

            }
        } catch (SQLException e) {
            System.out.println("UtilSQLAdapter: " + e.getMessage());
            e.printStackTrace();
        }


    }


    public void doTblTest() {
        try {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();


                String sql = "SELECT _id FROM quser limit 0,1";

                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql);

                // loop through the result set
                while (rs.next()) {
                    System.out.println("rs is next");
                }


            }
        } catch (SQLException e) {
            System.out.println("doTblTest: " + e.getMessage());
            copyDataBase();
        }
    }


    public String getTblFQ(String strTQstr) {
        String adbleS = "";
        try {

            String qstr = "SELECT * FROM " + strTQstr + " limit 0,1";
            Statement stmt = conn.createStatement();
            ResultSet rstq = stmt.executeQuery(qstr);

            ResultSetMetaData arsmd = rstq.getMetaData();
            int columnCount = arsmd.getColumnCount();
            for (int ia = 0; ia < columnCount; ia++) {
                adbleS += arsmd.getColumnName(ia + 1) + "\n";
            }
            adbleS += "<ttok>\n";

        } catch (Exception e) {
            adbleS = "Error: " + e;
            return adbleS;
        }
        return adbleS;
    }

    public String getTblsQ() {
        String dbleS = "";
        try {

            DatabaseMetaData md = conn.getMetaData();
            ResultSet rstq = md.getTables(null, null, "%", null);
// Statement stmt  = conn.createStatement();
// ResultSet rstq = stmt.executeQuery("SELECT name FROM qbits WHERE type='table'");
            while (rstq.next()) {
                dbleS += "<tbl>" + rstq.getString(3) + "\n";
                dbleS += getTblFQ(rstq.getString(3));
            }

        } catch (Exception e) {
            dbleS = "Error: " + e;
            return dbleS;
        }
        return dbleS;
    }

    public String setTabsQ(String strQstr) {

        JSONArray resultSet = new JSONArray();
        String fnlStrRes = "";


        try {
            Statement stmt = conn.createStatement();
            String mnmstring = strQstr.toLowerCase();
            if (mnmstring.contains("select ")) {
                ResultSet rs = stmt.executeQuery(strQstr);

                ResultSetMetaData rsmd = rs.getMetaData();
                System.out.println("rsrsrsrsrsrsrs: " + rs.toString());
                int columnCount = rsmd.getColumnCount();
                System.out.println("dbSelectQ.getColumnCount: " + columnCount);


                for (int ia = 0; ia < columnCount; ia++) {
                    fnlStrRes += rsmd.getColumnName(ia + 1);
                    if (ia + 1 < columnCount) {
                        fnlStrRes += "\t";
                    }
                }
                fnlStrRes += "\n";

                while (rs.next()) {
                    // System.out.println("setTabsQ.getFString: " +  rs.getString(1));


                    JSONObject rowObject = new JSONObject();
                    for (int i = 0; i < columnCount; i++) {
// System.out.println("dbSelectQ.getFString: " + rsmd.getColumnName(i+1) + " : " +  rs.getString(i+1));

                        if (rsmd.getColumnName(i + 1) != null) {
                            if (rs.getString(i + 1) != null) {
// System.out.println("dbSelectQ.getString: " + rsmd.getColumnName(i+1) + " : " +  rs.getString(i+1));
                                fnlStrRes += rs.getString(i + 1);
                            } else {
                                fnlStrRes += " ";
                            }
                        }
                        if (i + 1 < columnCount) {
                            fnlStrRes += "\t";
                        }

                    }


                    fnlStrRes += "\n";

 /* */
                }
            } else {

                int tint = stmt.executeUpdate(strQstr);
                fnlStrRes = "[]";
            }


            // fnlStrRes = resultSet.toString();
            // System.out.println("dbSelectQ.resultSet.toString: " + fnlStrRes);
            return fnlStrRes;
        } catch (Exception e) {

            e.printStackTrace();
            System.out.println("dbSelectQ.error: " + e.toString() + fnlStrRes);
            return fnlStrRes;
        }

    }

    public String setDBselectQ(String strQstr) {

        JSONArray resultSet = new JSONArray();
        String fnlStrRes = "[]";


        try {
            Statement stmt = conn.createStatement();
            String mnmstring = strQstr.toLowerCase();
            if (mnmstring.contains("select ")) {
                ResultSet rs = stmt.executeQuery(strQstr);

                ResultSetMetaData rsmd = rs.getMetaData();
                System.out.println("rsrsrsrsrsrsrs: " + rs.toString());
                int columnCount = rsmd.getColumnCount();
                System.out.println("dbSelectQ.getColumnCount: " + columnCount);

                while (rs.next()) {
// System.out.println("dbSelectQ.getFString: " +  rs.getString(1));


                    JSONObject rowObject = new JSONObject();
                    for (int i = 0; i < columnCount; i++) {
// System.out.println("dbSelectQ.getFString: " + rsmd.getColumnName(i+1) + " : " +  rs.getString(i+1));

                        if (rsmd.getColumnName(i + 1) != null) {
                            if (rs.getString(i + 1) != null) {
// System.out.println("dbSelectQ.getString: " + rsmd.getColumnName(i+1) + " : " +  rs.getString(i+1));
                                rowObject.put(rsmd.getColumnName(i + 1), rs.getString(i + 1));
                            } else {
                                rowObject.put(rsmd.getColumnName(i + 1), "null");
                            }
                        }

                    }

                    resultSet.put(rowObject);
                    fnlStrRes = resultSet.toString();
 /* */
                }
            } else {
                int tint = stmt.executeUpdate(strQstr);
                fnlStrRes = String.valueOf(tint);
            }


            // System.out.println("dbSelectQ.resultSet.toString: " + fnlStrRes);
            return fnlStrRes;
        } catch (Exception e) {

            e.printStackTrace();
            System.out.println("setDBselectQ.error: " + strQstr + " \n:: " + e.toString());
            return fnlStrRes;
        }

    }


    public int delete(String table, String qstring, String[] qargs) {
        // return sqLiteDatabase.delete(table, qstring, qargs);
        return 0;
    }

    public int update(String theTable, String qstring, String[] qargs) {
        int retInt = 33;


        return retInt;

    }



    public void copyDataBase() {
        String strfnl = "nada";
        try {
            String strDbra = basicUtils.readFileAsString("dbschema.txt");
            String strDbrb = stringUtils.replaceString(strDbra, "  ", " ");
            String strDbrca = stringUtils.replaceString(strDbrb, "auto_increment", "autoincrement");
            String strDbrcb = stringUtils.replaceString(strDbrca, "int(", "integer(");
            String strDbrc = stringUtils.replaceString(strDbrcb, "\n", " ");

            String strDbrd = stringUtils.replaceString(strDbrc, "  ", " ");

            String[] pNums = StringUtils.readmessTokens(strDbrd, ";");
            System.out.println("copyDataBase.strDbrd: " + strDbrd);


            for (int j = 0; j < pNums.length; j++) {


                strfnl += setDBselectQ(pNums[j]);
                System.out.println("copyDataBase.pNums[j]: " + j + " : " + pNums[j]);


            }
        } catch (Exception e) {

            e.printStackTrace();
            System.out.println("copyDataBase: " + e.toString());

        } finally {

            System.out.println("copyDataBase:final " + strfnl);
        }

    }


}
