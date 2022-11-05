var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload  = require('./multer')
/* GET home page. */
router.get('/fetchallmainpage', function(req, res, next) {
  pool.query("select * from mainpage ",function(error,result){
   if(error)
   {
       console.log(error);
    res.status(500).json([])

   }
  else
  {
      res.status(200).json({data:result})
  }

  })  
  
});


router.post("/insertmainpage",upload.single("picture"),function (req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);
pool.query("insert into mainpage (position, picture, displaystatus) values(?,?,?)",[req.body.position,req.body.myfilename,req.body.adstatus],function (error, result) {
        if (error) {
          console.log(error)
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

router.post("/updatemaianpage",upload.single("picture"),function (req, res, next) {
  if (req.body.myfilename == undefined) {
    req.body.myfilename = req.body.picture
}
  console.log("BODY:", req.body);
  console.log("FILE", req.file);
pool.query("update mainpage set position=?, picture=?,displaystatus=? where pictureid=?",[req.body.position,req.body.myfilename,req.body.adstatus,req.body.pictureid],function (error, result) {
      if (error) {
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
}
);

router.post("/editmainppagepicture",upload.single("picture"),function (req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);
    pool.query("update mainpage set picture=? where pictureid=?",[req.body.myfilename,req.body.pictureid],function (error, result) {
        if (error) {
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);

router.post("/deletemaianpage",upload.single("picture"),function (req, res, next) {
  if (req.body.myfilename == undefined) {
    req.body.myfilename = req.body.picture
}
  console.log("BODY:", req.body);
  console.log("FILE", req.file);
pool.query("delete from mainpage where pictureid=?",[req.body.pictureid],function (error, result) {
      if (error) {
        res.status(500).json(false);
      } else {
        res.status(200).json(true);
      }
    }
  );
}
);


module.exports = router;