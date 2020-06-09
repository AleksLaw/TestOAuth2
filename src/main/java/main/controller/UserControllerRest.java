package main.controller;

import main.model.Role;
import main.model.User;
import main.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/admin")
public class UserControllerRest {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/add")
    public User createUser(@RequestParam("name") String name,
                           @RequestParam(value = "password", required = false) String password,
                           @RequestParam("lastName") String lastName,
                           @RequestParam("age") String age,
                           @RequestParam("email") String email,
                           @RequestParam("role") String userRoles, HttpServletResponse response) {
        int ageInt = Integer.parseInt(age);
        HashSet<Role> roles = (HashSet<Role>) getRoles(userRoles);
        User user = new User(name, passwordEncoder.encode(password), lastName, ageInt, email, roles);
        userRepo.save(user);
        User byName = userRepo.findByName(name);
        return byName;
    }

    @PostMapping("/edit")
    public User update(@RequestParam("name") String name,
                       @RequestParam(value = "password", required = false) String password,
                       @RequestParam("lastName") String lastName,
                       @RequestParam("age") String age,
                       @RequestParam("email") String email,
                       @RequestParam("role") String userRoles,
                       @RequestParam("id") String idd) {
        Long id = Long.parseLong(idd);
        int ageInt = Integer.parseInt(age);
        HashSet<Role> roles = (HashSet<Role>) getRoles(userRoles);
        Optional<User> byId = userRepo.findById(id);
        User byName = userRepo.findByName(byId.get().getName());
        if (password != null || !password.equals("")) {
            byName.setPassword(passwordEncoder.encode(password));
        }
        byName.setId(id);
        byName.setName(name);
        byName.setLastName(lastName);
        byName.setAge(ageInt);
        byName.setEmail(email);
        String password1 = byName.getPassword();
        byName.setUserRoles(roles);
        userRepo.save(byName);
        return byName;
    }

    @PostMapping("/delete")
    public void delete(@RequestParam("id") String idd) {
        Long id = Long.parseLong(idd);
        userRepo.deleteById(id);
    }

    private Set<Role> getRoles(@RequestParam("role") String role) {
        Set<Role> userRoles = new HashSet<>();
        String[] split = role.split(",");
        for (String s : split) {
            userRoles.add(Role.valueOf(s));
        }
        return userRoles;
    }
}
