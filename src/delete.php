<?php
require_once("connection.php");

// Use prepared statement to avoid SQL injection
$sql = "DELETE FROM todo_table WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $_GET['id']); // Assuming 'id' is an integer

if ($stmt->execute()) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $stmt->error;
}

$stmt->close(); // Close the prepared statement

header("Location: https://www.react-crud.infinityfreeapp.com/");
exit(); // Ensure script stops execution after redirection
?>
