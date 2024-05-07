<?php

namespace App\Http\Controllers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class AssetsManagerController extends Controller
{
    /*
    $where
    */
    public function upload(String $path, UploadedFile $file)
    {
        $imageName = time() . '_' . $file->getFilename() . '.' . $file->extension();
        $path = Storage::putFileAs($path, $file, $imageName);
        $url = asset($path);

        return [
            "url" => $url,
            "filename" => $imageName,
            "source" => $path
        ];
    }

    public function delete(String $source) {
        return Storage::delete($source);
    }

    public function uploadAvatar(UploadedFile $file) {
        return $this->upload('avatars', $file);
    }
    public function uploadThumbnail(UploadedFile $file) {
        return $this->upload('thumbnails', $file);
    }

    public function uploadBackgroundImage(UploadedFile $file)
    {
        return $this->upload('backgrounds_images', $file);
    }
    public function uploadBackgroundVideo(UploadedFile $file)
    {
        return $this->upload('backgrounds_videos', $file);
    }
}
