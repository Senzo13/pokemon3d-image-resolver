"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPokemonVersions = exports.getPokemon = void 0;
const fs = require("fs");
const path = require("path");
const IMAGES_DIR = path.join(__dirname, "..", "assets", "pokemon-sprite");
const getPokemon = (data) => {
    const { name, version } = data;
    let spriteVersion = "";
    switch (version) {
        case "front-shiny":
            spriteVersion = "2";
            break;
        case "back-normal":
            spriteVersion = "3";
            break;
        case "back-shiny":
            spriteVersion = "4";
            break;
    }
    const imagePath = path.join(IMAGES_DIR, `${name}${spriteVersion}.gif`);
    if (fs.existsSync(imagePath)) {
        const base64Image = fs.readFileSync(imagePath, "base64");
        return `data:image/gif;base64,${base64Image}`; // Préfixe pour utilisation directe dans une balise <img>
    }
    return null;
};
exports.getPokemon = getPokemon;
const getAllPokemonVersions = (name) => {
    const versions = ["front-shiny", "back-normal", "back-shiny", "front-normal"];
    const results = {};
    for (const version of versions) {
        const imageData = (0, exports.getPokemon)({ name, version });
        results[version] = imageData;
    }
    return results;
};
exports.getAllPokemonVersions = getAllPokemonVersions;
