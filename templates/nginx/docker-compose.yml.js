version: '3.0'

services:

  nginx:
    image: nginx
    depends_on:
      - php
    ports:
      - {{ port }}:80
    volumes:
      - ./docker/nginx/conf.d/default.nginx:/etc/nginx/conf.d/default.conf
      - ./html/:/var/www/html/
    networks:
      - frontend
      - backend

  php:
    build:
      context: ./docker/php
    volumes:
      - ./docker/php/php.ini:/usr/local/etc/php/php.ini
      - ./html/:/var/www/html/
    networks:
      - backend

  mysql:
    image: mysql:5.7
    volumes:
      - ./docker/mysql/data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
    networks:
      - backend

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    environment:
      - PMA_HOST=mysql
      - PMA_USER=root
      - PMA_PASSWORD=root
    networks:
      - frontend
      - backend

networks:
  frontend:
  backend:
