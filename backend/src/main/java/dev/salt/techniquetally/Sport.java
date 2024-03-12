package dev.salt.techniquetally;

import jakarta.persistence.*;
import org.springframework.lang.Nullable;

import java.util.List;

@Entity
@Table(name = "sports")
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, unique = true)
    private String name;
    @OneToMany
    private List<Technique> techniques;

    public String getName() {
        return name;
    }
}
