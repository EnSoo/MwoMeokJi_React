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


    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    
    $sql = "SELECT * FROM userData WHERE email = '$email'";
    $resultcheck= mysqli_query($db,$sql);
    $count= mysqli_num_rows($resultcheck);
    $row = mysqli_fetch_array($resultcheck);
    $rowEmail = $row['email'];
    $salt=$row['salt'];
    $hash_password=$row['password'];
    $nickname=$row['nickname'];
    $imgfile=$row['imgfile'];

    $isPasswordValid = password_verify($password.$salt, $hash_password);  
    // $password : 사용자가 입력한 패스워드
    // $salt : 회원가입시 DB에 저장된 랜덤값
    // $hash_password : 회원가입시 DB에 저장된 해쉬 암호화 패스워드 값

    if($isPasswordValid) {
     // 해시암호화 된 것이랑 사용자가 입력한 패스워드랑 비교하여 동일할 경우
     $response= array();
     $user=array();
     $user['nickname']=$nickname;
     $user['imgfile']=$imgfile;
     $user['email']=$rowEmail;
     $response['rowNum']= $count;
     $response['user']= $user;
    }


    echo json_encode($response);

    mysqli_close($db);

?>