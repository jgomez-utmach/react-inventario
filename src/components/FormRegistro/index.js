import useSaveForm from '../../hooks/useSaveForm';
import styles from './styles.module.css';

const FormRegistro = ({ agregarProducto }) => {
  const initialState = {
    nombreProducto: '',
    urlImage: '',
    costoUnitario: '',
    pvp: '',
    stock: '',
    cantidadMinima: '',
    cantidadDescuento: '',
    activarDescuento: false,
  };
  const { formData, handleInputChange, handleSubmit } = useSaveForm(initialState, agregarProducto);

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <label className={styles.campo}>
        Nombre del producto:
        <input type="text" name="nombreProducto" value={formData.nombreProducto} onChange={handleInputChange} required />
      </label>
      <label className={styles.campo}>
        URL del producto:
        <input type="text" name="urlImage" value={formData.urlImage} onChange={handleInputChange} required />
      </label>
      <section>
        <label className={styles.campo}>
          Costo unitario:
          <input type="number" name="costoUnitario" value={formData.costoUnitario} onChange={handleInputChange} required />
        </label>
        <label className={styles.campo}>
          PVP:
          <input type="number" name="pvp" value={formData.pvp} onChange={handleInputChange} required />
        </label>
        <label className={styles.campo}>
          Stock:
          <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
        </label>
        <label className={styles.campo}>
          Cantidad mínima permitida:
          <input type="number" name="cantidadMinima" value={formData.cantidadMinima} onChange={handleInputChange} required />
        </label>
        <label className={styles.campo}>
          Cantidad de descuento:
          <input type="number" name="cantidadDescuento" value={formData.cantidadDescuento} onChange={handleInputChange} required />
        </label>
        <label className={styles.campo}>
          Activar descuento:
          <select name="activarDescuento" value={formData.activarDescuento ? 'SI' : 'NO'} onChange={handleInputChange}>
            <option value="SI">SI</option>
            <option value="NO">NO</option>
          </select>
        </label>
      </section>
      <button type="submit">Registrar producto</button>
    </form>
  );
};

export default FormRegistro;
