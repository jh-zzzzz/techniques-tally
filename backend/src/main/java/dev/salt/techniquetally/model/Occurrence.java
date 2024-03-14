package dev.salt.techniquetally.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "occurrences",
        uniqueConstraints = @UniqueConstraint(columnNames = {"date", "athlete", "game", "timestamp"}))
public class Occurrence {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    private String date;
    @Column(nullable = false)
    private String athlete;
    @Column(nullable = false)
    private String game;
    @Column(nullable = false)
    private String timestamp;
    @Column(nullable = true)
    private String videoLink;
    @ManyToOne(optional = false)
    private Technique technique;

    public Occurrence() {
    }

    public Occurrence(String date, String athlete, String game, String timestamp, String videoLink, Technique technique) {
        this.date = date;
        this.athlete = athlete;
        this.game = game;
        this.timestamp = timestamp;
        this.videoLink = videoLink;
        this.technique = technique;
    }

    public String getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getAthlete() {
        return athlete;
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
