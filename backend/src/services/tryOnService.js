const { Client, handle_file } = require('@gradio/client');

/**
 * Service to handle Virtual Try-On using Free Hugging Face Inference API
 * Model: yisol/IDM-VTON
 */
const generateVirtualTryOn = async (userImageUrl, outfitImageUrl) => {
    try {
        console.log("Connecting to Hugging Face Space (yisol/IDM-VTON)...");
        const app = await Client.connect("yisol/IDM-VTON");

        console.log("Submitting images to inference API...");
        
        // Gradio space API for IDM-VTON requires this exact signature
        const result = await app.predict("/tryon", [
            { 
                background: handle_file(userImageUrl), 
                layers: [], 
                composite: null 
            }, 
            handle_file(outfitImageUrl), 
            "A garment", // Generic garment description
            true, // is_checked (use auto-masking)
            true, // is_checked_crop (use auto-crop)
            30, // denoise_steps
            42, // seed
        ]);

        if (result && result.data && result.data[0] && result.data[0].url) {
            return result.data[0].url; // Returns the generated image URL hosted by Gradio
        }

        throw new Error("Invalid response format from Gradio client.");
    } catch (error) {
        console.error("Gradio Try-On Error:", error.message);
        throw new Error("AI Generation Service is currently at capacity. Please try again in a few moments.");
    }
};

module.exports = { generateVirtualTryOn };
