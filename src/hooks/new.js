import { useState } from 'react';
const fileName = 'products';

const MiComponente = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const guardarCSV = (newProducts) => {
    setLoading(true);
    fetch('/api/export-csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: newProducts, name: fileName }),
    })
      .then((response) => response.json())
      .then((message) => {
        console.log('client:useCsv\n' + message);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const agregarData = (item) => {
    const items = Array.isArray(item) ? item : [item];
    const newProducts = [...data, ...items];
    setData(newProducts);
    guardarCSV(newProducts);
  };
  const enviar = () => {
    agregarData({ nombreProducto: 'hola' });
  };
  return (
    <>
      <button onClick={enviar}>Enviar</button>
    </>
  );
};

export default MiComponente;
