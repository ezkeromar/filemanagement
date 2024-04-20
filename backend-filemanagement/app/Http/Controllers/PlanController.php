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
    
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->query('perPage', 10);
        $packages = $this->planService->index($request->all(), $perPage);

        return response()->json($packages, 200);
    }

    public function store(PlanRequest $request): JsonResponse
    {

        $package = $this->planService->store($request->all());

        return response()->json(['message' => 'Plan created successfully', 'package' => $package], 201);
    }

    public function show($id): JsonResponse
    {
        $package = $this->planService->show($id);

        return response()->json(['package' => $package], 200);
    }

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
