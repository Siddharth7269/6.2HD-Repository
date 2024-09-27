const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('myDB');
const port = normalizePort(process.env.PORT || '3003');
const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public_html')));
app.use(express.urlencoded({ extended: false }));

app.get('/contact', function (req, res) {
    res.sendFile('contactUs.html', { root: path.join(__dirname, 'public_html') });
});

app.get('/getMenuData', function (req, res) {
    db.all("SELECT * FROM Menu", [], function (err, rows) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.json(rows);
    });
});

app.post('/contact', function (req, res) {
    const { name, phoneNumber, email, subject, message } = req.body;

    db.run(
        "INSERT INTO Review (Name, PhoneNumber, Email, Subject, Message) VALUES (?, ?, ?, ?, ?)",
        [name, phoneNumber, email, subject, message],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Internal Server Error');
            }

            console.log(`A new review has been added with ID: ${this.lastID}`);
            res.send('Form submitted successfully!');
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
