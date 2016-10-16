package ru.kpfu.itis.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HotNewsController {

    @RequestMapping("/")
    public String[] newsPrint() {
        String[] news = new String[] {"Dog1" , "Dog2", "Dog3", "Lemon?", "Cats don't like cold water"};
        return news;
    }
}
