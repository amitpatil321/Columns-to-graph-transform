// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import React, { useState } from "react";
import { SelectableGroup, createSelectable } from "react-selectable-fast";
import { Table, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { setSelectedRows } from "../store/appReducer";

import CONFIG from "../config/config";
import { utils } from "../utils/utils";

import "../App.css";

const items = [
  {
    label: "Clustered Chart",
    key: "clustered",
  },
  {
    label: "Stacked Chart",
    key: "stacked",
  },
  {
    label: "Pie Chart",
    key: "pie",
  },
  {
    type: "divider",
  },
  {
    label: "Export to CSV",
    key: "csv",
  },
];

const AntdTableToGraph = ({ columns, dataSource, setGraphType }) => {
  const dispatch = useDispatch();
  const { uniqId, selectedRows } = useSelector(({ appReducer }) => appReducer);
  const [colsSelected, setColsSelected] = useState();

  const onSelection = (selectedKeys) => {
    const dataArr = [];
    setColsSelected(selectedKeys);
    selectedKeys.map((each) => {
      const { selectableKey, children } = each.props;
      const [id, column] = selectableKey.split(CONFIG.KEY_SEPERATOR);
      dataArr.push({ [CONFIG.UNIQID_KEY]: id, [column]: children });
      return each;
    });
    const result = Object.values(
      dataArr.reduce((grouped, item) => {
        const { [CONFIG.UNIQID_KEY]: uuid, ...rest } = item;
        if (!grouped[uuid]) {
          grouped[uuid] = { uuid };
        }
        Object.assign(grouped[uuid], rest);
        return grouped;
      }, {}),
    );

    dispatch(setSelectedRows(result));
  };

  // Modify columns array and wrap with selectable component
  const modColumns = columns.map((column) => ({
    ...column,
    render(text, record, index) {
      return {
        children: (
          <SelectableComponent
            selectableKey={`${record[[CONFIG.UNIQID_KEY]]}${
              CONFIG.KEY_SEPERATOR
            }${column.key}`}>
            {text}
          </SelectableComponent>
        ),
      };
    },
  }));

  // Handle menu item click
  const onMenuClick = (selected) => {
    console.log(selectedRows);
    if (selected === "csv") {
      (async () => {
        try {
          const csv = await utils.convertObjectToCSV(selectedRows);
          utils.downloadCSV(csv, "records.csv");
          console.log(csv);
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    } else setGraphType(selected);
  };

  return (
    <SelectableGroup
      onSelectionFinish={onSelection}
      deselectOnEsc
      resetOnStart
      selectOnClick={false}
      allowClickWithoutSelected>
      <Dropdown
        menu={{
          items,
          onClick: (selectedOpt) => onMenuClick(selectedOpt?.key),
        }}
        trigger={["contextMenu"]}
        disabled={!colsSelected?.length}>
        <div
          style={{
            color: "lightblue",
            background: "white",
            height: 200,
            textAlign: "center",
            lineHeight: "200px",
          }}>
          <Table
            rowKey={(record) => record[uniqId]}
            columns={modColumns}
            dataSource={dataSource}
            pagination={{
              pageSize: CONFIG.TABLE_PAGE_SIZE,
            }}
          />
        </div>
      </Dropdown>
    </SelectableGroup>
  );
};

AntdTableToGraph.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  setGraphType: PropTypes.func,
  dataSource: PropTypes.arrayOf(PropTypes.object),
};

const PrintData = ({ selectableRef, isSelected, isSelecting, children }) => (
  <div
    ref={selectableRef}
    className={isSelecting || isSelected ? "selected" : null}>
    {children}
  </div>
);

PrintData.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSelected: PropTypes.bool,
  isSelecting: PropTypes.bool,
  selectableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

const SelectableComponent = createSelectable(PrintData);

export default AntdTableToGraph;
