// Node script which copies the contents of the `dist` directory to the specified Foundry VTT module directory.
// This script is intended to be run from the root of the project directory.

// Get the Foundry module path from the localconfig.json file
import * as fs from "fs";
import * as path from "path";
import localConfig from "../localconfig.json" assert { type: "json" };

const foundryModulePath = localConfig.foundryModulesPath;
const distPath = path.resolve("dist");
// Path of the this module, renamed to match the module name: swade-no-desperate-attack
const modulePath = path.join(foundryModulePath, "swade-no-desperate-attack");

// Validate the config and paths
validate();
// Remove the existing module directory if it exists
if (fs.existsSync(modulePath)) {
  fs.rmSync(modulePath, { recursive: true });
}
// Copy the dist directory to the module directory
copyFolderSync(distPath, modulePath);
// Log the success message
console.log(`Copied contents of dist directory to ${modulePath}`);

// Function to validate config and paths
function validate() {
  // Ensure the foundry module path is defined
  if (!foundryModulePath) {
    console.error("Foundry module path not defined in localconfig.json");
    process.exit(1);
  }

  // Ensure the foundry module path exists
  if (!fs.existsSync(foundryModulePath)) {
    console.error(`Foundry module path does not exist: ${foundryModulePath}`);
    process.exit(1);
  }

  // Ensure the dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error(`dist directory does not exist: ${distPath}`);
    process.exit(1);
  }
}

// Function to copy a folder and its contents recursively
function copyFolderSync(from, to) {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}
