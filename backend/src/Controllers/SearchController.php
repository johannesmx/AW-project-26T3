<?php
namespace App\Backend\Controllers;

use App\Backend\Config\Database;
use mysqli;
use mysqli_sql_exception;

class SearchController {
    private mysqli $db;

    public function __construct() {
        mysqli_report( MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT );
        $database = new Database();
        $this -> db = $database -> getConnection();
    }

    public function search( string $searchQuery ) {
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
        AND
        Product.Name LIKE ?
        OR
        Product.Description LIKE ?
        OR
        Product.Brand LIKE ?
        ";

        try {
            $statement = $this -> db -> prepare( $query );
            $search_string = "%$searchQuery%";
            $statement -> bind_param("sss", $search_string, $search_string, $search_string );
            $statement -> execute();
            $result = $statement -> get_result();
            $items = array();
            while( $row = $result -> fetch_assoc() ) {
                array_push( $items, $row );
            }
            return $items;
        }
        catch (mysqli_sql_exception $exc) {
            error_log( $exc -> getMessage() );
        }
    }
}
?>