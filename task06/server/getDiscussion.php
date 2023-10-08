<?php

require_once '../db/connection.php';

// Check method GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get all messages

$query = <<<SQL

    SELECT * from mini_chat.messages ORDER BY timestamp DESC

SQL;

$statement = $conn->prepare($query);

$statement->execute();

$messages = $statement->fetchAll(PDO::FETCH_ASSOC);

// Verify if the request as been getting
if ($statement->rowCount() > 0) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Messages get successfully',
        'data' => $messages
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Messages not get'
    ]);
}