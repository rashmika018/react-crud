<?php
class Product{
 
    // database connection and table name
    private $conn;
    private $table_name = "product";
 
    // object properties
    public $productId;
    public $productName;
    public $description;
    public $price;
    public $categoryId;
    public $categoryName;
    public $createdOn;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

// all products
function list(){
       // select all query
       $query = "SELECT
                   c.categoryName, p.productId, p.productName, p.description, p.price, p.categoryId, p.createdOn
               FROM
                   " . $this->table_name . " p
                   LEFT JOIN
                        category c
                           ON p.categoryId = c.categoryId
               ORDER BY
                   p.createdOn DESC";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // execute query
       $stmt->execute();
    
       return $stmt;
   }
   // create product
function create(){
    
       // query to insert record
       $query = "INSERT INTO
                   " . $this->table_name . "
               SET
               productName=:productName, price=:price, description=:description, categoryId=:categoryId, createdOn=:createdOn";
    
       // prepare query
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->productName=htmlspecialchars(strip_tags($this->productName));
       $this->price=htmlspecialchars(strip_tags($this->price));
       $this->description=htmlspecialchars(strip_tags($this->description));
       $this->categoryId=htmlspecialchars(strip_tags($this->categoryId));
       $this->createdOn=htmlspecialchars(strip_tags($this->createdOn));
    
       // bind values
       $stmt->bindParam(":productName", $this->productName);
       $stmt->bindParam(":price", $this->price);
       $stmt->bindParam(":description", $this->description);
       $stmt->bindParam(":categoryId", $this->categoryId);
       $stmt->bindParam(":createdOn", $this->createdOn);
    
       // execute query
       if($stmt->execute()){
           return true;
       }else{
           return false;
       }
   }

// used when filling up the update product form
function details(){    
       // query to read single record
       $query = "SELECT
                   c.categoryName, p.productId, p.productName, p.description, p.price, p.categoryId, p.createdOn
               FROM
                   " . $this->table_name . " p
                   LEFT JOIN
                      category c
                        ON p.categoryId = c.categoryId
               WHERE
                   p.productId = ?
               LIMIT
                   0,1";
    
       // prepare query statement
       $stmt = $this->conn->prepare( $query );
    
       // bind id of product to be updated
       $stmt->bindParam(1, $this->productId);
    
       // execute query
       $stmt->execute();
    
       // get retrieved row
       $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
       // set values to object properties
       $this->productName = $row['productName'];
       $this->price = $row['price'];
       $this->description = $row['description'];
       $this->categoryId = $row['categoryId'];
       $this->categoryName = $row['categoryName'];
   }

// update the product
function update(){
    
       // update query
       $query = "UPDATE
                   " . $this->table_name . "
               SET
                   productName = :productName,
                   price = :price,
                   description = :description,
                   categoryId = :categoryId
               WHERE
               productId = :productId";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->productName=htmlspecialchars(strip_tags($this->productName));
       $this->price=htmlspecialchars(strip_tags($this->price));
       $this->description=htmlspecialchars(strip_tags($this->description));
       $this->categoryId=htmlspecialchars(strip_tags($this->categoryId));
       $this->id=htmlspecialchars(strip_tags($this->productId));
    
       // bind new values
       $stmt->bindParam(':productName', $this->productName);
       $stmt->bindParam(':price', $this->price);
       $stmt->bindParam(':description', $this->description);
       $stmt->bindParam(':categoryId', $this->categoryId);
       $stmt->bindParam(':productId', $this->productId);
    
       // execute the query
       if($stmt->execute()){
           return true;
       }else{
           return false;
       }
   }
 // delete the product
function delete(){
    
       // delete query
       $query = "DELETE FROM " . $this->table_name . " WHERE productId = ?";
    
       // prepare query
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->productId=htmlspecialchars(strip_tags($this->productId));
    
       // bind id of record to delete
       $stmt->bindParam(1, $this->productId);
    
       // execute query
       if($stmt->execute()){
           return true;
       }
    
       return false;
        
   }
}