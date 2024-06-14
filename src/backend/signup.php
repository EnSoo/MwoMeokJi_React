<?php
    // @Body로 보낸 json문자열을 $_POST라는 배열에 자동 저장되지 않음.
    header('Content-Type:application/json; charset=utf-8');

    // json으로 넘어온 데이터는 별도의 임시공간[php://input에 파일로 보관되어 있음.
    // 그 파일을 읽어서 $_POST라는 배열변수에 대입하기

    $data= file_get_contents('php://input');
      error_reporting(E_ALL);
      ini_set('display_errors', 1);
    // $data가 json문자열임
    $_POST= json_decode($data, true); // json --> 연관배열

    //@PartMap으로 전달된 POST 방식의 데이터들 받아오기
    $nickname= $_POST['nickname'];
    $email= $_POST['email'];
    $password= $_POST['password'];

    //가입일
    $now= date('Y-m-d H:i:s');

     // 데이터들을 MySQL DB에 저장하기 [테이블명: userData]
     $db= mysqli_connect("localhost","www-user","itmi#472","mwomeokji");
     mysqli_query($db,"set names utf8"); // 한글 깨지지 않게 설정

     //$sql = "SELECT * FROM userData WHERE nickname = '$nickname' OR email = '$email'";
     $sqlchcek = "SELECT * FROM userData WHERE nickname = '$nickname' OR email = '$email'";
     $resultcheck= mysqli_query($db,$sqlchcek);

    $conunt= mysqli_num_rows($resultcheck);

    if($conunt > 0) {
        echo "중복확인을 해주세요";
    } else {
        $salt=generateSalt();
        $hashedPassword=password_hash($password.$salt,PASSWORD_BCRYPT);
   
        // 데이터들 userData테이블에 삽입하기 [$nickname, $email, $password, $now]
        $sql= "INSERT INTO userData(nickname,email,password,salt,now) VALUES('$nickname','$email','$hashedPassword','$salt','$now')";
        $result= mysqli_query($db,$sql);

        if($result) echo "가입에 성공하셨습니다";
        else echo "가입에 실패했습니다. 관리자에게 문의하세요";
    }

     mysqli_close($db);

    function generateSalt($length = 64){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $salt = '';
        for ($i = 0; $i < $length; $i++) {
            $salt .= $characters[rand(0, $charactersLength - 1)];
        }
        return $salt;
    }
?>

