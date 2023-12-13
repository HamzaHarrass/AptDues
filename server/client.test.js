const {createClient,getAllClients,getClientById,updateClient,deleteClient} = require('./controllers/clientControle');
  const Client = require('./models/Client');
  
  jest.mock('./models/Client');
  
  describe('createClient', () => {
    it('devrait créer un client avec les données fournies et renvoyer une réponse JSON', async () => {
      const req = {
        body: {
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await createClient(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
    });
  
    it('devrait renvoyer une réponse avec un statut 400 en cas d\'erreur lors de la création du client', async () => {
      const req = {
        body: {
        },
      };
      const errorMessage = 'Une erreur s\'est produite lors de la création du client.';
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      jest.spyOn(Client.prototype, 'save').mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });
  
      await createClient(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  describe('getAllClients', () => {
    it('devrait renvoyer tous les clients sous forme de JSON', async () => {
      const mockClients = [
        { name: 'Client1', email: 'client1@example.com' },
        { name: 'Client2', email: 'client2@example.com' },
      ];
  
      const req = {};
      const res = {
        json: jest.fn(),
      };
  
      // Simuler la réponse de la base de données lors de la recherche de tous les clients
      Client.find.mockResolvedValue(mockClients);
  
      await getAllClients(req, res);
  
      // Vérifier si la méthode find du modèle Client a été appelée
      expect(Client.find).toHaveBeenCalled();
  
      // Vérifier si la méthode json de la réponse a été appelée avec les clients simulés
      expect(res.json).toHaveBeenCalledWith(mockClients);
    });
  
    it('devrait renvoyer une réponse avec un statut 500 en cas d\'erreur lors de la recherche des clients', async () => {
      const errorMessage = 'Une erreur s\'est produite lors de la recherche des clients.';
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simuler une erreur lors de la recherche des clients
      Client.find.mockRejectedValue(new Error(errorMessage));
  
      await getAllClients(req, res);
  
      // Vérifier si la méthode status a été appelée avec le statut 500 et le message d'erreur
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  describe('getClientById', () => {
    it('devrait renvoyer le client avec l\'ID spécifié sous forme de JSON', async () => {
      const mockClientId = 'mockClientId';
      const mockClient = { _id: mockClientId, name: 'Client1', email: 'client1@example.com' };
  
      const req = {
        params: {
          id: mockClientId,
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      // Simuler la réponse de la base de données lors de la recherche du client par ID
      Client.findById.mockResolvedValue(mockClient);
  
      await getClientById(req, res);
  
      // Vérifier si la méthode findById du modèle Client a été appelée avec l'ID spécifié
      expect(Client.findById).toHaveBeenCalledWith(mockClientId);
  
      // Vérifier si la méthode json de la réponse a été appelée avec le client simulé
      expect(res.json).toHaveBeenCalledWith(mockClient);
    });
  
    it('devrait renvoyer une réponse avec un statut 404 si le client n\'est pas trouvé', async () => {
      const mockClientId = 'nonExistentClientId';
      const req = {
        params: {
          id: mockClientId,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simuler le cas où le client n'est pas trouvé dans la base de données
      Client.findById.mockResolvedValue(null);
  
      await getClientById(req, res);
  
      // Vérifier si la méthode status a été appelée avec le statut 404 et le message d'erreur
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Client not found' });
    });
  
    it('devrait renvoyer une réponse avec un statut 500 en cas d\'erreur lors de la recherche du client par ID', async () => {
      const mockClientId = 'mockClientId';
      const errorMessage = 'Une erreur s\'est produite lors de la recherche du client par ID.';
      const req = {
        params: {
          id: mockClientId,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simuler une erreur lors de la recherche du client par ID
      Client.findById.mockRejectedValue(new Error(errorMessage));
  
      await getClientById(req, res);
  
      // Vérifier si la méthode status a été appelée avec le statut 500 et le message d'erreur
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  describe('updateClient', () => {
    it('devrait mettre à jour le client avec l\'ID spécifié et renvoyer le client mis à jour sous forme de JSON', async () => {
      const mockClientId = 'mockClientId';
      const mockUpdatedClient = { _id: mockClientId, name: 'UpdatedClient', email: 'updatedclient@example.com' };
  
      const req = {
        params: {
          id: mockClientId,
        },
        body: {
          // Ajoutez ici les données nécessaires pour mettre à jour le client
          // par exemple : name, email, etc.
        },
      };
      const res = {
        json: jest.fn(),
      };
  
      // Simuler la réponse de la base de données lors de la mise à jour du client
      Client.findByIdAndUpdate.mockResolvedValue(mockUpdatedClient);
  
      await updateClient(req, res);
  
      // Vérifier si la méthode findByIdAndUpdate du modèle Client a été appelée avec l'ID spécifié et les données de mise à jour
      expect(Client.findByIdAndUpdate).toHaveBeenCalledWith(mockClientId, req.body, { new: true });
  
      // Vérifier si la méthode json de la réponse a été appelée avec le client mis à jour simulé
      expect(res.json).toHaveBeenCalledWith(mockUpdatedClient);
    });
  
    it('devrait renvoyer une réponse avec un statut 404 si le client n\'est pas trouvé pour la mise à jour', async () => {
      const mockClientId = 'nonExistentClientId';
      const req = {
        params: {
          id: mockClientId,
        },
        body: {
          // Données nécessaires pour la mise à jour du client
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simuler le cas où le client n'est pas trouvé dans la base de données pour la mise à jour
      Client.findByIdAndUpdate.mockResolvedValue(null);
  
      await updateClient(req, res);
  
      // Vérifier si la méthode status a été appelée avec le statut 404 et le message d'erreur
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Client not found' });
    });
  
    it('devrait renvoyer une réponse avec un statut 400 en cas d\'erreur lors de la mise à jour du client', async () => {
      const mockClientId = 'mockClientId';
      const errorMessage = 'Une erreur s\'est produite lors de la mise à jour du client.';
      const req = {
        params: {
          id: mockClientId,
        },
        body: {
          // Données nécessaires pour la mise à jour du client
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simuler une erreur lors de la mise à jour du client
      Client.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
  
      await updateClient(req, res);
  
      // Vérifier si la méthode status a été appelée avec le statut 400 et le message d'erreur
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('deleteClient', () => {
    it('devrait supprimer le client avec l\'ID spécifié et renvoyer un message de suppression sous forme de JSON', async () => {
      const mockClientId = 'mockClientId';
  
      const req = {
        params: {
          id: mockClientId,
        },
      };
      const res = {
        json: jest.fn(),
      };
  
      // Simuler la réponse de la base de données lors de la suppression du client
      Client.findByIdAndDelete.mockResolvedValue({ _id: mockClientId });
  
      await deleteClient(req, res);
  
      // Vérifier si la méthode findByIdAndDelete du modèle Client a été appelée avec l'ID spécifié
      expect(Client.findByIdAndDelete).toHaveBeenCalledWith(mockClientId);
  
      // Vérifier si la méthode json de la réponse a été appelée avec le message de suppression simulé
      expect(res.json).toHaveBeenCalledWith({ message: 'Client deleted successfully' });
    });
  
    it('devrait renvoyer une réponse avec un statut 404 si le client n\'est pas trouvé pour la suppression', async () => {
      const mockClientId = 'nonExistentClientId';
      const req = {
        params: {
          id: mockClientId,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simuler le cas où le client n'est pas trouvé dans la base de données pour la suppression
      Client.findByIdAndDelete.mockResolvedValue(null);
  
      await deleteClient(req, res);
  
      // Vérifier si la méthode status a été appelée avec le statut 404 et le message d'erreur
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Client not found' });
    });
  
    it('devrait renvoyer une réponse avec un statut 500 en cas d\'erreur lors de la suppression du client', async () => {
      const mockClientId = 'mockClientId';
      const errorMessage = 'Une erreur s\'est produite lors de la suppression du client.';
      const req = {
        params: {
          id: mockClientId,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Simuler une erreur lors de la suppression du client
      Client.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));
  
      await deleteClient(req, res);
  
      // Vérifier si la méthode status a été appelée avec le statut 500 et le message d'erreur
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });