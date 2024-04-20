<?php

namespace App\Services;

use App\Exceptions\ServiceLayerExceptions\CustomStubServiceException;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class FileUploadService
{
    public function interventionUploadFile(
        $file,
        string $storageDerictory,
        string $name = '',
    ) {
            $storagePath = $storageDerictory.date('m-Y').'/';
            $fileName = date('d-H_i').'-'.time().'-'.$name.'.'.$file->getClientOriginalExtension();
            $path = storage_path('app/'.$storagePath.'/'.$fileName);
            // Check if exist storage path, and create it of not exist
            if (!Storage::exists($storagePath)) {
                Storage::makeDirectory($storagePath);
            }
           
            return date('m-Y').'/'.$fileName;
       
    }

    public function interventionUpdateFile(
        string $oldFile,
        $file,
        string $storageDerictory,
        string $name = '',
    ) {
            $this->deleteFile($storageDerictory.$oldFile);

            return $this->interventionUploadFile(
                $file,
                $storageDerictory,
                $name,
            );
     
    }

    public function uploadFile($file, $storageDerictory)
    {
            // Generate file name
            $filename = date('YmdHi').$file->getClientOriginalName();
            // Create the storage derictory link
            $storagePath = $storageDerictory.date('m-Y').'/';
            // Generate the storage derictory child link to this file
            $storagePathChild = date('m-Y').'/'.$filename;
            // Move to store the file
            Storage::putFileAs($storagePath, $file, $filename);

            // return the finale database storing name
            return $storagePathChild;
        
    }

    public function deleteFile(string $filePath)
    {
            // Create the path of the delete file
            if (Storage::exists($filePath)) {
                // Delete the file using the Storage facade
                return Storage::delete($filePath);
            }

            return false;
            
    }

    public function updateFile($oldFile, $file, $storageDerictory)
    {
            $this->deleteFile($storageDerictory.$oldFile);

            return $this->uploadFile($file, $storageDerictory);
       
    }
}
