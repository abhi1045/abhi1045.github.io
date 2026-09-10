/* Single place to change site URLs. GitHub Pages is static HTML, so a
   .env file cannot be read in the browser — this file is the equivalent.
   Update resumeUrl here and every Resume / Download CV link follows. */
const SITE_CONFIG = {
  resumeUrl:
    "https://drive.google.com/file/d/1HMO_v3RnKc1r7ZyzjzQ4Rjx6C5I69br1/view",
};

document.querySelectorAll("[data-resume-link]").forEach((link) => {
  link.href = SITE_CONFIG.resumeUrl;
});
