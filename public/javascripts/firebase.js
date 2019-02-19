var config = {
        apiKey: "AIzaSyAaPPZMQg7XkAR530KKvCtQ-JnROH23e24",
        authDomain: "api-project-60239765900.firebaseapp.com",
        databaseURL: "https://api-project-60239765900.firebaseio.com",
        projectId: "api-project-60239765900",
        storageBucket: "",
        messagingSenderId: "60239765900"
};
firebase.initializeApp(config);
var database = firebase.database();
var chatRef = database.ref('/chats');
	
 function isUname(uname='zxc'){
		var name = sessionStorage.getItem('zxcUname');
		// if(name == 'null'){
			$('#exampleModal').modal({
				backdrop : "static",
				keyboard: false
			  });
		// }else{
			// console.log("qwe")
			// console.log(uname)
			if(uname!='zxc'){
				sessionStorage.setItem('zxcUname',uname);
				$('#exampleModal').modal('hide');
				chatListen();
			}
		// }
	  }

      function send(message){
          var time = new Date().getTime();
		  var name = sessionStorage.getItem('zxcUname');
		  
          chatRef.push({'user':name,'message':message, 'time':time})
              .then(function(e){
                  $('#btn-input').val(null);
              })
              .catch(function(){
                  alert("error try again");
              })
      }
	  
	  function chatListen(){
		chatRef.on('value',function(snapshot){
            var data = snapshot.val();
            var el = "";
            $.each(data,function(e,obj){
                if(obj.time != "undefined"){
                    el+=chatElement(new Date(obj.time).toISOString(), obj.user, obj.message);
                }
            });
            $('.chat').html(el);
			$('.timeago').timeago();
          })
	  }

      function chatElement(time, name, text){
          return '<li class="right clearfix"><span class="chat-img pull-right"> <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" /> </span> <div class="chat-body clearfix"> <div class="header"> <small class=" text-muted"><span class="glyphicon glyphicon-time"></span><time class="timeago" datetime="'+time+'"></time></small> <strong class="pull-right primary-font">'+name+'</strong> </div> <p> '+text+' </p> </div> </li>'; }