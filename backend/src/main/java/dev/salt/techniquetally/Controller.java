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
    @Autowired
    private OccurrenceDb occurrenceDb;

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
        var res = techniqueDb.findTechniqueByNameIgnoreCaseAndSport_NameIgnoreCase(
                transformPathVariable(technique), transformPathVariable(sport)
        );
        return ResponseEntity.ok(new OccurencesResponseDTO(res.getOccurrences()));
    }

    private String transformPathVariable(String s) {
        return s.replaceAll("-", " ");
    }
}
