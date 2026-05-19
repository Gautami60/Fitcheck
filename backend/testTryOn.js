require('dotenv').config();
const { generateVirtualTryOn } = require('./src/services/tryOnService');

async function runTest() {
    try {
        const dummyUserImg = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        const dummyOutfitImg = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
        console.log("Starting TryOn Test...");
        const result = await generateVirtualTryOn(dummyUserImg, dummyOutfitImg);
        console.log("Test Success! Generated Image URL:", result);
    } catch (e) {
        console.error("Test Failed:", e.message);
    }
}

runTest();
