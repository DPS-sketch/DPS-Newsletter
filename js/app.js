(async function () {
  const root = document.querySelector('#newsletter');
  const esc = (value = '') => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const image = (source, alt, className = '') => source ? `<img class="${className}" src="${esc(source)}" alt="${esc(alt)}" loading="lazy">` : '';
  const paragraphs = values => (values || []).map(value => `<p>${esc(value)}</p>`).join('');
  const figures = images => (images || []).map(item => `<figure>${image(item.src, item.alt, 'article-image')}${item.caption ? `<figcaption>${esc(item.caption)}</figcaption>` : ''}</figure>`).join('');
  const article = section => `<section class="article-section"><p class="eyebrow">${esc(section.label)}</p>${section.title ? `<h2 class="section-heading">${esc(section.title)}</h2>` : ''}${(section.blocks || []).map(block => `<div class="article-block">${block.title ? `<h3 class="article-subheading">${esc(block.title)}</h3>` : ''}${paragraphs(block.paragraphs)}<div class="image-gallery gallery-${Math.min((block.images || []).length, 2)}">${figures(block.images)}</div></div>`).join('')}</section>`;
  const story = item => `<article class="student-card">${image(item.image, item.alt, 'student-photo')}<div><h3>${esc(item.title)}</h3><blockquote>${(item.quote || '').split('\n\n').map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}</blockquote><cite>— ${esc(item.name)} · ${esc(item.role)}</cite></div></article>`;
  const render = d => `<div class="shell"><header class="hero"><div class="brand">${image(d.brand.logo, d.brand.logoAlt, 'brand-logo')}<span>${esc(d.brand.name)}</span></div><p class="hero-edition">${esc(d.hero.eyebrow)}</p><div class="hero-copy"><h1>${esc(d.hero.title).replace(/\n/g, '<br>')}</h1>${d.hero.summary ? `<p class="hero-summary">${esc(d.hero.summary)}</p>` : ''}</div><aside class="core-lessons"><p>${esc(d.brand.coreLessonsTitle)}</p><ol>${(d.brand.coreLessons || []).map(item => `<li><span>${esc(item.order)}</span> <strong>${esc(item.text)}</strong></li>`).join('')}</ol></aside></header><div class="content">${(d.articles || []).map(article).join('')}<section class="student-stories"><p class="eyebrow">STUDENT STORY</p><h2 class="section-heading">학생 간증</h2><div class="student-grid">${(d.studentStories || []).map(story).join('')}</div></section><section class="prayer"><p class="eyebrow">PRAYER REQUEST</p><h2 class="section-heading">함께 기도해주세요.</h2><ul class="prayer-list">${(d.prayerRequests || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul></section>${d.support ? `<section class="support"><div><p class="eyebrow">PARTNERSHIP</p><h2>${esc(d.support.title)}</h2><p>${esc(d.support.body)}</p></div><dl class="details"><dt>${esc(d.support.accountLabel)}</dt><dd>${(d.support.accounts || []).map(esc).join('<br><br>')}</dd></dl></section>` : ''}<nav class="archive"><h2 class="section-heading">지난 소식</h2><div class="archive-list">${(d.archive || []).map(item => `<a href="${esc(item.url)}">${esc(item.label)} →</a>`).join('')}</div></nav></div><footer><p>${esc(d.brand.koreanName)} · ${esc(d.footer.address)}</p><p>${esc(d.footer.copyright)}</p></footer></div>`;
  try {
    const response = await fetch('content/newsletter.json');
    if (!response.ok) throw new Error('콘텐츠 파일을 찾을 수 없습니다.');
    const data = await response.json();
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.meta.shareDescription || data.meta.title);
    root.innerHTML = render(data);
  } catch (error) {
    root.innerHTML = `<p class="loading">${esc(error.message)}<br>로컬에서 보려면 README의 미리보기 방법을 따라 주세요.</p>`;
  }
})();
