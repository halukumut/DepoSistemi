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
    res.render('sorgu');
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

app.get('/',async(req,res)=>{
  res.redirect('/menu');
})

/*
app.get('/api/packages/:id',async (req,res)=>{
  const package = await Package.findById(req.params.id);
  res.json(package);
})

app.get('/api/packages', async (req,res)=>{
  Package.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>console.log(err));
})

app.get('/api/logs/:id',async (req,res)=>{
  const log = await Log.findById(req.params.id);
  res.json(log);
})

app.get('/api/logs/',async (req,res)=>{
  Log.find()
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>console.log(err));
})

app.post('/update/:id', async (req, res) => { 
  const packageId = req.params.id;
  const updatedPackageData = req.body;
  console.log('deneme',req.body,packageId);
  try {
    const updatedPackage = await Package.findByIdAndUpdate(packageId, updatedPackageData);
    console.log('basarili')
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/menu',(req,res)=>{
  Package.find(null,null,{limit:2})
  .then((result)=>{
    res.render('anamenu',{title:"menu",data: result})
  })
  .catch((err)=>console.log(err))
})

app.get('/login',(req,res)=>{
  res.render('login');
})

app.get('/', (req, res) => {
  res.redirect('/menu');
});

app.get('/icecek',(req,res)=>{
  Package.find({tur:'icecek'})
  .then((result)=>{
    res.render('icecekler',{title: 'drinks',drinks: result})
  })
  .catch((err)=>console.log(err))
})

app.get('/yiyecek',(req,res)=>{
  Package.find({tur:'yiyecek'})
  .then((result)=>{
    res.render('yiyecekler',{title: 'edibles',edibles: result})
  })
  .catch((err)=>console.log(err))
})

app.get('/admin',(req,res)=>{
  Package.find()
  .then((result)=>{
    res.render('admin',{title: 'ADMIN',packages:result})
  })
})

app.get('/edit/:id',(req,res)=>{
  Package.findById(req.params.id)
  .then((result)=>{
    res.render('edit',{title: 'EDIT',package: result,isEditPage: true})
  })
  .catch((err)=>console.log(err))
})

app.get('/add', async (req, res) => {
  const package = new Package({
    ad:'0',
    img:'0',
    fiyat:'0',
    tur:'yiyecek'
  });
  package.save()
  .then(()=>res.redirect('/admin'))
  .catch((err)=>{console.log(err)})
});

app.get('/delete/:id',(req,res)=>{
  Package.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect('/admin')
  })
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
*/