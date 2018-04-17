const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const convert = express();
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const model = require('../models/index');

convert.use(cors());
//convert.use(express.static('public/'));
/* POST a url and name of file to get a png convert of it*/
convert.post('/', async function (req, res) {
    try {
        const browser = await puppeteer.launch({
            headless: false
        });
        const title = Date.now();
        const page = await browser.newPage();
        await page.goto(req.body.url, {waitUntil: "networkidle2"});
        await page.screenshot({path: 'public/' + title + '.png', fullPage: true});
        await browser.close();
        const screenshot = await model.Screenshot.create({
            title
        });

        await res.sendStatus(201,{
            error: false,
            data: `${config.routes.backend.host}:${config.routes.backend.port}/download/${title}.png`,
            message: 'New Screenshot has been created.'

        });


    } catch (err) {
        console.error(err);
        res.status(500);
    }
});


module.exports = convert;

