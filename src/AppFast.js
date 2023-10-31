import React from "react";
import { Row, Col } from "antd";

import AntdTableToGraph from "./component/AntdTableToGraph";
import Drawer from "./component/Drawer/Drawer";

import { data, countries } from "./data";

import "./App.css";

const App = () => {
  const columns = [
    {
      title: "Country",
      dataIndex: "Importers",
      key: "Importers",
    },
    {
      title: "2018",
      dataIndex: "2018",
      key: "2018",
    },
    {
      title: "2019",
      dataIndex: "2019",
      key: "2019",
    },
    {
      title: "2020",
      dataIndex: "2020",
      key: "2020",
    },
    {
      title: "2021",
      dataIndex: "2021",
      key: "2021",
    },
  ];

  // Add uniq id to datasource
  // let data = countries?.map((each) => {
  //   return { ...each, uuid: uuidv4() };
  // });

  // console.log(data);

  return (
    <Row>
      <Col span={4} />
      <Col span={16}>
        <AntdTableToGraph columns={columns} dataSource={countries} />
        <Drawer columns={columns} dataSource={countries} />
      </Col>
      <Col span={4} />
    </Row>
  );
};

export default App;
