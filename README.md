# Тестовое задание Frontend

Данный проект представляет собой главную страницу сервиса галереи картин. Интегрирован с API. Реализован в рамках тестового задания на позицию стажера.

Ссылка на GitHub Pages: https://andrey-2020.github.io/Frontend_test_task/

Ссылка на макет макет в figma страница общий макет: [Вкладка Макеты](https://www.figma.com/file/Gv0bNfikwZiuydOrdNz49o/FWT-Front-end-%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-(Community)?node-id=304-50)

Ссылка на макет макет в figma страница UI-kit: [Вкладка UI-kit](https://www.figma.com/file/Gv0bNfikwZiuydOrdNz49o/FWT-Front-end-%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-(Community)?node-id=523-11)

## Технологии
- React JS. Использовал функциональные компоненты и хуки состояния, а также хуки эффекта с зависимостями. 
- Для реализации ajax-запроса использовал fetch в сочетании с URLSearchParams.toString. На вход подавал словарь с полями запроса. Этот словарь использовал в качестве зависимости в хуке эффекта React.useEffect. React сам знает о том, когда эффект нужно перезапустить и получить с помощью ajax-запроса новый набор отфильтрованных картин.
- Для селектов и пагинации использовал ui библиотеку fwt-internship-uikit.
- Для удобного условного объединения имен классов вместе использовал утилиту classnames.
- Использовал препроцессоры для стилей.
- Тема меняется с помощью реакт контекста и хранится в localStorage.
- Ховер сделан с помощью css.

### Проблемы, с которыми я столкнулся
- Запрос для получения изображения для тега <img src={`${options.url}${card.imageUrl}`}/> возвращает ошибку ERR_CONTENT_LENGTH_MISMATCH 200 (OK) примерно в 7 случаях из 10. Из-за чего мне пришлось сделать циклические запросы с помощью атрибута onError тега img. Понимаю, что это плохая практика, но выбора нет. Смотреть на белые квадраты смысла нет. 
Image (https://test-front.framework.team/images/The_sun.jpeg)
- В макете не изображен случай длинного текста и кнопки удаления фильтра. Это на том участке где с текстом National Museum of Art, Architect... просят отступ в 10px от трея, но почему-то на этом селекторе нет кнопки сброса фильтра. Помимо этого макет содержит ряд незначительных противоречий. Не описано как должна вести себя верстка  в интервале между фиксированными значениями. Реализовал спорные моменты на своё усмотрение.
- Библиотека fwt-internship-uikit не очень удобна для использования, поэтому мне пришлось изрядно повозиться для её применения.
- API не возвращает сколько всего страниц картин имеется для данного запроса. Пришлось делать по два запроса вместо одного.

### Как запустить проект:
Для запуска проекта необходимо клонировать репозиторий https://github.com/Andrey-2020/Frontend_test_task.git

В директории проекта запустить команду для установки всех зависимостей
### `npm install` 

После чего можно запустить программу:
### `npm start`

#### Автор: Медведев А.
