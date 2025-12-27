<?php

namespace App\Http\Controllers;

use App\Enum\PermissionsEnum;
use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $user = $request->user();

        if (! $user || ! $user->can(PermissionsEnum::ManageComments->value)) {
            abort(403);
        }

        $data = $request->validate([
            'comment' => ['required', 'string'],
        ]);

        Comment::create([
            'feature_id' => $feature->id,
            'user_id' => $user->id,
            'comment' => $data['comment'],
        ]);

        return to_route('features.show', $feature->id);
    }
}
