$(document).ready(function () {
    $('#add_button').on('click', function () {
//Добавление
        $.post("http://localhost:8080/admin/add", $("#addNewUser").serialize())
            .done(function (data) {
                var id = data.id,
                    name = data.name,
                    lastName = data.lastName,
                    age = data.age,
                    email = data.email,
                    userRoles = data.userRoles;
                $("tbody:first").append(
                    `<tr>
                       <td>${id}</td><td>${name}</td><td>${lastName}</td><td>${age}</td><td>${email}</td><td>${userRoles}</td>
                       <td><input onclick='editUser(this)' type='button' class='btn btn-primary' value='Edit'></td>
                       <td><input onclick='deleteUser(this)' type='button' class='btn btn-danger' value='Delete'></td>
                     </tr>`
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
    // написать через ид молдалкм
    $('#idE').attr('value', id)
    $('#nameE').attr('placeholder', name)
    $('#lastNameE').attr('placeholder', lastname)
    $('#ageE').attr('placeholder', age)
    $('#emailE').attr('placeholder', email)
    $('#modalEdit').modal('show');
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
    });
};

function deleteUser(ths) {
    //удаление
    var tr = ths.parentNode.parentNode;
    var id = tr.getElementsByTagName("td")[0].innerHTML;
    $.get(`http://localhost:8080/admin/get/${id}`)
        .done(function (data) {
            $('#idD').attr('value', data.id)
            $('#nameD').attr('placeholder', data.name)
            $('#lastNameD').attr('placeholder', data.lastName)
            $('#ageD').attr('placeholder', data.age)
            $('#emailD').attr('placeholder', data.email)
            $('#modalDelete').modal('show');
            $('#delete_button').on('click', function () {
                var myform = $('#userDeleteModal');
                var disabled = myform.find(':input:disabled').removeAttr('disabled');
                disabled.attr('disabled', 'disabled');
                $('#modalDelete').modal('hide');
                $('#userTablePage').trigger('click');
                $.post("http://localhost:8080/admin/delete", {id: id})
                    .done(function () {
                        tr.remove();
                        myform.trigger('reset');
                    })
            });
        })
};

