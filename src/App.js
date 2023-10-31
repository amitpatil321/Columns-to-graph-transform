import PropTypes from "prop-types";
import React, { Component } from "react";
import { Table, Row, Col } from "antd";
import { SelectableGroup, createSelectable } from "react-selectable-fast";
import "react-table-drag-select/style.css";

import "./App.css";

const PrintData = ({ selectableRef, isSelected, isSelecting, children }) => (
  <div ref={selectableRef} className={isSelected ? "selected" : null}>
    {children}
  </div>
);

PrintData.propTypes = {
  children: PropTypes.element,
  isSelected: PropTypes.bool,
  isSelecting: PropTypes.bool,
  selectableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

const SelectableComponent = createSelectable(PrintData);

class App extends Component {
  state = {
    dragStart: false,
    tableFormat: [],
    selectedKeys: [],
    dataObj: [],
  };

  // componentDidMount() {
  //   window.localStorage.setItem("data", JSON.stringify([]));
  // }

  handleSelection = (selectedKeys) => {
    this.setState({ selectedKeys }, () => {
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
        }, {}),
      );
    });
  };

  resetSelection = (selectedKeys) => {
    this.setState({ selectedKeys: [] });
  };

  getIndex = (record) => this.data.findIndex((x) => x.id === record.id);

  handleTouchEndWindow = (event) => {
    this.setState({ dragStart: true });
    // console.log(event.target);
  };

  onCellClick = (record, event) => {
    const { dragStart, tableFormat } = this.state;
    this.setState((prevState) => {
      return {
        dragStart: !prevState.dragStart,
        tableFormat: [...tableFormat, record.id],
      };
    });
  };

  onMouseDown = (record, event) => {
    // console.log(record, event);
    this.setState({ dragStart: true });
  };
  onMouseUp = () => {
    this.setState({ dragStart: false });
  };
  dragging = (event, record) => {
    const { dragStart } = this.state;
    // if (dragStart) console.log(record.id);
  };

  render = () => {
    const { selectedKeys: selectedData } = this.state;
    let columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "nickname",
        key: "nickname",
        render(text, record, index) {
          const { dataObj } = this.state;
          let selected = selectedData.indexOf(`${record.id}-nickname`) > -1;
          return {
            props: {
              className: dataObj.filter((each) => each.id === record.id)
                ? "selected"
                : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-nickname`}>
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
      {
        title: "Missing Field",
        dataIndex: "missingField",
        key: "missingField",
        render(text, record, index) {
          let selected = selectedData.indexOf(`${record.id}-missingField`) > -1;
          return {
            props: {
              className:
                selectedData.indexOf(`${record.id}-missingField`) > -1
                  ? "selected"
                  : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-missingField`}>
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
      {
        title: "Object Type",
        dataIndex: "objectType",
        key: "objectType",
        render(text, record, index) {
          let selected = selectedData.indexOf(`${record.id}-objectType`) > -1;
          return {
            props: {
              className:
                selectedData.indexOf(`${record.id}-objectType`) > -1
                  ? "selected"
                  : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-objectType`}>
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render(text, record, index) {
          let selected = selectedData.indexOf(`${record.id}-status`) > -1;
          return {
            props: {
              className:
                selectedData.indexOf(`${record.id}-status`) > -1
                  ? "selected"
                  : "",
            },
            children: (
              <SelectableComponent
                selected={selected}
                selectableKey={`${record.id}-status`}>
                {text}
              </SelectableComponent>
            ),
          };
        },
      },
    ];
    return (
      <Row>
        <Col span={4} />
        <Col span={16}>
          <button onClick={this.resetSelection}>Reset</button>
          <SelectableGroup onSelectionFinish={this.handleSelection}>
            <Table
              id="table"
              rowKey={(record) => record.id}
              // onRow={(record, rowIndex) => {
              //   return {
              //     onMouseDown: (event) => this.handleCell(record, rowIndex, event),
              //     onClick: (event) => {
              //       console.log("hello");
              //     }, // click row
              //   };
              // }}
              columns={columns}
              dataSource={this.data}
            />
          </SelectableGroup>
        </Col>
        <Col span={4} />
      </Row>
    );
  };
}

export default App;
