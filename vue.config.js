require('dotenv').config();
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');

module.exports = {
    baseUrl: './',
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
                'DISCORD_TOKEN': JSON.stringify(process.env.DISCORD_TOKEN),
                'DISCORD_GUILD_ID': JSON.stringify(process.env.DISCORD_GUILD_ID),
                'DISCORD_FINDINGS_ID': JSON.stringify(process.env.DISCORD_FINDINGS_ID),
                'DISCORD_ABOUT_ID': JSON.stringify(process.env.DISCORD_ABOUT_ID),
            }),
            new JsonSassPlugin('./config/theme.js', './config/theme.scss'),
        ]
    }
};