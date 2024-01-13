import { Parser } from '@json2csv/plainjs';
const fs = require('fs');
const path = require('path');
// Carpeta de Descargas del usuario
const carpetaDescargas = require('os').homedir() + '/Downloads';

const exportToCSV = async (req, res) => {
  const { data, name } = req.body;
  // Convirtiendo Array a CSV
  const csvData = new Parser().parse(data);
  const filePath = path.join(carpetaDescargas, `${name}.csv`);
  try {
    await fs.promises.writeFile(filePath, csvData, { flag: 'w' });
    res.status(200).json('Dato guardado con éxito.');
  } catch (error) {
    if (error.code === 'EBUSY') {
      res.status(500).json('El archivo está en uso y no se pudo escribir.');
      console.error('server:exportToCSV\n' + error);
    }
    res.status(500).json('Error al guardar: ' + error);
  }
};

export default exportToCSV;
