// 1. CONFIGURAÇÃO DA FUMAÇA (Three.js) - Versão Otimizada
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('smoke-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const smokeParticles = [];
const smokeGeometry = new THREE.PlaneGeometry(150, 150);
const smokeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.15,
});

const light = new THREE.PointLight(0xff0000, 1, 500);
light.position.set(0, -100, 100);
scene.add(light);

for (let i = 0; i < 20; i++) {
    const p = new THREE.Mesh(smokeGeometry, smokeMaterial);
    p.position.set(Math.random() * 400 - 200, Math.random() * -100 - 50, Math.random() * 400 - 200);
    p.rotation.z = Math.random() * 360;
    scene.add(p);
    smokeParticles.push(p);
}

camera.position.z = 300;

function animate() {
    requestAnimationFrame(animate);
    smokeParticles.forEach(p => {
        p.rotation.z += 0.003;
        p.position.y += 0.4;
        if (p.position.y > 50) p.position.y = -150; // Sobe só até a metade
    });
    renderer.render(scene, camera);
}
animate();

// 2. LÓGICA DAS IMAGENS E BOTÕES
const pages = [
  "img/1.jpg", 
  "img/2.jpg", 
  "img/3.jpg", 
  "img/4.jpg", 
  "img/5.jpg",
  "img/6.jpg", 
  "img/7.jpg", 
  "img/8.jpg", 
  "img/9.jpg", 
  "img/10.jpg",
  "img/11.jpg", 
  "img/12.jpg", 
  "img/13.jpg", 
  "img/14.jpg", 
  "img/15.jpg",
  "img/16.jpg", 
  "img/17.jpg", 
  "img/18.jpg", 
  "img/19.jpg", 
  "img/20.jpg", 
  "img/22.jpg"
];

const book = document.getElementById('book');
let currentPage = 0;

// Criar as páginas no DOM
pages.forEach((src, index) => {
    const page = document.createElement('div');
    page.className = 'page';
    page.style.backgroundImage = `url('${src}')`;
    page.style.zIndex = pages.length - index;
    book.appendChild(page);
});

const pageElements = document.querySelectorAll('.page');

// Botão Próximo
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < pageElements.length) {
        pageElements[currentPage].classList.add('flipped');
        pageElements[currentPage].style.zIndex = currentPage + 1;
        currentPage++;
    }
});

// Botão Anterior
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        pageElements[currentPage].classList.remove('flipped');
        pageElements[currentPage].style.zIndex = pages.length - currentPage;
    }
});

// Ajuste de tela
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});