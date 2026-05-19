const { Client, handle_file } = require('@gradio/client');

/**
 * Delay helper for retry logic
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Service to handle Virtual Try-On using Free Hugging Face Inference API
 * Using a working duplicate of IDM-VTON since yisol/IDM-VTON is currently facing environment errors.
 */
const generateVirtualTryOn = async (userImageUrl, outfitImageUrl) => {
    const SPACE_NAME = "hysts-duplicates/IDM-VTON";
    const ENDPOINT = "/tryon";
    const MAX_RETRIES = 3;
    const RETRY_DELAY_MS = 4000;
    
    // Auth Token
    const hfToken = process.env.HUGGINGFACE_API_KEY || process.env.HUGGING_FACE_API_KEY;

    console.log(`\n--- VTON INFERENCE START ---`);
    console.log(`[API Connection] Attempting to connect to space: ${SPACE_NAME}`);
    console.log(`[API Connection] Authentication token present: ${!!hfToken}`);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`[Inference Status] Attempt ${attempt} of ${MAX_RETRIES}`);
            
            // Connect to Space
            const app = await Client.connect(SPACE_NAME, { hf_token: hfToken });
            console.log(`[Endpoint Discovery] Connected successfully to ${SPACE_NAME}.`);

            // Prepare Payload
            const payload = [
                { 
                    background: handle_file(userImageUrl), 
                    layers: [], 
                    composite: null 
                }, 
                handle_file(outfitImageUrl), 
                "Garment", // garment description
                true, // is_checked (use auto-masking)
                false, // is_checked_crop
                30, // denoise_steps
                42, // seed
            ];
            
            console.log(`[Request Payload] Preparing to send payload to endpoint ${ENDPOINT}`);
            console.dir({
                userImageUrl,
                outfitImageUrl,
                is_checked: true,
                is_checked_crop: false,
                denoise_steps: 30,
                seed: 42
            }, { depth: null });

            console.log(`[Inference Status] Submitting to Gradio API...`);
            const result = await app.predict(ENDPOINT, payload);
            
            console.log(`[Response Object] Received response from Gradio API`);
            console.dir(result, { depth: 2 });

            // Verify Response
            if (result && result.data && result.data[0]) {
                const outputData = result.data[0];
                const generatedImageUrl = typeof outputData === 'string' ? outputData : outputData.url;
                
                if (generatedImageUrl) {
                    console.log(`[Inference Status] SUCCESS. Image URL: ${generatedImageUrl}`);
                    console.log(`--- VTON INFERENCE COMPLETE ---\n`);
                    return generatedImageUrl;
                }
            }

            throw new Error("Invalid response shape from Gradio client.");
            
        } catch (error) {
            console.error(`[Full Error Object] Error during attempt ${attempt}:`, error);
            
            if (attempt < MAX_RETRIES) {
                console.log(`[Queue/Capacity Handling] Waiting ${RETRY_DELAY_MS}ms before retrying...`);
                await delay(RETRY_DELAY_MS);
            } else {
                console.log(`[Inference Status] FAILED after ${MAX_RETRIES} attempts.`);
                console.log(`--- VTON INFERENCE FAILED ---\n`);
                throw new Error("Preview temporarily unavailable. Please retry.");
            }
        }
    }
};

module.exports = { generateVirtualTryOn };
