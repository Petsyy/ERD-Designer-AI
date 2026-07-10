<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DiagramColumnController;
use App\Http\Controllers\DiagramTableController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RelationshipController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);

    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('/', [ProjectController::class, 'index'])->name('dashboard');

    Route::resource('projects', ProjectController::class)->except(['index', 'create', 'edit']);
    Route::get('/workspace/{project}', [WorkspaceController::class, 'page'])->name('workspace');

    Route::post("/workspace/{project}/tables", [DiagramTableController::class, "store"])->name('tables.store');
    Route::put("/workspace/tables/{diagram_table}", [DiagramTableController::class, "update"])->name('tables.update');
    Route::delete("/workspace/tables/{diagram_table}", [DiagramTableController::class, "destroy"])->name('tables.destroy');

    Route::post("/workspace/tables/{diagram_table}/columns", [DiagramColumnController::class, "store"])->name('columns.store');
    Route::put("/workspace/columns/{diagram_column}", [DiagramColumnController::class, "update"])->name('columns.update');
    Route::delete("/workspace/columns/{diagram_column}", [DiagramColumnController::class, "destroy"])->name('columns.destroy');

    Route::post("/workspace/{project}/relationships", [RelationshipController::class, "store"])->name('relationships.store');
    Route::put("/workspace/{project}/relationships/{relationship}", [RelationshipController::class, "update"])->name('relationships.update');
    Route::delete("/workspace/{project}/relationships/{relationship}", [RelationshipController::class, "destroy"])->name('relationships.destroy');
});
