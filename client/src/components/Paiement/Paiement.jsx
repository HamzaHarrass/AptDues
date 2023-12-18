import { useState, useEffect } from 'react';
import Navbar from '../../assets/views/common/Navbar.jsx'
import axios from 'axios';

const PaymentForm = () => {
  const [apartments, setApartments] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    const fetchApartmentsAndClients = async () => {
      try {
        const apartmentsResponse = await axios.get('http://localhost:3000/api/appartements');
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
      const paymentResponse = await axios.post('http://localhost:3000/api/paiements', {
        appartement: selectedApartment,  
        client: selectedClient,
      });
      console.log("payment : ", paymentResponse);
      console.log('Payment created:', paymentResponse.data);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <>
    <Navbar></Navbar>
      <h2 className='mb-5 mt-5'>Payment Form</h2>
      <div className= 'd-flex flex-column '>
      <label className='text-center w-25 m-auto' style={{minWidth:"300px"}}>
        Select Apartment:
        <select  className="form-control "
          value={selectedApartment}
          onChange={(e) => setSelectedApartment(e.target.value)}
        >
          <option className='text-center' value="">Select an apartment</option>
          {apartments.map((apartment) => (
            <option key={apartment._id} value={apartment._id}>
              {apartment.address}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label className='text-center w-25 m-auto' style={{minWidth:"300px"}}>
        Select Client:
        <select  className="form-control"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option className='text-center' value="">Select a client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.nom+" "+client.prenom}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button className='btn btn-primary text-center w-25 m-auto' style={{minWidth:"300px"}} onClick={Payment}>Create</button>
      </div>
    </>
  );
};

export default PaymentForm;
