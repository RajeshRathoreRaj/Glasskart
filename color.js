var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");


/* GET home page. */

router.get('/fetchallcolors', function(req, res, next) {
 
  pool.query("select * from color",function(error,result){
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

router.post('/insertcolor',upload.single("adpicture"), function(req, res, next) {
  console.log("BODY:", req.body);
  console.log("FILE", req.file);
  pool.query("insert into color (colorname,adpicture,status) values(?,?,?)",
  [req.body.colorname,req.body.myfilename,req.body.status],function(error,result){
      if(error)
      { console.log(error)
        res.status(500).json(false)
      }
      else
      {
        res.status(200).json(true)
      }
    })
});

router.post('/editadpicture',upload.single("adpicture"), function(req, res, next) {
  pool.query("update color set adpicture=? where colorid=?",[req.body.myfilename,req.body.colorid],function(error,result){
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

router.post('/updatecolor', function(req, res, next) {
  console.log("BODY:", req.body);
  pool.query("update color set colorname=?, status=? where colorid=?",
  [req.body.colorname,req.body.status,req.body.colorid],function(error,result){
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

router.post('/deletecolor', function(req, res, next) {
  pool.query("delete from color where colorid=?",[req.body.colorid],function(error,result){
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
