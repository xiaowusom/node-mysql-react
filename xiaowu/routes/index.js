var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var mysql = require('mysql');


/* GET home page. */
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'root',
database : 'test'
});
//执行创建连接 
connection.connect();
var arr = [] ;
connection.query('select * from pets',function(err,rows,fields){
	if(err) throw err;
	arr = rows;
});
router.get('/', function(req, res, next) {
  res.send(arr);
});

// 添加用户
router.get("/add",function(req , res ,next) {
	res.render("add");
})
 router.post('/add', function(req, res, next) {
 	var id=req.body.id;
 	var name=req.body.name;
 	var imgUrl=req.body.imgUrl;
  console.log("我是小五");
  for(var i = 0; i <arr.length; i++){
    if(req.body.name===arr[i].name){
      console.log("我撞衫了");
         connection.query("update pets set imgUrl='"+ imgUrl + "' where name='"+ name + "'" ,function(err,rows,fields){
          connection.query('select * from pets',function(err,rows,fields){
          if(err) throw err;
          arr = rows;
  
         });     
       });
    }else {
        var  addSql = 'insert into pets(id, name, imgUrl) values("'+ id + '","'+ name + '","'+ imgUrl +'")'
        // var modify = 'select*,count(distinct name) from table group by neme';
      // var modify = 'FROM ablum a LEFT JSON '
       connection.query(addSql,function (err,rows, result) {
    connection.query('select * from pets',function(err,rows,fields){
  if(err) throw err;
  arr = rows;
  
});
  
});
    }
  }  
});

// 删除用户
router.post("/del",function(req,res){
  var id = req.body.id;
  var daletdata="delete from pets where id ='"+ id + "'";
  // var userId = JSON.stringify(id);
  connection.query(daletdata,function(err,rows){
    console.log("delete from pets where id ='"+ id + "'")
    if(err){
      res.send("删除失败"+err);
    }else {
      res.send("删除成功");
    }
    connection.query('select * from pets',function(err,rows,fields){
  if(err) throw err;
  arr = rows;
  console.log(arr);
});
  })
})



module.exports = router;
