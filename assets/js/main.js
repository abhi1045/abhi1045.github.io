/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== QUALIFICATION TIMELINE ====================*/
/* Places each block against a shared time axis so its height matches how
   long that role or degree lasted. Dates come from the data-start /
   data-end attributes in the markup ("YYYY-MM", or "present").
   The axis spans only the columns currently shown, so hiding a column
   shrinks the timeline to the remaining dates. */
const timeline = document.querySelector('.qualification__sections')
let renderQualificationTimeline = () => {}

if (timeline) {
    const axis = timeline.querySelector('.qualification__axis')
    const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000
    const PX_PER_YEAR = 88
    /* Two labels closer than this on screen get merged into one */
    const MIN_LABEL_GAP_PX = 18
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const toDate = (value) => {
        if (!value || value === 'present') return new Date()
        const [year, month] = value.split('-').map(Number)
        if (!year) return new Date()
        return new Date(year, (month || 1) - 1, 1)
    }

    const shortYear = (date) => "'" + String(date.getFullYear()).slice(-2)

    const formatRange = (from, to) => {
        const start = new Date(from)
        const end = new Date(to)

        if (from === to) {
            return MONTHS[start.getMonth()] + ' ' + shortYear(start)
        }
        if (start.getFullYear() === end.getFullYear()) {
            return MONTHS[start.getMonth()] + '-' + MONTHS[end.getMonth()] + ' ' + shortYear(start)
        }
        return MONTHS[start.getMonth()] + ' ' + shortYear(start) +
            '-' + MONTHS[end.getMonth()] + ' ' + shortYear(end)
    }

    renderQualificationTimeline = () => {
        const visible = timeline.querySelectorAll(
            '.qualification__active[data-content] .qualification__block'
        )
        const spans = Array.from(visible).map(block => ({
            block,
            start: toDate(block.dataset.start).getTime(),
            end: toDate(block.dataset.end).getTime()
        }))

        if (axis) {
            while (axis.firstChild) axis.removeChild(axis.firstChild)
        }

        timeline.classList.toggle('qualification__sections--empty', spans.length === 0)

        if (!spans.length) {
            timeline.style.setProperty('--timeline-height', '0px')
            return
        }

        /* Newest at the top, bounded by the visible blocks only */
        const top = Math.max(...spans.map(span => span.end))
        const bottom = Math.min(...spans.map(span => span.start))
        const total = top - bottom

        timeline.style.setProperty(
            '--timeline-height',
            Math.round((total / YEAR_MS) * PX_PER_YEAR) + 'px'
        )

        spans.forEach(({ block, start, end }) => {
            block.style.setProperty('--block-top', ((top - end) / total) * 100 + '%')
            block.style.setProperty('--block-height', ((end - start) / total) * 100 + '%')
        })

        /* Label the axis with the start/end of each visible block. Dates that
           would land on top of each other are merged into one range label. */
        if (axis) {
            const mergeWithin = (MIN_LABEL_GAP_PX / PX_PER_YEAR) * YEAR_MS
            const points = Array.from(
                new Set(spans.flatMap(span => [span.start, span.end]))
            ).sort((a, b) => b - a)

            const groups = []
            points.forEach(time => {
                const current = groups[groups.length - 1]
                if (current && current[current.length - 1] - time <= mergeWithin) {
                    current.push(time)
                } else {
                    groups.push([time])
                }
            })

            groups.forEach(group => {
                const earliest = group[group.length - 1]
                const latest = group[0]
                const tick = document.createElement('span')
                tick.className = 'qualification__tick'
                tick.textContent = formatRange(earliest, latest)
                tick.style.setProperty(
                    '--tick-top',
                    ((top - (earliest + latest) / 2) / total) * 100 + '%'
                )
                axis.appendChild(tick)
            })
        }
    }

    renderQualificationTimeline()
}

/*==================== QUALIFICATION TOGGLE ====================*/
const tabs = document.querySelectorAll('[data-target]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)
        if (!target) return

        target.classList.toggle('qualification__active')
        tab.classList.toggle('qualification__active')
        renderQualificationTimeline()
    })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
}) 

modalCloses.forEach(modalClose => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.swiper-container', {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // mousewheel: true,
    keyboard: true,
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    cssMode: true,
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }
});


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})