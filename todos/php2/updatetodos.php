<?php
// updatelianxiren.php?id=4&shuxing=phone&zhi=321
$mysqli = new mysqli('localhost','root','','test');
$sql = "UPDATE `todos` SET `id` = '{$_GET['id']}',`content` = '{$_GET['content']}',`isDone` = '{$_GET['isDone']}'";
$mysqli -> query($sql);
echo 'success';
?>