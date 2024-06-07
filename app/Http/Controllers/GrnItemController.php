<?php

namespace App\Http\Controllers;

use App\Models\GrnItem;
use Inertia\Inertia;
use App\Http\Resources\GrnItemCollection;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\StoreGrnItemRequest;
use App\Http\Resources\GrnItemResource;

class GrnItemController extends Controller
{
    /**
     * Display a listing of the GRN items.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('GrnItems/Index', [
            'filters' => Request::all('search'),
            'grnItems' => new GrnItemCollection(
                GrnItem::orderBy('expiry_date')
                    ->with(['grn', 'product'])
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new GRN item.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('GrnItems/Create');
    }

    /**
     * Store a newly created GRN item in storage.
     *
     * @param  StoreGrnItemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGrnItemRequest $request)
    {
        $validated = $request->validated();
        GrnItem::create($validated);
        return Redirect::route('grnItems')->with('success', 'GRN item created successfully.');
    }

    /**
     * Display the specified GRN item.
     *
     * @param  GrnItem  $grnItem
     * @return \Illuminate\Http\Response
     */
    public function show(GrnItem $grnItem)
    {
        return Inertia::render('GrnItems/Show', ['grnItem' => new GrnItemResource($grnItem)]);
    }

    /**
     * Show the form for editing the specified GRN item.
     *
     * @param  GrnItem  $grnItem
     * @return \Illuminate\Http\Response
     */
    public function edit(GrnItem $grnItem)
    {
        return Inertia::render('GrnItems/Edit', [
            'grnItem' => new GrnItemResource($grnItem),
        ]);
    }

    /**
     * Update the specified GRN item in storage.
     *
     * @param  StoreGrnItemRequest  $request
     * @param  GrnItem  $grnItem
     * @return \Illuminate\Http\Response
     */
    public function update(StoreGrnItemRequest $request, GrnItem $grnItem)
    {
        $validated = $request->validated();
        $grnItem->update($validated);
        return Redirect::back()->with('success', 'GRN item updated successfully.');
    }

    /**
     * Remove the specified GRN item from storage.
     *
     * @param  GrnItem  $grnItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(GrnItem $grnItem)
    {
        $grnItem->delete();
        return Redirect::route('grnItems')->with('success', 'GRN item deleted successfully.');
    }
}
