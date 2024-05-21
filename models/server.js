const express = require('express')
const cors = require('cors');
const logger = require('morgan');
const db = require('../db/connection');
const Role = require('./role');
const User = require('./user');
const Category = require('./category');
const fileUpload = require('express-fileupload');
const Images = require("./images");
const Product = require("./products");

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app)



        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            category: '/api/category',
            upload: '/api/upload',
            product: "/api/product"
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
            await Category.sync({force: false});
            await Product.sync({force: false});
            await Images.sync({force: false});
            console.log('Database online');
        } catch (error) {
            console.log(error);
        }
    }

    middlewares() {
        
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(cors());
        
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authRoutes'));
        this.app.use(this.paths.category, require('../routes/categoryRoutes'));
        this.app.use(this.paths.user, require('../routes/userRoutes'));
        this.app.use(this.paths.upload, require('../routes/uploadRoutes'));
        this.app.use(this.paths.product, require('../routes/productRoutes'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('server running,', this.port)
        })
    }
}

module.exports = Server;