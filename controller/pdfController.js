const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');
const options = require('../helpers/options');
const data = require('../helpers/data');
const db = require('../models');


const homeview = (req, res, next) => {
    res.render('home');
}

const generatePdf = async (req, res, next) => {
    console.log("jaz");
        const html = fs.readFileSync(path.join(__dirname, '../views/template.html'), 'utf-8');
        const filename = Math.random() + '_doc' + '.pdf';
        let array = [];

        data.forEach(d => {
            const prod = {
                name: d.name,
                description: d.description,
                quantity: d.quantity,
                price: d.price,
                total: d.quantity * d.price,
                imgurl: d.imgurl
            }
            array.push(prod);
        });

        let subtotal = 0;
        array.forEach(i => {
            subtotal += i.total
        });
        const tax = (subtotal * 20) / 100;
        const grandtotal = subtotal - tax;
        const obj = {
            prodlist: array,
            subtotal: subtotal,
            tax: tax,
            gtotal: grandtotal
        }
        const document = {
            html: html,
            data: {
                products: obj
            },
            path: './docs/' + filename
        }
        pdf.create(document, options)
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
            const filepath = 'http://localhost:3000/docs/' + filename;

             res.render('download', {
                path: filepath
            });
}

const viewLogin= (req, res)=>{
    res.render('login', { title: 'Login Page', message:'loginMessage'})
}

const viewDashboard=async(req, res)=>{
   // res.render('dashboard')
   res.render("login")
}
module.exports = {
    homeview,
    generatePdf,
    viewLogin,
    viewDashboard
}