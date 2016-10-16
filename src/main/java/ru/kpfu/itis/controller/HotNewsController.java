package ru.kpfu.itis.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kpfu.itis.news.News;

import java.time.LocalDateTime;

@RestController
public class HotNewsController {

    @RequestMapping("/")
    public News[] newsPrint() {
        News[] news = new News[10];
        News news0 = new News();
        news0.setTitle("First news class");
        news0.setText("My first test");
        news0.setAuthor("Sema");
        news0.setDate(LocalDateTime.now());
        news0.setMinus(5);
        news0.setPlus(0);
        news0.setId(131);
        news[0] = news0;
        return news;
    }
}
