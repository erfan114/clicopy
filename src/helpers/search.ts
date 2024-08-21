
import { Entry } from "./db";

type ScoredEntry = {
    relevanceScore: number;
} & Entry;

function nonZeroScoreFilter({ relevanceScore }: ScoredEntry) {
    return relevanceScore > 0;
}

function scoreBasedSort(
    { relevanceScore: firstScore }: ScoredEntry,
    { relevanceScore: secondScore }: ScoredEntry
) {
    return secondScore - firstScore;
}

function generateEntryMap(searchQuery: string) {

    function entryMap(entry: Entry): ScoredEntry {
        let relevanceScore = 0;

        if (entry.name.toLowerCase() == searchQuery) {
            relevanceScore += 2;
        }

        if (entry.name.toLowerCase().includes(searchQuery)) {
            relevanceScore += 1;
        }

        return { ...entry, relevanceScore };
    }

    return entryMap;
}

function scoredEntryToEntryMap({ relevanceScore, ...rest }: ScoredEntry): Entry {
    return rest;
}

export function search(entries: Entry[], searchQuery: string): Entry[] {

    if (!searchQuery.length)
        return entries;

    searchQuery = searchQuery.toLowerCase();

    return entries.map(generateEntryMap(searchQuery))
        .filter(nonZeroScoreFilter)
        .sort(scoreBasedSort)
        .map(scoredEntryToEntryMap);
}

