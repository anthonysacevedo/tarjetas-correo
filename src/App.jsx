import React, { useState } from 'react';
import Formulario from './Formulario';
import TarjetaPreview from './TarjetaPreview';
import generarPDF from './generarPDF';
import './index.css';

const App = () => {
  const [datos, setDatos] = useState(null);

  const handleSubmit = (formData) => {
    setDatos(formData);
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
      }}
    >
      {/* Formulario a la izquierda */}
      <div style={{ flex: 1, minWidth: '320px' }}>
        <h1 style={{ marginBottom: '2rem' }}>Generador de Tarjetas</h1>
        <Formulario onSubmit={handleSubmit} />
      </div>

      {/* Previsualización + botón a la derecha */}
      <div
        style={{
          flex: 1,
          minWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {datos ? (
          <>
            <TarjetaPreview datos={datos} />
            <button
              onClick={generarPDF}
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#3f51b5',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#303f9f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3f51b5')}
            >
              Descargar PDF
            </button>
          </>
        ) : (
          <p style={{ color: '#666' }}>Complete el formulario para ver la previsualización</p>
        )}
      </div>
    </div>
  );
};

export default App;
