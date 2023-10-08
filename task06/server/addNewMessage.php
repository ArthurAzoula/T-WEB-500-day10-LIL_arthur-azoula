<?php

require_once '../db/connection.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Add new message into db
$name = isset($_GET['name']) && !empty($_GET['name']) ? $_GET['name'] : null;
$message = isset($_GET['message']) && !empty($_GET['message']) ? $_GET['message'] : null;

// Before adding, add security
$name = htmlspecialchars($name);
$message = htmlspecialchars($message);

// Add new message into db
if ($name && $message) {
    $sql = "INSERT INTO mini_chat.messages (name, message) VALUES (:name, :message)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':message', $message);
    $stmt->execute();
}

// Verify if the request as been adding
if ($stmt->rowCount() > 0) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Message added successfully'
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Message not added'
    ]);
}

