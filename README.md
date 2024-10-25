# MLB Visualizations

## DS-4630 / CS-5630 / CS-6630 Visualization Project

See https://www.dataviscourse.net/2024/project/ for detailed instructions.

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
