(function () {
  const form = document.querySelector('#editor-form');
  const fileInput = document.querySelector('#content-file');
  const loadStatus = document.querySelector('#load-status');
  let content;
  const set = (name, value) => { const field = form.elements[name]; if (field) field.value = value ?? ''; };
  const get = name => form.elements[name]?.value.trim() ?? '';
  const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
  function render(data) {
    content = data;
    set('meta.title', content.meta.title); set('brand.koreanName', content.brand.koreanName); set('hero.eyebrow', content.hero.eyebrow); set('hero.title', content.hero.title); set('hero.summary', content.hero.summary);
    document.querySelector('#statistics').innerHTML = content.statistics.map((item, index) => `<div class="stat-input"><label>숫자<input name="stat-value-${index}" value="${escape(item.value)}"></label><label>설명<input name="stat-label-${index}" value="${escape(item.label)}"></label></div>`).join('');
    document.querySelector('#news').innerHTML = content.news.map((item, index) => `<div class="news-input"><h3>소식 ${index + 1}</h3><label>제목<input name="news-title-${index}" value="${escape(item.title)}"></label><label>본문<textarea name="news-body-${index}" rows="5">${escape(item.body)}</textarea></label></div>`).join('');
    set('prayerRequests', content.prayerRequests.join('\n')); set('support.title', content.support.title); set('support.body', content.support.body); set('support.account', content.support.account); set('support.contact', content.support.contact);
    loadStatus.textContent = '불러왔습니다. 아래 내용을 수정한 뒤, 맨 아래 내려받기 버튼을 누르세요.';
  }
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { try { render(JSON.parse(reader.result)); } catch { loadStatus.textContent = '파일을 읽지 못했습니다. content 폴더의 newsletter.json 파일을 선택해 주세요.'; } };
    reader.readAsText(file, 'utf-8');
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!content) { loadStatus.textContent = '먼저 “newsletter.json 파일 선택” 버튼으로 기존 파일을 불러와 주세요.'; return; }
    content.meta.title = get('meta.title'); content.brand.koreanName = get('brand.koreanName'); content.hero.eyebrow = get('hero.eyebrow'); content.hero.title = get('hero.title'); content.hero.summary = get('hero.summary');
    content.statistics.forEach((item, index) => { item.value = get(`stat-value-${index}`); item.label = get(`stat-label-${index}`); });
    content.news.forEach((item, index) => { item.title = get(`news-title-${index}`); item.body = get(`news-body-${index}`); });
    content.prayerRequests = get('prayerRequests').split('\n').map(line => line.trim()).filter(Boolean);
    content.support.title = get('support.title'); content.support.body = get('support.body'); content.support.account = get('support.account'); content.support.contact = get('support.contact');
    const file = new Blob([JSON.stringify(content, null, 2)], { type:'application/json;charset=utf-8' }); const url = URL.createObjectURL(file); const link = document.createElement('a'); link.href = url; link.download = 'newsletter.json'; link.click(); URL.revokeObjectURL(url);
    document.querySelector('#notice').textContent = '저장되었습니다. 다운로드 폴더의 newsletter.json 파일을 content 폴더의 기존 파일과 교체해 주세요.';
  });
})();
