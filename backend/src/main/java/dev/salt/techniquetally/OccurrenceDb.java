package dev.salt.techniquetally;

import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface OccurrenceDb extends ListCrudRepository<Occurrence, String> {

    List<Occurrence> findOccurrencesByTechnique_Name(String name);
}
