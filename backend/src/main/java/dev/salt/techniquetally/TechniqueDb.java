package dev.salt.techniquetally;

import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface TechniqueDb extends ListCrudRepository<Technique, Long> {

    List<Technique> findTechniquesBySport_NameIgnoreCase(String name);
}
