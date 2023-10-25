import React, { Component } from "react";
import { Table, Row, Col } from "antd";
import { SelectableGroup, createSelectable } from "react-selectable";

import "react-table-drag-select/style.css";

import "./App.css";

class App extends Component {
  state = {
    dragStart: false,
    tableFormat: [],
    selectedKeys: [],
  };

  handleSelection(selectedKeys) {
    this.setState({ selectedKeys });
  }

  data = [
    {
      id: 4151240,
      objectId: "12660",
      missingField: "address",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: 16645,
      completedAt: null,
    },
    {
      id: 4151239,
      objectId: "12660",
      missingField: "nickname",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.421458Z",
    },
    {
      id: 4151241,
      objectId: "12660",
      missingField: "warranty",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151242,
      objectId: "12660",
      missingField: "ownership",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151243,
      objectId: "12660",
      missingField: "linked_loans",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151244,
      objectId: "12660",
      missingField: "owner_contacts",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151245,
      objectId: "12660",
      missingField: "homeowners_insurances",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Patil Family Home",
      objectType: "realestate",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151234,
      objectId: "54084",
      missingField: "valuable_type",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.276448Z",
    },
    {
      id: 4151235,
      objectId: "54084",
      missingField: "nickname",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.293531Z",
    },
    {
      id: 4151236,
      objectId: "54084",
      missingField: "photo",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151237,
      objectId: "54084",
      missingField: "description",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151238,
      objectId: "54084",
      missingField: "owner_contacts",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Computer",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
    {
      id: 4151229,
      objectId: "54083",
      missingField: "valuable_type",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Phone",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.138311Z",
    },
    {
      id: 4151230,
      objectId: "54083",
      missingField: "nickname",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Phone",
      objectType: "valuable",
      status: "completed",
      assignee: null,
      completedAt: "2023-09-29T12:32:14.154620Z",
    },
    {
      id: 4151231,
      objectId: "54083",
      missingField: "photo",
      objectFamilyId: null,
      actionType: "missing_field",
      nickname: "Amit's Phone",
      objectType: "valuable",
      status: "active",
      assignee: null,
      completedAt: null,
    },
  ];

  columns = [
    {
      title: "Name",
      dataIndex: "nickname",
      key: "nickname",
      onCell: (record, rowIndex) => {
        return {
          onMouseDown: (event) => this.onMouseDown(record, event),
          onMouseOver: (event) => this.dragging(event, record, record),
          onMouseUp: (event) => this.onMouseUp(event, record, record),
        };
      },
      render(text, record, index) {
        // const colIndex = this.data.findIndex((x) => x.id === record.id);
        return {
          props: {
            id: `${record.id}-${index}`,
          },
          children: (
            <SelectableComponent
              key={i}
              selected={selected}
              selectableKey={item.id}
            >
              <div className={"selectable"}>{text}</div>
            </SelectableComponent>
          ),
        };
      },
    },
    {
      title: "Missing Field",
      dataIndex: "missingField",
      key: "missingField",
      onCell: (record, rowIndex) => {
        return {
          onMouseDown: (event) => this.onMouseDown(record, event),
          onMouseOver: (event) => this.dragging(event, record),
          onMouseUp: (event) => this.onMouseUp(event, record),
        };
      },
      render(text, record, index) {
        return {
          props: {
            id: `${record.id}-${index}`,
          },
          children: <div className={"selectable"}>{text}</div>,
        };
      },
    },
    {
      title: "Object Type",
      dataIndex: "objectType",
      key: "objectType",
      onCell: (record, rowIndex) => {
        return {
          onMouseDown: (event) => this.onMouseDown(record, event),
          onMouseOver: (event) => this.dragging(event, record),
          onMouseUp: (event) => this.onMouseUp(event, record),
        };
      },
      render(text, record, index) {
        return {
          props: {
            id: `${record.id}-${index}`,
          },
          children: <div className={"selectable"}>{text}</div>,
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      onCell: (record, rowIndex) => {
        return {
          onMouseDown: (event) => this.onMouseDown(record, event),
          onMouseOver: (event) => this.dragging(event, record),
          onMouseUp: (event) => this.onMouseUp(event, record),
        };
      },
      render(text, record, index) {
        return {
          props: {
            id: `${record.id}-${index}`,
          },
          children: <div className={"selectable"}>{text}</div>,
        };
      },
    },
  ];

  getIndex = (record) => this.data.findIndex((x) => x.id === record.id);

  // componentDidMount() {
  //   document
  //     .getElementById("table")
  //     .addEventListener("mousedown", this.handleTouchEndWindow);
  // }

  handleTouchEndWindow = (event) => {
    this.setState({ dragStart: true });
    console.log(event.target);
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
    console.log(record, event);
    this.setState({ dragStart: true });
  };
  onMouseUp = () => {
    this.setState({ dragStart: false });
  };
  dragging = (event, record) => {
    const { dragStart } = this.state;
    if (dragStart) console.log(record.id);
  };

  render = () => {
    const { tableFormat } = this.state;
    // console.log(tableFormat);
    return (
      <Row>
        <Col span={4} />
        <Col span={16}>
          <SelectableGroup onSelection={this.handleSelection}>
            <Table
              id="table"
              // onRow={(record, rowIndex) => {
              //   return {
              //     onMouseDown: (event) => this.handleCell(record, rowIndex, event),
              //     onClick: (event) => {
              //       console.log("hello");
              //     }, // click row
              //   };
              // }}
              columns={this.columns}
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
