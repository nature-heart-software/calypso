declare var DISCORD_TOKEN: any;
import axios from 'axios';
export const discordApi = axios.create({
    baseURL: 'https://discordapp.com/api/',
    timeout: 10000,
    headers: {
        'Authorization': 'Bot ' + (DISCORD_TOKEN as any),
        'Content-Type': 'application/json',
    },
});
export const allowedProviders = ['YouTube'];
export default { discordApi, allowedProviders };
