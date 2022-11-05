var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/insertprice',function(req, res, next){
    pool.query("insert into price (minprice,maxprice) values(?,?)",[req.body.minprice,req.body.maxprice],function(error,result){
    console.log(error)
    if(error)
    {
        console.log(error)
        res.status(500).json({result:false})
    }
    else
    {
        res.status(200).json(true)}
    })
   
    })

    router.get('/fetchallprice', function(req, res, next) {
        pool.query("select * from price",function(error,result){
        console.log(error)
         if(error)
         {res.status(500).json([])}
         else
         {res.status(200).json({data:result})
         }
        })
        
         });

         router.post('/updatepricedata',function(req,res){
            console.log("BODY:",req.body)
            
            pool.query("update price set minprice=?,maxprice=? where priceid=?",
            [req.body.minprice,req.body.maxprice,req.body.priceid],function(error,result){
            console.log(error)
            if(error)
            {
                console.log(error)
                res.status(500).json(false)}
            else
            {res.status(200).json(true)}
            })
           
            })


                router.post('/deleteprice',function(req,res){
                    console.log("BODY:",req.body)
                    pool.query("delete from price where priceid=?",[req.body.priceid],function(error,result){
         
                    if(error)
                    {
                        console.log(error)
                        res.status(500).json(false)}
                    else
                    {res.status(200).json(true)}
                    })
                   
                    })

  module.exports = router;


