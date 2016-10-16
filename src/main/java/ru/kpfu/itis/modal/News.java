package ru.kpfu.itis.modal;

import java.time.LocalDateTime;

public class News {
    private long id;
    private String title;
    private String text;
    private String author;
    private LocalDateTime date;
    private long plus;
    private long minus;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public long getPlus() {
        return plus;
    }

    public void setPlus(long plus) {
        this.plus = plus;
    }

    public long getMinus() {
        return minus;
    }

    public void setMinus(long minus) {
        this.minus = minus;
    }
}
