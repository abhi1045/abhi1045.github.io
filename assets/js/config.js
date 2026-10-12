/* Single place to change site URLs. GitHub Pages is static HTML, so a
   .env file cannot be read in the browser — this file is the equivalent.
   Update resumeUrl here and every Resume / Download CV link follows. */
const SITE_CONFIG = {
  resumeUrl:
    "https://drive.google.com/file/d/1bxBWbPAlD1iZuLG1H_4NtN4emOUYsfG7/view",
};

document.querySelectorAll("[data-resume-link]").forEach((link) => {
  link.href = SITE_CONFIG.resumeUrl;
});
