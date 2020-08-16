import checkPropTypes from "check-prop-types";
import rootReducer from "../src/Redux/Reducers";
import { createStore, applyMiddleware } from "redux";
import { middlewares } from "../src/Redux/Store";

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * @function storeFactory
 * @param {object} initialState - Initial state for store
 * @returns {Store} - Redux Store
 */
export const storeFactory = (initialState) => {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddlewares(rootReducer, initialState);
};

/**
 * Return node(s) with the given data-test attribute
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * @function checkProps
 * @param {JSX.Element} - component
 * @param {object} - conforming props
 */
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
