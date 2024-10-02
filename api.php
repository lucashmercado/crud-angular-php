<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
 
require 'db.php';
 
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);
 
if ($method == 'GET') {
    // Leer registros
    $stmt = $pdo->query("SELECT * FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
 
} elseif ($method == 'POST') {
    // Crear registro
    $stmt = $pdo->prepare("INSERT INTO users (name, email, phone) VALUES (:name, :email, :phone)");
    $stmt->execute([
        'name' => $input['name'],
        'email' => $input['email'],
        'phone' => $input['phone']
    ]);
    echo json_encode(['id' => $pdo->lastInsertId()]);
 
} elseif ($method == 'PUT') {
    // Actualizar registro
    $stmt = $pdo->prepare("UPDATE users SET name=:name, email=:email, phone=:phone WHERE id=:id");
    $stmt->execute([
        'name' => $input['name'],
        'email' => $input['email'],
        'phone' => $input['phone'],
        'id' => $input['id']
    ]);
    echo json_encode(['status' => 'success']);
 
} elseif ($method == 'DELETE') {
    // Eliminar registro
    $stmt = $pdo->prepare("DELETE FROM users WHERE id=:id");
    $stmt->execute(['id' => $input['id']]);
    echo json_encode(['status' => 'success']);
}
?>