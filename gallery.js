// 背景のパララックス効果
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.7; // スクロール速度（大きくして効果強化）
            document.body.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
            ticking = false;
        });
        ticking = true;
    }
});

// 鬱猫界隈 ギャラリーページ
console.log("Gallery page loaded! 🎨");

// パーティクル生成（script.jsから）
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = (Math.random() * 5 + 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const imageList = [
    { file: 'standing.png', title: '立っている鬱猫ちゃん' },
    { file: 'nap.png', title: 'お昼寝中の鬱猫ちゃん' },
    { file: 'scream.png', title: '叫ぶ鬱猫ちゃん' },
    { file: 'sunglasses.png', title: 'クールな鬱猫ちゃん' },
    { file: 'gao.png', title: 'がおー！' },
    { file: 'good_morning.png', title: 'おはよう！' },
    { file: 'lonly.png', title: '寂しい...' },
    { file: 'look.png', title: '見つめる鬱猫ちゃん' },
    { file: 'sleeping.png', title: 'すやすや' },
    { file: 'finger_heart.png', title: 'ハート' },
    { file: 'cat.png', title: '鬱猫ちゃん' },
    { file: 'background.png', title: '背景' },
    { file: 'text.png', title: 'テキスト' },
    { file: 'urls.png', title: 'URL' }
];

function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    imageList.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-title', image.title);
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(50px)';
        galleryItem.style.transition = 'all 0.6s ease';
        galleryItem.style.transitionDelay = (index * 0.05) + 's';

        const img = document.createElement('img');
        img.src = `images/${image.file}`;
        img.alt = image.title;
        img.loading = 'lazy';
        
        // エラーとか
        img.onerror = () => {
            galleryItem.style.display = 'none';
        };

        galleryItem.appendChild(img);
        container.appendChild(galleryItem);

        // クリックで拡大表示
        galleryItem.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.cursor = 'pointer';
            overlay.style.animation = 'fadeIn 0.3s ease';
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = img.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.objectFit = 'contain';
            enlargedImg.style.borderRadius = '10px';
            enlargedImg.style.animation = 'slideUp 0.3s ease';
            
            const title = document.createElement('div');
            title.textContent = image.title;
            title.style.position = 'absolute';
            title.style.bottom = '2rem';
            title.style.color = 'white';
            title.style.fontSize = '1.5rem';
            title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
            
            overlay.appendChild(enlargedImg);
            overlay.appendChild(title);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 300);
            });
        });
    });

    setTimeout(() => {
        const items = container.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    createParticles();
    loadGallery();
});

console.log(`Loaded ${imageList.length} images! 🖼️`);
