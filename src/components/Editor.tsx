import type { Merged, ParamValue } from '../types.ts';
import Row from './Row.tsx';

const Editor = (props: {
  merged: Merged;
  updateState: (state: ParamValue) => void;
}) => {
  const { merged, updateState } = props;

  return (
    <form>
      {merged.map((param) => {
        const id = param.id.toString();
        return (
          <Row
            key={id}
            id={id}
            name={param.name}
            value={param.value}
            updateState={updateState}
          />
        );
      })}
    </form>
  );
};

export default Editor;
