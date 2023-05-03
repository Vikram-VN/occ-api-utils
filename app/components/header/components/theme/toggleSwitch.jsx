"use client";
const ToggleSwitch = () => {

    if (typeof window !== "undefined") {
        // Function Start
        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon?.classList?.remove('hidden');
        } else {
            themeToggleDarkIcon?.classList?.remove('hidden');
        }

        var themeToggleBtn = document.getElementById('theme-toggle');

        themeToggleBtn?.addEventListener('click', function () {

            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    console.log("Light")
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                    document.getElementsByClassName("CAU__HeaderLogo")[0].srcset="apexit-white.png"
                } else {
                    document.documentElement.classList.remove('dark');
                    document.getElementsByClassName("CAU__HeaderLogo")[0].srcset="apexLogo.png"
                    // console.log("Dark",c)
                    localStorage.setItem('color-theme', 'light');
                }

                // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }

        });
    }
}

export default ToggleSwitch;