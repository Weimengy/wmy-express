//不想用 write  end 太麻烦？  用express
//.....................................命名引入区
const express=require("express");
//引入express
const app=express();
//引用这个cookie-parser
const cookieParser = require("cookie-parser");
//把它实例化
//........................................中间件区
// 中间件调用, 下面这两行代码，实现了给 req 身上加了一个 body 的属性
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 中间件调用，下面这行代码，实现了给 req 加上一个  cookies 的属性，获取cookie数据
app.use(cookieParser());


//...................................代码区
app.get("/",function(req,res){//调用get方法
// res.write("hello express");//写入
// res.end();//结束
res.send("hello express");
})

//中间件（完成表单的输出）

app.get("/handleLogin",function(req,res){//调用get方法
    // res.write("hello express");//写入
    // res.end();//结束
    console.log(req.query);//{}  原来是undefined
    console.log(req.body);//req.body原来是不存在的，需要的 到它需要做一些额外的操作
    res.send("hello req.body");
    })



app.get("/setCookie", function(req, res){//设置cookie
    // 设置cookies
    res.cookie("username", "zhangsan", {
      maxAge: 1000 * 60 * 10
    });
    res.send("cookie设置成功");
  });

  app.get("/getCookie", function(req, res){//获取cookie
    console.log(req.cookies);
    res.send("cookie获取成功");
  });

//............................................动态获取路由参数
// req.params
// 获取路由的动态参数
// localhost:3000/hello/apple
// localhost:3000/hello/banana
// localhost:3000/hello/orange
app.get("/hello/:id", (req, res) => {
    console.log(req.params); // { id: apple}
    res.send("我来了么");
  }); 

  app.get("/world/:name/:age", (req, res) => {
    console.log(req.params); // { name: '张三', age: 18 }
    console.log(req.get("Accept"));
    res.send("hello world");
  });

  app.listen(4000);//监听端口
//nodemon .\server.js运行