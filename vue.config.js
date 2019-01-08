const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const auth = require('./auth.json');

const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');

module.exports = {
    baseUrl: '/',
    chainWebpack: config => {
        // vue inspect --plugins
        config
            .entry('app')
            .add('animate.css/animate.min.css')
            .add('ionicons/dist/css/ionicons.min.css')
        ;
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@config':  path.resolve(__dirname, 'config'),
            }
        },
        plugins:[
            new webpack.DefinePlugin({
                'DISCORD_TOKEN': JSON.stringify(auth.discord.token),
                'DISCORD_GUILD_ID': JSON.stringify(auth.discord.guild_id),
            }),
            new JsonSassPlugin('./config/theme.js', './config/theme.scss'),
        ]
    }
};