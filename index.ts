import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const port = Number(process.env.PORT!);

const meetUrl = process.env.MEET_URL!;
const focusJS = fs.readFileSync('./focus.js', 'utf-8');
const customCSS = fs.readFileSync('./style.css', 'utf-8');

import fastify from 'fastify';
import formbody from 'fastify-formbody';

const server = fastify({ logger: true });
server.register(formbody);

const createWindow = () => {
    const height = 950;
    const width = height * 1.357;
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
            server.post('/focus', async (request, reply) => {
                // @ts-ignore
                const { text, token } = request.body;
                console.log(token);
                const defaultParam = {
                    response_type: 'in_channel',
                    username: 'focus',
                    icon_emoji: ':movie_camera:',
                };
                try {
                    if (text === '') {
                        const [ name, participantNames ] = await contents.executeJavaScript('getCurrentFocus()');
                        reply.send({
                            ...defaultParam,
                            blocks: [{
                                type: 'section',
                                text: {
                                    type: 'mrkdwn',
                                    text: `現在の focus: *${name}*\n現在の参加者一覧: ${
                                        participantNames.join(', ')}`,
                                },
                            }],
                        });
                    } else {
                        await contents.executeJavaScript(`focus('${text}')`);
                        const [ name ] = await contents.executeJavaScript('getCurrentFocus()');
                        if (name !== text) throw 'Failed';
                        reply.send({
                            ...defaultParam,
                            text: `Good! Now ${name}'s screen is on air.`,
                        });
                    }
                } catch (e) {
                    reply.send({
                        ...defaultParam,
                        text: `Error: ${e}`,
                    });
                }
            });
            server.listen(port, '0.0.0.0');
            console.log('Focus handling preparation done');
        }, 10 * 1000); // 10s
    });
};

app.whenReady().then(createWindow);