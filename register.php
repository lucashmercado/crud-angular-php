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
    $stmt = $pdo->query("SELECT * FROM usuarios");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
 
} elseif ($method == 'POST') {
    // Crear registro
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, contrasena, correo) VALUES (:name, :contrasena, :correo)");
    $stmt->execute([
        'nombre' => $input['nombre'],
        'contrasena' => $input['contrasena'],
        'correo' => $input['correo']
    ]);
    echo json_encode(['id' => $pdo->lastInsertId()]);
 
}
?>