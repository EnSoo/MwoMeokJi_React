<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$db = mysqli_connect("localhost", "www-user", "itmi#472", "mwomeokji");
mysqli_query($db, "set names utf8"); // 한글 깨지지 않게 설정

if (mysqli_connect_errno()) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to connect to MySQL: ' . mysqli_connect_error()]);
    exit();
}

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    // 이메일 정보를 받아옵니다.
    $email = 'g@g'; // 로그인된 사용자의 이메일

    // 사용자가 존재하는지 확인합니다.
    $userQuery = "SELECT * FROM userData WHERE email = '$email'";
    $userResult = mysqli_query($db, $userQuery);

    if (mysqli_num_rows($userResult) === 0) {
        echo json_encode(['status' => 'error', 'message' => 'User not found.']);
        exit();
    }

    // 나만의 레시피를 가져옵니다. 이때 이메일 기준으로 가져옵니다.
    $myRecipeQuery = "
        SELECT 
            m.no,
            m.email,
            m.title,
            m.ingredients,
            m.recipe,
            m.imgurl,
            m.createdate,
            m.modifydate,
            m.times,
            CASE 
                WHEN m.email = '$email' THEN 1 
                ELSE 0 
            END AS email_match
        FROM myrecipe m
        WHERE m.email = '$email'
    ";
    $myRecipeResult = mysqli_query($db, $myRecipeQuery);

    if (!$myRecipeResult) {
        echo json_encode(['status' => 'error', 'message' => 'Query error: ' . mysqli_error($db)]);
        exit();
    }

    $myRecipes = [];
    if (mysqli_num_rows($myRecipeResult) > 0) {
        while ($row = mysqli_fetch_assoc($myRecipeResult)) {
            $myRecipes[] = $row;
        }
    }

    // 모든 데이터를 JSON 형식으로 반환합니다.
    echo json_encode([
        'status' => 'success',
        'myRecipes' => $myRecipes
    ]);

    mysqli_close($db);

} elseif ($requestMethod === 'POST') {
    // POST 요청에서 데이터를 받아옵니다.
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $ingredients = isset($_POST['ingredients']) ? $_POST['ingredients'] : '';
    $recipe = isset($_POST['recipe']) ? $_POST['recipe'] : '';
    $imgurl = isset($_POST['imgurl']) ? $_POST['imgurl'] : '';
    $times = isset($_POST['times']) ? $_POST['times'] : '';
    $email = 'g@g'; // 로그인된 사용자의 이메일

    // 필수 데이터가 있는지 확인합니다.
    if (!$title || !$ingredients || !$recipe || !$email) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit();
    }

    // 새로운 레시피를 데이터베이스에 저장합니다.
    $query = "
        INSERT INTO myrecipe (email, title, ingredients, recipe, imgurl, times, createdate, modifydate) 
        VALUES ('$email', '$title', '$ingredients', '$recipe', '$imgurl', '$times', NOW(), NOW())
    ";
    $result = mysqli_query($db, $query);

    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Recipe added successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add recipe: ' . mysqli_error($db)]);
    }

    mysqli_close($db);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
