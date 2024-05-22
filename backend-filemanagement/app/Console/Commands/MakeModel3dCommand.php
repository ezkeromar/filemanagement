<?php

namespace App\Console\Commands;

use App\Services\CustomStubService;
use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class MakeModel3dCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:model3d';
    // command to run the script
    // php artisan make:model3d


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a Model 3d';


    
       
    

    public function handle()
    {
        $scriptPath = storage_path('app/script/TripoSR/run.py');

        // Path to the input file
        $inputFilePath = storage_path('app/script/TripoSR/examples/chair.png');

        // Output directory
        $outputDir = storage_path('app/script/TripoSR/output');

        // Construct the command
        $command = sprintf(
            'python "%s" "%s" --output-dir "%s"',
            $scriptPath,
            $inputFilePath,
            $outputDir
        );

        // Execute the Python script with arguments
        $output = [];
        $returnVar = null;
        exec($command, $output, $returnVar);

        if ($returnVar === 0) {
            // return response()->json(['message' => 'Script executed successfully', 'output' => $output]);
            // info message
            $this->info('Script executed successfully' . $output);
        } else {
            // return response()->json(['message' => 'Script execution failed', 'output' => $output], 500);
            $this->error('Script execution failed' . $output);
        }
    }
}
