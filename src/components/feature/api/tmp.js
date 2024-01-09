import React, { createContext, useContext, useReducer, useMemo } from 'react';

// Action types
const INCREMENT = 'INCREMENT';

// Action creator
const incrementAction = () => ({
  type: INCREMENT,
});

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  count: 0,
};

// Create a context with an initial value (in this case, an empty function)
const MyContext = createContext();

// A provider component that will wrap around the part of the app where you want to use this context
const MyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoize the context value to avoid unnecessary renders
  const contextValue = useMemo(() => ({
    state,
    dispatch,
    increment: () => dispatch(incrementAction()),
  }), [state, dispatch]);

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

// A component that consumes the context
const MyComponent = () => {
  // Use useContext to access the context value
  const { state, increment } = useContext(MyContext);

  return (
    <div>
      <p>Component using context</p>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

// App component where the provider is used
const App = () => {
  return (
    <MyContextProvider>
      <MyComponent />
    </MyContextProvider>
  );
};

export default App;
