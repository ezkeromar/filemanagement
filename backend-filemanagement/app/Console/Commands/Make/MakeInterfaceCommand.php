<?php

namespace App\Console\Commands\Make;

use App\Services\CustomStubService;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class MakeInterfaceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:interface {name} {--r|repository} {--s|service}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crete a new interface';

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
        $optionInfo = $this->option('repository') ? $this->optionCheker('repository') : ($this->option('service') ? $this->optionCheker('service') : $this->optionCheker(null));

        $fullPath = base_path($optionInfo['namespace']).'\\'.$this->argument('name').$optionInfo['fileType'];
        $message = CustomStubService::of($this->files, $optionInfo['stub'], $this->argument('name'), $optionInfo['namespace'], $fullPath);

        $this->info($message);
    }

    public function optionCheker($option)
    {
        switch ($option) {
            case 'all':
                return [
                    'namespace' => 'App\\Interfaces\\RepositoryInterfaces',
                    'stub' => 'interface.repository.stub',
                    'fileType' => 'RepositoryInterface.php',
                ];

                break;

            case 'repository':
                return [
                    'namespace' => 'App\\Interfaces\\RepositoryInterfaces',
                    'stub' => 'interface.repository.stub',
                    'fileType' => 'RepositoryInterface.php',
                ];

                break;

            case 'service':
                return [
                    'namespace' => 'App\\Interfaces\\ServiceInterfaces',
                    'stub' => 'interface.service.stub',
                    'fileType' => 'ServiceInterface.php',
                ];

                break;

            default:
                return [
                    'namespace' => 'App\\Interfaces',
                    'stub' => 'interface.stub',
                    'fileType' => 'Interface.php',
                ];

                break;
        }
    }
}
