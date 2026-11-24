<?php

namespace App\Backend\Controllers;

use App\Backend\Config\Database;
use App\Backend\Utilities\Validator;
use App\Backend\Utilities\JwtService;
use \Exception;
use mysqli;
use mysqli_sql_exception;
use Throwable;

class UserController
{
    private mysqli $db;
    private JwtService $jwt;

    public function __construct(?mysqli $db = null, ?JwtService $jwt = null)
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $this->db = $db ?? (new Database())->getConnection();
        $this->jwt = $jwt ?? new JwtService();
    }

    public function register(string $username, string $email, string $password): array
    {
        $name = trim($username);
        $email = trim($email);
        if (
            !Validator::validateUserName($name) || 
            !Validator::validateEmail($email) || 
            !Validator::validatePassword($password)) {
            // return $response;
            return $this -> sendResponse( false, implode(' ', Validator::$errors), [] );
        }
        // hash password
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        // queries for creating account and user
        $insertAccountQuery = '
            INSERT INTO Account (Email, Password, Created, Updated, Active)
            VALUES (?, ?, NOW(), NOW(), 1)
        ';

        $insertUserQuery = '
            INSERT INTO User (Name, AccountID, Created, Updated, Active)
            VALUES (?, ?, NOW(), NOW(), 1)
        ';
        
        try {
            // start transaction
            $this -> db -> begin_transaction();

            $accountStmt = $this->db->prepare($insertAccountQuery);
            $accountStmt->bind_param('ss', $email, $hashed);
            $accountStmt->execute();
            $accountStmt->close();

            $account_id = (int) $this -> db -> insert_id;

            $userStmt = $this->db->prepare($insertUserQuery);
            $userStmt->bind_param('si', $name, $account_id);
            $userStmt->execute();
            $userStmt->close();
            // end transaction
            $this -> db -> commit();

            $user = [
                'Id' => $account_id,
                'Email' => $email,
                'Name' => $name,
            ];

            // Authenticate immediately after registration by setting the JWT cookie
            $this->issueSessionCookie($user);

            return $this->sendResponse(true, null, ['user' => $user]);
        } 
        // catch sql errors
        catch (mysqli_sql_exception $exc) {
            // if there is an error, rollback the transaction
            if( $this -> db -> errno ) {
                $this -> db -> rollback();
            }
            // log errors in system log
            error_log('Registration SQL error: ' . $exc->getMessage());

            if($exc -> getCode() === 1062) {
                return $this -> sendResponse(false,"An account with this email already exists");
            }

            return $this -> sendResponse(false,'Registration failed due to database error');
        }
        // catch other errors
        catch (Throwable $exc) {
            if ($this->db->errno) {
                $this->db->rollback();
            }

            error_log('Registration unexpected error: ' . $exc->getMessage());

            return $this->sendResponse(false, 'An unexpected error occurred during registration.');
        }
    }

    public function login(string $email, string $password): array {
        $email = trim($email);
        // get user account and username from database
        $query = "
        SELECT 
        Account.AccountID AS Id,
        Email,
        Password,
        User.Name
        FROM Account
        INNER JOIN User
        ON Account.AccountID = User.AccountID
        WHERE Account.Active = 1 AND Account.Email = ?
        LIMIT 1
        ";
        // get user account from database
      
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bind_param('s', $email);
            $stmt->execute();

            $result = $stmt->get_result();
            $account = $result->fetch_assoc();
            $stmt->close();

            // verify user password
            if( !$account || !password_verify( $password, $account['Password'] ) ) {
                return $this->sendResponse(false, 'Invalid email or password.');
            }
            
            $user = [
                'Id' => (int) $account['Id'],
                'Email' => (string) $account['Email'],
                'Name' => (string) $account['Name'],
            ];

            $this->issueSessionCookie($user);
            return $this->sendResponse(true, null, ['user' => $user]);
        }
        catch( mysqli_sql_exception $exc) {
            error_log('Login SQL error: ' . $exc->getMessage());

            return $this->sendResponse(false, 'Login failed due to a database error.');
        }
        catch (Throwable $exc) {
            error_log('Login unexpected error: ' . $exc->getMessage());

            return $this->sendResponse(false, 'An unexpected error occurred during login.');
        }
    }

    public function me(?string $cookieToken): array
    {
        if (!$cookieToken) {
            return $this->sendResponse(false, 'Not authenticated.');
        }

        $claims = $this->jwt->verifyToken($cookieToken);
        if (!$claims || !isset($claims['sub'])) {
            return $this->sendResponse(false, 'Invalid or expired session.');
        }

        return $this->sendResponse(true, null, [
            'user' => [
                'Id' => (int) $claims['sub'],
                'Email' => (string) ($claims['email'] ?? ''),
                'Name' => (string) ($claims['name'] ?? ''),
            ],
        ]);
    }

    public function logout(): array
    {
        $this->jwt->clearAuthCookie();
        return $this->sendResponse(true, null, []);
    }

    private function issueSessionCookie(array $user): void
    {
        $token = $this->jwt->issueToken([
            'sub' => $user['Id'],
            'email' => $user['Email'],
            'name' => $user['Name'],
        ]);
        $this->jwt->setAuthCookie($token);
    }

    private function sendResponse(bool $status, ?string $message = null, ?array $data = [] ):array
    {
        return [
            'success' => $status,
            'error' => $message,
            'data' => $data,
        ];
    }
}
