package com.example.naverapi.wishlist.repository;

import com.example.naverapi.db.MemoryDbRepositoryAbstract;
import com.example.naverapi.wishlist.entity.WishListEntity;

import org.springframework.stereotype.Repository;

@Repository
public class WishListRepository extends MemoryDbRepositoryAbstract<WishListEntity> {

}
