//通用
export const commonAction = ( name, value ) => (dispatch, getState) => {
  dispatch({
    type: 'COMMON_ACTION',
    payload:{
      name,
      value
    }
  });
};
