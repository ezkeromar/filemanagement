<?php

namespace App\Helpers;

class CleanPath
{
    public static function clean($path)
    {
        // Check if running on a Windows platform
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Replace forward slashes with backslashes
            return str_replace('/', '\\', $path);
        } else {
            // Otherwise, return the path unchanged
            return $path;
        }
    }
}

