import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      const loadAsync = async () => {
        let blobUrl: string | undefined = undefined;
        try {
          const encryptedBlob = await decryptFile(
            "/models/character.enc",
            "Character3D#@"
          );
          let character: THREE.Object3D;
          blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));
          // Helper function to set color by part name
            const setColorByName = (
              object: THREE.Object3D,
              name: string,
              colorHex: string,
              materialIndex?: number
            ) => {
              const part = object.getObjectByName(name);
              if (part && (part as THREE.Mesh).isMesh) {
                const mesh = part as THREE.Mesh;
                if (Array.isArray(mesh.material)) {
                  const materials = mesh.material.map((mat: THREE.Material) => mat.clone());
                  mesh.material = materials;
                  if (materialIndex !== undefined && materials[materialIndex]) {
                    const mat = materials[materialIndex];
                    if (mat && "color" in mat) {
                      (mat as THREE.MeshStandardMaterial).color.set(colorHex);
                    }
                  } else {
                    materials.forEach((mat: THREE.Material) => {
                      if (mat && "color" in mat) {
                        (mat as THREE.MeshStandardMaterial).color.set(colorHex);
                      }
                    });
                  }
                } else {
                  const material = (mesh.material as THREE.Material).clone();
                  mesh.material = material;
                  if (material && "color" in material) {
                    (material as THREE.MeshStandardMaterial).color.set(colorHex);
                  }
                }
                console.log(`Applied color ${colorHex} to ${name}`);
              } else {
                console.warn(`Part ${name} not found or not a mesh`);
              }
            };
          
          
          loader.load(
            blobUrl,
            async (gltf) => {
              character = gltf.scene;
              // to find all mesh details
              // character.traverse((child) => {
              // if (child instanceof THREE.Mesh) {
              //   console.log("Mesh Name:", child.name);
              // }
            // });
            character.traverse((child) => {
            if (child instanceof THREE.SkinnedMesh && child.material && "color" in child.material) {
              console.log("Mesh Name:", child.name);
              (child.material as THREE.MeshStandardMaterial).color.set("#bf8871");
            }
          });

              // Set colors for other character parts
              setColorByName(character, "BODYSHIRT", "#343435");
              setColorByName(character, "Ear001", "#bf8871");
              setColorByName(character, "Eyebrow", "#2f2e2f");
              setColorByName(character, "eyebrow_L", "#2f2e2f");
              setColorByName(character, "eyebrow_R", "#2f2e2f");
              setColorByName(character, "EYEs001", "#800080");
              // setColorByName(character, "Hand", "#bf8871");
              // setColorByName(character, "Neck", "#bf8871");
              setColorByName(character, "Pant", "#2f2e2f");
              setColorByName(character, "Shoe", "#2f2e2f");
              // setColorByName(character, "Sole", "#2f2e2f");
              // setColorByName(character, "hair", "#262627");
              // setColorByName(character, "Scene", "#bf8871");

              // Detailed logging of model structure
              console.log("Loaded character scene:", character);
              console.log("Listing all objects in the scene:");
              character.traverse((child) => {
                console.log(
                  `Object: ${child.name || "unnamed"}, Type: ${child.type}, IsMesh: ${(child as THREE.Mesh).isMesh}`
                );
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  console.log(`Mesh ${child.name || "unnamed"} material:`, mesh.material);
                }
              });

              

              // // Function to find and apply material to face mesh
              // const applyFaceMaterial = (object: THREE.Object3D) => {
              //   let faceMesh: THREE.Mesh | null = null;
              //   const possibleFaceNames = ["Face002", "face002", "Face", "face", "Head", "head"];

              //   // Try exact name match for meshes
              //   for (const name of possibleFaceNames) {
              //     const face = object.getObjectByName(name);
              //     if (face && (face as THREE.Mesh).isMesh) {
              //       faceMesh = face as THREE.Mesh;
              //       console.log(`Found face mesh with name: ${name}`);
              //       break;
              //     }
              //   }

              //   // If no mesh found, check for groups with face/head names
              //   if (!faceMesh) {
              //     for (const name of possibleFaceNames) {
              //       const group = object.getObjectByName(name);
              //       if (group && group.type === "Group") {
              //         console.log(`Found group named ${name}, searching for meshes inside...`);
              //         group.traverse((child) => {
              //           if ((child as THREE.Mesh).isMesh && !faceMesh) {
              //             faceMesh = child as THREE.Mesh;
              //             console.log(`Found face mesh in group ${name}: ${child.name || "unnamed"}`);
              //           }
              //         });
              //         if (faceMesh) break;
              //       }
              //     }
              //   }

              //   // If still no mesh, search for any mesh with "face" or "head" in name
              //   if (!faceMesh) {
              //     console.log("Searching for meshes with 'face' or 'head' in name...");
              //     object.traverse((child) => {
              //       if ((child as THREE.Mesh).isMesh && !faceMesh) {
              //         const nameLower = (child.name || "").toLowerCase();
              //         if (nameLower.includes("face") || nameLower.includes("head")) {
              //           faceMesh = child as THREE.Mesh;
              //           console.log(`Found potential face mesh: ${child.name || "unnamed"}`);
              //         }
              //       }
              //     });
              //   }

              //   // Fallback: Use the first mesh in the model if no face mesh is found
              //   if (!faceMesh) {
              //     console.log("No face mesh found, attempting fallback to first mesh...");
              //     object.traverse((child) => {
              //       if ((child as THREE.Mesh).isMesh && !faceMesh) {
              //         faceMesh = child as THREE.Mesh;
              //         console.log(`Using fallback mesh: ${child.name || "unnamed"}`);
              //       }
              //     });
              //   }

              //   // Apply material if face mesh is found
              //   if (faceMesh) {
              //     const faceMaterial = new THREE.MeshStandardMaterial({
              //       color: "#be8775", // Skin tone
              //       roughness: 0.8, // Realistic skin texture
              //       metalness: 0.1, // Non-metallic skin
              //       side: THREE.FrontSide,
              //       transparent: false,
              //       opacity: 1.0,
              //     });
              //     faceMesh.material = faceMaterial.clone();
              //     console.log(`Applied custom material to ${faceMesh.name || "unnamed"}:`, faceMesh.material);
              //   } else {
              //     console.error(
              //       "No suitable mesh found for face material. Tried names:",
              //       possibleFaceNames,
              //       "and searched for 'face' or 'head' in mesh names."
              //     );
              //   }
              // };

              // // Apply face material
              // applyFaceMaterial(character);

              // // Check for material sharing
              // let face: THREE.Object3D | undefined;
              // const possibleFaceNames = ["Face002", "face002", "Face", "face", "Head", "head"];
              // for (const name of possibleFaceNames) {
              //   face = character.getObjectByName(name);
              //   if (face && (face as THREE.Mesh).isMesh) break;
              // }
              // const bodyShirt = character.getObjectByName("BODYSHIRT");
              // const pant = character.getObjectByName("Pant");
              // if (face && (face as THREE.Mesh).isMesh && bodyShirt && (bodyShirt as THREE.Mesh).isMesh) {
              //   console.log(
              //     "Do face and BODYSHIRT share material?",
              //     (face as THREE.Mesh).material === (bodyShirt as THREE.Mesh).material
              //   );
              // }
              // if (face && (face as THREE.Mesh).isMesh && pant && (pant as THREE.Mesh).isMesh) {
              //   console.log(
              //     "Do face and Pant share material?",
              //     (face as THREE.Mesh).material === (pant as THREE.Mesh).material
              //   );
              // }

              

              await renderer.compileAsync(character, camera, scene);
              character.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh) {
                  const mesh = child as THREE.Mesh;
                  child.castShadow = true;
                  child.receiveShadow = true;
                  mesh.frustumCulled = true;
                }
              });

              // Adjust feet position with safety check
              const footR = character.getObjectByName("footR");
              const footL = character.getObjectByName("footL");
              if (footR) footR.position.y = 3.36;
              if (footL) footL.position.y = 3.36;

              setCharTimeline(character, camera);
              setAllTimeline();

              if (blobUrl) URL.revokeObjectURL(blobUrl);
              dracoLoader.dispose();
              resolve(gltf);
            },
            undefined,
            (error) => {
              if (blobUrl) URL.revokeObjectURL(blobUrl);
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        } catch (err) {
          if (blobUrl) URL.revokeObjectURL(blobUrl);
          console.error("Failed to decrypt or process model file:", err);
          reject(err);
        }
      };
      loadAsync();
    });
  };

  return { loadCharacter };
};

export default setCharacter;