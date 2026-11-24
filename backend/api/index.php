<?php
// router or gateway to our backend
require_once __DIR__ . '/../vendor/autoload.php';

use App\Backend\App\App;
use App\Backend\Controllers\ProductsController;
use App\Backend\Controllers\SearchController;
use App\Backend\Controllers\UserController;

$app = new App();

$allowedOrigins = [
    'http://localhost:5173', // Vite default
    'http://localhost:3000', // CRA / Next / custom dev server
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if (strtoupper($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Parse incoming JSON request body
$inputJSON = file_get_contents('php://input');
$decodedBody = is_string($inputJSON) && $inputJSON !== '' ? json_decode($inputJSON, true) : null;
$body = is_array($decodedBody) ? $decodedBody : [];

// Strip query strings and get the path relative to this script
$requestUri = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$uri = rtrim($requestUri, '/');
if ($uri === '') {
    $uri = '/';
}

$uricomps = explode('/', $uri);
$uriend = end($uricomps);
// handle GET request for product detail with the id
if ($method === 'GET' && preg_match('#^/api/products/(\d+)$#', $uri, $matches)) {
    $id = (int) $matches[1];
    $handler = new ProductsController();
    $product = $handler->getProductDetail($id);

    if (!$product) {
        sendResponse(404, [
            'success' => false,
            'error' => 'Product not found.',
            'data' => [],
        ]);
    }

    sendResponse(200, [
        'success' => true,
        'error' => null,
        'data' => $product,
    ]);
}

// handle search query
if ($method === 'GET' && $uri === '/api/search') {
    $searchQuery = trim((string) ($_GET['query'] ?? ''));
    if ($searchQuery === '') {
        sendResponse(400, [
            'success' => false,
            'error' => 'Search query is required.',
            'data' => [],
        ]);
    }

    $handler = new SearchController();
    $results = $handler->search($searchQuery);
    sendResponse(200, [
        'success' => true,
        'error' => null,
        'data' => $results ?? [],
    ]);
}

// handle user registration
if ($method === 'POST' && $uri === '/api/register') {
    $username = trim((string) ($body['username'] ?? $_POST['username'] ?? ''));
    $email = trim((string) ($body['email'] ?? $_POST['email'] ?? ''));
    $password = (string) ($body['password'] ?? $_POST['password'] ?? '');

    if ($username === '' || $email === '' || $password === '') {
        sendResponse(400, [
            'success' => false,
            'error' => 'Username, email, and password are required.',
            'data' => [],
        ]);
    }

    $handler = new UserController();
    $result = $handler->register($username, $email, $password);

    sendResponse(!empty($result['success']) ? 201 : 400, $result);
}

// handle user login
if ($method === 'POST' && $uri === '/api/login') {
    $email = trim((string) ($body['email'] ?? $_POST['email'] ?? ''));
    $password = (string) ($body['password'] ?? $_POST['password'] ?? '');

    if ($email === '' || $password === '') {
        sendResponse(400, [
            'success' => false,
            'error' => 'Email and password are required.',
            'data' => [],
        ]);
    }

    $handler = new UserController();
    $loginResult = $handler->login($email, $password);

    sendResponse(!empty($loginResult['success']) ? 200 : 401, $loginResult);
}

if ($method === 'GET' && $uri === '/api/me') {
    $handler = new UserController();
    $token = $_COOKIE['auth_token'] ?? null;
    $meResult = $handler->me(is_string($token) ? $token : null);

    sendResponse(!empty($meResult['success']) ? 200 : 401, $meResult);
}

if ($method === 'POST' && $uri === '/api/logout') {
    $handler = new UserController();
    $logoutResult = $handler->logout();

    sendResponse(200, $logoutResult);
}

$requestStr = $method . ' ' . rtrim($requestUri, '/');

switch ($requestStr) {
    case 'GET /api/products':
        $products = new ProductsController();
        $items = $products->getProducts();
        sendResponse(200, [
            'success' => true,
            'error' => null,
            'data' => $items ?? [],
        ]);
        break;

    case 'GET /api/about':
        sendResponse(200, [
            'success' => true,
            'error' => null,
            'data' => ['message' => 'about'],
        ]);
        break;

    default:
        sendResponse(404, [
            'success' => false,
            'error' => 'Endpoint not found.',
            'data' => [],
        ]);
        break;
}

function sendResponse(int $code, array $data): never
{
    http_response_code($code);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data);
    exit();
}


