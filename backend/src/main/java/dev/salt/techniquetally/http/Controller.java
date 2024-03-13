package dev.salt.techniquetally.http;

import dev.salt.techniquetally.*;
import dev.salt.techniquetally.http.dto.OccurencesResponseDTO;
import dev.salt.techniquetally.http.dto.SportResponseDTO;
import dev.salt.techniquetally.http.dto.TechniquesResponseDTO;
import dev.salt.techniquetally.model.Sport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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

    @PostMapping("/sports")
    public ResponseEntity<Void> addSport(@RequestBody String sport) {
        try {
            var created = sportDb.save(new Sport(sport));
            System.out.println("created = " + created.getName() + " " + created);
            return ResponseEntity.created(URI.create("/api/sports/" + created.getName().toLowerCase())).build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
        }
    }

    @GetMapping("/sports/{sport}")
    public ResponseEntity<SportResponseDTO> getSport(@PathVariable String sport) {
        var retrievedSport = sportDb.findSportByNameIgnoreCase(sport);
        if (retrievedSport == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new SportResponseDTO(retrievedSport.getId(), retrievedSport.getName()));
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
