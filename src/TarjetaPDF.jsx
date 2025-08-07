import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TarjetaPDF = () => {
  const handleDownload = async () => {
    const elemento = document.getElementById('preview-a-imprimir');

    const canvas = await html2canvas(elemento, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('tarjetas.pdf');
  };

  return (
    <button onClick={handleDownload} style={{
      marginTop: '1rem',
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>
      Descargar PDF
    </button>
  );
};

export default TarjetaPDF;
