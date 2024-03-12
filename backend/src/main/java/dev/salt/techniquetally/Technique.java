package dev.salt.techniquetally;

import jakarta.persistence.*;

@Entity
@Table(name = "techniques")
public class Technique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long totalNumberOfOccurrences;
    @ManyToOne(optional = false)
    private Sport sport;

    public Technique() {
    }

    public Technique(String name, long totalNumberOfOccurrences) {
        this.name = name;
        this.totalNumberOfOccurrences = totalNumberOfOccurrences;
    }

    public String getName() {
        return name;
    }

    public long getTotalNumberOfOccurrences() {
        return totalNumberOfOccurrences;
    }
}
