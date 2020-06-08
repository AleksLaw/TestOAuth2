package main.controller;


import main.model.Role;
import main.model.User;
import main.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@Controller
public class UserController {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @GetMapping("/") //пробую слать на рест
    public String greeting() {
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        if (authorities.contains(Role.ADMIN)) {
            return "redirect:/admin/adminPage";
        }
        return "redirect:/user/userPageInfo";
    }

    @GetMapping("/newAdmin")
    public String newAdmin() {
        HashSet<Role> roles = new HashSet<>();
        roles.add(Role.ADMIN);
        roles.add(Role.USER);
        User user = new User("ADMIN", passwordEncoder.encode("ADMIN"),"LastName", 23, "asasd@asd.ru", roles);
        userRepo.save(user);
        return "/hello";
    }


    @PostMapping("/admin/add1")
    public String addUser(User user, @RequestParam("role") String role) {
        Set<Role> userRoles = getRoles(role);
        user.setUserRoles(userRoles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "redirect:/admin/adminPage";
    }
    @GetMapping("/admin/adminPage")
    public ModelAndView listUsers(User user) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Iterable<User> list = userRepo.findAll();
        ModelAndView modelAndView = new ModelAndView("adminPage");
        modelAndView.getModelMap().addAttribute("listUsers", list);
        modelAndView.getModelMap().addAttribute("currentUser", currentUser);
        return modelAndView;
    }

    @PostMapping("/admin/adminPage")
    public ModelAndView viewAdminPage(User user) {
        Iterable<User> list = userRepo.findAll();
        ModelAndView modelAndView = new ModelAndView("adminPage");
        modelAndView.getModelMap().addAttribute("listUsers", list);
        return modelAndView;
    }



    @PostMapping("/admin/edit1")
    public String editUser(User user, @RequestParam("role") String role) {
        User byId = userRepo.findById(user.getId()).get();
        if (user.getPassword() != null) {
           byId.setPassword(passwordEncoder.encode( user.getPassword()));
        }
        Set<Role> userRoles = getRoles(role);
        byId.setUserRoles(userRoles);
        byId.setName(user.getName());
        byId.setLastName(user.getLastName());
        byId.setAge(user.getAge());
        byId.setEmail(user.getEmail());


        userRepo.save(byId);
        return "redirect:/admin/adminPage";
    }

    @PostMapping("/admin/delete")
    public String delUser(@RequestParam("id") Long id) {
        userRepo.deleteById(id);
        return "redirect:/admin/adminPage";
    }


    @GetMapping("/user/userPageInfo1")
    public ModelAndView printWelcome(User user) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ModelAndView modelAndView = new ModelAndView("userPageInfo");
//        ModelAndView modelAndView = new ModelAndView("adminPage");
        modelAndView.getModelMap().addAttribute("currentUser", currentUser);
        return modelAndView;
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
