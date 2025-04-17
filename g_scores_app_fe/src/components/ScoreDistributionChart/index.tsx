import { IScoreRange } from '@/types/report';
import { useState } from 'react';
import Chart from 'react-apexcharts';

type ScoreDistributionChartProps = {
  subjectScores: Array<{
    subject: string;
    scoreRange: IScoreRange;
  }>;
};

export function ScoreDistributionChart({
  subjectScores,
}: ScoreDistributionChartProps) {
  // Extract subject names for x-axis categories
  const subjects = subjectScores.map((item) => item.subject);

  // Transform data to have score ranges as series
  const [chartState] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexCharts.ApexOptions;
  }>({
    // Create one series per score level
    series: [
      {
        name: 'Excellent (≥8)',
        data: subjectScores.map((item) => item.scoreRange.level_4),
      },
      {
        name: 'Good (6-8)',
        data: subjectScores.map((item) => item.scoreRange.level_3),
      },
      {
        name: 'Average (4-6)',
        data: subjectScores.map((item) => item.scoreRange.level_2),
      },
      {
        name: 'Below Average (<4)',
        data: subjectScores.map((item) => item.scoreRange.level_1),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 6,
          columnWidth: '70%',
        },
      },
      xaxis: {
        categories: subjects,
        labels: {
          style: {
            fontSize: '10px',
            fontFamily: 'Calibri Regular',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: 'Number of Students',
        },
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + ' students';
          },
        },
        fixed: {
          enabled: true,
          position: 'topRight',
          offsetY: 0,
          offsetX: 20,
        },
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      // Add distinctive colors for each score level
      colors: ['#10b981', '#8b5cf6', '#f59e0b', '#ef4444'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              offsetY: -10,
            },
          },
        },
      ],
    },
  });

  console.log(chartState.options);
  console.log(chartState.series);

  return (
    <div className="h-80 w-full">
      <Chart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height="100%"
      />
    </div>
  );
}
