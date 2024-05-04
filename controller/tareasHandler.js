import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../db/deportes.json");

export const vistaDeportes = (req, res) => {
  
    const file = fs.readFileSync(filePath, "utf-8")

    const data = JSON.parse(file);

    res.send(data)
}


export const vistaAgregar = (req, res) => {
    const { nombre, precio } = req.query

    const nuevoDeporte = {
        nombre,
        precio,
    };

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    data.deportes.push(nuevoDeporte);

    fs.writeFileSync(filePath, JSON.stringify(data));

    res.send()
}


export const vistaEditar = (req, res) => {
    const { nombre, precio } = req.query;
    
    let { deportes } = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    deportes.forEach((e) => {
        if (e.nombre === nombre) {
            e.precio = precio;
        }
    });

    fs.writeFileSync(filePath, JSON.stringify({ deportes }));

    res.send(`Precio del deporte ${nombre} actualizado.`)  
}


export const vistaEliminar = (req, res) => {
    const { nombre } = req.query;
    
    let { deportes } = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const posicion = deportes.findIndex((e) => e.nombre === nombre);

    if (posicion !== -1) {
        deportes.splice(posicion, 1);
    }

    fs.writeFileSync(filePath, JSON.stringify({ deportes }));

    res.send(`${nombre} Se elimino correctamente.`); 
}

