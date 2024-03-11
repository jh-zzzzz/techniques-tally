package dev.salt.techniquetally;

public class Occurrence {
    private long id;
    private String date;
    private String nameOfPlayer;
    private String game;
    private String timestamp;
    private String videoLink;

    public Occurrence(long id, String date, String nameOfPlayer, String game, String timestamp, String videoLink) {
        this.id = id;
        this.date = date;
        this.nameOfPlayer = nameOfPlayer;
        this.game = game;
        this.timestamp = timestamp;
        this.videoLink = videoLink;
    }

    public long getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getNameOfPlayer() {
        return nameOfPlayer;
    }

    public String getGame() {
        return game;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getVideoLink() {
        return videoLink;
    }
}
