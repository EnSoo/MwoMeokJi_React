<?php
    //header("Content-Type:text/html; charset:utf-8");
    header('Content-Type: application/json; charset=utf-8');
    /*사용자가 File을 보내면 실제 파일 데이터들은 임시저장소(tmp)에 임시로 저장되며
    이 php문서에는 File의 정보만 전달됨. 그 정보를 $_FILES[]라는 배열에 저장함*/
    $file= $_FILES['img1']; 
    
    //$file에는 전송된 파일의 정보들이 있음. 그래서 이 변수는 배열[5칸]
    $fileName= $file["name"]; // 원본파일 명
    $fileType= $file['type']; // 파일 타입
    $fileSize= $file['size']; // 파일 size
    $tmpName= $file['tmp_name']; // 실 파일 데이터 임시 저장소
    $error= $file['error']; // 전송 중 에러가 있다면 에러 정보 

    //정보가 잘 확인되었다면 분명 이 서버에 이미지파일이 전송되어 온 것임
    //하지만 이 파일 데이터는 임시저장소에 저장되어 있어서 이 프로그램이 종료되면 삭제됨
    //온전히 업로드 되도록 하려면 임시저장소에 있는 파일[$tmpName]을
    //영구히 사라지지 않는 본인의 폴더[html 폴더 안으로]로 이동 해야 함

    //이동시킬 폴더 경로 및 파일명을 지정해야 함
    $dstName= "../img/" . date("YmdHis") . $fileName;
    
    //임시저장소($tmpName)에 있는 파일을 원하는 위치($dstName)로 이동
    $result= move_uploaded_file($tmpName,$dstName); //결과를 true or false로 리턴
    if($result) {
        $dstName=str_replace("../img/", "", $dstName);
        echo $dstName;
    } else {
        echo '5404';
    }
?>