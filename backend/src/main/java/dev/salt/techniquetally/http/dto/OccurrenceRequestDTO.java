package dev.salt.techniquetally.http.dto;

import dev.salt.techniquetally.model.Occurrence;
import dev.salt.techniquetally.model.Technique;

public record OccurrenceRequestDTO(String date,
                                   String athlete,
                                   String game,
                                   String timestamp,
                                   String videoLink) {

    public Occurrence toOccurrence(Technique technique) {
        return new Occurrence(date(), athlete(), game(), timestamp(), videoLink(), technique);
    }
}
