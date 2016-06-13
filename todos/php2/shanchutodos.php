<?php
$mysqli = new mysqli("localhost","root","","test");
$sql = "DELETE FROM `todos` WHERE  `id` = {$_GET['id']}";
$r = $mysqli -> query($sql);
if($r){
	echo 'success';}else{
	echo 'fail';};

?>