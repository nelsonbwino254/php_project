<?php
//starting the session
session_start();

try{
    $conn = new PDO("mysql:host=localhost;dbname=fileIO","root","");
}catch(Exeption $e){
    echo "error : ".$e->getMessage();
}

// we are going to require the db connection
    if($_POST){
        //login
        if($_POST["login"]){
            // process the login details
            // check them in the db 
            // if the exist the redirect them
            if(!empty($_POST["login"]["email"] && !empty($_POST["login"]["password"]))){
                $email = str_replace("%40","@",$_POST["login"]["email"]);
                $password = hash("sha224",$_POST['login']['password']);

                $stmt = $conn->prepare("SELECT * FROM user WHERE email = :email AND password =:pssword");
                $stmt -> bindParam(":email",$email);
                $stmt -> bindParam(":pssword",$password);
                $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $stmt->execute();
                $data = $stmt->fetchAll();
                
                if($data){
                    $_SESSION["user_data"]["email"] = $data[0]["email"];
                    echo json_encode(["msg" => 200,"data"=> $data]);
                }else{
                    echo json_encode(["msg"=>"Bad Credetials"]);
                }
            }
        }

        //singnup
        if($_POST{'signup'}){
            // +-----------+--------------+------+-----+---------+----------------+
            // | Field     | Type         | Null | Key | Default | Extra          |
            // +-----------+--------------+------+-----+---------+----------------+
            // | id        | int(11)      | NO   | PRI | NULL    | auto_increment |
            // | firstname | varchar(255) | NO   |     | NULL    |                |
            // | lastname  | varchar(255) | NO   |     | NULL    |                |
            // | email     | varchar(255) | NO   |     | NULL    |                |
            // | password  | varchar(255) | NO   |     | NULL    |                |
            // | user_type | int(1)       | NO   |     | NULL    |                |
            // +-----------+--------------+------+-----+---------+----------------+
            if(!empty($_POST["signup"]["firstname"]) && !empty($_POST["signup"]["lastname"]) && !empty($_POST["signup"]["email"]) && !empty($_POST["signup"]["password"]) && !empty($_POST["signup"]["verifyPassword"])){
                $firstname = $_POST["signup"]["firstname"];
                $lastname = $_POST["signup"]["lastname"];
                $email = str_replace("%40","@",$_POST["signup"]["email"]);
                $password = hash("sha224",$_POST['signup']['password']);
                $verifyPassword = hash("sha224",$_POST['signup']['verifyPassword']);
                // check if email is valid 
                if(filter_var($email,FILTER_VALIDATE_EMAIL)){
                    // email valid
                    if($password == $verifyPassword){
                        //password valid
                        // copy to db
                        $user_type = 1;

                        if($conn){
                            $stmt = $conn->prepare("INSERT INTO user VALUES(NULL,:firstname,:lastname,:email,:pssword,:user_type)");
                            $stmt->bindparam(":firstname",$firstname);
                            $stmt->bindparam(":lastname",$lastname);
                            $stmt->bindparam(":email",$email);
                            $stmt->bindparam(":pssword",$password);
                            $stmt->bindparam(":user_type",$user_type);
                            $data = $stmt->execute();
                           if($data){
                            echo json_encode(["msg" => "success"]);
                           }else{
                            echo json_encode(["msg"=>"not added"]);
                           }
                        }
                    }else{
                        //password invalid
                        echo json_encode(["msg" => "Passwords Do Not Match"]);
                    }
                }else{
                    // email not valid
                    echo json_encode(["msg" => "Email Not Valid. Bad Format."]);
                }
            }

        }
        if($_POST["session_id"]){
            // get the connection
            $stmt = $conn->prepare("SELECT * FROM country_branch");
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $stmt->execute();
            $data = $stmt->fetchAll();
            echo json_encode($data);

        }
    }

?>
