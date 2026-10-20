
FROM php:8.3-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       libzip-dev \
       libonig-dev \
       unzip \
    && docker-php-ext-install \
       pdo_mysql \
       mysqli \
       mbstring \
       zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

COPY .devcontainer/php/apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/project
