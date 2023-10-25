import React from "react";
import { SelectableGroup, createSelectable } from "react-selectable-fast";

import { Table } from "antd";

import "../App.css";

const PrintData = ({ selectableRef, isSelected, isSelecting, children }) => {
  return (
    <div
      ref={selectableRef}
      className={isSelecting || isSelected ? "selected" : null}
    >
      {children}
    </div>
  );
};

const SelectableComponent = createSelectable(PrintData);

const AntdTableToGraph = (props) => {
  const { id, rowKey, columns, dataSource, handleSelection } = props;

  const onSelection = (selectedKeys) => {
    let dataArr = [];
    selectedKeys.map((each) => {
      const { selectableKey, children } = each.props;
      const [id, column] = selectableKey.split("-");
      dataArr.push({ id: id, [column]: children });
    });
    const result = Object.values(
      dataArr.reduce((grouped, item) => {
        const { id, ...rest } = item;
        if (!grouped[id]) {
          grouped[id] = { id };
        }
        Object.assign(grouped[id], rest);
        return grouped;
      }, {})
    );
    handleSelection(result);
  };

  let modColumns = columns.map((column) => {
    return {
      ...column,
      render(text, record, index) {
        return {
          children: (
            <SelectableComponent selectableKey={`${record._id}-${column.key}`}>
              {text}
            </SelectableComponent>
          ),
        };
      },
    };
  });

  return (
    <SelectableGroup
      onSelectionFinish={onSelection}
      deselectOnEsc
      resetOnStart
      selectOnClick={false}
    >
      <Table rowKey={rowKey} columns={modColumns} dataSource={dataSource} />
    </SelectableGroup>
  );
};

export default AntdTableToGraph;
