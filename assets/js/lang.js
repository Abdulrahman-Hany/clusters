document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("langToggle");
    const html = document.documentElement;

    // اللغة الافتراضية
    let currentLang = localStorage.getItem("lang") || "ar";

    function applyLanguage(lang) {
        html.setAttribute("lang", lang);
        html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

        document.querySelectorAll("[data-ar]").forEach(el => {
            el.textContent = lang === "ar"
                ? el.getAttribute("data-ar")
                : el.getAttribute("data-en");
        });

        langBtn.querySelector("span").textContent = lang === "ar" ? "en" : "ar";
    }

    // تطبيق اللغة عند تحميل الصفحة
    applyLanguage(currentLang);

    // عند الضغط على الزر
    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "en" : "ar";
        localStorage.setItem("lang", currentLang);
        location.reload(); // Refresh الصفحة
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("menuOpenBtn");
    const closeBtn = document.getElementById("menuCloseBtn");
    const overlay = document.getElementById("menuOverlay");
    const menu = document.getElementById("menuContent");

    function openMenu() {
        overlay.classList.remove("hidden");
        menu.classList.remove("hidden");

        overlay.setAttribute("data-state", "open");
        menu.setAttribute("data-state", "open");

        document.body.style.overflow = "hidden"; // منع الاسكرول
    }

    function closeMenu() {
        overlay.setAttribute("data-state", "closed");
        menu.setAttribute("data-state", "closed");

        setTimeout(() => {
            overlay.classList.add("hidden");
            menu.classList.add("hidden");
        }, 300); // نفس مدة الأنيميشن

        document.body.style.overflow = "";
    }

    // فتح
    openBtn.addEventListener("click", openMenu);

    // إغلاق بالزر ❌
    closeBtn.addEventListener("click", closeMenu);

    // إغلاق عند الضغط خارج المينيو
    overlay.addEventListener("click", closeMenu);
});
