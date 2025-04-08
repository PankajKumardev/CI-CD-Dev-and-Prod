import express from 'express';
import { client } from '@repo/db/client';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', async (req, res) => {
  const username: string = req.body.username;
  const password = req.body.password;
  try {
    const user = await client.user.create({
      data: {
        username : username,
        password : password,
      },
    });
    res.json({
      message: 'User created successfully',
      id: user.id,
    });
  } catch (error) {
    res.status(500).json({  
      message: 'Error creating user : ' + error,
    });
  }
});

app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});
