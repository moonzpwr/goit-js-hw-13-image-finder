import './styles/main.css';
import ImageAPIservise from './js/apiService';//импортируем класс
import imageTpl from './tamplates/img-card.hbs';


//---REFS---
const searchFormRef = document.querySelector('#search-form')
const loadMoreBtnRef = document.querySelector('[data-action="load-more"]')
const galleryContainerRef = document.querySelector('.gallery')

const API = new ImageAPIservise();//создаем экземпляр класса

searchFormRef.addEventListener('submit', onClickSearch) //слушатель на первый поиск
loadMoreBtnRef.addEventListener('click', onClickLoadMore)//слушатель на догрузку изображений


function onClickSearch(event) { 
    event.preventDefault();//не перезагружаем страницу
    API.query= event.currentTarget.elements.query.value // записываем в свойство класса значение из поисковой строки
    API.resetPage();//сбрасываем номер страницы для нового запроса
    clearMarkup()//очищаем разметку что-бы 1 страница не повторялась
    loadMoreBtnRef.classList.remove('visually-hidden')//показываем кнопку "закгрузить больше"
    API.fetchImages().then(addMarkup);//вызывыаем метод класса, по сути фетч
}

function onClickLoadMore() { 
    API.fetchImages().then(addMarkup).then(scrollPage);//вызывыаем метод класса и скролим страницу
}

function scrollPage() {
    const { y } = galleryContainerRef.getBoundingClientRect();
    const screenHeight = document.documentElement.clientHeight;
    window.scrollTo({
        left: 0,
        top: screenHeight - y - 150,
        behavior: 'smooth'
    })
}

function addMarkup(imageCard) { 
    galleryContainerRef.insertAdjacentHTML('beforeend', imageTpl(imageCard))
}

function clearMarkup() { 
    galleryContainerRef.innerHTML = "";
}

