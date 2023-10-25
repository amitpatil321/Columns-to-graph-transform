import React, { Component } from "react";
import { Table, Row, Col } from "antd";

import AntdTableToGraph from "./component/AntdTableToGraph";
import { data } from "./data";

import "./App.css";

class App extends Component {
  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Favorite Fruit",
      dataIndex: "favoriteFruit",
      key: "favoriteFruit",
    },
  ];

  handleSelection = (selection) => console.log(selection);

  render = () => {
    return (
      <Row>
        <Col span={4} />
        <Col span={16}>
          <AntdTableToGraph
            rowKey={(record) => record._id}
            columns={this.columns}
            dataSource={data}
            handleSelection={this.handleSelection}
          />
        </Col>
        <Col span={4} />
      </Row>
    );
  };
}

export default App;
