var express = require('express');
var router = express.Router();
const upload = require('./multer');
var pool=require('./pool')
router.post('/insertshapes',upload.single("adpicture"), function(req, res, next) {
    console.log("BODY:",req.body)
    console.log("FILE:",req.file)
     pool.query("insert into shapes(shapename,status, adpicture) values(?,?,?)",[req.body.shapename,req.body.status,req.body.myfilename],function(error,result){
 if(error)
 {
     console.log("ERROR",error)
     res.status(500).json(false)
 }
 else{
 res.status(200).json(true)
 console.log("RESULT",result)
 
 }
 
     })
   
 });
 router.get('/fetchallshapes', function(req, res, next) {
    pool.query('select * from shapes',function(error,result){
if(error)
{
    res.status(500).json([])
}
else{
res.status(200).json({data:result})
}

    })
  
});
router.post('/updateshapedata',function(req, res, next) {
    console.log("BODY:",req.body)
    
    pool.query("update shapes set shapename=?, status=? where shapeid=?",
    [req.body.shapename,req.body.status,req.body.shapeid],function(error,result){
 if(error)
 {
     console.log("ERROR",error)
     res.status(500).json(false)
 }
 else{
 res.status(200).json(true)
 console.log("RESULT",result)
 
 }
 
     })
   
 });
 router.post('/editshapepicture',upload.single("adpicture"), function(req, res, next) {
    
    console.log("FILE:",req.file)
     pool.query("update shapes set adpicture=? where shapeid=?",[req.body.myfilename,req.body.shapeid],function(error,result){
 if(error)
 {
     console.log("ERROR",error)
     res.status(500).json(false)
 }
 else{
 res.status(200).json(true)
 console.log("RESULT",result)
 
 }
 
     })
   
 });
 router.post('/deleteshape', function(req, res, next) {
    
    console.log("FILE:",req.file)
     pool.query("delete from shapes where shapeid=?",[req.body.shapeid],function(error,result){
 if(error)
 {
     console.log("ERROR",error)
     res.status(500).json(false)
 }
 else{
 res.status(200).json(true)
 console.log("RESULT",result)
 
 }
 
     })
   
 });
 module.exports = router;