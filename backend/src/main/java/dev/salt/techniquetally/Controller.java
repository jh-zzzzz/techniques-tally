package dev.salt.techniquetally;

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

    @GetMapping("/{sport}/{technique}/occurrences")
    public ResponseEntity<OccurencecResponseDTO> getOccurences(@PathVariable String sport,
                                                    @PathVariable String technique) {
        return ResponseEntity.ok(new OccurencecResponseDTO(List.of(
                new Occurrence(1L, "2012", "Messi", "Barca vs. Real Madrid", "56'", null),
                new Occurrence(2L, "2011", "Ronaldo", "Real Madrid vs. Barca", "40'", null))));
    }
}
