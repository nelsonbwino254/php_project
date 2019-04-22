<?php
session_start();
//require the database connection
require_once("./partials/db.php");

// checking if the user is logged in
if(!isset($_SESSION["user_data"])){
    header("location:login.php");
}
//getting the session data;
$session_id ;
if(isset($_GET["uuid"])){
    $session_id = $_GET["uuid"];
}
//require the header
require_once("./partials/header.php");
?>
<!-- adding the navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light" >
    <a class="navbar-brand" href="#">
  </a>
      <!-- menu items -->
    <ul class="navbar-nav mr-auto offset-lg-0 " style="font-weight : bold">
        <a class="nav-link" href="#"><span style='font-size : 16px;'>Asset Management</span><br><span style='font-weight:600; font-size : 20px'>DASHBOARD</span></a>
    </ul>
        <ul class="navbar-nav mr-auto offset-lg-3">
    </ul>
  </div>
</nav>
</head>
<!-- end -->
<div id="container">
    <div id="sidebar" style="">
        <div id="sidebar-content" style="height:500px;font-weight: 600;">
<body>
	<!-- drop down -->
		<p class="header sidebar_items">Location Options</p>
        <!-- test -->
        <!-- flag start -->
        <div class="sidebar_items items">
        	<div class="item" style="margin-left:5px;padding-bottom:5px;"><img id="flag" data-placement="right" class="icon" src="./images/flags/null.png"  height="25px" ></div>
    	</div>
    	<!-- end flag -->
    	<!-- start drop down -->
        <div class="styled-select slate">
            <select id="single2" style="font-weight: 600; color:#6b6b6b">
                <option selected value="null">Country</option>
            </select>
        </div>
<div class="styled-select slate">
    <select id="second" style="font-weight: 600; color:#6b6b6b">
        <option id="null" selected >Branch</option>
    </select>
</div>
<!-- end drop downs -->
	<!-- adding product options -->
	<p id="space"></p>
	<p class="header sidebar_items">Product Options</p>
	<div class="sidebar_items items sidebar">
		<div class="item plus" id="add"><span><img class="icon"src="./images/add.png"  height="15px" style="padding-left:3px"></span>Add Item</div><p></p>
		<div class="item" id="store" style="padding-top: 7px;"><span><img class="icon"src="./images/shop3.png"  height="19px" ></span>Store</div><p></p>
		<div class="item" id="leased" style="margin-top : -3px"><span><img class="icon"src="./images/Leased.png"  height="20px"></span>Leased Items</div><p></p>
	</div>
	<!-- end of products  -->
	<!-- employees -->
	<p class="header sidebar_items">Employees</p>
	<div class="sidebar_items items sidebar">
		<div class="item" id="addEmployee"><span><img class="icon"src="./images/AddUser.png"  height="19px" style="padding-left:3px"></span>Add Employee</div><p></p>
		<div class="item " id="employees"><span><img class="icon"src="./images/ManageUsers.png"  height="19px" style="padding-left:3px"></span>Employees</div><p></p>
		<div class="item " id="leaseItem"><span><img class="icon"src="./images/leaseItem.png"  height="16px" style="padding-left:-7px"></span>Lease Item</div><p></p>
	</div>
	<!-- end of employees -->
	<br>
	<!-- the logout details button -->
	<div class=" items logout">
		<div class="item ">
			<div class="container">
                <br>
                <form method='POST' action="./logout.php">
                <button class="btn btn-secondary btn-block" >Logout</button>
                </form>
			</div>
		</div>

			<p></p>
	</div>
	<!-- end of the logout button -->
	<!--  -->
     <!-- end test -->
    <script>
        // checking to make sure it is not null

    </script>
        <!-- TEMP DIV END -->
        </div>
    </div><!--
 --><div id="content">
    <div id="main-content" style="height: 800px">
		<!-- the container to the display page -->
		<div class="container">
			<div id="space"></div><br>
			<h5 id="theDisplay">The display</h5>
			<div id="display">
                Welcome, To your panel. Here You can manage your organization.
			</div>
		</div>
    </div>
	</div>
</div>
<?php
require_once("./partials/footer.php");
?>