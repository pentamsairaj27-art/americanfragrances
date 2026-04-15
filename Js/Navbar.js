(function () {
    const DEFAULT_PROJECT_ID = "44D84293-37E2-4665-A4C4-5EB535EC808A";
    const API_BASE = "https://api.americanfragrances.com";
    const desktopTargets = {
        women: document.getElementById("womenPanel"),
        men: document.getElementById("menPanel"),
        brands: document.getElementById("brandsPanel"),
        explore: document.getElementById("explorePanel"),
        ai: document.getElementById("aiMatchesPanel")
    };
    const mobileTargets = {
        women: document.getElementById("mobileWomenMenu"),
        men: document.getElementById("mobileMenMenu"),
        brands: document.getElementById("mobileBrandsMenu"),
        explore: document.getElementById("mobileExploreMenu"),
        ai: document.getElementById("mobileAiMatchesMenu")
    };
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");
    let navDataPromise = null;

    const fallbackData = {
        women: [
            "Floral Icons",
            "Soft Musks",
            "Fresh Citrus",
            "Date Night",
            "Office Essentials",
            "Gift Sets",
            "Travel Sprays"
        ],
        men: [
            "Woody Classics",
            "Blue Fresh",
            "Daily Office",
            "Gym & Sport",
            "Date Night",
            "Best Sellers",
            "Travel Sprays"
        ],
        brands: [
            "Dior",
            "Chanel",
            "Tom Ford",
            "YSL",
            "Versace",
            "Lattafa",
            "Mancera"
        ],
        explore: [
            {
                title: "Trending Collections",
                accent: "Curated for every mood and moment.",
                items: [
                    "New Arrivals",
                    "Best Sellers",
                    "Luxury Picks",
                    "Designer Icons",
                    "Niche Spotlight",
                    "Bundle Sets",
                    "Gift Sets",
                    "Travel Friendly",
                    "Everyday Signatures",
                    "Clearance Finds"
                ]
            },
            {
                title: "Shop by Vibe",
                accent: "Discover fragrances through feeling, not filters.",
                items: [
                    "Fresh & Clean",
                    "Bold & Smoky",
                    "Romantic Florals",
                    "Summer Escape",
                    "Night Out",
                    "Minimal Luxe",
                    "Warm & Cozy",
                    "Elegant Office",
                    "Party Ready",
                    "Signature Scents"
                ]
            }
        ],
        ai: [
            { title: "Style", items: ["Minimal", "Chic", "Bold", "Classic", "Street", "Luxury", "Romantic", "Sporty", "Creative", "Confident"] },
            { title: "Notes", items: ["Floral", "Woody", "Citrus", "Amber", "Leather", "Musk", "Vanilla", "Marine", "Spicy", "Powdery"] },
            { title: "Mood", items: ["Fresh", "Calm", "Sexy", "Elegant", "Joyful", "Mysterious", "Relaxed", "Playful", "Powerful", "Dreamy"] },
            { title: "Season", items: ["Spring", "Summer", "Monsoon", "Autumn", "Winter", "All Season", "Hot Weather", "Cool Evenings", "Daylight", "Holiday"] },
            { title: "Occasion", items: ["Office", "Daily Wear", "Wedding", "Date Night", "Parties", "Travel", "Brunch", "Gym", "Gifting", "Weekend"] },
            { title: "Age Group", items: ["18-22", "23-27", "28-32", "33-37", "38-42", "43-47", "48-52", "53-57", "58-62", "All Ages"] },
            { title: "Intensity", items: ["Skin Scent", "Soft", "Balanced", "Noticeable", "Strong", "Projection", "Statement", "Long Trail", "All Day", "Powerhouse"] },
            { title: "Longevity", items: ["2 Hours", "4 Hours", "6 Hours", "8 Hours", "10 Hours", "All Day", "Work Shift", "Dinner Date", "Travel Day", "Night Long"] },
            { title: "Spray Time", items: ["1 Spray", "2 Sprays", "3 Sprays", "4 Sprays", "Office Safe", "Outdoor", "Party Ready", "Winter Wear", "Summer Light", "Layered"] },
            { title: "Presentation", items: ["Luxury Box", "Gift Ready", "Minimal Bottle", "Bold Bottle", "Collector Look", "Travel Pack", "Premium Finish", "Classic Design", "Modern Design", "Display Worthy"] }
        ]
    };

    function getProjectId() {
        if (typeof window.GlobalInputs === "function") {
            try {
                return window.GlobalInputs() || DEFAULT_PROJECT_ID;
            } catch (error) {
                return DEFAULT_PROJECT_ID;
            }
        }

        return DEFAULT_PROJECT_ID;
    }

    function fetchJson(path) {
        return fetch(`${API_BASE}${path}`, { credentials: "omit" }).then((response) => {
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            return response.json();
        });
    }

    function sanitizeItems(items, limit) {
        return Array.from(new Set(
            (items || [])
                .map((item) => typeof item === "string" ? item.trim() : "")
                .filter(Boolean)
        )).slice(0, limit);
    }

    function slugLabel(label) {
        return encodeURIComponent(label);
    }

    function menuLinks(label, type, title) {
        if (type === "brands") {
            return `show-all.html?brand=${slugLabel(label)}`;
        }

        if (type === "women" || type === "men") {
            const category = type === "women" ? "Women" : "Men";
            return `show-all.html?cat=${slugLabel(category)}&sub_cat=${slugLabel(label)}`;
        }

        if (type === "explore") {
            return `show-all.html?keyword=${slugLabel(label)}`;
        }

        return `show-all.html?labelHeading=${slugLabel(title || "AI Matches")}&label=${slugLabel(label)}`;
    }

    function buildSimplePanel(title, description, items, type) {
        return `
            <div class="menu-panel-header">
                <p>${title}</p>
                <h4>${description}</h4>
            </div>
            <div class="menu-option-stack">
                ${items.map((item, index) => `
                    <a class="menu-option-card" href="${menuLinks(item, type)}">
                        <span class="menu-option-index">${String(index + 1).padStart(2, "0")}</span>
                        <span class="menu-option-copy">
                            <strong>${item}</strong>
                            <small>${description}</small>
                        </span>
                    </a>
                `).join("")}
            </div>
        `;
    }

    function buildExplorePanel(sections) {
        return `
            <div class="mega-menu-grid">
                ${sections.map((section) => `
                    <section class="mega-menu-column">
                        <div class="mega-menu-heading">
                            <p>${section.title}</p>
                            <span>${section.accent}</span>
                        </div>
                        <div class="mega-menu-links">
                            ${section.items.map((item) => `
                                <a href="${menuLinks(item, "explore")}">${item}</a>
                            `).join("")}
                        </div>
                    </section>
                `).join("")}
            </div>
        `;
    }

    function buildAiPanel(sections) {
        return `
            <div class="ai-menu-shell">
                <div class="ai-menu-intro">
                    <p>AI Matches</p>
                    <h4>Explore 10 fragrance intelligence dimensions in one immersive mega menu.</h4>
                </div>
                <div class="ai-menu-grid">
                    ${sections.map((section, index) => `
                        <section class="ai-menu-card" style="--panel-order:${index + 1}">
                            <div class="ai-menu-card-top">
                                <span>${String(index + 1).padStart(2, "0")}</span>
                                <h5>${section.title}</h5>
                            </div>
                            <div class="ai-menu-links">
                                ${section.items.map((item) => `
                                    <a href="${menuLinks(item, "ai", section.title)}">${item}</a>
                                `).join("")}
                            </div>
                        </section>
                    `).join("")}
                </div>
            </div>
        `;
    }

    function buildMobileList(items, type) {
        return items.map((item) => `
            <a class="mobile-submenu-link" href="${menuLinks(item, type)}">${item}</a>
        `).join("");
    }

    function buildMobileExplore(sections) {
        return sections.map((section) => `
            <section class="mobile-submenu-section">
                <p>${section.title}</p>
                <div class="mobile-submenu-links">
                    ${section.items.map((item) => `
                        <a class="mobile-submenu-link" href="${menuLinks(item, "explore")}">${item}</a>
                    `).join("")}
                </div>
            </section>
        `).join("");
    }

    function buildMobileAi(sections) {
        return sections.map((section) => `
            <section class="mobile-ai-card">
                <p>${section.title}</p>
                <div class="mobile-ai-links">
                    ${section.items.map((item) => `
                        <a class="mobile-submenu-link" href="${menuLinks(item, "ai", section.title)}">${item}</a>
                    `).join("")}
                </div>
            </section>
        `).join("");
    }

    function normalizeQuestionTitle(question, index) {
        const cleaned = (question || "").replace(/[?:]/g, "").trim();
        if (cleaned) {
            return cleaned.split(" ").slice(0, 3).join(" ");
        }

        return `AI Match ${index + 1}`;
    }

    function loadNavigationData() {
        if (navDataPromise) {
            return navDataPromise;
        }

        const projectId = getProjectId();
        navDataPromise = fetchJson(`/Home/Categorylist?project_id=${projectId}`)
            .then((categories) => {
                const categoryMap = Array.isArray(categories) ? categories : [];
                const menCategory = categoryMap.find((item) => item.name && item.name.toLowerCase() === "men");
                const womenCategory = categoryMap.find((item) => item.name && item.name.toLowerCase() === "women");

                return Promise.all([
                    womenCategory ? fetchJson(`/Home/Subcategorylist?project_id=${projectId}&categoryid=${womenCategory.id}`) : Promise.resolve([]),
                    menCategory ? fetchJson(`/Home/Subcategorylist?project_id=${projectId}&categoryid=${menCategory.id}`) : Promise.resolve([]),
                    fetchJson(`/Home/PremiumBrandlist_Caurosal?project_id=${projectId}`).catch(() => []),
                    fetchJson(`/Home/FeedbackQuestionlist?project_id=${projectId}`).catch(() => [])
                ]).then(([womenSubcategories, menSubcategories, brands, questions]) => {
                    const women = sanitizeItems((womenSubcategories || []).map((item) => item.name), 7);
                    const men = sanitizeItems((menSubcategories || []).map((item) => item.name), 7);
                    const brandNames = sanitizeItems((brands || []).map((item) => item.name), 7);
                    const ai = (questions || []).slice(0, 10).map((question, index) => ({
                        title: normalizeQuestionTitle(question.question, index),
                        items: sanitizeItems([
                            question.option1,
                            question.option2,
                            question.option3,
                            question.option4,
                            question.option5,
                            question.option6,
                            question.option7,
                            question.option8,
                            question.option9,
                            question.option10
                        ], 10)
                    })).filter((section) => section.items.length > 0);

                    return {
                        women: women.length ? women : fallbackData.women,
                        men: men.length ? men : fallbackData.men,
                        brands: brandNames.length ? brandNames : fallbackData.brands,
                        explore: fallbackData.explore,
                        ai: ai.length ? ai : fallbackData.ai
                    };
                });
            })
            .catch(() => fallbackData);

        return navDataPromise;
    }

    function renderMenus(data) {
        if (desktopTargets.women) {
            desktopTargets.women.innerHTML = buildSimplePanel("For Women", "Popular subcategories fetched for women.", data.women, "women");
        }

        if (desktopTargets.men) {
            desktopTargets.men.innerHTML = buildSimplePanel("For Men", "Popular subcategories fetched for men.", data.men, "men");
        }

        if (desktopTargets.brands) {
            desktopTargets.brands.innerHTML = buildSimplePanel("Brands", "Featured fragrance houses picked from the API.", data.brands, "brands");
        }

        if (desktopTargets.explore) {
            desktopTargets.explore.innerHTML = buildExplorePanel(data.explore);
        }

        if (desktopTargets.ai) {
            desktopTargets.ai.innerHTML = buildAiPanel(data.ai);
        }

        if (mobileTargets.women) {
            mobileTargets.women.innerHTML = buildMobileList(data.women, "women");
        }

        if (mobileTargets.men) {
            mobileTargets.men.innerHTML = buildMobileList(data.men, "men");
        }

        if (mobileTargets.brands) {
            mobileTargets.brands.innerHTML = buildMobileList(data.brands, "brands");
        }

        if (mobileTargets.explore) {
            mobileTargets.explore.innerHTML = buildMobileExplore(data.explore);
        }

        if (mobileTargets.ai) {
            mobileTargets.ai.innerHTML = buildMobileAi(data.ai);
        }
    }

    function closeDesktopPanels() {
        document.querySelectorAll(".luxury-nav .nav-item.is-open").forEach((item) => {
            item.classList.remove("is-open");
        });
    }

    function initDesktopPanels() {
        document.querySelectorAll(".luxury-nav .has-panel").forEach((item) => {
            const trigger = item.querySelector(".nav-link-button");

            item.addEventListener("mouseenter", () => {
                if (window.innerWidth < 992) {
                    return;
                }

                closeDesktopPanels();
                item.classList.add("is-open");
            });

            item.addEventListener("mouseleave", () => {
                item.classList.remove("is-open");
            });

            trigger?.addEventListener("focus", () => {
                if (window.innerWidth < 992) {
                    return;
                }

                closeDesktopPanels();
                item.classList.add("is-open");
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeDesktopPanels();
            }
        });
    }

    function setDrawerState(isOpen) {
        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.toggle("active", isOpen);
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
        mobileMenuBackdrop?.classList.toggle("active", isOpen);
        menuToggle?.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
    }

    function initDrawer() {
        menuToggle?.addEventListener("click", () => {
            setDrawerState(!mobileMenu?.classList.contains("active"));
        });

        closeMenu?.addEventListener("click", () => {
            setDrawerState(false);
        });

        mobileMenuBackdrop?.addEventListener("click", () => {
            setDrawerState(false);
        });

        document.querySelectorAll("#mobileMenu a").forEach((link) => {
            link.addEventListener("click", () => {
                setDrawerState(false);
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 992) {
                setDrawerState(false);
            }
        });
    }

    window.AmeriFragCommonNavData = {
        getProjectId,
        loadNavigationData,
        clearNavigationCache: () => {
            navDataPromise = null;
        }
    };

    loadNavigationData().then(renderMenus);
    initDesktopPanels();
    initDrawer();
})();
