import React, { useState, useEffect } from 'react';
import useProductos from 'hooks/useData';
import ProductItem from 'components/ProductItem';
import Carrito from 'components/Carrito';

const Venta = () => {
  const { data: productos, modificarData } = useProductos('productos');
  const { agregarData: agregarVenta } = useProductos('ventas');
  const [compras, setCompras] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarCarrito = (nombreProducto, pvp, stock) => {
    setCompras((prevCompras) => {
      const productoExistente = prevCompras.find((item) => item.nombre === nombreProducto);

      if (productoExistente) {
        // Si el producto ya existe en el carrito, incrementamos su cantidad
        // pero no permitimos que exceda el stock
        return prevCompras.map((item) => (item.nombre === nombreProducto ? { ...item, cantidad: Math.min(item.cantidad + 1, stock) } : item));
      } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        return [...prevCompras, { nombre: nombreProducto, pvp: pvp, cantidad: 1, stock: stock }];
      }
    });
  };

  const updateOrder = (id, cantidad) => {
    const newOrder = [...compras];
    const index = newOrder.findIndex((item) => item.nombre === id);
    newOrder[index].cantidad = cantidad;
    setCompras(newOrder);
  };

  const removeOrder = (id) => {
    const newOrder = compras.filter((item) => item.nombre !== id);
    setCompras(newOrder);
  };

  useEffect(() => {
    const total = compras.reduce((acumulador, producto) => {
      return acumulador + producto.pvp * producto.cantidad;
    }, 0);
    setTotal(total);
  }, [compras]);

  const finalizarCompra = () => {
    const now = new Date().toLocaleString();
    // eslint-disable-next-line no-unused-vars
    const comprasConId = compras.map(({ stock, ...compra }) => ({
      ...compra,
      id: now,
    }));
    agregarVenta(comprasConId);
    updateData();
    setCompras([]);
  };
  /* nuevoArray contendrá TODOS los productos con el stock actualizado
  const updateData = () => {
    const nombresCompras = new Set(compras.map((compra) => compra.nombre));
    const nuevoArray = productos.map((producto) => {
      if (nombresCompras.has(producto.nombreProducto)) {
        const compraCorrespondiente = compras.find((compra) => compra.nombre === producto.nombreProducto);
        return { ...producto, stock: producto.stock - compraCorrespondiente.cantidad };
      }
      return producto;
    });
    modificarData(nuevoArray);
    console.log('client:venta:updateData\n', nuevoArray);
  };*/

  // newData contendrá SOLO los productos de las compras con el stock actualizado en un objeto clave valor
  const updateData = () => {
    const comprasObj = compras.reduce((obj, compra) => ({ ...obj, [compra.nombre]: compra.cantidad }), {});
    const newData = productos
      .filter((producto) => Object.prototype.hasOwnProperty.call(comprasObj, producto.nombreProducto))
      .reduce((obj, producto) => {
        return {
          ...obj,
          [producto.nombreProducto]: { ...producto, stock: producto.stock - comprasObj[producto.nombreProducto] },
        };
      }, {});
    modificarData(newData);
    console.log('client:venta:updateData\n', newData);
  };

  // Determinar si el botón debe estar desactivado
  const isBotonDesactivado = compras.length === 0;

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', margin: '40px 10px' }}>
        <ul style={{ display: 'flex', flexFlow: 'wrap', gap: '10px', justifyContent: 'center', width: '75%', padding: '0' }}>
          {productos.map(
            (producto) =>
              producto.stock > 0 && (
                <li key={producto.nombreProducto} style={{ listStyle: 'none' }}>
                  <ProductItem nombreProducto={producto.nombreProducto} pvp={producto.pvp} agregarCarrito={agregarCarrito} stock={producto.stock} />
                </li>
              )
          )}
        </ul>
        <div style={{ display: 'flex', flexFlow: 'column', minWidth: '24%', position: 'fixed', top: '40px', right: '10px', height: '90vh', width: '20%', overflowX: 'hidden', borderRadius: '10px' }}>
          <ul style={{ height: '80%', padding: '15px 20px', listStyle: 'none', overflowY: 'scroll', background: '#e5e4e5', display: 'flex', flexFlow: 'column', gap: '20px' }}>
            {compras.map((producto) => (
              <li key={producto.nombre}>
                <Carrito nombreProducto={producto.nombre} pvp={producto.pvp} cantidadProduct={producto.cantidad} updateOrder={updateOrder} removeOrder={removeOrder} stock={producto.stock} />
              </li>
            ))}
          </ul>
          <div style={{ height: '20%', background: '#f1e18f', display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h4>Total: ${total}</h4>
            <button onClick={finalizarCompra} disabled={isBotonDesactivado} style={{ border: 'none', background: 'green', height: '35px', width: '80%', borderRadius: '10px', margin: '0 20px' }}>
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Venta;
