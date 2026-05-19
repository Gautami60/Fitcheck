require('dotenv').config();
const { Client } = require('@gradio/client');

async function inspectAPI(space) {
    try {
        console.log(`Connecting to ${space}...`);
        const hfToken = process.env.HUGGINGFACE_API_KEY || "";
        
        const app = await Client.connect(space, { hf_token: hfToken });
        
        console.log("Connected successfully. Getting API info...");
        const apiInfo = await app.view_api();
        
        console.log(`API INFO FOR ${space}:`);
        console.dir(apiInfo, { depth: null });
        return true;
    } catch (e) {
        console.error(`Failed to inspect API for ${space}:`, e.message);
        return false;
    }
}

async function run() {
    await inspectAPI("Kwai-Kolors/Kolors-Virtual-Try-On");
    await inspectAPI("Nymbo/Virtual-Try-On");
    await inspectAPI("cuiaxi/CatVTON");
    await inspectAPI("yisol/IDM-VTON"); // try this again just in case
}

run();
