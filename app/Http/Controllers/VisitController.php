<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitController extends Controller
{
    public function index()
    {
        $visits = Visit::with('patient')->orderBy('visit_date', 'desc')->get();
        return Inertia::render('Visits/Index', ['visits' => $visits]);
    }

    public function create()
    {
        return Inertia::render('Visits/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'visit_date' => 'required|date',
            // Add other validation rules as needed
        ]);

        Visit::create($validatedData);
        return redirect()->route('visits.index')->with('success', 'Visit created successfully.');
    }

    public function show(Visit $visit)
    {
        return Inertia::render('Visits/Show', ['visit' => $visit]);
    }

    public function edit(Visit $visit)
    {
        return Inertia::render('Visits/Edit', ['visit' => $visit]);
    }

    public function update(Request $request, Visit $visit)
    {
        $validatedData = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'visit_date' => 'required|date',
            // Add other validation rules as needed
        ]);

        $visit->update($validatedData);
        return redirect()->route('visits.index')->with('success', 'Visit updated successfully.');
    }

    public function destroy(Visit $visit)
    {
        $visit->delete();
        return redirect()->route('visits.index')->with('success', 'Visit deleted successfully.');
    }
}
