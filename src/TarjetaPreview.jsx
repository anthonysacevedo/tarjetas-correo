import React, { useRef, useEffect, useState } from 'react';
import './TarjetaPreview.css';

const CM_TO_PX = 37.8;
const MIN_HEIGHT_CM = 8;
const MIN_WIDTH_CM = 6;
const PROPORCION = MIN_WIDTH_CM / MIN_HEIGHT_CM;

const TarjetaPreview = ({ datos }) => {
  const tarjetaRef = useRef(null);
  const [dimensiones, setDimensiones] = useState({
    altura: MIN_HEIGHT_CM * CM_TO_PX,
    ancho: MIN_WIDTH_CM * CM_TO_PX,
  });

  useEffect(() => {
    if (tarjetaRef.current) {
      const alturaReal = tarjetaRef.current.scrollHeight;
      const alturaFinal = Math.max(alturaReal, MIN_HEIGHT_CM * CM_TO_PX);
      const anchoFinal = alturaFinal * PROPORCION;
      setDimensiones({ altura: alturaFinal, ancho: anchoFinal });
    }
  }, [datos]);

  if (!datos) return null;

  const style = {
    height: dimensiones.altura + 'px',
    width: dimensiones.ancho + 'px',
  };

  return (
    <div id="preview-a-imprimir" className="tarjetas-preview">
      {/* TARJETA FRENTE */}
      <div className="tarjeta frente" ref={tarjetaRef} style={style}>
        <p className="situacion">Situación</p>
        <p className="rol">{datos.rol}</p>
        <p className="instruccion">
          Lee atentamente la situación, sin comentarla en voz alta, imagina cómo representarla y acción 🎬
        </p>
        <div className="desarrollo-container">
          <div className="desarrollo-texto">{datos.desarrollo}</div>
        </div>
        <p className="tema">{datos.tema}</p>
      </div>

      {/* TARJETA DORSO */}
      <div className="tarjeta dorso" style={style}>
        <div className="claqueta-container">
          <img
            src="/claqueta.png"
            alt="Claqueta de cine"
            className="claqueta-img"
          />
        </div>
        <p className="correo-roleplay">
          <span className="correo">CORREO</span>
          <span className="roleplay">RolePlay</span>
        </p>
      </div>
    </div>
  );
};

export default TarjetaPreview;
