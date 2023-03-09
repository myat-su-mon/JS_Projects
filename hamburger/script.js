const btn = document.getElementById('btn');
const btn = document.getElementById('nav');

btn.addEventListener("click", ()=> {
    nav.classList.toggle('active');
    btn.classList.toggle('active');
});