var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
/* GET home page. */


router.get("/fetchallframes", function (req, res, next) {

  pool.query("select * from frametypes", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json({ data: result });
    }
  });

});

router.post("/insertframes",upload.single("adpicture"),function (req, res, next) {
    
    pool.query(
      "insert into frametypes(framename,adpicture,status) values(?,?,?)",
      [
        req.body.framename,
        req.body.myfilename,
        req.body.status
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json(false );
        } else {
          res.status(200).json( true );
        }
      }
    );
  }
);



router.post('/editadpicture',upload.single("adpicture"), function(req, res, next) {
  pool.query("update frametypes set adpicture=? where frameid=?",[req.body.myfilename,req.body.frameid],function(error,result){
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

router.post('/updateframe', function(req, res, next) {
  console.log("BODY:", req.body);
  pool.query("update frametypes set framename=?, status=? where frameid=?",
  [req.body.framename,req.body.status,req.body.frameid],function(error,result){
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

router.post('/deleteframe', function(req, res, next) {
  pool.query("delete from frametypes where frameid=?",[req.body.frameid],function(error,result){
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