const setcontentdata=(ele)=>{
	if(ele=="synopsis"){
		document.getElementById(ele).style.borderBottom="2px solid #eee";
		document.getElementById("tbc").style.border="none";
		document.getElementById("synopsys_data").style.width='100%';
		document.getElementById("synopsys_data").style.color='#fff';
		document.getElementById("content").style.width='0%';
		document.getElementById("content").style.color='transparent';
		
	}
	else{
		document.getElementById(ele).style.borderBottom="2px solid #eee";
		document.getElementById("synopsis").style.border="none";
		document.getElementById("synopsys_data").style.width='0%';
		document.getElementById("synopsys_data").style.color='transparent';
		document.getElementById("content").style.width='100%';
		document.getElementById("content").style.color='#000';
		
	}
}
	  // Your web app's Firebase configuration
	  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
	  var firebaseConfig = {
		apiKey: "AIzaSyAteQAHAOUG8Vv1AjOLkKbRHSL-lWrc98k",
		authDomain: "bingetranslation.firebaseapp.com",
		projectId: "bingetranslation",
		storageBucket: "bingetranslation.appspot.com",
		messagingSenderId: "452863953281",
		appId: "1:452863953281:web:b4005781ba1db5eaaa0080",
		measurementId: "G-Q5CT2JD0JW"
	  };
	  // Initialize Firebase
	  firebase.initializeApp(firebaseConfig);
	  firebase.analytics();
	  var storage = firebase.storage();

function redirect(sessionVar){
	setSessionVariable(sessionVar);
	window.location=window.location+"view_novel.html"
}
var novelCoverUrl;
function showCards(data){
	var division=document.getElementById("card_holder");
	for(key in data){
		const keyid=key;
	firebase.storage().ref(data[keyid].img).getDownloadURL()
					.then((url) => {
					  novelCoverUrl=url;
					  division.innerHTML+="<div class=\"card_nav\" onclick=\"redirect(this.querySelector('#novel_title').innerHTML.replaceAll(' ','_'))\" ><div class='card' ><img src=\""+novelCoverUrl+"\"></div>"+
						"<div><center><h1 id='novel_title'>"+data[keyid].name+"</h1></center></div></div>";
					  //console.log("done");
					}).catch((err)=>{
						division.innerHTML+="<a href=\"\"><div class=\"card_nav\"><div class='card' onclick=\"redirect(this.querySelector('#novel_title').innerHTML.replaceAll(' ','_'))\"><img src='' alt='Try Reloding page,Image error'><div id='card_data'></div>"+
						"<div><center><h1 id='novel_title'>"+data[keyid].name+"</h1></center></div></div>";
						console.log("Cover Image Not Found: "+err);
						});
	
	}
}
function calcZone(updatedTimeData,userhouroffset,userminuteoffset){
	month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	 temp=updatedTimeData.time[1]+userminuteoffset;
	 if(temp>60){
		 updatedTimeData.time[1]=temp%60;
		 updatedTimeData.time[0]+=1;
	 }
	 else if(temp<0){
		 updatedTimeData.time[1]=(0-temp)%60;
		 updatedTimeData.time[0]-=1;
	 }
	 temp=updatedTimeData.time[0]+userhouroffset;
	 tempm=(month.indexOf(updatedTimeData.month));
	 updatedTimeData.time[0]=(updatedTimeData.time[0]+userhouroffset)%24;
	 //console.log(temp,tempm,updatedTimeData.time);
	 if(temp > 23 || temp < 0){
		 if(temp>23){
			 updatedTimeData.date+=1;
			 if(month.indexOf(updatedTimeData.month)>6){
				 if(month.indexOf(updatedTimeData.month)%2){
					 if(updatedTimeData.date>30){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)+1)%12]
						 updatedTimeData.date%=31;
					 }
				 }
				 else{
					 if(updatedTimeData.date>31){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)+1)%12]
						 updatedTimeData.date%=32;
					 }
				 }
			 }
			 if(updatedTimeData.month=='Feb'){
				 if(updatedTimeData.date>29 && !updatedTimeData.year%4){
						updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)+1)%12]
						 updatedTimeData.date%=30;
					 }
				else{
					updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)+1)%12]
					updatedTimeData.date%=29;
				}
			 }
			 else{
				 if(month.indexOf(updatedTimeData.month)%2){
					 if(updatedTimeData.date>30){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)+1)%12]
						 updatedTimeData.date%=31;
					 }
				 }
				 else{
					 if(updatedTimeData.date>31){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)+1)%12]
						 updatedTimeData.date%=32;
					 }
				 }
			 }
			 if(tempm!=month.indexOf(updatedTimeData.month)){
				 updatedTimeData.year+=1;
			 }
		 }
		 else{
			 updatedTimeData.date-=1;
			 if(month.indexOf(updatedTimeData.month)>6){
				 if(month.indexOf(updatedTimeData.month)%2){
					 if(updatedTimeData.date<1){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)-1)%12]
						 updatedTimeData.date%=31;
					 }
				 }
				 else{
					 if(updatedTimeData.date<1){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)-1)%12]
						 updatedTimeData.date%=32;
					 }
				 }
			 }
			 else if(updatedTimeData.month=='Mar'){
				 if(updatedTimeData.date<0 && !updatedTimeData.year%4){
						updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)-1)%12]
						 updatedTimeData.date%=29;
					 }
				else{
					updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)-1)%12]
					updatedTimeData.date%=28;
				}
			 }
			 else{
				 if(month.indexOf(updatedTimeData.month)%2){
					 if(updatedTimeData.date<0){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)-1)%12]
						 updatedTimeData.date%=31;
					 }
				 }
				 else{
					 if(updatedTimeData.date>31){
						 updatedTimeData.month=month[(month.indexOf(updatedTimeData.month)-1)%12]
						 updatedTimeData.date%=32;
					 }
				 }
			 }
			 if(tempm!=month.indexOf(updatedTimeData.month)){
				 updatedTimeData.year-=1;
			 }
		 }
	 }
	//console.log(updatedTimeData.time);
	return updatedTimeData;
}
function usertime(updated){
	var ret;
	month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	userT=new Date();
	 updated=updated.split(" ");
	 updatedTimeData={"day":updated[0],"month":updated[1],"date":parseInt(updated[2]),"year":parseInt(updated[3]),"time":updated[4].split(":"),"toffset":updated[5],"timezone":updated[6]+" "+updated[7]+" "+updated[8]}
	 for(i in updatedTimeData.time){
		 updatedTimeData.time[i]=parseInt(updatedTimeData.time[i]);
	 }
	 userzone=userT.getTimezoneOffset();
	 userhouroffset=parseInt(userzone/60);
	 userminuteoffset=parseInt((userzone%60));
	 updatedTimeData=calcZone(updatedTimeData,userhouroffset,userminuteoffset);
	 updatedTimeData.toffset=parseInt(updatedTimeData.toffset.replace("GMT",""));
	 hoffset=parseInt(updatedTimeData.toffset/100);
	 moffset=updatedTimeData.toffset%100;
	 //console.log(hoffset,moffset);
	 updatedTimeData=calcZone(updatedTimeData,hoffset,moffset);
	 if(userT.getFullYear()===updatedTimeData.year){
		 if(userT.getMonth()===month.indexOf(updatedTimeData.month)){
			 if(userT.getDate()===updatedTimeData.date){
				 if(userT.getHours()===updatedTimeData.time[0]){
					 if(userT.getMinutes()===updatedTimeData.time[1]){
						 if(userT.getMinutes()===updatedTimeData.time[2]){
							 ret=0+" second";
						 }
						 else{
							temp=(userT.getHours()-updatedTimeData.time[2]);
							ret=(userT.getHours()-updatedTimeData.time[2])+" second";
						 }
					 }
					 else{
						temp=(userT.getHours()-updatedTimeData.time[1]);
						ret=(userT.getHours()-updatedTimeData.time[1])+" minute";
					 }
				 }
				 else{
					temp=(userT.getHours()-updatedTimeData.time[0]);
					ret=(userT.getHours()-updatedTimeData.time[0])+" hour";
				 }
			 }
			 else{
				temp=(userT.getDate()-updatedTimeData.date);
				ret=(userT.getDate()-updatedTimeData.date)+" day";
			 }
		 }
		 else{
			temp=(userT.getMonth()-month.indexOf(updatedTimeData.month));
			ret=(userT.getMonth()-month.indexOf(updatedTimeData.month))+" month";
		 }
	 }
	 else{
		 temp=(userT.getFullYear()-updatedTimeData.year)
		 ret=(userT.getFullYear()-updatedTimeData.year)+" year";
	 }
	 if(temp>1){
		 ret+="s";
	 }
	 ret+=" Ago";
	 //console.log(updatedTimeData.time);
	 return ret;
}
function showFullCard(name){
	const dbRef=firebase.database().ref("Novels/"+name);
	var division=document.getElementById("card_holder");
	function fun(){
			  dbRef.get().then((snapshot) => {
				if (snapshot.exists()) {
				  //console.log(snapshot.val());
				  var data=snapshot.val();
					firebase.storage().ref(data["img"]).getDownloadURL().then((url)=>{
						division.innerHTML+="<div class='fullcard'><img src=\""+url+"\"><div id='fullcard_data'><h1 id='novel_title'>"+data["name"]+
						"</h1><span class='fullcard_stat'><table><tr><th>Author</th><td>"+data["author"]+"</td></tr><tr><th>Chapters</th><td>"+data["chapter"]+"</td></tr><tr><th>Genre</th><td>"+data["genre"]+"</td></tr><tr><th>Status</th><td>"+data["stat"]+"</td></tr><tr><th>Views</th><td>"+data["views"]+"</td></tr><tr><th>Last Updated</th><td>"+usertime(data["updated"])+"</td></tr><tr><th>likes</th><td>"+data.likes+"</td></tr><tr><th>tags</th><td>"+data.tags+"</td></tr></table></span></div><div class='card_btn'><button id='read' class='novel_card_btn' onclick=\"setSessionVariable(this.parentElement.parentElement.querySelector('#novel_title').innerHTML.replaceAll(' ','_'),flag=true)\">Read</button><button id='share' class='novel_card_btn'>Share</button><button id='patreon' class='novel_card_btn'>Patreon</button><button id='discord' class='novel_card_btn'>Discord</button><button id='webnovel' class='novel_card_btn'>Webnovel</button></div></div>"+
						"</div>";
						document.getElementById("synopsys_data").innerHTML=data["synopsys"];
					}).catch((err)=>{console.log(err);fun()})
				} else {
				  console.log("No data available");
				}
			  }).catch((error) => {
				console.error(error);
				fun();
			  });
			  }
			  fun();
}
function success(){
			console.log("Thank you for coming");
		}
		
function saveToFirebase(data) {
			    var emailObject = {
				email: "kss1232001@gmail.com"
			    };
				function report(state) {
				  console.log('Permission ' + state);
				}
			    firebase.database().ref('Novels/'+data.name.replaceAll(" ","_")).set(data)
				.then(function(snapshot) {
				    success();// some success method
				}, function(error) {
				    console.log('error' + error);
				});
			}
			
function readOnceWithGet() {
			  // [START rtdb_read_once_get]
			  const dbRef = firebase.database().ref('Novels');
			  function fun(){
			  dbRef.get().then((snapshot) => {
				if (snapshot.exists()) {
				  //console.log(snapshot.val());
				  showCards(snapshot.val());
				} else {
				  console.log("No data available");
				}
			  }).catch((error) => {
				console.error(error);
				fun();
			  });
			  }
			  fun();
			  // [END rtdb_read_once_get]
			}
			
function setSessionVariable(name, flag=false){
			localStorage.setItem("name",name)
			localStorage.setItem("liked_novels","");
			if(flag)window.location.replace("read.html");
}
var accdata;
var profileExist=false;
function GaccExist(profile,data){
	firebase.database().ref("GUsers/").get().then((snapshot)=>{
		for(i in snapshot.val()){
			if(i==profile){
				localStorage.setItem("liked_novels",stringify(snapshot.val()[profile].liked_novels));
				console.log("welcome")
				return true;
			}
		}
		firebase.database().ref("GUsers/"+profile.replaceAll('.','(dot)')).set(data);
		console.log("hi there!!")
		return false;
	})
}			
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  /*console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.*/
  var data={
		  name:profile.getName(),
		  imgUrl:profile.getImageUrl(),
		  email:profile.getEmail(),
		  liked_novels:","
	  };
	localStorage.setItem("UserdbHandle",profile.getEmail().replaceAll('.','(dot)'))
	GaccExist(profile.getEmail().replaceAll('.','(dot)'),data);
	

	document.getElementById("SignIn").className='img';
	document.getElementById("SignIn").innerHTML='';
	document.getElementById("SignIn").title='Click To SignOut';
	document.getElementById("SignIn").setAttribute("onclick","signOut()");
	document.getElementById("SignIn").style.background='url('+profile.getImageUrl()+')';
	document.getElementById("SignIn").style.padding='10px';
	document.getElementById("SignIn").style.backgroundSize='100%';
	document.getElementById("SignIn").style.width='30px';
	document.getElementById("SignIn").style.height='30px';
	document.getElementById("log").style.marginRight='10px';
}

function signOut(){
	gapi.auth2.getAuthInstance().signOut();
	localStorage.clear();
	document.getElementById("SignIn").className='g-signin2';
	window.location.reload();
	}


function stringify(input){
		output="";
		for(i in input){
			output+=input[i]+",";
		}
		output=output.replaceAll("\\","").replaceAll("[","").replaceAll("]","").replaceAll(",,",",");
		return output.slice(0, -1);;
	}

function existIn(parentEle,child){
	for(i in parentEle){
		if(parentEle[i]==child){
			return true;
		}
	}
	return false;
}

var item;
function check(ele){
	item=ele.id;
}
var count;
function setImgUrl(ele,name){
	console.log(ele);
	firebase.storage().ref(name).getDownloadURL().then((url)=>{ele.src=url});
}
function chapterUpload(name){
	var data;
	firebase.storage().ref(imgAdd).put(document.getElementById("chimage").files[0]).then((abc)=>{
	var chcontent="<h1>"+document.getElementById("chName").value+"</h1><br><br><p id=\'chdata\'>"+document.getElementById("chContent").value+"</p ><img src="+document.getElementById("chimage").value+"><br><br><br>";
	var ch;
	firebase.database().ref("Novels/"+name).get().then((content)=>{
		if(content.exists()){
			count=Object.keys(content.val().data).length;
			var chcontent="<h1>Chapter: "+(count+1)+" - "+document.getElementById("chName").value+"</h1><br><br><p id=\'chdata\'>"+document.getElementById("chContent").value+"</p ><img src=\"#\" onload=\"setImgUrl(this,"+imgAdd+")\"><br><br><br>";
			data=content.val().data;
			ch=content.val().chapter;
			data+=chcontent;
			firebase.database().ref("Novels/"+name+"/updated").set(Date()).then((snapshot)=>{console.log("time updated")});
			firebase.database().ref("Novels/"+name+"/data/"+document.getElementById("chName").value.replaceAll(" ","_")).set(data).then((a)=>{console.log("chapter content updated")});
			firebase.database().ref("Novels/"+name+"/chapter").set(Object.keys(content.val().data).length).then((snapshot)=>{console.log("chapter count updated")});
		}
	})}).catch((err)=>{console.log(err)});
}
function bookFound(name){
	document.querySelector(".form_data").innerHTML+="<h5>Book name "+name+" Found</h5><br><br>"+
	"<input type=text placeholder=\"Chapter Name\" id=\"chName\">"+
	"<textarea Placeholder=\"Chapter Content\" id=\"chContent\"></textarea>"+
	"<input type=file placeholder=\"Chapter End Image\" id=\"chimage\"><br><br>"+
	"<button title="+name+" id=button onclick=chapterUpload(this.title)>Upload</button>"
}
function search_book(name){
	name=name.replaceAll(" ","_");
	var flag;
	firebase.database().ref("Novels").get().then((snapshot)=>{
		if(snapshot.exists()){
			for(key in snapshot.val()){
				if(key==name){
					flag=1;
					return bookFound(name);
				}
			}
			flag=0;
		}
		else{
			flag=0 ;
		}
	})
}


function novel_upload(novelDataElement){
	var dataArray=novelDataElement.querySelectorAll("input");
	var dataToUpload={
				name:dataArray[0].value,
				author:dataArray[1].value,
				synopsys:"<pre>"+novelDataElement.querySelector("textarea").value+"</pre><br><br><br>",
				img:dataArray[0].value.replaceAll(" ","_")+"/"+dataArray[6].files[0].name,
				chapter:0,
				data:	"",
				genre:dataArray[2].value,
				stat:dataArray[3].value,
				updated:Date(),
				views:0,
				viewers:"",
				likes:0,
				patreon:dataArray[4].value,
				webnovel:dataArray[5].value
	}
	firebase.storage().ref(dataToUpload.img).put(dataArray[6].files[0]).then((snapshot)=>{alert("uploaded");saveToFirebase(dataToUpload)});
}

function ifExistIn(pr,ch){
	for(i in pr){
		if(pr[i]==ch){
			return true;
			break;
		}
	}
	return false;
}
function home(){
	localStorage.clear();
	window.location="https://bingefics.com";
}

var text=document.querySelectorAll("#synopsys_data");
  var novel_name=document.querySelectorAll("#novel_title");
  //loading font
  const bangersFont = new FontFace('try', 'url(font/Poppins-Italic.ttf)');
  bangersFont.load().then(function(loadedFont) {
    document.fonts.add(loadedFont)
	for(i=0;i<text.length;i++)
		text[i].style.fontFamily = '"try"';
		}).catch(function(error) {
			console.log('Failed to load font: ' + error)
		})

function loadcontent(name){
	firebase.database().ref("Novels/"+name+"/data").get().then((snapshot)=>{
		if(snapshot.exists()){
			for(i in snapshot.val()){
				document.getElementById("innercontent").innerHTML+="<li onmouseover=\"localStorage.setItem('child','"+i+"');\"><a href='read.html'>"+i.replaceAll("_"," ")+"</a></li>";
			}	
		}
	}).catch((error) =>{loadcontent(name)});
}



	
