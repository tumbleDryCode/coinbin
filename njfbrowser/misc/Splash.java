package njfbrowser.misc;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Splash extends Window {
    class WindowListener extends WindowAdapter {

        public void windowActivated(WindowEvent windowevent) {
            setVisible(false);
            dispose();
        }
        WindowListener() {
        }
    }

    public Splash(Frame frame, String s) {
        super(frame);
        imgName = s;
        tk = Toolkit.getDefaultToolkit();
        splashImage = loadSplashImage();
        showSplashScreen();
        frame.addWindowListener(new WindowListener());

    }

    public void update(Graphics g){
     paint(g);
    }

    public void paint(Graphics g) {

        g.drawImage(splashImage, 2, 2, imgWidth, imgHeight, this);
        /**/
        g.setPaintMode();
        g.setColor(Color.GREEN);
        g.setFont(new Font("TimesRoman", Font.BOLD, 28));
        g.drawString("CoinBin", 20, 30);
        g.setColor(Color.BLUE);
        g.setFont(new Font("TimesRoman", Font.BOLD, 14));
        g.drawString("tumbleDryCode", 20, 70);

    }

    public Image loadSplashImage() {
        MediaTracker mediatracker = new MediaTracker(this);
        Image image = tk.getImage(imgName);
        mediatracker.addImage(image, 0);
        try {
            mediatracker.waitForAll();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        imgWidth = image.getWidth(this);
        imgHeight = image.getHeight(this);
        return image;
    }

    public void showSplashScreen() {
        Dimension dimension = tk.getScreenSize();
        setBackground(BORDERCOLOR);
        int i = imgWidth + 4;
        int j = imgHeight + 4;
        int k = (dimension.width - i) / 2;
        int l = (dimension.height - j) / 2;
        setBounds(k, l, i, j);
        setVisible(true);
    }

    private Image splashImage;
    private int imgWidth;
    private int imgHeight;
    private String imgName;
    private static final Color BORDERCOLOR;
    Toolkit tk;
    static {
        BORDERCOLOR = Color.white;
    }
}
