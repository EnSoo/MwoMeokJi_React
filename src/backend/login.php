<?php
    // @Body로 보낸 json문자열을 $_POST라는 배열에 자동 저장되지 않음.
    header('Content-Type:application/json; charset=utf-8');

    // json으로 넘어온 데이터는 별도의 임시공간[php://input에 파일로 보관되어 있음.
    // 그 파일을 읽어서 $_POST라는 배열변수에 대입하기

    $data= file_get_contents('php://input');
    
    // $data가 json문자열임
    $_POST= json_decode($data, true); // json --> 연관배열

    //@PartMap으로 전달된 POST 방식의 데이터들 받아오기
    $email= $_POST['email'];
    $password= $_POST['password'];


    $db= mysqli_connect("localhost","www-user","itmi#472","mwomeokji");
    mysqli_query($db,"set names utf8"); // 한글 깨지지 않게 설정

    
    $sql = "SELECT * FROM userData WHERE email = '$email' AND password = '$password'";
    $resultcheck= mysqli_query($db,$sql);
    $count= mysqli_num_rows($resultcheck);

    $response= array();
    $response['rowNum']= $count;
    $response['user'] = null;
    
    if($count > 0) {
        $userData = mysqli_fetch_array($resultcheck, MYSQLI_ASSOC);
        $response['user']= $userData;
    }
   
    echo json_encode($response);

    mysqli_close($db);

?>