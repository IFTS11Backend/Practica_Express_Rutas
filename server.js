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

app.get('/api/lenguajes/frontend/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje.toLocaleLowerCase();
    console.log(` el lenguaje que recibe por parametro es: ${lenguaje}`)
    const filtrado = infoLenguajes.frontend.filter(
        //(lenguajes) => { lenguajes.nombre === lenguaje }
        lenguajes => lenguajes.nombre.toLocaleLowerCase() === lenguaje
    )

    if(filtrado.length === 0){
        return res.status(404).send(`No se encontró el curso con lenguaje: ${lenguaje}`)
    }

    res.status(200).send(filtrado);

})


app.listen(PORT, HOSTNAME, () => {
    console.log(`El servidor está corriendo en http://${HOSTNAME}:${PORT}/`);
});
