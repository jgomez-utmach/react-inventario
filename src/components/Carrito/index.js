import React, { useState, useEffect } from 'react';

const Carrito = ({ nombreProducto, pvp, cantidadProduct, updateOrder, removeOrder, stock }) => {
  const [cantidad, setCantidad] = useState(cantidadProduct);
  const [precioTotal, setPrecioTotal] = useState(pvp * cantidadProduct);
  console.log('client:Carrito\n', 'stock: ', stock);

  const actualizarCompra = (event) => {
    let newCantidad = parseInt(event.target.value);
    if (newCantidad > stock) {
      newCantidad = stock;
    }
    setCantidad(newCantidad);
    setPrecioTotal(newCantidad * pvp);
    updateOrder(nombreProducto, newCantidad);
  };

  const eliminarProducto = () => {
    removeOrder(nombreProducto);
  };

  useEffect(() => {
    setCantidad(cantidadProduct); // Aquí se actualiza cantidad cuando cambia cantidadProduct
    setPrecioTotal(cantidadProduct * pvp);
  }, [cantidadProduct, pvp]);

  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <h5>{nombreProducto}</h5>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <input type="number" min="1" max={stock} value={cantidad} onChange={actualizarCompra} />
        <p style={{ fontWeight: 'bold' }}>$ {precioTotal}</p>
      </div>
      <button style={{ border: 'none', background: '#b11c0c', width: '150px', alignSelf: 'flex-end', borderRadius: '10px' }} onClick={eliminarProducto}>
        Eliminar
      </button>
    </div>
  );
};

export default Carrito;
