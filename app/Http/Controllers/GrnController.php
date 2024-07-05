<?php

namespace App\Http\Controllers;

use App\Models\Grn;
use Inertia\Inertia;
use App\Http\Resources\GrnCollection;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use App\Http\Requests\StoreGrnRequest;
use App\Http\Requests\UpdateGrnRequest;
use App\Http\Resources\GrnResource;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\SupplierCollection;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;

class GrnController extends Controller
{
    /**
     * Display a listing of the GRNs.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Grns/Index', [
            'filters' => Request::all('search'),
            'grns' => new GrnCollection(
                Grn::orderBy('received_date')
                    ->with('supplier')
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new GRN.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Grns/Create', [
            'suppliers' => new SupplierCollection(Supplier::orderBy('name')->get()),
            'products' => new ProductCollection(Product::orderBy('name')->get())
        ]);
    }

    /**
     * Store a newly created GRN in storage.
     *
     * @param  StoreGrnRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGrnRequest $request)
    {
        //dd('Data grn items',$request->all());
        $validated = $request->validated();
        try {
            DB::transaction(function () use ($validated) {
                // Create the GRN record
                $grnItems = $validated['grn_items'];
                unset($validated['grn_items']);
                $grn = Grn::create($validated);
                foreach ($grnItems as $itemData) {
                    $itemData['grn_id'] = $grn->id;
                    unset($itemData['amount']);
                    unset($itemData['id']);
                    unset($itemData['gst']);
                    $grn->grnItems()->create($itemData);
                }
            });

            return Redirect::route('grns')->with('success', 'GRN created successfully.');
        } catch (\Exception $e) {
            // Handle the exception (log, display an error message, etc.)
            return Redirect::route('grns')->with('error', 'Error creating GRN: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified GRN.
     *
     * @param  Grn  $grn
     * @return \Illuminate\Http\Response
     */
    public function show(Grn $grn)
    {
        return Inertia::render('Grns/Show', ['grn' => new GrnResource($grn)]);
    }

    /**
     * Show the form for editing the specified GRN.
     *
     * @param  Grn  $grn
     * @return \Illuminate\Http\Response
     */
    public function edit(Grn $grn)
    {
        // return Inertia::render('Grns/Edit', [
        //     'grn' => new GrnResource($grn),
        // ]);
        $query = Grn::where('id', 1)->toSql();
        // Load the related GrnItems
        $grn->load('grnItems');

        return Inertia::render('Grns/Edit', [
            'grns' => new GrnResource($grn),
            // Pass the GrnItems directly if you don't have a resource for them
            'grn_items' => $grn->grnItems,
            'suppliers' => new SupplierCollection(Supplier::orderBy('name')->get()),
            'products' => new ProductCollection(Product::orderBy('name')->get())
        ]);
    }

    /**
     * Update the specified GRN in storage.
     *
     * @param  StoreGrnRequest  $request
     * @param  Grn  $grn
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGrnRequest $request, Grn $grn)
    {
        // $validated = $request->validated();
        // $grn->update($validated);
        // return Redirect::back()->with('success', 'GRN updated successfully.');
        $validated = $request->validated();
        try {
            DB::transaction(function () use ($grn, $validated) {
                // Update the GRN record
                $grnItems = $validated['grn_items'];
                unset($validated['grn_items']);
                unset($validated['grn_no']);
                $grn->update($validated);

                // Get IDs of all incoming items
                $incomingItemIds = array_column($grnItems, 'id');

                // Delete GrnItems that are not present in the incoming data
                $grn->grnItems()->whereNotIn('id', $incomingItemIds)->delete();

                // Update or create related GrnItems
                foreach ($grnItems as $itemData) {
                    unset($itemData['gst']);
                    unset($itemData['amount']);
                    if (isset($itemData['id']) && $item = $grn->grnItems()->find($itemData['id'])) {
                        $item->update($itemData);
                    } else {
                        // Create a new item
                        unset($itemData['id']); // Ensure there's no id set for new items
                        $grn->grnItems()->create($itemData);
                    }
                }
            });

            return Redirect::route('grns.edit', $grn)->with('success', 'GRN updated successfully.');
        } catch (\Exception $e) {
            // Handle the exception (log, display an error message, etc.)
            Log::error($e->getMessage());
            return Redirect::route('grns.edit', $grn)->with('error', 'Error updating GRN: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified GRN from storage.
     *
     * @param  Grn  $grn
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grn $grn)
    {
        $grn->delete();
        return Redirect::route('grns.index')->with('success', 'GRN deleted successfully.');
    }
}
