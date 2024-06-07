<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ProductType;
use App\Http\Resources\ProductTypeCollection;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Response;
use App\Http\Requests\StoreProductTypeRequest;
use App\Http\Resources\ProductTypeResource;
use Illuminate\Http\RedirectResponse;

class ProductTypeController extends Controller
{
    public function index()
    {
        return Inertia::render('ProductTypes/Index', [
            'filters' => Request::all('search'),
            'productTypes' => new ProductTypeCollection(
                ProductType::orderBy('name')
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('ProductTypes/Create');
    }

    public function store(StoreProductTypeRequest $request)
    {
        $validated = $request->validated();
        ProductType::create(
            $validated
        );
        return Redirect::route('productTypes')->with('success', 'Product Type created successfully.');
    }

    public function edit(ProductType $productType)
    {
        return Inertia::render('ProductTypes/Edit', [
            'productType' => new ProductTypeResource($productType),
        ]);
    }

    public function update(StoreProductTypeRequest $request, ProductType $productType)
    {
        $validated = $request->validated();
        $productType->update(
            $validated
        );
        return Redirect::back()->with('success', 'Product Type updated successfully.');
    }

    public function destroy(ProductType $productType)
    {
        $productType->delete();
        return redirect()->route('productTypes.index');
    }
}
