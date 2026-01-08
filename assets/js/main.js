document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Language Toggle
    ========================= */
    const langBtn = document.getElementById("langToggle");
    const html = document.documentElement;

    let currentLang = localStorage.getItem("lang") || "ar";

    function applyLanguage(lang) {
        html.setAttribute("lang", lang);
        html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

        document.querySelectorAll("[data-ar]").forEach(el => {
            el.textContent =
                lang === "ar"
                    ? el.getAttribute("data-ar")
                    : el.getAttribute("data-en");
        });

        if (langBtn) {
            langBtn.querySelector("span").textContent =
                lang === "ar" ? "en" : "ar";
        }
    }

    applyLanguage(currentLang);

    if (langBtn) {
        langBtn.addEventListener("click", () => {
            currentLang = currentLang === "ar" ? "en" : "ar";
            localStorage.setItem("lang", currentLang);
            location.reload();
        });
    }

    /* =========================
       Mobile Menu
    ========================= */
    const openBtn = document.getElementById("menuOpenBtn");
    const closeBtn = document.getElementById("menuCloseBtn");
    const overlay = document.getElementById("menuOverlay");
    const menu = document.getElementById("menuContent");

    if (openBtn && closeBtn && overlay && menu) {

        function openMenu() {
            overlay.classList.remove("hidden");
            menu.classList.remove("hidden");

            overlay.setAttribute("data-state", "open");
            menu.setAttribute("data-state", "open");

            document.body.style.overflow = "hidden";
        }

        function closeMenu() {
            overlay.setAttribute("data-state", "closed");
            menu.setAttribute("data-state", "closed");

            setTimeout(() => {
                overlay.classList.add("hidden");
                menu.classList.add("hidden");
            }, 300);

            document.body.style.overflow = "";
        }

        openBtn.addEventListener("click", openMenu);
        closeBtn.addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);

        // يقفل عند الضغط على أي لينك
        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

});
document.addEventListener("DOMContentLoaded", () => {

    // كل أزرار Share
    const openBtns = document.querySelectorAll(".share-trigger");

    const overlay = document.getElementById("shareOverlay");
    const dialog = document.getElementById("shareDialog");
    const closeBtn = document.querySelector("[data-slot='dialog-close']");

    if (!openBtns.length || !overlay || !dialog || !closeBtn) return;

    function openShare() {
        overlay.classList.remove("hidden");
        dialog.classList.remove("hidden");

        overlay.setAttribute("data-state", "open");
        dialog.setAttribute("data-state", "open");

        document.body.style.overflow = "hidden";
    }

    function closeShare() {
        overlay.setAttribute("data-state", "closed");
        dialog.setAttribute("data-state", "closed");

        setTimeout(() => {
            overlay.classList.add("hidden");
            dialog.classList.add("hidden");
        }, 200); // نفس مدة الأنيميشن

        document.body.style.overflow = "";
    }

    // فتح من أي زر Share
    openBtns.forEach(btn => {
        btn.addEventListener("click", openShare);
    });

    // إغلاق بزر X
    closeBtn.addEventListener("click", closeShare);

    // إغلاق بالضغط خارج الديالوج
    overlay.addEventListener("click", closeShare);

    // إغلاق بزر ESC (احترافي)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dialog.getAttribute("data-state") === "open") {
            closeShare();
        }
    });

});
