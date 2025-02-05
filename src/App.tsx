import { ChangeEvent } from 'react';
import './App.css';
import { Component } from 'react';

const initialParams = [
  { id: 1, name: 'Цвет' },
  { id: 2, name: 'Форма' },
  { id: 3, name: 'Размер' },
];

const initialModel = {
  paramValues: [
    { paramId: 2, value: 'Шар' },
    { paramId: 3, value: 'Большой' },
    { paramId: 4, value: 'Хочу купить' },
  ],
};

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

function App() {
  return (
    <main>
      <h1>Редактор параметров</h1>
      <h2>Тестовое задание Selsup</h2>
      <p>
        Текст задания находится{' '}
        <a href="/Тестовое_задание_Frontend.pdf" rel="noreferrer">
          {' '}
          тут
        </a>
      </p>
      <article>
        <h3>Немного комментариев от себя</h3>
        <p>
          Не могу быть уверенным, что правильно понял описание задания. В
          частности, в описанных структурах есть свойства, природа которых
          неясна. Также не было ясно, всегда ли id и paramId совпадают. Поэтому
          реализация может быть не такой, как это предполагалось. Постарался
          учесть ситуацию, когда id в структурах не совпадают.
        </p>
      </article>
      <ParamEditor params={initialParams} model={initialModel} />
    </main>
  );
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = mergeProps(this.props.params, this.props.model.paramValues);
  }

  getModel(): Model {
    return {
      paramValues: this.state.merged.map((item) => {
        return {
          paramId: item.id,
          value: item.value,
        };
      }),
    };
  }

  updateState(paramValue: ParamValue): void {
    const target = this.state.merged.find(
      (param) => param.id === paramValue.paramId,
    );
    if (target) {
      this.setState({
        ...this.state,
        merged: [
          ...this.state.merged.filter(
            (param) => param.id !== paramValue.paramId,
          ),
          {
            id: target.id,
            name: target.name,
            value: paramValue.value,
            order: target.order,
          },
        ].toSorted((item1, item2) => item1.order - item2.order),
      });
    }
  }

  render() {
    const { merged } = this.state;

    return (
      <div className="content">
        <Editor merged={merged} updateState={this.updateState.bind(this)} />
        <Model getModel={this.getModel.bind(this)} />
      </div>
    );
  }
}

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

export default App;
