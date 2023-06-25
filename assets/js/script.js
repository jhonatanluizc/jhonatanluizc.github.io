'use strict';

/// :: Represents the portifolio app.
var Portfolio = {

    ///:: Initialize.
    Init: function () {

        /// :: Bind events.
        /// :: Portfolio.ExperienceSlide.Bind();
        Portfolio.Profile.Bind();
        Portfolio.Theme.Init();
    },

    /// :: Set theme settings.
    Theme: {

        Selected: 'Primary',
        Style: null,
        Icon: null,
        Init: function () {
            Portfolio.Theme.Style = document.createElement('style');
            document.head.appendChild(Portfolio.Theme.Style);
            Portfolio.Theme.Icon = document.getElementById("theme-icon");
            let savedTheme = localStorage.getItem('theme');
            if (savedTheme) { Portfolio.Theme.Set[savedTheme](); }
        },

        Reset: function () {
            while (Portfolio.Theme.Style.sheet.cssRules.length > 0) {
                Portfolio.Theme.Style.sheet.deleteRule(0);
            }
        },

        Set: {

            Primary: function () {
                if (Portfolio.Theme.Selected !== 'Primary') {
                    Portfolio.Theme.Reset();
                    Portfolio.Theme.Style.sheet.insertRule(':root { --background-primary: #131417; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --background-secondary: #2C303A; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --background-tertiary: #5A5F73; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --font-primary: #E6E6E6; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --font-secondary: #C7C9D3; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --font-tertiary: #13C0F0; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-primary: #248C46; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-secondary: #444857; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-tertiary: #FFDD40; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-primary-hover: #47cf73; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-secondary-hover: #5A5F73; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-tertiary-hover: #ffd519; }', 0);
                    Portfolio.Theme.Selected = 'Primary';
                    Portfolio.Theme.Icon.classList.remove("fa-moon");
                    Portfolio.Theme.Icon.classList.add("fa-sun");
                    localStorage.setItem('theme', 'Primary');
                }
            },

            Secundary: function () {
                if (Portfolio.Theme.Selected !== 'Secundary') {
                    Portfolio.Theme.Reset();
                    Portfolio.Theme.Style.sheet.insertRule(':root { --background-primary: #3D79F2; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --background-secondary: #F2F2F2; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --background-tertiary: #5C8EF2; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --font-primary: #000; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --font-secondary: #111; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --font-tertiary: #222; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-primary: #80cfa0; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-secondary: #B3B5C6; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-tertiary: #FFC857; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-primary-hover: #A8E5BD; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-secondary-hover: #C6C8D5; }', 0);
                    Portfolio.Theme.Style.sheet.insertRule(':root { --button-tertiary-hover: #FFDB7F; }', 0);
                    Portfolio.Theme.Selected = 'Secundary';
                    Portfolio.Theme.Icon.classList.remove("fa-sun");
                    Portfolio.Theme.Icon.classList.add("fa-moon");
                    localStorage.setItem('theme', 'Secundary');
                }
            }

        },
    },

    /// :: Slide to experience section.
    ExperienceSlide: {

        /// :: Bind indicators slide;
        Bind: function () {

            /// :: Base.
            var indicators = document.querySelector("#indicators");

            /// :: Bind a click.
            indicators.addEventListener("click", function (e) {

                /// :: Get curret click.
                var currentClick = e.target.id;

                /// :: Validade click is indicator.
                if (currentClick !== 'indicators') {

                    /// :: Base.
                    var slide = currentClick.split('slide-')[1];

                    /// :: Go to a slide.
                    Portfolio.ExperienceSlide.GoToSlide(slide);

                    /// :: Set trade interval.
                    Portfolio.ExperienceSlide.Trade();

                }
            });

            /// :: Set trade interval.
            Portfolio.ExperienceSlide.Trade();
        },

        /// :: Next slide.
        Next: function () {

            /// :: Base.
            var indicators = document.querySelector("#indicators");
            var currentIndicator = null;

            /// :: Iterate all indicators.
            for (let index = 0; index < indicators.children.length; index++) {

                /// :: Validate for enabled slide.
                if (indicators.children[index].classList.value.indexOf('active') !== -1) {
                    currentIndicator = index;
                }
            }

            /// :: Get a next slide.
            var nextSlide = (currentIndicator + 1) < indicators.children.length ? (currentIndicator + 1) : 0;

            /// :: Go to a next slide.
            Portfolio.ExperienceSlide.GoToSlide(nextSlide);
        },

        /// :: Go to slide.
        GoToSlide: function (slide) {

            /// :: Base.
            var indicators = document.querySelector("#indicators");

            /// :: Iterate all indicators.
            for (let index = 0; index < indicators.children.length; index++) {

                /// :: Validate for enabled slide.
                if (index.toString() !== slide.toString()) {
                    document.querySelector("#slide-" + index).classList.remove("active");
                    hide(document.querySelector("#experience-card-" + index));
                }
                else {
                    document.querySelector("#slide-" + index).classList.add("active");
                    fadeIn(document.querySelector("#experience-card-" + index));
                }
            }
        },

        /// :: Set trade interval.
        Timer: null,

        /// :: Timer to trade.
        Trade: function () {

            /// :: Reset interval.
            clearInterval(Portfolio.ExperienceSlide.Timer);

            /// :: Start a new interval.
            Portfolio.ExperienceSlide.Timer = setInterval(function () {
                Portfolio.ExperienceSlide.Next();
            }, 8000);

        },

    },

    /// :: Profile section.
    Profile: {

        /// :: Bind profile section.
        Bind: function () {

            /// :: Base.
            var profileEmail = document.querySelector('#profile-social-email');
            let theme = document.querySelector('#profile-theme');

            /// :: Trigger a click.
            profileEmail.addEventListener('click', function () {

                /// :: Copy my email.
                Portfolio.Profile.Copy('E-mail', 'jhonatan.sont@gmail.com');

            });

            /// :: Trigger a click.
            theme.addEventListener('click', function () {
                if (Portfolio.Theme.Selected === 'Primary') { Portfolio.Theme.Set.Secundary(); }
                else { Portfolio.Theme.Set.Primary(); }
            });
        },

        /// :: Copy to clipboard.
        /// :: @param {string} type - name of the text.
        /// :: @param {string} text - text to copy.
        Copy: function (type, text) {

            /// :: Copy to clipboard.
            navigator.clipboard.writeText(text);

            /// :: Show a message.
            Swal.fire({
                title: text,
                text: `${type} copiado para a área de transferência`,
                icon: 'success',
            })

        }
    },
}

Portfolio.Init();