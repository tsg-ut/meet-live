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
import localtunnel from 'localtunnel';

const server = fastify({ logger: true });
server.register(formbody);

const createWindow = () => {
    const width = 960;
    const height = 720; // Minimum height to get HD quality
    const win = new BrowserWindow({
        width, height,
        title: 'TSG LIVE!',
        transparent: false,
        frame: false,
        webPreferences: {
            preload: focusJS,
            backgroundThrottling: false,
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
                    } else if (text === 'mute') {
                        contents.setAudioMuted(true);
                        reply.send({
                            ...defaultParam,
                            text: 'ミュートにしたよ〜',
                        });
                    } else if (text === 'unmute') {
                        contents.setAudioMuted(false);
                        reply.send({
                            ...defaultParam,
                            text: 'ミュートを解除したよ〜',
                        });
                    } else {
                        const name = (text as string).toLowerCase();
                        await contents.executeJavaScript(`focus('${name}')`);
                        const [ updatedName ] = await contents.executeJavaScript('getCurrentFocus()');
                        if (updatedName.toLowerCase() !== name) throw 'Failed';
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
            const addr = await server.listen(port, '0.0.0.0');
            console.log(`Server listening on ${addr}`);
            const tunnel = await localtunnel({ port, subdomain: process.env.LOCALTUNNEL_SUBDOMAIN! });
            console.log(`Tunnel ready on ${tunnel.url}`);
        }, 10 * 1000); // 10s
    });
};

app.commandLine.appendSwitch('high-dpi-support', '1')
app.commandLine.appendSwitch('force-device-scale-factor', '1')

app.whenReady().then(createWindow);