$(document).ready(function () {
    $('#add_button').one('click', function () {
//Добавление
        $.post("http://localhost:8080/admin/add", $("#addNewUser").serialize())
            .done(function (data) {
                var id = data.id
                var name = data.name
                var lastName = data.lastName
                var age = data.age
                var email = data.email
                var userRoles = data.userRoles

                $("tbody:first").append("" +
                    "<td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + lastName + "</td>" +
                    "<td>" + age + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>[" + userRoles + "]</td>" +
                    "<td> <input class='btn btn-primary' id='buttonEdit' type='button' value='EditNew'/></td>" +
                    "<td> <input class='btn btn-danger' id='buttonDel' type='button' value='Delete'/></td>"
                );
                $('#addNewUser').trigger('reset');
                $('#userTablePage').trigger('click');
            })
    })
});
$(document).ready(function () {
    // 'div#userTable.btn'
    alert($("input.btn.btn-primary"))
    $("input.btn.btn-primary")
        .on('click',function(){
            alert($("input.btn.btn-primary"))
            console.log($('div#userTable.btn'))
  //  $('#add_button').one('click', function ()
  //  $("#edit_buttonRest").on('click',function() {
        $("#modalEdit").modal('show');
     $("#modalEdit .modal-body").text($(this).text());
    });
   // /html/body/div[2]/div[2]/div/div[1]/div/div[1]/table/tbody/tr[2]/td[7]/input
    //*[@id="butEditStartModal_27"]
    // $('#edit_buttonRest').trigger('click');
    // $('#modalEdit').modal('show');
    // var btn = document.getElementById("edit_buttonRest");
    //
    // btn.onclick= function () {
    //     alert("asdasdasdasd");
     //   mymodal.style.display="block";


    // }

        // $('#modalEdit').modal('show');
        // $("#modalEdit .modal-body").text($(this).text());
//изменение
//         $.put("http://localhost:8080/admin/edit", $("#userEditModal").serialize())
//             .done(function (data) {
//                 var id = data.id
//                 var name = data.name
//                 var lastName = data.lastName
//                 var age = data.age
//                 var email = data.email
//                 var userRoles = data.userRoles
//
//                 $("tbody:first").append("" +
//                     "<td>" + id + "</td>" +
//                     "<td>" + name + "</td>" +
//                     "<td>" + lastName + "</td>" +
//                     "<td>" + age + "</td>" +
//                     "<td>" + email + "</td>" +
//                     "<td>[" + userRoles + "]</td>" +
//                     "<td> <input class='btn btn-primary' id='buttonDel' type='button' value='Edit'/></td>" +
//                     "<td> <input class='btn btn-danger' id='buttonEdit' type='button' value='Delete'/></td>"
//                 );
              //  $('#addNewUser').trigger('reset');


            // })


});


// $(document).ready(function(){
//     // Добавление пользователя
//     $('#add_button').on('click', function() {
//         $.post(...)
//             .done(function (data) {
//             ...
//             })
//             .fail(function (jqXHR, textStatus, errorThrown) {
//                 if (jqXHR.status === 406) {
//                     alert('User is already exist.');
//                 } else if (jqXHR.status === 500) {
//                     alert('Fail while adding user.');
//                 }
//             });
//     });
// });