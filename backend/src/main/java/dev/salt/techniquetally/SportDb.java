package dev.salt.techniquetally;

import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface SportDb extends ListCrudRepository<Sport, Long> {
}
