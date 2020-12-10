import { EntityState } from '@savantly/sprout-api';
import React, { FC, Fragment, ReactElement } from 'react';
import BootstrapTable, { BootstrapTableProps, ColumnDescription } from 'react-bootstrap-table-next';
import { Alert, Button, ButtonGroup, Nav, Navbar, NavItem } from 'reactstrap';
import { confirm, ConfirmModalProps } from '../ConfirmModal/ConfirmModal';
import { Icon } from '../Icon/Icon';

export interface DataTableColumnProviderProps<T> {
  columnDescriptions: ColumnDescription[];
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  onViewClick?: (row: T) => void;
  showActionColumn?: boolean;
  extraActions?: (row: T) => ReactElement;
  deleteModalProps?: ConfirmModalProps;
}

export class DataTableColumnProvider<T> {
  private _onDeleteClick: (row: T) => void;
  private _showActionColumn: boolean;
  private props: DataTableColumnProviderProps<T>;

  constructor(props: DataTableColumnProviderProps<T>) {
    this.props = props;
    this._showActionColumn = this.props.showActionColumn === undefined ? true : this.props.showActionColumn;

    const deleteClick =
      props.onDeleteClick ||
      ((row) => {
        console.log('delete clicked', JSON.stringify(row));
      });

    this._onDeleteClick = (row) => {
      confirm(props.deleteModalProps || { onClose: () => {} }).then((result) => {
        if (result) {
          deleteClick(row);
        } else {
          console.log('canceled', JSON.stringify(row));
        }
      });
    };
  }

  getColumnDescriptions() {
    const columns: ColumnDescription[] = [];
    columns.push(...this.props.columnDescriptions);
    if (this._showActionColumn) {
      columns.push({
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        formatter: (cell: any, row: T) => {
          return (
            <ButtonGroup>
              {this.props.extraActions && this.props.extraActions(row)}
              {this.props.onViewClick && (
                <Button onClick={() => this.props.onViewClick && this.props.onViewClick(row)} color="info">
                  <Icon name="eye" />
                </Button>
              )}
              {this.props.onEditClick && (
                <Button onClick={() => this.props.onEditClick && this.props.onEditClick(row)} color="warning">
                  <Icon name="pen" />
                </Button>
              )}
              {this.props.onDeleteClick && (
                <Button onClick={() => this._onDeleteClick(row)} color="danger">
                  <Icon name="trash-alt" />
                </Button>
              )}
            </ButtonGroup>
          );
        }
      });
    }
    return columns;
  }
}

export interface DataTableProps<T extends object = any>
  extends Omit<BootstrapTableProps, 'keyField' | 'data' | 'columns'> {
  keyField?: string;
  entityState: EntityState<T>;
  columnProvider: DataTableColumnProvider<T>;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
  leftNav?: ReactElement;
  rightNav?: ReactElement;
  createButtonText?: string;
}

export const DataTable: FC<DataTableProps<any>> = ({
  keyField = 'itemId',
  entityState,
  columnProvider,
  onCreateClick,
  showCreateButton = true,
  leftNav,
  rightNav,
  createButtonText = 'Create',
  ...rest
}: DataTableProps<any>) => {
  return (
    <div>
      <Fragment>
        {entityState.error && <Alert color="danger">{entityState.error}</Alert>}
        <Navbar color="light" light>
          <Nav className="mr-auto">{leftNav && leftNav}</Nav>
          <Nav className="ml-auto">
            {rightNav && rightNav}
            {showCreateButton && (
              <NavItem>
                <Button color="secondary" onClick={() => onCreateClick && onCreateClick()}>
                  {createButtonText}
                </Button>
              </NavItem>
            )}
          </Nav>
        </Navbar>
        <BootstrapTable
          keyField={keyField}
          data={entityState.response?.content || []}
          columns={columnProvider.getColumnDescriptions()}
          striped
          hover
          condensed
          {...rest}
        />
      </Fragment>
    </div>
  );
};
