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

    //서버 접속
    $db= mysqli_connect("localhost","root","itmi#472","mwomeokji");
    mysqli_query($db,"set names utf8"); // 한글 깨지지 않게 설정


    $sql = "SELECT * FROM userData WHERE email = '$email' AND password = '$password'";
    $resultcheck= mysqli_query($db,$sql);
    $count= mysqli_num_rows($resultcheck);
    
    if($count > 0) {
        //일치하는 정보가 있으면 삭제
        $userDelete = "DELETE FROM userData WHERE email = '$email' AND password = '$password'";
        $result = mysqli_query($db,$userDelete);

        if($result){
            echo "회원탈퇴 되었습니다.\n이용해주셔서 감사합니다";
        } else echo "관리자에게 문의하세요";
        
    }else echo "비밀번호를 확인해주세요";
   

    mysqli_close($db);

?>
