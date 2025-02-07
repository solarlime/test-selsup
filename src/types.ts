export interface Param {
  id: number;
  name: string;
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Model {
  paramValues: ParamValue[];
}

export interface Props {
  params: Param[];
  model: Model;
}

export type Merged = Array<
  Param & Pick<ParamValue, 'value'> & { order: number }
>;

export type State = { merged: Merged };
