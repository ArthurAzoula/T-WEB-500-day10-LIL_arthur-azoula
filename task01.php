<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'An error occured : Method not allowed']);
    exit;
}

$name = $_GET['name'] ?? null;

if (!$name) {
    echo json_encode(['error' => 'An error occured : Name parameter is missing']);
    exit;
}

echo json_encode(['name' => $name, 'success' => true]);