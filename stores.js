var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
/* GET home page. */
router.get("/fetchallstates", function (req, res, next) {
  pool.query("select * from states", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json({ data: result });
    }
  });
});

router.get("/fetchallstores", function (req, res, next) {
  pool.query("select * from storedetails", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
      res.status(200).json({ data: result });
    }
  });
});



router.post(
  "/insertstore",
  upload.single("picture"),
  function (req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);

    pool.query(
      "insert into storedetails(storestate, storecity, storename, addressone, addresstwo, landmark, lat, lng, contactnumber, emailaddress, picture) values(?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.state,
        req.body.city,
        req.body.storename,
        req.body.addressone,
        req.body.addresstwo,
        req.body.landmark,
        req.body.latitude,
        req.body.longitude,
        req.body.contactno,
        req.body.emailaddress,
        req.body.myfilename,
      ],
      function (error, result) {
        if (error) {
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);


router.post(
  "/editstorepicture",
  upload.single("picture"),
  function (req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);

    pool.query(
      "update storedetails set picture=? where storeid=?",
      [
        
        req.body.myfilename,
        req.body.storeid,
      ],
      function (error, result) {
        if (error) {
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);


router.post(
  "/deletestore",

  function (req, res, next) {
    console.log("BODY:", req.body);


    pool.query(
      "delete from storedetails where storeid=?",
      [
        req.body.storeid
      ],
      function (error, result) {
        if (error) {
          res.status(500).json(false);
        } else {
          res.status(200).json(true);
        }
      }
    );
  }
);




router.post(
  "/updatestoredata",
  
  function (req, res, next) {
    console.log("BODY:", req.body);
    

    pool.query(
      "update  storedetails set storestate=?, storecity=?, storename=?, addressone=?, addresstwo=?, landmark=?, lat=?, lng=?, contactnumber=?, emailaddress=? where storeid=?",
      [
        req.body.state,
        req.body.city,
        req.body.storename,
        req.body.addressone,
        req.body.addresstwo,
        req.body.landmark,
        req.body.latitude,
        req.body.longitude,
        req.body.contactno,
        req.body.emailaddress,
        req.body.storeid,
      ],
      function (error, result) {
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
