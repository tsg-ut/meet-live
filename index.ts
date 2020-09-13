import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const meetUrl = process.env.MEET_URL!;
const focusJS = fs.readFileSync('./focus.js', 'utf-8');
const customCSS = fs.readFileSync('./style.css', 'utf-8');

import fastify from 'fastify';

const server = fastify({ logger: true });

const createWindow = () => {
    const width = 1000;
    const height = width * 0.73;
    const win = new BrowserWindow({
        width, height,
        title: 'TSG LIVE!',
        transparent: true,
        frame: false,
        webPreferences: {
            preload: focusJS,
        },
    });
    win.loadURL(meetUrl);
    win.show();
    const contents = win.webContents;
    contents.on('did-finish-load', () => {
        contents.insertCSS(customCSS);
        setTimeout(async () => {
            contents.executeJavaScript(focusJS);
            server.get('/focus', async (requeset, reply) => {
                const name = await contents.executeJavaScript('getCurrentFocus()');
                reply.send({ name });
            });
            server.post<{
                Params: {
                    name?: string;
                };
            }>('/focus/:name', async (request, reply) => {
                const name = request.params.name;
                try {
                    await contents.executeJavaScript(`focus('${name}')`);
                    reply.send({ ok: true });
                } catch (e) {
                    reply.send({ ok: false, error: e });
                }
            });
            server.listen(25252);
            console.log('Focus handling preparation done');
        }, 10 * 1000); // 10s
    });
};

app.whenReady().then(createWindow);