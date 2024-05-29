import { useDispatch as originalUseDispatch, useSelector as originalUseSelector } from 'react-redux';
import type { RootState, AppDispatch } from './root';

// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
export const useDispatch = originalUseDispatch.withTypes<AppDispatch>();
export const useSelector = originalUseSelector.withTypes<RootState>();
