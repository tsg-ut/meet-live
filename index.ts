import { app, BrowserWindow } from 'electron';
import dotenv from 'dotenv';
dotenv.config();

const meetUrl = process.env.MEET_URL!;

const createWindow = () => {
    const width = 1600;
    const height = width * 9 / 16;
    const win = new BrowserWindow({
        width, height,
        transparent: true,
        frame: false,
    });
    win.show();
    win.loadURL(meetUrl);
};

app.whenReady().then(createWindow);