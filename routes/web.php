<?php
use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Features routes
    Route::resource('features', FeatureController::class);
    // Upvote and comment routes for features
    Route::post('features/{feature}/upvote', [UpvoteController::class, 'store'])->name('upvote.store');
    Route::delete('features/{feature}/upvote', [UpvoteController::class, 'destroy'])->name('upvote.destroy');
    Route::post('features/{feature}/comments', [CommentController::class, 'store'])->name('comments.store');
});

Route::middleware(['verified', 'role:' . RolesEnum::Admin->value])->group(function () {
        Route::get('/user', [UserController::class, 'index'])
            ->name('user.index');
        Route::get('/user/{user}/edit', [UserController::class, 'edit'])
            ->name('user.edit');
        Route::put('/user/{user}', [UserController::class, 'update'])
            ->name('user.update');
    });

require __DIR__.'/settings.php';
