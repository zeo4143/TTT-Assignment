import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { saveAs } from 'file-saver';
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const response = await axios.get(
      "https://www.terriblytinytales.com/test.txt"
    );
    const text = response.data.trim();
    const words = text.split(/[\s.,]+/);
    const wordCounts = {};
    for (const word of words) {
      if (word in wordCounts) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    }
    const sortedWordCounts = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    setData(sortedWordCounts);
  };

  const handleExport = () => {
    const csvData = data.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'histogram.csv');
  };

  useEffect(() => {
    let chart = null;
    if (data) {
      const canvas = document.getElementById("chart");
      if (Chart.getChart(canvas)) {
        Chart.getChart(canvas).destroy();
      }
      chart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: data.map(([word]) => word),
          datasets: [
            {
              label: "Word Frequency",
              data: data.map(([, count]) => count),
              backgroundColor: "#E9A0A0",
              borderColor: "rgba(0, 0, 0, 0)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              padding: 20,
              font: {
                size: 24,
              },
              text: 'Top 20 Words with Highest Occurrence ',
              position: 'top'
            },  
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                display:false
              },
            },
          }
        }
      });
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data]);

  return (
    <div >
      <center>
        {!data && <button className="btnSubmit" type="submit" onClick={handleSubmit} disabled={disabled}>
          Submit
        </button>}

        {data && (
          <>
            <canvas
              id="chart"
              style={{ width: "80px", height: "20px", marginTop: "15%" }}
            ></canvas>
            <button className="btnExport" onClick={handleExport}>Export</button> <br />
            <span>Click to Download Data</span>
          </>
        )}
      </center>
    </div>
  );
}
