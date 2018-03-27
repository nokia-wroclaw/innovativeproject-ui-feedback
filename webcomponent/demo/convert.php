<?php
$imagedata = base64_decode($_POST['output']);
$filename ='obraz';
//path where you want to upload image
$file = $_SERVER['DOCUMENT_ROOT'] .$filename.'.png';
$imageurl  = 'C:/Users/jkubi/nowy/demo/'.$filename.'.png';
file_put_contents($file,$imagedata);
echo $imageurl;