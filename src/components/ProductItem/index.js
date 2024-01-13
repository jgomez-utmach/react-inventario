import Image from 'next/image';
import styles from './style.module.css';

const ProductItem = ({ nombreProducto, pvp, stock, agregarCarrito }) => {
  const handleAgregarCarrito = () => {
    agregarCarrito(nombreProducto, pvp, stock);
  };

  const img = 'https://i.etsystatic.com/11344464/r/il/c7848f/1556154626/il_570xN.1556154626_bb0w.jpg';

  return (
    <div className={styles.card_container}>
      <div className={styles.img_container} style={{ position: 'relative' }}>
        <Image src={img} alt={nombreProducto} fill={true} sizes="250px" style={{ objectFit: 'cover' }} />
      </div>
      <div className={styles.info_container}>
        <div className={styles.item}>
          <h5> {nombreProducto} </h5>
        </div>
        <div className={styles.sell}>
          <p>$ {pvp}</p>
          <button onClick={handleAgregarCarrito}> Comprar </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
/*
  <div className="card" style={{ width: '250px', height: '300px' }}>
    <div className="card-img-top" style={{ position: 'relative', height: '150px' }}>
      <Image src={img} alt={nombreProducto} fill={true} sizes="250px" style={{ objectFit: 'cover' }} />
    </div>
    <div className="card-body">
      <h5 className="card-title text-wrap" style={{ maxHeight: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {nombreProducto}
      </h5>
      <p className="card-text">Precio {pvp}</p>
      <button className="btn btn-primary" onClick={handleAgregarCarrito}>
        Comprar
      </button>
    </div>
  </div>
*/
