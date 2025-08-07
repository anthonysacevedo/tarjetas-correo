import React, { useState } from 'react';

const Formulario = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    numero: '',
    rol: '',
    desarrollo: '',
    tema: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        Número de situación:
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Rol:
        <input
          type="text"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Desarrollo de la situación:
        <textarea
          name="desarrollo"
          value={formData.desarrollo}
          onChange={handleChange}
          rows={6}
          style={{ resize: 'none' }}
          required
        />
        <div style={{ fontSize: '0.8rem', color: '#666', textAlign: 'right' }}>
          {formData.desarrollo.length} / 300 caracteres
        </div>
      </label>

      <label>
        Tema:
        <input
          type="text"
          name="tema"
          value={formData.tema}
          onChange={handleChange}
          required
        />
      </label>

      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '6px',
          fontSize: '1rem'
        }}
      >
        Generar tarjeta
      </button>
    </form>
  );
};

export default Formulario;
