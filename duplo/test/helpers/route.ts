/* eslint-disable */

import httpMocks from "node-mocks-http";
import {Route, Request, Response, AnyFunction, CheckerOutput, Checker, CheckerStep, CutStep, DuploConfig, DuploInstance, ProcessStep, Process, EditingFunctionRoute} from "@duplojs/duplojs";
import EventEmitter from "events";

declare module "@duplojs/duplojs" {
	interface DuploInstance<duploConfig extends DuploConfig> {
		testRoute(route: Route): TestRoute,
	}
}

interface MockCheckerOptions {
	passCatch?: boolean | any[]
}

class TestRoute{
	private defaultFloorValue: Record<any, unknown> = {};
	private prepareRequestFunction: AnyFunction = () => {} 
	private prepareResponseFunction: AnyFunction = () => {} 

	constructor(
		private route: Route,
		private duploInstance: DuploInstance<DuploConfig>,
	){
		route.extracted = {}
	}

	prepareRequest<
		_request extends Request
	>(prepareRequestFunction: (req: _request) => void){
		this.prepareRequestFunction = prepareRequestFunction;

		return this;
	}

	prepareResponse<
		_response extends Response
	>(prepareResponseFunction: (res: _response) => void){
		this.prepareResponseFunction = prepareResponseFunction;

		return this;
	}

	setDefaultFloorValue(defaultFloorValue: Record<any, unknown>){
		this.defaultFloorValue = defaultFloorValue

		return this;
	}

	mockChecker(name: string | number, output: CheckerOutput, options?: MockCheckerOptions){
		const currentStep: CheckerStep | undefined = typeof name === "string" 
			? this.route.steps.find((step): step is CheckerStep => step.name === name && step.parent instanceof Checker)
			: this.route.steps[name] as CheckerStep;

		if(!currentStep){
			throw new Error(`Missing step : ${name}`);
		}

		if(options?.passCatch){
			const rawResponse = httpMocks.createResponse({eventEmitter: EventEmitter});
			const response = new this.duploInstance.class.Response(rawResponse);

			try {
				currentStep.params.catch(
					response, 
					//@ts-expect-error tuple error.
					...(options.passCatch === true ? [] : options.passCatch),
				);
			} catch {}
		}

		const currenrChecker = currentStep.parent 
		const mockedChecker = new this.duploInstance.class.Checker(currentStep.name, []);
		currentStep.parent = mockedChecker;
		mockedChecker.handler = () => output
		mockedChecker.options = currenrChecker.options

		return this;
	}

	mockProcess(name: string, drop: Record<any, unknown>){
		const currentStep: ProcessStep | undefined = typeof name === "string" 
			? this.route.steps.find((step): step is ProcessStep => step.name === name && step.parent instanceof Process)
			: this.route.steps[name] as ProcessStep;

		if(!currentStep){
			throw new Error(`Missing step : ${name}`);
		}

		const currentProcess = currentStep.parent
		const mockedProcess = new this.duploInstance.class.Process(currentStep.name, []);
		currentStep.parent = mockedProcess;
		mockedProcess.options = currentProcess.options
		mockedProcess.input = currentProcess.input
		mockedProcess.duploseFunction = () => drop

		return this;
	}

	async launch(){
		const floorInjecter = new CutStep(() => this.defaultFloorValue, Object.keys(this.defaultFloorValue))
		this.route.steps.unshift(floorInjecter);

		await this.duploInstance.class.serverHooksLifeCycle.beforeBuildRouter.launchSubscriberAsync();
		
		const filtredEditingDuploseFunctions: EditingFunctionRoute[] = [];
		this.route.editingDuploseFunctions.forEach(
			(editingDuploseFunction) =>
				filtredEditingDuploseFunctions.find(
					passedEditingDuploseFunction => 
						passedEditingDuploseFunction.toString() === editingDuploseFunction.toString()
					)
					|| filtredEditingDuploseFunctions.push(editingDuploseFunction)
		)
		this.route.editingDuploseFunctions = filtredEditingDuploseFunctions;

		this.route.build();
		
		const rawResponse = httpMocks.createResponse({eventEmitter: EventEmitter});
		const response = new this.duploInstance.class.Response(rawResponse);

		const rawRequest = httpMocks.createRequest();
		const request = new this.duploInstance.class.Request(rawRequest, {}, "");

		this.prepareResponseFunction(response);
		this.prepareRequestFunction(request);

		try {
			await this.route.duploseFunction(request, response);
		} catch{}

		return response;
	}
}

DuploInstance.prototype.testRoute = function(route: Route){
	return new TestRoute(route, this);
}
