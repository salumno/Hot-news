package ru.kpfu.itis.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.kpfu.itis.model.News;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HotNewsController {

    List<News> news = new ArrayList<>();

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<News> newsPrint() {
        return news; // Return List
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public List<News> addNews(News newNews) {
        newNews.setId(news.size()+1);
        news.add(newNews);
        return news;
    }

}
