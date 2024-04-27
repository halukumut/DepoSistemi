const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Package = require('./models/package');
const Log = require('./models/log');
const bodyParser = require('body-parser');

// express app
const app = express();

// connect to MongoDB
const dbURI='mongodb+srv://backend:backend123@depo.4qu8rmb.mongodb.net/'
mongoose.connect(dbURI)
  .then((result)=>{
   console.log('CONNECTED TO DB');
   app.listen(3000);
})
  .catch((err)=>{console.log(err)});

// register view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/post', async (req,res)=>{
    const package = new Package({
        packageId:  '000000002',
        location: 'A04',
        numberOfPieces: 20,
        features: 'kirbant',
    });
    package.save()
    .then(()=>{
        res.redirect('/');
    })

})

app.get('/delete/:id',async(req,res)=>{
  Package.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect('/menu')
  })
})

app.get('/paketsorgu', async (req,res)=>{
    res.render('sorgu',{paket: null});
})

app.get('/paketsorgu/:packageId', async (req,res)=>{
  const package = Package.find({packageId: req.params.packageId})
  .then((result)=>{
    res.render('sorgu',{paket: result})
  })
})

app.get('/deneme', async (req,res)=>{
    res.render('deneme');
})

app.get('/yenipaket',async (req,res)=>{
    res.render('yenipaket');
})

app.get('/menu',async (req,res)=>{
    res.render('menu');
})

app.get('/rafsorgu', async (req,res)=>{
    Package.find()
    .then((result)=>{
      res.render('rafsorgu',{pakets: result}); 
    })
})

app.get('/rafsorgu/:rafId', async (req,res)=>{
  Package.find({location: req.params.rafId})
  .then((result)=>{
    res.render('rafsorgu',{pakets: result}); 
  })
})

app.get('/',async(req,res)=>{
  res.redirect('/menu');
})
