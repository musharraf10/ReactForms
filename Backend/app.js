const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const User = require('./models/users.js');
const dbUrl = 'mongodb://localhost:27017/demoRegister';
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Allow cross-origin requests, only if proxy is not used

async function main() {
    await mongoose.connect(dbUrl);
}
main().then(() =>{
    console.log("Connection Successful");
})
.catch(err => console.log(err));

app.post('/register', async(req,res)=> {
    console.log(req.body); 
    let { fullName, email, username, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            fullName,
            email,
            username,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.send(error);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.send("hello");
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get("/apple",(req,res)=>{
    res.send("<h1> You contacted apple path</h1>");
});

app.listen(5000,()=>{
    console.log("Server started successfully port 5000");
})