package dev.salt.techniquetally.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
    @Column
    private String createdAt;
    @ManyToOne(optional = false)
    private Technique technique;
    @OneToMany(mappedBy = "occurrence")
    private List<Edit> edits;

    public Occurrence() {
        this.createdAt = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    public Occurrence(String date, String athlete, String game, String timestamp, String videoLink, Technique technique) {
        this.date = date;
        this.athlete = athlete;
        this.game = game;
        this.timestamp = timestamp;
        this.videoLink = videoLink;
        this.technique = technique;
        this.createdAt = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
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

    public String getCreatedAt() {
        return createdAt;
    }

    public List<Edit> getEdits() {
        return edits;
    }
}
