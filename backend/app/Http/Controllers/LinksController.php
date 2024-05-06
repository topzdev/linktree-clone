<?php

namespace App\Http\Controllers;

use App\Models\Links;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Scalar\String_;

class LinksController extends Controller
{
    public function index(Request $request)
    {
        $links = User::find(auth()->id())->links;
        return response()->json($links);
    }

    public function show(string $id)
    {
        $link = Links::where([
            'id' => $id,
            'user_id' => auth()->id()
        ])->first();

        if (empty($link)) {
            return response()->json([
                'message' => 'Link not exist'
            ], 404);
        }
        return response()->json($link);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:44'],
            'url' => ['required', 'string', 'url'],
            'type' => ['required', 'numeric', 'in:1,2']
        ]);

        $link = Links::create($request->all());

        return response()->json($link);
    }

    public function update(String $id, Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:44'],
            'url' => ['required', 'string', 'url'],
        ]);

        $link = Links::where([
            'id' => $id,
            'user_id' => auth()->id()
        ])->first();

        if (empty($link)) {
            return response()->json([
                'message' => 'Link not exist'
            ], 404);
        }

        $link->fill($request->only('title', 'url'))->save();

        return response()->json($link);
    }

    public function destroy(String $id)
    {

        $link = Links::where([
            'id' => $id,
            'user_id' => auth()->id()
        ])->first();

        if (empty($link)) {
            return response()->json([
                'message' => 'Link not exist'
            ], 404);
        }

        $link = $link->delete();

        return response()->json($link);
    }

    public function updateThumbnail(String $id, Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust validation rules as needed
        ]);

        $link = Links::where([
            'id' => $id,
            'user_id' => auth()->id()
        ])->first();

        if (empty($link)) {
            return response()->json([
                'message' => 'Link not exist'
            ], 404);
        }

        if ($link->thumbnail) {
           AssetsManagerController::delete($link->thumbnail);
        }

        $uploaded =  AssetsManagerController::uploadThumbnail($request->file('image'));

        if ($uploaded['source']) {
            $link->thumbnail = $uploaded['source'];
            $link->save();

            return response()->json($uploaded, 200);
        }

        return response()->json(['message' => 'Failed to update thumbnail'], 500);

    }
}
