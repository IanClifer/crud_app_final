<?php
require_once("connection.php");

// Use prepared statement to avoid SQL injection
$sql = "UPDATE todo_table SET description=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $_GET['de'], $_GET['id']); // Assuming 'description' is a string and 'id' is an integer

if ($stmt->execute()) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $stmt->error;
}

$stmt->close(); // Close the prepared statement

header("Location: https://www.react-crud.infinityfreeapp.com/");
exit(); // Ensure script stops execution after redirection
?>
