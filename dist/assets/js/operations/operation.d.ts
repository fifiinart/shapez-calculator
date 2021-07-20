import { GameObject, Shape, TypeFromGameObject } from "../util.js";
declare type OperationIngredient = GameObject | GameObject[];
declare type OperationIngredientType<T> = T extends GameObject ? TypeFromGameObject<T> : T extends any[] ? {
    [K in keyof T]: OperationIngredientType<T[K]>;
} : never;
declare type OperationIngredientTypeList<T> = T extends OperationIngredient[] ? {
    [K in keyof T]: OperationIngredientType<T[K]>;
} : never;
export interface OperationDescriptor<I extends OperationIngredient[], R extends OperationIngredient> {
    name: string;
    ingredients: OperationIngredientTypeList<I>;
    result: TypeFromGameObject<R>;
    operate(ingredients: I): R;
}
export interface OperationSuccess<I extends OperationIngredient[], R extends OperationIngredient> {
    name: string;
    ingredients: I;
    isError: false;
    result: R;
}
export interface OperationError<I extends OperationIngredient[]> {
    name: string;
    ingredients: I;
    isError: true;
    error: string;
}
export declare type OperationResult<I extends OperationIngredient[], R extends OperationIngredient> = OperationSuccess<I, R> | OperationError<I>;
export declare class OperationIngredientTypeMismatchError extends Error {
}
export declare class OperationInvalidIngredientError extends Error {
}
export declare function createOperation<I extends OperationIngredient[], R extends OperationIngredient = Shape>(config: OperationDescriptor<I, R>): (ingredients: I) => OperationResult<I, R>;
export {};
