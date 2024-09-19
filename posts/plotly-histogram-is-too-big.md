---
title: "Plotly Histogram is too big"
description: "Some code to make a reasonable sized plotly histogram."
date: "2024-09-19"
---

I recently made a plot with plotly's `px.histogram` function in a Jupyter notebook, and saved it. I was surprised to find that the resulting plot was enormous in size! The chart bloated the notebook to 30Mb in size, which slowed down the notebook and caused some issues with other downstream custom tools in the data analysis pipeline. The issue can be recreated by running some python code like the following:

```python
import numpy as np
import pandas as pd
import plotly.express as px

# Generate a million points from a normal distribution and put them in a DataFrame
df = pd.DataFrame({
    'normal_data': np.random.normal(loc=0, scale=1, size=1_000_000),
    'colour': [1] * 500_000 + [2] * 500_000  # Half 1s and half 2s
})

# Create the histogram using Plotly
fig = px.histogram(df, x='normal_data', color='colour', nbins=50, title="Histogram of a Normal Distribution")

# Show the figure
fig.show()

```

I did some googling and found the [following page](https://community.plotly.com/t/huge-size-of-histogram-and-jupyter-notebook-file/47869), where it was mentioned that:

> ...when you plot a histogram via plotly, it stores all the orginal data in the json file and makes the bins and counts on the javascript side.

Oh no. Let's confirm that. If I open the notebook as a json file, which all `.ipynb` files are, then we can see that 'Alexboiboi' from the Plotly community is correct, and that the file is huge because there are 1 million datapoints all stored in the json blob, which when rendered by plotly, show a nice histogram. Our friend also mentions and gives some code to overcome the problem, by performing binning first, and then plotting the bins as a bar graph to look similar to the histogram. Unfortunately when I wanted to use this, I wanted to also provide the 'color' argument to the histogram, and his example didn't cover that, so I wrote my own function. Here it is:

```python
import pandas as pd
import plotly.graph_objects as go
import numpy as np

df = pd.DataFrame({
    'normal_data': np.random.normal(loc=0, scale=1, size=1_000_000),
    'colour': [1] * 500_000 + [2] * 500_000  # Half 1s and half 2s
})

def plotly_histogram(df: pd.DataFrame, data_column: str, colour_column: str, nbins: int) -> go.Figure:
    """
    Create a stacked histogram with Plotly using data from a DataFrame.

    Args:
        df (pd.DataFrame): The DataFrame containing the data.
        data_column (str): The column containing the data to plot.
        colour_column (str): The column used to distinguish groups for stacking.
        nbins (int): Number of bins for the histogram.

    Returns:
        go.Figure: A Plotly Figure object representing the histogram.
    """
    fig = go.Figure()
    groups = df.groupby(colour_column)

    # Calculate the bin width for consistency across all traces
    data_bins = np.linspace(min(df[data_column]), max(df[data_column]), nbins)
    width = data_bins[1] - data_bins[0]

    # Loop through each group (colour)
    for _, (colour, group) in enumerate(groups):
        counts, bins = np.histogram(group[data_column], bins=data_bins)

        # Add trace for each group with corresponding color
        fig.add_trace(go.Bar(
            x=bins[:-1],  # Take the left bin edges for plotting
            y=counts,
            name=f'Group {colour}',
            width=width
        ))

    # Formatting
    fig.update_layout(
        barmode="stack",
        title="Stacked Histogram",
        xaxis_title=data_column,
        yaxis_title="Frequency",
    )
    fig = fig.update_traces(marker_line_width=0)

    return fig

# Generate and show the figure
fig = plotly_histogram(df, 'normal_data', 'colour', nbins=50)
fig.show()
```

Both these little code samples generate essentially the same plots, but when saved in Jupyter notebooks, the first is ~30Mb, and the second is 24kb.
