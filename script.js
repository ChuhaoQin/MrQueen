(() => {
  'use strict';
  const { publications, news } = window.PROFILE_CONTENT;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const external = 'target="_blank" rel="noopener noreferrer"';
  const list = document.getElementById('publication-list');
  let toastTimer;

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function renderPublications(filter = 'all') {
    const visible = publications.filter(p => filter === 'all' || p.kind === filter);
    document.getElementById('publication-count').textContent = `${visible.length} papers`;
    list.innerHTML = visible.map(p => {
      const url = p.doi ? `https://doi.org/${p.doi}` : `https://arxiv.org/abs/${p.arxiv}`;
      const kind = {journal:'Journal article',conference:'Conference paper'}[p.kind];
      const image = p.image
        ? `<a class="paper-visual" href="${url}" ${external} aria-label="Read ${escape(p.title)}"><img src="assets/${escape(p.image)}" alt="${escape(p.imageAlt)}" loading="lazy"><span class="venue-stamp">${escape(p.short)}</span></a>`
        : `<a class="paper-visual paper-placeholder" href="${url}" ${external} aria-label="Read ${escape(p.title)}"><span class="placeholder-name">${escape(p.short)}</span><span class="placeholder-year">${p.year}</span></a>`;
      const links = [
        `<button type="button" class="details-toggle" data-panel="summary-${p.id}" aria-expanded="false" aria-controls="summary-${p.id}">TL;DR</button>`,
        `<button type="button" class="details-toggle" data-panel="bib-${p.id}" aria-expanded="false" aria-controls="bib-${p.id}">Bib</button>`,
        p.doi ? `<a href="https://doi.org/${p.doi}" ${external}>DOI ↗</a>` : '',
        p.arxiv ? `<a href="https://arxiv.org/abs/${p.arxiv}" ${external}>arXiv ↗</a>` : '',
        p.arxiv || p.pdf ? `<a href="${p.arxiv ? `https://arxiv.org/pdf/${p.arxiv}` : escape(p.pdf)}" ${external} aria-label="PDF of ${escape(p.title)}">PDF ↗</a>` : '',
        p.code ? `<a href="${escape(p.code)}" ${external}>Code ↗</a>` : '',
        p.data ? `<a href="${escape(p.data)}" ${external}>Data ↗</a>` : ''
      ].join('');
      return `<article class="publication">${image}<div class="paper-content"><div class="paper-meta"><span>${p.year}${p.revision ? ` · revised ${p.revision}` : ''}</span><span aria-hidden="true">/</span><span class="paper-kind">${kind}</span></div><h3><a href="${url}" ${external}>${escape(p.title)}</a></h3><p class="authors">${p.authors.map(author => author === 'Chuhao Qin' ? `<strong>${author}</strong>` : escape(author)).join(', ')}</p><p class="venue">${escape(p.venue)}</p><div class="paper-links">${links}</div>${p.note ? `<p class="paper-note">${escape(p.note)}</p>` : ''}<div class="paper-details" id="summary-${p.id}" hidden><p>${escape(p.summary)}</p></div><div class="paper-details" id="bib-${p.id}" hidden><div class="bib-header"><span>BibTeX</span><button type="button" class="copy-button" data-copy="${p.id}">Copy citation</button></div><pre>${escape(p.bibtex)}</pre></div></div></article>`;
    }).join('');
  }

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      renderPublications(button.dataset.filter);
    });
  });

  list.addEventListener('click', async event => {
    const toggle = event.target.closest('.details-toggle');
    if (toggle) {
      const panel = document.getElementById(toggle.dataset.panel);
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
    }
    const copy = event.target.closest('[data-copy]');
    if (copy) {
      const citation = publications.find(p => p.id === copy.dataset.copy).bibtex;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(citation);
        showToast('Citation copied');
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(copy.closest('.paper-details').querySelector('pre'));
        selection.removeAllRanges();
        selection.addRange(range);
        showToast('Citation selected — press Ctrl+C or ⌘C to copy');
      }
    }
  });

  const newsList = document.getElementById('news-list');
  newsList.innerHTML = news.map((item,index) => `<div class="news-item"${index >= 5 ? ' hidden' : ''}><time datetime="${escape(item.date)}">${escape(item.label)}</time><p>${item.text}</p></div>`).join('');
  document.getElementById('news-more').addEventListener('click', event => {
    const button = event.currentTarget;
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    [...newsList.children].forEach((item,index) => { if (index >= 5) item.hidden = !expanded; });
    button.innerHTML = expanded ? 'Fewer updates <span aria-hidden="true">↑</span>' : 'Earlier updates <span aria-hidden="true">↓</span>';
  });

  const themeToggle = document.getElementById('theme-toggle');
  function updateThemeLabel() {
    themeToggle.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]').content = document.documentElement.dataset.theme === 'dark' ? '#19191d' : '#ffffff';
  }
  updateThemeLabel();
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('cq-theme', theme); } catch {}
    updateThemeLabel();
  });

  function setActive(id) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
    });
  }
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => setActive(link.hash.slice(1))));
  let scrollPending = false;
  function updateActive() {
    let id = 'about';
    for (const section of document.querySelectorAll('main > section')) {
      if (section.getBoundingClientRect().top <= 160) id = section.id;
    }
    setActive(id);
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateActive); }
  }, {passive:true});
  renderPublications();
  updateActive();
})();
