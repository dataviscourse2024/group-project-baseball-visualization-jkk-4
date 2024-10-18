import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h3>CS-5630 / CS-6630 Homework 3</h3>
      <address>
        <span>Name: Jaden Lee  -</span>
        <span>-  Email: u1417827@utah.edu   -</span>
        <span>-  UID: u1417827</span>
      </address>
      <br />
      <hr />
      <br />

      <div className={styles.toolbox}>

        <span>
          <label>Dataset:</label>
          <select id="dataset">
            <option value="covid_us">The US</option>
            <option selected value="covid_utah">Utah</option>
            <option value="covid_ca">California</option>
            <option value="covid_ny">New York</option>
          </select>
        </span>
        <span>
          <label>Data Metric</label>
          <select id="metric">
            <option value="deaths">Deaths</option>
            <option value="cases">Cases</option>
          </select>
        </span>

        <span> <input type="checkbox" id="random" /> Random Subset </span>
      </div>
      <br />

      <div className={styles.row + " " + styles.chart}>
        <div className={styles.chart}>
          <h2>Bar Charts</h2>
          <div id="Barchart-div">
          </div>
        </div>

        <div className={styles.chart}>
          <h2>Line Charts</h2>
          <div id="Linechart-div"></div>
        </div>
      </div>

      <div className={styles.row + " " + styles.chart}>
        <div className={styles.chart}>
          <h2>Area Charts</h2>
          <div id="Areachart-div"></div>
        </div>

        <div className={styles.chart}>
          <h2>Scatterplot</h2>
          <div id="Scatterplot-div"></div>
        </div>
      </div>
    </div>
  );
}
