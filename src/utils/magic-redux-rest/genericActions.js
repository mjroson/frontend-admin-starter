import axios from 'axios';

const generateactions = (entityName, APIUrl, newActions, pageSize) => {
  function requesting(reqName) {
    return {
      type: `${entityName}/REQUESTING`,
      reqName
    };
  }

  function requestError(reqName, errors) {
    return {
      type: `${entityName}/REQUEST-ERROR`,
      reqName,
      errors
    };
  }

  function list(params, onSuccess, onError, apiEndpoint = APIUrl) {
    return dispatch => {
      const reqName = 'list';
      const processParams = params ? { ...params } : {};

      if (!processParams.limit) {
        processParams.limit = pageSize;
      }
      dispatch(requesting(reqName));
      axios
        .get(apiEndpoint, { params: processParams })
        .then(resp => {
          dispatch({
            type: `${entityName}/LIST`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          const errors = e.response?.data;
          dispatch(requestError(reqName, errors));

          if (typeof onError === 'function') {
            onError({
              errors,
              reqStatus: e.response?.status ?? undefined
            });
          }
        });
    };
  }

  function detail(id, onSuccess, onError, params = {}, apiEndpoint = APIUrl) {
    return dispatch => {
      const reqName = 'detail';
      dispatch(requesting(reqName));
      axios
        .get(`${apiEndpoint}${id}/`, { params })
        .then(resp => {
          dispatch({
            type: `${entityName}/DETAIL`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          const errors = e.response?.data;
          dispatch(requestError(reqName, errors));

          if (typeof onError === 'function') {
            onError({
              errors,
              reqStatus: e.response?.status ?? undefined
            });
          }
        });
    };
  }

  function create(data, onSuccess, onError, apiEndpoint = APIUrl) {
    return dispatch => {
      const reqName = 'create';
      dispatch(requesting(reqName));
      axios
        .post(`${apiEndpoint}`, data)
        .then(resp => {
          dispatch({
            type: `${entityName}/CREATE`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          const errors = e.response?.data;
          dispatch(requestError(reqName, errors));

          if (typeof onError === 'function') {
            onError({
              errors,
              reqStatus: e.response?.status ?? undefined
            });
          }
        });
    };
  }

  function update(data, onSuccess, onError, apiEndpoint = APIUrl) {
    return dispatch => {
      const reqName = 'update';
      dispatch(requesting(reqName));
      axios
        .put(`${apiEndpoint}${data.id}/`, data)
        .then(resp => {
          dispatch({
            type: `${entityName}/UPDATE`,
            data: resp.data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          const errors = e.response?.data;
          dispatch(requestError(reqName, errors));

          if (typeof onError === 'function') {
            onError({
              errors,
              reqStatus: e.response?.status ?? undefined
            });
          }
        });
    };
  }

  function destroy(data, onSuccess, onError, apiEndpoint = APIUrl) {
    return dispatch => {
      const reqName = 'destroy';
      dispatch(requesting(reqName));
      axios
        .delete(`${apiEndpoint}${data.id}/`)
        .then(resp => {
          dispatch({
            type: `${entityName}/DESTROY`,
            data,
            reqName
          });
          if (typeof onSuccess === 'function') {
            onSuccess(resp.data);
          }
        })
        .catch(e => {
          const errors = e.response?.data;
          dispatch(requestError(reqName, errors));

          if (typeof onError === 'function') {
            onError({
              errors,
              reqStatus: e.response?.status ?? undefined
            });
          }
        });
    };
  }

  return { list, create, update, destroy, detail, ...newActions };
};

export default generateactions;
