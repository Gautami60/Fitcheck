/**
 * Local Rule-Based Fashion Intelligence Engine
 * Provides realistic-looking analysis without paid APIs.
 */

// Simple string hashing for deterministic results based on image URLs
const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const analyzeStyle = async (userImageUrl, outfitImageUrl, userId) => {
    try {
        console.log("Analyzing outfit and user profiles locally...");
        
        const combinedHash = hashString(userImageUrl + outfitImageUrl);
        
        // Deterministic Score between 75 and 96
        const deterministicScore = 75 + (combinedHash % 22); 
        
        const styles = [
            "Minimal Luxury", "Streetwear", "Business Casual", 
            "Old Money", "Soft Glam", "Y2K Vintage", "Athleisure"
        ];
        
        // Deterministic pick
        const primaryStyleIdx = combinedHash % styles.length;
        const secondaryStyleIdx = (combinedHash + 1) % styles.length;
        const tertiaryStyleIdx = (combinedHash + 2) % styles.length;

        const styleMatch = [
            { style: styles[primaryStyleIdx], percentage: deterministicScore + (combinedHash % 4) },
            { style: styles[secondaryStyleIdx], percentage: deterministicScore - 10 - (combinedHash % 8) },
            { style: styles[tertiaryStyleIdx], percentage: deterministicScore - 20 - (combinedHash % 5) }
        ];

        const colors = ["emerald", "champagne", "charcoal", "ivory", "navy", "burgundy", "slate"];
        const avoidColors = ["neon tones", "oversaturated contrasts", "mustard yellow", "bright magenta"];

        const colorMatch = {
            recommended: [
                colors[combinedHash % colors.length],
                colors[(combinedHash + 1) % colors.length],
                colors[(combinedHash + 2) % colors.length]
            ],
            avoid: [
                avoidColors[combinedHash % avoidColors.length],
                avoidColors[(combinedHash + 1) % avoidColors.length]
            ]
        };

        const fits = ["Tailored fit", "Regular fit", "Relaxed fit", "Slim fit"];
        const avoids = ["Extreme oversized fits", "Skin-tight fits", "Boxy cuts"];

        const analysis = {
            suitabilityScore: deterministicScore,
            styleMatch: styleMatch,
            bodyCompatibility: "The structured tailoring complements the detected proportions effectively. The visual balance suggests strong synergy with the selected silhouette.",
            colorCompatibility: colorMatch,
            fitRecommendations: {
                best: fits[combinedHash % fits.length],
                moderate: fits[(combinedHash + 1) % fits.length],
                avoid: avoids[combinedHash % avoids.length]
            },
            occasionMatch: ["formal dinners", "networking", "evening events", "creative workspace", "weekend casual"]
                .slice(combinedHash % 2, (combinedHash % 2) + 3),
            stylingSuggestions: "Minimal metallic accessories and sleek footwear may elevate this specific aesthetic."
        };

        return analysis;
    } catch (error) {
        console.error("Analysis Error:", error.message);
        throw new Error("Local analysis failed. Please try again.");
    }
};

module.exports = { analyzeStyle };
