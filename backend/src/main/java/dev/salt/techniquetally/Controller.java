package dev.salt.techniquetally;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/{sport}/{technique}/occurrences")
    public ResponseEntity<OccurencecResponseDTO> getOccurences(@PathVariable String sport,
                                                    @PathVariable String technique) {
        return ResponseEntity.ok(new OccurencecResponseDTO(List.of(
                new Occurrence(1L, "2012", "Messi", "Barca vs. Real Madrid", "56'", null),
                new Occurrence(2L, "2011", "Ronaldo", "Real Madrid vs. Barca", "40'", null))));
    }
}
