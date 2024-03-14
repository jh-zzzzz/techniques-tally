package dev.salt.techniquetally.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "sports")
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, unique = true)
    private String name;
    @OneToMany(mappedBy = "sport")
    private List<Technique> techniques;

    public Sport() {
    }


    public Sport(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Technique> getTechniques() {
        return techniques;
    }
}
