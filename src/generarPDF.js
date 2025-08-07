import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generarPDF = async () => {
  const input = document.getElementById('preview-a-imprimir');

  if (!input) {
    alert('No se encontró el contenido para exportar.');
    return;
  }

  // Esperar a que todo esté bien pintado
  await new Promise((resolve) => setTimeout(resolve, 200));

  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    unit: 'pt',
    format: 'a4',
    orientation: 'portrait'
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();   // 595 pt
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 842 pt

  // Convertir pixeles a puntos (pt) con escala 72/96 (DPI)
  const imgWidth = canvas.width * (72 / 96);
  const imgHeight = canvas.height * (72 / 96);

  // Limites máximos para la imagen en el PDF (90% del área para evitar bordes)
  const maxPdfWidth = pdfWidth * 0.9;
  const maxPdfHeight = pdfHeight * 0.9;

  let renderWidth = imgWidth;
  let renderHeight = imgHeight;

  // Ajustar tamaño manteniendo proporción para que quepa dentro del área permitida
  if (renderWidth > maxPdfWidth) {
    renderHeight = (renderHeight * maxPdfWidth) / renderWidth;
    renderWidth = maxPdfWidth;
  }
  if (renderHeight > maxPdfHeight) {
    renderWidth = (renderWidth * maxPdfHeight) / renderHeight;
    renderHeight = maxPdfHeight;
  }

  // Centrar la imagen en la página
  const posX = (pdfWidth - renderWidth) / 2;
  const posY = (pdfHeight - renderHeight) / 2;

  pdf.addImage(imgData, 'PNG', posX, posY, renderWidth, renderHeight);
  pdf.save('tarjetas.pdf');
};

export default generarPDF;
