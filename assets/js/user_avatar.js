$(function(){

      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)


  $("#choose_pic").on("click",function(){
    $("#file").click()
  })

  $("#file").on("change",function(e){
    // let file = e.files[0]
     console.log(e)
    // let fd = new FormData()
    // fd.append('avatar', file)
    // console.log(fd)
    var filelist=e.target.files
    if(filelist.length===0){
        return layui.layer.msg("请选择照片")
    }
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })


      $("#yes_btn").on("click",function(){
        
  var dataURL = $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 100,
    height: 100
  })
  .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

   //console.log(1)
      $.ajax({
      method:'POST',
      url:'/my/update/avatar',
      data:{
        avatar:dataURL
        },
      success:function(res){
      console.log(res)
      if(res.status!==0){
        return layui.layer.msg("更新头像失败")
      }
      layui.layer.msg("更新头像成功")
      window.parent.getuserinfo()
      }
    })
  })
}) 

 