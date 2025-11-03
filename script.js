document.addEventListener('DOMContentLoaded', function() {
    // Анимация карточек
    const cards = document.querySelectorAll('.card');
    const cardButtons = document.querySelectorAll('.card-btn');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    cardButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const originalText = this.textContent;
            this.textContent = "Загрузка...";
            
            setTimeout(() => {
                this.textContent = "Готово!";
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            }, 500);
        });
    });
    
    // Загадка
    const optionButtons = document.querySelectorAll('.option-btn');
    const modal = document.getElementById('congratsModal');
    const closeModal = document.querySelector('.close');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const winnerNameSpan = document.getElementById('winnerName');
    
    // Здесь вы можете изменить имя на нужное
    const winnerName = "Победитель!";
    
    optionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.answer === 'correct';
            
            // Сбрасываем все кнопки
            optionButtons.forEach(b => {
                b.classList.remove('correct', 'wrong');
                b.style.transform = '';
            });
            
            // Показываем правильный/неправильный ответ
            if (isCorrect) {
                this.classList.add('correct');
                
                // Показываем модальное окно через 1 секунду
                setTimeout(() => {
                    winnerNameSpan.textContent = winnerName;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Блокируем скролл
                }, 1000);
            } else {
                this.classList.add('wrong');
                this.style.transform = 'scale(0.95)';
                
                // Находим и подсвечиваем правильный ответ
                const correctBtn = document.querySelector('[data-answer="correct"]');
                setTimeout(() => {
                    correctBtn.classList.add('correct');
                }, 500);
            }
        });
    });
    
    // Функция закрытия модального окна
    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Разблокируем скролл
    }
    
    // Закрытие модального окна
    closeModal.addEventListener('click', closeModalFunction);
    closeModalBtn.addEventListener('click', closeModalFunction);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
    
    // Дополнительные эффекты при наведении
    const riddleOptions = document.querySelectorAll('.option-btn');
    riddleOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            if (!this.classList.contains('correct') && !this.classList.contains('wrong')) {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('correct') && !this.classList.contains('wrong')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Предотвращение масштабирования на двойной тап (для мобильных)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});
