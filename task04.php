<?php

// Include the database connection file
require_once 'db/connection.php';

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get the type and brand parameters from the GET request
$type = strtolower($_GET['type'] ?? '');
$brand = strtolower($_GET['brand'] ?? '');

// Check if the type parameter is missing
if (empty($type)) {
    http_response_code(400);
    echo json_encode(['error' => 'No type sent yet!']);
    exit;
}

// Check if the type parameter has less than 3 characters or above 10 characters
if (strlen($type) < 3) {
    http_response_code(400);
    echo json_encode(['error' => "$type : this type does not have enough characters"]);
    exit;
} else if (strlen($type) > 10) {
    http_response_code(400);
    echo json_encode(['error' => "$type : this type has too many characters."]);
    exit;
}

// Check if the type parameter contains non-alphabetical characters (except '-')
if (!preg_match('/^[a-zA-Z\-]+$/', $type)) {
    http_response_code(400);
    echo json_encode(['error' => "$type : this type has non-alphabetical characters (different from '-')."]);
    exit;
}

// Case where the type doesn't exist
$query = <<<SQL
    SELECT * FROM ajax_products.products WHERE type = :type
SQL;

$statement = $conn->prepare($query);
$statement->bindValue(':type', $type);

$statement->execute();

if($statement->rowCount() === 0) {
    http_response_code(400);
    echo json_encode(['error' => "$type : This type doesn't exist."]);
    exit;
}

// Check if the brand parameter is missing
if (empty($brand)) {
    http_response_code(400);
    echo json_encode(['error' => 'No brand sent yet!']);
    exit;
}

// Check if the brand parameter has less than 3 characters
if (strlen($brand) < 3) {
    http_response_code(400);
    echo json_encode(['error' => "$brand : this brand does not have enough characters"]);
    exit;
} else if (strlen($brand) > 20) {
    http_response_code(400);
    echo json_encode(['error' => "$brand : this brand has too many characters."]);
    exit;
}

// brand allows alphanumeric characters, - and &
if (!preg_match('/^[a-zA-Z0-9\-&]+$/', $brand)) {
    http_response_code(400);
    echo json_encode(['error' => "$brand : this brand has invalid characters"]);
    exit;}

$query = <<<SQL

SELECT * FROM products WHERE type = :type AND brand = :brand

SQL;

$statement = $conn->prepare($query);
$statement->bindValue(':type', $type);
$statement->bindValue(':brand', $brand);

$statement->execute();

if($statement->rowCount() !== 0) {
    http_response_code(400);
    echo json_encode(['error' => "$brand : This brand with $type already exists."]);
    exit;
}


// If all checks pass, return a success message
echo json_encode(['success' => true]);
exit;
