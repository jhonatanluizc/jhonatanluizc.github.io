'use strict';

/// :: Represents the portifolio app.
var Portfolio = {

    ///:: Initialize.
    Init: function () {

        /// :: Bind events.
        /// :: Portfolio.ExperienceSlide.Bind();
        Portfolio.Profile.Bind();
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

            /// :: Trigger a click.
            profileEmail.addEventListener('click', function () {

                /// :: Copy my email.
                Portfolio.Profile.Copy('E-mail', 'jhonatan.sont@gmail.com');

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
    }

}

Portfolio.Init();