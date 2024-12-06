# MLB Visualizations

## DS-4630 / CS-5630 / CS-6630 Visualization Project

See (https://dataviscourse2024.github.io/group-project-baseball-visualization-jkk-4/MLB%20Visualization/index.html) for project website

Youtube Video:
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZIOLiJTlYgI?si=wMXi08fh5Now47ZZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Details

- Group: baseball-visualization-jkk-4
- Author: Jaden Lee, Kendall Ruth, Kacey Abbott
- Affiliation: University of Utah
- Professor: Paul Rosen
- Created Date: September 13, 2024
- Repository Link: https://github.com/dataviscourse2024/group-project-baseball-visualization-jkk-4
- Copyright: This code may not be copied or edited for academic use.
- Description: Creates visualizations representing baseball statistics.

### Installation

1. Install a Python virtual environment and activate it.
1. pip install fastapi

### Instructions

To run the website, we must run a frontend and backend server. Because we are using D3 for our visualizations, the frontend runs on JavaScript. We can access a lot of data through a python API so we've developed a backend with that.

- First navigate to the 'MLB Visualization' directory.
- To start the backend API server, run ```fastapi dev server.py```. This will be used to fulfill data requests with JSON from localhost:8000.
- To start the frontend website, run ```python3 -m http.server 8080```. Open localhost:8080 in your browser and navigate to the proper directory to view the site.

### Assumptions

- n/a

### References

- n/a
