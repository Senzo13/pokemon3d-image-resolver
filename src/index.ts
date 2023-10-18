import * as fs from "fs";
import * as path from "path";

export interface PokemonData {
  name: string;
  version: "front-shiny" | "back-normal" | "back-shiny" | "front-normal";
}

export const getPokemon = (data: PokemonData): string | null => {
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

  const imagePath = path.join("https://github.com/Senzo13/pokemon-image-resolver/blob/main/assets/sprites/", `${name}${spriteVersion}.gif`);

  if (fs.existsSync(imagePath)) {
    const base64Image = fs.readFileSync(imagePath, "base64");
    return `data:image/gif;base64,${base64Image}`; 
  }

  return null;
};

export const getAllPokemonVersions = (
  name: string
): Record<string, string | null> => {
  const versions: Array<
    "front-shiny" | "back-normal" | "back-shiny" | "front-normal"
  > = ["front-shiny", "back-normal", "back-shiny", "front-normal"];

  const results: Record<string, string | null> = {};

  for (const version of versions) {
    const imageData = getPokemon({ name, version });
    results[version] = imageData;
  }

  return results;
};
