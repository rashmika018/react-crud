<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/product.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$product = new Product($db);
 
// set ID property of product to be edited
$product->productId = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$product->details();
 
// create array
$product_arr = array(
    "id" =>  $product->productId,
    "name" => $product->productName,
    "description" => $product->description,
    "price" => $product->price,
    "category_id" => $product->categoryId,
    "category_name" => $product->categoryName
 
);
 
// make it json format
print_r(json_encode($product_arr));
?>