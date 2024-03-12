package dev.salt.techniquetally;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(
        name = "techniques",
        uniqueConstraints = @UniqueConstraint(columnNames = {"name", "sport_id"})
)
public class Technique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long totalNumberOfOccurrences;
    @ManyToOne(optional = false)
    private Sport sport;
    @OneToMany
    private List<Occurrence> occurrences;

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
