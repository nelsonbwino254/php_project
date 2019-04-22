<?php
//session prep
session_start();
// check if we have a database connection
require_once("./partials/header.php");

?>
<title>Login</title>
</head>
<body>
<div class="container center col-lg-5">
        <div class="row offset-by-150">
        <!-- logo -->
            <!-- <div class="logo center">
                <img src="logo.jpg" alt="Car And General">
            </div> -->
        </div>
        <br><br>
        <!-- login Header -->
         <div class="row justify-content-center">
            <div class="col-4">
            <h5>Signup</h5>
            </div>
        </div>
    <!-- form -->
    <br>
<form id="name">
    <!-- firstname -->
    <div class="row">Names</div><br>
    <div class="form-group row">
        <input type="text" id='firstname' class="form-control col-lg-6" name="firstname" placeholder='Firstname'>
        <input type="text" id='lastname' class="form-control col-lg-5 offset-lg-1" name="lastname" placeholder='Lastname'>
    </div>    <!-- userid -->
    <div class="form-group row">
        <label for="email">Email</label>
        <input type="text" id='email' class="form-control" name="email" placeholder='Email'>
    </div>   

    <div class="row">Password</div><br>
    <!-- password -->
    <div class="form-group row">
        <input type="password" id="password" name="password" placeholder="Password" class="form-control col-lg-6 ">
        <input type="password" id="verifypassword" name="verifypassword" placeholder="Verify Password" class="form-control col-lg-5 offset-lg-1">
    </div><br>
        <!-- buttons -->
        <div class="row">
        <div class="col-lg-5" style="padding-left : 70px;padding-top : 5px;"><span><a href="login.php">Login</a></span></div>
        <button class="btn btn-primary col-lg-6 offset-lg-1" type="button" id="singupSubmit">Signup</button>
        </div>
    
</form>
</div>
</body>
<?php
require_once("./partials/footer.php");
?>