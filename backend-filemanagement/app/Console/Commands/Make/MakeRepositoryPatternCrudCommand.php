<?php

namespace App\Console\Commands\Make;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class MakeRepositoryPatternCrudCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository-crud {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Model
        Artisan::call('make:model '.$this->argument('name').' -mfs');
        // Controller
        Artisan::call('make:controller '.$this->argument('name').'Controller -r');
        // Request
        Artisan::call('make:request-switch '.$this->argument('name'));
        // Repository
        Artisan::call('make:interface '.$this->argument('name').' -r');
        Artisan::call('make:repository '.$this->argument('name'));
        Artisan::call('bind:repository '.$this->argument('name').'RepositoryInterface '.$this->argument('name').'Repository');
        // Service
        Artisan::call('make:interface '.$this->argument('name').' -s');
        Artisan::call('make:service '.$this->argument('name').' -r');
        Artisan::call('bind:app '.$this->argument('name').'ServiceInterface '.$this->argument('name').'Service');

        $this->info('CRUD created successfully for ' . $this->argument('name'));
       
    }
}
