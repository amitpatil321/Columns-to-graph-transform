import React, { useEffect } from "react";
// eslint-disable-next-line camelcase
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

import { useSelector } from "react-redux";

import GraphDiv from "../GraphDiv/GraphDiv";

const PieChart = () => {
  const { graphColumns, selectedRows } = useSelector(
    ({ appReducer }) => appReducer,
  );

  const { category, values } = graphColumns;

  const makeGraph = () => {
    let chart = null;
    const root = am5.Root.new("pieChartdiv");
    // eslint-disable-next-line camelcase
    root.setThemes([am5themes_Animated.new(root)]);

    chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      }),
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: values,
        categoryField: category,
        alignLabels: false,
      }),
    );

    series.labels.template.setAll({
      textType: "circular",
      centerX: 0,
      centerY: 0,
    });

    series.data.setAll(selectedRows);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }),
    );

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);
    return root;
  };

  useEffect(() => {
    let root = null;
    if (graphColumns?.category && graphColumns?.values.length)
      root = makeGraph();

    return () => root && root.dispose();
  }, [graphColumns]);

  return <GraphDiv graphColumns={graphColumns} graphDiv="pieChartdiv" />;
};

export default PieChart;
