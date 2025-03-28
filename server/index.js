const express = require('express');
const db = require('./config/db');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3306;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    const id = req.query.id;
    db.query("SELECT * FROM users WHERE id = ?", [id],
    (err, result)=>{
        if (err){
            console.log(err);
        }
        res.send(result);
    });
});
