<?php
    header('Content-Type:text/plain; charset=utf-8');

    $nickname= $_GET['nickname'];
    $email= $_GET['email'];

    // 서버에 접속
    $db= mysqli_connect("localhost","www-user","itmi#472","mwomeokji");
    mysqli_query($db,"set names utf8"); // 한글 깨지지 않게 설정


    if(isset($nickname)){
        $sql = "SELECT * FROM userData WHERE nickname = '$nickname'";
    } else if(isset($email)){
        $sql = "SELECT * FROM userData WHERE email = '$email'";
    }

    $result= mysqli_query($db,$sql);
    $conunt= mysqli_num_rows($result);

    if($conunt > 0)  echo "false";
    else echo "true";
    

    mysqli_close($db);

?>


   