<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlanRequest;
use App\Services\PlanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Plan;

class PlanController extends Controller
{
    protected PlanService $planService;

    public function __construct(PlanService $planService)
    {
        $this->planService = $planService;
    }
    /**
     * @OA\Tag(
     *     name="Plans",
     *     description="Endpoints for managing plans"
     * )
     */

    /**
     * @OA\Get(
     *      path="/api/plans",
     *      operationId="indexPlans",
     *      tags={"Plans"},
     *      summary="List all plans",
     *      description="Returns a list of all plans",
     *      @OA\Parameter(
     *          name="perPage",
     *          in="query",
     *          description="Number of items per page",
     *          required=false,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          
     *      )
     * )
     */

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('perPage', 10);
        $packages = $this->planService->index($request->all(), $perPage);

        return response()->json($packages, 200);
    }
    /**
     * @OA\Post(
     *      path="/api/plans/store",
     *      operationId="storePlan",
     *      tags={"Plans"},
     *      summary="Create a new plan",
     *      description="Creates a new plan",
     *      @OA\RequestBody(
     *          required=true,
     *          description="Plan data",
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Plan created successfully",
     *          
     *      )
     * )
     */

    public function store(PlanRequest $request): JsonResponse
    {

        $package = $this->planService->store($request->all());

        return response()->json(['message' => 'Plan created successfully', 'package' => $package], 201);
    }

    /**
     * @OA\Get(
     *      path="/api/plans/show/{id}",
     *      operationId="showPlan",
     *      tags={"Plans"},
     *      summary="Show plan by ID",
     *      description="Returns a plan by its ID",
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          description="ID of the plan to retrieve",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          )
     *      )
     * )
     * 
     **/

    public function show($id): JsonResponse
    {
        $package = $this->planService->show($id);

        return response()->json(['package' => $package], 200);
    }
    /**
     * @OA\Put(
     *     path="/api/plans/update/{id}",
     *    operationId="updatePlan",
     *   tags={"Plans"},
     * summary="Update an existing plan",
     * description="Update an existing plan",
     * @OA\Parameter(
     *         name="id",
     *        in="path",
     *      description="ID of the plan to update",
     *    required=true,
     * @OA\Schema(type="integer")
     * ),
     * @OA\RequestBody(
     *   required=true,
     * description="Plan data",
     * ),
     * @OA\Response(
     *  response=200,
     * description="Plan updated successfully",
     * )
     * )
     * 
     */

    public function update(PlanRequest $request, $id): JsonResponse
    {

        // $package->update($request->all());
        $package = $this->planService->update($id, $request->all());

        return response()->json(['message' => 'Plan updated successfully', 'package' => $package], 200);
    }

    public function destroy($id): JsonResponse
    {
        $this->planService->destroy($id);

        return response()->json(['message' => 'Plan deleted successfully'], 200);
    }
}
