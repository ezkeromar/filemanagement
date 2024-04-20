<?php

namespace App\Services;

use Illuminate\Support\Pluralizer;

class CustomStubService
{
    protected static $files;

    protected static $filename;

    protected static $name;

    protected static $namespace;

    protected static $full_path;

    public static function of($files, $filename, $name, $namespace, $full_path)
    {
        try {
            self::$files = $files;
            self::$filename = $filename;
            self::$name = $name;
            self::$namespace = $namespace;
            self::$full_path = $full_path;

            // create file's folder
            self::makeDir(dirname(self::$full_path));

            // get file content
            $content = self::getSourceFile();

            // create file
            if (!self::$files->exists(self::$full_path)) {
                self::$files->put(self::$full_path, $content);

                return 'File Created Successfully';
            }

            return 'File Already Exists';
        } catch (\Exception $e) {
            \Log::error('Error occurred while creating file: '.$e->getMessage());
            throw $e;
        }
    }

    private static function makeDir($path)
    {
        try {

            if (!self::$files->isDirectory($path)) {
                self::$files->makeDirectory($path, 0777, true, true);
            }
        } catch (\Exception $e) {
            \Log::error('Error occurred while creating directory: '.$e->getMessage());
            throw $e;
        }
    }

    private static function getSourceFile()
    {
        try {
            $stub = __DIR__.'/../../stubs/'.self::$filename;

            $vars = [
                'NAMESPACE' => self::$namespace,
                'CLASSNAME' => ucwords(Pluralizer::singular(self::$name)),
                'LOWERCLASSNAME' => strtolower(ucwords(Pluralizer::singular(self::$name))),
            ];

            return self::getStubContent($stub, $vars);
        } catch (\Exception $e) {
            \Log::error('Error occurred while getting source file: '.$e->getMessage());
            throw $e;
        }
    }

    private static function getStubContent($stub, $stub_vars = [])
    {
        try {
            $content = file_get_contents($stub);

            foreach ($stub_vars as $name => $value) {
                $content = str_replace('{{'.$name.'}}', $value, $content);
            }

            return $content;
        } catch (\Exception $e) {
            \Log::error('Error occurred while getting stub content: '.$e->getMessage());
            throw $e;
        }
    }
}
