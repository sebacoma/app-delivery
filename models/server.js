const express = require('express')

class Server {
    constructor(){
        this.app = express();
        this.port = 8080;
        this.server = require('http').createServer(this.app)
    }
}