const faker = require('faker');
const db = require('../config/firebase');
const bcrypt = require('bcrypt');

const generateFakeUsers = async (req, res) => {
    try {
        let no_records = req.params.no_records;
        for (let i = 0; i < no_records; i++) {
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();
            let email = faker.internet.email();
            let password = faker.internet.password();
            const salt = bcrypt.genSaltSync(10);
            let hashedPass = bcrypt.hashSync(password, salt);
            const fakePerson = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPass,
            };
            await db.collection('users').add(fakePerson);
        }
        res.status(201).json({ message: 'Users added' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const findUserByEmail = async email => {
    let userFound = db
        .collection('users')
        .where('email', '==', email)
        .get()
        .then(function (querySnapshot) {
            let user;
            querySnapshot.forEach(function (doc) {
                user = doc.data();
                user.id = doc.id;
            });
            return user;
        })
        .catch(function (error) {
            console.log('Error getting documents: ', error);
        });
    return userFound;
};

module.exports = { generateFakeUsers, findUserByEmail };
