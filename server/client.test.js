const {createClient,getAllClients,getClientById,updateClient,deleteClient} = require('./controllers/clientControle');
  const Client = require('./models/Client');
  
  jest.mock('./models/Client');
  
  describe('Client Controller', () => {
    const mockClientData = {
      _id: 'mockId',
      name: 'Mock Client',
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('devrait créer un client avec les données fournies et renvoyer une réponse JSON', async () => {
        const req = {
          body: {
            // Ajoutez ici les données nécessaires pour créer un client
            // par exemple : name, email, etc.
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await createClient(req, res);
    
        // Vérifie si la méthode save du modèle Client a été appelée
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
      });
    
      it('devrait renvoyer une réponse avec un statut 400 en cas d\'erreur lors de la création du client', async () => {
        const req = {
          body: {
            // Données nécessaires pour créer un client
          },
        };
        const errorMessage = 'Une erreur s\'est produite lors de la création du client.';
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        // Simuler une erreur lors de la sauvegarde du client
        jest.spyOn(Client.prototype, 'save').mockImplementationOnce(() => {
          throw new Error(errorMessage);
        });
    
        await createClient(req, res);
    
        // Vérifie si la méthode status a été appelée avec le statut 400 et le message d'erreur
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
      });
  
  
    it('should get all clients', async () => {
      const req = {};
      const res = { json: jest.fn() };
  
      Client.find.mockResolvedValueOnce([mockClientData]);
  
      await getAllClients(req, res);
  
      expect(res.json).toHaveBeenCalledWith([mockClientData]);
    });
  
    // Test getClientById function
    it('should get a client by ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { json: jest.fn(), status: jest.fn() };
  
      Client.findById.mockResolvedValueOnce(mockClientData);
  
      await getClientById(req, res);
  
      expect(res.json).toHaveBeenCalledWith(mockClientData);
    });
  
    // Test updateClient function
    it('should update a client by ID', async () => {
      const req = { params: { id: 'mockId' }, body: { name: 'Updated Name' } };
      const res = { json: jest.fn(), status: jest.fn() };
  
      Client.findByIdAndUpdate.mockResolvedValueOnce(mockClientData);
  
      await updateClient(req, res);
  
      expect(res.json).toHaveBeenCalledWith(mockClientData);
    });
  
    // Test deleteClient function
    it('should delete a client by ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { json: jest.fn(), status: jest.fn() };
  
      Client.findByIdAndDelete.mockResolvedValueOnce(mockClientData);
  
      await deleteClient(req, res);
  
      expect(res.json).toHaveBeenCalledWith({ message: 'Client deleted successfully' });
    });
  });
  