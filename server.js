const express = require('express')
const app = express()
const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const { infoLenguajes } = require('./src/lenguajesFrontBack');
let miJson = JSON.stringify(infoLenguajes);

//console.log(infoLenguajes.frontend[1])

console.log(typeof infoLenguajes)
console.log(typeof miJson)
//console.log(miJson)

//console.log(infoLenguajes)


//GET que accede a la raiz
app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo! Bienvenido al server con express!</h1>')
})

app.get('/api', (req, res) => {
    console.log("entrando a api")
    res.send('<h1> ENTRANDO EN /API</h1>')
})

app.get('/api/lenguajes/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(infoLenguajes));
})

app.get('/api/lenguajes/frontend', (req, res) => {
    //res.send(infoLenguajes.frontend);
    res.send(JSON.stringify(infoLenguajes.frontend));
})

app.get('/api/lenguajes/backend', (req, res) => {
    res.send(JSON.stringify(infoLenguajes.backend));
})


app.get('/api/lenguajes/frontend/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.frontend.filter(
        //(lenguajes) => { lenguajes.nombre === lenguaje }
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )

    if (filtrado.length === 0) {
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }

    res.status(200).send(filtrado);
})

app.get('/api/lenguajes/backend/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    const filtrado = infoLenguajes.backend.filter(nombre => nombre.nombre.toLocaleLowerCase() === lenguaje);

    if (filtrado.length === 0) {
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }
    res.status(200).send(filtrado);
})


app.get('/api/lenguajes/frontend/turno/:turno', (req, res) => {
    const turnoParam = req.params.turno.toLocaleLowerCase();
    const filtrado = infoLenguajes.frontend.filter(lenguaje => {
        return lenguaje.turno && lenguaje.turno.toLocaleLowerCase() === turnoParam;
    });

    // Si no se encuentra ningún lenguaje, enviar un mensaje de error
    if (filtrado.length === 0) {
        return res.status(404).send({ mensaje: 'No se encontraron lenguajes de frontend para el turno especificado' });
    }

    res.send(filtrado);
})


app.get('/api/lenguajes/backend/turno/:turno', (req, res) => {
    const turnoParam = req.params.turno.toLocaleLowerCase();
    const filtrado = infoLenguajes.backend.filter(lenguaje => {
        return lenguaje.turno && lenguaje.turno.toLocaleLowerCase() === turnoParam;
    });

    // Si no se encuentra ningún lenguaje, enviar un mensaje de error
    if (filtrado.length === 0) {
        return res.status(404).send({ mensaje: 'No se encontraron lenguajes de backend para el turno especificado' });
    }

    res.send(filtrado);
})

app.get('/api/lenguajes/frontend/alumnos/:cantidadAlumnos', (req,res) => {
    let cantidadParam = parseInt(req.params.cantidadAlumnos, 10);
    const filtrado = infoLenguajes.frontend.filter(valor => valor.cantidadAlumnos >= cantidadParam)

    if(isNaN(cantidadParam)){
        return res.status(400).send(`El valor ingresado no es un numero`)
    }

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontraron lenguajes de frontend con ${cantidadParam} alumnos`);
    }

    res.status(200).send(filtrado);    
})

app.get('/api/lenguajes/backend/alumnos/:cantidadAlumnos', (req, res) => {
    let cantidadParam = parseInt(req.params.cantidadAlumnos, 10);
    const filtrado = infoLenguajes.backend.filter(valor => valor.cantidadAlumnos >= cantidadParam)

    if (isNaN(cantidadParam)) {
        return res.status(400).send(`El valor ingresado no es un numero`)
    }

    if (filtrado.length === 0) {
        return res.status(404).send(`No se encontraron lenguajes de backend con ${cantidadParam} alumnos`);
    }

    res.status(200).send(filtrado);
})

app.get('/api/lenguajes/alumnos/:cantidadAlumnos', (req, res) => {
    let cantidadParam = parseInt(req.params.cantidadAlumnos, 10);
    const filtradoBack = infoLenguajes.backend.filter(valor => valor.cantidadAlumnos >= cantidadParam);
    const filtradoFront = infoLenguajes.frontend.filter(valor => valor.cantidadAlumnos >= cantidadParam);

    const joinLenguajes = filtradoBack.concat(filtradoFront);

    if (isNaN(cantidadParam)) {
        return res.status(400).send(`El valor ingresado no es un numero`)
    }

    if (joinLenguajes.length === 0) {
        return res.status(404).send(`No se encontraron lenguajes con ${cantidadParam} alumnos`);
    }

    res.status(200).send(joinLenguajes);
})








app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});
