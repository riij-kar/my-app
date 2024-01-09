import { createContext, useContext, useReducer, useMemo } from 'react';
const ModalContext = createContext();
const ModalDispatchContext = createContext();
const initialModalData = {
    open: false,
    data: {}
}
const modalOpenAction = (data) => ({
    type: 'open',
    data: data
});
const modalCloseAction = (data) => ({
    type: 'close',
    data: data
});
function modalReducer(state, action) {
    switch (action.type) {
      case 'open': {
        return {
            ...state,
            data: {
                title: action.data.title,
                body: action.data.body,
                btnLeft: action.data.btnLeft,
                btnRight: action.data.btnRight
            },
            open:true
        };
      }
      case 'close': {
        return {...state,open:false, data: {}};
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
}
export function useModal() {
    return useContext(ModalContext);
}

export function useModalDispatch() {
    return useContext(ModalDispatchContext);
}
export default function ModalProvider({ children }) {
    const [state, dispatch] = useReducer(modalReducer,initialModalData);
    const contextDispatchValue = useMemo(() => ({
        state,
        dispatch,
        open: (data) => dispatch(modalOpenAction(data)),
        close: () => dispatch(modalCloseAction())
      }), [state, dispatch]);
    return (
      <ModalContext.Provider value={state}>
        <ModalDispatchContext.Provider value={contextDispatchValue}>
          {children}
        </ModalDispatchContext.Provider>
      </ModalContext.Provider>
    );
}