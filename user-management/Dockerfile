FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip intl mbstring

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Cache Composer dependencies
COPY composer.json composer.lock ./
RUN composer install --prefer-dist --no-scripts --no-progress --no-suggest --no-interaction

# Install PHP dependencies
RUN composer install --prefer-dist --no-progress --no-suggest --no-interaction

CMD ["php-fpm"]