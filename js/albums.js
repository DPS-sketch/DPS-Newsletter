(function () {
  const base = 'assets/october-2026/';
  const image = (slug, caption) => ({ src: base + slug + '.webp', thumb: base + slug + '-thumb.webp', caption });
  window.DPS_ALBUMS = {
    'vision-casting': {
      title: '비전 캐스팅 사진 앨범',
      photos: [
        image('vision-kanpur', '칸푸르 VC'), image('vision-lucknow', '럭나우 VC'),
        image('vision-varanasi', '바라나시 VC'), image('vision-patna-nalanda', '파트타&날란다 VC'),
        image('vision-amritsar', '암리차르 VC'), image('vision-ambala', '암발라 VC'),
        image('vision-shimla', '쉼라 VC'), image('vision-patna-nalanda-lecture', '파트타&날란다 VC 특강')
      ]
    },
    'regional-campus': {
      title: '지역 캠퍼스 모임 사진 앨범',
      photos: [
        image('regional-kanpur', '칸푸르 재학생들'), image('regional-lucknow', '럭나우 재학생들'),
        image('regional-varanasi', '바라나시 재학생들'), image('regional-amritsar', '암리차르 재학생들'),
        image('regional-ambala', '암발라 재학생들'), image('regional-shimla', '쉼라 재학생과')
      ]
    },
    ordination: {
      title: '목사 안수식 사진 앨범',
      photos: Array.from({ length: 17 }, (_, index) => image('ordination-' + String(index + 1).padStart(2, '0'), '안수식' + String(index + 1).padStart(2, '0')))
    }
  };
})();
