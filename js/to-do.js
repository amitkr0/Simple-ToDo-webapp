var data=[];
var count=0;
if(localStorage.getItem('todolist')!==null){
	data = JSON.parse(localStorage.getItem('todolist'));
	console.log(data.length);
	count=localStorage.getItem('count');
	// localStorage.removeItem('todolist');
}
storeActivities();


document.getElementById('addItem').addEventListener('click',function(){
	var val = document.getElementById('new_item').value;
	console.log(val);
	if(val){
		addItemToDo(val);
	}
	else{
		alert('Please Enter any value');
	}
});

document.getElementById('new_item').addEventListener('keydown',function(e){
	var val = document.getElementById('new_item').value;
	if(e.code==='Enter' && val){
		addItemToDo(val);
	}
	else if(e.code==='Enter'){
		alert('Please Enter any value');
	}
});

function dataObjectUploaded(){
	localStorage.removeItem('todolist');
	localStorage.setItem('todolist',JSON.stringify(data));
	localStorage.setItem('count',count);
	// console.log('in updated -- '+data.length);
}


function removeItem(btn){
	var item = btn.parentNode;
	var text = item.innerText;
	var list_item = item.parentNode;
	list_item.removeChild(item);
	data.splice(data.indexOf(text),1);
	count--;
	dataObjectUploaded();
	if(data.length===0){
		document.getElementById('nothing').innerHTML='You have nothing to do';
	}
}

function storeActivities(){
	console.log('count'+count);
	if(data.length===0){
		document.getElementById('nothing').innerHTML='You have nothing to do';
	}
	else{
		document.getElementById('nothing').innerHTML='';
		console.log(data.length);
		for(var i=0;i<count;i=i+1){
			addItemToDo(data[i]);
		}
	}
}

function addItemToDo(val){
	// console.log("data --- "+data.length);
	document.getElementById('nothing').innerHTML='';
	var remove = document.createElement('button');
	remove.innerHTML = 'DELETE';
	remove.addEventListener('click',function(){
		removeItem(this);
	});

	var item = document.createElement('li');
	item.innerText = val + "       ";
	

	var list = document.getElementById('list_todo');
	
	item.appendChild(remove);
	list.insertBefore(item,list.childNodes[0]);

	count++;
	data.push(val); 
	dataObjectUploaded();
	// console.log(val);

}
