var authorData;
const showauthorCards=(data)=>{
	var division=document.getElementById("mbc");
		firebase.storage().ref(data.img).getDownloadURL().then((url) => {
					  novelCoverUrl=url;
					  division.innerHTML+="<div class=\"card_nav\"><div class='card' onclick=\"bookselected(this.nextSibling.innerText);\"><img src=\""+novelCoverUrl+"\"></div>"+
						"<div><center><h1 id='novel_title'>"+data.name+"</h1></center></div></div>";
					  //console.log("done");
					}).catch((err)=>{
						division.innerHTML+="<div class=\"card_nav\"><div class='card' onclick=\"redirect(this.querySelector('#novel_title').innerHTML.replaceAll(' ','_'))\"><img src='' alt='Try Reloding page,Image error'><div id='card_data'></div>"+
						"<div><center><h1 id='novel_title'>"+data.name+"</h1></center></div></div>";
						console.log("Cover Image Not Found: "+err);
						});
	
}
const chapter_upload=(ele)=>{
	const dataArray=document.querySelectorAll('input');
	const name=dataArray[0].value.replaceAll(" ","_").replaceAll("Selected_book:_","");
	firebase.database().ref("Novels/"+dataArray[0].value.replaceAll(" ","_").replaceAll("Selected_book:_","")).get().then((content)=>{
		console.log("found");
			try{
			 count=Object.keys(content.val().data).length;
			}catch(err){
				 count=0;
			}
			if(isNaN(count)){
				 count=0;
			 }
			const chcontent="<h1>Chapter: "+(count+1)+" - "+dataArray[1].value+"</h1><br><br><p id=\'chdata\'>"+document.getElementById("text_area").innerHTML+"</p><br><br><br>";
			data=content.val().data;
			data+=chcontent;
			firebase.database().ref("Novels/"+name+"/updated").set(Date()).then((snapshot)=>{alert("time updated")});
			firebase.database().ref("Novels/"+name+"/data/Chapter_"+(parseInt(Object.keys(content.val().data).length)+1)).set(data).then((a)=>{alert("chapter content updated");
			count=Object.keys(content.val().data).length;
			console.log(content.val().data);
			firebase.database().ref("Novels/"+name+"/chapter").set(count+1).then((snapshot)=>{alert("chapter count updated")});});
		
	}).catch((err)=>{console.log(err)});
}
const novelupload=(ele)=>{
	const dataArray=document.querySelectorAll('input');
	const data={
		name:dataArray[0].value,
		author:authorData.name,
		img:dataArray[0].value+"/"+name+"/"+document.querySelectorAll('input#coverimage')[0].files[0].name,
		likes:0,
		stat:document.querySelectorAll("select")[2].value,
		type:document.querySelectorAll("select")[3].value,
		synopsys:document.getElementById("synopsis_area").innerHTML,
		updated:Date(),
		viwers:"",
		views:0,
		genre:stringify(genrelist),
		tags:stringify(taglist),
		chapter:0,
		data:new Object(),
		patreon:dataArray[2].value;
		webnovel:dataArray[3].value;
	}
	firebase.database().ref("Novels/"+data.name.replaceAll(" ","_")).set(data).then((e)=>{
		alert("Novel Data Uploaded");
		firebase.storage().ref(data.img).put(document.querySelectorAll('input#coverimage')[0].files[0]).then((a)=>{
			alert("Cover Image Successfully uploaded");
		}).then((c)=>{
			firebase.database().ref("Authors/"+authorData.email.replaceAll(".","(dot)")+"/novels").get().then((snap)=>{
				list=snap.val().split(",");
				list.push(data.name.replaceAll(" ","_"));
				firebase.database().ref("Authors/"+authorData.email.replaceAll(".","(dot)")+"/novels").set(stringify(list)).then((a)=>{
					alert("author list updated");
				})
			})
		})
	})
}
const loadPreview=(ele)=>{
	document.getElementById("coverpreview").src=URL.createObjectURL(ele.files[0]);
}
const newbook=()=>{
	html='<div class="chapter_nav">'+
			'<div class="chapter_metadata">'+
				'<input type=text placeHolder="Title" id="ntitle">'+
				'<input type=file id="coverimage" onchange="loadPreview(this)">'+
				'<img src="" id="coverpreview" alt="Cover Image Preview">'+
				'<div class="genres">'+
					'<span >genres:</span>'+
					'<div class="genre_holder" id="genre_holdr"></div>'+
						'<select onchange="addgenre(this.value)">'+
							'<option >Adventure</option>'+
							'<option >Urban</option>'+
							'<option >Fantasy</option>'+
							'<option >History</option>'+
							'<option >Horror</option>'+
							'<option >Sci-fi</option>'+
							'<option >Sports</option>'+
							'<option >Games</option>'+
							'<option >Eastern</option>'+
							'<option >Realistic</option>'+
							'<option >Action</option>'+
							'<option >War</option>'+
							'<option >Books & Literature</option>'+
							'<option >Celebrities & Real People</option>'+	
							'<option >Music & Band</option>'+	
							'<option >Theater</option>'+	
							'<option >Video Games</option>'+	
							'<option >Anime & Comics</option>'+	
							'<option >Movies</option>'+	
						'</select>'+	
				'</div>'+
				'<div class="tags">'+
					'<span>Tags:</span>'+
					'<div class="tag_holder" id="tag_holdr"></div>'+
						'<select onchange="addtag(this.value)">'+
								'<option >Adventure</option>'+
								'<option >Romance</option>'+
								'<option >Action</option>'+
								'<option >Reincarnation</option>'+
								'<option >Horror</option>'+
								'<option >Sci-fi</option>'+
								'<option >Sports</option>'+
								'<option >Games</option>'+
								'<option >Eastern</option>'+
								'<option >Realistic</option>'+
								'<option >Cultivation</option>'+
								'<option >War</option>'+
								'<option >Teen</option>'+
								'<option >LGBT+</option>'+	
								'<option >Harem</option>'+	
								'<option >Comedy</option>'+	
								'<option >Mordern</option>'+
						'</select>'+	
				'</div>'+
				'<select id="fifty">'+
					'<option value="Coming Soon">Coming Soon</option>'+
					'<option value="Live">Live</option>'+
					'<option value="Closed">Closed</option>'+
				'</select>'+
				'<select id="fifty">'+
					'<option value="Male Lead">Male Lead</option>'+
					'<option value="Female Lead">Female Lead</option>'+
					'<option value="Closed">Closed</option>'+
				'</select>'+
				'<input type=text placeHolder="Patreon Link">'+
				'<input type=text placeHolder="Web Novel Link">'+
				'<h2>Synopsis</h2>'+
				'<div class="synopsys_area" id="synopsis_area" contenteditable=true></div>'+
			'</div>'+
			'<button onclick=novelupload(this.parentElement)>Upload</button>'+
		'</div>';
	document.getElementById("form_data").innerHTML=html;	
}
const bookselected=(name)=>{
	bookname=name.replaceAll(" ","_");
	bookHTML="<input type=text id=\"selectedbook\" readonly><input type=text placeHolder=\"Title\" id=\"chtitle\"><input type=file id=\"img&vids\"><div class=\"editor_nav\">"+
				"<button onclick=\"setUrl('img')\">+IMG</button>"+
				"<button onclick=\"setUrl('link')\">+LINK</button>"+
				"<button onclick=\"qoute('formatBlock','<h1>');colorize(this)\">\"</button>"+
				"<button onclick=\"format('bold');colorize(this)\"><b>B</b></button>"+
				"<button onclick=\"format('italic');colorize(this)\"><i>I</i></button>"+
				"<button onclick=\"format('underline');colorize(this)\"><u>U</u></button>"+
				"<button onclick=\"format('justifycenter')\">center</button>"+
				"<button onclick=\"format('justifyleft')\">left</button>"+
				"<button onclick=\"format('justifyright')\">right</button>"+
				"<button onclick=\"setfontsize(parseInt(nextSibling.value - 1));nextSibling.value-=1\">-</button>"+
				"<input onkeyup=\"setfontsize(parseInt(this.value))\" id=\"fsize\" value=1 size=1>"+
				"<button onclick=\"previousElementSibling.value=parseInt(previousElementSibling.value)+1;setfontsize(parseInt(previousElementSibling.value));\">+</button>"+
				"<button onclick=\"format('insertorderedlist');colorize(this);\">ordered</button>"+
				"<button onclick=\"format('insertunorderedlist');colorize(this);\">unordered</button>"+
				"<button onclick=\"format('strikeThrough');colorize(this)\">strike</button>"+
				"<button onclick=\"format('subscript');colorize(this)\">sub</button>"+
				"<button onclick=\"format('superscript');colorize(this)\">sup</button>"+
				"<input type=text id=urlfield placeHolder=\"All links will be pasted here\">"+
			"</div>"+
			"<div class=text_area id=text_area onkeydown=\"(e)=>{checkEnterKey(e)}\" contenteditable=true></div>"+
			"<button onclick=chapter_upload(this.parentElement)>Upload</button>"+
		"</div>";
	document.getElementById("form_data").innerHTML=bookHTML;
	document.getElementById("selectedbook").value="Selected_book: "+name;
}
const getauthornovels=(data)=>{
				firebase.database().ref("Authors/"+data.email.replaceAll(".","(dot)")+"/novels").get().then((snap)=>{
					if(snap.exists()){
						const novelarray=snap.val().split(",");
						firebase.database().ref("Novels").get().then((snapshot)=>{
							for(i in snapshot.val()){
								for(j in novelarray){
									if(i==novelarray[j]){
										//console.log(snapshot.val()[i]);
										showauthorCards(snapshot.val()[i]);
									}
								}
							}
						})
					}
					else{
						console.log("not found");
					}
				})
			}
			
			
var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
			firebase.auth().languageCode = 'it';
			firebase.auth()
			  .signInWithPopup(provider)
			  .then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				//var credential = result.credential;
				document.getElementById("a_name").innerHTML+="&nbsp;<h1>"+firebase.auth().currentUser.displayName+"</h1>";
				// This gives you a Google Access Token. You can use it to access the Google API.
				//var token = credential.accessToken;
				// The signed-in user info.
				//var user = result.user;
				var data={
					"name":result.user.displayName,
					"email":result.user.email,
					"picURL":result.user.photoURL,
					"novels":""
				}
				AaccExist(data.email.replaceAll(".","(dot)"),data);
				// ...
			  }).catch((error) => {
				// Handle Errors here.
				//console.log(error);
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
			  });
			  		
			function AaccExist(profile,data){
				firebase.database().ref("Authors/").get().then((snapshot)=>{
					for(i in snapshot.val()){
						if(i==profile){
							localStorage.setItem("novels",stringify(snapshot.val()[profile].novels));
							authorData=snapshot.val()[profile];
							firebase.database().ref("Authors/"+profile+"/picURL").set(data.picURL);
							document.getElementById("authorPic").src=data.picURL;
							console.log("welcome")
							return getauthornovels(authorData);
						}
					}
					firebase.database().ref("Authors/"+profile).set(data).then((a)=>{
						authorData=data;
						document.getElementById("authorPic").src=data.picURL;
						console.log("hi there!!");
						return false;
					});
				}).catch((err)=>{
					console.log(err);
				})
				
			}		
			
			
			
			var taglist=[];
			var genrelist=[];
			try{
				var el = document.getElementById("text_area");
				el.addEventListener("keyup", function(event) {
					console.log(event.key)
				});
				}
			catch(err){
				console.log("error");
				};
			function addtag(name){
				if(!taglist.includes(name)){
					taglist.push(name);
					document.getElementById("tag_holdr").innerHTML+="<span class=\"tag_title\"><span class='rmtag' onclick=\"rmtag(this)\">&times&nbsp;"+name+"</span></span> ";
				}
			}
			function rmtag(ele){				
				taglist = taglist.filter(data => data != ele.innerHTML.replace("×&nbsp;",""))
				ele.parentElement.parentElement.removeChild(ele.parentElement);
			}
			function addgenre(name){
				if(!genrelist.includes(name)){
					genrelist.push(name);
					document.getElementById("genre_holdr").innerHTML+="<span class=\"genre_title\"><span class='rmgenre' onclick=\"rmgenre(this)\">&times&nbsp;"+name+"</span></span> ";
				}
			}
			function rmgenre(ele){				
				genrelist = genrelist.filter(data => data != ele.innerHTML.replace("×&nbsp;",""))
				ele.parentElement.parentElement.removeChild(ele.parentElement);
			}
			try{
			window.addEventListener('load', function(){
				//document.getElementById('text_area').setAttribute('contenteditable', 'true');
				//document.getElementById('urlfield').setAttribute('contenteditable', 'true');
			});
			}
			catch(err){
				console.log("error");
			}
			function format(command, value) {
				document.execCommand(command, false, value);
			}
			var bookName;
			function getReaderurl(ele){
				const [file]=ele.files;
				return URL.createObjectURL(file);
			}
			function setUrl(type) {
				var url = document.getElementById('urlfield').value;
				var sText = document.getSelection();
				const medialink=document.getElementById('img&vids');
				if(type=='link'){
				document.execCommand('insertHTML', false,'<a href="' + url + '" target="_blank">' + sText + '</a>');
				document.getElementById('urlfield').value = '';
				}
				else if(type=='img'){
					var chtitle=document.getElementById("chtitle").value;
					document.execCommand('insertHTML', false, '<div id="chimageholder"><img id="chimage" src="' +getReaderurl(medialink)+ '" class="chapter_image" tempsrc="'+bookname+"/"+chtitle+"/"+medialink.files[0].name+'"><div>');
					firebase.storage().ref(bookname+"/"+chtitle+"/"+medialink.files[0].name).put(medialink.files[0]).then((snapshot)=>{alert("uploaded")});
					alert("done");
				}
			}
			
			function colorize(ele){
				if(ele.style.background=='rgb(227, 66, 52)'){
					ele.style.background='#ddd';
					ele.style.color='#000';
					ele.style.border='1px solid';
				}
				else{
					ele.style.background='#E34234';
					ele.style.color='#fff';
				}
			}
			function setfontsize(num){
				if(num==NaN){
					document.getElementById("fsize").value="";
				}
				else if(num<=54 && num>=0){
					format('fontSize',num);
				}
			}
			var qouteflag=false;
			function qoute(cm,val){
				if(qouteflag){
					document.getSelection().replace("<blockquote>","").replace("</blockquote>","");
					qouteflag=false;
				}
				else{
					format("formatBlock","<blockquote>");
					qouteflag=true;
				}
				console.log(qouteflag);
			}

