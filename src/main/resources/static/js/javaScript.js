$(document).ready(function () {
    $('#add_button').one('click', function () {


        $.post("http://localhost:8080/admin/add", $("#addNewUser").serialize())
            .done(function (data) {
                var id =data.id
                var name =data.name
                var lastName =data.lastName
                var age =data.age
                var email = data.email
                var userRoles =   data.userRoles


                $("tbody:first").append("" +
                    "<td>"+ id+ "</td>" +
                    "<td>" +name+ "</td>" +
                    "<td>" +lastName+ "</td>" +
                    "<td>"+age+"</td>" +
                    "<td>"+email+"</td>" +
                    "<td>["+userRoles+"]</td>");


                $('#addNewUser').trigger('reset');



                // $('a#userTablePage.nav-link.active').trigger('click');



             //   $('.userTable').trigger('click');
             //       $( "#userTable").activate(); //  скрываем, или отображаем все элементы <div>
                // $("#userTablePage").
                // on( "click", function( event ) {
                //
                //     alert( "This will be displayed only once." );
                //
                //     $( this ).off( event );
                //
                // });


                // alert(data.userRoles.name)
 // alert(userRoles1)

            })
    })
});

// <tbody>
// <tr th:each="user : ${listUsers}">
//     <td th:text="${user.id}">ID</td>
//     <td th:text="${user.name}">Name</td>
//     <td th:text="${user.lastName}">Last name</td>
// <td th:text="${user.age}">Age</td>
//     <td th:text="${user.email}">email</td>
//     <td th:text="${user.userRoles}">Roles</td>
//     <td>
//     <!-- Button to Open the Modal -->
// <button type="button" class="btn btn-primary" data-toggle="modal" th:name="lastUser"
// th:value="${user.id}"
// data-target="#modalEdit">
//     Edit
//     </button>

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