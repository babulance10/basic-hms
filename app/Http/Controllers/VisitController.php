<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitRequest;
use App\Http\Requests\UpdateVisitRequest;
use App\Http\Resources\PatientCollection;
use App\Http\Resources\VisitCollection;
use App\Models\Patient;
use App\Models\Visit;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;

class VisitController extends Controller
{
    public function index()
    {
        return Inertia::render('Visits/Index', [
            'filters' => Request::all('search'),
            'visits' =>  new VisitCollection(
                Visit::orderBy('start_time')
                    ->filter(Request::only('search'))
                    ->paginate()
                    ->appends(Request::all())
            )
        ]);
    }

    public function create()
    {
        return Inertia::render('Visits/Create', [
            'patients' => new PatientCollection(Patient::orderBy('email')->get())
        ]);
    }

    public function store(StoreVisitRequest $request)
    {
        $validated = $request->validated();
        Visit::create($validated);
        return redirect()->route('visits')->with('success', 'Visit created successfully.');
    }

    public function show(Visit $visit)
    {
        return Inertia::render('Visits/Show', ['visit' => $visit]);
    }

    public function edit(Visit $visit)
    {
        // Return a view to edit the products
        return Inertia::render('Visits/Edit', [
            'visit' => $visit,
            'patients' => (object) Patient::where('id', $visit->patient_id)->first([
                'id',
                'first_name',
                'last_name'
            ])->toArray()
        ]);
    }

    public function update(UpdateVisitRequest $request, Visit $visit)
    {
        $validated = $request->validated();
        $visit->update(
            $validated
        );
        return redirect()->route('visits')->with('success', 'Visit updated successfully.');
    }

    public function destroy(Visit $visit)
    {
        $visit->delete();
        return redirect()->route('visits.index')->with('success', 'Visit deleted successfully.');
    }
}
