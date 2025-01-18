import GUI from "lil-gui";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";

const BloomEffectScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const BLOOM_SCENE = 1;
    const bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_SCENE);

    // Modify Bloom effect parameters here
    const params = {
      threshold: 0, // Threshold for bloom effect
      strength: 1, // Bloom strength
      radius: 1, // Bloom radius
      exposure: 1, // Exposure of the scene
    };

    const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    const materials: Record<string, THREE.Material> = {};

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    // renderer.setClearColor("black"); // Modify background color here (currently black)
    // renderer.setClearColor("#e4e4e4");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      200
    );
    camera.position.set(0, 0, 20);

    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);

    const mixPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloomComposer.renderTarget2.texture },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D baseTexture;
          uniform sampler2D bloomTexture;
          varying vec2 vUv;
          void main() {
            gl_FragColor = (texture2D(baseTexture, vUv) + vec4(1.0) * texture2D(bloomTexture, vUv));
          }
        `,
      }),
      "baseTexture"
    );

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(mixPass);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // The render function will keep the scene updated and rotating
    function render() {
      scene.traverse(darkenNonBloomed);
      bloomComposer.render();
      scene.traverse(restoreMaterial);
      finalComposer.render();

      // Rotate the scene continuously, adjust these values to change the rotation speed
      scene.rotation.x += 0.001; // Rotate around the x-axis
      scene.rotation.y += 0.001; // Rotate around the y-axis

      // Request the next frame to continue the loop
      requestAnimationFrame(render);
    }

    function darkenNonBloomed(obj: THREE.Object3D) {
      if ((obj as THREE.Mesh).isMesh && bloomLayer.test(obj.layers) === false) {
        (materials as any)[obj.uuid] = (obj as THREE.Mesh).material;
        (obj as THREE.Mesh).material = darkMaterial;
      }
    }

    function restoreMaterial(obj: THREE.Object3D) {
      if (materials[obj.uuid]) {
        (obj as THREE.Mesh).material = materials[obj.uuid];
        delete materials[obj.uuid];
      }
    }

    function onPointerDown(event: MouseEvent) {
      // Remove any logic that changes rotation speed on pointer down
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, false);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        object.layers.toggle(BLOOM_SCENE);
      }
    }

    function setupScene() {
      const geometry = new THREE.IcosahedronGeometry(1.2, 15); // Size of each sphere, modify the 1 to change the size of the spheres

      const numberOfSpheres = 40; // Modify this value to change the number of spheres in the scene

      for (let i = 0; i < numberOfSpheres; i++) {
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05); // Random colors, modify the values to change color range

        const material = new THREE.MeshBasicMaterial({ color });
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = Math.random() * 10 - 5; // Range of x-axis position, change the 10 and 5 to adjust the spread
        sphere.position.y = Math.random() * 10 - 5; // Range of y-axis position
        sphere.position.z = Math.random() * 10 - 5; // Range of z-axis position

        sphere.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0); // Sphere spread radius, modify the 4.0 and 2.0 for changes in sphere distance
        sphere.scale.setScalar(Math.random() * Math.random() + 0.5); // Random scaling, modify the 0.5 for minimum size

        scene.add(sphere);

        if (Math.random() < 0.35) sphere.layers.enable(BLOOM_SCENE); // Adjust probability of bloom effect for each sphere
      }

      render();
    }

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      setupScene();
    }

    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      bloomComposer.setSize(width, height);
      finalComposer.setSize(width, height);

      render();
    });

    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("resize", render);
      window.removeEventListener("pointerdown", onPointerDown);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default BloomEffectScene;
