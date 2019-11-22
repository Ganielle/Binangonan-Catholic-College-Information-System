<?php 
	$dsn = "mysql:host=localhost;dbname=bccgsx10_gradingsystem";
	$username = "bccgsx10_pete"; 
	$password = "test123"; 
	$options = array( PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8', ); 
	try{
		$conn = new PDO($dsn,$username,$password,$options);
	} 
	catch (PDOException $e){ 
		echo $e; 
	}
?>