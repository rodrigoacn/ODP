<?php 
	class DB{  
		private static $conn; 

		private function __construct(){} 

		public static function connect(){ 
			if(!empty(self::$conn)){ 
				return self::$conn; 
			}  

			try { 
				$dbh = new PDO('mysql:host=localhost;dbname=odp', 'root', 'v6h470fdz0', array(PDO::ATTR_PERSISTENT => true));  
				self::$conn = $dbh; 
				return $dbh; 
			} catch (PDOException $e) { 
				print "Error! : " . $e->getMessage() . "<br/>"; 
				die(); 
			} 

		}

	}
?>