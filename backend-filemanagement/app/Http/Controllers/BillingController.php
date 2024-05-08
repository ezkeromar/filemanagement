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

    public function __construct(AuthService $authService, BillingService $billingService, PlanService $planService)
    {
        $this->authService = $authService;
        $this->billingService = $billingService;
        $this->planService = $planService;
    }
    /**
     * @OA\Tag(
     *     name="Billings",
     *     description="Endpoints for managing billings"
     * )
     */

    /**
     * @OA\Get(
     *      path="api/billings",
     *      operationId="indexBillings",
     *      tags={"Billings"},
     *      summary="List all billings",
     *      description="Returns a list of all billings for the authenticated user",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *      )
     * )
     */

    public function index(Request $request): JsonResponse
    {
        $user = $this->getUserOrFail($request);

        $perPage = $request->query('perPage', 10);

        $billings = $this->billingService->index($request->all(), $perPage, ['user_id' => $user->id], [], []);


        return response()->json($billings, 200);
    }

    /**
     * @OA\Post(
     *      path="api/billings/store",
     *      operationId="storeBilling",
     *      tags={"Billings"},
     *      summary="Create a new billing record",
     *      description="Creates a new billing record for the authenticated user",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Billing data",
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Billing record created successfully",
     *          @OA\JsonContent(
     *              @OA\Property(property="message", type="string", example="Billing record created successfully"),
     *          )
     *      )
     * )
     */

    public function store(BillingRequest $request): JsonResponse
    {
        $user = $this->getUserOrFail($request);

        $package = $this->planService->show($request->billable_id);

        $request->merge(['user_id' => $user->id, 'unit_amount' => $package->price, 'currency' => $package->currency, "description" => $package->name]);
        $billing = $this->billingService->store($request->all());


        return response()->json(['message' => 'Billing record created successfully', 'billing' => $billing], 201);
    }
    /**
     * @OA\Get(
     *      path="api/billings/show/{id}",
     *      operationId="showBilling",
     *      tags={"Billings"},
     *      summary="Show billing record by ID",
     *      description="Returns a billing record by its ID for the authenticated user",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of the billing record to retrieve",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Billing record not found"
     *      )
     * )
     */

    public function show($id, Request $request): JsonResponse
    {
        $billing = $this->billingService->show($id);

        $this->checkOwnership($billing, $request);

        return response()->json(['billing' => $billing], 200);
    }

    /**
 * @OA\Put(
 *      path="api/billings/update/{id}",
 *      operationId="updateBilling",
 *      tags={"Billings"},
 *      summary="Update billing record by ID",
 *      description="Updates an existing billing record by its ID for the authenticated user",
 *      @OA\Parameter(
 *          name="id",
 *          in="path",
 *          description="ID of the billing record to update",
 *          required=true,
 *          @OA\Schema(type="integer")
 *      ),
 *      @OA\RequestBody(
 *          required=true,
 *          description="Billing data to update",
 *      ),
 *      @OA\Response(
 *          response=200,
 *          description="Billing record updated successfully",
 *          
 *      ),
 *      @OA\Response(
 *          response=404,
 *          description="Billing record not found"
 *      )
 * )
 */

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



