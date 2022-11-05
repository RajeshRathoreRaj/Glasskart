var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");


/* GET home page. */

router.get('/fetchallcategories', function(req, res, next) {
 
  pool.query("select * from categories",function(error,result){
      if(error)
      {
        res.status(500).json([])
      }
      else
      {
        res.status(200).json({data:result})
      }
    })
});

router.post('/insertcategories',upload.single("icon"), function(req, res, next) {
  console.log("BODY:", req.body);
  console.log("FILE", req.file);
  pool.query("insert into categories (categoryname,icon) values(?,?)",
  [req.body.categoryname,req.body.myfilename],function(error,result){
      if(error)
      { console.log(error)
        alert(error)
        res.status(500).json(false)
      }
      else
      {
        res.status(200).json(true)
      }
    })
});

router.post('/editicon',upload.single("icon"), function(req, res, next) {
  pool.query("update categories set icon=? where categoryid=?",[req.body.myfilename,req.body.categoryid],function(error,result){
      if(error)
      {  console.log(error);
        res.status(500).json(false)
      }
      else
      {
        res.status(200).json(true)
      }
    })
});

router.post('/updatecategories', function(req, res, next) {
  console.log("BODY:", req.body);
  pool.query("update categories set categoryname=? where categoryid=?",
  [req.body.categoryname,req.body.categoryid],function(error,result){
      if(error)
      { 
        res.status(500).json(false)
      }
      else
      { 
        res.status(200).json(true)
      }
    })
});

router.post('/deletecategories', function(req, res, next) {
  pool.query("delete from categories where categoryid=?",[req.body.categoryid],function(error,result){
      if(error)
      {
        res.status(500).json(false)
      }
      else
      {
        res.status(200).json(true)
      }
    })
});
 
module.exports = router;
