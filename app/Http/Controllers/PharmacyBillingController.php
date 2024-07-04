<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePharmacyBillingRequest;
use App\Http\Requests\UpdatePharmacyBillingRequest;
use App\Http\Resources\GrnItemCollection;
use App\Http\Resources\PatientCollection;
use App\Http\Resources\PharmacyBillingCollection;
use App\Http\Resources\PharmacyBillingResource;
use App\Http\Resources\ProductCollection;
use App\Models\Grn;
use App\Models\GrnItem;
use App\Models\Patient;
use App\Models\PharmacyBilling;
use App\Models\Product;
use App\Models\Visit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;

class PharmacyBillingController extends Controller
{
    public function index()
    {
        return Inertia::render('PharmacyBillings/Index', [
            'filters' => Request::all('search'),
            'pharmacyBillings' => new PharmacyBillingCollection(
                PharmacyBilling::orderBy('created_at')
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            )
        ]);
    }

    public function create()
    {
        return Inertia::render('PharmacyBillings/Create', [
            'patients' => new PatientCollection(Patient::orderBy('email')->get()),
            'products' => new ProductCollection(Product::orderBy('name')->get()),
            'grnItems' => new GrnItemCollection(GrnItem::with('product')->orderBy('expiry_date')->get()),
            'activeVisits' => Visit::whereIn('status', ['scheduled', 'ongoing'])
                ->with('patient') // Assuming there's a 'patient' relationship defined
                ->get(['id', 'patient_id'])
                ->map(function ($visit) {
                    return [
                        'id' => $visit->id,
                        'patient_name' => $visit->patient->first_name . ' ' . $visit->patient->last_name
                    ];
                }),
        ]);
    }

    public function store(StorePharmacyBillingRequest $request)
    {
        $validated = $request->validated();
        //dd($validated);
        try {
            DB::transaction(function () use ($validated) {
                // Create the GRN record
                $billingItems = $validated['billing_items'];
                unset($validated['billing_items']);
                $billing = PharmacyBilling::create($validated);
                foreach ($billingItems as $itemData) {
                    $itemData['pharmacy_billing_id'] = $billing->id;
                    $billing->billingItems()->create($itemData);
                }
            });

            return Redirect::route('pharmacy-bills')->with('success', 'Pharmacy Biilling created successfully.');
        } catch (\Exception $e) {
            // Handle the exception (log, display an error message, etc.)
            return Redirect::route('pharmacy-bills')->with('error', 'Error creating Pharmacy Biilling: ' . $e->getMessage());
        }
    }

    public function show(PharmacyBilling $pharmacyBilling)
    {
        return Inertia::render('PharmacyBillings/Show', ['pharmacyBilling' => $pharmacyBilling]);
    }

    public function edit(PharmacyBilling $pharmacyBill)
    {
        $pharmacyBill->load('billingItems');
        // Log::info(DB::getQueryLog());
        return Inertia::render('PharmacyBillings/Edit', [
            'pharmacyBilling' => new PharmacyBillingResource($pharmacyBill),
            'grnItems' => new GrnItemCollection(GrnItem::orderBy('expiry_date')->get()),
            // Pass the GrnItems directly if you don't have a resource for them
            'billing_items' => $pharmacyBill->billingItems,
            'products' => new ProductCollection(Product::orderBy('name')->get()),
            'activeVisits' => Visit::with('patient') // Eager load the patient relationship
                ->whereIn('status', ['scheduled', 'ongoing']) // Assuming you have a status field to filter active visits
                ->get()
                ->map(function ($visit) {
                    return [
                        'id' => $visit->id,
                        'patient_name' => $visit->patient->first_name . ' ' . $visit->patient->last_name,
                    ];
                }),
        ]);

        // return Inertia::render('PharmacyBillings/Edit', ['pharmacyBilling' => $pharmacyBilling]);
    }

    public function update(updatePharmacyBillingRequest $request, PharmacyBilling $pharmacyBill)
    {
        $validated = $request->validated();
        // Uncomment the line below if you want to debug the validated data
        // dd($validated);
        try {
            DB::transaction(function () use ($validated, $pharmacyBill) {
                // Update the Pharmacy Billing record
                $billingItems = $validated['billing_items'];
                unset($validated['billing_items']);
                $pharmacyBill->update($validated);

                $incomingItemIds = array_column($billingItems, 'id');

                // Delete GrnItems that are not present in the incoming data
                $pharmacyBill->billingItems()->whereNotIn('id', $incomingItemIds)->delete();

                // Update the associated Billing Items
                foreach ($billingItems as $itemData) {
                    //dd($itemData);
                    if (isset($itemData['id']) && $item = $pharmacyBill->billingItems()->find($itemData['id'])) {
                        $item->update($itemData);
                    } else {
                        unset($itemData['id']);
                        $pharmacyBill->billingItems()->create($itemData);
                    }
                }
            });

            return Redirect::route('pharmacy-bills')->with('success', 'Pharmacy Billing updated successfully.');
        } catch (\Exception $e) {
            // Handle the exception (log, display an error message, etc.)
            return Redirect::route('pharmacy-bills')->with('error', 'Error updating Pharmacy Billing: ' . $e->getMessage());
        }
    }


    public function destroy(PharmacyBilling $pharmacyBilling)
    {
        $pharmacyBilling->delete();
        return redirect()->route('pharmacyBillings.index')->with('success', 'Billing deleted successfully.');
    }
}
