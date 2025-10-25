<?php
$servername = "localhost";
$username = "root"; // default in XAMPP
$password = "";     // empty by default in XAMPP
$dbname = "coursemart_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
