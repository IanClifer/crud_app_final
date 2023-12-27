<?php

// Database configuration
$host = "sql110.infinityfree.com";  // Replace with your database hostname
$user = "if0_35682741";  // Replace with your database username
$password = "v758hbiLg2Ygh";  // Replace with your database password
$database = "if0_35682741_react_crud";  // Replace with your database name

// Create a connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



?>
