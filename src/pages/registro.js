import FormRegistro from 'components/FormRegistro';
import useProductos from 'hooks/useData';
import styles from '../styles/registro.module.css';

export default function Home() {
  const { agregarData: agregarProducto, data: productos, loading, error } = useProductos('productos');
  return (
    <div className={styles.fullContainer}>
      <div className={styles.containerComponent}>
        <FormRegistro agregarProducto={agregarProducto} error={error} />
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <ul>
          {productos.map((producto) => (
            <li key={producto.nombreProducto}>
              {producto.nombreProducto} - {producto.pvp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
