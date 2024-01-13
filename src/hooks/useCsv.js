import { useState, useEffect } from 'react';
import axios from 'axios';

function useCsv(fileName) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const csvToArray = async () => {
      try {
        const response = await axios.post('/api/read-csv', { fileName });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    csvToArray();
  }, [fileName]);

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

  return { data, setData, loading, error, guardarCSV };
}
export default useCsv;
