'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Activity, Thermometer, Box, RotateCcw } from 'lucide-react';
import { Badge } from '@tdgh/ui';

export function PrintBedCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentLayer, setCurrentLayer] = useState(1);
  const [nozzleTemp, setNozzleTemp] = useState(215);
  const [bedTemp, setBedTemp] = useState(60);
  const [scrollProgress, setScrollProgress] = useState(0.2);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c0e);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight.position.set(5, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x2563eb, 3, 20);
    accentLight.position.set(-5, 4, -4);
    scene.add(accentLight);

    // 1. Heated Print Bed (Grid + Aluminum Surface)
    const bedGeo = new THREE.BoxGeometry(8, 0.2, 8);
    const bedMat = new THREE.MeshStandardMaterial({
      color: 0x161a1f,
      roughness: 0.6,
      metalness: 0.8,
    });
    const bedMesh = new THREE.Mesh(bedGeo, bedMat);
    bedMesh.position.y = -0.1;
    bedMesh.receiveShadow = true;
    scene.add(bedMesh);

    // Grid helper on bed
    const gridHelper = new THREE.GridHelper(8, 16, 0x2563eb, 0x1f2937);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // 2. Extrusion Gantry Rails (X/Y Frame)
    const gantryFrameGeo = new THREE.CylinderGeometry(0.06, 0.06, 8.5);
    const railMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });

    const topRail = new THREE.Mesh(gantryFrameGeo, railMat);
    topRail.rotation.z = Math.PI / 2;
    topRail.position.set(0, 6, 0);
    scene.add(topRail);

    // 3. Extruder Head & Hotend Nozzle
    const extruderGroup = new THREE.Group();
    const headBlockGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headBlockMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const headBlock = new THREE.Mesh(headBlockGeo, headBlockMat);
    extruderGroup.add(headBlock);

    // Brass nozzle cone
    const nozzleGeo = new THREE.ConeGeometry(0.2, 0.4, 16);
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    const nozzleMesh = new THREE.Mesh(nozzleGeo, nozzleMat);
    nozzleMesh.rotation.x = Math.PI;
    nozzleMesh.position.y = -0.5;
    extruderGroup.add(nozzleMesh);

    // Hotend glow light
    const nozzleLight = new THREE.PointLight(0xf59e0b, 2, 4);
    nozzleLight.position.y = -0.6;
    extruderGroup.add(nozzleLight);

    extruderGroup.position.set(0, 2, 0);
    scene.add(extruderGroup);

    // 4. Deposited 3D Layers (Low-poly generative vase or housing)
    const layerMeshes: THREE.Mesh[] = [];
    const TOTAL_LAYERS = 24;

    for (let i = 0; i < TOTAL_LAYERS; i++) {
      const y = (i + 1) * 0.12;
      const radius = 1.4 + Math.sin(i * 0.4) * 0.5;
      const layerGeo = new THREE.TorusGeometry(radius, 0.07, 8, 32);
      layerGeo.rotateX(Math.PI / 2);
      const layerMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x2563eb : 0x06b6d4,
        roughness: 0.3,
        metalness: 0.1,
      });
      const layer = new THREE.Mesh(layerGeo, layerMat);
      layer.position.y = y;
      layer.visible = false;
      scene.add(layer);
      layerMeshes.push(layer);
    }

    // Scroll listener to drive Z-axis layer deposition
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / 1200, 0.05), 1) : 0.2;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Extruder moves on X/Y toolpath
      const radius = 1.4 + Math.sin(elapsedTime * 2) * 0.5;
      const toolX = Math.cos(elapsedTime * 3) * radius;
      const toolZ = Math.sin(elapsedTime * 3) * radius;

      // Number of active visible layers driven by scroll
      const activeCount = Math.max(1, Math.min(Math.floor(scrollProgress * TOTAL_LAYERS), TOTAL_LAYERS));
      setCurrentLayer(activeCount);

      // Position extruder at top of active layer
      const targetY = activeCount * 0.12 + 0.6;
      extruderGroup.position.set(toolX, targetY, toolZ);

      // Reveal deposited layers
      layerMeshes.forEach((mesh, idx) => {
        mesh.visible = idx < activeCount;
      });

      // Slowly rotate bed assembly for spatial depth
      scene.rotation.y = Math.sin(elapsedTime * 0.2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scrollProgress]);

  return (
    <div className="w-full bg-obsidian-950 rounded-2xl border border-obsidian-800 shadow-2xl overflow-hidden relative">
      {/* HUD Telemetry Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 bg-obsidian/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-obsidian-700 text-white font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FDM GANTRY SIMULATOR &bull; PRUSA MK4 TOLLPATH</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-obsidian/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-obsidian-700 text-amber-400 font-mono text-xs">
            <Thermometer className="w-3.5 h-3.5" />
            <span>NOZZLE: {nozzleTemp}&deg;C</span>
          </div>

          <div className="flex items-center gap-1.5 bg-obsidian/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-obsidian-700 text-electric-blue font-mono text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>LAYER: {currentLayer} / 24</span>
          </div>
        </div>
      </div>

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-[460px] cursor-grab active:cursor-grabbing" />

      {/* Scroll-to-print instruction footer */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-obsidian-400 pointer-events-none bg-obsidian/80 backdrop-blur-md px-4 py-2 rounded-xl border border-obsidian-800">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-electric-blue" />
          <span>SCROLL PAGE TO EXTRUDE ADDITIONAL 3D LAYERS</span>
        </div>
        <span>BED: {bedTemp}&deg;C &bull; MATERIAL: RECYCLED PETG</span>
      </div>
    </div>
  );
}
