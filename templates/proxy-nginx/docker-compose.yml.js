version: '3.0'

services:

  proxy:
    image: jwilder/nginx-proxy
    ports:
      - 80:80
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
    networks:
      - proxy

  nginx:
    image: nginx
    environment:
      - VIRTUAL_HOST=site.local
    depends_on:
      - php
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
      - VIRTUAL_HOST=phpmyadmin.local
      - PMA_HOST=mysql
      - PMA_USER=root
      - PMA_PASSWORD=root
    networks:
      - frontend
      - backend

networks:
  frontend:
  proxy:
  backend:

