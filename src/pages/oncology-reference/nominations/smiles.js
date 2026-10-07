// SMILES syntax validation via RDKit.js (RDKit MinimalLib compiled to WebAssembly).
//
// The WASM bundle is ~7 MB, so it is loaded lazily and only once. The page
// kicks off loadRDKit() on mount and awaits it before validating test agents,
// so by the time the user clicks Continue the check is normally ready.

let rdkit = null; // initialised module instance, once loaded
let rdkitPromise = null;

export function loadRDKit() {
  if (!rdkitPromise) {
    rdkitPromise = Promise.all([
      import('@rdkit/rdkit'),
      import('@rdkit/rdkit/RDKit_minimal.wasm?url'),
    ])
      .then(([{ default: initRDKitModule }, { default: wasmUrl }]) =>
        initRDKitModule({ locateFile: () => wasmUrl }),
      )
      .then((instance) => {
        rdkit = instance;
        return instance;
      })
      .catch((error) => {
        rdkitPromise = null; // allow a retry on the next call
        throw error;
      });
  }
  return rdkitPromise;
}

export const isRDKitReady = () => rdkit !== null;

/**
 * true  → parses as a molecule
 * false → RDKit rejected it
 * null  → RDKit not loaded, cannot tell
 * `RDKit` can be passed explicitly for tests; defaults to the loaded instance.
 */
export function isValidSmiles(smiles, RDKit = rdkit) {
  if (!RDKit) return null;
  let mol = null;
  try {
    mol = RDKit.get_mol(smiles);
    return !!mol && mol.is_valid();
  } catch {
    return false;
  } finally {
    mol?.delete?.(); // free WASM memory
  }
}

// Table validator: error string or undefined. Blank is allowed here (the
// CID-or-SMILES rule covers that). Skips when RDKit is unavailable.
export const validSmiles = (v) => {
  if (!v) return undefined;
  return isValidSmiles(String(v).trim()) === false ? 'Not a valid SMILES string' : undefined;
};
