<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Inertia\Inertia;
use App\Http\Resources\PatientCollection;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Response;
use App\Http\Requests\StorePatientRequest;
use App\Http\Resources\PatientResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class PatientController extends Controller
{
    /**
     * Display a listing of the patients.
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {

        return Inertia::render('Patients/Index', [
            'filters' => Request::all('search', 'trashed'),
            'patients' => new PatientCollection(
                Patient::orderBy('last_name')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    /**
     * Show the form for creating a new patient.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Patients/Create');
    }

    /**
     * Store a newly created patient in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StorePatientRequest $request): RedirectResponse
    {
        Patient::create(
            $request->validated()
        );
        return Redirect::route('patients')->with('success', 'Patient created successfully.');
    }

    /**
     * Show the form for editing the specified patient.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Inertia\Response
     */
    public function edit(Patient $patient)
    {
        return Inertia::render('Patients/Edit', [
            'patient' => new PatientResource($patient),
        ]);
    }

    /**
     * Update the specified patient in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StorePatientRequest $request, Patient $patient): RedirectResponse
    {
        $patient->update(
            $request->validated()
        );
        return Redirect::back()->with('success', 'Patient updated successfully.');
    }

    /**
     * Remove the specified patient from storage.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('success', 'Patient deleted successfully.');
    }
}
