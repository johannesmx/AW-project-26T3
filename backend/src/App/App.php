<?php
namespace App\Backend\App;

use Dotenv\Dotenv;

class App {
    public function __construct() {
        $this->loadConfig();
    }
    private function loadConfig() {
        Dotenv::createImmutable(__DIR__ . '/../../')->load();
    }
}