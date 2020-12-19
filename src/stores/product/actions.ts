import type { Action } from 'redux';
import type { Product, ProductParams } from '../../clients/server.generated';

// Action types
export enum ProductActionType {
  Fetch = 'Products/Fetch',
  Set = 'Products/Set',
  Clear = 'Products/Clear',

  FetchSingle = 'Products/FetchSingle',
  SetSingle = 'Products/SetSingle',
  SaveSingle = 'Products/SaveSingle',
  ClearSingle = 'Products/SetClear',
}

// Actions
export type ProductsFetchAction = Action<ProductActionType.Fetch>;

export type ProductsSetAction = Action<ProductActionType.Set> & {
  products: Product[]
};

export type ProductsClearAction = Action<ProductActionType.Clear>;

export type ProductsFetchSingleAction = Action<ProductActionType.FetchSingle> & {
  id: number,
};

export type ProductsSetSingleAction = Action<ProductActionType.SetSingle> & {
  product: Product,
};

export type ProductsSaveSingleAction = Action<ProductActionType.SaveSingle> & {
  id: number
  product: ProductParams,
};

export type ProductsClearSingleAction = Action<ProductActionType.ClearSingle>;
