import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/Detail.css';
import Navbar from '../../assets/views/common/Navbar.jsx';
import jsPDF from 'jspdf';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
    console.error('Error caught by error boundary:', error, errorInfo);
    setHasError(true);
  };

  return hasError ? (
    <div>Something went wrong. Please try again later.</div>
  ) : (
    <div onError={handleError}>{children}</div>
  );
};

const Detail = () => {
  const [paiements, setPaiements] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/paiements/${id}`)
      .then(response => {
        console.log(response.data);
        setPaiements(response.data);
      })
      .catch(error => {
        console.error('Error fetching payments:', error.response.data);
      });
  }, [id]);

  const downloadPDF = (payment) => {
    if (!payment) {
      console.error('Payment information is undefined.');
      return;
    }

    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text('Facture', 20, 10);

    pdf.setFontSize(12);
    pdf.text('Invoice Number:' + payment.appartement._id, 20, 20);
    pdf.text('Date: ' + new Date().toLocaleDateString(), 20, 30);

    pdf.setLineWidth(0.5);
    pdf.line(20, 40, 190, 40);
    pdf.text('Address', 30, 50);
    pdf.text('Nom complet', 100, 50);
    pdf.text('Price', 140, 50);
    pdf.line(20, 60, 190, 60);

    const invoiceItems = [
      { description: payment.appartement.address, nom: payment.client.nom, prenom: payment.client.prenom, Price: payment.appartement.prix },
    ];

    let yPos = 70;
    invoiceItems.forEach((item, index) => {
      pdf.text(item.description, 30, yPos);
      pdf.text(item.nom + ' ' + item.prenom, 100, yPos);
      pdf.text('$' + item.Price.toFixed(2), 140, yPos);
      yPos += 10;
    });

    const total = invoiceItems.reduce((sum, item) => sum + item.Price, 0);

    pdf.text('Total: $' + total.toFixed(2), 120, yPos + 10);

    pdf.save(`invoice_${payment.appartement._id}.pdf`);
  };

  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <div className="table1">
          <h2>Historique</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Client</th>
                <th scope="col">Prix</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Facture</th>
              </tr>
            </thead>
            <tbody>
              {paiements.map((payment, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{payment.appartement.address}</td>
                  <td>{`${payment.client.nom} ${payment.client.prenom}`}</td>
                  <td>{payment.appartement.prix}</td>
                  <td>{payment.date}</td>
                  <td>{payment.appartement.status}</td>
                  <td>
                    <button className="btn btn-info" onClick={() => downloadPDF(payment)}>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Detail;
