var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/app"));

var Sequelize = require("sequelize");
var sequelize = new Sequelize("anunturi", "root", "", {
    dialect: "mysql",
    port: 3306
});

//Modelele aplicatiei (vor fi create tabelele in baza de date la /creare)
var Anunt = sequelize.define("anunt", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isNumeric: true,
            isInt: true
        }
    },
    nume: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [5, 30]
        }
    },
    autor: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [5, 30]
        }
    },
    descriere: {
        type: Sequelize.STRING,
        validate: {
            len: [0, 10000]
        }
    }
});;
var Categorie = sequelize.define("categorie", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isNumeric: true,
            isInt: true
        }
    },
    nume: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [5, 30]
        }
    }
});
Categorie.hasMany(Anunt, {
    onDelete: "cascade"
});
Anunt.belongsTo(Categorie);

app.get("/creare", function(req, res) {
    sequelize.sync({
        force: true
    }).complete(function(err) {
        if (err) {
            console.log("Eroare la crearea tabelei:", err);
        }
        else {
            console.log("Tabelele au fost create!");
            res.status(201).send("Tabelele au fost create!");
        }
    });
});

app.post("/categorie", function(req, res) {
  var categorie = req.body;
  Categorie.create(categorie)
    .complete(function(err) {
      if (err) {
        console.log(err);
      }
      else {
        res.status(201).send("Categorie creata!");
      }
    });
});
app.post("/anunt", function(req, res) {
  var anunt = req.body;
  Anunt.create(anunt)
    .complete(function(err) {
      if (err) {
        console.log(err);
      }
      else {
        res.status(201).send("Anunt creat!");
      }
    });
});

app.get("/categorii", function(req, res) {
  Categorie.findAll()
    .complete(function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        var categorii = results.map(function(element) {
          return element.dataValues;
        })
        res.status(200).send(categorii);
      }
    });
});
app.get("/anunturi", function(req, res) {
  Anunt.findAll()
    .complete(function(err, results) {
      if (err) {
        console.log(err);
      }
      else {
        var anunturi = results.map(function(element) {
          return element.dataValues;
        })
        res.status(200).send(anunturi);
      }
    });
});

app.get("/categorie/:id", function(req, res) {
  Categorie
    .find({
      where: {
        id: req.params.id
      },
      attributes: ["id", "nume", "createdAt"]
    })
    .complete(function(err, result) {
      if (!!err) {
        console.log(err);
      }
      else {
        var categorie = result.dataValues;
        res.status(200).send(categorie);
      }
    })
});
app.get("/anunt/:id", function(req, res) {
  Anunt
    .find({
      where: {
        id: req.params.id
      },
      attributes: ["id", "nume", "autor", "descriere", "createdAt", "categorieId"]
    })
    .complete(function(err, result) {
      if (!!err) {
        console.log(err);
      }
      else {
        var anunt = result.dataValues;
        res.status(200).send(anunt);
      }
    })
});

app.put("/categorie/:id", function(req, res) {
  var categorieNoua = req.body;
  Categorie.find({
      where: {
        id: req.params.id
      }
    })
    .success(function(categorie) {
      categorie.updateAttributes({
        nume: categorieNoua.nume
      });
      res.status(200).send("Categorie modificata");
    });
});
app.put("/anunt/:id", function(req, res) {
  var anuntNou = req.body;
  Anunt.find({
      where: {
        id: req.params.id
      }
    })
    .success(function(anunt) {
      anunt.updateAttributes({
          nume: anuntNou.nume,
          autor: anuntNou.autor,
          descriere: anuntNou.descriere,
          categorieId: anuntNou.categorieId
      });
      res.status(200).send("Anunt modificat!");
    });
});

app.delete("/categorie/:id", function(req, res) {
  Categorie
    .find({
      where: {
        id: req.params.id
      }
    })
    .success(function(subject) {
      subject.destroy().success(function() {
        res.status(201).send("Categorie stearsa!");
      });
    });
});
app.delete("/anunt/:id", function(req, res) {
  Anunt
    .find({
      where: {
        id: req.params.id
      }
    })
    .success(function(article) {
      article.destroy().success(function() {
        res.status(201).send("Anunt sters!");
      });
    });
});

app.listen(8080);