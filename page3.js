const events = [
    {
        year: "1961",
        title: "Первый полёт человека в космос",
        description: "Юрий Гагарин на корабле «Восток-1» совершил орбитальный полёт, длившийся 108 минут. Это событие открыло эру пилотируемой космонавтики.",
        image: "гагарнин.jpg"
    },
    {
        year: "1965",
        title: "Первый выход в открытый космос",
        description: "Алексей Леонов в течение 12 минут находился вне корабля «Восход-2», доказав возможность работы человека в открытом космосе.",
        image: "леонов.jpg"
    },
    {
        year: "1969",
        title: "Высадка человека на Луну",
        description: "Нил Армстронг и Базз Олдрин стали первыми людьми, ступившими на поверхность Луны в рамках миссии «Аполлон-11».",
        image: "луна.jpg"
    },
    {
        year: "1981",
        title: "Первый полёт многоразового корабля",
        description: "Старт шаттла «Колумбия» положил начало эре многоразовых космических систем, значительно снизив стоимость доставки грузов на орбиту.",
        image: "шаттл.jpg"
    },
    {
        year: "1998",
        title: "Начало строительства МКС",
        description: "Запущен первый модуль «Заря» Международной космической станции — крупнейшего совместного проекта в истории космонавтики.",
        image: "мкс.jpg"
    },
    {
        year: "2021",
        title: "Вертолёт на Марсе",
        description: "Ingenuity совершил первый управляемый полёт на другой планете, открыв новые возможности для исследования Марса.",
        image: "шаттл.jpg"
    }
];

let currentIndex = 0;

const eventImage = document.getElementById('eventImage');
const eventTitle = document.getElementById('eventTitle');
const eventYear = document.getElementById('eventYear');
const eventDescription = document.getElementById('eventDescription');
const eventCard = document.getElementById('eventCard');

function updateEvent() {
    const ev = events[currentIndex];
    eventTitle.textContent = ev.title;
    eventYear.textContent = ev.year;
    eventDescription.textContent = ev.description;
    eventImage.src = ev.image;
    eventImage.alt = ev.title;
    
    eventImage.onerror = () => {
        eventImage.src = 'https://via.placeholder.com/500x300?text=Нет+изображения';
    };
}

function nextEvent() {
    if (currentIndex < events.length - 1) {
        currentIndex++;
        updateEvent();
    }
}

function prevEvent() {
    if (currentIndex > 0) {
        currentIndex--;
        updateEvent();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevEvent();
        e.preventDefault();
    } else if (e.key === 'ArrowRight') {
        nextEvent();
        e.preventDefault();
    }
});

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    const intensity = 30;
    const shadowX = x * intensity;
    const shadowY = y * intensity;
    eventCard.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(255, 255, 255, 0.3)`;
});

updateEvent();