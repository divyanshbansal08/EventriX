import bcrypt from 'bcrypt';

// Hash a password before storing
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// Compare entered password with hashed password
export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Mock user data (Replace this with a database later)
export const users = [];

// Initialize the mock user data
export const initializeUsers = async () => {
    const hashedPassword = await hashPassword('testpass');
    users.push({
        username: 'testuser',
        email: 'testuser@email.com',
        password: hashedPassword // Storing the hashed password
    });
};

