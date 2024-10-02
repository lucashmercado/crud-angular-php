<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require 'db.php'; // Archivo que configura la conexión con la base de datos

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $input['nombre'];
    $contrasena = $input['contraseña'];

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE nombre = :nombre");
    $stmt->execute(['nombre' => $nombre]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
        echo json_encode(['status' => 'success', 'usuario' => $usuario]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Credenciales inválidas']);
    }
}
?>
