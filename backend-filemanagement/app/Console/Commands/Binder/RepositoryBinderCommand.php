<?php

namespace App\Console\Commands\Binder;

use Illuminate\Console\Command;

class RepositoryBinderCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bind:repository {abstract} {concrete}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Bind repository abstract and repository concrete classes in RepositoryServiceProvider';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $concrete = $this->argument('concrete');
        $abstract = $this->argument('abstract');

        $providerFile = app_path('Providers/RepositoryServiceProvider.php');
        $providerContents = file_get_contents($providerFile);

        if (strpos($providerContents, "bind({$abstract}::class, {$concrete}::class);") !== false) {
            $this->error("Binding for {$abstract} already exists in RepositoryServiceProvider.");
        } else {
            $useStatements = "use App\\Interfaces\\RepositoryInterfaces\\{$abstract};\nuse App\\Repositories\\{$concrete};\r";
            $namespacePosition = strpos($providerContents, 'namespace App\Providers;');

            if ($namespacePosition !== false) {
                $providerContents = substr_replace($providerContents, $useStatements, $namespacePosition + strlen('namespace App\Providers;\n'), 0);
            }

            $binding = "\$this->app->bind({$abstract}::class, {$concrete}::class);";
            $providerContents = preg_replace(
                '/public function register\(\)\s*{/',
                "public function register()\n    {\n      {$binding}",
                $providerContents
            );

            $this->info("Binding for {$abstract} has been added to RepositoryServiceProvider in the register() method.");
            file_put_contents($providerFile, $providerContents);
        }
    }
}
