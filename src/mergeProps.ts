import { Param, ParamValue } from './types.tsx';

function mergeProps(params: Param[], paramValues: ParamValue[]) {
  const stateFromParams = params.map((param, i) => {
    const pvIndex = paramValues.findIndex((pv) => pv.paramId === param.id);
    if (pvIndex !== -1) {
      const value = paramValues[pvIndex].value;
      paramValues.splice(pvIndex, 1);
      return {
        id: param.id,
        name: param.name,
        value,
        order: i + 1,
      };
    } else {
      return {
        id: param.id,
        name: param.name,
        value: '',
        order: i + 1,
      };
    }
  });
  if (paramValues.length) {
    return {
      merged: [
        ...stateFromParams,
        ...paramValues.map((pv, i) => ({
          id: pv.paramId,
          name: 'Неизвестный параметр',
          value: pv.value,
          order: stateFromParams.length + i + 1,
        })),
      ],
    };
  } else {
    return {
      merged: stateFromParams,
    };
  }
}

export default mergeProps;
