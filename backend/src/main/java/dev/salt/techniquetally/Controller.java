package dev.salt.techniquetally;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class Controller {

    @GetMapping("/sports")
    public ResponseEntity<String[]> getSports() {
        return ResponseEntity.ok(new String[]{"Football", "BJJ", "Basketball"});
    }

    @GetMapping("/sports/{sport}/techniques")
    public ResponseEntity<TechniquesResponseDTO> getTechniquesForSport(@PathVariable String sport) {
        if (sport.equalsIgnoreCase("football")) {
            return ResponseEntity.ok(new TechniquesResponseDTO(List.of(
                    new Technique("Step over", 20_000_000),
                    new Technique("Nutmeg", 11_000))));
        }
        if (sport.equalsIgnoreCase("basketball")) {
            return ResponseEntity.ok(new TechniquesResponseDTO(List.of(
                    new Technique("Cross over", 19_000_000),
                    new Technique("sth else", 10_000))));
        }
        if (sport.equalsIgnoreCase("bjj")) {
            return ResponseEntity.ok(new TechniquesResponseDTO(List.of(
                    new Technique("bow and arrow choke", 30_000),
                    new Technique("armbar", 29_000))));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{sport}/{technique}/occurrences")
    public ResponseEntity<OccurencecResponseDTO> getOccurrences(@PathVariable String sport,
                                                                @PathVariable String technique) {
        return ResponseEntity.ok(new OccurencecResponseDTO(List.of(
                new Occurrence(1L, "2012", "Messi", "Barca vs. Real Madrid",
                        "56'", null),
                new Occurrence(2L, "2011", "Ronaldo", "Real Madrid vs. Barca",
                        "40'", null))
        ));
    }
}
