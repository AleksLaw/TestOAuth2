$(document).ready(function () {
    $('#add_button').on('click', function () {
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
                    "<td> <input onclick='editUser(this)' th:id='butEditStartModal_'+id type='button' class='btn btn-primary' value='restEdit'></td>" +
                    "<td> <input class='btn btn-danger' id='buttonDel' type='button' value='Delete'/></td>"
                );
                $('#addNewUser').trigger('reset');
                $('#userTablePage').trigger('click');
            })
    })
});

function refresh() {
    $.get("http://localhost:8080/admin/adminPageRest")
        .done(function (data) {

            data.forEach(data =>

                $("tbody:first").append("" +
                    "<td>" + data.id + "</td>" +
                    "<td>" + data.name + "</td>" +
                    "<td>" + data.lastName + "</td>" +
                    "<td>" + data.age + "</td>" +
                    "<td>" + data.email + "</td>" +
                    "<td>[" + data.userRoles + "]</td>" +
                    "<td> <input onclick='editUser(this)' th:id='butEditStartModal_'+id type='button' class='btn btn-primary' value='restEdit'></td>" +
                    "<td> <input class='btn btn-danger' id='buttonDel' type='button' value='Delete'/></td>"
                )
            );


            // var id = data.id
            // var name = data.name
            // var lastName = data.lastName
            // var age = data.age
            // var email = data.email
            // var userRoles = data.userRoles
            //
            // $('#addNewUser').trigger('reset');
            // $('#userTablePage').trigger('click');
        })

            //
            // tr.remove();
            //
            //
            // $("tbody:first").append("" +
            //     "<td>" + id + "</td>" +
            //     "<td>" + name + "</td>" +
            //     "<td>" + lastName + "</td>" +
            //     "<td>" + age + "</td>" +
            //     "<td>" + email + "</td>" +
            //     "<td>[" + userRoles + "]</td>" +
            //     "<td> <input onclick='editUser(this)' th:id='butEditStartModal_'+id type='button' class='btn btn-primary' value='restEdit'></td>" +
            //     "<td> <input class='btn btn-danger' id='buttonDel' type='button' value='Delete'/></td>"
            // );
            // // $('#addNewUser').trigger('reset');
            // $('#userTablePage').trigger('click');

}

function editUser(ths) {
   // refresh()
    var tr = ths.parentNode.parentNode,
        id = tr.getElementsByTagName("td")[0].innerHTML,
        name = tr.getElementsByTagName("td")[1].innerHTML,
        lastname = tr.getElementsByTagName("td")[2].innerHTML,
        age = Number(tr.getElementsByTagName("td")[3].innerHTML),
        email = tr.getElementsByTagName("td")[4].innerHTML;
        // role = tr.getElementsByTagName("td")[5].innerHTML;
    // var asd= tr.html();
//alert(tr.getElementsByTagName("td")[0].val('11111111111111111111111111111111'))


    // alert(id + "---" + name + "---" + lastname + "---" + age + "---" + email + "---" + role);
    $('#userEditModal div.modal-body input:nth-child(2)').attr('value', id)
    $('#userEditModal div.modal-body input:nth-child(4)').attr('placeholder', name)
    $('#userEditModal div.modal-body input:nth-child(6)').attr('placeholder', lastname)
    $('#userEditModal div.modal-body input:nth-child(8)').attr('placeholder', age)
    $('#userEditModal div.modal-body input:nth-child(10)').attr('placeholder', email)

    //alert($('#userEditModal div.modal-body input:nth-child(5)').attr('placeholder'))

    $('#modalEdit').modal('show');
    $(document).ready(function () {
        $('#edit_button').on('click', function () {
//изменение
            $.post("http://localhost:8080/admin/edit", $("#userEditModal").serialize())
                .done(function (data) {
                    var id = data.id
                    var name = data.name
                    var lastName = data.lastName
                    var age = data.age
                    var email = data.email
                    var userRoles = data.userRoles
                    var sss='butEditStartModal_'
                                     tr.remove();
                    $('tbody:first').append('' +
                        '<td>' + id + '</td>' +
                        '<td>' + name + '</td>' +
                        '<td>' + lastName + '</td>' +
                        '<td>' + age + '</td>' +
                        '<td>' + email + '</td>' +
                        '<td>[' + userRoles + ']</td>' +
                        '<form>' +
                        '<td> <input onclick="editUser()" th:id="butEditStartModal_"'+id+' type="button" class="btn btn-primary" value="restEdit"></td>' +
                        '<td> <input class="btn btn-danger" id="buttonDel" type="button" value="Delete"/></td>'+
                    '</form>'

                    );
                   //  $('#userEditModal').trigger('reset');
                    $('#userTablePage').trigger('click');
                })
        })
    });
};
// '<form>' +
// '<td><button class="btn btn-info modal_btn" num="' + data.id + '" act="upd" type="button" data-toggle="modal" data-target="#delete_modal" data-btype="delete">Edit</button></td>' +
// '<td><button class="btn btn-danger modal_btn" num="' + data.id + '" act="del" type="button" data-toggle="modal" data-target="#delete_modal" data-btype="delete">Delete</button></td>' +
// '</form>' +

// placeholder это атрибут. получить значения атрибута можно
// $('selector').attr('placeholder')
// установить новое значение
// $('selector').attr('placeholder', 'new value')
// вывести текст где нибудь
// $('selector').html('new value')

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


// });


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