import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CityAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    // Creates city geometry
    const cityGeometry = new THREE.BoxGeometry(1, 1, 1);
    const buildings = [];
    const connections = [];

    for (let i = 0; i < 50; i++) {
      const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      const cityMaterial = new THREE.MeshPhongMaterial({ color });
      const building = new THREE.Mesh(cityGeometry, cityMaterial);
      building.position.x = Math.random() * 20 - 10;
      building.position.z = Math.random() * 20 - 10;
      building.scale.y = Math.random() * 5 + 1;
      buildings.push(building);
      scene.add(building);
    }

    // Creates connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        buildings[Math.floor(Math.random() * buildings.length)].position,
        buildings[Math.floor(Math.random() * buildings.length)].position,
      ]);
      const line = new THREE.Line(geometry, lineMaterial);
      connections.push(line);
      scene.add(line);
    }

    // Adds floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
    });
    const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleMesh);

    camera.position.set(0, 15, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let time = 0;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Simulate building growth
      buildings.forEach((building) => {
        if (building.scale.y < 10) {
          building.scale.y += 0.01 * Math.random();
        }
      });

      // Pulse effect on connections
      connections.forEach((line) => {
        line.material.opacity = 0.5 + Math.sin(time * 5) * 0.2;
      });

      // Move particles
      particleMesh.rotation.y = time * 0.1;

      // Day-night cycle
      const skyColor = new THREE.Color(
        0.5 + 0.5 * Math.sin(time * 0.2),
        0.5 + 0.5 * Math.sin(time * 0.2),
        0.5 + 0.5 * Math.sin(time * 0.2)
      );
      scene.background = skyColor;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default CityAnimation;
