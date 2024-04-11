import {Panel} from "./Panel";
import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {EChartsOption} from 'echarts';
import {useSelector} from "react-redux";
import {RootState} from "../../../state/store";

const LineGraphElement = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const scoreData = useSelector((state: RootState) => state.scoreData)

  useEffect(() => {
    const myChart = echarts.init(divRef.current!);
    if (!scoreData.activeScoreID) {
      return;
    }
    const data = scoreData.scores[scoreData.activeScoreID];
    const options = {
      legend: {
        data: ['Accuracy']
      },
      xAxis: {
        type: 'category',
        data: data.timeSeriesData.time,
        axisLabel: {
          formatter: (value: number) => {
            return `${Math.floor(value/60)}:${Math.floor(value%60)}`
          }
        }
      },
      yAxis: {
        scale: true,
        axisLabel: {
          formatter: (value: number) => {
            return `${Math.round(value*10000)/100}%`
          }
        }
      },
      series: {
        name: 'Accuracy',
        type: 'line',
        data: data.timeSeriesData.accuracy,
      },
      dataZoom: [
        {
          id: "zoomX",
          type: "slider",
          xAxisIndex: [0],
          showDetail: false,
        }
      ],
      axisPointer: {
        show: true,
        label: {
          precision: 4
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        position: function (pos, params, el, elRect, size) {
          let obj: any = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        },
      },
    } as EChartsOption;
    myChart.setOption(options);
    myChart.group = "maingroup";
    echarts.connect("maingroup");
  }, [scoreData])

  return (
    <div ref={divRef} style={{width: "600px", height: "300px"}}>
    </div>
  );
};

export const linePanel = {
  info: {
    title: "LineGraph",
    minW: 2,
    minH: 2,
    static: true
  },
  element: <LineGraphElement />
} as Panel;