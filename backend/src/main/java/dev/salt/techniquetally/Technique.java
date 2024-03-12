package dev.salt.techniquetally;

public class Technique {

    private String name;
    private long totalNumberOfOccurrences;

    public Technique(String name, long totalNumberOfOccurrences) {
        this.name = name;
        this.totalNumberOfOccurrences = totalNumberOfOccurrences;
    }

    public String getName() {
        return name;
    }

    public long getTotalNumberOfOccurrences() {
        return totalNumberOfOccurrences;
    }
}
