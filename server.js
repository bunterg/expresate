'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Good = require('good');
const Vision = require('vision');
const Hoek = require('hoek');
var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL||'mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('habemus mongo');
});

// Local dependencies
const main = require('./routes/main');
const files = require("./routes/files");

const Config = {};
const ConnectionConfig = { 
    host: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 3000
};
const ServerConfig = [{
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, {
    register: Vision
}, {
    register:Inert
}];
const ViewEngineConfig = {
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './templates',
    layoutPath: './templates/layout',
    layout: true,
    helpersPath: './templates/helpers'
};

const server = new Hapi.Server(Config);

server.connection(ConnectionConfig);

server.register(ServerConfig, (err) => {
    Hoek.assert(!err, err);
    server.views(ViewEngineConfig);
    
    server.route(main);
    server.route(files);
    
    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
