(function () {
  const emailSvg = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3" width="13" height="10" rx="1" stroke="currentColor" stroke-width="1"/><path d="M1 4.5L7.5 9L14 4.5" stroke="currentColor" stroke-width="1"/></svg>`;
  const scholarSvg = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="5" r="3" stroke="currentColor" stroke-width="1"/><path d="M2 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" stroke-width="1"/></svg>`;
  const linkedinSvg = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="13" height="13" rx="2" stroke="currentColor" stroke-width="1"/><path d="M4 7v5M4 5v.01M7 12V9c0-1 .5-2 2-2s2 1 2 2v3" stroke="currentColor" stroke-width="1"/></svg>`;
  const githubSvg = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5C4.2 1.5 1.5 4.2 1.5 7.5c0 2.7 1.75 4.96 4.18 5.77.3.06.42-.13.42-.29v-1.01c-1.7.37-2.06-.82-2.06-.82-.28-.7-.68-.89-.68-.89-.56-.38.04-.37.04-.37.62.04.94.63.94.63.55.94 1.43.67 1.78.51.06-.4.21-.67.39-.82-1.36-.15-2.79-.68-2.79-3.02 0-.67.24-1.21.63-1.64-.06-.16-.27-.78.06-1.62 0 0 .51-.16 1.68.63a5.8 5.8 0 013.06 0c1.16-.79 1.67-.63 1.67-.63.34.84.13 1.46.06 1.62.39.43.63.97.63 1.64 0 2.35-1.43 2.87-2.8 3.02.22.19.42.57.42 1.15v1.7c0 .16.11.36.42.3A6 6 0 0013.5 7.5c0-3.3-2.7-6-6-6z" fill="currentColor"/></svg>`;

  const html = `
    <div class="lb" id="lb">
      <span class="lb-close" id="lb-close">✕</span>
      <div class="lb-prev" id="lb-prev">&#8592;</div>
      <img class="lb-img" id="lb-img" src="" alt="">
      <div class="lb-next" id="lb-next">&#8594;</div>
      <div class="lb-counter" id="lb-counter"></div>
    </div>

    <footer>
      <div>
        <div class="fn">Akshay Bhuvaneswari Ramakrishnan</div>
        <div class="fc">Presidential Research Fellow · Georgia Southern University</div>
        <div class="f-socials">
          <a href="mailto:mlwithak@gmail.com" class="f-soc" aria-label="Email">${emailSvg}</a>
          <a href="https://scholar.google.com/citations?hl=en&user=EUVHa0sAAAAJ" target="_blank" rel="noopener" class="f-soc" aria-label="Google Scholar">${scholarSvg}</a>
          <a href="https://www.linkedin.com/in/akshay-bhuvaneswari-ramakrishnan-0a9286199/" target="_blank" rel="noopener" class="f-soc" aria-label="LinkedIn">${linkedinSvg}</a>
          <a href="https://github.com/AkshayBRamki" target="_blank" rel="noopener" class="f-soc" aria-label="GitHub">${githubSvg}</a>
        </div>
      </div>
      <div class="f-nav" role="navigation" aria-label="Footer navigation">
        <a href="about.html">About</a>
        <a href="research.html">Research</a>
        <a href="publications.html">Publications</a>
        <a href="workshops.html">Workshops</a>
        <a href="gallery.html">Gallery</a>
        <a href="collaborators.html">Collaborators</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="f-copy">© 2025 Akshay Bhuvaneswari Ramakrishnan · All rights reserved</div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
})();
