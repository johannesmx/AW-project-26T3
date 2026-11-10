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

// handle request for a specific product by ID
if (
    $requestMethod === 'GET'
    && preg_match('#^/api/products/([1-9][0-9]*)$#D', $requestUri, $matches) === 1
) {
    $products = new ProductsController();
    $product = $products->getProductById((int) $matches[1]);

    if ($product === null) {
        sendResponse(404, []);
    }

    sendResponse(200, $product);
}

// handle request for all products or other endpoints

switch ($requestStr) {
    case 'GET /api/products':
        $products = new ProductsController();
        $query = trim((string) ($_GET['query'] ?? ''));
        $items = $query !== ''
            ? $products->searchProducts($query)
            : $products->getProducts();
        //print_r($products);
        sendResponse(200, $items ?? []);
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
