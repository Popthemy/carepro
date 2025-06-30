
/* 
1. When i click on a nav section it should show active.

2.
Get the current div that intersect the view port 
retrieve and check the anchor tag that has the same id with the div
change it class to include  active.

*/

const section = document.querySelector("section");
const divs = section.querySelectorAll('div[id]');
const sidebar = document.querySelector(".sidebar-nav");

const sidebarLi = sidebar.querySelectorAll("li");
let currentActiveId;

// function
const activateSidebar = function(element){
  if (!element || element.classList.contains("sidebar-brand")) return;
  sidebarLi.forEach((li) => li.classList.remove("sidebar__li--active"));
  element.classList.add("sidebar__li--active");
}

// event listener
sidebar.addEventListener('click', function(e){
  const li= e.target.closest("li");
  activateSidebar(li);
})

const visibilityMap = new Map();

const sidebarCallback = function(entries, observer){
  entries.forEach(entry=> {
    visibilityMap.set(entry.target.id, entry.intersectionRatio);
  })

  let maxRatio = 0;
  let maxId = null;

  for (const [id,ratio] of visibilityMap.entries()) {
    if(ratio > maxRatio){
      maxRatio = ratio;
      maxId = id;
    }
  }
  // console.log(maxRatio, maxId);

  if ( maxId !== currentActiveId) {
    currentActiveId = maxId;
    const link = sidebar.querySelector(`a[href="#${currentActiveId}"]`);
    activateSidebar(link.closest('li'));
  }
}

const sidebarObserver = new IntersectionObserver(sidebarCallback, {
  root: null,
  threshold: [0, 0.25, 0.5, 0.75],
});

divs.forEach(div => {
  sidebarObserver.observe(div)
})
