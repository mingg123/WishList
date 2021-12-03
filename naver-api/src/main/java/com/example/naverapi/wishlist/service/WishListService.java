package com.example.naverapi.wishlist.service;

import java.util.List;
import java.util.stream.Collectors;

import com.example.naverapi.naver.NaverClient;
import com.example.naverapi.naver.dto.SearchImageReq;
import com.example.naverapi.naver.dto.SearchImageRes;
import com.example.naverapi.naver.dto.SearchLocalReq;
import com.example.naverapi.wishlist.dto.WishListDto;
import com.example.naverapi.wishlist.entity.WishListEntity;
import com.example.naverapi.wishlist.repository.WishListRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class WishListService {

    private final NaverClient naverClient;
    private final WishListRepository wishListRepository;

    public WishListDto search(String query) {
        var searchLocalReq = new SearchLocalReq();
        searchLocalReq.setQuery(query);

        var searchLocalRes = naverClient.searchLocal(searchLocalReq);

        if (searchLocalRes.getTotal() > 0) {
            var localItem = searchLocalRes.getItems().stream().findFirst().get();

            var imageQuery = localItem.getTitle().replaceAll(("<[^>]*>"), "");
            var searchImageReq = new SearchImageReq();
            searchImageReq.setQuery(imageQuery);

            // 이미지 검색
            var searchImageRes = naverClient.searchImage(searchImageReq);

            // 결과를 리턴
            if (searchImageRes.getTotal() > 0) {
                var imageItem = searchImageRes.getItems().stream().findFirst().get();
                var result = new WishListDto();
                result.setTitle(localItem.getTitle());
                result.setCategory(localItem.getCategory());
                result.setAddress(localItem.getAddress());
                result.setReadAddress(localItem.getRoadAddress());
                result.setHomePageLink(localItem.getLink());
                result.setImageLink(imageItem.getLink());
                return result;
            }

        }
        return new WishListDto();
    }

    public WishListDto add(WishListDto wishListDto) {
        var entity = dtoToEntity(wishListDto);
        var saveEntity = wishListRepository.save(entity);
        return entityToDto(saveEntity);

    }

    private WishListEntity dtoToEntity(WishListDto wishListDto) {

        var entity = new WishListEntity();
        entity.setIndex(wishListDto.getIndex());
        entity.setTitle(wishListDto.getTitle());
        entity.setCategory(wishListDto.getCategory());
        entity.setAddress(wishListDto.getAddress());
        entity.setReadAddress(wishListDto.getReadAddress());
        entity.setHomePageLink(wishListDto.getHomePageLink());
        entity.setImageLink(wishListDto.getImageLink());
        entity.setVisit(wishListDto.isVisit());
        entity.setVisitCount(wishListDto.getVisitCount());
        entity.setLastVisitDate(wishListDto.getLastVisitDate());
        return entity;

    }

    private WishListDto entityToDto(WishListEntity wishListEntity) {
        var dto = new WishListDto();
        dto.setIndex(wishListEntity.getIndex());
        dto.setTitle(wishListEntity.getTitle());
        dto.setCategory(wishListEntity.getCategory());
        dto.setAddress(wishListEntity.getAddress());
        dto.setReadAddress(wishListEntity.getReadAddress());
        dto.setHomePageLink(wishListEntity.getHomePageLink());
        dto.setImageLink(wishListEntity.getImageLink());
        dto.setVisit(wishListEntity.isVisit());
        dto.setVisitCount(wishListEntity.getVisitCount());
        dto.setLastVisitDate(wishListEntity.getLastVisitDate());
        return dto;
    }

    public List<WishListDto> findAll() {
        return wishListRepository.findAll().stream().map(it -> entityToDto(it)).collect(Collectors.toList());
    }

    public void delete(int index) {
        wishListRepository.deleteById(index);
    }

    // 방문 추가
    public void addVisit(int index) {
        log.info("index : {}", index);
        var wishItem = wishListRepository.findById(index);
        if (wishItem.isPresent()) {
            var item = wishItem.get();
            item.setVisit(true);
            item.setVisitCount(item.getVisitCount() + 1);
        }
    }
}
