package dev.salt.techniquetally;

import dev.salt.techniquetally.model.Technique;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface TechniqueDb extends ListCrudRepository<Technique, Long> {

    List<Technique> findTechniquesBySport_NameIgnoreCase(String name);
    Technique findTechniqueByNameIgnoreCaseAndSport_NameIgnoreCase(String name, String sportName);
    Technique findTechniqueByNameIgnoreCase(String name);
}
