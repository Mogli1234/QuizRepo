$(document).on("ready",function(){
    ClearForm();
    GetAll();
    $("#btnSearch2").on("click", function () {
        GetAnimalbyId(parseInt($("#textIdSearch2").val()));
    });

    $("#btnDelete").on("click", function () {
        DeleteAnimal(parseInt($("#textIdSearch2").val()));
    });

    $("#btnUpdate").on("click", function () {
        var animal = new Object();
        animal.ID = $("#textIdSearch2").val();
        animal.Nombre = $("#txtName2").val();
        animal.Descripcion = $("#txtDescripcion").val();
        UpdateAnimal(parseInt(animal.ID), animal);
    });

    $("#btnCreate").on("click", function () {
        var animal = new Object();
        animal.Nombre = $("#txtName2").val();
        animal.Descripcion = $("#txtDescripcion").val();
        addNewElement(animal);
    });
});

//Function to obtain all persons
function GetAll() {
    var item = "";
    $("#tblList tbody").html("");
    $.getJSON("/api/Animal", function(data) {
        $.each(data, function(key, value) {
            item += "<tr>" +
                "<td>" + value.Nombre + "</td>" +
                "<td>" + value.Descripcion + "</td>" +
                "</tr>";
        });
        $("#tblList tbody").append(item);
    });
};

//Function de get a specific record
function GetAnimalbyId(id) {
    var url = "/api/Animal/" + id;
    $.getJSON(url).done(function(animal) {
        if (animal != null) {
            $("#txtName2").val(animal.Nombre);
            $("#txtDescripcion").val(animal.Descripcion);
        } else {
            alert("Animal not Exist");
        }
    }).fail(function(error) {
        alert(error.toString());
    });
};

//Function to delete a specific record
function DeleteAnimal(id) {
    var ulrApi = "/api/Animal/" + id;
    $.ajax({
        url: ulrApi,
        type: "DELETE",
        data: {ID: id},
        contentType: "application/json;charset=utf8",
        statusCode: {
            200:function() {
                GetAll();
                ClearForm();
                alert("Animal with id: " + id + " was deleted");
            },
            404: function() {
                alert("Animal with id: " + id + " was not foud");
            }
        }
    });
};


//Function to update specific record
function UpdateAnimal(id, person) {
    var ulrApi = "/api/Animal/" + id;
    $.ajax({
        url: ulrApi,
        type: "PUT",
        data: JSON.stringify(person),
        contentType: "application/json;charset=utf8",
        statusCode: {
            200: function () {
                GetAll();
                ClearForm();
                alert("Animal with id: " + id + " was updated");
            },
            404: function () {
                ClearForm();
                alert("Animal with id: " + id + " was not found");
            },
            400: function () {
                ClearForm();
                alert("Error");
            }
        }
    });
}

function ClearForm() {
    $("#textIdSearch2").val("");
    $("#txtName2").val("");
    $("#txtDescripcion").val("");
}

//Function to create a new element
function addNewElement(animal) {
    var ulrApi = "/api/Animal/";
    $.ajax({
        url: ulrApi,
        type: "POST",
        data: JSON.stringify(animal),
        contentType: "application/json;charset=utf8",
        statusCode: {
            201: function () {
                GetAll();
                ClearForm();
                alert("You create a new Animal");
            },
            400: function () {
                ClearForm();
                alert("Error");
            }
        }
    });
}