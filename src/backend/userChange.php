<?php
    header('Content-Type: application/json; charset=utf-8');

    //@PartMap으로 전달된 POST 방식의 데이터들 받기
    $email= $_POST['email'];
    $nickname= $_POST['nickname'];
    $password= $_POST['password'];

    //@Part로 전달된 이미지 파일정도
    $file= $_FILES['img1'];
    $srcName= $file['name']; //원본파일명
    $tmpName= $file['tmp_name']; //임시저장소 위치
    $dstName = null;

    if($file != null) {
    //이미지 파일을 영구적으로 저장하기 위해 임시저장소에서 이동..
    $dstName= "./upload/IMG_" . date('YmdHis') . $srcName;
    move_uploaded_file($tmpName,$dstName);
    }

       // MySQL DB 접속 [테이블명: userData]
       $db= mysqli_connect("localhost","root","itmi#472","mwomeokji");
       mysqli_query($db,"set names utf8"); // 한글 깨지지 않게 설정


       if($nickname != null) { //닉네임을 입력했으면
        $sql = "SELECT * FROM userData WHERE email = '$email' AND nickname = '$nickname'";
        $result= mysqli_query($db,$sql);
        $conunt= mysqli_num_rows($result);
        
        if($conunt == 0) { // 본인 이메일에 저장된 기존 닉네임과 다르다면 
            $sqlname = "SELECT * FROM userData WHERE nickname = '$nickname'";
            $result= mysqli_query($db,$sqlname);
            $conunt= mysqli_num_rows($result);
            
            if($conunt == 0) { //닉네임이 중복되지 않는경우 
                $sqlUpdate = "UPDATE userData SET nickname = '$nickname' WHERE email = '$email'";
                $resultUpdate = mysqli_query($db, $sqlUpdate);

                // if($resultUpdate){
                //     echo "닉네임 수정완료";
                // } else {
                //     echo "닉네임 수정실패";
                // }
            }else {
                $response = array();
                 $response["error"] = "닉네임이 사용중입니다";
                 echo json_encode("닉네임중복".$response,JSON_UNESCAPED_UNICODE);
        
            }
        } 
    }

    if($password != null){
        $sqlchcek = "SELECT * FROM userData WHERE email = '$email'";
        $sqlUpdate = "UPDATE userData SET password = '$password' WHERE email = '$email'";
         $result = mysqli_query($db, $sqlUpdate);

         if($result){}
            else{
            $response = array();
            $response["error"] = "비밀번호 변경 실패";
            echo json_encode("비번실패".$response,JSON_UNESCAPED_UNICODE);
        }
           
    }

    if($dstName != null){
        // 이메일로 회원정보를찾고 변경된 내역만 업데이트
        $sqlchcek = "SELECT * FROM userData WHERE email = '$email'";

        $sqlUpdate = "UPDATE userData SET imgfile = '$dstName' WHERE email = '$email'";
        $result = mysqli_query($db, $sqlUpdate);

        if($result){}
        else{
        $response = array();
        $response["error"] = "이미지 변경 실패";
        echo json_encode("이미지실패".$response,JSON_UNESCAPED_UNICODE);
        }
    }



    if($result){ // 업데이트가 된게 있었을때...
        $rowNum = mysqli_affected_rows($db); //영향을 받은 행의 수
        
        // 저장된 내역 보내기
        $sql = "SELECT * FROM userData WHERE email = '$email'";
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
    }
       
       mysqli_close($db);

?>