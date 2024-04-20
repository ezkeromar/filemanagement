<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillingRequest;
use App\Services\BillingService;
use App\Services\PlanageService;
use App\Services\PlanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Billing;
use App\Services\AuthService;

class BillingController extends Controller
{
    protected BillingService $billingService;
    protected PlanService $planService;


    protected $authService;

    public function __construct(AuthService $authService , BillingService $billingService , PlanService $planService)
    {
        $this->authService = $authService;
        $this->billingService = $billingService;
        $this->planService = $planService;
    }

    public function index(Request $request): JsonResponse
    {
        $user = $this->getUserOrFail($request);

        $perPage = $request->query('perPage', 10);

        $billings = $this->billingService->index($request->all(), $perPage , ['user_id' => $user->id] ,[] , []);


        return response()->json($billings, 200);
    }

    public function store(BillingRequest $request): JsonResponse
    {
        $user = $this->getUserOrFail($request);

        $package = $this->planService->show($request->billable_id);

            $request->merge(['user_id' => $user->id , 'unit_amount' => $package->price , 'currency' => $package->currency ,"description" => $package->name]);
        $billing =  $this->billingService->store($request->all());
       

        return response()->json(['message' => 'Billing record created successfully', 'billing' => $billing], 201);
    }

    public function show($id, Request $request): JsonResponse
    {
        $billing = $this->billingService->show($id);

        $this->checkOwnership($billing, $request);

        return response()->json(['billing' => $billing], 200);
    }

    public function update(BillingRequest $request, $id): JsonResponse
    {
        $billing = $this->billingService->first(['session_id' => $id]);
        
        $this->checkOwnership($billing, $request);

         $this->billingService->update($billing->id, $request->only(['status', 'date_paid']));

        $user = $this->getUserOrFail($request);
        if ($request->status === 'completed') {
            $user->current_billing_id = $billing->id;
            $user->is_first_login = false;
            $user->save();
        }

        return response()->json(['message' => 'Billing record updated successfully', 'billing' => $billing], 200);
    }

    private function getUserOrFail(Request $request)
    {
        $user = $this->authService->getUser($request);

        if (!$user) {
            abort(401, 'Unauthenticated');
        }

        return $user;
    }

    private function checkOwnership($billing, Request $request)
    {
        $user = $this->getUserOrFail($request);

        if ($billing->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
    }
}
