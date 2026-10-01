document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.dataset.theme = 'dark';
    body.classList.add('dark-theme');
    document.querySelectorAll('.theme-toggle').forEach((toggle) => toggle.remove());
    if (document.querySelector('.cpe-navbar')) body.classList.add('has-fixed-navbar');

    const currentPage = pageName || 'index.html';
    document.querySelectorAll('.side-navigation a').forEach((link) => {
        const linkPage = new URL(link.href, window.location.href).pathname.split('/').pop();
        link.classList.toggle('active', linkPage === currentPage);
    });

    const footer = document.querySelector('.cpe-footer');
    const homeFaq = document.querySelector('.system-faq');
    const copyright = footer?.querySelector('.copyright');
    if (footer && copyright) {
        const footerFaq = document.createElement('section');
        const faqHeading = document.createElement('h2');
        const faqList = document.createElement('div');
        footerFaq.className = 'footer-faq';
        faqList.className = 'footer-faq-list';
        faqHeading.textContent = 'Frequently Asked Questions';
        const questions = [
            {
                question: 'What is the difference between Computer Engineering and Computer Science?',
                answer: 'Computer Engineering combines hardware, electronics, and software to design complete computing systems. Computer Science focuses more on computation, algorithms, and software theory.',
            },
            {
                question: 'Is Computer Engineering mostly hardware?',
                answer: 'No. It combines hardware and software, including electronics, processors, programming, and the systems that connect them.',
            },
            {
                question: 'Do Computer Engineering students learn programming?',
                answer: 'Yes. Programming is used to build applications, control hardware, process data, and develop embedded and intelligent systems.',
            },
            {
                question: 'What programming languages are commonly used?',
                answer: 'Students commonly encounter C, C++, Python, Java, and JavaScript. The languages used depend on the course, project, and specialization.',
            },
            {
                question: 'What careers can Ope graduates pursue?',
                answer: 'CPE graduates can pursue careers in software, embedded systems, hardware, networking, cybersecurity, cloud computing, data, robotics, and research.',
            },
            {
                question: 'What skills should incoming Cpe students develop?',
                answer: 'Build curiosity, problem-solving, logical reasoning, basic math and science skills, communication, teamwork, and a willingness to keep learning.',
            },
        ];
        questions.forEach(({ question, answer }) => {
            if (!question || !answer) return;
            const entry = document.createElement('article');
            const disclosure = document.createElement('details');
            const title = document.createElement('summary');
            const response = document.createElement('p');
            title.textContent = question;
            response.textContent = answer;
            disclosure.append(title, response);
            entry.append(disclosure);
            faqList.appendChild(entry);
        });
        footerFaq.append(faqHeading, faqList);
        copyright.before(footerFaq);
    }
    homeFaq?.remove();

    const addImage = (container, src, alt) => {
        if (!container || !src) return;
        const image = document.createElement('img');
        image.src = src;
        image.alt = alt;
        image.loading = 'lazy';
        container.replaceChildren(image);
    };

    const alignIntelPanelToPortrait = (carousel, panel) => {
        if (!carousel || !panel || panel.hidden) return;
        if (window.innerWidth <= 767) {
            carousel.style.removeProperty('--intel-frame-top');
            carousel.style.removeProperty('--intel-frame-height');
            return;
        }
        const frame = carousel.querySelector('.scpes-person-frame');
        if (!frame) return;
        const carouselBounds = carousel.getBoundingClientRect();
        const frameBounds = frame.getBoundingClientRect();
        carousel.style.setProperty('--intel-frame-top', `${frameBounds.top - carouselBounds.top}px`);
        carousel.style.setProperty('--intel-frame-height', `${frameBounds.height}px`);
    };

    const scheduleIntelPanelAlignment = (carousel, panel) => {
        const align = () => alignIntelPanelToPortrait(carousel, panel);
        window.requestAnimationFrame(align);
        if (!reduceMotion) window.setTimeout(align, 700);
    };

    const specializationImages = {
        'Embedded Systems': ['assets/embedded-systems-1.jpg', 'Embedded systems circuit board'],
        'Internet of Things': ['assets/IoT-1.jpg', 'Connected electronics for the Internet of Things'],
        'Computer Networks': ['assets/network-engineer.jpg', 'Network engineering connections representing computer networks'],
        Cybersecurity: ['assets/cybersecurity-engineer.jpg', 'Cybersecurity engineering and digital protection'],
        'Software Development': ['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=85', 'Code on a computer screen for software development'],
        'Artificial Intelligence and Machine Learning': ['https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=85', 'Artificial intelligence concept with digital brain graphics'],
        'Data Science and Data Engineering': ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85', 'Data charts on a computer screen for data science'],
        'Robotics and Automation': ['assets/robotics&automation.jpg', 'Robot used in robotics and automation'],
        'Computer Hardware and Architecture': ['assets/hardware-engineer.jpg', 'Computer hardware circuit board and processor'],
        'Cloud and Edge Computing': ['assets/cloud&edge-computing.jpg', 'Cloud computing network represented by connected lights'],
    };
    document.querySelectorAll('.specialization-card').forEach((card) => {
        const title = card.querySelector('h3')?.textContent.trim();
        const [src, alt] = specializationImages[title] || [];
        addImage(card.querySelector('.specialization-image'), src, alt);
    });

    const careerImages = {
        'Computer Engineer': ['assets/computer-engineering.jpg', 'Computer engineering hardware and systems'],
        'Embedded Systems Engineer': ['assets/embedded-systems-2.jpg', 'Embedded electronics and microcontroller board'],
        'IoT Engineer': ['assets/iot.jpeg', 'Connected device technology for an IoT role'],
        'Software Engineer': ['https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=85', 'Programming code for a software engineering role'],
        'Hardware Engineer': ['assets/hardware-engineer.jpg', 'Computer hardware components and tools'],
        'Network Engineer': ['assets/network-engineer.jpg', 'Digital network connections for a network engineering role'],
        'Systems Engineer': ['assets/SystemsEngineer.jpg', 'Server infrastructure for a systems engineering role'],
        'Cybersecurity Engineer': ['assets/cybersecurity-engineer-2.jpg', 'Digital security lock for a cybersecurity role'],
        'Data Engineer': ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=85', 'Data dashboard for a data engineering role'],
        'AI / Machine Learning Engineer': ['https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=85', 'Artificial intelligence technology for a machine learning role'],
        'Cloud Engineer': ['assets/cloud&edge-computing-2.jpg', 'Cloud infrastructure connections for a cloud engineering role'],
        'DevOps Engineer': ['assets/devOps-engineer.jpg', 'Technology infrastructure for a DevOps role'],
        'Robotics Engineer': ['assets/robotics-engineer.jpg', 'Robot for a robotics engineering role'],
        'Technical Support Engineer': ['https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=85', 'Technical team collaborating on a support solution'],
        'Research and Development Engineer': ['assets/research&dev-engr.jpg', 'Research team collaborating on a technology project'],
    };
    document.querySelectorAll('.career-item').forEach((item) => {
        const title = item.querySelector('.career-card h3')?.textContent.trim();
        const [src, alt] = careerImages[title] || [];
        addImage(item.querySelector('.career-image'), src, alt);
    });

    document.querySelectorAll('.major-areas-box .area-chips span').forEach((chip) => {
        chip.addEventListener('pointerenter', () => {
            chip.style.setProperty('background-color', '#ffffff', 'important');
            chip.style.setProperty('border-color', '#ffffff', 'important');
            chip.style.setProperty('color', '#10243a', 'important');
            chip.style.setProperty('transform', 'translateY(-4px)', 'important');
        });
        chip.addEventListener('pointerleave', () => {
            chip.style.removeProperty('background-color');
            chip.style.removeProperty('border-color');
            chip.style.removeProperty('color');
            chip.style.removeProperty('transform');
        });
    });

    const careerFeature = document.querySelector('.career-feature-image');
    if (careerFeature) {
        const featureImage = document.createElement('img');
        featureImage.src = 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85';
        featureImage.alt = 'Humanoid robot representing robotics and emerging engineering careers';
        featureImage.loading = 'lazy';
        featureImage.addEventListener('error', () => {
            featureImage.src = 'assets/computer-engineering.jpg';
        }, { once: true });
        careerFeature.replaceChildren(featureImage);
    }

    const makeEntryScreen = () => {
        const overlay = document.createElement('section');
        overlay.className = 'system-intro';
        overlay.id = 'systemEntry';
        overlay.setAttribute('aria-label', 'CPE system entry');
        overlay.innerHTML = `
            <div class="entry-grid" aria-hidden="true"></div>
            <div class="entry-orbit entry-orbit-one" aria-hidden="true"></div>
            <div class="entry-orbit entry-orbit-two" aria-hidden="true"></div>
            <div class="entry-rail entry-rail-left" aria-hidden="true"></div>
            <div class="entry-rail entry-rail-right" aria-hidden="true"></div>
            <div class="entry-corner entry-corner-tl" aria-hidden="true"></div>
            <div class="entry-corner entry-corner-tr" aria-hidden="true"></div>
            <div class="entry-corner entry-corner-bl" aria-hidden="true"></div>
            <div class="entry-corner entry-corner-br" aria-hidden="true"></div>
            <div class="entry-readout entry-readout-top">CPE // SYSTEM <span>UE MANILA</span></div>
            <div class="entry-readout entry-readout-bottom">LINK STATUS <span data-entry-status>INITIALIZING</span></div>
            <div class="entry-content">
                <p class="entry-kicker" data-entry-kicker>INITIALIZING CPE SYSTEM</p>
                <div class="entry-console" aria-live="polite">
                    <p data-entry-line>CONFIGURING NETWORKS <span>PROCESSING</span></p>
                    <p data-entry-line>ANALYZING DATA <span>PROCESSING</span></p>
                    <p data-entry-line>ESTABLISHING CONNECTION <span>PROCESSING</span></p>
                    <p data-entry-line>SYNCHRONIZING COMPONENTS <span>PROCESSING</span></p>
                    <p data-entry-line>LOADING ARCHITECTURE <span>PROCESSING</span></p>
                    <p data-entry-line>VERIFYING CORE PROTOCOLS <span>PROCESSING</span></p>
                </div>
                <div class="entry-progress" data-entry-progress>
                    <div class="entry-progress-heading"><span>SYSTEM CHECK</span><span data-entry-percent>00%</span></div>
                    <div class="entry-progress-track"><span data-entry-progress-bar></span></div>
                </div>
                <p class="entry-done" data-entry-done aria-live="polite">DONE</p>
                <h1 class="entry-title" data-entry-title>ARE YOU READY<br>TO EXPLORE THE CPEVERSE?</h1>
                <button class="system-intro-cta" type="button" data-enter-system>
                    ENTER THE SYSTEM <i class="bi bi-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
            <span class="entry-scanline" aria-hidden="true"></span>
        `;
        body.appendChild(overlay);
        body.classList.add('entry-active');

        const lines = overlay.querySelectorAll('[data-entry-line]');
        const enterButton = overlay.querySelector('[data-enter-system]');
        const status = overlay.querySelector('[data-entry-status]');
        const title = overlay.querySelector('[data-entry-title]');
        const progress = overlay.querySelector('[data-entry-progress-bar]');
        const percent = overlay.querySelector('[data-entry-percent]');
        const done = overlay.querySelector('[data-entry-done]');
        const systemCheck = overlay.querySelector('[data-entry-progress]');
        let entryTimers = [];

        const schedule = (callback, delay) => {
            const timer = window.setTimeout(callback, delay);
            entryTimers.push(timer);
            return timer;
        };

        const revealEntry = () => {
            lines.forEach((line, index) => {
                schedule(() => {
                    line.classList.add('is-active');
                    line.querySelector('span').textContent = 'COMPLETE';
                    const completion = Math.round(((index + 1) / lines.length) * 100);
                    progress.style.width = `${completion}%`;
                    percent.textContent = `${String(completion).padStart(2, '0')}%`;
                    status.textContent = `PROCESSING ${completion}%`;
                }, 260 + index * 390);
            });
            schedule(() => {
                progress.style.width = '100%';
                percent.textContent = '100%';
                status.textContent = 'SYSTEM CHECK COMPLETE';
                systemCheck.classList.add('is-complete');
            }, 2720);
            schedule(() => {
                done.classList.add('is-active');
                status.textContent = 'SYSTEM READY';
            }, 2920);
            schedule(() => {
                overlay.classList.add('is-question-transition');
            }, 3600);
            schedule(() => {
                status.textContent = 'SYSTEM READY';
                overlay.classList.add('is-stabilized');
                title.classList.add('is-active');
            }, 4100);
            schedule(() => {
                enterButton.classList.add('is-active');
                enterButton.focus({ preventScroll: true });
            }, 4720);
        };

        if (reduceMotion) {
            lines.forEach((line) => line.classList.add('is-active'));
            overlay.classList.add('is-stabilized');
            progress.style.width = '100%';
            percent.textContent = '100%';
            systemCheck.classList.add('is-complete');
            done.classList.add('is-active');
            title.classList.add('is-active');
            enterButton.classList.add('is-active');
            status.textContent = 'SYSTEM READY';
            lines.forEach((line) => line.querySelector('span').textContent = 'COMPLETE');
        } else {
            revealEntry();
        }

        enterButton.addEventListener('click', () => {
            if (enterButton.disabled) return;
            enterButton.disabled = true;
            entryTimers.forEach(window.clearTimeout);
            status.textContent = 'CONNECTION ESTABLISHED';
            overlay.classList.add('is-entering');
            body.classList.add('module-transition-active');
            transition.classList.add('is-active');

            const steps = transition.querySelectorAll('[data-transition-step]');
            const progressBar = transition.querySelector('[data-transition-bar]');
            const percent = transition.querySelector('[data-transition-percent]');
            const transitionDone = transition.querySelector('[data-transition-done]');
            const transitionDuration = reduceMotion ? 900 : 1650;
            const stepInterval = transitionDuration / steps.length;

            steps.forEach((step, index) => {
                window.setTimeout(() => {
                    step.classList.add('is-active');
                    step.querySelector('span').textContent = 'COMPLETE';
                    const value = Math.round(((index + 1) / steps.length) * 100);
                    percent.textContent = `${String(value).padStart(2, '0')}%`;
                    progressBar.style.width = `${value}%`;
                }, Math.round(index * stepInterval));
            });

            window.setTimeout(() => {
                transitionDone.classList.add('is-active');
                window.setTimeout(() => {
                    overlay.remove();
                    body.classList.remove('entry-active', 'entry-pending', 'module-transition-active');
                    transition.classList.remove('is-active');
                }, reduceMotion ? 0 : 280);
            }, transitionDuration);
        });
    };

    if (pageName === 'index.html') makeEntryScreen();

    const transition = document.createElement('div');
    transition.className = 'system-transition';
    transition.setAttribute('aria-hidden', 'true');
    transition.innerHTML = `
        <div class="transition-grid" aria-hidden="true"></div>
        <div class="transition-scan"></div>
        <div class="transition-panel" aria-live="polite">
            <p class="transition-kicker">CPE // SYSTEM</p>
            <div class="transition-steps">
                <p data-transition-step>CONNECTING TO MODULE <span>PROCESSING...</span></p>
                <p data-transition-step>PROCESSING REQUEST <span>PROCESSING...</span></p>
                <p data-transition-step>LOADING SYSTEM ARCHITECTURE <span>PROCESSING...</span></p>
                <p data-transition-step>SYNCHRONIZING COMPONENTS <span>PROCESSING...</span></p>
                <p data-transition-step>VERIFYING MODULE <span>PROCESSING...</span></p>
            </div>
            <div class="transition-progress">
                <div class="transition-progress-label"><span>SYSTEM PROCESS</span><span data-transition-percent>00%</span></div>
                <div class="transition-progress-track"><span data-transition-bar></span></div>
            </div>
            <p class="transition-done" data-transition-done>DONE</p>
        </div>
        <div class="transition-line transition-line-one"></div>
        <div class="transition-line transition-line-two"></div>
    `;
    body.appendChild(transition);

    const activatePressedControl = (event) => {
        const control = event.target.closest('button, a[href], [role="button"]');
        if (!control || control.matches(':disabled') || control.closest('.system-transition')) return;
        control.classList.remove('system-activated');
        void control.offsetWidth;
        control.classList.add('system-activated');
        window.setTimeout(() => control.classList.remove('system-activated'), 520);
    };

    document.addEventListener('pointerdown', activatePressedControl, { passive: true });
    document.addEventListener('click', activatePressedControl);

    let navigationInProgress = false;

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (link.target === '_blank' || link.hasAttribute('download')) return;

        const targetUrl = new URL(link.href, window.location.href);
        const isInternalPage = targetUrl.origin === window.location.origin && targetUrl.pathname.endsWith('.html') && targetUrl.pathname !== window.location.pathname;
        if (!isInternalPage) return;

        event.preventDefault();
        if (navigationInProgress) return;
        navigationInProgress = true;
        body.classList.add('module-transition-active');
        transition.classList.add('is-active');
        const steps = transition.querySelectorAll('[data-transition-step]');
        const progressBar = transition.querySelector('[data-transition-bar]');
        const percent = transition.querySelector('[data-transition-percent]');
        const done = transition.querySelector('[data-transition-done]');
        const transitionDuration = reduceMotion ? 900 : 1650;
        const stepInterval = transitionDuration / steps.length;

        steps.forEach((step, index) => {
            window.setTimeout(() => {
                step.classList.add('is-active');
                step.querySelector('span').textContent = 'COMPLETE';
                const value = Math.round(((index + 1) / steps.length) * 100);
                percent.textContent = `${String(value).padStart(2, '0')}%`;
                progressBar.style.width = `${value}%`;
            }, Math.round(index * stepInterval));
        });
        window.setTimeout(() => {
            done.classList.add('is-active');
            window.setTimeout(() => window.location.assign(targetUrl.href), reduceMotion ? 0 : 240);
        }, transitionDuration);
    });

    const revealTargets = document.querySelectorAll('.section-shell, .page-hero, .about-feature, .experience-card, .facility-card, .project-card, .career-card, .specialization-card, .faculty-card, .officer-card, .objective-list li');
    if (!reduceMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        revealTargets.forEach((element) => {
            element.classList.add('reveal-item');
            if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
                element.classList.add('is-visible');
            } else {
                observer.observe(element);
            }
        });
    } else {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
    }

    const activateVisibleReveals = () => {
        revealTargets.forEach((element) => {
            if (element.classList.contains('is-visible')) return;
            const bounds = element.getBoundingClientRect();
            if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
                element.classList.add('is-visible');
            }
        });
    };

    window.addEventListener('scroll', activateVisibleReveals, { passive: true });
    window.addEventListener('resize', activateVisibleReveals, { passive: true });
    activateVisibleReveals();

    const systemVideo = document.querySelector('[data-system-video]');
    if (systemVideo) {
        const videoStatus = document.querySelector('[data-system-video-status]');
        const startSystemVideo = () => {
            if (systemVideo.dataset.loaded === 'true') return;
            systemVideo.dataset.loaded = 'true';
            const source = document.createElement('source');
            source.src = systemVideo.dataset.videoSrc;
            source.type = 'video/mp4';
            systemVideo.appendChild(source);
            systemVideo.autoplay = true;
            systemVideo.loop = true;
            systemVideo.addEventListener('error', () => {
                if (systemVideo.dataset.triedMov !== 'true' && systemVideo.dataset.videoFallbackSrc) {
                    systemVideo.dataset.triedMov = 'true';
                    source.src = systemVideo.dataset.videoFallbackSrc;
                    source.type = 'video/quicktime';
                    systemVideo.load();
                    systemVideo.play().catch(() => {
                        systemVideo.controls = true;
                        if (videoStatus) videoStatus.hidden = false;
                    });
                    return;
                }
                systemVideo.controls = true;
                if (videoStatus) videoStatus.hidden = false;
            });
            systemVideo.load();
            systemVideo.muted = true;
            systemVideo.autoplay = true;
            systemVideo.loop = true;
            systemVideo.playsInline = true;
            systemVideo.play().catch(() => {
                systemVideo.controls = true;
                if (videoStatus) videoStatus.hidden = false;
            });
        };

        startSystemVideo();
    }

    const topButton = document.createElement('button');
    topButton.type = 'button';
    topButton.className = 'scroll-top-btn';
    topButton.setAttribute('aria-label', 'Scroll to top');
    topButton.innerHTML = '<i class="bi bi-arrow-up" aria-hidden="true"></i>';
    body.appendChild(topButton);
    const updateTopButton = () => {
        const profilePanel = document.querySelector('.scpes-profile-panel');
        const profileBounds = profilePanel?.getBoundingClientRect();
        const buttonBounds = topButton.getBoundingClientRect();
        const floatingControlWouldOverlap = profileBounds
            && profileBounds.bottom > buttonBounds.top
            && profileBounds.top < buttonBounds.bottom
            && profileBounds.right > buttonBounds.left
            && profileBounds.left < buttonBounds.right;
        topButton.classList.toggle('visible', window.scrollY > 400 && !floatingControlWouldOverlap);
    };
    updateTopButton();
    window.addEventListener('scroll', updateTopButton, { passive: true });
    window.addEventListener('resize', updateTopButton, { passive: true });
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' }));

    const canvas = document.getElementById('systemParticles') || (() => {
        const element = document.createElement('canvas');
        element.id = 'systemParticles';
        element.setAttribute('aria-hidden', 'true');
        body.insertBefore(element, body.firstChild);
        return element;
    })();

    if (canvas && !reduceMotion) {
        const context = canvas.getContext('2d');
        const particles = [];
        let width = 0;
        let height = 0;
        let frame = 0;
        let ambientFrame = 0;
        let ambientTime = 0;
        let floatingSticks = [];
        const render = () => {
            if (!context) return;
            context.clearRect(0, 0, width, height);
            floatingSticks.forEach((stick) => {
                const x = stick.x + Math.sin(ambientTime * stick.speed + stick.phase) * 9;
                const y = (stick.y + ambientTime * stick.speed * 5) % height;
                context.save();
                context.translate(x, y);
                context.rotate(stick.angle);
                context.beginPath();
                context.moveTo(-stick.length / 2, 0);
                context.lineTo(stick.length / 2, 0);
                context.strokeStyle = `rgba(40, 118, 207, ${stick.opacity})`;
                context.lineWidth = 1;
                context.stroke();
                context.restore();
            });
            particles.forEach((particle, index) => {
                const x = particle.x + particle.offsetX + Math.sin(ambientTime + particle.phase) * 3;
                const y = particle.y + particle.offsetY + Math.cos(ambientTime + particle.phase) * 3;
                context.beginPath();
                context.arc(x, y, 1.45, 0, Math.PI * 2);
                context.fillStyle = 'rgba(40, 118, 207, 0.62)';
                context.fill();
                for (let next = index + 1; next < particles.length; next += 1) {
                    const other = particles[next];
                    const otherX = other.x + other.offsetX + Math.sin(ambientTime + other.phase) * 3;
                    const otherY = other.y + other.offsetY + Math.cos(ambientTime + other.phase) * 3;
                    const distance = Math.hypot(x - otherX, y - otherY);
                    if (distance < 112) {
                        context.beginPath();
                        context.moveTo(x, y);
                        context.lineTo(otherX, otherY);
                        context.strokeStyle = `rgba(40, 118, 207, ${0.07 + (1 - distance / 112) * 0.12})`;
                        context.stroke();
                    }
                }
            });
        };

        const animateAmbientLinks = () => {
            if (reduceMotion) {
                ambientFrame = 0;
                return;
            }
            ambientTime += 0.008;
            render();
            ambientFrame = window.requestAnimationFrame(animateAmbientLinks);
        };

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, window.innerWidth || document.documentElement.clientWidth);
            height = Math.max(1, window.innerHeight || document.documentElement.clientHeight);
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            const count = Math.min(36, Math.max(20, Math.floor(width / 40)));
            particles.length = 0;
            for (let index = 0; index < count; index += 1) {
                particles.push({ x: Math.random() * width, y: Math.random() * height, offsetX: 0, offsetY: 0, targetX: 0, targetY: 0, phase: Math.random() * Math.PI * 2 });
            }
            const stickCount = Math.min(40, Math.max(18, Math.round(width / 36)));
            const columnWidth = width / stickCount;
            floatingSticks = Array.from({ length: stickCount }, (_, index) => ({
                x: (index + 0.5) * columnWidth + (Math.random() - 0.5) * columnWidth * 0.5,
                y: Math.random() * height,
                length: 12,
                angle: -0.18 + Math.random() * 0.36,
                phase: Math.random() * Math.PI * 2,
                speed: 0.42 + Math.random() * 0.24,
                opacity: 0.16,
            }));
            render();
        };

        const settle = () => {
            frame = 0;
            let moving = false;
            particles.forEach((particle) => {
                particle.offsetX += (particle.targetX - particle.offsetX) * 0.16;
                particle.offsetY += (particle.targetY - particle.offsetY) * 0.16;
                if (Math.abs(particle.targetX - particle.offsetX) > 0.15 || Math.abs(particle.targetY - particle.offsetY) > 0.15) moving = true;
            });
            render();
            if (moving) frame = window.requestAnimationFrame(settle);
        };

        const react = (event) => {
            let nearby = false;
            particles.forEach((particle) => {
                const dx = particle.x - event.clientX;
                const dy = particle.y - event.clientY;
                const distance = Math.hypot(dx, dy);
                if (distance < 135) {
                    const strength = (135 - distance) / 135;
                    const direction = distance || 1;
                    particle.targetX = (dx / direction) * strength * 9;
                    particle.targetY = (dy / direction) * strength * 9;
                    nearby = true;
                } else {
                    particle.targetX = 0;
                    particle.targetY = 0;
                }
            });
            if (nearby || particles.some((particle) => Math.abs(particle.offsetX) > 0.2 || Math.abs(particle.offsetY) > 0.2)) {
                if (!frame) frame = window.requestAnimationFrame(settle);
            }
        };

        window.addEventListener('pointermove', react, { passive: true });
        window.addEventListener('pointerleave', () => {
            particles.forEach((particle) => {
                particle.targetX = 0;
                particle.targetY = 0;
            });
            if (particles.some((particle) => Math.abs(particle.offsetX) > 0.2 || Math.abs(particle.offsetY) > 0.2) && !frame) {
                frame = window.requestAnimationFrame(settle);
            }
        }, { passive: true });
        window.addEventListener('resize', resize, { passive: true });
        resize();
        window.requestAnimationFrame(resize);
        window.addEventListener('load', resize, { once: true });
        animateAmbientLinks();
    }

    const actionScreen = document.querySelector('[data-action-screen]');
    if (actionScreen) {
        const reveals = actionScreen.querySelectorAll('[data-action-reveal]');
        if (reduceMotion) {
            reveals.forEach((element) => element.classList.add('is-active'));
        } else {
            reveals.forEach((element, index) => {
                window.setTimeout(() => element.classList.add('is-active'), 500 + index * 680);
            });
        }
    }

    document.querySelectorAll('[data-career-filter]').forEach((filter) => {
        filter.setAttribute('aria-pressed', filter.classList.contains('active') ? 'true' : 'false');
        filter.addEventListener('click', () => {
            const selectedGroup = filter.dataset.careerFilter;
            document.querySelectorAll('[data-career-filter]').forEach((button) => {
                const isSelected = button === filter;
                button.classList.toggle('active', isSelected);
                button.setAttribute('aria-pressed', String(isSelected));
            });
            document.querySelectorAll('.career-item').forEach((item) => {
                item.hidden = selectedGroup !== 'all' && item.dataset.careerGroup !== selectedGroup;
            });
        });
    });

    const officerGrid = document.querySelector('.scpes-directory .officer-grid');
    if (officerGrid) {
        const officers = Array.from(officerGrid.querySelectorAll('.officer-card')).map((card) => ({
            name: card.querySelector('h3')?.textContent.trim() || '',
            position: [card.querySelector('.faculty-rank')?.textContent.trim(), card.querySelector('.faculty-tag')?.textContent.trim()].filter(Boolean).join(' / '),
            image: card.querySelector('.faculty-image img')?.getAttribute('src') || '',
            imageAlt: card.querySelector('.faculty-image img')?.getAttribute('alt') || 'SCPES member portrait',
        }));

        if (officers.length > 0) {
            const carousel = document.createElement('section');
            carousel.className = 'scpes-hologram';
            carousel.setAttribute('aria-label', 'SCPES personnel profiles');
            carousel.innerHTML = `
                <div class="scpes-person-visual" aria-live="polite">
                    <div class="scpes-frame-heading"><span>PERSONNEL DATABASE</span><span data-person-index></span></div>
                    <div class="scpes-person-frame">
                        <img data-person-image alt="">
                        <span class="scpes-frame-placeholder">SCPES // MEMBER RECORD</span>
                        <span class="scpes-scan" aria-hidden="true"></span>
                    </div>
                    <h3 class="scpes-person-name" data-person-name></h3>
                    <button type="button" class="faculty-intel-button scpes-intel-button" data-select-profile aria-expanded="false" aria-label="View selected SCPES member intel">VIEW INTEL</button>
                    <div class="scpes-profile-controls" data-carousel-controls>
                        <button type="button" class="scpes-control" data-profile-previous aria-label="Previous SCPES member"><i class="bi bi-arrow-left"></i><span>Previous</span></button>
                        <div class="scpes-progress" role="group" aria-label="Select SCPES member" data-profile-progress></div>
                        <button type="button" class="scpes-control" data-profile-next aria-label="Next SCPES member"><span>Next</span><i class="bi bi-arrow-right"></i></button>
                    </div>
                </div>
                <article class="scpes-profile-panel" aria-live="polite" aria-atomic="true" hidden>
                    <div class="scpes-profile-topline"><span>PERSONNEL PROFILE</span><span data-profile-index></span></div>
                    <div class="scpes-profile-field"><span>Name</span><h3 data-profile-name></h3></div>
                    <div class="scpes-profile-field"><span>Position</span><p data-profile-position></p></div>
                    <div class="scpes-profile-field"><span>Year</span><p data-profile-year></p></div>
                    <div class="scpes-profile-status"><span class="scpes-status-dot"></span> Status: Active</div>
                </article>
            `;
            officerGrid.replaceWith(carousel);

            const name = carousel.querySelector('[data-profile-name]');
            const position = carousel.querySelector('[data-profile-position]');
            const year = carousel.querySelector('[data-profile-year]');
            const counter = carousel.querySelector('[data-profile-index]');
            const imageCounter = carousel.querySelector('[data-person-index]');
            const imageName = carousel.querySelector('[data-person-name]');
            const personImage = carousel.querySelector('[data-person-image]');
            const framePlaceholder = carousel.querySelector('.scpes-frame-placeholder');
            const profilePanel = carousel.querySelector('.scpes-profile-panel');
            const progress = carousel.querySelector('[data-profile-progress]');
            const yearByName = {
                'Jessica Apostol': '2nd Year',
                'Jian Cruz': '2nd Year',
                'Joe Cornita': '4th Year',
            };
            let activeOfficer = 0;
            let updateTimeout;

            const progressButtons = officers.map((officer, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'scpes-progress-segment';
                button.setAttribute('aria-label', `Show ${officer.name}`);
                button.addEventListener('click', () => showOfficer(index));
                progress.appendChild(button);
                return button;
            });

            const updateProfile = (index) => {
                const officer = officers[index];
                const current = String(index + 1).padStart(2, '0');
                const total = String(officers.length).padStart(2, '0');
                imageName.textContent = officer.name;
                name.textContent = officer.name;
                position.textContent = officer.position;
                year.textContent = yearByName[officer.name] || '3rd Year';
                personImage.alt = officer.imageAlt;
                if (officer.image) {
                    personImage.src = officer.image;
                    personImage.hidden = false;
                    framePlaceholder.hidden = true;
                } else {
                    personImage.removeAttribute('src');
                    personImage.hidden = true;
                    framePlaceholder.hidden = false;
                }
                counter.textContent = `${current} / ${total}`;
                imageCounter.textContent = `RECORD ${current} / ${total}`;
                progressButtons.forEach((button, buttonIndex) => {
                    button.classList.toggle('is-active', buttonIndex === index);
                    button.setAttribute('aria-current', buttonIndex === index ? 'true' : 'false');
                });
                carousel.classList.remove('is-changing');
                carousel.classList.add('is-entering');
                window.setTimeout(() => carousel.classList.remove('is-entering'), reduceMotion ? 0 : 640);
                scheduleIntelPanelAlignment(carousel, profilePanel);
            };

            const showOfficer = (index, revealProfile = true) => {
                const nextIndex = (index + officers.length) % officers.length;
                if (nextIndex === activeOfficer && carousel.dataset.initialized === 'true') {
                    if (revealProfile) {
                        profilePanel.hidden = false;
                        carousel.classList.remove('is-unselected');
                        carousel.classList.add('is-profile-open');
                        carousel.classList.add('is-entering');
                        scheduleIntelPanelAlignment(carousel, profilePanel);
                        const intelButton = carousel.querySelector('[data-select-profile]');
                        intelButton.textContent = 'HIDE INTEL';
                        intelButton.setAttribute('aria-expanded', 'true');
                        window.setTimeout(() => carousel.classList.remove('is-entering'), reduceMotion ? 0 : 640);
                    }
                    return;
                }
                window.clearTimeout(updateTimeout);
                carousel.classList.add('is-changing');
                updateTimeout = window.setTimeout(() => {
                    activeOfficer = nextIndex;
                    updateProfile(activeOfficer);
                    if (revealProfile) {
                        profilePanel.hidden = false;
                        carousel.classList.remove('is-unselected');
                        carousel.classList.add('is-profile-open');
                        carousel.querySelector('[data-select-profile]').textContent = 'HIDE INTEL';
                        carousel.querySelector('[data-select-profile]').setAttribute('aria-expanded', 'true');
                        scheduleIntelPanelAlignment(carousel, profilePanel);
                        carousel.querySelector('[data-select-profile]').textContent = 'HIDE INTEL';
                        carousel.querySelector('[data-select-profile]').setAttribute('aria-expanded', 'true');
                    }
                    carousel.dataset.initialized = 'true';
                }, reduceMotion ? 0 : 260);
            };

            carousel.classList.add('is-unselected');
            carousel.querySelector('[data-select-profile]').addEventListener('click', (event) => {
                if (profilePanel.hidden) {
                    showOfficer(activeOfficer, true);
                    return;
                }
                profilePanel.hidden = true;
                carousel.classList.remove('is-profile-open');
                carousel.classList.add('is-unselected');
                event.currentTarget.textContent = 'VIEW INTEL';
                event.currentTarget.setAttribute('aria-expanded', 'false');
            });
            carousel.querySelector('[data-profile-previous]').addEventListener('click', () => showOfficer(activeOfficer - 1, true));
            carousel.querySelector('[data-profile-next]').addEventListener('click', () => showOfficer(activeOfficer + 1, true));
            window.addEventListener('resize', () => alignIntelPanelToPortrait(carousel, profilePanel), { passive: true });
            updateProfile(activeOfficer);
            carousel.dataset.initialized = 'true';
        }
    }

    const facultyGrid = document.querySelector('.faculty-grid');
    if (facultyGrid) {
        const faculty = Array.from(facultyGrid.querySelectorAll('.faculty-card')).map((card) => ({
            name: card.querySelector('h3')?.textContent.trim() || '',
            position: card.querySelector('.faculty-position')?.textContent.trim() || '',
            image: card.querySelector('.faculty-image img')?.getAttribute('src') || '',
            imageAlt: card.querySelector('.faculty-image img')?.getAttribute('alt') || 'Portrait not provided',
        }));

        if (faculty.length) {
            const carousel = document.createElement('section');
            carousel.className = 'scpes-hologram faculty-hologram is-unselected';
            carousel.setAttribute('aria-label', 'Faculty profiles');
            carousel.innerHTML = `
                <div class="scpes-person-visual" aria-live="polite">
                    <div class="scpes-person-frame">
                        <span class="scpes-frame-label">FACULTY DIRECTORY</span>
                        <span class="scpes-frame-index" data-faculty-index></span>
                        <div class="scpes-photo-select faculty-photo-media" data-faculty-photo>
                            <img data-faculty-image alt="${faculty[0].imageAlt}"${faculty[0].image ? ` src="${faculty[0].image}"` : ' hidden'}>
                            <span class="faculty-photo-fallback" data-faculty-fallback${faculty[0].image ? ' hidden' : ''}>PORTRAIT NOT PROVIDED</span>
                        </div>
                        <span class="scpes-scan" aria-hidden="true"></span>
                    </div>
                    <h3 class="scpes-person-name" data-faculty-name></h3>
                    <button type="button" class="faculty-intel-button scpes-intel-button" data-view-faculty aria-expanded="false">VIEW INTEL</button>
                    <div class="scpes-profile-controls" data-faculty-controls>
                        <button type="button" class="scpes-control" data-faculty-previous aria-label="Previous faculty member"><i class="bi bi-arrow-left"></i><span>Previous</span></button>
                        <div class="scpes-progress" role="group" aria-label="Select faculty member" data-faculty-progress></div>
                        <button type="button" class="scpes-control" data-faculty-next aria-label="Next faculty member"><span>Next</span><i class="bi bi-arrow-right"></i></button>
                    </div>
                </div>
                <article class="scpes-profile-panel faculty-profile-panel" aria-live="polite" aria-atomic="true" hidden>
                    <div class="scpes-profile-topline"><span>FACULTY PROFILE</span><span data-faculty-record></span></div>
                    <div class="scpes-profile-field"><span>Name</span><h3 data-faculty-profile-name></h3></div>
                    <div class="scpes-profile-field"><span>Position</span><p data-faculty-position></p></div>
                    <div class="scpes-profile-field"><span>Status</span><p data-faculty-status></p></div>
                </article>
            `;
            facultyGrid.replaceWith(carousel);

            const portrait = carousel.querySelector('[data-faculty-image]');
            const fallback = carousel.querySelector('[data-faculty-fallback]');
            const selectedName = carousel.querySelector('[data-faculty-name]');
            const profilePanel = carousel.querySelector('.faculty-profile-panel');
            const profileName = carousel.querySelector('[data-faculty-profile-name]');
            const profilePosition = carousel.querySelector('[data-faculty-position]');
            const profileStatus = carousel.querySelector('[data-faculty-status]');
            const profileRecord = carousel.querySelector('[data-faculty-record]');
            const viewButton = carousel.querySelector('[data-view-faculty]');
            const progress = carousel.querySelector('[data-faculty-progress]');
            let activeFaculty = 0;
            let facultyUpdateTimer = 0;

            const progressButtons = faculty.map((member, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'scpes-progress-segment';
                button.setAttribute('aria-label', `Show ${member.name}`);
                button.addEventListener('click', () => showFaculty(index));
                progress.appendChild(button);
                return button;
            });

            const updateFaculty = (index) => {
                const member = faculty[index];
                const record = `${String(index + 1).padStart(2, '0')} / ${String(faculty.length).padStart(2, '0')}`;
                selectedName.textContent = member.name;
                profileName.textContent = member.name;
                profilePosition.textContent = member.position;
                profileStatus.textContent = member.name === 'Engr. Joshua Fajardo' ? 'Inactive' : 'Active';
                profileRecord.textContent = record;
                carousel.querySelector('[data-faculty-index]').textContent = `RECORD ${String(index + 1).padStart(2, '0')} / ${String(faculty.length).padStart(2, '0')}`;
                portrait.alt = member.imageAlt;
                if (member.image) {
                    portrait.src = member.image;
                    portrait.hidden = false;
                    fallback.hidden = true;
                } else {
                    portrait.removeAttribute('src');
                    portrait.hidden = true;
                    fallback.hidden = false;
                }
                viewButton.setAttribute('aria-label', `View intel for ${member.name}`);
                progressButtons.forEach((button, buttonIndex) => {
                    button.classList.toggle('is-active', buttonIndex === index);
                    button.setAttribute('aria-current', buttonIndex === index ? 'true' : 'false');
                });
                carousel.classList.remove('is-changing');
                carousel.classList.add('is-entering');
                window.setTimeout(() => carousel.classList.remove('is-entering'), reduceMotion ? 0 : 640);
                scheduleIntelPanelAlignment(carousel, profilePanel);
            };

            const showFaculty = (index) => {
                window.clearTimeout(facultyUpdateTimer);
                carousel.classList.add('is-changing');
                facultyUpdateTimer = window.setTimeout(() => {
                    activeFaculty = (index + faculty.length) % faculty.length;
                    updateFaculty(activeFaculty);
                }, reduceMotion ? 0 : 260);
            };

            const toggleFacultyIntel = () => {
                if (profilePanel.hidden) {
                    profilePanel.hidden = false;
                    carousel.classList.remove('is-unselected');
                    carousel.classList.add('is-profile-open');
                    viewButton.textContent = 'HIDE INTEL';
                    viewButton.setAttribute('aria-expanded', 'true');
                    viewButton.setAttribute('aria-label', `Hide intel for ${faculty[activeFaculty].name}`);
                    scheduleIntelPanelAlignment(carousel, profilePanel);
                } else {
                    profilePanel.hidden = true;
                    carousel.classList.remove('is-profile-open');
                    carousel.classList.add('is-unselected');
                    viewButton.textContent = 'VIEW INTEL';
                    viewButton.setAttribute('aria-expanded', 'false');
                    viewButton.setAttribute('aria-label', `View intel for ${faculty[activeFaculty].name}`);
                }
                carousel.classList.add('is-entering');
                window.setTimeout(() => carousel.classList.remove('is-entering'), reduceMotion ? 0 : 640);
            };

            viewButton.addEventListener('click', toggleFacultyIntel);
            carousel.querySelector('[data-faculty-previous]').addEventListener('click', () => showFaculty(activeFaculty - 1));
            carousel.querySelector('[data-faculty-next]').addEventListener('click', () => showFaculty(activeFaculty + 1));
            window.addEventListener('resize', () => alignIntelPanelToPortrait(carousel, profilePanel), { passive: true });
            updateFaculty(activeFaculty);
        }
    }
});
