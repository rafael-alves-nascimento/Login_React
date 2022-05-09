const express = require("express");
const app = express();
const porta = 3001
const mysql = require("mysql");
const cors = require('cors')

app.use(express.json());
app.use(cors());

const conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "login_data",
    password: '',
});

// query
function select(){
    return "Select * from usuarios"
}

app.get('/', function(req, res){
    conection.query(select(), function(err, result){
        if (err) throw err
        res.status(200).json(result)
    })
})

app.get('/register', function(req, res){
    conection.query(select(), function(err, result){
        if (err) throw err
        const email = req.body.email;
        res.status(200).json(email)
    })
})


app.post("/register" , (req,res) => {
    const user_name = req.body.user_name;
    const email = req.body.email;
    const password = req.body.password;
    conection.query('Select * from usuarios where email = ?',[email], (err,result) => {
        if (err){
            res.send(err)
        }
        if(result.length == 0) {
            conection.query('insert into usuarios (user_name,email,senha,data_user) values (?,?,?, NOW())',[user_name,email,password], (err,response) => {
                if (err){
                    res.send(err)
                }
                res.send({msg: "Cadastrado com sucesso"})
            })
        }
        else {
            res.send({msg: "Usuário já cadastrado" })
        }        
    });
});


app.post("/login" ,(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    conection.query("SELECT * FROM usuarios WHERE email = ? AND senha = ?",[email,password], (err,result) =>{
        if(err){
            res.send(err);
        }
        if(result.length > 0){
            res.send({msg : "Usuário logado"})
        }
        else{
            res.send({msg : "Usuário não cadastrado"})
        }
    })
});


app.listen(porta, () => {
    console.log('Servidor em operação')
});

