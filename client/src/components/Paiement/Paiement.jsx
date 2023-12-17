// PaymentForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [apartments, setApartments] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    const fetchApartmentsAndClients = async () => {
      try {
        const apartmentsResponse = await axios.get('http://localhost:3000/api/apartments');
        const clientsResponse = await axios.get('http://localhost:3000/api/clients');

        setApartments(apartmentsResponse.data);
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApartmentsAndClients();
  }, []);

  const Payment = async () => {
    try {
      const paymentResponse = await axios.post('http://localhost:3000/api/payments', {
        apartmentId: selectedApartment,
        clientId: selectedClient,
      });

      console.log('Payment created:', paymentResponse.data);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <label>
        Select Apartment:
        <select
          value={selectedApartment}
          onChange={(e) => setSelectedApartment(e.target.value)}
        >
          <option value="">Select an apartment</option>
          {apartments.map((apartment) => (
            <option key={apartment._id} value={apartment._id}>
              {apartment.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Client:
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Select a client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={Payment}>Create Payment and Generate PDF</button>
    </div>
  );
};

export default PaymentForm;
