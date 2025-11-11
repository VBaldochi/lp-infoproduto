// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Countdown Timer
function initCountdown() {
    // Define 24 horas a partir de agora
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    };
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// Iniciar countdown quando a página carregar
initCountdown();

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar cards e seções
document.querySelectorAll('.module-card, .bonus-card, .result-card, .testimonial-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Animação de números (contador)
const animateCounter = (element, target, suffix = '', duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString('pt-BR') + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString('pt-BR') + suffix;
        }
    }, 16);
};

// Observar estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('h3');
            const text = statValue.textContent;
            
            // Detectar se tem + ou % ou outras marcações
            let target, suffix = '';
            
            if (text.includes('+')) {
                target = parseInt(text.replace(/\D/g, ''));
                suffix = '+';
            } else if (text.includes('%')) {
                target = parseInt(text.replace(/\D/g, ''));
                suffix = '%';
            } else if (text.includes('R$')) {
                target = parseFloat(text.replace(/[^\d,.]/g, '').replace(',', '.'));
                suffix = 'M+';
                statValue.textContent = 'R$ ';
            } else if (text.includes('.')) {
                target = parseFloat(text);
                suffix = '/5.0';
            } else {
                target = parseInt(text.replace(/\D/g, ''));
            }
            
            animateCounter(statValue, target, suffix);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Todos os botões CTA levam para checkout (simulado)
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Aqui você integraria com sua plataforma de pagamento
        // Por exemplo: Hotmart, Monetizze, Eduzz, etc.
        
        alert('🚀 Redirecionando para o checkout seguro...\n\n' + 
              'Em uma página real, você seria redirecionado para a plataforma de pagamento.');
        
        // Exemplo de redirecionamento:
        // window.location.href = 'https://pay.hotmart.com/SEU_LINK';
    });
});

// FAQ Accordion (opcional - expandir/recolher)
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Efeito de urgência - mudar cor do countdown quando estiver perto de acabar
setInterval(() => {
    const minutes = parseInt(document.getElementById('minutes').textContent);
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    if (minutes < 10) {
        countdownItems.forEach(item => {
            item.style.background = 'rgba(239, 68, 68, 0.3)';
        });
    }
}, 1000);

// Tracking de scroll (para análise de comportamento)
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Aqui você pode enviar eventos para Google Analytics, Facebook Pixel, etc.
        if (maxScroll > 25 && maxScroll < 26) {
            console.log('📊 Usuário chegou a 25% da página');
        }
        if (maxScroll > 50 && maxScroll < 51) {
            console.log('📊 Usuário chegou a 50% da página');
        }
        if (maxScroll > 75 && maxScroll < 76) {
            console.log('📊 Usuário chegou a 75% da página');
        }
    }
});

console.log('� Landing Page de Infoproduto carregada com sucesso!');