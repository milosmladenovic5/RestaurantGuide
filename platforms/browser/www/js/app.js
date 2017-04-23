$('#select').click(function(){
  $.post(" 192.168.0.106:8000/getCityByName", {}, function(data){
         $.each(data, function(index, value){
            alert(data.Name);
         });
    });
})
