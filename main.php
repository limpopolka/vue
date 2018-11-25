<?php 

function getProcessTask(){
	$pdo = new PDO('mysql:host=localhost;dbname=task_bd;', 'root', '');
	$query = "SELECT * from tasks WHERE status < 100";
	$response = json_encode($pdo -> query($query)->fetchAll(PDO::FETCH_ASSOC));
	echo $response;
}

function getCompleteTask(){
	$pdo = new PDO('mysql:host=localhost;dbname=task_bd;', 'root', '');
	$query = "SELECT * from tasks WHERE status = 100";
	$response = json_encode($pdo -> query($query)->fetchAll(PDO::FETCH_ASSOC));
	echo $response;
}


function addNewTask(){
	$pdo = new PDO('mysql:host=localhost;dbname=task_bd;', 'root', '');
	$newTask = json_decode($_POST['string']);
	$query = "INSERT into tasks (name, description, status, deadline, category)  VALUES(:name, :description, :status, :deadline, :category)";

	$stmt = $pdo -> prepare($query);

	$name = $newTask -> name;
	$descp = $newTask -> description;
	$response = $stmt -> execute([
		'name' => $name,
		'description' => $descp,
		'status'   => 0,
		'deadline' => '2018-05-03',
		'category' => '2'
	]);

	var_dump($response) ;

}

function deleteTask(){
	$id = $_POST['id'];
	$pdo = new PDO('mysql:host=localhost;dbname=task_bd;', 'root', '');
	$query = "DELETE FROM tasks WHERE id = $id";
	$pdo -> query($query);
	$query_too = "SELECT * from tasks WHERE status = 100";
	$response = json_encode($pdo -> query($query_too)->fetchAll(PDO::FETCH_ASSOC));

	echo $response;

}

function addComplete(){
	$id = $_POST['id'];

	$status = 100;

	$pdo = new PDO('mysql:host=localhost;dbname=task_bd;', 'root', '');
	$query = "UPDATE tasks SET status = $status WHERE id = $id";
	$pdo -> query($query);

	echo $status;
}

function getCategories(){
	$pdo = new PDO('mysql:host=localhost;dbname=task_bd;', 'root', '');
	$query = "SELECT * FROM categories";
	$response = json_encode($pdo -> query($query)->fetchAll(PDO::FETCH_ASSOC));
	echo $response;


}

function addCategories(){
	$name = $_POST['name'];
	$pdo = new PDO('mysql:host=localhost;dbname=task_bd;', 'root', '');
	$query = "INSERT INTO categories (name) VALUES (:name)";
	$stmt = $pdo -> prepare($query);
	$stmt -> execute(['name' => $name]);

	$query_too = 'SELECT * FROM categories';
	$response = json_encode($pdo -> query($query_too)->fetchAll(PDO::FETCH_ASSOC));
	


	echo $response;

}

if ($_POST['key'] == 1) {
	getProcessTask();
}

if ($_POST['key'] == 2) {
	getCompleteTask();
}

if ($_POST['key'] == 3) {
	addNewTask();
}

if ($_POST['key'] == 4) {
	deleteTask();
}

if ($_POST['key'] == 5) {
	addComplete();
}

if ($_POST['key'] == 6) {
	getCategories();
}

if ($_POST['key'] == 7) {
	getCategories();
}

if ($_POST['key'] == 8) {
	addCategories();
}