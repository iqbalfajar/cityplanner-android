window.addEventListener('blur',function(){
	  if(document.activeElement.id == 'myFrame'){
		alert('iframe clicked');
	  }
});

window.addEventListener('blur',function(){
	  if(document.activeElement.class == 'a-iframe'){
		alert('link in iframe clicked');
	  }
});