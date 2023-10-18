# 🚀 Pokemon Image Resolver 🚀

<img src="author.png" alt="Créateur" width="60" style="border-radius: 50%; float: left; margin-right: 10px;" />

**Créateur :** Lorenzo GIRALT  
**Portfolio :** [lgiralt.com](https://lgiralt.com/)
<br/>
Retrouvez facilement les images de vos Pokemon préférés en qualité GIF !<br/>
Que ce soit de face, de dos, ou même en version shiny, ce package est là pour vous aider.

## 🌐 Langue

Les noms des Pokémon utilisés dans ce package sont en anglais.

## 🖼️ Exemple des résultats

Voici un exemple des résultats pour les versions **front-normal**, **front-shiny**, **back-normal** et **back-shiny** de Aerodactyl :

<div style="display: flex; align-items: center;">
  <img src="./assets/pokemon-sprite/aerodactyl.gif" alt="Aerodactyl front-normal" />
  <img src="./assets/pokemon-sprite/aerodactyl2.gif" alt="Aerodactyl front-shiny" />
  <img src="./assets/pokemon-sprite/aerodactyl3.gif" alt="Aerodactyl back-normal" />
  <img src="./assets/pokemon-sprite/aerodactyl4.gif" alt="Aerodactyl back-shiny" />
</div>

## 📦 Installation

```bash
npm install pokemon-image-resolver
```

## 🛠 Utilisation

### Récupérer une image spécifique

1. **Importez les fonctions et types nécessaires** :

```typescript
import { getPokemon, PokemonData } from "pokemon-image-resolver";
```

2. **Définissez les paramètres** :

```typescript
const myPokemon: PokemonData = {
  name: "pikachu",
  version: "front-shiny",
};
```

3. **Récupérez l'image** :

```typescript
const imageData = getPokemon(myPokemon);
if (imageData) {
  console.log("Votre image Pokemon en base64 :", imageData);
} else {
  console.log("Image Pokemon introuvable.");
}
```

### Récupérer toutes les versions d'un Pokemon

```typescript
import { getAllPokemonVersions } from "pokemon-image-resolver";

const pikachuImages = getAllPokemonVersions("pikachu");
console.log(pikachuImages["front-shiny"]); // Ceci affichera l'image "front-shiny" de Pikachu en base64, ou `null` si elle n'est pas trouvée.
```

## 🖼️ Utilisation de la chaîne base64 dans une balise `img`

Une fois que vous avez récupéré la chaîne base64 de l'image de votre Pokémon, vous pouvez l'utiliser directement dans une balise `img` de votre HTML :

```html
<img src="data:image/gif;base64,CHAINE_BASE64_ICI" alt="Pokemon Image" />
```

En utilisant le code JavaScript ou autres, cela donnerait :

```javascript
const base64Image = getPokemon({ name: "pikachu", version: "front-shiny" });
const img = `<img src="${base64Image}" />`;
```

## 🔍 Versions disponibles

- **front-normal** : Image standard de face
- **back-normal** : Image standard de dos
- **front-shiny** : Image shiny de face
- **back-shiny** : Image shiny de dos

## ❓ Problèmes ou suggestions

Si vous rencontrez des problèmes ou avez des suggestions, n'hésitez pas à [ouvrir un ticket](https://github.com/Senzo13/pokemon-image-resolver/issues).

## Exemple de code et d'utilisation sur Express, pour vous aider.

```bash
nom init -y
npm install express
npm install pokemon-image-resolver
```

```javascript
const { getPokemon, getAllPokemonVersions } = require("pokemon-image-resolver");
const express = require("express");
const app = express();
const PORT = 3000;

// ==== Appelez getAllPokemonVersions avec le name du pokemon provenant de l'URL ==== \\
app.get("getAll/:name", (req, res) => {
  const { name } = req.params;

  const versions = getAllPokemonVersions(name);

  res.write("<h1>Versions de Pokemon</h1>");
  for (const version in versions) {
    if (versions[version]) {
      res.write(`<h2>${version}</h2>`);
      res.write(`<img src="${versions[version]}" alt="${version}" />`);
    }
  }

  res.end();
});

// ==== Appelez getPokemon avec le name du pokemon provenant de l'URL ==== \\
app.get("/:name", (req, res) => {
  const { name } = req.params;

  const pokemon = getPokemon({ name: "Pikachu", version: "front-normal" });

  res.write("<h1>Pokemon</h1>");
  res.write(`<h2>${name}</h2>`);
  res.write(`<img src="${pokemon}" alt="${name}" />`);

  res.end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

## 📝 Licence

ISC
