// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Menu de navegação responsivo
    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');
    
    menuMobile.addEventListener('click', function() {
        menu.classList.toggle('active');
        menuMobile.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuMobile.classList.remove('active');
        });
    });

    // Efeito de rolagem no cabeçalho
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navegação suave ao clicar nos links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Filtro de portfólio
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animação de elementos ao rolar a página
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .about-text, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Adicionar classe CSS para animação
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(`
        .service-card, .portfolio-item, .about-image, .about-text, .contact-info, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `, styleSheet.cssRules.length);
    
    styleSheet.insertRule(`
        .service-card.animate, .portfolio-item.animate, .about-image.animate, .about-text.animate, .contact-info.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `, styleSheet.cssRules.length);
    
    // Executar animação ao carregar a página e ao rolar
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar a página
    
    // Validação simples do formulário de contato
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você adicionaria a lógica para enviar o formulário via AJAX
            // Por enquanto, apenas mostraremos uma mensagem de sucesso
            
            const formElements = contactForm.elements;
            let isValid = true;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].style.borderColor = 'red';
                } else {
                    formElements[i].style.borderColor = '';
                }
            }
            
            if (isValid) {
                // Criar elemento de mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Mensagem enviada com sucesso!';
                successMessage.style.color = '#4e54c8';
                successMessage.style.padding = '10px';
                successMessage.style.marginTop = '10px';
                successMessage.style.backgroundColor = 'rgba(78, 84, 200, 0.1)';
                successMessage.style.borderRadius = '5px';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remover mensagem após 3 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }

    // Formulário de newsletter no rodapé
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Criar elemento de mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Inscrição realizada com sucesso!';
                successMessage.style.color = '#fff';
                successMessage.style.marginTop = '10px';
                successMessage.style.fontSize = '0.9rem';
                
                this.appendChild(successMessage);
                this.reset();
                
                // Remover mensagem após 3 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
});