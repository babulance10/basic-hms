<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Visit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with(['visit'])->orderBy('invoice_date', 'desc')->get();

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    public function create()
    {
        $visits = Visit::orderBy('visit_date')->get();

        return Inertia::render('Invoices/Create', [
            'visits' => $visits,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'visit_id' => 'required|exists:visits,id',
            'transaction_id' => 'required|unique:invoices',
            'subtotal' => 'required|numeric',
            'gst' => 'required|numeric',
            'discount' => 'numeric',
            'payment_method' => 'required|in:cash,card,online',
            'status' => 'required|in:pending,paid,cancelled',
            'invoice_date' => 'required|date',
            'description' => 'nullable',
        ]);

        $invoice = Invoice::create($validatedData);

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }

    public function edit(Invoice $invoice)
    {
        $visits = Visit::orderBy('visit_date')->get();

        return Inertia::render('Invoices/Edit', [
            'invoice' => $invoice,
            'visits' => $visits,
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'visit_id' => 'required|exists:visits,id',
            'transaction_id' => 'required|unique:invoices,transaction_id,' . $invoice->id,
            'subtotal' => 'required|numeric',
            'gst' => 'required|numeric',
            'discount' => 'numeric',
            'payment_method' => 'required|in:cash,card,online',
            'status' => 'required|in:pending,paid,cancelled',
            'invoice_date' => 'required|date',
            'description' => 'nullable',
        ]);

        $invoice->update($validatedData);

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return redirect()->route('invoices.index')->with('success', 'Invoice deleted successfully.');
    }
}
