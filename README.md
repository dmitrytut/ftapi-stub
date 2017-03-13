[![Build Status](https://travis-ci.org/dmitrytut/ftapi-stub.svg?branch=master)](https://travis-ci.org/dmitrytut/ftapi-stub)

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

CI / CD на GitHub/TravisCI/Heroku
-------------------------------------
### Настройка GitHub
1. Зарегистрироваться на https://github.com.
2. Создать новый репозиторий.

### Настройка Heroku
1. Зарегистрироваться на https://heroku.com.
2. Установить Heroku CLI для работы с Heroku с локальной машины (optional).
3. Создать Heroku приложение через браузер или с помощью команды:
    
    ```
    heroku apps:create [APP_NAME]
    ```
    
    
### Настройка Travis CI
1. Зарегистрироваться на https://travis-ci.com.
2. Связать Travis CI с вашим репозиторием в GitHub, чтобы при изменении ветки `master` 
    происходила авто-сборка в Travis CI.
3. Установить Travis CLI для работы с Travis с локальной машины (optional).
4. Зашифровать API-ключ Heroku для использования в *.travis.yml* файле с помощью:

    http://rkh.github.io/travis-encrypt/public/index.html

    или выполнив команду:
   
    ```
    travis setup heroku
    ```
   
   или
   
   ```
   heroku login
   travis encrypt $(heroku auth:token) --add deploy.api_key
   ```
    

    
5. Вставить получившееся значение в секцию *deploy/api_key/* файла *.travis.yml*.
    Должно получиться:
    
    ```
    ...
    deploy:
      provider: heroku
      api_key:
        secure: ....        <----- Зашифрованный API-ключ
    ...
    ```
6. 
    

