<?php
header('Content-Type: application/json; charset=utf-8');

//@PartMap으로 전달된 POST 방식의 데이터들 받기
$email = $_POST['email'];
$password = $_POST['password'];
//@Part로 전달된 이미지 파일정도
$file = $_FILES['img1'];
$srcName = $file['name']; // 원본파일명
$tmpName = $file['tmp_name']; // 임시저장소 위치
$dstName = null;

// MySQL DB 접속 [테이블명: userData]
$db = mysqli_connect("localhost", "www-user", "itmi#472", "mwomeokji");
mysqli_query($db, "set names utf8"); // 한글 깨지지 않게 설정

if ($password != null || $file != null) {
    if ($password != null) {
        $saltSql = "SELECT salt FROM userData WHERE email = '$email'";
        $saltResult = mysqli_query($db, $saltSql);
        $row = mysqli_fetch_array($saltResult);
        $salt = $row['salt'];
        $hashedPassword = password_hash($password . $salt, PASSWORD_BCRYPT);
    }

    if ($file != null) {
        // 이미지 파일을 영구적으로 저장하기 위해 임시저장소에서 이동
        $dstName = "./upload/img/IMG_" . date('YmdHis') . $srcName;
        move_uploaded_file($tmpName, $dstName);
    }

    if ($file != null && $password != null) { // 회원 정보 수정간에 파일을 업로드 했을 경우
        $sqlUpdate = "UPDATE userData SET password = '$hashedPassword', imgfile = '$dstName' WHERE email = '$email'";
    } else if ($file == null && $password != null) { // 회원 정보 수정간에 파일을 업로드 안했을 경우
        $sqlUpdate = "UPDATE userData SET password = '$hashedPassword' WHERE email = '$email'";
    } else if ($file != null && $password == null) { // 회원 정보 수정간에 파일만 업로드 했을 경우
        $sqlUpdate = "UPDATE userData SET imgfile = '$dstName' WHERE email = '$email'";
    }
    $result = mysqli_query($db, $sqlUpdate);

    if ($result) {
        $sql = "SELECT * FROM userData WHERE email = '$email'";
        $result = mysqli_query($db, $sql);
        $row = mysqli_fetch_array($result);
        $email = $row['email'];
        $nickname = $row['nickname'];
        $imgfile = $row['imgfile'];

        $response = array();
        $response["rowNum"] = 1;
        $response["user"] = array(
            'email' => $email,
            'nickname' => $nickname,
            'imgfile' => $imgfile
        );
        echo json_encode($response);
    } else {
        $response = array();
        $response["rowNum"] = 0; // 회원 정보 수정 실패 했을 경우
        $response["user"] = array(
            'email' => '',
            'nickname' => '',
            'imgfile' => ''
        );
        echo json_encode($response);
    }
}
mysqli_close($db);
?>