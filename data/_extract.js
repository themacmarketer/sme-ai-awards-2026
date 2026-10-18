(()=>{
  const txt = el => el ? el.textContent.replace(/\s+/g,' ').trim() : null;
  const all = el => el ? [...el.querySelectorAll(':scope > *')].map(txt).filter(Boolean) : [];
  const out = [];
  document.querySelectorAll('.winner-item').forEach((w, i) => {
    const stats = [...w.querySelectorAll('.stat-info-holder')].map(s => ({
      main: txt(s.querySelector('.stat-desc.main')),
      sub: txt(s.querySelector('.stat-desc.sub'))
    }));
    const challenges = [...w.querySelectorAll('.challenge-item')].map(c => ({
      title: txt(c.querySelector('.challenge-title')),
      desc: txt(c.querySelector('.challenge-desc'))
    }));
    const solutionItems = [...w.querySelectorAll('.solution-item')].map(s => ({
      title: txt(s.querySelector('.solution-title')),
      desc: txt(s.querySelector('.solution-desc'))
    }));
    // find which .winners list this belongs to
    let p = w.parentElement, listIdx = null, guard = 0;
    while (p && guard++ < 12) {
      if (p.classList && p.classList.contains('winners')) {
        const lists = [...document.querySelectorAll('.winners')];
        listIdx = lists.indexOf(p);
        break;
      }
      p = p.parentElement;
    }
    out.push({
      index: i,
      listIndex: listIdx,
      target: w.getAttribute('data-target'),
      name: txt(w.querySelector('.winner-name')),
      tagline: txt(w.querySelector('.winner-solution-used')),
      sectors: [...w.querySelectorAll('.sector-label')].map(txt),
      logo: (w.querySelector('.winner-logo-holder img')||{}).src || null,
      description: txt(w.querySelector('.description')),
      stats,
      challenges,
      solution: {
        intro: txt(w.querySelector('.solution-intro')),
        descMain: txt(w.querySelector('.solution-desc.main')),
        descSub: txt(w.querySelector('.solution-desc.sub')),
        items: solutionItems
      }
    });
  });
  // category labels
  const cats = [...document.querySelectorAll('.winners')].map((lst, i) => {
    let prev = lst.closest('.award-category-holder') || lst.parentElement;
    return { i, label: txt(prev).slice(0, 40) };
  });
  return JSON.stringify({ cats, winners: out });
})()
