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
            'title' => 'string|nullable|max:44',
            'url' => 'string|nullable|url',
            'type' => ['required', 'numeric', 'in:1,2']
        ]);

        $link = Links::create($request->all());

        return response()->json($link);
    }

    public function update(String $id, Request $request)
    {
        $request->validate([
            'title' => 'string|nullable|max:44',
            'url' => 'string|nullable|url',
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

    public function toggle(String $id, Request $request)
    {
        $request->validate([
            'is_enabled' => ['required', 'boolean']
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

        $link->is_enabled = $request->is_enabled;
        $link->save();

        return $link->is_enabled;
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
        $uploader = new AssetsManagerController();
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
           $uploader->delete($link->thumbnail);
        }

        $uploaded =  $uploader->uploadThumbnail($request->file('image'));

        if ($uploaded['source']) {
            $link->thumbnail = $uploaded['source'];
            $link->save();

            return response()->json($uploaded, 200);
        }

        return response()->json(['message' => 'Failed to update thumbnail'], 500);

    }

    public function updatePosition(Request $request)
    {
        $request->validate([
            'ids' => 'required|string',
        ]);

        $ids = explode(',', $request->ids);
        foreach ($ids as $idx => $id) {
            $update = Links::find($id);
            $update->position = $idx + 1;
            $update->save();
        }
        return response()->json(true);
    }
}
