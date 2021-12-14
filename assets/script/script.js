const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const app = $('.app');
const pages = Array.from(app.querySelectorAll('.paginations li'));
for(var page of pages){
    if(page.classList.contains('enable')){
        var pageIndicator = page.querySelector('i.fa-circle');
        pageIndicator.classList.add('fas');
    }
}