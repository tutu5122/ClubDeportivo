// Importamos express
import express from 'express';
// Importamos nuestro moto de plantilla
import { create } from 'express-handlebars';

// Creación de variables de entorno
import { fileURLToPath } from 'url'
import { dirname } from "path";


// Variables que me permiten mostrar el path donde estoy en el proyecto
const __filename = fileURLToPath( import.meta.url )
const __dirname = dirname( __filename )

// IMPORTAMOS NUESTRAS VISTAS
import rutaIndex from '../routes/vistaIndex.routes.js'
import rutaDeportes from '../routes/vistaDeportes.routes.js'
import rutaAgregar from '../routes/vistaAgregar.routes.js'
import rutaEditar from '../routes/vistaEditar.routes.js'
import rutaEliminar from '../routes/vistaEliminar.routes.js'


// Creamos nuestro modelo o clase de servidor

class Server {

    // Vamos a crear nuestro constructor para que ejecute 
    // Middleware
    // Rutas o Routes
    constructor(){
        // Cramos la app  de express
        this.app = express();
        this.port = process.env.PORT || 8000;

        this.Paths = {
            rootIndex:'/',
            rootAgregar:'/agregar',
            deportes:'/deportes',
            rootEditar:'/editar',
            rootEliminar:'/eliminar'
        }

        // Iniciamos nuestros metodos iniciales
        this.middlewares();
        this.routes()
    }


    middlewares(){
        this.app.use( express.json() );
        this.app.use( express.static('public') );
        this.app.use( express.urlencoded({ extended: true }));
        this.app.use('/jquery',express.static(  `${__dirname}/../node_modules/jquery/dist`  ));
    }


    routes(){
        this.app.use( this.Paths.deportes, rutaDeportes );
        this.app.use( this.Paths.rootIndex , rutaIndex );
        this.app.use( this.Paths.rootAgregar , rutaAgregar );
        this.app.use( this.Paths.rootEditar , rutaEditar );
        this.app.use( this.Paths.rootEliminar , rutaEliminar );
        
            
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        } )
    }

    initHandelbars(){

        this.hbs = create({
            partialsDir:[
                "views"
            ]
        })

        this.app.engine( "handlebars", this.hbs.engine );
        this.app.set("view engine","handlebars");
        
    }

}

export default Server;