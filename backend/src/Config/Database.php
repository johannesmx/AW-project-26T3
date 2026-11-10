<?php
namespace App\Backend\Config;

use \mysqli;
use mysqli_sql_exception;

class Database {
    private string $dbhost;
    private string $dbuser;
    private string $dbpassword;
    private string $dbname;
    private mysqli $connection;

    public function __construct() {
        $this->dbhost = getenv('DB_HOST');
        $this->dbuser = getenv('DB_USER');
        $this->dbpassword = getenv('DB_PASSWORD');
        $this->dbname = getenv('DB_NAME');
        $this->connect();
    }
     private function connect() {
        // enable mysqli exceptions
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $this -> connection = mysqli_connect(
                $this->dbhost,
                $this->dbuser,
                $this->dbpassword,
                $this->dbname
            );
        }
        catch (mysqli_sql_exception $e) {
            // Handle connection error
            error_log("Database connection error: " . $e->getMessage());
        }
    }
    public function getConnection(): mysqli {
        return $this->connection;
    }
}
