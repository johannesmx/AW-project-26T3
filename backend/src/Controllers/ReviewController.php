<?php
namespace App\Backend\Controllers;

use App\Backend\Config\Database;
use mysqli;
use mysqli_sql_exception;
use Throwable;

class ReviewController {
    private mysqli $db;

    public function __construct(?mysqli $db = null)
    {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        $this->db = $db ?? (new Database())->getConnection();
    }

    public function addReview( string $title, string $body, int $rating, int $account_id ) {
        // insert review in the database
    }

    public function getProductReviews(int $id ) {
        // get reviews for a product
    }

    public function getUserReviews(int $account_id ) {
        // get reviews of a user
    }
}