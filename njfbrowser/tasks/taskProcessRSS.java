package njfbrowser.tasks;

import com.google.gson.Gson;
import njfbrowser.main.CoinBin;
import org.horrabin.horrorss.*;

import javax.swing.*;
import java.util.List;

public class taskProcessRSS extends
        SwingWorker<Void, Void> {
    public taskProcessRSS(CoinBin aApp, String wqs) {
        // super(dbQueryBox);
        parent = aApp;
        whichQs = wqs;

	  strRssJson = "noQvalue";
        // progressBarAA.setIndeterminate(true);

    }


    public Void doInBackground() {
        try {
RssParser rss = new RssParser();
rss.enableCache("cbox/rsscache",1800000); // 30 minute cache

	RssFeed feed = rss.load(whichQs);
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

strRssJson = new Gson().toJson(items);


            System.out.println("taskProcessRSS doInBackground");
        } catch (Exception ex) {
            System.out.println("ERROR: taskProcessRSS [18]: " + ex.toString());
        }
        return null;
    }


    protected void done() {
        try {
            parent.fnshRssLoad(strRssJson);
            //  dispose();
        } catch (Exception ex) {
            System.out.println("ERROR: taskProcessRSS [23]: " + ex.toString());
        }
    }

    String strRssJson;
    String whichQs;
    CoinBin aApp;
    CoinBin parent;

}