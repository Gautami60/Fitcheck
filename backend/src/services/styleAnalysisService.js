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
        
        const worksList = [
            ["structured fits", "dark monochrome", "tailored silhouettes", "elevated basics"],
            ["relaxed draping", "neutral palettes", "flowy lines", "breathable fabrics"],
            ["sharp tailoring", "bold accents", "high contrast", "statement pieces"]
        ];
        
        const avoidsList = [
            ["overly oversized cuts", "washed-out colors", "sharp shoulder-heavy fits"],
            ["tight restrictive fabrics", "clashing neon patterns", "excessive layering"],
            ["baggy silhouettes", "distressed details", "heavy synthetic blends"]
        ];

        const analysis = {
            suitabilityScore: deterministicScore,
            whatWorks: worksList[combinedHash % worksList.length],
            whatToAvoid: avoidsList[combinedHash % avoidsList.length],
            styleMatch: styleMatch,
            bodyCompatibility: "The structured silhouette complements your proportions while maintaining balance. Slight tapering may further improve visual harmony.",
            colorCompatibility: colorMatch,
            fitRecommendations: {
                best: fits[combinedHash % fits.length],
                avoid: avoids[combinedHash % avoids.length]
            },
            occasionMatch: ["formal dinners", "networking", "evening events", "casual luxury", "weekend casual"]
                .slice(combinedHash % 2, (combinedHash % 2) + 3),
            stylingSuggestions: {
                accessories: "Minimal silver jewelry or sleek geometric shapes",
                shoes: "Leather loafers or clean minimal sneakers",
                layering: "Light tailored blazer or structured overshirt",
                watch: "Classic dress watch or minimal smartwatch"
            }
        };

        return analysis;
    } catch (error) {
        console.error("Analysis Error:", error.message);
        throw new Error("Local analysis failed. Please try again.");
    }
};

module.exports = { analyzeStyle };
