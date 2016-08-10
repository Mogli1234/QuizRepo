$(document).on("ready", function () {
    ClearForm();
    GetAll();
    $("#btnSearch").on("click",function() {
        GetPersonbyId(parseInt($("#textIdSearch").val()));
    });

    $("#btnDelete").on("click",function() {
        DeletePerson(parseInt($("#textIdSearch").val()));
    });

    $("#btnUpdate").on("click",function() {
        var person = new Object();
        person.ID = $("#textIdSearch").val();
        person.Name = $("#txtName").val();
        person.LastName = $("#txtLastName").val();
        person.twitter = $("#txtTwitter").val();
        UpdatePerson(parseInt(person.ID),person);
    });

    $("#btnCreate").on("click",function() {
        var person = new Object();
      //  person.ID = $("#textIdSearch").val();
        person.Name = $("#txtName").val();
        person.LastName = $("#txtLastName").val();
        person.twitter = $("#txtTwitter").val();
        addNewElement(person);
    });
});


//Function to obtain all persons
function GetAll() {
    var item = "";
    $("#tblList tbody").html("");
    $.getJSON("api/person", function(data) {
        $.each(data, function(key, value) {
            item += "<tr>" +
                "<td>" + value.Name + "</td>" +
                "<td>" + value.LastName + "</td>" +
                "<td>" + value.twitter + "</td>" +
                "</tr>";
        });
        $("#tblList tbody").append(item);
    });
};

//Function de get a specific record
function GetPersonbyId(id) {
    var url = "/api/Person/" + id;
    $.getJSON(url).done(function(Person) {
        if (Person != null) {
            $("#txtName").val(Person.Name);
            $("#txtLastName").val(Person.LastName);
            $("#txtTwitter").val(Person.twitter);
        } else {
            alert("Person not Exist");
        }
    }).fail(function(error) {
        alert(error.toString());
    });
};

//Function to delete a specific record
function DeletePerson(id) {
    var ulrApi = "/api/Person/" + id;
    $.ajax({
        url: ulrApi,
        type: "DELETE",
        data: {ID: id},
        contentType: "application/json;charset=utf8",
        statusCode: {
            200:function() {
                GetAll();
                ClearForm();
                alert("Person with id: " + id + " was deleted");
            },
            404: function() {
                alert("Person with id: " + id + " was not foud");
            }
        }
    });
};


//Function to update specific record
function UpdatePerson(id, person) {
    var ulrApi = "/api/Person/" + id;
    $.ajax({
        url: ulrApi,
        type: "PUT",
        data: JSON.stringify(person),
        contentType: "application/json;charset=utf8",
        statusCode: {
            200: function () {
                GetAll();
                ClearForm();
                alert("Person with id: " + id + " was updated");
            },
            404: function () {
                ClearForm();
                alert("Person with id: " + id + " was not found");
            },
            400: function () {
                ClearForm();
                alert("Error");
            }
        }
    });
}

function ClearForm() {
   $("#textIdSearch").val("");
   $("#txtName").val("");
   $("#txtLastName").val("");
   $("#txtTwitter").val("");
}

//Function to create a new element
function addNewElement(person) {
    var ulrApi = "/api/Person/";
    $.ajax({
        url: ulrApi,
        type: "POST",
        data:JSON.stringify(person),
        contentType: "application/json;charset=utf8",
        statusCode: {
            201: function () {
                GetAll();
                ClearForm();
                alert("You create a new Person");
            },
            400: function () {
                ClearForm();
                alert("Error");
            }
        }
    });
}

