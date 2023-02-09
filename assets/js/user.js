$(function(){
    var form=layui.form
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return "昵称必须1-6之间"
            }
        }
    })

    renderusers()
//var msg=layui.msg
    function renderusers(){
        $.ajax({
            method:"GET",
            url:"/my/userinfo",
            success:function(res){
              //  console.log(res)
                if(res.status!==0){
                   return layui.msg("获取用户信息失败")
                }
                //console.log(res.data)
                form.val("user_forminfo",res.data)
            }
        })
    }

    $('#btn_reset').on("click",function(e){
     e.preventDefault()
     //alert(1)
        renderusers()
    })

    $("#get_form").on("submit",function(e){
        e.preventDefault()
        console.log(1)
        $.ajax({
            method:"POST",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("用户信息更新失败")
                }
                layer.msg("更新用户信息成功")
                
                //console.log(res)
                window.parent.getuserinfo()
            }
        })
    })
})