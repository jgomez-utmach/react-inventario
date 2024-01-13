import useCsv from './useCsv';

const useData = (fileName) => {
  const { data, setData, loading, error, guardarCSV } = useCsv(fileName);

  if (error) {
    console.log('client:useData\n' + error);
  }

  const agregarData = (item) => {
    const items = Array.isArray(item) ? item : [item];
    const newProducts = [...data, ...items];
    setData(newProducts);
    guardarCSV(newProducts);
  };

  const eliminarData = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  /* recibe un array con solo los elementos a modificar
  const modificarData2 = (nuevoItem) => {
    const items = Array.isArray(nuevoItem) ? nuevoItem : [nuevoItem];
    setData(data.map((objA) => {
      const objB = items.find(item => item.nombreProducto === objA.nombreProducto);
      return objB ? objB : objA;
    }));
  };*/

  const modificarData = (nuevoItem) => {
    //recibe un objeto de tipo clave valor
    const newData = data.map((objA) => nuevoItem[objA.nombreProducto] || objA);
    setData(newData);
    guardarCSV(newData);
  };

  return {
    data,
    agregarData,
    eliminarData,
    modificarData,
    loading,
    error,
  };
};

export default useData;
