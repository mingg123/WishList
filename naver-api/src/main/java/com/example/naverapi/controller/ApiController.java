package com.example.naverapi.controller;

import java.util.List;
import java.util.stream.Collectors;

import com.example.naverapi.wishlist.dto.WishListDto;
import com.example.naverapi.wishlist.entity.WishListEntity;
import com.example.naverapi.wishlist.repository.WishListRepository;
import com.example.naverapi.wishlist.service.WishListService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/springapi/restarant")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {

    private final WishListService wishListService;

    private WishListRepository wishListRepository;

    @GetMapping("/search")
    private WishListDto search(@RequestParam String query) {
        return wishListService.search(query);
    }

    // wishList추가
    @PostMapping("")
    public WishListDto add(@RequestBody WishListDto wishListDto) {
        log.info("추가 : {}", wishListDto);
        return wishListService.add(wishListDto);
    }

    @GetMapping("/all")
    public List<WishListDto> findAll() {
        return wishListService.findAll();
    }

    @DeleteMapping("/{index}")
    public void delete(@PathVariable int index) {
        wishListService.delete(index);
    }

    // 방문 추가
    @PostMapping("/{index}")
    public void addVisit(@PathVariable int index) {
        wishListService.addVisit(index);
    }
}
