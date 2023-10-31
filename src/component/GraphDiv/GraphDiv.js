import PropTypes from "prop-types";
import React from "react";

import { Row, Col, Alert } from "antd";

const GraphDiv = ({ graphColumns, graphDiv }) => {
  console.log(graphColumns, graphDiv);
  return (
    <Row>
      <Col span={24}>
        {!graphColumns?.category && (
          <Alert type="info" message="Please select a category axis" showIcon />
        )}
        {!graphColumns?.values?.length && (
          <>
            <br />
            <Alert type="info" message="Please select a series" showIcon />
          </>
        )}
        <div id={graphDiv} style={{ width: "100%", height: "500px" }} />
      </Col>
    </Row>
  );
};

GraphDiv.propTypes = {
  graphDiv: PropTypes.any,
  graphColumns: PropTypes.shape({
    category: PropTypes.any,
    values: PropTypes.shape({
      length: PropTypes.any,
    }),
  }),
};

export default GraphDiv;
