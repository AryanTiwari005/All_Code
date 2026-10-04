import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

const app = express();
const PORT = 4000;

// For ES Modules: recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));    
app.use(methodOverride('_method'));
// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Aryan@2005'
});


// Generate random user
let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
    ];
};


// Home route
app.get("/", async (req, res) => {

    let q = `SELECT count(*) FROM user`;

    try {
        const [results] = await connection.query(q);

        let count = results[0]["count(*)"];

        res.render("home.ejs",{count});

    } catch (err) {
        console.log(err);
        res.send("SOME ERROR IN DB"); 
    }

});

app.get('/users', async (req,res)=>{
    let q = "select * from user";
     try {
     const [users] = await connection.query(q);
     res.render("users.ejs",{users});
    } catch (err) {
     res.send(err);
    }

     
})


// edit route
app.get('/users/:id/edit', async (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;

    try {
        const [userss] = await connection.query(q);
        let user = userss[0];

        

        res.render("edit.ejs", { user });

    } catch (err) {
        res.send(err);
    }
});

// update route
app.patch('/users/:id', async (req, res) => {
    let { id } = req.params;

    let { username: newUsername, password: formpassword } = req.body;

    try {
        // 1. Get the existing user
        let q1 = `SELECT * FROM user WHERE id='${id}'`;

        const [users] = await connection.query(q1);

        let user = users[0];

        // 2. Check password
        if (formpassword != user.password) {
            return res.send("password is incorrect");
        }

        // 3. Update user
        let q2 = `UPDATE user 
                  SET username='${newUsername}' 
                  WHERE id='${id}'`;

        await connection.query(q2);

        // 4. Redirect
        res.redirect('/users');

    } catch (err) {
        res.send(err);
    }
});

// Start server
app.listen(PORT, () => {
    console.log("Server is listening");
});


// Inserting new part
// try {
//     const [results] = await connection.query(q, [data]);
//     console.log(results);
// } catch (err) {
//     console.log(err);
// }