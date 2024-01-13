import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

const carpetaDescargas = require('os').homedir() + '/Downloads';

const csvToArray = async (req, res) => {
  const { fileName } = req.body;
  const results = [];
  try {
    // Asegúrate de que se proporciona el nombre del archivo
    if (!fileName) {
      res.status(400).json({ error: 'No se proporcionó el nombre del archivo' });
      return;
    }
    // Construye la ruta completa al archivo
    const filePath = path.join(carpetaDescargas, `${fileName}.csv`);

    // Verifica si el archivo existe, si no, crea uno
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
      res.status(200).json(results);
      return;
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.status(200).json(results);
      })
      .on('error', (error) => {
        res.status(500).json('1. Error durante conversión CSV a Array: ' + error);
      });
  } catch (error) {
    res.status(500).json('2. Error al convertir CSV a Array: ' + error);
  }
};

export default csvToArray;
