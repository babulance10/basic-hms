<?php

namespace App\Http\Controllers;

use App\Models\Treatment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TreatmentController extends Controller
{
    public function index()
    {
        $treatments = Treatment::with('visit')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Treatments/Index', ['treatments' => $treatments]);
    }

    public function create()
    {
        return Inertia::render('Treatments/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'visit_id' => 'required|exists:visits,id',
            'description' => 'required',
            // Add other validation rules as needed
        ]);

        Treatment::create($validatedData);
        return redirect()->route('treatments.index')->with('success', 'Treatment created successfully.');
    }

    public function show(Treatment $treatment)
    {
        return Inertia::render('Treatments/Show', ['treatment' => $treatment]);
    }

    public function edit(Treatment $treatment)
    {
        return Inertia::render('Treatments/Edit', ['treatment' => $treatment]);
    }

    public function update(Request $request, Treatment $treatment)
    {
        $validatedData = $request->validate([
            'visit_id' => 'required|exists:visits,id',
            'description' => 'required',
            // Add other validation rules as needed
        ]);

        $treatment->update($validatedData);
        return redirect()->route('treatments.index')->with('success', 'Treatment updated successfully.');
    }

    public function destroy(Treatment $treatment)
    {
        $treatment->delete();
        return redirect()->route('treatments.index')->with('success', 'Treatment deleted successfully.');
    }
}
