// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Animação dos números (stats)
const stats = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    if (animated) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                setTimeout(updateNumber, 20);
            } else {
                stat.textContent = target;
            }
        };
        
        updateNumber();
    });
    
    animated = true;
}

// Intersection Observer para animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateNumbers();
            }
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats, .card, .projeto-item').forEach(el => {
    observer.observe(el);
});

// Scroll suave para as seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const formMessage = document.getElementById('formMessage');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // Simular envio
    showMessage('Inscrição realizada com sucesso! 🌱', 'success');
    emailInput.value = '';
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 3000);
});

function showMessage(message, type) {
    formMessage.innerHTML = `<span style="color: ${type === 'success' ? '#74c69d' : '#e76f51'}">${message}</span>`;
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Animação de entrada dos cards
const cards = document.querySelectorAll('.card');
const projectItems = document.querySelectorAll('.projeto-item');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => cardObserver.observe(card));
projectItems.forEach(item => cardObserver.observe(item));

// Atualizar ano no footer
const yearSpan = document.querySelector('.footer-bottom p:first-child');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; ${currentYear} Agro Forte - Todos os direitos reservados`;
}

// Mostrar última atualização
const lastUpdateSpan = document.getElementById('lastUpdate');
if (lastUpdateSpan) {
    const lastUpdate = new Date().toLocaleDateString('pt-BR');
    lastUpdateSpan.textContent = `Última atualização: ${lastUpdate}`;
}

// Efeito de parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Prevenir submit do formulário de newsletter com Enter
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        newsletterForm.dispatchEvent(new Event('submit'));
    }
});

// Adicionar classe active ao link do menu conforme scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Inicializar tooltips (opcional)
const cardsWithInfo = document.querySelectorAll('.card');
cardsWithInfo.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

console.log('🚀 Site Agro Forte carregado com sucesso!');