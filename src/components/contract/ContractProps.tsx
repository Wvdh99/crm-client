import React, {
  ChangeEvent,
} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Checkbox,
  Form, Input, Label, TextArea,
} from 'semantic-ui-react';
import { Contract, ContractParams } from '../../clients/server.generated';
import { formatPrice } from '../../helpers/monetary';
import { createSingleContract, saveSingleContract } from '../../stores/contract/actionCreators';
import ResourceStatus from '../../stores/resourceStatus';
import { RootState } from '../../stores/store';
import ContractPropsButtons from './ContractPropsButtons';

interface Props {
  create?: boolean;
  onCancel?: () => void;

  contract: Contract;
  status: ResourceStatus;

  saveContract: (id: number, contract: ContractParams) => void;
  createContract: (contract: ContractParams) => void;
}

interface State {
  editing: boolean;

  title: string;
  companyId: string;
  contactId: string;
  comments: string;
}

class ContractProps extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      editing: props.create ?? false,
      ...this.extractState(props),
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.status === ResourceStatus.SAVING
      && this.props.status === ResourceStatus.FETCHED) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ editing: false });
    }
  }

  extractState = (props: Props) => {
    const { contract } = props;
    return {
      title: contract.title,
      companyId: contract.companyId.toString(),
      contactId: contract.companyId.toString(),
      comments: contract.comments ?? '',
    };
  };

  toParams = (): ContractParams => {
    return new ContractParams({
      title: this.state.title,
      companyId: parseInt(this.state.companyId, 10),
      contactId: parseInt(this.state.contactId, 10),
      comments: this.state.comments,
    });
  };

  edit = () => {
    this.setState({ editing: true, ...this.extractState(this.props) });
  };

  cancel = () => {
    if (!this.props.create) {
      this.setState({ editing: false, ...this.extractState(this.props) });
    } else if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  save = () => {
    if (this.props.create) {
      this.props.createContract(this.toParams());
    } else {
      this.props.saveContract(this.props.contract.id, this.toParams());
    }
  };

  render() {
    const {
      editing,
      title,
      companyId,
      contactId,
      comments,
    } = this.state;

    return (
      <>
        <h2>
          {this.props.create ? 'New Contract' : 'Details'}

          <ContractPropsButtons
            editing={editing}
            status={this.props.status}
            cancel={this.cancel}
            edit={this.edit}
            save={this.save}
          />
        </h2>

        <Form style={{ marginTop: '2em' }}>
          <Form.Field
            disabled={!editing}
            id="form-input-title"
            fluid
            control={Input}
            label="Title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
              title: e.target.value,
            })}
          />
          <Form.Field
            disabled={!editing}
            fluid
            id="form-input-companyId"
            control={Input}
            label="Company ID"
            value={companyId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
              companyId: e.target.value,
            })}
          />
          <Form.Field
            disabled={!editing}
            fluid
            id="form-input-contactId"
            control={Input}
            label="Contact ID"
            value={contactId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
              contactId: e.target.value,
            })}
          />
          <Form.Field
            disabled={!editing}
            fluid
            id="form-input-comments"
            control={Input}
            label="comments"
            value={comments}
            onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({
              comments: e.target.value,
            })}
          />
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    status: state.contract.singleStatus,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveContract: (id: number,
    contract: ContractParams) => dispatch(saveSingleContract(id, contract)),
  createContract: (contract: ContractParams) => dispatch(createSingleContract(contract)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractProps);
