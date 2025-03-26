import bcrypt from 'bcrypt';

bcrypt.hash("password", 10).then(hashedPassword => {
    console.log("Hashed Password:", hashedPassword);
});
