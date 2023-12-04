import axios from "axios";

export interface PokemonData {
  name: string;
  version: "front-shiny" | "back-normal" | "back-shiny" | "front-normal";
}

export const getPokemon = async (data: PokemonData): Promise<string | null> => {
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

  const imageUrl = `https://pokemon3d-image-resolver.lgiralt.com/${name}${spriteVersion}.gif`;

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/gif;base64,${base64Image}`;
  } catch (error) {
    console.error(`Failed to fetch image for ${name} ${version}:`, error);
    return null;
  }
};

export const getAllPokemonVersions = async (
  name: string
): Promise<Record<string, string | null>> => {
  const versions: Array<
    "front-shiny" | "back-normal" | "back-shiny" | "front-normal"
  > = ["front-shiny", "back-normal", "back-shiny", "front-normal"];

  const results: Record<string, string | null> = {};

  for (const version of versions) {
    const imageData = await getPokemon({ name, version });
    results[version] = imageData;
  }

  return results;
};
