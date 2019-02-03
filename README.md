<table style="margin: 0 auto; max-width: 900px" align="center">
	<tr>
		<td><p><strong>- About:</strong><br>CoinBin is an abstract attempt to use the javafx 
browser and sqlite to deploy and maintain simple desktop applications. <br>This 
example uses the Binance Java API to render realtime data using html, javascript and 
an sqlite database.<br>Alot of the code is from a similar project that uses 
		javafx, android and a 
LAMP stack (e-commerce demo), basically for the same deploy and maintain purposeses.<br>
		No sucurity exploits checking, refactoring, form-connection validation, 
		etc. are enforced with CoinBin code.<br>The code 
is written, rewritten and mashed according to the current imagination spool.<br>
		It is what it is. Use it at your own risk.<br><br>
		<img src="html/images/demo.jpg" style="height: 337px; width: 600px; text-align: center"></p>
		<p>...</p>
<p><strong>- Structure:</strong><br>conbin.db<span style="color: #808080"> // sqlite database file</span><br>
dbschema.txt /<span style="color: #808080">/sql structure file read by the njfbrowser\utils\UtilSQLAdapter to 
create database</span><br>Launch.java <span style="color: #808080">// simple class that calls njfbrowser\main\CoinBin</span><br>
sunCompile.bat <span style="color: #808080">// windows .bat file executes java 
compiler</span><br>sunRun.bat <span style="color: #808080">// windows .bat file executes java 
Launch.class</span><br>
/cbox <span style="color: #808080">// preference files used in java app</span><br>
/com <span style="color: #808080">// binance api java code, some 
of it was modified.</span><br>/html <span style="color: #808080">// html files, 
js, css used by java browser. home page is index.php</span><br>
/lib 
<span style="color: #808080">// bunch of open-sourced java libraries used by this app</span><br>
/njfbrowser <span style="color: #808080">// main 
java files used by this app</span><br>/org <span style="color: #808080">// the simple web server and rss reader</span><br>
<br><strong>- Usage:</strong><br>double clicking the sunRun.bat will launch 
CoinBin. If needed, edit the bat file in a text editor to point to your java 
executable.<br>Dont forget to include the lib/ and other packages in your 
classpath.<br>The main class <span style="color: #808080">
njfbrowser\main\CoinBin</span> uses <span style="color: #808080">
njfbrowser\BinanceHelper</span> to parse Binance API and&nbsp; <span style="color: #808080">
njfbrowser\utils\UtilSQLAdapter</span> to connect to the coinbin.db sqlite 
database.<br>On llaunch, CoinBin will create/connect to the database and start a 
simple web server. The java browser will&nbsp; then open page
<a href="http://localhost">http://localhost</a> which is the /html folder.<br><br>- <strong>Javascript 
to Java Interface Bridge:</strong><br>
x_booter.js is main loader with alot of spaghetti from other projects.<br>The 
main binance .js can be found in html/js/x_binance-api.js and x_binance-misc.js<br>
The
javascript <strong>app.</strong> object is used to interface with 
njfbrowser/js_interfaces/JSI_coinBin.java which in turn returns data from 
CoinBin or the BinanceHelper, etc.<br><br>- <strong>User Interface:</strong><br>
Rendering of the user interface relies on simple html and javascript, json.<br>
The main index.php file uses ajax requests to include the html/tplates files. 
this help file is an example.<br>Most of the html UI is found in 
html/tplates/index_main.<br>The search and nav bar are found in index_nav.<br>
Clicking on the coin symbol will open trading popup.<br>Clicking on coin name 
below symbol will open info pop-up.<br>Includes an alerts mock-up.<br>The news 
tab searches for rss feeds with token symbol.<br><br><strong>- Database:</strong><br>Most of the custom database requests are made 
using javascript, and each contain a javascript callback function:<br>
<span style="color: #808080">var oiaqB = 
"select * from cryptprice limit 3;";&nbsp; // query string</span><br style="color: #808080">
<span style="color: #808080">app.addToQrySpoolArr(oiaqB, "theCallBackFunction"); // JSI_coinBin.java adds the 
query to the query spool</span><br>See it in action at <a href="javascript:tp1.setSelectedIndex(4);tpAccnt.setSelectedIndex(0);">
Account -&gt; Setup</a> (<em>Sql 
Command Line Output - Run button</em>)<br>The callback functions are then executed on the 
browser (url - javascript:theFunction()) as normal javascript functions.<br>Since the queries to the database have to be one-by-one, BinanceHelper can 
assign a string key to output and then use javascript to request it.<br>BinanceHelper uses a query spool, mainly to query the getTickerPrices() and 
update token prices to the database.<br>The other custom query arrays are also added 
to query spool array.<br>The query spool array uses the task handlers 
(SwingWorkers), like/njfbrowser/tasks/taskProcessQSpool.java to perform these 
queries.<br>If your using sunRun.bat or other debugger, you can see output of 
the query spool array being fed to database.<br>Note that sqlite is no mysql or 
mariaDB etc. It is limited in what it can handle in queries.<br>Using a query 
intensive application with sqlite may be risky in terms of future support.<br>
Another option would be creating various databases instead of using just one.<br><br>- <strong>
WorkFlow:</strong><br>
javascript boolean runLoop is set to true&nbsp; in x_binance-api.js (javascript 
file with most functions below).<br>javascript looperTheater() calls 
app.getTickerPrice() -&gt; BinanceHelper, doTickerPrice() -&gt; gets results and 
splits them into query arrays of about 20 each.<br>Feeds these arrays to sqlite, 
including custom called queries in the process, which when finished call the 
included callback in each query (BinanceHelper -&gt; .processSpoolItm())<br>Some 
of the custom queries include when you click on any of the Quote assets BTC, 
ETC, etc market links.<br>See javascript doFirstLoad() - &gt; which sends the query 
to the query spool with the dynJSfnishMList javascript callback.<br>
dynJSfnishMList will be called from CoinBin with a specific key name for the 
query results string.<br>dynJSfnishMList will then send back that key name in 
return for the query results string.<br>This dynJSfnishMList function is mainly 
used because some results take seconds to come back, freezing the application 
until they do is not an option.<br>Each of 
these sets of arrays in the query spool are processed <br>When the updatePrices 
arrays are done, the javascript function looperTheater() will be called again.<br>
If you are disconnected from the internet or if you get a binance api error in 
connecting to binance, it will stop the looperTheater.<br>You will have to call 
manualy javascript function app.flushPSpool() to run yor query by flushing the 
spool.<br>The javascript function looperScene() is called from CoinBin every 
time BinanceHelper finishes a set of queries in the query spool.<br>Basically it 
allows you to set up tasks in javascript depending at what count your on in the 
looperScene increment value.<br>
<br><strong>- Binance API:</strong><br>This app relies on the <em>binance 
java-api</em> and the version used in this app is probably outdated:<br>You can 
get the latest build here:<br><em>
https://github.com/binance-exchange/binance-java-api</em><br>forked from: <em>
https://github.com/joaopsilva/binance-java-api</em><br>Public API calls like get ticker prices 
or exchange info do not require API keys.<br>Private calls In order to trade or get yout balances
<strong>require</strong> API keys.<br>You can&nbsp; get your Binance API keys at 
the Binance web site.<br>Then enter them in your
<a href="javascript:tp1.setSelectedIndex(4);tpAccnt.setSelectedIndex(2);">
Account -&gt; Security</a> tab.<br>Do not get API keys with Withdraw rights for 
this app!<br>Did we mention to <strong>Use this app at your own risk.</strong><br>
Some modifications were made to the included com/Binance API code.<br>Namely 
atempting to close symbol socket streams when they are not being used etc.<br><br>- <strong>
TODO:</strong><br>
clean up and comment code.<br>clean up math methods on token price conversions.<br>render 
quote symbols/Markets Pairs directly from database.<br>seperate simulation mode 
from live mode using javascript toggle / css color scheme<br>tune the query 
spool array.<br>fix javascript json arrays to work correctly with UI.<br>clean up the UI.<br>
<br><strong>- CoinMarketCap.com API:</strong><br>To get additional coin info you 
will need a CoinMarketCap.com API key.<br>
Then enter them in your
<a href="javascript:tp1.setSelectedIndex(4);tpAccnt.setSelectedIndex(2);">
Account -&gt; Security</a> tab.<br>
<br>- <strong>
Credits:</strong><br>
Most of the credits for open sourced code that is used in this app is usually 
included in the code.<br>But alot of the code has been treated ginzu style, so if you 
deserve some credit, let us know.<br> </p>
		</td>
	</tr>
</table>
