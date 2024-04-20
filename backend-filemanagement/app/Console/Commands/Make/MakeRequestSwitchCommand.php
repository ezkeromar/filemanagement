<?php

namespace App\Console\Commands\Make;

use App\Services\CustomStubService;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class MakeRequestSwitchCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:request-switch {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a Request class with methods switch';

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
        $namespace = 'App\\Http\\Requests';

        $stub = 'request.switch.stub';

        $fileType = 'Request.php';

        $full_path = base_path($namespace).'\\'.$this->argument('name').$fileType;

        $message = CustomStubService::of($this->files, $stub, $this->argument('name'), $namespace, $full_path);

        $this->info($message);
    }
}
