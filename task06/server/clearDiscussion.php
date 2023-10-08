<?php

require_once '../db/connection.php';

// Delete all messages
$query = <<<SQL

    DELETE FROM mini_chat.messages

SQL;

$statement = $conn->prepare($query);

$statement->execute();

// Verify if the request as been deleting
if ($statement->rowCount() > 0) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Messages deleted successfully'
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Messages not deleted'
    ]);
}