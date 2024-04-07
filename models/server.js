const express = require('express')
const cors = require('cors');
const logger = require('morgan');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)



        this.paths = {
            auth: '/api/auth',
            user: '/api/user'
        }

        //Connect to data

        //middleware
        this.middlewares();

        //routes
        this.routes();
    }



    async dbConnection() {

    }

    middlewares() {
        
        this.app.use(logger('dev'));

        this.app.use(cors());
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authRoutes'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('server running,', this.port)
        })
    }
}

module.exports = Server;