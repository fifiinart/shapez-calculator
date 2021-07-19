import { GameObject, Shape, TypeFromGameObject } from "../util";
declare type OperationIngredient = GameObject | GameObject[];
declare type OperationIngredientType<T> = T extends GameObject ? TypeFromGameObject<T> : T extends any[] ? {
    [K in keyof T]: OperationIngredientType<T[K]>;
} : never;
declare type OperationIngredientTypeList<T> = T extends OperationIngredient[] ? {
    [K in keyof T]: OperationIngredientType<T[K]>;
} : never;
export interface OperationDescriptor<I extends OperationIngredient[], R extends GameObject> {
    name: string;
    ingredients: OperationIngredientTypeList<I>;
    result: TypeFromGameObject<R>;
    operate(ingredients: I): R;
}
export declare class OperationIngredientTypeMismatchError extends Error {
}
export declare class OperationInvalidIngredientError extends Error {
}
export declare function createOperation<I extends OperationIngredient[], R extends GameObject = Shape>(config: OperationDescriptor<I, R>): {
    (ingredients: I): R;
    name: string;
};
export {};
