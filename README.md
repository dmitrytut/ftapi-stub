Как запустить? (разработческий режим)
-------------------------------------

1. `npm i`
2. `npm run start`

Запуск на заглушках
-------------------
Для запуска на заглушках выставить переменную `APP_MOCKS=1`, например:
`APP_MOCKS=1 NODE_ENV=localhost npm run start`

Сборка проекта в production режиме
----------------------------------
1. `npm i`
2. `npm run build`
3. После чего можно проверить сборку командой `NODE_ENV=production node ./.build/server.js`

Как собрать docker
------------------
Build docker:
`npm run docker-build`

Push image:
`npm run docker-push`

Запустить контейнер
-------------------
/////// `docker run -d -p 8080:8080 --name ufr-stmt-frontend ufr-test.moscow.alfaintra.net:5000/ufr-stmt-frontend:0.0.10`

Развернуть на dev (перейти в директорию ../ufr-stmt-scripts)
------------------------------------------------------------
/////// `ansible-playbook -i development --tags ufr-stmt-frontend play-mesos.yml`