import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const port = Number(process.env.PORT!);

const meetUrl = process.env.MEET_URL!;
const focusJS = fs.readFileSync('./focus.js', 'utf-8');
const customCSS = fs.readFileSync('./style.css', 'utf-8');

import fastify from 'fastify';

const server = fastify({ logger: true });

interface PostParams {
    name?: string;
}

const createWindow = () => {
    const height = 720;
    const width = height * 1.38;
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
    contents.on('page-title-updated', (event) => {
        event.preventDefault();
    });
    contents.on('did-finish-load', () => {
        contents.insertCSS(customCSS);
        setTimeout(async () => {
            contents.executeJavaScript(focusJS);
            server.get('/focus', async (requeset, reply) => {
                const name = await contents.executeJavaScript('getCurrentFocus()');
                reply.send({ name });
            });
            server.post<{ Params: PostParams }>('/focus/:name', async (request, reply) => {
                const name = request.params.name;
                if (name) {
                    try {
                        await contents.executeJavaScript(`focus('${name}')`);
                        reply.send({ ok: true });
                    } catch (e) {
                        reply.send({ ok: false, error: e });
                    }
                } else {
                    reply.send({
                        ok: false,
                        error: 'No name specified.',
                    });
                }
            });
            server.listen(port);
            console.log('Focus handling preparation done');
        }, 10 * 1000); // 10s
    });
};

app.whenReady().then(createWindow);