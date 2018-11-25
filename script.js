window.onload = function(){
	var app = new Vue({
		el: '#app',	
		data:{
			menuVisible: false,
			loginVisible: true,
			processVisible: false,
			addTaskVisible: false,
			completeVisible: false,
			categoriesVisible: false, 
			aboutTaskVisible: false,
			showAddCategory: false,

			processTasks: [
			],
			completeTasks: [
			],
			categories:[
			],
			aboutTaskMass: [
			],

			aboutTask: {
			},

			newTask:{
				name: '',
				description: '',
				status: 0,
				dedline: '2018-05-05',
				category: 5,
			},

			newCategory: {
				id: '',
				name: ''
			},
		},
		methods: {
			showTaskProcess: function(){
				app.$data.menuVisible = true;
				app.$data.loginVisible = false;
				app.$data.processVisible = true;
				app.$data.addTaskVisible = false;
				app.$data.completeVisible = false;
				app.$data.categoriesVisible = false;
				app.$data.aboutTaskVisible =  false;
				app.$data.showAddCategory = false;

				this.getProcessTask();
			},

			showTasksComplete: function(){
			   

				this.getCompleteTask();
			},
			showCategories: function(){
				app.$data.menuVisible = true;
				app.$data.loginVisible = false;
				app.$data.processVisible = false;
				app.$data.addTaskVisible = false;
				app.$data.completeVisible = false;
				app.$data.categoriesVisible = true;
				app.$data.aboutTaskVisible =  false;
				app.$data.showAddCategory = false;

				this.getCategories();
			},

			showAddProcessTask: function(){
				app.$data.menuVisible = true;
				app.$data.loginVisible = false;
				app.$data.processVisible = false;
				app.$data.addTaskVisible = true;
				app.$data.completeVisible = false;
				app.$data.categoriesVisible = false;
				app.$data.aboutTaskVisible =  false;
				app.$data.showAddCategory = false;
			},

			showAboutTask: function(id, name, description, categories, status, deadline){
				app.$data.menuVisible = true;
				app.$data.loginVisible = false;    
				app.$data.processVisible = false;
				app.$data.addTaskVisible = false;
				app.$data.completeVisible = false;
				app.$data.categoriesVisible = false;
				app.$data.aboutTaskVisible =  true;
				app.$data.showAddCategory = false;


				var aboutTask = {
					name: name,
					description: description,
					categories: categories,
					status: status,
					deadline: deadline
				}
				app.$data.aboutTaskMass = [aboutTask];


			},

			getProcessTask: function(){
				$.ajax({
					type: 'POST',
					url: 'main.php',
					data: {
						'key': 1
					},
					success: function(data){
						var response = $.parseJSON(data);
						app.$data.processTasks = response;
					}
				})
			},

			getCompleteTask: function(){
				$.ajax({
					type: 'POST',
					url: 'main.php',
					data: {
						'key': 2
					},
					success: function(data){
						var response = $.parseJSON(data);
						app.$data.completeTasks = response;
					}
				})
			},

			getCategories: function(){
				$.ajax({
					type: 'POST',
					url: 'main.php',
					data: {
						'key': 6
					},
					success: function(data){
						var response = JSON.parse(data);
						app.$data.categories = response;
						console.log(app.$data.categories);
					}
				})
			},

			addProcessTask: function(){
				$request = JSON.stringify(app.$data.newTask);
				$.ajax({
					type: 'POST',
					url: 'main.php',
					data: {
						'key': 3,
						'string': $request
					},
					success: function(){
						app.showTaskProcess();
					}
				})
			},

			addCompleteTask: function(id){
				var id = id;
				$.ajax({
					type: 'POST',
					url: 'main.php',
					data: {
						'key': 5,
						'id': id
					},
					success: function(){
						app.showTasksComplete();
					}
				})
			},

			showCategory: function(){
				app.$data.menuVisible = true;
				app.$data.loginVisible = false;    
				app.$data.processVisible = false;
				app.$data.addTaskVisible = false;
				app.$data.completeVisible = false;
				app.$data.categoriesVisible = false;
				app.$data.aboutTaskVisible =  false;
				app.$data.showAddCategory = true;


				
			},

			addCategory: function(){
				$.ajax({
					type: 'POST',
					url: 'main.php',
					data: {
						'key': 8,
						'name': app.$data.newCategory.name
					},
					success: function(){
					

						app.showCategories();
					}
				})
			},

			deleteTask: function(id){
				var id = id;
				$.ajax({
					type: 'POST',
					url: 'main.php',
					data: {
						'key': 4,
						'id': id
					},
					success: function(data){
						var response = $.parseJSON(data);
						app.$data.completeTasks = response;
					}
				})

			}
		}
	})
}