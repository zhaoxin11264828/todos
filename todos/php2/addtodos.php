<?php
$mysqli = new mysqli('localhost','root','','test');
$sql = "INSERT INTO `todos` (`id`,`content`,`isDone`) VALUES ('{$_GET['id']}','{$_GET['content']}','{$_GET['isDone']}')";
$mysqli -> query($sql);
echo $mysqli->insert_id;
?>
