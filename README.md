## Get Started

1. Clone the repo

    ```sh
    git clone git@github.com:Parables/txc-portal.git

    cd txc-portal

    composer install

    cp .env.example .env

    php artisan key:generate

    # open in your favorite editor/IDE
    code .
    ```

2. Add the following to the .env file
    ```.env
    PASSPORT_CLIENT_ID=
    PASSPORT_CLIENT_SECRET=
    ```
3. Setup your preferred Database connection in the `env` file

4. Migrate and install passport auth

    ```sh
    php artisan migrate:fresh

    php artisan passport:install
    # copy the `Client ID` and `Client Secret` and set the `PASSPORT_CLIENT_ID` `PASSPORT_CLIENT_SECRET` respectively in the `.env` file
    ```

5. Create the Super Admin

    ```sh
    php artisan db:seed --class SuperAdminSeeder
    ```
6. Start the server and open `localhost:8000/graphql-playground` in your browser
    ```sh
    php artisan serve
    ```

7. Query for all users
    ```gql
    {
        users{
            data {
                username
                email
                phone_number
            }
        }
    }
    ```

8. If your get an Unauthenticated/Unauthorized request, Login using the Super Admin Account 
   ```gql 
   mutation{ 
       login(input: { 
           username: "super@admin.com" 
           password: "super-admin" 
       }){ 
            token_type 
            access_token 
            refresh_token 
            expires_in 
            user {
                id 
                username 
                email 
                phone_number created_at updated_at 
            } 
        } 
    } 
    ```
9. Copy and paste the value of the `access_token` field from the login data response into the `HTTP HEADER` tab below(bottom-left) of the editor like below
    ```json
    // replace ACCESS_TOKEN with the value of the `access_token` field you copied from the login response data
    {
        "AUTHORIZATION": "Bearer ACCESS_TOKEN",
    }
    ```

10. Try step 7 again to verify if login as Super-Admin was successful

> Further Reading: [Setting up Laravel + Inertia + Svelte + TailwindCss + Snowpack](./docs/FrontendSetup.md)

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).
-   [Powerful dependency injection container](https://laravel.com/docs/container).
-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).
-   [Robust background job processing](https://laravel.com/docs/queues).
-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

-   **[Vehikl](https://vehikl.com/)**
-   **[Tighten Co.](https://tighten.co)**
-   **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
-   **[64 Robots](https://64robots.com)**
-   **[Cubet Techno Labs](https://cubettech.com)**
-   **[Cyber-Duck](https://cyber-duck.co.uk)**
-   **[Many](https://www.many.co.uk)**
-   **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
-   **[DevSquad](https://devsquad.com)**
-   **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
-   **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
