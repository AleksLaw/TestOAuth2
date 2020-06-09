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
                    "<tr>" +
                    "<td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + lastName + "</td>" +
                    "<td>" + age + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>[" + userRoles + "]</td>" +
                    "<td> <input onclick='editUser(this)' type='button' class='btn btn-primary' value='Edit'></td>" +
                    "<td> <input onclick='deleteUser(this)' type='button' class='btn btn-danger' value='Delete'></td>" +
                    "</tr>"
                );
                $('#addNewUser').trigger('reset');
                $('#userTablePage').trigger('click');
            })
    })
});



function editUser(ths) {
    //редактирование
    var tr = ths.parentNode.parentNode;
    var id = tr.getElementsByTagName("td")[0].innerHTML,
        name = tr.getElementsByTagName("td")[1].innerHTML,
        lastname = tr.getElementsByTagName("td")[2].innerHTML,
        age = Number(tr.getElementsByTagName("td")[3].innerHTML),
        email = tr.getElementsByTagName("td")[4].innerHTML;
    $('#userEditModal div.modal-body input:nth-child(2)').attr('value', id)
    $('#userEditModal div.modal-body input:nth-child(4)').attr('placeholder', name)
    $('#userEditModal div.modal-body input:nth-child(6)').attr('placeholder', lastname)
    $('#userEditModal div.modal-body input:nth-child(8)').attr('placeholder', age)
    $('#userEditModal div.modal-body input:nth-child(10)').attr('placeholder', email)
    $('#modalEdit').modal('show');
    $(document).ready(function () {
        $('#edit_button').on('click', function () {
            var myform = $('#userEditModal');
            var disabled = myform.find(':input:disabled').removeAttr('disabled');
            var serialized = myform.serialize();
            disabled.attr('disabled', 'disabled');
            $('#modalEdit').modal('hide');
            $('#userTablePage').trigger('click');
            $.post("http://localhost:8080/admin/edit", serialized)
                .done(function (data) {
                    var name = data.name
                    var lastName = data.lastName
                    var age = data.age
                    var email = data.email
                    var userRoles = data.userRoles
                    tr.getElementsByTagName("td")[1].innerHTML = name
                    tr.getElementsByTagName("td")[2].innerHTML = lastName
                    tr.getElementsByTagName("td")[3].innerHTML = age
                    tr.getElementsByTagName("td")[4].innerHTML = email
                    tr.getElementsByTagName("td")[5].innerHTML = userRoles
                    myform.trigger('reset');
                })
        })
    });
};

function deleteUser(ths) {
    //удаление
    var tr = ths.parentNode.parentNode;
    var id = tr.getElementsByTagName("td")[0].innerHTML,
        name = tr.getElementsByTagName("td")[1].innerHTML,
        lastname = tr.getElementsByTagName("td")[2].innerHTML,
        age = Number(tr.getElementsByTagName("td")[3].innerHTML),
        email = tr.getElementsByTagName("td")[4].innerHTML;

    $('#userDeleteModal div.modal-body input:nth-child(2)').attr('value', id)
    $('#userDeleteModal div.modal-body input:nth-child(4)').attr('placeholder', name)
    $('#userDeleteModal div.modal-body input:nth-child(6)').attr('placeholder', lastname)
    $('#userDeleteModal div.modal-body input:nth-child(8)').attr('placeholder', age)
    $('#userDeleteModal div.modal-body input:nth-child(10)').attr('placeholder', email)
    $('#modalDelete').modal('show');
    $(document).ready(function () {
        $('#delete_button').on('click', function () {
            var myform = $('#userDeleteModal');
            var disabled = myform.find(':input:disabled').removeAttr('disabled');
            var serialized = myform.serialize();
            disabled.attr('disabled', 'disabled');
            $('#modalDelete').modal('hide');
            $('#userTablePage').trigger('click');
            $.post("http://localhost:8080/admin/delete", serialized)
                .done(function (data) {
                   tr.remove();
                    myform.trigger('reset');
                })
        })
    });
};


// function refresh() {
//     $.get("http://localhost:8080/admin/adminPageRest")
//         .done(function (data) {
//             data.forEach(data =>
//                 $("tbody:first").append("" +
//                     "<tr>" +
//                     "<td>" + data.id + "</td>" +
//                     "<td>" + data.name + "</td>" +
//                     "<td>" + data.lastName + "</td>" +
//                     "<td>" + data.age + "</td>" +
//                     "<td>" + data.email + "</td>" +
//                     "<td>[" + data.userRoles + "]</td>" +
//                     "<td> <input onclick='editUser(this)' th:id='butEditStartModal_'" + data.id + "type='button' class='btn btn-primary' value='Edit'></td>" +
//                     "<td> <input onclick='deleteUser(this)' type='button' class='btn btn-danger' value='Delete'></td>" +
//                     "</tr>"
//                 )
//             );
//         })
// }