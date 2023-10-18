"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPokemonVersions = exports.getPokemon = void 0;
const axios_1 = require("axios");
const getPokemon = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
    const imageUrl = `https://raw.githubusercontent.com/Senzo13/pokemon3d-image-resolver/main/assets/sprites/${name}${spriteVersion}.gif`;
    try {
        const response = yield axios_1.default.get(imageUrl, { responseType: "arraybuffer" });
        const base64Image = Buffer.from(response.data, "binary").toString("base64");
        return `data:image/gif;base64,${base64Image}`;
    }
    catch (error) {
        console.error(`Failed to fetch image for ${name} ${version}:`, error);
        return null;
    }
});
exports.getPokemon = getPokemon;
const getAllPokemonVersions = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const versions = ["front-shiny", "back-normal", "back-shiny", "front-normal"];
    const results = {};
    for (const version of versions) {
        const imageData = yield (0, exports.getPokemon)({ name, version });
        results[version] = imageData;
    }
    return results;
});
exports.getAllPokemonVersions = getAllPokemonVersions;
