document.querySelectorAll(".fold-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
        var group = this.parentElement;
        var content = group.querySelector(".fold-content");
        var isActive = group.classList.contains("active");

        if (isActive) {
            // 收起
            content.style.height = content.scrollHeight + "px";
            requestAnimationFrame(function () {
                content.style.height = "0";
            });
            group.classList.remove("active");
            this.textContent = this.textContent.replace("▼", "▶");
        } else {
            // 展开
            content.style.height = content.scrollHeight + "px";
            group.classList.add("active");
            this.textContent = this.textContent.replace("▶", "▼");
            content.addEventListener(
                "transitionend",
                function handler() {
                    content.style.height = "auto";
                    content.removeEventListener("transitionend", handler);
                }
            );
        }
    });
});
