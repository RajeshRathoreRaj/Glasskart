var express = require("express");
var router = express.Router();
var pool = require("./pool");

/* GET home page. */
router.post("/checkadminlogin", function (req, res, next) {
  pool.query("select * from administrator where emailid=? and password=?", [req.body.email,req.body.password],function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {
        if(result.length==1)
      res.status(200).json({result:true, data: result });
      else
      res.status(200).json({result:false});
    }
  });
});

module.exports = router;