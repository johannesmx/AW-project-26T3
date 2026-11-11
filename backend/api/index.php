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

// handle request with parameters
// if the request is for search ?keywords=cool
// if the request is for route/id


// Strip query strings and get the path relative to this script
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = strtoupper($_SERVER['REQUEST_METHOD']);
// chain the request method and the request uri into "GET /api/products" 
// while removing the trailing slash "/"
$requestStr = $requestMethod . ' ' . rtrim($requestUri, '/');
// handle request for all products or other endpoints
switch ($requestStr) {
    // get all products
    case 'GET /api/products':
        $products = new ProductsController();
        $items = $products->getProducts();
        sendResponse(200, $items ?? []);
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
