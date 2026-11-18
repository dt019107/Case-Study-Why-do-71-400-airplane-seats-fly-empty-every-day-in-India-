/**
 * =========================================================================
 * AeroFill Motion Engine (motion.js)
 * Modular, performance-safe motion layer adhering strictly to:
 * - Only transform and opacity animations (plus SVG stroke-dashoffset)
 * - Zero layout shifts (no width/height/top/left animations)
 * - Single motion token set: 150/250/400/800ms, cubic-bezier(0.22, 1, 0.36, 1)
 * - Spring/overshoot restricted to BLOCKED stamp and badges
 * - Pause looping animations when off-screen or tab hidden
 * - Complete prefers-reduced-motion overrides & manual navbar toggle
 * - Pure vanilla JavaScript (No heavy runtime libraries, < 25KB gzipped)
 * =========================================================================
 */

(function () {
    'use strict';

    // Global Motion Configuration
    window.AeroFillMotionConfig = {
        reducedMotion: false,
        flightPath: true,
        sectionReveal: true,
        cardLiftSpotlight: true,
        magneticCta: true,
        heroStory: true,
        heroSeatGrid: true,
        statCountUp: true,
        chartsMotion: true,
        perishableTimers: true,
        cannibalizationMotion: true,
        guardrailVisuals: true,
        guardrailRunAll: true,
        sandboxStamp: true,
        sanjeevaniMotion: true,
        flightSchoolMotion: true,
        cabinWave: true,
        cfoCalculatorMotion: true,
        pitchClosingLanding: true,
    };

    const cfg = window.AeroFillMotionConfig;

    // Check System or LocalStorage Reduced Motion Preference
    function isReducedMotionActive() {
        if (cfg.reducedMotion) return true;
        const savedPref = localStorage.getItem('aerofill_reduced_motion');
        if (savedPref !== null) {
            return savedPref === 'true';
        }
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Shared requestAnimationFrame Number Count-Up Helper (Item 6)
    window.countUp = function (el, from, to, duration = 800, format = 'integer', prefix = '', suffix = '') {
        if (!el) return;
        const startVal = parseFloat(from) || 0;
        const endVal = parseFloat(to) || 0;

        if (isReducedMotionActive() || duration <= 0) {
            formatAndSet(el, endVal, format, prefix, suffix);
            return;
        }

        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing: cubic-bezier(0.22, 1, 0.36, 1)
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = startVal + (endVal - startVal) * ease;

            formatAndSet(el, current, format, prefix, suffix);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                formatAndSet(el, endVal, format, prefix, suffix);
            }
        }

        requestAnimationFrame(step);
    };

    function formatAndSet(el, val, format, prefix = '', suffix = '') {
        let formatted = '';
        if (format === 'comma') {
            formatted = Math.round(val).toLocaleString('en-IN');
        } else if (format === 'decimal') {
            formatted = val.toFixed(2);
        } else {
            formatted = Math.round(val).toString();
        }
        el.innerText = `${prefix}${formatted}${suffix}`;
        if (!el.classList.contains('tabular-nums')) {
            el.classList.add('tabular-nums');
        }
    }

    // =========================================================================
    // 1. SCROLL-LINKED FLIGHT PATH & JET AIRLINER TRACKER (Item 1 & 24)
    // =========================================================================
    function initFlightPath() {
        if (!cfg.flightPath) return;

        // Create container if not exists
        let tracker = document.getElementById('flightPathMarginTracker');
        if (!tracker) {
            tracker = document.createElement('div');
            tracker.id = 'flightPathMarginTracker';
            tracker.setAttribute('aria-hidden', 'true');
            tracker.innerHTML = `
                <svg width="48" height="100%" viewBox="0 0 48 600" preserveAspectRatio="none" class="w-full h-full overflow-visible">
                    <path id="flightTrackPathDotted" class="flight-track-path" d="M24 0 L24 600" />
                    <path id="flightTrackPathFill" class="flight-track-fill" d="M24 0 L24 600" stroke-dasharray="600" stroke-dashoffset="600" />
                </svg>
                <div id="flightTrackerPlane" class="flight-tracker-plane" title="AeroFill Flight Tracker">
                    <svg viewBox="0 0 120 120" width="44" height="44" fill="none" class="overflow-visible" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="planeDropShadow" x="-25%" y="-25%" width="150%" height="150%">
                          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="rgba(0,0,0,0.22)" />
                        </filter>
                        <linearGradient id="planeFuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stop-color="#E2E8F0" />
                          <stop offset="30%" stop-color="#FFFFFF" />
                          <stop offset="70%" stop-color="#FFFFFF" />
                          <stop offset="100%" stop-color="#CBD5E1" />
                        </linearGradient>
                        <linearGradient id="planeWingGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#FFFFFF" />
                          <stop offset="100%" stop-color="#E2E8F0" />
                        </linearGradient>
                        <linearGradient id="planeWingGradR" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stop-color="#FFFFFF" />
                          <stop offset="100%" stop-color="#E2E8F0" />
                        </linearGradient>
                        <linearGradient id="planeBlueAccent" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stop-color="#0284C7" />
                          <stop offset="100%" stop-color="#0369A1" />
                        </linearGradient>
                      </defs>

                      <g filter="url(#planeDropShadow)">
                        <!-- Horizontal Stabilizers -->
                        <path d="M60 100 L42 112 L42 115 L58 106 L62 106 L78 115 L78 112 Z" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="0.6" />
                        
                        <!-- Left Wing -->
                        <path d="M54 52 L12 80 L10 83 L10 86 L15 85 L54 68 Z" fill="url(#planeWingGradL)" stroke="#CBD5E1" stroke-width="0.6" />
                        <path d="M10 79 L10 86 L12 86 L12 79 Z" fill="#0284C7" />
                        <rect x="24" y="80" width="1.5" height="5" rx="0.7" fill="#CBD5E1" />
                        <rect x="33" y="76" width="1.5" height="5" rx="0.7" fill="#CBD5E1" />
                        <rect x="42" y="72" width="1.5" height="5" rx="0.7" fill="#CBD5E1" />

                        <!-- Right Wing -->
                        <path d="M66 52 L108 80 L110 83 L110 86 L105 85 L66 68 Z" fill="url(#planeWingGradR)" stroke="#CBD5E1" stroke-width="0.6" />
                        <path d="M108 79 L108 86 L110 86 L110 79 Z" fill="#0284C7" />
                        <rect x="94" y="80" width="1.5" height="5" rx="0.7" fill="#CBD5E1" />
                        <rect x="85" y="76" width="1.5" height="5" rx="0.7" fill="#CBD5E1" />
                        <rect x="76" y="72" width="1.5" height="5" rx="0.7" fill="#CBD5E1" />

                        <!-- Twin Jet Turbofan Engines -->
                        <rect x="35" y="58" width="6.5" height="15" rx="3" fill="url(#planeBlueAccent)" stroke="#0284C7" stroke-width="0.5" />
                        <ellipse cx="38.25" cy="58" rx="3" ry="1.5" fill="#64748B" />
                        <ellipse cx="38.25" cy="58" rx="1.2" ry="0.6" fill="#0F172A" />

                        <rect x="78.5" y="58" width="6.5" height="15" rx="3" fill="url(#planeBlueAccent)" stroke="#0284C7" stroke-width="0.5" />
                        <ellipse cx="81.75" cy="58" rx="3" ry="1.5" fill="#64748B" />
                        <ellipse cx="81.75" cy="58" rx="1.2" ry="0.6" fill="#0F172A" />

                        <!-- Fuselage Cylinder Body -->
                        <path d="M60 8 C56 12 53 22 53 38 L53 96 C53 104 57 112 60 115 C63 112 67 104 67 96 L67 38 C67 22 64 12 60 8 Z" fill="url(#planeFuselageGrad)" stroke="#CBD5E1" stroke-width="0.6" />

                        <!-- Blue Radome Nose & Cockpit Crown -->
                        <path d="M60 8 C57 11 54 18 54 28 C56 29 64 29 66 28 C66 18 63 11 60 8 Z" fill="url(#planeBlueAccent)" />
                        
                        <!-- Cockpit Glass Windshield -->
                        <path d="M57 24 C58 23 59 23 60 23 C61 23 62 23 63 24 L63.5 25.5 C62 25 58 25 56.5 25.5 Z" fill="#0F172A" />
                        <polygon points="56.2,25.6 54.8,26.5 55,27.5 56.8,26.5" fill="#1E293B" />
                        <polygon points="63.8,25.6 65.2,26.5 65,27.5 63.2,26.5" fill="#1E293B" />

                        <!-- Blue Dorsal Spine Stripe -->
                        <rect x="58.8" y="28" width="2.4" height="18" rx="1.2" fill="#0284C7" />

                        <!-- Passenger Cabin Windows -->
                        <line x1="55.2" y1="32" x2="55.2" y2="90" stroke="#1E293B" stroke-width="0.8" stroke-dasharray="1 2" />
                        <line x1="64.8" y1="32" x2="64.8" y2="90" stroke="#1E293B" stroke-width="0.8" stroke-dasharray="1 2" />

                        <!-- Vertical Stabilizer (Tail Fin) -->
                        <path d="M59.3 92 L59.3 112 L60.7 112 L60.7 92 Z" fill="#0284C7" />
                      </g>
                    </svg>
                </div>
            `;
            document.body.appendChild(tracker);
        }

        const plane = document.getElementById('flightTrackerPlane');
        const fillPath = document.getElementById('flightTrackPathFill');

        let lastScrollY = window.scrollY;
        let lastScrollTime = performance.now();
        let currentBank = 0;

        function updatePlanePosition() {
            if (isReducedMotionActive() || window.innerWidth < 1024) {
                if (tracker) tracker.style.display = 'none';
                return;
            } else {
                if (tracker) tracker.style.display = 'block';
            }

            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            const scrollY = window.scrollY;
            const progress = Math.max(0, Math.min(1, scrollY / docHeight));

            const trackerHeight = tracker.clientHeight || 500;
            const yPos = progress * trackerHeight;

            // Smooth Banking Angle based on scroll velocity
            const now = performance.now();
            const dt = Math.max(16, now - lastScrollTime);
            const deltaY = scrollY - lastScrollY;
            const scrollVelocity = deltaY / dt; // px per ms
            const targetBank = Math.max(-8, Math.min(8, scrollVelocity * 4.5));
            currentBank += (targetBank - currentBank) * 0.25;

            lastScrollY = scrollY;
            lastScrollTime = now;

            // Base rotation: 180 degrees (nose pointing straight down along the flight trajectory)
            let rotation = 180 + currentBank;
            let scale = 1;

            if (progress > 0.95) {
                const landingProgress = (progress - 0.95) / 0.05;
                rotation = (180 + currentBank) - landingProgress * 45; // Level off flare for landing
                scale = 1 + landingProgress * 0.15;
            }

            if (plane) {
                plane.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg) scale(${scale})`;
            }

            if (fillPath) {
                const totalDash = 600;
                fillPath.style.strokeDashoffset = (totalDash * (1 - progress)).toString();
            }
        }

        window.addEventListener('scroll', updatePlanePosition, { passive: true });
        window.addEventListener('resize', updatePlanePosition, { passive: true });
        updatePlanePosition();
    }

    // =========================================================================
    // 2. SECTION REVEAL & ACT DIVIDERS (Item 2)
    // =========================================================================
    function initSectionReveal() {
        if (!cfg.sectionReveal) return;

        const sections = document.querySelectorAll('.story-chapter');
        const dividers = document.querySelectorAll('.act-divider');

        if (isReducedMotionActive()) {
            sections.forEach(s => s.classList.add('is-revealed'));
            dividers.forEach(d => d.classList.add('is-drawn'));
            return;
        }

        const sectionObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(s => {
            s.classList.add('motion-reveal-section');
            sectionObserver.observe(s);
        });

        const dividerObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-drawn');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        dividers.forEach(d => dividerObserver.observe(d));
    }

    // =========================================================================
    // 3. CARDS: 4PX HOVER LIFT & SPOTLIGHT GRADIENT (Item 3)
    // =========================================================================
    function initCardLiftAndSpotlight() {
        if (!cfg.cardLiftSpotlight) return;

        // Apply lift class to major card groups
        const liftCards = document.querySelectorAll('.guardrail-card, .ds-card-base, .ds-card-raised, .shadow-card');
        liftCards.forEach(card => card.classList.add('motion-lift-card'));

        if (window.innerWidth < 1024 || isReducedMotionActive()) return;

        // Desktop Soft Cursor Spotlight for Guardrail Cards
        const guardrailCards = document.querySelectorAll('.guardrail-card');
        guardrailCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--spotlight-x', `${x}px`);
                card.style.setProperty('--spotlight-y', `${y}px`);
                card.style.setProperty('--spotlight-opacity', '1');
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--spotlight-opacity', '0');
            });
        });
    }

    // =========================================================================
    // 4. PRIMARY CTA MAGNETIC HOVER & IDLE PULSE (Item 4)
    // =========================================================================
    function initMagneticCtaAndIdle() {
        if (!cfg.magneticCta) return;

        const btns = document.querySelectorAll('.magnetic-btn, #navPrimaryCta');

        if (!isReducedMotionActive() && window.innerWidth >= 768) {
            btns.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    // Max 6px pull clamp
                    const clampX = Math.max(-6, Math.min(6, x * 0.14));
                    const clampY = Math.max(-6, Math.min(6, y * 0.14));
                    btn.style.transform = `translate3d(${clampX}px, ${clampY}px, 0)`;
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = 'translate3d(0, 0, 0)';
                });
            });
        }

        // Idle Pulse after 6s of inactivity
        let idleTimer = null;
        const mainCtas = document.querySelectorAll('#navPrimaryCta, a[href="#act-1"]');

        function resetIdleTimer() {
            mainCtas.forEach(c => c.classList.remove('cta-idle-pulse'));
            clearTimeout(idleTimer);
            if (isReducedMotionActive()) return;

            idleTimer = setTimeout(() => {
                mainCtas.forEach(c => c.classList.add('cta-idle-pulse'));
            }, 6000);
        }

        ['mousemove', 'scroll', 'keydown', 'touchstart'].forEach(evt => {
            window.addEventListener(evt, resetIdleTimer, { passive: true });
        });
        resetIdleTimer();
    }

    // =========================================================================
    // 5. HERO STORY REVEAL & 186-DOT CABIN MATRIX (Item 5)
    // =========================================================================
    function initHeroMotionLayer() {
        if (!cfg.heroStory) return;

        // Underline draw animation on targets in Prologue
        const underlineTargets = document.querySelectorAll('#prologue .scene-line strong, #prologue .scene-line span.font-bold');
        underlineTargets.forEach(target => {
            target.classList.add('draw-underline-target');
            setTimeout(() => {
                target.classList.add('is-drawn');
            }, 600);
        });

        // Ken Burns 20s zoom on Hero aircraft photo
        const heroPhoto = document.querySelector('#prologue img');
        if (heroPhoto && !isReducedMotionActive()) {
            heroPhoto.classList.add('ken-burns-active');
        }

        // 186-Dot Seat Grid (Airbus A320neo cabin matrix)
        if (cfg.heroSeatGrid) {
            init186DotSeatGrid();
        }
    }

    function init186DotSeatGrid() {
        const targetContainer = document.getElementById('hero186DotContainer');
        if (!targetContainer) return;

        targetContainer.innerHTML = '';
        const matrixWrapper = document.createElement('div');
        matrixWrapper.className = 'space-y-2';
        matrixWrapper.innerHTML = `
            <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span class="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                    <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    <span>A320neo 186-Seat Cabin Matrix</span>
                </span>
                <span class="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                    <span id="heroDotsEmptyCounter" class="tabular-nums">0</span> / 24 Empty Seats
                </span>
            </div>
            <div id="heroDotGridMatrix" class="hero-dot-grid" aria-label="186 seat cabin dot grid: 24 empty middle seats transitioning to hollow" role="img"></div>
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Row 01 (Cockpit Forward)</span>
                <span>Row 31 (Aft Galley)</span>
            </div>
        `;
        targetContainer.appendChild(matrixWrapper);

        const gridEl = document.getElementById('heroDotGridMatrix');
        if (!gridEl) return;

        const TOTAL_SEATS = 186;
        const EMPTY_COUNT = (typeof window.FLIGHT_6E205_EMPTY_SEATS !== 'undefined') ? window.FLIGHT_6E205_EMPTY_SEATS : 24;
        const dots = [];

        for (let i = 0; i < TOTAL_SEATS; i++) {
            const dot = document.createElement('div');
            dot.className = 'hero-cabin-dot';
            dot.setAttribute('data-dot-index', i);
            gridEl.appendChild(dot);
            dots.push(dot);
        }

        // 24 empty seats distributed strictly in middle columns B and E
        const emptyIndices = (typeof window.emptySeatIndices !== 'undefined')
            ? window.emptySeatIndices
            : [7, 10, 19, 22, 31, 34, 43, 46, 61, 64, 73, 76, 91, 94, 103, 106, 115, 118, 133, 136, 151, 154, 163, 166];

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    obs.unobserve(entry.target);
                    if (isReducedMotionActive()) {
                        emptyIndices.forEach(idx => {
                            if (dots[idx]) dots[idx].classList.add('dot-empty-hollow');
                        });
                        const counter = document.getElementById('heroDotsEmptyCounter');
                        if (counter) counter.innerText = EMPTY_COUNT.toString();
                        return;
                    }

                    // Staggered transition of empty seats from filled to hollow
                    let transitioned = 0;
                    emptyIndices.forEach((idx, stepIdx) => {
                        setTimeout(() => {
                            if (dots[idx]) {
                                dots[idx].classList.add('dot-empty-hollow');
                                transitioned++;
                                const counter = document.getElementById('heroDotsEmptyCounter');
                                if (counter) counter.innerText = transitioned.toString();
                            }
                        }, 250 + stepIdx * 45);
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(targetContainer);
    }

    // =========================================================================
    // 8. PERISHABLE SHELF-LIFE LIVE TIMERS (Item 8)
    // =========================================================================
    function initPerishableTimers() {
        if (!cfg.perishableTimers) return;

        const timerBanana = document.getElementById('perishableBananaTimer');
        const timerHotel = document.getElementById('perishableHotelTimer');
        const timerSeat = document.getElementById('perishableSeatTimer');

        // Hotel 24-Hour Real-Time Countdown
        let hotelSeconds = 23 * 3600 + 58 * 60 + 44;
        let seatSeconds = 14 * 60 + 32; // T-14m 32s to pushback
        let seatExpired = false;

        function tickTimers() {
            if (document.hidden) return;

            // Hotel timer
            hotelSeconds = Math.max(0, hotelSeconds - 1);
            if (timerHotel) {
                const h = Math.floor(hotelSeconds / 3600).toString().padStart(2, '0');
                const m = Math.floor((hotelSeconds % 3600) / 60).toString().padStart(2, '0');
                const s = (hotelSeconds % 60).toString().padStart(2, '0');
                timerHotel.innerText = `${h}:${m}:${s}`;
            }

            // Seat 24B timer
            if (!seatExpired) {
                seatSeconds = Math.max(0, seatSeconds - 1);
                if (timerSeat) {
                    const m = Math.floor(seatSeconds / 60).toString().padStart(2, '0');
                    const s = (seatSeconds % 60).toString().padStart(2, '0');
                    timerSeat.innerText = `00:${m}:${s}`;
                }
                if (seatSeconds <= 0 && !seatExpired) {
                    seatExpired = true;
                    if (timerSeat) {
                        timerSeat.innerText = '0.00s (EXPIRED)';
                        timerSeat.parentElement?.classList.add('seat-expire-flash');
                    }
                }
            }
        }

        setInterval(tickTimers, 1000);
    }

    // =========================================================================
    // 9. CANNIBALIZATION TOGGLE MOTION (Item 9)
    // =========================================================================
    function initCannibalizationMotionHooks() {
        if (!cfg.cannibalizationMotion) return;

        const origSetCannibalMode = window.setCannibalizationMode;
        if (typeof origSetCannibalMode === 'function') {
            window.setCannibalizationMode = function (mode) {
                origSetCannibalMode(mode);

                const priyaBar = document.getElementById('cannibalPriyaBar');
                const priyaVal = document.getElementById('cannibalPriyaVal');
                const ananyaVal = document.getElementById('cannibalAnanyaVal');

                if (mode === 'public') {
                    if (priyaBar) {
                        priyaBar.classList.add('yield-drain-flash');
                        setTimeout(() => priyaBar.classList.remove('yield-drain-flash'), 800);
                    }
                    if (priyaVal) {
                        window.countUp(priyaVal, 16500, 3000, 400, 'comma', '₹');
                    }
                    if (ananyaVal) {
                        window.countUp(ananyaVal, 3200, 3000, 400, 'comma', '₹');
                    }
                } else {
                    if (priyaBar) {
                        priyaBar.classList.add('shield-pulse-active');
                        setTimeout(() => priyaBar.classList.remove('shield-pulse-active'), 600);
                    }
                    if (priyaVal) {
                        window.countUp(priyaVal, 3000, 16500, 400, 'comma', '₹');
                    }
                    if (ananyaVal) {
                        window.countUp(ananyaVal, 3000, 3200, 400, 'comma', '₹');
                    }
                }
            };
        }
    }

    // =========================================================================
    // 10. GUARDRAIL MINI VISUAL LOOPS & RUN ALL (Item 10 & 11)
    // =========================================================================
    function initGuardrailMiniVisuals() {
        if (!cfg.guardrailVisuals) return;

        // Loop only when card hovered or focused
        const cards = document.querySelectorAll('.guardrail-card');
        cards.forEach(card => {
            const radarBlip = card.querySelector('.radar-blip-orbit');
            const windowSlide = card.querySelector('.window-chip-slide-active');
            const bagBounce = card.querySelector('.bag-bounce-off');

            card.addEventListener('mouseenter', () => {
                if (radarBlip) radarBlip.style.animationPlayState = 'running';
                if (windowSlide) windowSlide.style.animationPlayState = 'running';
                if (bagBounce) bagBounce.style.animationPlayState = 'running';
            });

            card.addEventListener('mouseleave', () => {
                if (radarBlip) radarBlip.style.animationPlayState = 'paused';
                if (windowSlide) windowSlide.style.animationPlayState = 'paused';
                if (bagBounce) bagBounce.style.animationPlayState = 'paused';
            });
        });
    }

    // =========================================================================
    // 12. SANDBOX BLOCKED STAMP & AUTO-RUN (Item 12)
    // =========================================================================
    function initSandboxAutoRunAndStamp() {
        if (!cfg.sandboxStamp) return;

        const sandbox = document.getElementById('antiFraudSandbox');
        if (!sandbox) return;

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    obs.unobserve(entry.target);
                    // Auto-run Scenario A once
                    if (typeof window.runSandboxScenario === 'function') {
                        setTimeout(() => {
                            window.runSandboxScenario('A');
                        }, 400);
                    }
                }
            });
        }, { threshold: 0.3 });

        observer.observe(sandbox);
    }

    // =========================================================================
    // 13-17. PROJECT SANJEEVANI MOTION (Item 13-17)
    // =========================================================================
    function initSanjeevaniMotionLayer() {
        if (!cfg.sanjeevaniMotion) return;

        // ECG Line drawing continuous & sync heartbeat
        const ecgSvgPath = document.querySelector('.ecg-path');
        if (ecgSvgPath && !isReducedMotionActive()) {
            ecgSvgPath.classList.add('ecg-continuous-line');
        }

        const heartbeatIcon = document.querySelector('[data-lucide="heart-pulse"]');
        if (heartbeatIcon && !isReducedMotionActive()) {
            heartbeatIcon.classList.add('heartbeat-synced-pulse');
        }

        // Parallax image (max 20px translateY)
        const medImg = document.querySelector('.sanjeevani-col-right img');
        if (medImg && !isReducedMotionActive() && window.innerWidth >= 1024) {
            window.addEventListener('scroll', () => {
                const rect = medImg.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.04;
                    const clamped = Math.max(-20, Math.min(20, offset));
                    medImg.style.transform = `translate3d(0, ${clamped}px, 0)`;
                }
            }, { passive: true });
        }

        // Hook fare slider to countUp
        const origUpdateFareRelief = window.updateFareRelief;
        if (typeof origUpdateFareRelief === 'function') {
            window.updateFareRelief = function (val) {
                origUpdateFareRelief(val);
                const savingsEl = document.getElementById('fareReliefSavings');
                if (savingsEl && !isReducedMotionActive()) {
                    savingsEl.classList.add('tabular-nums');
                }
            };
        }
    }

    // =========================================================================
    // 18-21. FLIGHT SCHOOL CUTAWAY, TABS & GANTT (Item 18-21)
    // =========================================================================
    function initFlightSchoolMotion() {
        if (!cfg.flightSchoolMotion) return;

        // Tab crossfade hook
        const tabBtns = document.querySelectorAll('[role="tab"][aria-controls^="tutorial-"]');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('aria-controls');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel && !isReducedMotionActive()) {
                    targetPanel.classList.add('tab-enter-right');
                    requestAnimationFrame(() => {
                        targetPanel.classList.remove('tab-enter-right');
                        targetPanel.classList.add('tab-active');
                    });
                }
            });
        });

        // Add laser scan line to aircraft cutaway SVG container if not present
        const cutawayContainer = document.getElementById('cutawaySvgContainer');
        if (cutawayContainer && !isReducedMotionActive()) {
            let laser = cutawayContainer.querySelector('.cutaway-laser-sweep');
            if (!laser) {
                laser = document.createElement('div');
                laser.className = 'cutaway-laser-sweep';
                cutawayContainer.style.position = 'relative';
                cutawayContainer.appendChild(laser);
            }
        }
    }

    // =========================================================================
    // 22. CABIN SEATMAP WAVE (Item 22)
    // =========================================================================
    function initCabinSeatmapWave() {
        if (!cfg.cabinWave) return;

        const origToggleCabinFill = window.toggleCabinFill;
        if (typeof origToggleCabinFill === 'function') {
            window.toggleCabinFill = function () {
                if (isReducedMotionActive()) {
                    origToggleCabinFill();
                    return;
                }

                const emptySeatIndices = window.emptySeatIndices || [7, 10, 19, 22, 31, 34, 43, 46, 61, 64, 73, 76, 91, 94, 103, 106, 115, 118, 133, 136, 151, 154, 163, 166];
                const isCurrentlyFilled = window.isCabinFilled;

                // Call core logic
                origToggleCabinFill();

                // Apply staggered rear-to-front wave
                const sortedIndices = [...emptySeatIndices].reverse();
                sortedIndices.forEach((idx, step) => {
                    setTimeout(() => {
                        const seat = document.getElementById(`seat-${idx}`);
                        if (seat) {
                            seat.classList.add('seat-wave-pop');
                            setTimeout(() => seat.classList.remove('seat-wave-pop'), 300);
                        }
                    }, step * 30);
                });

                // Smooth count-up on telemetry profit
                const statProfit = document.getElementById('statExtraProfit');
                if (statProfit) {
                    if (!isCurrentlyFilled) {
                        window.countUp(statProfit, 0, 42000, 800, 'comma', '₹', ' Extra Net Margin');
                    } else {
                        window.countUp(statProfit, 42000, 0, 400, 'comma', '₹', '');
                    }
                }
            };
        }

        // Add seat click ripple
        const origInspectSeat = window.inspectSeat;
        if (typeof origInspectSeat === 'function') {
            window.inspectSeat = function (row, letter, seatIndex) {
                origInspectSeat(row, letter, seatIndex);
                const seat = document.getElementById(`seat-${seatIndex}`);
                if (seat && !isReducedMotionActive()) {
                    const ripple = document.createElement('div');
                    ripple.className = 'seat-click-ripple';
                    seat.style.position = 'relative';
                    seat.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 450);
                }
            };
        }
    }

    // =========================================================================
    // 23. CFO SIMULATOR WATERFALL GLOW (Item 23)
    // =========================================================================
    function initCfoWaterfallMotion() {
        if (!cfg.cfoCalculatorMotion) return;

        const origUpdateYield = window.updateYieldSim;
        if (typeof origUpdateYield === 'function') {
            window.updateYieldSim = function () {
                origUpdateYield();

                const deltaBarContainer = document.getElementById('yieldChart');
                if (deltaBarContainer && !isReducedMotionActive()) {
                    deltaBarContainer.classList.add('delta-bar-glow');
                    setTimeout(() => deltaBarContainer.classList.remove('delta-bar-glow'), 600);
                }
            };
        }
    }

    // =========================================================================
    // REDUCED MOTION TOGGLE BUTTON IN NAVBAR
    // =========================================================================
    window.toggleMotionPreference = function () {
        const currentlyReduced = isReducedMotionActive();
        const newSetting = !currentlyReduced;
        cfg.reducedMotion = newSetting;
        localStorage.setItem('aerofill_reduced_motion', newSetting ? 'true' : 'false');
        applyMotionState();
    };

    function applyMotionState() {
        const reduced = isReducedMotionActive();
        const html = document.documentElement;
        const iconOn = document.querySelector('.motion-icon-on');
        const iconOff = document.querySelector('.motion-icon-off');
        const motionText = document.querySelector('.motion-text');

        if (reduced) {
            html.classList.add('reduce-motion-active');
            if (iconOn) iconOn.classList.add('hidden');
            if (iconOff) iconOff.classList.remove('hidden');
            if (motionText) motionText.innerText = 'Reduced';
        } else {
            html.classList.remove('reduce-motion-active');
            if (iconOn) iconOn.classList.remove('hidden');
            if (iconOff) iconOff.classList.add('hidden');
            if (motionText) motionText.innerText = 'Motion';
        }
    }

    // Master Initializer
    function initAeroFillMotion() {
        applyMotionState();
        initFlightPath();
        initSectionReveal();
        initCardLiftAndSpotlight();
        initMagneticCtaAndIdle();
        initHeroMotionLayer();
        initPerishableTimers();
        initCannibalizationMotionHooks();
        initGuardrailMiniVisuals();
        initSandboxAutoRunAndStamp();
        initSanjeevaniMotionLayer();
        initFlightSchoolMotion();
        initCabinSeatmapWave();
        initCfoWaterfallMotion();

        // Listen for OS setting changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
                applyMotionState();
            });
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAeroFillMotion);
    } else {
        initAeroFillMotion();
    }

    window.AeroFillMotion = {
        init: initAeroFillMotion,
        config: window.AeroFillMotionConfig,
        toggleReducedMotion: window.toggleMotionPreference,
        isReducedMotionActive: isReducedMotionActive,
    };

})();
