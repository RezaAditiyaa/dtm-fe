<?php
include "koneksi.php";

header('Content-Type: application/json');

// Contoh endpoint untuk mendapatkan data dari tabel users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $koneksi->query("SELECT * FROM users");
    $users = array();

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);


    $title = $data['title'];
    $columnId = $data['columnId'];

    $result = $koneksi->query("INSERT INTO cards (title, column_id) VALUES ('$title', '$columnId')");

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Kartu berhasil ditambahkan']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan kartu']);
    }
}
// Tambahkan endpoint lain sesuai kebutuhan
?>
