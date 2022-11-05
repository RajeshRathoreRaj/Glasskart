var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');
/* GET home page. */
router.get('/fetchstatus', function(req, res, next) {
    pool.query('select * from status',function(error,result){
        if (error)
        {
            res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
    })
     
  });
  
  router.post('/insertmaterial',upload.single('picture'),function(req, res, next) {
    // console.log("BODY:",req.body);
    // console.log("FILE",req.file);
     pool.query('insert into material(materialname, addpicture, status) values(?,?,?)',[req.body.materialname,req.body.myfilename,req.body.status],function(error,result){
         if (error)
         {
             console.log(error)
             res.status(500).json(false)
         }
         else 
         {
           res.status(200).json(true)
         }
     })
      
   });  
  router.post('/editmaterial',upload.single('picture'),function(req, res, next) {
     console.log("BODY:",req.body);
     console.log("FILE",req.file);
      pool.query('update material set picture=? where materialid=?',[req.body.myfilename,req.body.materialid],function(error,result){
          if (error)
          {
              res.status(500).json(false)
          }
          else 
          {
            res.status(200).json(true)
          }
      })
       
    });
    router.post('/deletematerial',function(req, res, next) {
     console.log("BODY:",req.body);
      pool.query('delete from material where materialid=?',[req.body.materialid],function(error,result){
          if (error)
          {
              res.status(500).json(false)
          }
          else 
          {
            res.status(200).json(true)
          }
      })
       
    });
   
   router.get('/fetchallmaterial', function(req, res, next) {
     pool.query('select * from material',function(error,result){
         if (error)
         {
             res.status(500).json([])
         }
         else
         {
           res.status(200).json({data:result})
         }
     })
      
   });
   router.post('/updatematerialdata',function(req, res, next) {
     console.log("BODY:",req.body);
      pool.query('update material set materialname=?, status=? where materialid=?',[req.body.materialname,req.body.status,req.body.materialid],function(error,result){
          if (error)
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