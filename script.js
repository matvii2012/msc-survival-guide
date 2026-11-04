document.addEventListener('DOMContentLoaded', () => {
  // 1. При загрузке страницы добавляем класс появления
  requestAnimationFrame(() => {
    document.body.classList.add('page-loaded');
  });

  // 2. Находим ВСЕ ссылки для перехода (карточки и кнопки "Назад")
  const transitionLinks = document.querySelectorAll('.problem-card, .back-link');

  transitionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');

      // Проверяем, что ссылка ведет на другую страницу, а не просто якорь #
      if (targetUrl && targetUrl !== '#' && !targetUrl.startsWith('#')) {
        e.preventDefault(); // Задерживаем переход для анимации

        // Запускаем эффект ухода
        document.body.classList.remove('page-loaded');
        document.body.classList.add('page-exit');

        // Переходим по адресу ровно через 250 мс
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 250);
      }
    });
  });
});