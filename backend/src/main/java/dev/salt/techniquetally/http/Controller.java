package dev.salt.techniquetally.http;

import dev.salt.techniquetally.*;
import dev.salt.techniquetally.http.dto.*;
import dev.salt.techniquetally.model.Occurrence;
import dev.salt.techniquetally.model.Sport;
import dev.salt.techniquetally.model.Technique;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.NoSuchElementException;

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
            return ResponseEntity.created(URI.create("/api/sports/" + nameToUri(created.getName()))).build();
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
        return ResponseEntity.ok(new TechniquesResponseDTO(techniqueDb.findTechniquesBySport_NameIgnoreCaseOrderByTotalNumberOfOccurrencesDesc(sport)));
    }

    @PostMapping("/sports/{sport}/techniques")
    public ResponseEntity<Void> addTechnique(@PathVariable("sport") String sportName, @RequestBody String technique) {
        try {
            Sport sport = sportDb.findSportByNameIgnoreCase(sportName);
            if (sport == null) {
                return ResponseEntity.notFound().build();
            }
            if (techniqueDb.findTechniqueByNameIgnoreCase(technique) != null) {
                return ResponseEntity.status(409).build();
            }
            var returned = techniqueDb.save(new Technique(technique, sport));
            return ResponseEntity.created(URI.create("/api/sports/" + sportName + "/techniques/" + nameToUri(returned.getName()))).build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
        }
    }

    @GetMapping("/sports/{sport}/techniques/{technique}/occurrences")
    public ResponseEntity<OccurencesResponseDTO> getOccurrences(@PathVariable String sport,
                                                                @PathVariable String technique) {
        var res = techniqueDb.findTechniqueByNameIgnoreCaseAndSport_NameIgnoreCase(
                transformPathVariable(technique), transformPathVariable(sport)
        );
        if (res == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new OccurencesResponseDTO(res.getOccurrences()));
    }

    @PostMapping("/sports/{sport}/techniques/{technique}/occurrences")
    public ResponseEntity<Void> addOccurrence(@PathVariable("sport") String sportName,
                                              @PathVariable("technique") String techniqueName,
                                              @RequestBody OccurrenceRequestDTO body) {
        Technique technique = techniqueDb.findTechniqueByNameIgnoreCaseAndSport_NameIgnoreCase(
                transformPathVariable(techniqueName), transformPathVariable(sportName));
        if (technique == null) {
            return ResponseEntity.notFound().build();
        }
        try {
            Occurrence created = occurrenceDb.save(body.toOccurrence(technique));
            technique.incrementTotalNumberOfOccurrences();
            techniqueDb.save(technique);
            return ResponseEntity.created(URI.create(
                    "/api/sports/" + sportName + "/techniques/" + techniqueName + "/occurrences/" + created.getId()
            )).build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
        }
    }

    @GetMapping("/occurrences/{id}")
    public ResponseEntity<Occurrence> getOccurrenceDetails(@PathVariable String id) {
        try {
            return ResponseEntity.ok(occurrenceDb.findById(id).orElseThrow());
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/occurrences/{id}")
    public ResponseEntity<Occurrence> updateOccurrence(@PathVariable String id,
                                                 @RequestBody OccurrenceUpdateRequestDTO body) {
        try {
            Occurrence occurrence = occurrenceDb.findById(id).orElseThrow();
            occurrence.update(body.timestamp(), body.videoLink());
            occurrence.addEdit();
            Occurrence updated = occurrenceDb.save(occurrence);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private String transformPathVariable(String s) {
        return s.replaceAll("-", " ");
    }

    private String nameToUri(String s) {
        return s.toLowerCase().replaceAll(" ", "-");
    }
}
