const functions = require("firebase-functions");

let admin = require("firebase-admin");
const cors = require("cors")({origin:true});

let serviceAccount = require("./test-database2001-firebase-adminsdk-4kags-c9ffb2c010");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-database2001-default-rtdb.firebaseio.com"
});

let db = admin.database();
let ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});


exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    db.ref("msgs").on("value", (snapshot)=>{
      response.send(snapshot.val());
    });
  });
});



exports.login = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    let id = request.body.id;
    let pwd = request.body.pwd;

    db.ref("members/"+id).on("value", (snapshot)=>{
      if(snapshot.val()){
        if(snapshot.val() == pwd){
          response.send({"result":"로그인 되었습니다."});
        }else{
          response.send({"result":"비밀번호가 일치하지 않습니다."});
        }
      }else{
        response.send({"result":"가입되지 않은 회원입니다."});
      }
    });
  }); 
}); 


exports.join = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    let id = request.body.id;
    let pwd = request.body.pwd;
    db.ref("members/"+id).set(pwd);
  });
});
