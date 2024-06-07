<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use App\Http\Resources\ProductCollection;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Response;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ManufacturerCollection;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductSupplierCollection;
use App\Http\Resources\ProductTypeCollection;
use App\Http\Resources\SupplierResource;
use App\Models\Manufacturer;
use App\Models\ProductType;
use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Products/Index', [
            'filters' => Request::all('search'),
            'products' => new ProductCollection(
                Product::orderBy('name')
                    ->with(['productType','manufacturer'])
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Return a view to create a new products
        return Inertia::render('Products/Create',[
            'productTypes' => new ProductTypeCollection(ProductType::orderBy('name')->get()),
            'manufacturers' => new ManufacturerCollection(Manufacturer::orderBy('name')->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();
        Product::create(
            $validated
        );
        return Redirect::route('products')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        // Return a view to show the products
        return Inertia::render('Products/Show', ['product' => $product]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        // Return a view to edit the products
        return Inertia::render('Products/Edit', [
            'product' => new ProductResource($product),
            'productTypes' => new ProductTypeCollection(ProductType::orderBy('name')->get()),
            'manufacturers' => new ManufacturerCollection(Manufacturer::orderBy('name')->get())
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(StoreProductRequest $request, Product $product)
    {
        $validated = $request->validated();
        $product->update(
            $validated
        );
        return Redirect::back()->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products')->with('success', 'Inventory item deleted successfully.');
    }
}
