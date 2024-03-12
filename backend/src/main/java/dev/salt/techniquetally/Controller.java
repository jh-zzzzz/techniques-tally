package dev.salt.techniquetally;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Controller {

    @Autowired
    private SportDb sportDb;
    @Autowired
    private TechniqueDb techniqueDb;

    @GetMapping("/sports")
    public ResponseEntity<String[]> getSports() {
        return ResponseEntity.ok(sportDb.findAll().stream()
                .map(Sport::getName)
                .toArray(String[]::new));
    }

    @GetMapping("/sports/{sport}/techniques")
    public ResponseEntity<TechniquesResponseDTO> getTechniquesForSport(@PathVariable String sport) {
        return ResponseEntity.ok(new TechniquesResponseDTO(techniqueDb.findTechniquesBySport_NameIgnoreCase(sport)));
    }

    @GetMapping("/sports/{sport}/techniques/{technique}/occurrences")
    public ResponseEntity<OccurencesResponseDTO> getOccurrences(@PathVariable String sport,
                                                                @PathVariable String technique) {
        return ResponseEntity.ok(new OccurencesResponseDTO(List.of(
                new Occurrence(1L, "2012", "Messi", "Barca vs. Real Madrid",
                        "56'", null),
                new Occurrence(2L, "2011", "Ronaldo", "Real Madrid vs. Barca",
                        "40'", null))
        ));
    }
}
