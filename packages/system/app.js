'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
  favicon = require('serve-favicon'),
  express = require('express');
  
  var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer({ dest: 'uploads/' });
 var type = upload.single('document_added');
 
 var fs = require('fs');
 

/*app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/profile', upload.array(), function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});*/
 
 var mongoose=require('mongoose'); 
 mongoose.connect=process.env.OPENSHIFT_MONGODB_DB_URL;
 
//Supplier Invoice Area
var SinvoiceSchema ={
	material_name:String,
	date_added:String,
	document_added:String,
	ready_state:String,
	archived:String
	}	 

var SinvoiceModel = mongoose.model('SupplierInvoice', SinvoiceSchema);
//Supplier Invoice Area Ends 

//Customer Invoice Area
var CinvoiceSchema ={
	material_name:String,
	date_added:String,
	document_added:String,
	ready_state:String,
	archived:String
	}	 

var CinvoiceModel = mongoose.model('CustomerInvoice', CinvoiceSchema);
//Customer Invoice Area Ends 




var System = new Module('system');


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
System.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  System.routes(app, auth, database);

  System.aggregateAsset('css', 'common.css');

  // The middleware in config/express will run before this code
  System.menus.add({
    'roles': ['authenticated'],
    'title': 'Overview',
    'link': 'overview'
  });
  System.menus.add({
    'roles': ['authenticated'],
    'title': 'Supplier Invoice',
    'link': 'supplier-invoice'
  });
  
   System.menus.add({
    'roles': ['authenticated'],
    'title': 'Customer Invoice',
    'link': 'customer-invoice'
  });
  
  System.menus.add({
    'roles': ['authenticated'],
    'title': 'Taxes',
    'link': 'taxes'
  });
  
  System.menus.add({
    'roles': ['authenticated'],
    'title': 'Salary',
    'link': 'salary'
  });
System.menus.add({
    'roles': ['authenticated'],
    'title': 'Banking',
    'link': 'banking'
  });

System.menus.add({
    'roles': ['authenticated'],
    'title': 'Expenses',
    'link': 'expenses'
  });  

System.menus.add({
    'roles': ['authenticated'],
    'title': 'Reports',
    'link': 'reports'
  }); 
  
  app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/profile', upload.array(), function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');
  
  //Supplier Invoice Area 
	
app.get('/supplierinvoice/:material_name/:date_added/:document_added/:ready_state/create',function(req,res){
	var sinvoice=new SinvoiceModel({material_name:req.params.material_name,date_added:req.params.date_added,document_added:req.params.document_added,ready_state:req.params.ready_state});
sinvoice.save(function(err,doc){
	res.json(doc);
	});
	});	
	
	app.get('/supplierinvoice/:id',function(req,res){
	SinvoiceModel.findById(req.params.id,function(err,sinvoice){
res.json(sinvoice);

});
	});
	
	app.get('/supplierinvoice',function(req,res){
	SinvoiceModel.find({archived:'No'},function(err,sinvoices){
res.json(sinvoices);

});
	});	
	
app.get('/supplierarchived',function(req,res){
	SinvoiceModel.find({archived:'Yes'},function(err,sinvoices){
res.json(sinvoices);

});
	});	
	app.get('/supplierinvoice/remove/:id',function(req,res){
		
		SinvoiceModel.findById(req.params.id,function(err,sinvoice){
		
		var newPath = process.env.OPENSHIFT_DATA_DIR +'/files/'+ sinvoice.document_added;
		fs.unlink(newPath);
		
		SinvoiceModel.remove({_id:req.params.id},function(err,sinvoice){
	
		
res.json(sinvoice);

});
//res.json();

});	
	
	});	
	
	
app.get('/supplierinvoice/restore/:id',function(req,res){
	
	SinvoiceModel.findOne({_id:req.params.id},function(err,foundObject){
		foundObject.archived='No';
		foundObject.save(function(err,doc){
	res.json(doc);
	});
		});
		
		});		
		
	app.get('/supplierinvoice/archive/:id',function(req,res){
	
	SinvoiceModel.findOne({_id:req.params.id},function(err,foundObject){
		foundObject.archived='Yes';
		foundObject.save(function(err,doc){
	res.json(doc);
	});
		});
		
		});		
		
app.use('/images', express.static(process.env.OPENSHIFT_DATA_DIR+'/files'));

app.post('/supplierinvoice/invoice',type,function(req,res){
	
if(req.body.edit_id){
	
	if(req.file){
			
			fs.readFile(req.file.path, function (err, data) {
  // ...
  var rand=Math.random() * (100000 - 100) + 100;
  rand=Math.floor(rand);
  var newPath = process.env.OPENSHIFT_DATA_DIR +'/files/'+rand+ req.file.originalname;
  fs.writeFile(newPath, data, function (err) {
	  
	  req.body.document_added=rand+req.file.originalname;
	var id=req.body.edit_id;
	SinvoiceModel.findOne({_id:id},function(err,foundObject){
		foundObject.material_name=req.body.material_name;
		foundObject.date_added=req.body.date_added;
		foundObject.document_added=req.body.document_added;
		foundObject.ready_state=req.body.ready_state;
		foundObject.save(function(err,doc){
	res.redirect('/#!/supplier-invoice');
	});
		});

  });
});

		
			}
		else{
		 req.body.document_added=req.body.pr_doc;

	
	var id=req.body.edit_id;
	SinvoiceModel.findOne({_id:id},function(err,foundObject){
		foundObject.material_name=req.body.material_name;
		foundObject.date_added=req.body.date_added;
		foundObject.document_added=req.body.document_added;
		foundObject.ready_state=req.body.ready_state;
		foundObject.save(function(err,doc){
	res.redirect('/#!/supplier-invoice');
	});
		});
	
		}

	}
	else{
		
		
		
	fs.readFile(req.file.path, function (err, data) {
  // ...
  var rand=Math.random() * (100000 - 100) + 100;
  rand=Math.floor(rand);
  var newPath = process.env.OPENSHIFT_DATA_DIR +'/files/'+rand+ req.file.originalname;
  fs.writeFile(newPath, data, function (err) {
	  req.body.document_added=rand+req.file.originalname;
	   req.body.archived='No';
	 //  res.send(req.body);
    var sinvoice=new SinvoiceModel(req.body);
sinvoice.save(function(err,doc){
	//res.json(doc);
	res.redirect('/#!/supplier-invoice');
	});

  });
});
	
	}

	
	});	

app.post('/supplierinvoice/invoice/edit/:id',function(req,res){

	var id=req.params.id;
	SinvoiceModel.findOne({_id:id},function(err,foundObject){
		foundObject.material_name=req.body.material_name;
		foundObject.date_added=req.body.date_added;
		foundObject.document_added=req.body.document_added;
		foundObject.ready_state=req.body.ready_state;
		foundObject.save(function(err,doc){
	res.json(doc);
	});
		});
	});	

//Supplier Invoice Area Ends 

//Customer Invoice Area Starts

app.get('/customerinvoice/:id',function(req,res){
	CinvoiceModel.findById(req.params.id,function(err,cinvoice){
res.json(cinvoice);

});
	});
	
app.get('/customerinvoice',function(req,res){
	CinvoiceModel.find({archived:'No'},function(err,cinvoices){
res.json(cinvoices);

});
	});	
	
app.get('/customerarchived',function(req,res){
	CinvoiceModel.find({archived:'Yes'},function(err,cinvoices){
res.json(cinvoices);

});
	});	
	
app.get('/customerinvoice/remove/:id',function(req,res){
		
		CinvoiceModel.findById(req.params.id,function(err,cinvoice){
		
		var newPath = process.env.OPENSHIFT_DATA_DIR +'/files/'+ cinvoice.document_added;
		fs.unlink(newPath);
		
		CinvoiceModel.remove({_id:req.params.id},function(err,cinvoice){
	
		
res.json(cinvoice);

});
//res.json();

});	
	
	});	
	
	
app.get('/customerinvoice/restore/:id',function(req,res){
	
	CinvoiceModel.findOne({_id:req.params.id},function(err,foundObject){
		foundObject.archived='No';
		foundObject.save(function(err,doc){
	res.json(doc);
	});
		});
		
		});		
		
app.get('/customerinvoice/archive/:id',function(req,res){
	
	CinvoiceModel.findOne({_id:req.params.id},function(err,foundObject){
		foundObject.archived='Yes';
		foundObject.save(function(err,doc){
	res.json(doc);
	});
		});
		
		});		
		
//app.use('/images', express.static(process.env.OPENSHIFT_DATA_DIR+'/files'));

app.post('/customerinvoice/invoice',type,function(req,res){
	
if(req.body.edit_id){
	
	if(req.file){
			
  fs.readFile(req.file.path, function (err, data) {
  // ...
  var rand=Math.random() * (100000 - 100) + 100;
  rand=Math.floor(rand);
  var newPath = process.env.OPENSHIFT_DATA_DIR +'/files/'+rand+ req.file.originalname;
  fs.writeFile(newPath, data, function (err) {
	  
	 req.body.document_added=rand+req.file.originalname;
	var id=req.body.edit_id;
	CinvoiceModel.findOne({_id:id},function(err,foundObject){
		foundObject.material_name=req.body.material_name;
		foundObject.date_added=req.body.date_added;
		foundObject.document_added=req.body.document_added;
		foundObject.ready_state=req.body.ready_state;
		foundObject.save(function(err,doc){
	res.redirect('/#!/customer-invoice');
	});
		});

  });
});

		
			}
		else{
		 req.body.document_added=req.body.pr_doc;

	
	var id=req.body.edit_id;
	CinvoiceModel.findOne({_id:id},function(err,foundObject){
		foundObject.material_name=req.body.material_name;
		foundObject.date_added=req.body.date_added;
		foundObject.document_added=req.body.document_added;
		foundObject.ready_state=req.body.ready_state;
		foundObject.save(function(err,doc){
	res.redirect('/#!/customer-invoice');
	});
		});
	
		}

	}
	else{
		
		
		
	fs.readFile(req.file.path, function (err, data) {
  // ...
  var rand=Math.random() * (100000 - 100) + 100;
  rand=Math.floor(rand);
  var newPath = process.env.OPENSHIFT_DATA_DIR +'/files/'+rand+ req.file.originalname;
  fs.writeFile(newPath, data, function (err) {
	  req.body.document_added=rand+req.file.originalname;
	   req.body.archived='No';
	 //  res.send(req.body);
    var cinvoice=new CinvoiceModel(req.body);
cinvoice.save(function(err,doc){
	//res.json(doc);
	res.redirect('/#!/customer-invoice');
	});

  });
});
	
	}

	
	});	

app.post('/customerinvoice/invoice/edit/:id',function(req,res){

	var id=req.params.id;
	CinvoiceModel.findOne({_id:id},function(err,foundObject){
		foundObject.material_name=req.body.material_name;
		foundObject.date_added=req.body.date_added;
		foundObject.document_added=req.body.document_added;
		foundObject.ready_state=req.body.ready_state;
		foundObject.save(function(err,doc){
	res.json(doc);
	});
		});
	});	

//Customer Invoice Area Ends 



  // Setting the favicon and static folder
  app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

  // Adding robots and humans txt
  app.use(express.static(__dirname + '/public/assets/static'));

  return System;
});


