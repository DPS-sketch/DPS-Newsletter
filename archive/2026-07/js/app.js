(async function () {
  const root = document.querySelector('#newsletter');
  const escape = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const nl = (value = '') => escape(value).replace(/\n/g, '<br>');
  const image = (src, alt, className = '') => src ? `<img class="${className}" src="${escape(src)}" alt="${escape(alt)}" loading="lazy">` : '';
  const newsMedia = item => item.images?.length ? `<div class="news-gallery">${item.images.map((src, index) => image(src, item.imageAlts?.[index] || item.imageAlt, 'news-image')).join('')}</div>` : image(item.image, item.imageAlt, 'news-image');
  try {
    const response = await fetch('content/newsletter.json');
    if (!response.ok) throw new Error('콘텐츠 파일을 찾을 수 없습니다.');
    const d = await response.json();
    document.title = d.meta?.title || d.brand.koreanName;
    root.innerHTML = `
      <div class="shell">
        <header class="hero ${d.hero.image ? 'has-image' : ''}" ${d.hero.image ? `style="background-image:url('${escape(d.hero.image)}')"` : ''}>
          <div class="brand">${d.brand.logo ? `<img class="brand-logo" src="${escape(d.brand.logo)}" alt="${escape(d.brand.logoAlt || d.brand.name)}">` : '<span class="brand-mark">D</span>'}<span>${escape(d.brand.name)}</span></div>
          <p class="hero-edition">${escape(d.hero.eyebrow)}</p><div class="hero-copy"><h1>${nl(d.hero.title)}</h1><p class="hero-summary">${escape(d.hero.summary)}</p></div>
          ${d.brand.coreLessons?.length ? `<aside class="core-lessons" aria-label="${escape(d.brand.coreLessonsTitle)}"><p>${escape(d.brand.coreLessonsTitle)}</p><ol>${d.brand.coreLessons.map(item => `<li><span>${escape(item.order)}</span> <strong>${escape(item.text)}</strong></li>`).join('')}</ol></aside>` : ''}
        </header>
        <div class="content">
          <section class="stats" aria-label="DPS 현황">${d.statistics.map(s => `<div class="stat"><strong class="stat-value">${escape(s.value)}</strong><span class="stat-label">${escape(s.label)}</span></div>`).join('')}</section>
          <section class="news" aria-labelledby="news-heading"><h2 class="section-heading" id="news-heading">이번 학기 소식</h2><div class="news-grid">${d.news.slice().sort((a,b) => (a.order || 0) - (b.order || 0)).map(item => `<article class="news-card ${item.images?.length ? 'has-gallery' : ''}">${newsMedia(item)}<div class="news-copy"><p class="eyebrow">${escape(item.label)}</p><h3>${escape(item.title)}</h3><p>${escape(item.body)}</p></div></article>`).join('')}</div></section>
          <section class="feature" aria-label="학생 이야기"><div class="feature-copy"><p class="eyebrow">STUDENT STORY · ${escape(d.testimonial.translationLabel || 'KOREAN TRANSLATION')}</p><blockquote>“${escape(d.testimonial.quote)}”</blockquote><cite>— ${escape(d.testimonial.name)} · ${escape(d.testimonial.role)}</cite></div><div class="feature-letter"><p>${escape(d.testimonial.originalLabel || 'ORIGINAL LETTER')}</p><blockquote>${escape(d.testimonial.originalText || '')}</blockquote><cite>— Harish Chander · Karnal campus</cite></div></section>
          <section class="prayer" aria-labelledby="prayer-heading"><p class="eyebrow">PRAYER REQUESTS</p><h2 class="section-heading" id="prayer-heading">함께 기도해 주세요</h2><ul class="prayer-list">${d.prayerRequests.map(request => `<li>${escape(request)}</li>`).join('')}</ul></section>
          <section class="support" aria-labelledby="support-heading"><div><p class="eyebrow">PARTNERSHIP</p><h2 id="support-heading">${escape(d.support.title)}</h2><p>${escape(d.support.body)}</p><a class="button" href="${escape(d.support.buttonUrl)}">${escape(d.support.buttonLabel)}</a></div><dl class="details"><dt>${escape(d.support.accountLabel)}</dt><dd>${(d.support.accounts || [d.support.account]).map(account => escape(account)).join('<br><br>')}</dd></dl></section>
          ${d.archive?.length ? `<nav class="archive" aria-label="지난 뉴스레터"><h2 class="section-heading">지난 뉴스레터</h2><div class="archive-list">${d.archive.map(item => `<a href="${escape(item.url)}">${escape(item.label)} →</a>`).join('')}</div></nav>` : ''}
        </div>
        <footer><p>${escape(d.brand.koreanName)} · ${escape(d.footer.address)}</p><p>${escape(d.footer.copyright)}</p></footer>
      </div>`;
    const modal = document.querySelector('#photo-modal'); const modalImage = document.querySelector('#modal-image');
    root.querySelectorAll('img.news-image').forEach(img => img.addEventListener('click', () => { modalImage.src = img.src; modalImage.alt = img.alt; modal.showModal(); }));
    modal.addEventListener('click', event => { if (event.target === modal || event.target.matches('.modal-close')) modal.close(); });
  } catch (error) { root.innerHTML = `<p class="loading">${escape(error.message)}<br><small>로컬에서 보려면 README의 미리보기 방법을 따라 주세요.</small></p>`; }
})();
