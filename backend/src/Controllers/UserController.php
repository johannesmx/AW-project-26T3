<?php
namespace App\Backend\Controllers;

use App\Backend\Config\Database;
use mysqli;
use mysqli_sql_exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class UserController {
    private mysqli $db;
    private string $secretKey;
    private int $tokenExpiration = 60;
    private string $issuer = "Verdictly";

    public function __construct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $database = new Database();
        $this -> db = $database -> getConnection();
        $this -> getSecret();
    }
    private function getSecret() {
        if( isset($_ENV['JWTKEY']) ) {
            $this -> secretKey = $_ENV['JWTKEY'];
        }
        else {
            exit("Missing key");
        }
    }

    public function register( string $username, string $email, string $password ) {

    }

    public function generateToken(array $userData): string {
        $issuedAt = time();
        $expire = $issuedAt + $this->tokenExpiration;

        $payload = [
            'iss' => $this->issuer,          // Issuer
            'iat' => $issuedAt,              // Issued at
            'exp' => $expire,                // Expiration time
            'data' => $userData              // Custom user data payload
        ];

        return JWT::encode($payload, $this->secretKey, 'HS256');
    }
}
?>