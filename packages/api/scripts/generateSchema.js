import { writeFileSync } from "fs";
import { compileFromFile } from "json-schema-to-typescript";

async function generate() {
  try {
    const schema = await compileFromFile("src/definitions/OrbitApi.json");
    writeFileSync("src/codegenOrbitApi.ts", schema);
    console.log("All done");
  } catch (error) {
    console.error(error);
  }
}

generate();
