import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import Navbar from "../../assets/views/common/Navbar";
import axios from "axios";

function Controller() {
  const [appartements, setAppartements] = useState([]);
  const [selectedAppartement, setSelectedAppartement] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/appartements') 
      .then(response => {
        setAppartements(response.data);
      })
      .catch(error => {
        console.error('Error fetching appartements:', error);
      });
  }, []);

  const handleEditClick = (appartement) => {
    setSelectedAppartement(appartement);
  };

  const handleSaveChanges = () => {
    // Update the selected appartement on the server
    axios.put(`http://localhost:3000/api/appartements/${selectedAppartement._id}`, {
      address: document.getElementById('address').value,
      prix: document.getElementById('prix').value,
      room: document.getElementById('room').value,
    })
      .then(response => {
        const updatedAppartements = appartements.map(app => (app._id === response.data._id ? response.data : app));
        setAppartements(updatedAppartements);
        setSelectedAppartement(null); 
      })
      .catch(error => {
        console.error('Error updating appartement:', error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-around d-grid gap-4">
        <div>
          {/* <div className="form-group has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Search" />
          </div> */}
          <table style={{ width: "100%", marginTop: "100px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Number</th>
                <th>Address</th>
                <th>Prix</th>
                <th>Room</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appartements.map((appartement, index) => (
                <tr key={appartement._id}>
                  <td scope="row">{index + 1}</td>
                  <td>{appartement.address}</td>
                  <td>{appartement.prix}</td>
                  <td>{appartement.room}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      style={{ margin: "2px" }}
                      onClick={() => handleEditClick(appartement)}
                    >
                      EDIT
                    </button>
                    <button
                    className="btn btn-danger"
                    style={{ margin: "2px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal show={selectedAppartement !== null} onHide={() => setSelectedAppartement(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appartement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppartement && (
            <Form>
              <Form.Group controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control type="text" defaultValue={selectedAppartement.address} />
              </Form.Group>
              <Form.Group controlId="prix">
                <Form.Label>Prix:</Form.Label>
                <Form.Control type="text" defaultValue={selectedAppartement.prix} />
              </Form.Group>
              <Form.Group controlId="room">
                <Form.Label>Room:</Form.Label>
                <Form.Control type="text" defaultValue={selectedAppartement.room} />
              </Form.Group>
              <Button variant="primary" type="button"  onClick={handleSaveChanges}>
                Save changes
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedAppartement(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Controller;
