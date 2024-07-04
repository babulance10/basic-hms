<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillingItemRequest;
use App\Http\Requests\UpdateBillingItemRequest;
use App\Http\Resources\BillingItemCollection;
use App\Models\BillingItem;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;

class BillingItemController extends Controller
{
    public function index()
    {
        return Inertia::render('BillingItems/Index', [
            'filters' => Request::all('search'),
            'pharmacyItemBillings' => new BillingItemCollection(
                BillingItem::with('pharmacyBilling', 'product')
                    ->orderBy('created_at')
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            )
        ]);
    }

    public function create()
    {
        return Inertia::render('BillingItems/Create');
    }

    public function store(StoreBillingItemRequest $request)
    {
        $validated = $request->validated();
        BillingItem::create($validated);
        return redirect()->route('pharmacyItemBillings.index')->with('success', 'Item billing created successfully.');
    }

    public function show(BillingItem $pharmacyItemBilling)
    {
        return Inertia::render('BillingItems/Show', ['pharmacyItemBilling' => $pharmacyItemBilling]);
    }

    public function edit(BillingItem $pharmacyItemBilling)
    {
        return Inertia::render('BillingItems/Edit', ['pharmacyItemBilling' => $pharmacyItemBilling]);
    }

    public function update(UpdateBillingItemRequest $request, BillingItem $pharmacyItemBilling)
    {
        $validated = $request->validated();
        $pharmacyItemBilling->update($validated);
        return redirect()->route('pharmacyItemBillings.index')->with('success', 'Item billing updated successfully.');
    }

    public function destroy(BillingItem $pharmacyItemBilling)
    {
        $pharmacyItemBilling->delete();
        return redirect()->route('pharmacyItemBillings.index')->with('success', 'Item billing deleted successfully.');
    }
}
