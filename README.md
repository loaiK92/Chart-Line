# Chart-Line

This project is a simple single page web app which allows the user to plot of all the samples of a single variable in a simple line chart.
The user is able to select and switch the plotted variable by its name from a simple text input box.

## Data

- The data is containing 2000 data samples (row) & 200 variables, where the first row contains the variable names.
- Datastore structure: my choice for the data storage was MongoDB, due to its fast response time.
The data is stored using mLab database service and structured as one data collection which contains 2000 documents consisting of 200 fields [var001 ... var200].

### Technologies

- The backend was built with Node.js using Express as my web framework and Mongoose library.
- For the user interface I used React.js, and Apexchart for the data visualization, SCSS preprocessor.
- Note: because the response was taking over 3s sometimes on a slow network I used streams to optimize the user experience. Now the user is able to see a result within 300ms while the chart is being populated gradually.

## Getting Started :

1- Clone this repo `git clone https://github.com/loaiK92/Chart-Line.git`

2- Create `variables.env` file in the folder route which should contain : `MongoDB URI` & `port`

- Example:
  - `DATABASE = mongodb://<dbuser>:<dbpassword>@ds254215.mlab.com:254215/database name`
  - `PORT = 8000`

3- Install dependencies `npm install`

4- Run the server `npm run server`
