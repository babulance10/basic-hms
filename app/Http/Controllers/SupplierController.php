<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Supplier;
use App\Http\Resources\SupplierCollection;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Response;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Resources\SupplierResource;
use Illuminate\Http\RedirectResponse;

class SupplierController extends Controller
{
    // Display a list of suppliers
    public function index(): Response
    {
        return Inertia::render('Suppliers/Index', [
            'filters' => Request::all('search'),
            'suppliers' => new SupplierCollection(
                Supplier::orderBy('name')
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    // Show the form for creating a new supplier
    public function create()
    {
        return Inertia::render('Suppliers/Create');
    }

    // Store a newly created supplier in the database
    public function store(StoreSupplierRequest $request)
    {
        $validated = $request->validated();
        Supplier::create(
            $validated
        );
        return Redirect::route('suppliers')->with('success', 'Supplier created successfully.');
    }

    // Display the specified supplier
    public function show($id)
    {
        $supplier = Supplier::findOrFail($id);
        return Inertia::render('Suppliers/Show', compact('supplier'));
    }

    // Show the form for editing the specified supplier
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier' => new SupplierResource($supplier),
        ]);
    }

    // Update the specified supplier in the database
    public function update(StoreSupplierRequest $request, Supplier $supplier): RedirectResponse
    {
        $validated = $request->validated();
        $supplier->update(
            $validated
        );
        return Redirect::back()->with('success', 'Supplier updated successfully.');
    }

    // Remove the specified supplier from the database
    public function destroy($id)
    {
        // Delete the supplier
        // Example: Supplier::findOrFail($id)->delete();
    }
}
