document.addEventListener("deviceready", init, false);
const URL = 'http://192.168.0.17:8000/api';

function init() {
//listen for button clicks
        document.querySelector("#firstBtn").addEventListener("touchend", function() {
            // navigator.notification.alert(
            //   "This is a test...", null,"Alert Test", "OK!");
            $.post(URL + '/getCityByName',{}, function(data){
                navigator.notification.alert(data.Name, null, "Test", "OK");
            });

          }, false);
}
