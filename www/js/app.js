$('#select').click(function(){
  $.post("192.168.0.106:8000/getCityByName", {}, function(data){
        console.log(data.Name);
    });
})
