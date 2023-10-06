<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'An error occured : Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? null;

if (!$name) {
    echo json_encode(['error' => 'An error occured : Name parameter is missing']);
    exit;
}

echo json_encode(['name' => $name, 'success' => true]);