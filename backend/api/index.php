<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Backend\App\App;
use App\Backend\Controllers\ProductsController;

$app = new App();

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Parse incoming JSON request body
$inputJSON = file_get_contents('php://input');
$body = json_decode($inputJSON, true) ?? [];

// Strip query strings and get the path relative to this script
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = strtoupper($_SERVER['REQUEST_METHOD']);

$requestStr = $requestMethod . ' ' . rtrim($requestUri, '/');
//echo $requestStr;

switch ($requestStr) {
    case 'GET /api/products':
        $products = new ProductsController();
        $items = $products->getProducts();
        print_r($products);
        sendResponse( 200 , $items );
        break;

    case 'GET /api/about':
        echo "about";
        break;

    // Example of handling a POST request (e.g., form submission)
    // case 'POST /contact':
    //     require __DIR__ . '/controllers/contact_process.php';
    //     break;

    default:
        //http_response_code(404);
        // require __DIR__ . '/views/404.php';
        sendResponse(404,[]);
        break;
}

function sendResponse(int $code, array $data)
{
    http_response_code($code);
    // CORS Headers Setup
    header("Access-Control-Allow-Origin: *"); // Change to React app URL
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode($data);
    exit();
}

// $products = new ProductsController();
// $items = $products -> getProducts();
// echo $items;