const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase_url = process.env.SUPABASE_URL 
const supabase_anon_key = process.env.SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabase_url,supabase_anon_key)


const express = require('express');
const { c } = require('tar')
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', async (req, res) => {
    console.log(req.body);
    const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password,
      })
    if (error) {
        console.log(error);
        throw error
    } else {
        console.log(data);
        res.send(data);
    }
});

app.post('/register', async (req, res)  => {
    console.log(req.body);
    const { data, error } = await supabase.auth.signUp(
        {
          email: req.body.email,
          password: req.body.password,
          options: {
            data: {
              username: req.body.username,
            },
          },
        }
      );
    if (error) {
        console.log(error);
        res.send('Error!');
    } else {
        console.log(data);
        res.send(data);
    }
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});