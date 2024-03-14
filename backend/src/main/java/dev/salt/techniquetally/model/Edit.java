package dev.salt.techniquetally.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "edits")
public class Edit {

    private static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(nullable = false)
    private String editedAt;
    @ManyToOne(optional = false)
    Occurrence occurrence;

    public Edit() {
        this.editedAt = LocalDateTime.now().format(dtf);
    }

    public Edit(Occurrence occurrence) {
        this();
        this.setOccurrence(occurrence);
    }

    public String getEditedAt() {
        return editedAt;
    }

    private void setOccurrence(Occurrence occurrence) {
        this.occurrence = occurrence;
    }
}
