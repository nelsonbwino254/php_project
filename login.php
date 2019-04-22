<?php
//session prep
session_start();
// check if we have a database connection
require_once("./partials/header.php");

?>
<title>Login</title>
</head>
<body>
<div class="container center col-lg-4">
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
            <h5>Login</h5>
            </div>
        </div>
    <!-- form -->
<form id="name">
    <!-- userid -->
    <div class="form-group row">
        <label for="email">Email</label>
        <input type="text" id='email' class="form-control" name="email" placeholder='Email'>
    </div>
    <!-- password -->
    <div class="form-group row">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" class="form-control">
    </div><br>
        <!-- buttons -->
        <div class="row">
        <div class="col-lg-5" style="padding-left : 70px;padding-top : 5px;"><span><a href="signup.php">Singup</a></span></div>
        <button class="btn btn-primary col-lg-6 offset-lg-1" type="button" id="loginSubmit">Login</button>
        </div>
</form>
</div>
</body>
<?php
require_once("./partials/footer.php");
?>
