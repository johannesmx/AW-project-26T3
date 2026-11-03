<?php
namespace App\Backend\Config;

use \mysqli;
use \Exception;
use mysqli_sql_exception;

class Database {
    private string $dbhost;
    private string $dbuser;
    private string $dbpassword;
    private string $dbname;
    private mysqli $connection;
    public function __construct()
    {
        $this -> getDbConfig();
        $this -> connect();
    }
    private function getDbConfig() {
        $this -> dbname = $_ENV['DBNAME'];
        $this -> dbuser = $_ENV['DBUSER'];
        $this -> dbpassword = $_ENV['DBPASSWORD'];
        $this -> dbhost = $_ENV['DBHOST'];
    }
    private function connect() {
        // enable mysqli exception
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        try {
            $this -> connection = mysqli_connect(
                $this -> dbhost,
                $this -> dbuser,
                $this -> dbpassword,
                $this -> dbname
            );
        }
        catch( mysqli_sql_exception $error ) {
            // do something with the error
            exit();
        }
    }
    public function getConnection() {
        return $this -> connection;
    }
}
?>