// Set current year
(function(){
  // set current year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Reveal on scroll with stagger for children
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  // Map marker hover tooltip
  const map = document.querySelector('.map');
  if(map){
    const markers = map.querySelectorAll('.marker');
    markers.forEach(m=>{
      m.addEventListener('mouseenter', (e)=>{
        const name = m.getAttribute('data-name');
        const bbox = m.getBBox();
        let tip = document.createElement('div');
        tip.className = 'map-tip';
        tip.textContent = name;
        document.body.appendChild(tip);
        function move(ev){
          tip.style.left = (ev.clientX + 12) + 'px';
          tip.style.top = (ev.clientY + 12) + 'px';
        }
        move({clientX: bbox.x, clientY: bbox.y});
        window.addEventListener('mousemove', move);
        m.addEventListener('mouseleave', ()=>{ tip.remove(); window.removeEventListener('mousemove', move); }, {once:true});
      });
    });
  }
})();
