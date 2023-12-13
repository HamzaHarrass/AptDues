const {
    createAppartement,
    getAllAppartements,
    getAppartementById,
    updateAppartement,
    deleteAppartement,
  } = require('./controllers/appartementControle');
  const Appartement = require('./models/Appartement');
  
  jest.mock('./models/Appartement', () => ({
    save: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }));
  
  describe('getAllAppartements', () => {

  
    it('should return a response with status 500 in case of an error during appartement retrieval', async () => {
      const errorMessage = "An error occurred during appartement retrieval.";
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Appartement.find.mockRejectedValue(new Error(errorMessage));
  
      await getAllAppartements({}, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  
  describe('getAppartementById', () => {
    it('should return the specified appartement as JSON', async () => {
      const req = {
        params: {
          id: 'mockAppartementId',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      const mockAppartement = { _id: 'mockAppartementId', /* other properties */ };
  
      Appartement.findById.mockResolvedValue(mockAppartement);
  
      await getAppartementById(req, res);
  
      expect(Appartement.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.json).toHaveBeenCalledWith(mockAppartement);
    });
  
    it('should return a response with status 404 if the appartement is not found', async () => {
      const req = {
        params: {
          id: 'nonExistentAppartementId',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Appartement.findById.mockResolvedValue(null);
  
      await getAppartementById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Apartment not found' });
    });
  
    it('should return a response with status 500 in case of an error during appartement retrieval by ID', async () => {
      const req = {
        params: {
          id: 'mockAppartementId',
        },
      };
      const errorMessage = "An error occurred during appartement retrieval by ID.";
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Appartement.findById.mockRejectedValue(new Error(errorMessage));
  
      await getAppartementById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  
  describe('updateAppartement', () => {
    it('should update the specified appartement and return the updated appartement as JSON', async () => {
      const req = {
        params: {
          id: 'mockAppartementId',
        },
        body: {
          // Add necessary data for updating an appartement
        },
      };
      const res = {
        json: jest.fn(),
      };
  
      const mockUpdatedAppartement = { _id: 'mockAppartementId', ...req.body };
  
      Appartement.findByIdAndUpdate.mockResolvedValue(mockUpdatedAppartement);
  
      await updateAppartement(req, res);
  
      expect(Appartement.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedAppartement);
    });
  
    it('should return a response with status 404 if the appartement is not found for updating', async () => {
      const req = {
        params: {
          id: 'nonExistentAppartementId',
        },
        body: {
          // Add necessary data for updating an appartement
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      Appartement.findByIdAndUpdate.mockResolvedValue(null);
  
      await updateAppartement(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Apartment not found' });
    });
  
    it('should return a response with status 400 in case of an error during appartement update', async () => {
    const req = {
      params: {
        id: 'mockAppartementId',
      },
      body: {
        // Add necessary data for updating an appartement
      },
    };
    const errorMessage = "An error occurred during appartement update.";
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Appartement.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));

    await updateAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe('deleteAppartement', () => {
  it('should delete the specified appartement and return a success message as JSON', async () => {
    const req = {
      params: {
        id: 'mockAppartementId',
      },
    };
    const res = {
      json: jest.fn(),
    };

    const mockDeletedAppartement = { _id: 'mockAppartementId' };

    Appartement.findByIdAndDelete.mockResolvedValue(mockDeletedAppartement);

    await deleteAppartement(req, res);

    expect(Appartement.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.json).toHaveBeenCalledWith({ message: 'Apartment deleted successfully' });
  });

  it('should return a response with status 404 if the appartement is not found for deletion', async () => {
    const req = {
      params: {
        id: 'nonExistentAppartementId',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Appartement.findByIdAndDelete.mockResolvedValue(null);

    await deleteAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Apartment not found' });
  });

  it('should return a response with status 500 in case of an error during appartement deletion', async () => {
    const req = {
      params: {
        id: 'mockAppartementId',
      },
    };
    const errorMessage = "An error occurred during appartement deletion.";
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Appartement.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    await deleteAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});