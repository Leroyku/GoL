# Игра "Жизнь" (Game of Life)

## Особенности

- Возможность начать игру, остановить игру, очистить поле, изменить размер поля и заполнить поле случайными клетками.
- Пользователь может добавлять живые клетки на поле, кликая мышью.

## Использование

1. Запустите `index.html` в веб-браузере или перейдите по ссылке: https://leroyku.github.io/GoL/
2. Чтобы добавить живые клетки, щёлкните мышью на холсте, либо кнопку рандомного заполнения.
3. Нажмите на кнопку "Начать игру", чтобы начать симуляцию.
4. Используйте кнопки для управления игрой: остановка, очистка поля, изменение размера.
5. Чтобы остановить игру, нажмите кнопку "Остановить игру".

## Правила игры "Жизнь"

- Любая живая клетка с меньше чем 2 или более чем 3 живыми соседями умирает (из-за одиночества или перенаселённости).
- Живая клетка с 2 или 3 живыми соседями продолжает жить.
- Мёртвая клетка с точно 3 живыми соседями становится живой (рождается новая клетка).

## Функции

### 1. `buildGrid()`

Эта функция создаёт начальное пустое поле для игры. Она создаёт двумерный массив, представляющий собой сетку клеток игрового поля. Изначально все клетки устанавливаются в состояние мёртвых (значение 0).

### 2. `isGridEmpty(grid)`

Эта функция проверяет, является ли поле пустым, то есть не содержит ли оно живых клеток. Она просматривает каждую клетку на поле и, если обнаруживает хотя бы одну живую клетку, возвращает `false`, в противном случае возвращает `true`.

### 3. `countNeighbors(grid, col, row)`

Эта функция подсчитывает количество живых соседей для определённой клетки на игровом поле. Она проходит по всем соседям клетки с заданными координатами и увеличивает счётчик `count` на единицу, если соседняя клетка живая.

### 4. `applyRules(cell, numNeighbors)`

Эта функция применяет правила игры "Жизнь" к конкретной клетке на основе количества её живых соседей. Если клетка жива и количество её соседей не соответствует правилам выживания или клетка мёртвая и количество соседей соответствует правилам рождения, то клетка изменяется на соответствующее состояние.

### 5. `nextGen(grid)`

Эта функция вычисляет следующее поколение клеток на основе текущего состояния игрового поля. Она проходит по каждой клетке, вычисляет количество её живых соседей, применяет правила игры и сохраняет результаты в новом массиве, представляющем следующее поколение.

## Технические детали

- Проект написан на языке JavaScript с использованием HTML5 Canvas для отображения игрового поля.
- Для стилей используется CSS.
- Все основные функции игры находятся в файле `script.js`.
- Файл `styles.css` отвечает за стилизацию элементов интерфейса.
