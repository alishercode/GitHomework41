const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './database/users.json';

router.post('/register', (req, res) => {
  const { username, password, fullName, age, email, gender } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).send('Username kamida 3 belgidan iborat bo\'lishi kerak.');
  }
  if (!password || password.length < 5) {
    return res.status(400).send('Parol kamida 5 belgidan iborat bo\'lishi kerak.');
  }
  if (age < 10) {
    return res.status(400).send('Yosh 10 dan katta bo\'lishi kerak.');
  }

  const users = JSON.parse(fs.readFileSync(path, 'utf8'));

  // Unique username tekshiruvi
  const exists = users.find(user => user.username === username || user.email === email);
  if (exists) {
    return res.status(400).send('Bu username yoki email allaqachon ishlatilgan.');
  }

  const newUser = {
    id: users.length + 1,
    username,
    password,
    fullName: fullName || '',
    age,
    email,
    gender: gender || ''
  };

  users.push(newUser);
  fs.writeFileSync(path, JSON.stringify(users, null, 2));

  res.status(201).send('Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tdi!');
});

module.exports = router;
