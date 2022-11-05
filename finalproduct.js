var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");


/* GET home page. */
router.post('/checkfinalproduct',function(req,res){
  console.log(req.body)
  var q="select * from finalproduct where productid=? and colorid=? and size=?"
   pool.query(q,[req.body.productid,req.body.colorid,req.body.size],function(error,result){
       if(error)
       {
         res.status(500).json([])
       }
       else
       {if(result.length==1)
         res.status(200).json({result:false})
         else
         res.status(200).json({result:true})
       }

     })

})

router.post("/getallproductpictures", function (req, res) {
  console.log(req.body);
  var q = "select * from productpictures where finalproductid=?";
  pool.query(q, [req.body.finalproductid], function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json({ data: result });
    }
  });
});


router.post("/addproductpictures", upload.any(), function (req, res) {
  console.log(req.body);
  console.log(req.files);
  var q = "insert into productpictures (finalproductid,image) values ?";
  pool.query(
    q,
    [req.files.map((item) => [req.body.finalproductid, item.filename])],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});

router.post('/fetchallfinalproductsbyproductid', function(req, res, next) {
  q="select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid )as colorname from finalproduct as fp where productid=?"
   console.log(req.body)
    pool.query(q,[req.body.productid],function(error,result){
        if(error)
        {
          res.status(500).json({data:[]})
        }
        else
        { console.log(result)
          res.status(200).json({data:result})
        }
      })
  });

 router.post('/fetchsizebyproductid', function(req, res, next) {
 
  pool.query("select * from finalproduct where productid=? group by size",[req.body.productid],function(error,result){
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

router.get('/fetchallproducts', function(req, res, next) {
 
    pool.query("select * from product",function(error,result){
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

  router.get('/fetchallfinalproducts', function(req, res, next) {
   q="select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid )as colorname from finalproduct as fp"
    pool.query(q,function(error,result){
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

  router.post('/insertfinalproduct',upload.single("productpicture"), function(req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);
    pool.query("insert into finalproduct (productid, colorid, size, price, offertype, offerprice, description, stock, productpicture) values(?,?,?,?,?,?,?,?,?)",[req.body.productid, req.body.colorid, req.body.size, req.body.price, req.body.offertype, req.body.offerprice, req.body.description, req.body.stock, req.body.myfilename],function(error,result){
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

  router.post('/updatefinalproductdata', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("update finalproduct set productid=?, colorid=?, size=?, price=?, offertype=?, offerprice=?, description=?, stock=? where finalproductid=?",[req.body.productid, req.body.colorid, req.body.size, req.body.price, req.body.offertype, req.body.offerprice, req.body.description, req.body.stock,req.body.finalproductid],function(error,result){
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

  router.post('/editproductpicture',upload.single("productpicture"), function(req, res, next) {
    pool.query("update finalproduct set productpicture=? where finalproductid=?",[req.body.myfilename,req.body.finalproductid],function(error,result){
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

  router.post('/deletefinalproduct', function(req, res, next) {
    pool.query("delete from finalproduct where finalproductid=?",[req.body.finalproductid],function(error,result){
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