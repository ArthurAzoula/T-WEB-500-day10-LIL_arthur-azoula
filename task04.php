<?php


// Include the database connection file
require_once 'db/connection.php';

// Check if GET data for 'type' and 'brand' exists
if (isset($_GET['type']) && isset($_GET['brand'])) {
    // Create query
    $query = <<<SQL
        INSERT INTO ajax_products.products (`type`, `brand`, `price`)
        VALUES (?, ?, ?)
    SQL;

    // Prepare and execute query
    $stmt = $conn->prepare($query);
    $result = $stmt->execute([$_GET['type'], $_GET['brand'], rand(50,200)]);

    // Check result
    if ($result) {
        echo json_encode(['success' => true]); // Return 'success' as a response
    } else {
        echo json_encode(['success' => false]); // Return 'error' as a response
    }
} else {
    echo json_encode(['success' => false]); // Return 'error' if GET data is missing
}
