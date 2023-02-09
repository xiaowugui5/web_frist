$(function(){
    getuserinfo()

    let layer =layui.layer
    $("#tuichu_btn").on("click",function(){
        //console.log(1)
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token")
            location.href="/login.html"
            layer.close(index);
          });
    })
})

function getuserinfo(){
    //console.log(1)
    $.ajax({
        method:"get",
        url:"/my/userinfo",
        // headers:{
        // Authorization:localStorage.getItem("token")  ||  " "
        // },
        success:function(res){
            if(res.status !==0){
                return layui.layer.msg("获取用户信息失败")
            }
            renderuser(res.data)
        }
    //     complete:function(res){
    //          console.log(res)
    //          if(res.responseJSON.status===1&&res.responseJSON.message==="身份认证失败！"){
    //             localStorage.removeItem("token")
    //             location.href="/login.html"
    //          }
    //    }
    })
}

function renderuser(user){
    let name=user.nickname||user.username 
    $("#welcome").html("欢迎&nbsp;&nbsp;"+name)
    if(user.user_pic!==null){
        $(".layui-nav-img").attr("src",user.user_pic).show()
        $(".text_avatar").hide()
    }else{
        $(".layui-nav-img").hide()
        let text_name=name[0].toUpperCase()
        $(".text_avatar").html(text_name).show()
    }
}
