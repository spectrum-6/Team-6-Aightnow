import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type TAreaChartProps = {
  width?: number;
  height?: number;
};

export default function AreaChart(props: TAreaChartProps) {
  const { width, height } = props;

  const options = {
    responsive: true,
    tension: 0.3,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9F9F9F",
        },
      },
      y: {
        grid: {
          display: false,
        },
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: true,
      },
    },
  };

  const labels = ["", "2024/04", "", "2024/05", "", "2024/06", ""];

  const datas = [15, 45, 27, 56, 80, 70, 90];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: datas,
        borderColor: "#00ACF2",
        pointRadius: 0,
        borderWidth: 1,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(71, 180, 225, 0.7)");
          gradient.addColorStop(0.6, "rgba(71, 180, 225, 0.07)");
          return gradient;
        },
        fill: "origin",
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} width={width} height={height} />
    </div>
  );
}
