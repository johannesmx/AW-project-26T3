<?php
namespace App\Backend\Controllers;

use \mysqli;
use \mysqli_sql_exception;
use App\Backend\Config\Database;

class ProductsController {
    private mysqli $db;

    public function __construct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $database = new Database();
        $this->db = $database->getConnection();
    }
    
    public function getProducts():array {
        $query = "
        SELECT 
        Product.ProductID AS ProductID,
        Product.ProductCode AS ProductCode,
        Product.Name AS Name,
        Product.Brand AS Brand,
        Image.Filename AS Image,
        Image.Caption AS Caption
        FROM Product
        INNER JOIN Product_Image
        ON Product.ProductID = Product_Image.ProductID
        INNER JOIN Image
        ON Product_Image.ImageID = Image.ImageID
        WHERE Product.active = 1
        ";

        try {
            $statement = $this -> db -> prepare($query);
            $statement -> execute();
            $result = $statement -> get_result();
            $items = array();
            while ($row = $result -> fetch_assoc()) {
                array_push( $items, $row);
            }
            return $items;
        }
        catch( mysqli_sql_exception $e ) {
            error_log("Database query error: " . $e->getMessage());
            return [];
        }
    }
}
