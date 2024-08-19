
import { Entry } from "./db";

export function search(entries: Entry[], searchQuery: string): Entry[] {

    if (!searchQuery.length) return entries.map((entry, index) => ({ ...entry, index } as Entry));

    searchQuery = searchQuery.toLowerCase();

    return entries.map((entry, index) => {
        let relevanceScore = 0;

        if (entry.name.toLowerCase() == searchQuery) {
            relevanceScore += 2;
        }

        if (entry.name.toLowerCase().includes(searchQuery)) {
            relevanceScore += 1;
        }

        return { entry: { ...entry, index } as Entry, relevanceScore };
    })
        .filter(({ relevanceScore }) => relevanceScore > 0) // Filter out non-matching entries
        .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance score (highest first)
        .map(({ entry }) => entry);
}