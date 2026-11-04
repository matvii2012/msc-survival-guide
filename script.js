// Обработка плавных переходов между страницами (если они у тебя были настроены)
document.addEventListener('DOMContentLoaded', () => {
  // Логика отправки формы в Telegram-бот
  const feedbackForm = document.querySelector('form');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const contactInput = document.getElementById('contact');
      const descInput = document.getElementById('problem-desc');
      const submitBtn = feedbackForm.querySelector('button[type="submit"]');

      const contact = contactInput.value.trim();
      const desc = descInput.value.trim();

      if (!contact || !desc) return;

      const TELEGRAM_BOT_TOKEN = '9133495733:AAH_Cuw9e4_m3KilcqEnpDpKTosOji92NVE';
      const TELEGRAM_CHAT_ID = '7887312215';

      // Меняем текст кнопки на время отправки
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Отправка... 🛠️';
      submitBtn.disabled = true;

      const messageText = `🛠 <b>Новая заявка по Satsuma GT!</b>\n\n👤 <b>Контакт:</b> ${contact}\n📝 <b>Симптомы:</b>\n${desc}`;

      try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
            parse_mode: 'HTML'
          })
        });

        if (response.ok) {
          alert('Спасибо, механик! Заявка улетела в Telegram. Скоро добавим решение на сайт.');
          feedbackForm.reset();
        } else {
          alert('Ошибка при отправке. Проверь токен или chat_id.');
        }
      } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        alert('Не удалось связаться с ботом. Проверь интернет.');
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
});