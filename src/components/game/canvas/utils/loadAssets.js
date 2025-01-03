import { Assets } from "pixi.js";

export const loadAssets = async () => {
  Assets.load("/pixi/blackout.png");
  const spritesheetPaths = ["/pixi/circle/circle.json", "/pixi/all.json"];
  const texturesByName = {};

  for (const path of spritesheetPaths) {
    // Check if the asset is already in the cache
    if (!Assets.cache.has(path)) {
      const spritesheet = await Assets.load(path);
      if (spritesheet && spritesheet.textures) {
        const name = getSpritesheetNameFromPath(path);
        texturesByName[name] = {};

        for (const textureName in spritesheet.textures) {
          const uniqueName = `${name}_${textureName}`;
          texturesByName[name][uniqueName] = spritesheet.textures[textureName];
        }
      } else {
        console.warn(`Invalid spritesheet structure for path ${path}`);
      }
    } else {
      // console.log(`Already in cache: ${path}`);
    }
  }

  return texturesByName;
};

// Function to extract spritesheet name from path
const getSpritesheetNameFromPath = (path) => {
  const segments = path.split("/");
  return segments[segments.length - 1].split(".")[0];
};
