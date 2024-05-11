const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Package = require('./models/package');
const Log = require('./models/log');
const bodyParser = require('body-parser');
const { result } = require('lodash');


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

app.get('/login',async (req,res)=>{
  res.render('login');
})

app.get('/login/logs', async (req, res)=>{
  Log.find()
  .then((result)=>{
    res.send(result);
  })
})

app.get('/post', async (req,res)=>{
    const package = new Package({
      packageId:9,
      location:'A01',
      numberOfPieces:1,
      features:'mb'
    });
    package.save()
    .then(()=>{
        res.redirect('/');
    })

})

app.post('/package/post', async (req,res)=>{
  var newPackageId;
  const updatedPackageData = req.body;
  console.log(updatedPackageData);
  Package.findOne().sort({packageId: -1})
  .then((result)=>{
  const package = new Package({
    packageId: result.packageId + 1,
    location: updatedPackageData.location,
    numberOfPieces: updatedPackageData.numberOfPieces,
    features: updatedPackageData.features,
    weight: updatedPackageData.weight
  })
  package.save();
  res.redirect('/yenipaket');
  })
})

app.get('/delete/:id',async(req,res)=>{
  Package.findOneAndDelete({packageId: req.params.id})
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
    console.log(result)
    if(result != ''){
      res.render('sorgu',{paket: result});
    }else{
      res.redirect('/paketsorgu');
    }   
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
  res.redirect('/login');
})
