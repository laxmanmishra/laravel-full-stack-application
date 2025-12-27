<?php

namespace App\Http\Controllers;

use App\Enum\PermissionsEnum;
use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UpvoteController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $user = $request->user();

        if (! $user || ! $user->can(PermissionsEnum::UpvoteDownvote->value)) {
            abort(403);
        }

        $data = $request->validate([
            'upvote' => ['required', 'boolean'],
        ]);

        Upvote::updateOrCreate([
            'feature_id' => $feature->id,
            'user_id' => $user->id,
        ], [
            'upvote' => $data['upvote'],
        ]);

        return to_route('features.show', $feature->id);
    }

    public function destroy(Request $request, Feature $feature)
    {
        $user = $request->user();

        if (! $user || ! $user->can(PermissionsEnum::UpvoteDownvote->value)) {
            abort(403);
        }

        Upvote::where('feature_id', $feature->id)
            ->where('user_id', $user->id)
            ->delete();

        return to_route('features.show', $feature->id);
    }
}
