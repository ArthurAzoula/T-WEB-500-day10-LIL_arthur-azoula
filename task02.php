<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'An error occured : Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'] ?? null;

$is_email_valid = filter_var($email, FILTER_VALIDATE_EMAIL);

if (!$email) {
    echo json_encode(['error' => 'An error occured : Email parameter is missing']);
    exit;
}

if (!$is_email_valid) {
    http_response_code(400);
    echo json_encode(['error' => 'An error occured : Email is not valid']);
    exit;
}

echo json_encode(['email' => $email, 'success' => true]);
