import type { Model } from '../types.ts';

const Model = (props: { getModel: () => Model }) => {
  const { paramValues } = props.getModel();
  return (
    <div>
      Модель:
      {paramValues.map((paramValue) => {
        return !paramValue.value ? null : (
          <ul key={paramValue.paramId}>
            {Object.entries(paramValue).map((item) => (
              <li>
                {item[0]}: {item[1]}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
};

export default Model;
