const firebaseConfig = {
  apiKey: "AIzaSyC_bwJHZe--tK38Gw-CXQu4trSIn2Wa8fk",
  authDomain: "chatinga.firebaseapp.com",
  databaseURL: "https://chatinga-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatinga",
  storageBucket: "chatinga.appspot.com",
  messagingSenderId: "13463158046",
  appId: "1:13463158046:web:d7532e088be39a27a41d0f"
};
firebase.initializeApp(firebaseConfig);
database = firebase.database();


function sendMsg(){
    let date = new Date();
    let msg = $("#message").val();
    database.ref("msgs/"+date.getTime()).set(msg);
    $("#message").val("");
}

function loadMsgs(){
    database.ref("msgs").on("value", callback);
    function callback(snapshot){
        $("#chatlist").html("");
        console.log(snapshot);
        snapshot.forEach(function(child){
             $("#chatlist").append("<div>"+child.val()+"</div>");
        });
        $("#chatlist").scrollTop(15000);
    }
}
