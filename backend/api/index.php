<?php
// router or gateway to our backend
require_once __DIR__ . '/../vendor/autoload.php';

use App\Backend\App\App;
use App\Backend\Controllers\ProductsController;
use App\Backend\Controllers\SearchController;

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
$uri = rtrim( $requestUri, '/');

//get the components of the URI
$uriComps = explode('/', $uri);
// get the last component of the URI
$uriparam = end($uriComps);

if( $requestMethod === 'GET' && is_numeric($uriparam) && $uri === '/api/product/' . $uriparam ) {
    $id = $uriparam;
    $handler = new ProductsController();
    $product = $handler -> getProductDetail($id);
    sendResponse(200,$product ?? [] );
}
// handle search
if ( $requestMethod === 'GET' && $uri = '/api/search' && isset( $_GET['query'] ) ) {
    $search_query = $_GET['query'];
    $handler = new SearchController();
    $results = $handler -> search($search_query);
    sendResponse(200, $results ?? [] );
}

$requestStr = $requestMethod . ' ' . rtrim($requestUri, '/');
switch ( $requestStr) {
    case 'GET /api/products':
        $products = new ProductsController();
        $result = $products->getProducts();
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