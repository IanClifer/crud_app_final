<?php
require_once("connection.php");

// Handle CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Determine the HTTP method (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// CRUD operations
switch ($method) {
    case 'GET':
        // Read - Fetch todos from the database
        $result = $conn->query("SELECT * FROM todo_table");
        $todos = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($todos);
        break;

    case 'POST':
        // Create - Add a new todo to the database
        $data = json_decode(file_get_contents("php://input"), true);
        $description = $data['description'];

        $stmt = $conn->prepare("INSERT INTO todo_table (description) VALUES (?)");
        $stmt->bind_param("s", $description);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Todo created successfully']);
        } else {
            echo json_encode(['error' => 'Error creating todo']);
        }

        $stmt->close();
        break;

    case 'PUT':
        // Update - Modify an existing todo in the database
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
        $description = $data['description'];

        $stmt = $conn->prepare("UPDATE todo_table SET description = ? WHERE id = ?");
        $stmt->bind_param("si", $description, $id);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Todo updated successfully']);
        } else {
            echo json_encode(['error' => 'Error updating todo']);
        }

        $stmt->close();
        break;

    case 'REMOVE':
        // Delete - Remove a todo from the database
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'];
    
        $stmt = $conn->prepare("DELETE FROM todo_table WHERE id = ?");
        $stmt->bind_param("i", $id);
    
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Todo deleted successfully']);
        } else {
            echo json_encode(['error' => 'Error deleting todo']);
        }
    
        $stmt->close();
        break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Invalid request method']);
        break;
}

// Close the database connection
$conn->close();
?>
