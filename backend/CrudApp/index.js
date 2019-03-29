// path module
const path = require('path');
// express module
const express = require('express');
// hbs view engine
const hbs = require('hbs');
// bodyParser middleware
const bodyParser = require('body-parser');
// mysql database
const mysql = require('mysql');
const app = express();

// Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nanfood'
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets', express.static(__dirname + '/public'));

//homepage
app.get('/users', (req, res) => {
  let sql = "SELECT * FROM users";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('users', {
      results: results
    });
  });
});

//insert data
app.post('/save', (req, res) => {
  let data = {
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    password: req.body.password
  };
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

//update data
app.post('/update', (req, res) => {
  let sql =
    "UPDATE users SET fName='"+
    req.body.fName+
    "',lName='"+
    req.body.lName+
    "',email='"+
    req.body.email+
    "'WHERE id="+
    req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

// delete data
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM users WHERE id="+ req.body.id +"";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});



//menu
app.get('/menu', (req, res) => {
  let sql = "SELECT * FROM menu";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('menus', {
      results: results
    });
  });
});

//insert data
app.post('/save/menu', (req, res) => {
  let data = {
    nom_menu: req.body.nom_menu,
    lName: req.body.lName,
    prix: req.body.prix,
    password: req.body.password
  };
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

//update data
app.post('/update', (req, res) => {
  let sql =
    "UPDATE users SET fName='"+
    req.body.fName+
    "',lName='"+
    req.body.lName+
    "',email='"+
    req.body.email+
    "'WHERE id="+
    req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

// delete data
app.post('/delete', (req, res) => {
  let sql = "DELETE FROM users WHERE id="+ req.body.id +"";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});


//resto
app.get('/restos', (req, res) => {
  let sql = "SELECT * FROM restaurant";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('restos', {
      results: results
    });
  });
});

//insert data
app.post('/save/resto', (req, res) => {
  let data = {
    nom_menu: req.body.nom_menu,
    lName: req.body.lName,
    prix: req.body.prix,
    password: req.body.password
  };
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

//update data
app.post('/update', (req, res) => {
  let sql =
    "UPDATE users SET fName='" +
    req.body.fName +
    "',lName='" +
    req.body.lName +
    "',email='" +
    req.body.email +
    "'WHERE id=" +
    req.body.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});

// delete data
app.post('/delete/resto', (req, res) => {
  let sql = "DELETE FROM restaurant WHERE id_resto=" + req.body.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/users');
  });
});
//server listening
app.listen(8888, () => {
  console.log('Server is running at port 8888');
});
