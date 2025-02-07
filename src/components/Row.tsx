import type { ParamValue } from '../types.ts';
import { ChangeEvent } from 'react';

const Row = (props: {
  id: string;
  name: string;
  value: string;
  updateState: (state: ParamValue) => void;
}) => {
  const { id, name, value, updateState } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateState({ paramId: +id, value: event.target.value });
  };

  return (
    <div key={id}>
      <label htmlFor={id}>{name}</label>
      <input type="text" id={id} onChange={handleChange} value={value}></input>
    </div>
  );
};

export default Row;
