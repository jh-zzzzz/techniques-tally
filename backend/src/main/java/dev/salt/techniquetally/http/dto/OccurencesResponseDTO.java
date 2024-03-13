package dev.salt.techniquetally.http.dto;

import dev.salt.techniquetally.model.Occurrence;

import java.util.List;

public record OccurencesResponseDTO(List<Occurrence> data) {
}
