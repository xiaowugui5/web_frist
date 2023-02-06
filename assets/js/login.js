$(function(){
     $("#link-reg").on("click",function(){
        $(".login-box").hide()
        $(".reg-box").show()
     })

    $("#link-login").on("click",function(){
        $(".login-box").show()
        $(".reg-box").hide()
    })

  let  form=layui.form
let layer =layui.layer
  form.verify({
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位,且不能出现空格'
      ] 
    ,repass:function(value){
        let pass=$(".reg-box [type=password]").val()
        if(pass!==value){
            return '两次密码不一致'
        }
    }
 }) 

 //注册监听表单 
 $("#form_reg").on("submit",function(e){
e.preventDefault()
$.post("/api/reguser",{username:$("#form_reg [name=usename]").val(),password:$("#form_reg [name=password]").val()},function(res){
    if(res.status !==0){
        return layer.msg(res.message)
        console.log(res.message)
    }
    layer.msg("注册成功")
    $("#link-login").click()
})
})

//登录表达监听
$("#login_box").on("submit",function(e){
    e.preventDefault()
    $.post("/api/login",{username:$("#login_box [name=usename]").val(),password:$("#login_box [name=password]").val()},function(res){
        console.log(res)
        if(res.status!==0){
            return layer.msg(res.message)
        }
        layer.msg("登录成功")
        localStorage.setItem("token",res.token)
        location.href="/index.html"
    })
})
})


