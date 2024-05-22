<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Document;
use App\Services\AuthService;
use Intervention\Image\Laravel\Facades\Image;

class testController extends Controller
{
    public function runScript()
{
    // Path to the Python script
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
        return response()->json(['message' => 'Script executed successfully', 'output' => $output]);
    } else {
        return response()->json(['message' => 'Script execution failed', 'output' => $output], 500);
    }
}

    
}
