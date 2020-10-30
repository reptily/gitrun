const fs = require('fs');

class Route
{
    constructor(app, api, web) {
        this.app = app;
        this.apiRoute(api);
        this.webRoute(web);
    }

    apiRoute(routes) {
        routes.forEach( route => {
            let controllers = require('../http/controller/' + route.controller + '.js');
            let action = (new controllers)[route.action];
            this.app.post(route.url, (req, res) => {
                new Promise(resolve => {
                    let result = action(req.body);
                    resolve(result);
                }).then( result => {
                    res.send(result);
                }).catch( error => {
                    res.send({error: error, request: req.body})
                })
            });
        });
    }

    webRoute(routes) {
        routes.forEach( route => {
            let view = fs.readFileSync(route.view, 'utf-8');
            this.app.get(route.url, (req, res) => {
                res.send(view);
            });
        });
    }
}

module.exports = Route;