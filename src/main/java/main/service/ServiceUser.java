package main.service;

import main.model.User;

import java.util.Optional;

public interface ServiceUser {

    <S extends User> S save(S s);

    Optional<User> findById(Long id);

    Iterable<User> findAll();

    void deleteById(Long aLong);

    User findByName(String name);
}
