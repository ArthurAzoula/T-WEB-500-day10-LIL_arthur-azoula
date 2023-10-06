<?php

require_once 'db/connection.php';


// Get the type and brand parameters from the GET request
$type = strtolower($_GET['type'] ?? '');
$brand = strtolower($_GET['brand'] ?? '');
$price = strtolower($_GET['price'] ?? '');
$number = strtolower($_GET['number'] ?? '');

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

// Check if the brand parameter is missing
if (empty($brand)) {
    http_response_code(400);
    echo json_encode(['error' => 'No brand sent yet!']);
    exit;
}

// Check if the brand parameter has less than 2 characters or above 20 characters
if (strlen($brand) < 2) {
    http_response_code(400);
    echo json_encode(['error' => 'Brand parameter has less than 2 characters']);
    exit;
} else if (strlen($brand) > 20) {
    http_response_code(400);
    echo json_encode(['error' => 'Brand parameter has more than 20 characters']);
    exit;
}

// brand allows alphanumeric characters, - and &
if (!preg_match('/^[a-zA-Z0-9\-&]+$/', $brand)) {
    http_response_code(400);
    echo json_encode(['error' => "this brand has non-alphanumeric characters (different from '-', '&')."]);
    exit;
}

// Check if the price parameter is missing
if (empty($price)) {
    http_response_code(400);
    echo json_encode(['error' => 'No price sent yet!']);
    exit;
}

// Check if the price lenght is between 2 ans 5
if (strlen($price) < 2) {
    http_response_code(400);
    echo json_encode(['error' => "$price : Price parameter has less than 2 characters"]);
    exit;
} else if (strlen($price) > 5) {
    http_response_code(400);
    echo json_encode(['error' => "$price : Price parameter has more than 5 characters"]);
    exit;
}

// check if price contains command (<, >, =) exemple : >100, =42
if (!preg_match('/^[><=][0-9]+$/', $price)) {
    http_response_code(400);
    echo json_encode(['error' => "$price : We cannot define a price - string invalid."]);
    exit;
}

// Check if the number parameter is missing
if (empty($number)) {
    http_response_code(400);
    echo json_encode(['error' => 'No number sent yet!']);
    exit;
}

// Check if number is positive integer
if (!preg_match('/^[0-9]+$/', $number)) {
    http_response_code(400);
    echo json_encode(['error' => "$number : not a positive number"]);
    exit;
}


// This type doesn't exist in our shpp
$query = <<<SQL
    SELECT * FROM ajax_products.products WHERE type = :type
SQL;

$statement = $conn->prepare($query);
$statement->bindValue(':type', $type);

$statement->execute();

if ($statement->rowCount() === 0) {
    http_response_code(400);
    echo json_encode(['error' => "$type : This type doesn't exist."]);
    exit;
}

// This brand doesn't exist in our shop
$query = <<<SQL
    SELECT * FROM ajax_products.products WHERE brand = :brand
SQL;

$statement = $conn->prepare($query);
$statement->bindValue(':brand', $brand);

$statement->execute();

if ($statement->rowCount() === 0) {
    http_response_code(400);
    echo json_encode(['error' => "$brand : This brand doesn't exist in our database."]);
    exit;
}

// No product with this price
$command = $price[0];
// Take the price without the command
$price = substr($price, 1);
// Query
$query = <<<SQL
    SELECT * FROM ajax_products.products WHERE price $command :price
SQL;

$statement = $conn->prepare($query);
$statement->bindValue(':price', $price);

$statement->execute();

if ($statement->rowCount() === 0) {
    http_response_code(400);
    echo json_encode(['error' => "$price : No product with this price."]);
    exit;
}

// sorry, we don’t have enough stock, we only have $stock in stock.
$query = <<<SQL
    SELECT * FROM ajax_products.products WHERE stock >= :number
SQL;

$statement = $conn->prepare($query);
$statement->bindValue(':number', $number);

$statement->execute();

if ($statement->rowCount() === 0) {
    http_response_code(400);
    echo json_encode(['error' => "$number : Sorry, we don’t have enough stock, we only have $stock in stock."]);
    exit;
}