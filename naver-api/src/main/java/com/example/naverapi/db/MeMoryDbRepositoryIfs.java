package com.example.naverapi.db;

import java.util.List;
import java.util.Optional;

public interface MeMoryDbRepositoryIfs<T> {
    Optional<T> findById(int idx);

    T save(T entity);

    void deleteById(int index);

    List<T> findAll();

}
