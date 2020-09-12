import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const meetUrl = process.env.MEET_URL!;
const customCSS = fs.readFileSync('./style.css', 'utf-8');

const createWindow = () => {
    const width = 1000;
    const height = width * 0.7;
    const win = new BrowserWindow({
        width, height,
        transparent: true,
        frame: false,
    });
    win.loadURL(meetUrl);
    win.show();
    const contents = win.webContents;
    contents.on('did-finish-load', () => {
        contents.insertCSS(customCSS);
    });
};

app.whenReady().then(createWindow);