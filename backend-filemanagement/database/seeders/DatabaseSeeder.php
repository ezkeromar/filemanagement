<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\SecretKey;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'hamzatbib91@gmail.com',
            'password' => bcrypt('@Test1234'),
        ]);

        SecretKey::create([
            'secret_key' => "2jiXHGqKE5DH7cwDdyJZCmSndKhjvTto",
            'user_id' => 1,
        ]);

        // fun facttory plan

        Plan::factory(2)->create();
        // php artisan db:seed
    }
}
