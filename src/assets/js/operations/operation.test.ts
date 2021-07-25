import "jest-extended"
import { Color } from "../Color"
import { Shape } from "../Shape"
import { GameObject } from "../util";
import { createOperation, OperationError, OperationIngredient, OperationIngredientTypeMismatchError, OperationInvalidIngredientError, OperationResult, OperationSuccess } from "./operation"

export function expectToBeSuccess<I extends OperationIngredient[], R extends GameObject>(opResult: OperationResult<I, R>): asserts opResult is OperationSuccess<I, R> {
  expect(opResult.isError).toBeFalse();
}

export function expectToBeFailure<I extends OperationIngredient[], R extends GameObject>(opResult: OperationResult<I, R>): asserts opResult is OperationError<I> {
  expect(opResult.isError).toBeTrue();
}

export function expectErrorToBe<I extends OperationIngredient[], R extends GameObject>(opResult: OperationResult<I, R>, error: string) {
  expectToBeFailure(opResult)
  expect(opResult.error).toInclude(error)
}

export function expectResultToEqual<I extends OperationIngredient[], R extends GameObject>(opResult: OperationResult<I, R>, result: R) {
  expectToBeSuccess(opResult)
  expect(opResult.result).toEqual(result)
}

export function expectResultingShapeToBe<I extends OperationIngredient[]>(opResult: OperationResult<I, Shape>, shapeKey: string) {
  expectToBeSuccess(opResult)
  expect(opResult.result.toShortKey()).toBe(shapeKey)
}

describe("Operation runtime type checking", () => {
  const DummyOperation = createOperation<
    [Shape, [Color, Color, Color], [Shape, boolean]],
    Shape
  >({
    name: "DummyOperation",
    ingredients: ['shape', ['color', 'color', 'color'], ['shape', 'boolean']],
    result: 'shape',
    operate: (([shape]) => shape)
  })

  const checkRuntimeTypeChecking = (args, shouldThrow: boolean) => {
    const expectObj = expect(() => DummyOperation(args));
    (shouldThrow ? expectObj : expectObj.not).toThrowError(OperationIngredientTypeMismatchError)
  }

  it("should pass when all types are correct", () => checkRuntimeTypeChecking([
    Shape.fromShortKey("CuCuCuCu"),
    [Color.red, Color.green, Color.blue],
    [Shape.fromShortKey("RuCuRrRc"), false]
  ], false))

  it("should not pass when not fed an array", () => checkRuntimeTypeChecking(123, true))

  it("should not pass when fed an array of the wrong length", () => checkRuntimeTypeChecking([123], true))

  it("should output the correct error message", () => {
    // @ts-expect-error
    expect(() => DummyOperation([Shape.fromShortKey("CuCuCuCu"), Shape.fromShortKey("CuCuRuCu"), []])).toThrow("Expected array, got 'Shape(CuCuRuCu)' in ingredient 1")
    // @ts-expect-error
    expect(() => DummyOperation([Shape.fromShortKey("CuCuCuCu"), [], []])).toThrow("Ingredient array length (0) in ingredient 1 not equal to expected length (3)")
    // @ts-expect-error
    expect(() => DummyOperation([Shape.fromShortKey("CuCuCuCu"), [Color.red, true, Color.green], [Shape.fromShortKey("CuCuRrRc"), false]])).toThrow("in index 1 in ingredient 1")
  })

})

describe('Operation success and failure', () => {

  // will throw if recieved false and return red if recieved true

  const DummyOperation = createOperation<[boolean, boolean], Color>({
    name: 'DummyOperation',
    ingredients: ['boolean', 'boolean'],
    result: 'color',
    operate([bool, bool2]) {
      if (bool) return Color.red;
      if (bool2) throw new OperationInvalidIngredientError("Dummy");
      throw new Error("Dummy")
    }
  })

  const DummyOperationSuccessResult = DummyOperation([true, true])
  const DummyOperationExpectedSuccessResult = {
    name: 'DummyOperation',
    ingredients: [true, true],
    isError: false,
    result: Color.red
  }

  it("should return a success object on success", () => {
    expect(DummyOperationSuccessResult).toEqual(DummyOperationExpectedSuccessResult)
  })

  const DummyOperationErrorResult = DummyOperation([false, true])
  const DummyOperationExpectedErrorResult = {
    name: 'DummyOperation',
    ingredients: [false, true],
    isError: true,
    error: "Dummy"
  }

  it("should return an error object on error", () => {
    expect(DummyOperationErrorResult).toEqual(DummyOperationExpectedErrorResult)
  })


  it("should throw an error if error is not invalid ingredient error", () => {
    expect(() => DummyOperation([false, false])).toThrow(Error)
  })
})
