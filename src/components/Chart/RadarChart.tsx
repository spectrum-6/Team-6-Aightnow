import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

type TRadarChartProps = {
  width?: number;
  height?: number;
};

const RadarChart = (props: TRadarChartProps) => {
  const { width, height } = props;

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 2,
          display: false,
        },
        grid: {
          color: ["#9F9F9F", "#E9E9E9", "#E9E9E9", "#E9E9E9", "#E9E9E9"],
        },
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      duration: 1000,
    },
  };

  const data = {
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "AI 리포트",
        data: [8, 9, 5, 7.5, 5],
        backgroundColor: "rgba(178, 230, 250, 0.3)",
        borderColor: "rgba(0, 172, 242, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Radar data={data} options={options} width={width} height={height} />
    </div>
  );
};

export default RadarChart;
