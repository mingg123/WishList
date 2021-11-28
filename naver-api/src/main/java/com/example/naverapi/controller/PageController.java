package com.example.naverapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/pages")
public class PageController {

    @GetMapping("/mainHTML")
    public ModelAndView mainHtml() {
        System.out.println("hello!");
        return new ModelAndView("wishShop");
    }
}
