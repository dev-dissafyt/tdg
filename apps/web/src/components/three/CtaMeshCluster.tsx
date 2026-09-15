'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function CtaMeshCluster() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Subtle lighting
    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    // Floating Cluster of Low-Poly 3D Meshes (Icosahedrons, Torus, Octahedrons)
    const clusterGroup = new THREE.Group();
    const geometries = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TorusGeometry(0.4, 0.12, 6, 12),
      new THREE.DodecahedronGeometry(0.35, 0),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.3, roughness: 0.2, wireframe: false }),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.4, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.2, roughness: 0.4 }),
    ];

    const meshItems: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number } }[] = [];

    // Scatter 8 low-poly elements around the perimeter
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 0.5;
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * (radius * 0.6),
        (Math.random() - 0.5) * 1.5
      );

      clusterGroup.add(mesh);
      meshItems.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
        },
      });
    }

    scene.add(clusterGroup);

    // Cursor magnetic tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotX = y * 0.6;
      targetRotY = x * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Smooth inertia rotation towards cursor
      clusterGroup.rotation.x += (targetRotX - clusterGroup.rotation.x) * 0.05;
      clusterGroup.rotation.y += (targetRotY - clusterGroup.rotation.y) * 0.05;

      // Individual mesh spin
      meshItems.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
}
