var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},l={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in l){var o=l[e];delete l[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){l[e]=t},e.parcelRequired7c6=o);var r=o("PqWVr");const n=document.querySelector(".gallery_film"),i=document.querySelector(".ul"),a=document.querySelectorAll(".menu_a"),s=document.querySelector(".section1"),c=document.querySelector("header"),d=document.querySelector(".div"),y=document.querySelector(".p1");function u({poster_path:e,title:t,release_date:l,id:o,genres:r}){const n=new Date(l).getFullYear();return`\n      <div class="film" id="${o}">\n        <img src="https://image.tmdb.org/t/p/w500/${e}" alt="${t}">\n        <h1>${t}</h1>\n        <p><span>${r[0].name}</span>${n}</p>\n      </div>`}i.addEventListener("click",(async e=>{if(e.preventDefault(),"A"===e.target.nodeName&&!e.target.closest(".js_a"))if(a.forEach((e=>{e.classList.toggle("js_a")})),"my library"===e.target.textContent.toLowerCase()){if(c.classList.add("mylibrary"),d.style.visibility="hidden",s.style.display="none",n.innerHTML="",0===localStorage.length)return void(y.style.display="block");y.style.display="none";let e="";for(let t=0;t<localStorage.length;t+=1){const l=localStorage.key(t),o=localStorage.getItem(l);console.log(`Ключ: ${l}, Значення: ${o}`);const r=`https://api.themoviedb.org/3/movie/${o}?api_key=51543c3005cb7c47e497dbf65a114fb5`;try{const t=await fetch(r);if(!t.ok)throw new Error("Помилка запиту до API");e+=u(await t.json()),n.innerHTML=e}catch(e){console.error("Помилка запиту до API:",e)}}}else c.classList.remove("mylibrary"),d.style.visibility="visible",y.style.display="none",(0,r.displayFilms)(1),s.style.display="block"}));
//# sourceMappingURL=index.5bf641e0.js.map