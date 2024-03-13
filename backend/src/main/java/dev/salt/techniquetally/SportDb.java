package dev.salt.techniquetally;

import dev.salt.techniquetally.model.Sport;
import org.springframework.data.repository.ListCrudRepository;

public interface SportDb extends ListCrudRepository<Sport, Long> {

    Sport findSportByNameIgnoreCase(String name);
}
