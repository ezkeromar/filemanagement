<?php

namespace App\Console\Commands\Make;

use App\Services\CustomStubService;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class MakeServiceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name} {--r|repository}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a Service';

    public Filesystem $files;

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    public function handle()
    {
        $namespace = 'App\\Services';

        $stub = $this->option('repository') ? 'service.repository.stub' : 'service.stub';

        $fileType = 'Service.php';

        $full_path = base_path($namespace).'\\'.$this->argument('name').$fileType;

        $message = CustomStubService::of($this->files, $stub, $this->argument('name'), $namespace, $full_path);

        $this->info($message);
    }
}
