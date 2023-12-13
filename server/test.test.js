const { Login } = require('./controllers/authControle');
const User = require('./models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mocking the dependencies
jest.mock('./models/Users');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Login Function', () => {
    // Mock user data for testing
    const mockUserData = {
        _id: 'mockUserId',
        email: 'test@example.com',
        password: 'hashedPassword',
    };

    // Mock request and response objects
    const mockReq = {
        body: {
            email: 'test@example.com',
            password: 'password123',
        },
    };

    const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
        cookie: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return user and token on successful login', async () => {
        User.findOne.mockResolvedValue(mockUserData);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockToken');

        await Login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.cookie).toHaveBeenCalled();
        expect(mockRes.json).toHaveBeenCalledWith({
            token: 'mockToken',
            user: mockUserData,
        });
    });

    it('should return 401 if user not found', async () => {
        User.findOne.mockResolvedValue(null);

        await Login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 401 if password is invalid', async () => {
        User.findOne.mockResolvedValue(mockUserData);
        bcrypt.compare.mockResolvedValue(false);

        await Login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid password' });
    });

    it('should return 500 on internal server error', async () => {
        User.findOne.mockRejectedValue(new Error('Some error'));

        await Login(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
});
