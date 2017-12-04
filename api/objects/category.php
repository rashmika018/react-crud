<?php
class Category{
 
    // database connection and table name
    private $conn;
    private $table_name = "category";
 
    // object properties
    public $categoryId;
    public $categoryName;
    public $description;
    public $createdOn;
 
    public function __construct($db){
        $this->conn = $db;
    }
 // used by select drop-down list
public function list(){
    
       //select all data
       $query = "SELECT
                   categoryId, categoryName, description
               FROM
                   " . $this->table_name . "
               ORDER BY
               categoryName";
    
       $stmt = $this->conn->prepare( $query );
       $stmt->execute();
    
       return $stmt;
   }
   
}
?>