document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Language Toggle (Multiple)
    ========================= */
    const langBtns = document.querySelectorAll(".langToggle");
    const html = document.documentElement;

    let currentLang = localStorage.getItem("lang") || "ar";

    function applyLanguage(lang) {
        html.setAttribute("lang", lang);
        html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

        // تغيير النصوص
        document.querySelectorAll("[data-ar]").forEach(el => {
            el.textContent =
                lang === "ar"
                    ? el.getAttribute("data-ar")
                    : el.getAttribute("data-en");
        });

        // تحديث كل أزرار اللغة
        langBtns.forEach(btn => {
            const span = btn.querySelector("span");
            if (span) {
                span.textContent = lang === "ar" ? "en" : "ar";
            }
        });
    }

    applyLanguage(currentLang);

    // كليك على أي زر لغة
    langBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentLang = currentLang === "ar" ? "en" : "ar";
            localStorage.setItem("lang", currentLang);
            location.reload(); // لو حابب نشيله أقولك ازاي
        });
    });

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

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }

});
