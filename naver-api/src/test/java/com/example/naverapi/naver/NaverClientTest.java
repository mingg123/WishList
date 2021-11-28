package com.example.naverapi.naver;

import com.example.naverapi.naver.dto.SearchLocalRes;
import com.example.naverapi.naver.dto.SearchImageReq;
import com.example.naverapi.naver.dto.SearchLocalReq;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class NaverClientTest {

    @Autowired
    private NaverClient naverClient;

    @Test
    public void searchLocalTest() {
        var search = new SearchLocalReq();
        search.setQuery("갈비집");

        var result = naverClient.searchLocal(search);
        System.out.println(result);
    }

    @Test
    public void searchImageTest() {
        var search = new SearchImageReq();
        search.setQuery("치킨집");

        var result = naverClient.searchImage(search);
        System.out.println(result);
    }
}
