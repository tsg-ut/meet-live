import { app, BrowserWindow, BrowserView } from 'electron';
import dotenv from 'dotenv';
dotenv.config();

const googleMeetUrl = process.env.GOOGLE_MEET_URL!;

const createWindow = () => {
    const width = 1600;
    const height = width * 9 / 16;
    const leftViewWidth = height * 4 / 3;
    const win = new BrowserWindow({ width, height });

    const meetView = new BrowserView();
    win.addBrowserView(meetView);
    meetView.setBounds({
        x: 0,
        y: 0,
        width: leftViewWidth,
        height,
    });
    meetView.webContents.loadURL(googleMeetUrl);

    const bannerView = new BrowserView();
    win.addBrowserView(bannerView);
    bannerView.setBounds({
        x: leftViewWidth,
        y: 0,
        width: width - leftViewWidth,
        height,
    });
    bannerView.webContents.loadFile('banner/index.html');
};

app.whenReady().then(createWindow);