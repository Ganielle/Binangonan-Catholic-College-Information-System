<?php 
	$dsn = "mysql:host=localhost;dbname=informationsystem";
	$username = "root"; 
	$password = ""; 
	$options = array( PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8', ); 
	try{
		$conn = new PDO($dsn,$username,$password,$options);
	} 
	catch (PDOException $e){ 
		echo $e; 
	}
?>