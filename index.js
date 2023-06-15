//sukuriu savo serveri
const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.json())

//duomenys bus gaunami, perduodami json formatu
app.use(express.json());

//sukuriu testiniu duomenu masyva
const products = [
    {id: 1, title: "Fits 15 Loptops"},
    {id: 2, title: "Mens Casual Slim Fit"},
    {id: 3, title: "Solid Gold Petite Micropave"},
]

//svarbu pirmiausia reikia sukurti route!!
app.get('/api/products', (req, res) => {
    res.send(products);
});
//SELECT
app.get('/api/products/:id', (req, res) => {
    const my_product = products.find(product => product.id === parseInt(req.params.id));
console.log(typeof req.params.id)
    if(!my_product) res.status(404).send("not found");
    res.send(my_product);
});
//CREATE
app.post('/api/products', (req, res) => {
    const product = {
        id: products.length +1,
        title: req.body.title
    };
    products.push(product);
    res.send(products);
});

//UPDATE
app.put('/api/products/:id', (req, res)=>{
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send("not found");

    my_product.title = req.body.title;
    res.send(my_product);
})

//DELETE
app.delete('/api/products/:id', (req, res)=>{
    const my_product = products.find(product => product.id === parseInt(req.params.id));
    if(!my_product) res.status(404).send("not found");

    const product_index = products.indexOf(my_product);
    products.splice(product_index, 1);

    res.send(my_product)
})
//apsirasome port'a ant kurio veiks serveris, veliau rasysim .env faile
const PORT = 5001;

//svarbu pabaigoje tik tada kai sukurtas, egzistuoja route, startuoti serveri
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});