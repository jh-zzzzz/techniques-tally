package dev.salt.techniquetally.http.dto;

import dev.salt.techniquetally.model.Technique;

import java.util.List;

public record TechniquesResponseDTO(List<Technique> data) {
}
