/* eslint-disable camelcase */
import React, { useEffect } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
// import * as am5percent from "@amcharts/amcharts5/percent";
import { useSelector } from "react-redux";

import GraphDiv from "../GraphDiv/GraphDiv";

const BarChart = () => {
  const { graphColumns, selectedRows } = useSelector(
    ({ appReducer }) => appReducer,
  );

  const makeGraph = () => {
    let chart = null;
    const root = am5.Root.new("barChartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
      }),
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      }),
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: graphColumns.category,
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(selectedRows);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name,
          xAxis,
          yAxis,
          valueYField: fieldName,
          categoryXField: graphColumns.category,
        }),
      );

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(90),
        tooltipY: 0,
        strokeOpacity: 0,
      });

      series.data.setAll(selectedRows);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(() =>
        am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        }),
      );

      legend.data.push(series);
    }

    graphColumns?.values?.map((each) => {
      makeSeries(each, each);
      return each;
    });
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    return root;
  };

  useEffect(() => {
    let root = null;
    if (graphColumns?.category && graphColumns?.values.length)
      root = makeGraph();

    return () => root && root.dispose();
  }, [graphColumns]);

  return <GraphDiv graphColumns={graphColumns} graphDiv="barChartdiv" />;
};

export default BarChart;
