import useSaveForm from '../../hooks/useSaveForm';

const FormVenta = ({ agregarProducto }) => {
  const initialState = {
    nombreProducto: '',
    costoUnitario: '',
    pvp: '',
    stock: '',
    cantidadMinima: '',
    cantidadDescuento: '',
    activarDescuento: false,
  };

  const { formData, handleInputChange, handleSubmit } = useSaveForm(initialState, agregarProducto);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del producto:
        <input type="text" name="nombreProducto" value={formData.nombreProducto} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Costo unitario:
        <input type="number" name="costoUnitario" value={formData.costoUnitario} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        PVP:
        <input type="number" name="pvp" value={formData.pvp} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Stock:
        <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Cantidad mínima para volver a pedir producto:
        <input type="number" name="cantidadMinima" value={formData.cantidadMinima} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Cantidad de descuento:
        <input type="number" name="cantidadDescuento" value={formData.cantidadDescuento} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        Activar descuento:
        <select name="activarDescuento" value={formData.activarDescuento ? 'SI' : 'NO'} onChange={handleInputChange}>
          <option value="SI">SI</option>
          <option value="NO">NO</option>
        </select>
      </label>
      <br />
      <button type="submit">Registrar producto</button>
    </form>
  );
};

export default FormVenta;
