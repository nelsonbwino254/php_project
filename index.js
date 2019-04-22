$("#singupSubmit").on("click",(e)=>{
    e.preventDefault();
    let formData = $("#name").serialize();
    items = formData.split("&");
    

    $.ajax({
        url: "../partials/user.php",
        method: "POST",
        data: {
            signup:
            {
                "firstname": items[0].split("=")[1],
                "lastname": items[1].split("=")[1],
                "email": items[2].split("=")[1],
                "password": items[3].split("=")[1],
                "verifyPassword": items[3].split("=")[1]
            }
        },
        success: function (result) {
            window.location = "../dashboard.php";
        }
    });
});

$("#loginSubmit").on("click", e => {
    e.preventDefault();
    let formData = $("#name").serialize();
    items = formData.split("&");
    // console.log(formData);

    // we are going to make an ajax request to the back end
    $.ajax({
        url: "../partials/user.php",
        method: "POST",
        data: {
            login:
            {
                "email": items[0].split("=")[1],
                "password": items[1].split("=")[1]
            }
        },
        success: function (result) {
            let data = JSON.parse(result);
            if(data.msg == 200){
                window.location = "../dashboard.php";
                console.log(data);
            }
        }
    });
});



// dealing with the session data with the dashboard page
//if this key is not set we are going to need to log the user out
let sessionId = 111;
$.ajax({
    url: "../partials/proc.php",
    method: "POST",
    data: {
        session_id: sessionId,
    },
    success: function (result) {
        console.log(result);
            // get the country and branches avaible
            // json_parse it
            let country_branch = JSON.parse(result);
            //get the handle to the create the handle
            let country_handle = $("#single2");
            // we are going to loop thru the data
            $.each(country_branch,(index,value)=>{
                country_handle.append("<option value="+ value.code +">"+value.country+"</option>");
            })

    }
});


// working with the coutires select boxes
function displayVals() {
            var singleValues = $("#single2").val();
            var branch ='';
            if(singleValues == "null"){
                 let infoButton = $("#flag");
                var branch = $("#second");
                infoButton.attr("data-toggle","tooltip");
                infoButton.attr("title","Flags Show here");
                branch.attr('disabled', 'disabled');
                branch.css('color', '#bababa');
            }else{
                var branch = $("#second").removeAttr("disabled");
                $("#flag").removeAttr("data-original-title");
                $("#flag").removeAttr("title");
            }


            if(singleValues != "null"){
                branch.css('color', '#000000');
                // make an ajax to the database
                // to update the list of branches
                $.ajax({
                    url: "../partials/proc.php",
                    method: "POST",
                    data: {
                        flag:
                        {
                            country : singleValues,
                        }
                    },
                    success: function (result) {
                        let data = JSON.parse(result);
                        let branches = data[0].branch;
                        let branch_handle = $("#second");

                        // splitting the branches
                        let branch_array = branches.split(".");
                        let branch_html="";
                        branch_html += "<option id='null'>Branch</option>";
                        $.each(branch_array,(index,value)=>{
                            //append to the countries
                            branch_html += '<option id='+value+'>'+value+'</option>';
                        })
                        branch_handle.html(branch_html);

                    }
                });
            }
            // getting the attr
            let branch_button_attr = $('#dropUnit').is(':disabled');

            // if disabled alert the user that he she must
            // $('#dropUnit').is(':enabled');
            // console.log(branch_button_attr);
            // console.log(singleValues);
        }

$("#single2").change(displayVals);
displayVals();


// adding event listeners for nav items
// grabbing the display section
let display_header = $("#theDisplay");
let display = $("#display");

// listen for a click event
// if clicked we should warn the user to select a branch
// get the sidebar
first_run_branch = $("#second").val();
$(".sidebar > div.item").on("click",(e)=>{
    // output the message
    if($("#second").val() == "Branch"){
        Swal.fire({
            type: 'error',
            title: 'Country/Branch Issue!',
            text: 'Select Country and Branch before an option!',
            allowOutsideClick : false
        });
    }
})

$("#second").change((e)=>{
    let currentBranch  = $("#second").val();
    if($("#second").val() === "Branch"){
        Swal.fire({
            type: 'error',
            title: 'Country/Branch Issue!',
            text: 'Select Country and Branch before an option!',
            allowOutsideClick : false
        });
    }else{

        let currentCountry = $("#single2").val();

    //function to deal with adding the items form the page
    // make scalleds to the back end
        function loadItem(cat, thisBranch, thisCountry){
            $.ajax({
                url: "../partials/proc.php",
                method: "POST",
                data: {
                    category: {
                        selected : cat,
                        country : thisCountry,
                        branch : thisBranch
                    }

                },
                success: function (result) {
                    // let data = JSON.parse(result);
                    //get the handle to append the file to
                    display.html(result);
                }
            });
        }
    // we have valid branch
    // add item
    $("#add").on("click",(e)=>{
        display_header.html("Add Item");
        // ajax funtion whose response is the
        // we are going to return html.
        loadItem("add",currentBranch,currentCountry);


    });
    // store
    $("#store").on("click",(e)=>{
        display_header.html("The Store");
        // display.load("../partials/html/store.html")
        loadItem("store",currentBranch,currentCountry);
    });

    //leased
    $("#leased").on("click",(e)=>{
        display_header.html("Leased Item");
        // we are going to send the dept and country
        loadItem("leased",currentBranch,currentCountry);
    });

    //addEmployee
    $("#addEmployee").on("click",(e)=>{
        display_header.html("Add Employee");
        loadItem("addEmployee", currentBranch, currentCountry);
        console.log("jake and drake nikka");
            let drop = $("#country").html();
            console.log(drop);
    });

    //employees
    $("#employees").on("click",(e)=>{
        display_header.html("Manage Employees");
        loadItem("employees",currentBranch,currentCountry);
    });

    //leaseItem
    $("#leaseItem").on("click",(e)=>{
        display_header.html("Lease Item");
        loadItem("leaseItem",currentBranch,currentCountry);
    });

    //managers
    $("#managers").on("click",(e)=>{
        display_header.html("Branch Managers");
        loadItem("managers",currentBranch,currentCountry);
    });

    //mentaince
    $("#mentainance").on("click",(e)=>{
        display_header.html("Mentainance");
        loadItem("mentainance",currentBranch,currentCountry);
    });
    }
});

// function to change the flag a we swap the select
let country = $("#single2");
country.on("change",(e)=>{
    $('#flag').attr('src','./images/flags/'+$("#single2").val()+".png");
})

// adding a toggle class for item sidebar
let items = $(".item");
    items.on("click",e => {
        // checking if the class exists
        $( "div.item" ).each(function (index){
            $(this).removeClass("clicked");
        });
        let this_id = $(e.target);
        this_id.toggleClass("clicked");

})


function add() {
    let currentBranch = $("#second").val();
    let currentCountry = $("#single2").val();
    if (currentBranch == "Branch") {
        // adding the header
        display_header.html("<span id='error'>Branch Error!</span>");
         // the user has not selected a branch
        $("#display").load("../partials/html/error.html");
    } else {
        let formData = $("#addItem").serialize();
        items = formData.split("&");
        // changing the bool types to be of type int
        console.log(items);
        // function boolInt(index) { return int(items[index].split("=")[1]); }
        // let state = items[4].split("=")[1] !== null ? int(items[4].split("=")[1]) : null;

        // the user has select a branch
        $.ajax({
            url: "../partials/proc.php",
            method: "POST",
            data: {
                addItem: {
                    "itemName": items[0].split("=")[1],
                    "price": items[1].split("=")[1],
                    "color": items[2].split("=")[1],
                    "engineSize": items[3].split("=")[1],
                    "state": items[4].split("=")[1], //bool [4]
                    "cover": items[5].split("=")[1], //bool [5]
                    "lease": items[6].split("=")[1], //bool [5]
                    "make": items[7].split("=")[1],
                    "origin": items[8].split("=")[1],
                    "year": items[9].split("=")[1],
                    "fuelType": items[10].split("=")[1], // bool [9]
                    "fuelCapacity": items[11].split("=")[1],
                    "units": items[12].split("=")[1],
                    "country": currentCountry,
                    "branch" : currentBranch
                }
            },
            success: function (result) {
                let data = JSON.parse(result);
                if (data.status === 201) {
                    // item copied
                    Swal.fire({
                        type: 'success',
                        title: 'copied successFully',
                        text: 'Copied the Item Successfully',
                        timer: 2000
                    });
                   $('form#addItem').trigger("reset");
                }
                if (data.status === 409 || data.status === 404 || data.status === 303) {
                    Swal.fire({
                        type: 'error',
                        title: 'Item Could Not Be Copied!',
                        text: 'Item !',
                        timer: 8000
                    });
                }
            }
        });
    }
}
function lease() {
    let currentBranch = $("#second").val();
    let currentCountry = $("#single2").val();
    if (currentBranch == "Branch") {
        // adding the header
        display_header.html("<span id='error'>Branch Error!</span>");
        // the user has not selected a branch
        $("#display").load("../partials/html/error.html");
    } else {
        let formData = $("#lease").serialize();
        items = formData.split("&");
        // changing the bool types to be of type int
        // function boolInt(index) { return int(items[index].split("=")[1]); }
        // let state = items[4].split("=")[1] !== null ? int(items[4].split("=")[1]) : null;

        // the user has select a branch
        $.ajax({
            url: "../partials/proc.php",
            method: "POST",
            data: {
                lease: {
                    "empoyeedId": items[0].split("=")[1],
                    "condition": items[1].split("=")[1],
                    "itemId": items[2].split("=")[1],
                    "duration": items[3].split("=")[1], //bool [4]
                    "reason": items[4].split("=")[1] //bool [5]
                }
            },
            success: function (result) {
                let data = JSON.parse(result);
                if (data.status === 201) {
                    // item copied
                    Swal.fire({
                        type: 'success',
                        title: 'Success',
                        text: 'lease the Item Successfully',
                        timer: 2000
                    });
                    $('form#addItem').trigger("reset");
                }
                if (data.status === 409 ) {
                    Swal.fire({
                        type: 'error',
                        title: 'Item Could Not Be leased!',
                        text: 'Item !',
                        timer: 8000
                    });
                }
            }
        });
    }
}
function employ() {
    let currentBranch = $("#second").val();
    let currentCountry = $("#single2").val();
    if (currentBranch == "Branch") {
        // adding the header
        display_header.html("<span id='error'>Branch Error!</span>");
        // the user has not selected a branch
        $("#display").load("../partials/html/error.html");
    } else {
        let formData = $("#employ").serialize();
        items = formData.split("&");
        console.log(items);
        // changing the bool types to be of type int
        // function boolInt(index) { return int(items[index].split("=")[1]); }
        // let state = items[4].split("=")[1] !== null ? int(items[4].split("=")[1]) : null;
        // the user has select a branch
        $.ajax({
            url: "../partials/proc.php",
            method: "POST",
            data: {
                employ: {
                    "firstname": items[0].split("=")[1],
                    "phone": items[1].split("=")[1],
                    "email": items[2].split("=")[1],
                    "branch": items[3].split("=")[1],
                    "lastname": items[4].split("=")[1],
                    "designation": items[5].split("=")[1],
                    "country": items[6].split("=")[1],
                    "status": items[7].split("=")[1],
                }
            },
            success: function (result) {
                console.log(result);
                let data = JSON.parse(result);
                if (data.status === 201) {
                    // item copied
                    Swal.fire({
                        type: 'success',
                        title: 'copied successFully',
                        text: 'Copied the Item Successfully',
                        timer: 2000
                    });
                    $('form#addItem').trigger("reset");
                    $('form#employ').trigger("reset");
                }
                if (data.status === 404 ) {
                    Swal.fire({
                        type: 'error',
                        title: 'Item Could Not Be Copied!',
                        text: 'Item !',
                        timer: 8000
                    });
                }
                if (data.status === 600) {
                    Swal.fire({
                        type: 'error',
                        title: 'Empty Fields!',
                        text: 'All Fields Must Be filled!',
                        timer: 8000
                    });
                }
                if (data.status === 601) {
                    Swal.fire({
                        type: 'error',
                        title: 'Invaid Infomation!',
                        text: 'Email Is Not Valid!',
                        timer: 8000
                    });
                }
                if (data.status === 602) {
                    Swal.fire({
                        type: 'error',
                        title: 'Invaid Infomation!',
                        text: 'Phone Number Is Not Valid!',
                        timer: 8000
                    });
                }
            }
        });
    }
}
function moreInfoEmp() {
    display_header.html("Branch Managers");
    $("#display").load("../partials/html/addEmployee.html");
}

//function for addemployee on branch change
function changeBranch() {
   let this_country = $("#AddCountry option:selected").val();
    $.ajax({
        url: "../partials/proc.php",
        method: "POST",
        data: {
            getBranch: {
                "country": this_country
            }
        },
        success: function (result) {
            let data = JSON.parse(result);
            if (data) {
                // get the item to ad item to
                let accum = '';
                for(let i = 0;i < data.length;i++){
                    accum += "<option value=" + data[i] + ">" + data[i] + "</option>";
                }
                $("#branch").html(accum);
                // resetting a from
                // $('form#addItem').trigger("reset");
            }
        }
    });
}


