package dev.salt.techniquetally.model;

import dev.salt.techniquetally.model.Occurrence;
import dev.salt.techniquetally.model.Sport;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(
        name = "techniques",
        uniqueConstraints = @UniqueConstraint(columnNames = {"name", "sport_key"})
)
public class Technique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private long totalNumberOfOccurrences;
    @ManyToOne(optional = false)
    @JoinColumn(name = "sport_key", referencedColumnName = "name")
    private Sport sport;
    @OneToMany(mappedBy = "technique")
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

    public List<Occurrence> getOccurrences() {
        return occurrences;
    }
}
