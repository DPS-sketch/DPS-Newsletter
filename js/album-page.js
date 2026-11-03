(function () {
  const params = new URLSearchParams(window.location.search);
  const album = window.DPS_ALBUMS[params.get('album')] || window.DPS_ALBUMS['vision-casting'];
  const esc = value => String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  const grid = document.querySelector('#album-grid');
  const title = document.querySelector('#album-title');
  const modal = document.querySelector('#photo-modal');
  const modalImage = document.querySelector('#modal-image');
  title.textContent = album.title;
  document.title = album.title + ' | DPS';
  grid.innerHTML = album.photos.map((photo, index) => `<figure class="album-item"><img src="${esc(photo.thumb)}" data-full="${esc(photo.src)}" alt="${esc(photo.caption)}" loading="${index < 6 ? 'eager' : 'lazy'}" decoding="async"><figcaption>${esc(photo.caption)}</figcaption></figure>`).join('');
  grid.addEventListener('click', event => {
    const image = event.target.closest('img[data-full]');
    if (!image) return;
    modalImage.src = image.dataset.full;
    modalImage.alt = image.alt;
    modal.showModal();
  });
  modal.querySelector('button').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
})();
