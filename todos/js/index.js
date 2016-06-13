$(function(){
	////模拟数据

	var todos = [
		// {id:1001,content:'maicai',isDone:false},
		// {id:1002,content:'mais',isDone:true},
		// {id:1003,content:'maix',isDone:false}
	]
	var states = 'All';

	///更新本地
	var savedata = function(){
		localStorage.todos = JSON.stringify(todos); 
	}
	var savestates = function(){
		localStorage.states = JSON.stringify(states); 
	}

	///全局变量
	var todolist = $('#todo-list'),
	    todoinput = $('#new-todo');



	///渲染
	var render = function(){		
		$('#footer').css('display','block')
		var state = states?states:'All';

		var todo = $.grep(todos,function(v){
			if(state === 'All'){
				return v;
			}else if(state === 'Active'){
				return v.isDone === "0";
			}else if(state === 'Completed'){
				return v.isDone === "1";
			}

		})
		todolist
		.empty()
		.append(function(){
			return $.map(todo,function(v){
				var state = v.isDone === '1'?'completed':'';
				var temp = v.isDone === '1'?'checked':'';
				return '<li class="'+state+'" data-id="'+v.id+'"><div class="view"><input class="toggle" type="checkbox" '+temp+'><label>'+v.content+'</label><button class="destroy"></button></div><input class="edit" value="'+v.content+'"></li>'
			
			})
		})

		$('#todo-count strong').text(todo.length)
		var todoss = $.grep(todo,function(v){
			return v.isDone === "1";

		})
		if(todoss.length > 0){
			$('#clear-completed').css('display','block')
		}else{
			$('#clear-completed').css('display','none')
		}
		
		
	}
	render();

	/////初始化数据
     if(localStorage.todos){
		todos = JSON.parse(localStorage.todos);
	    states = JSON.parse(localStorage.states);
	    $("a:contains("+states+")").addClass('selected');
	    if(todos.length === 0){
	    	$('#footer').css('display','none')
	    }else{
	    	render();
	    }
		
	}else{
		$.get({
			url:'/todos/php2/huoqutodos.php',
			dataType:'json'
		}).done(function(data){
			todos = data;
			savedata();
			render();
		})
		
	}

	////新增
	var addtodos = function(e){
		states = 'All'
		$('#filters .selected').removeClass('selected');
		$("a:contains("+states+")").addClass('selected');
		var value = $(this).val()
		var ID = todos.length?Math.max.apply(null,$.map(todos,function(v){return v.id;}))+1+'' : '1001';
		
		if(e.keyCode === 13 && $.trim(value)){
			var todo = {id:ID,content:value,isDone:'0'}
				todos.push(todo);
				savedata();
				render();
				$(this).val('');
				$.get({
					url:'/todos/php2/addtodos.php',
					data:todo 
				}).done(function(){
					
				}).fail(function(){

				})
		}

	}

	todoinput.on('keyup',addtodos)


	////删除
	var deletetodos = function(){
		var ID = $(this)
		.closest('li')
		.attr('data-id')
		$(this).closest('li').remove();
		todos = $.grep(todos,function(v){
			return v.id !== ID;
		})
		savedata();
		render();
		$.get({
			url:'/todos/php2/shanchutodos.php',
			data:{id:ID}
		}).done(function(){

		}).fail(function(){

		})
	}

	todolist.on('click','.destroy',deletetodos)



	////清除已完成工作
	var cleardata = function(){
		 todos = $.grep(todos,function(v){
			return v.isDone !== "1";
		})
		savedata();
		render();
	}


	$('#clear-completed').on('click',cleardata);


	

	///修改

	//状态修改
	var xgstate = function(e){
		
		var state = $(this).prop('checked');
		var zhi = state?"1":"0";
		var ID = $(this).closest('li').attr('data-id');
		$.each(todos,function(i,v){
			if(v.id === ID){
				v.isDone = zhi;
			}
			savedata();
			render();

		})
	}

	todolist.on('click','.toggle',xgstate)

	////全选按钮
	///点击全选按钮时 全部选择
	$('#toggle-all').on('click',function(){
		$('.toggle').prop('checked',$(this).prop('checked'));
		$.each($('.toggle'),xgstate)
	})

	////


	///内容修改

	var xgxinxi = function(){
		if($(this).hasClass('completed')){
			return;
		}
		var ID = $(this).attr('data-id')
		var self = $(this).find('.edit')
		$(this).addClass('editing');
		var input = $(this).find('.edit')
		///光标 定在值的最后一位 将input的值 重新赋给input 再调用 focus() 方法
		input.val(input.val()).focus();
		$(this).on('focusout','.edit',function(){
			$(this).closest('li').removeClass('editing');
			$.each(todos,function(i,v){
				if(v.id === ID){
					v.content = $(self).val();
				}
			})
			savedata();
			render();
			$.get({
				url:'/todos/php2/updatetodos.php',
				data:{id:ID,content:$(self).val()}
			}).done(function(){

			}).fail(function(){

			})
		})


	}


	todolist.on('dblclick','li',xgxinxi)



	////筛选按钮

	function qhbutton (e){
		$('#filters .selected').removeClass('selected');
		$(this).addClass('selected');
		 states = $(this).text();
		 render();
		 savestates();
	} 

	$('#filters a').on('click',qhbutton)







})