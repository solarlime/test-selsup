import { Component } from 'react';
import type { Model, ParamValue, Props, State } from '../types.ts';
import mergeProps from '../mergeProps.ts';
import ModelComponent from './Model.tsx';
import Editor from './Editor.tsx';

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
        <ModelComponent getModel={this.getModel.bind(this)} />
      </div>
    );
  }
}

export default ParamEditor;
