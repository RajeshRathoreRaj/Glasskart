var express = require('express');
var router = express.Router();
var pool = require("./pool");


/* GET home page. */
router.post('/checkusermobilenumber',function(req,res){
  console.log(req.body)
  var q="select * from userdetails where mobileno=?";
   pool.query(q,[req.body.mobileno],function(error,result){
       if(error)
       {
         res.status(500).json([])
       }
       else
       {if(result.length==1)
         res.status(200).json({data:result, result:true})
         else
         res.status(200).json({data:[], result:false});
       }

     })

})


router.post('/insertuser',function(req,res){
pool.query("insert into userdetails values(?,?,?,?)",[req.body.emailid,req.body.mobileno,req.body.username,req.body.password],function(error,result){
    if(error)
    {
        res.status(500).json({result:false})
    }
    else
    {
        var data={emailid:req.body.emailid,mobileno:req.body.mobileno,username:req.body.username}
        res.status(200).json({data:data,result:true})
    }
})

    
})


module.exports = router;