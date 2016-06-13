
$(function(){

	////全局变量
     var todo = $('#new-todo'),
     		main = $('#main'),
     		todolist = $('#todo-list'),
     		footer=$('#footer')
     		;
     var  table = [];
     

     


     ////数据渲染

      var render = function(){
      	todolist.empty('');
     	$(table).each(function(i,v){
     		main.css({display:'block'});
        	footer.css({display:'block'});
        	$('<li>')
        	.attr('dataid',v.dataid)
        	.html('<div class="view"><input class="toggle" type="checkbox"></input><label>'+v.text+'</label><button class="destroy" dataid='+v.dataid+'></button></div><input type="text" class="edit" value='+v.text+'>')
        	
        	.appendTo(todolist)
     	})
     }

	/////初始化数据
    	 if(localStorage.table){
		table = JSON.parse(localStorage.table);
		render();
		// refresh();
	}else{
		// $.ajax("/php1/huoqustudents.php",function(data){
		// 	console.log(data);
		// 	students = JSON.parse(data);
		// 	localStorage.students = JSON.stringify(students);
		// 	render();
		// })
	}

	///在输入框输入信息 回车 键 发布内容
     todo.on('keydown',function(e){
     	var value = $(this).val();
     	var num = table.length?table.length+1:1;
        if(e.keyCode === 13){
        	main.css({display:'block'});
        	footer.css({display:'block'});
        	$('<li>')
        	.html('<div class="view"><input class="toggle" type="checkbox"></input><label>'+value+'</label><button class="destroy" dataid='+num+'></button></div><input type="text" class="edit" value='+value+'>')
        	.attr('dataid',num)
        	.appendTo(todolist)

        	var xinxi = {dataid:num,text:value};
        	table.push(xinxi);
        	$(this).val('');
        	localStorage.table = JSON.stringify(table);
        	 num+=1;
        }
       
     })

	////点击可进行编辑

	//事件委托 

	main.on('dblclick','li',function(){		
		$(this)
		.toggleClass('editing')

		var edit = $(this.lastElementChild);
		var dataid = $(this).attr('dataid')
		edit.on('keydown',function(){
			console.log(this)
			value = $(this).val();
			$(table).each(function(i,v){
			if(v.dataid  = dataid) {
				v.text = value;
			}
		})
			console.log(table)
		})
		
		
		

	})

	////删除按钮 可进行删除
	var destroy = $('.destroy');
	main.on('click','button',function(){
		alert(1)
		var dataid = $(this).attr('dataid')
		$('#todo-list li').each(function(i,v){
			console.log(v)
			if($(v).attr('dataid')=== dataid){
				$(v).remove();

			}

		})
		 $(table).each(function(i,v){
		 	var temp=[];
			console.log($(v).attr('dataid'),dataid)
			if($(v).attr('dataid') !== dataid){
				
				temp.push(v);
				table = temp;
				console.log(table)

			}
		})
			// table = table.filter(function(v){
				 
			// 	})
			localStorage.table = JSON.stringify(table);
				render();
	})
	

	////选中框


	////按钮操作


})