const express = require('express');
//const router = express.Router();
const puppeteer = require('puppeteer');
//var convert = express();
module.exports = function (app,bodyparser){
    app.post('/', bodyparser,(req, res) => {



        /*const browser = await puppeteer.launch({
            headless:false
        });
        const page = await browser.newPage();
        await page.goto(req.body.url,{waitUntil : "networkidle2"});
        await page.screenshot({path: 'public/'+req.body.name, fullPage:true});
        await browser.close();*/
        /*puppeteer.launch({
            headless: false
        }).then((browser) => {
            //console.log(browser);
            browser.newPage()
                .then(page => page.goto(req.body.url, {waitUntil: "networkidle2"})
                    .then(resp => page.screenshot({path: 'public/' + req.body.name, fullPage: true})
                        .then(buffer => {
                            browser.close();
                            //convert.use(express.static('public'));
                            res.header("Access-Control-Allow-Origin", "*");
                            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                            res.send('http://localhost:3000/' + req.body.name)
                        })))
        }, (err) => {
            console.error(err);
            res.status(500);
        });*/
        console.log(req);
        res.status(200).send(req);


    });


}

/* POST a url and name of file to get a png convert of it*/

