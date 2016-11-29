// JavaScript Document
var mongoose = require('mongoose');
var schema ={
	material_name:String,
	date_added:String,
	document_added:String,
	ready_state:String
	}
	
var Sinvoice=mongoose.model("Sinvoice",schema);
module.exports=Sinvoice;	