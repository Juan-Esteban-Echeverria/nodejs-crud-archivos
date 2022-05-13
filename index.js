const http = require('http')
const url = require('url')
const fs = require("fs")


const server = http.createServer((req, res) => {
    const params = url.parse(req.url, true).query

    if(req.url.includes('/crear')){
        const {archivo, contenido} = params
        if(archivo == '' || contenido == '') return res.end("Error al crear el archivo: Campo vacio")
        return fs.writeFile(`archivos/${archivo}.txt`, contenido, () => {
            return res.end("Archivo creado con exito", null)
        })
    }

    if(req.url.includes('/leer')){
        const {archivo} = params
        return fs.readFile(`archivos/${archivo}.txt`, (err, data) => {
            if(err) return res.end("No se pudo leer el archivo: Archivo no encontrado", null)
            return res.end(data, null)
        })
    }

    if(req.url.includes('/renombrar')){
        const {nombre, nuevoNombre} = params
        return fs.rename(`archivos/${nombre}.txt`, `archivos/${nuevoNombre}.txt`, (err) => {
            if(err) return res.end("No se pudo renombrar el archivo: Archivo no encontrado", null)
            return res.end("Archivo renombrado con exito")
        })
    }

    if(req.url.includes('/eliminar')){
        const {archivo} = params
        return fs.unlink(`archivos/${archivo}.txt`, (err) => {
            if(err) return res.end("No se pudo eliminar el archivo: Archivo no encontrado", null)
            return res.end("Se elimino el archivo con exito")
        })
    }


    // leer index
    if(req.url.includes('/')){
        return fs.readFile('index.html', (err, data) => {
            if(err) return res.end("No se pudo leer los archivos", null)
            return res.end(data, null)
        })
    }

     res.end('Pagina no encontrada')
})

const puerto = 8080
server.listen(puerto, () => {
    console.log("servidor activo " + puerto)
})