<?php
// router or gateway to our backend
require_once __DIR__ . '/../vendor/autoload.php';

use App\Backend\App\App;
use App\Backend\Controllers\ProductsController;

$app = new App();

if( $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Parse incoming JSON request body
$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, true) ?? [];

// Strip the query string from the request URI
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = strtoupper($_SERVER['REQUEST_METHOD']);

$requestStr = $requestMethod . ' ' . rtrim($requestUri, '/');
switch ( $requestStr) {
    case 'GET /api/products':
        $products = new ProductsController();
        $result = $products->getProducts();
        //print_r($result);
        sendResponse(200, $result);
        break;
    default:
        sendResponse(404,[]);
        break;
}

function sendResponse(int $code, array $data):void {
    http_response_code($code);
    // CORS headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json ; charset=UTF-8');
    echo json_encode($data);
    exit();
}