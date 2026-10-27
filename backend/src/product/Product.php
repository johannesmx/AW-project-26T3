<?php

namespace App\product\Product;

//use App\core\Database;
use App\core\Database\Database as CoreDatabase;

class Product
{
    private $db;
    public function __construct()
    {
        $this->db = new CoreDatabase();
    }

    public function getAllProducts()
    {
        $query = "
        SELECT 
        Product.ProductID, 
        ProductCode, 
        Name,
        Image.Filename
        FROM Product 
        INNER JOIN Product_Image
        ON Product.ProductID = Product_Image.ProductID
        INNER JOIN Image
        ON Product_Image.ImageID = Image.ImageID
        WHERE Product.Active = 1";
        // 
        
    }
}
