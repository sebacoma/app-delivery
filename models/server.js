const express = require('express')
const cors = require('cors');
const logger = require('morgan');
const db = require('../db/connection');
const Role = require('./role');
const User = require('./user');

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
        this.dbConnection();
        //middleware
        this.middlewares();

        //routes
        this.routes();
    }



    async dbConnection() {
        try {
            await db.authenticate();
            await Role.sync({force: false});
            await User.sync({force: false});
            console.log('Database online');
        } catch (error) {
            console.log(error);
        }
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