const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.use('/pub', express.static(path.join(__dirname, 'pub')));
app.post('/guardar', (req, res) => {
    const { fecha, hora, descripcion } = req.body;
    const ruta = `./priv/${fecha.replaceAll('-', '.')}`; 
    if (!fs.existsSync(ruta)) { 
        fs.mkdirSync(ruta, { recursive: true }); 
    }

    const contenido = `# ${descripcion}\n\nHora: ${hora}`; 
    const archivoRuta = `${ruta}/${hora.replace(':', '.')}.md`;
    fs.writeFileSync(archivoRuta, contenido); 
    const archivos = fs.readdirSync(ruta); 

    res.json({ mensaje: 'Éxito' });
});

app.delete('/eliminar', (req, res) => {
    const { fecha, hora } = req.body;
    const rutaArchivo = `./priv/${fecha.replaceAll('-', '.')}/${hora.replace(':', '.')}.md`;
    
    if (fs.existsSync(rutaArchivo)) {
        fs.unlinkSync(rutaArchivo);
    }
    res.json({ mensaje: 'Eliminado' });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));