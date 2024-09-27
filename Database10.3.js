let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('myDB');

db.serialize(function () {
    
    db.run("CREATE TABLE IF NOT EXISTS Review (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT UNIQUE, PhoneNumber INT(10), Email TEXT, Subject TEXT, Message TEXT)");

    db.run(`CREATE TABLE IF NOT EXISTS Menu (ID INTEGER PRIMARY KEY AUTOINCREMENT, Item TEXT, Description TEXT, Small REAL, Medium REAL, Large REAL)`);

    const sampleData = [
        { Item: 'Item 1', Description: 'Small Description 1', Small: 50, Medium: 80, Large: 120 },
        { Item: 'Item 2', Description: 'Small Description 2', Small: 60, Medium: 100, Large: 150 },
        { Item: 'Item 3', Description: 'Small Description 3', Small: 40, Medium: 70, Large: 100 }
    ];

    // sampleData.forEach(item => {
    //     db.run(
    //         "INSERT INTO Menu (Item, Description, Small, Medium, Large) VALUES (?, ?, ?, ?, ?)",
    //         [item.Item, item.Description, item.Small, item.Medium, item.Large],
    //         function (err) {
    //             if (err) {
    //                 console.error(err.message);
    //             } else {
    //                 console.log(`Sample data inserted into Menu with ID: ${this.lastID}`);
    //             }
    //         }
    //     );
    // });

    console.log('Display all content from all rows of the DB');
    db.each("SELECT * FROM Review", function (err, row) {
        console.log("[all] ID: " + row.ID + " Name: " + row.Name + " PhoneNumber: " + row.PhoneNumber + " Email: " + row.Email + " Subject: " + row.Subject + " Message: " + row.Message);
    });

    console.log('Display all content from all rows of the DB');
    db.each("SELECT * FROM Menu", function (err, row) {
        console.log("[all] ID: " + row.ID + " Item: " + row.Item + " Description: " + row.Description + " Small: " + row.Small + " Medium: " + row.Medium + " Large: " + row.Large);
    });
});

db.close();
