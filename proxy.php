<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://52.79.148.132/");

$apiKey = "6e8afcb0c7db9a80a6f595d62c8056eb";
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=" . $apiKey;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "API request failed"]);
} else {
    $data = json_decode($response);
    if (json_last_error() === JSON_ERROR_NONE) {
    echo $response;
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Invalid JSON response from API"]);
    }
}
?>