# 🎮 Pokemon 3D Image Resolver

[![npm version](https://img.shields.io/npm/v/pokemon3d-image-resolver.svg)](https://www.npmjs.com/package/pokemon3d-image-resolver)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub stars](https://img.shields.io/github/stars/Senzo13/pokemon3d-image-resolver.svg)](https://github.com/Senzo13/pokemon3d-image-resolver/stargazers)
[![npm downloads](https://img.shields.io/npm/dm/pokemon3d-image-resolver.svg)](https://www.npmjs.com/package/pokemon3d-image-resolver)

> Retrieve animated 3D Pokemon sprite GIFs as base64 strings. Supports front, back, normal, and shiny variants for every Pokemon.

<div align="center">
  <img src="https://raw.githubusercontent.com/Senzo13/pokemon3d-image-resolver/main/assets/sprites/aerodactyl.gif" alt="Aerodactyl front normal" width="100" />
  <img src="https://raw.githubusercontent.com/Senzo13/pokemon3d-image-resolver/main/assets/sprites/aerodactyl2.gif" alt="Aerodactyl front shiny" width="100" />
  <img src="https://raw.githubusercontent.com/Senzo13/pokemon3d-image-resolver/main/assets/sprites/aerodactyl3.gif" alt="Aerodactyl back normal" width="100" />
  <img src="https://raw.githubusercontent.com/Senzo13/pokemon3d-image-resolver/main/assets/sprites/aerodactyl4.gif" alt="Aerodactyl back shiny" width="100" />
</div>

---

## ✨ Features

- **Animated 3D GIF sprites** for every Pokemon
- **Four sprite variants** — front-normal, front-shiny, back-normal, back-shiny
- **Base64 output** — ready to embed directly in `<img>` tags
- **TypeScript support** — fully typed API with exported interfaces
- **Lightweight** — minimal dependencies, simple async API
- **Batch retrieval** — fetch all four variants of a Pokemon in a single call

## 📦 Installation

```bash
npm install pokemon3d-image-resolver
```

## 🚀 Quick Start

### Get a single sprite

```typescript
import { getPokemon, PokemonData } from "pokemon3d-image-resolver";

const myPokemon: PokemonData = {
  name: "pikachu",
  version: "front-shiny",
};

const imageData = await getPokemon(myPokemon);

if (imageData) {
  console.log("Base64 image data:", imageData);
} else {
  console.log("Pokemon image not found.");
}
```

### Get all sprite variants

```typescript
import { getAllPokemonVersions } from "pokemon3d-image-resolver";

const allSprites = await getAllPokemonVersions("pikachu");

console.log(allSprites["front-normal"]); // base64 string or null
console.log(allSprites["front-shiny"]);
console.log(allSprites["back-normal"]);
console.log(allSprites["back-shiny"]);
```

### Display in HTML

```javascript
const base64Image = await getPokemon({
  name: "charizard",
  version: "front-shiny",
});

// Use directly in an img tag
const imgTag = `<img src="${base64Image}" alt="Charizard" />`;
```

## 📖 API Reference

### `getPokemon(data: PokemonData): Promise<string | null>`

Fetches a single Pokemon sprite and returns it as a base64-encoded data URI.

| Parameter | Type | Description |
|-----------|------|-------------|
| `data.name` | `string` | Pokemon name in English (lowercase) |
| `data.version` | `string` | Sprite variant (see below) |

**Returns:** `Promise<string | null>` — Base64 data URI string, or `null` if not found.

### `getAllPokemonVersions(name: string): Promise<Record<string, string | null>>`

Fetches all four sprite variants for a given Pokemon.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Pokemon name in English (lowercase) |

**Returns:** An object with keys `front-normal`, `front-shiny`, `back-normal`, `back-shiny`, each mapping to a base64 string or `null`.

### Sprite Versions

| Version | Description |
|---------|-------------|
| `front-normal` | Standard front-facing sprite |
| `front-shiny` | Shiny front-facing sprite |
| `back-normal` | Standard back-facing sprite |
| `back-shiny` | Shiny back-facing sprite |

## 🔧 Express.js Example

```javascript
const { getPokemon, getAllPokemonVersions } = require("pokemon3d-image-resolver");
const express = require("express");
const app = express();

app.get("/pokemon/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const image = await getPokemon({ name, version: "front-normal" });

    if (image) {
      res.send(`<img src="${image}" alt="${name}" />`);
    } else {
      res.status(404).send("Pokemon not found.");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.get("/pokemon/:name/all", async (req, res) => {
  const { name } = req.params;

  try {
    const versions = await getAllPokemonVersions(name);
    let html = `<h1>${name}</h1>`;

    for (const [variant, data] of Object.entries(versions)) {
      if (data) {
        html += `<h2>${variant}</h2><img src="${data}" alt="${variant}" />`;
      }
    }

    res.send(html);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

If you encounter any bugs or have feature requests, please [open an issue](https://github.com/Senzo13/pokemon3d-image-resolver/issues).

## 📝 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Senzo13">Lorenzo GIRALT</a>
</div>
