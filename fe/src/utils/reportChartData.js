export const reportChartData = (obj, keyToReport) => {
  let labels = [];
  let datasets = { data: [] };

  Object.entries(obj)
    .toSorted((a, b) => new Date(a[0]) - new Date(b[0]))
    .forEach(([key, value]) => {
      labels.push(`${key.slice(5, 7)}/${key.slice(8, 10)}`);
      datasets.data.push(value[keyToReport]);
    });

  return { labels, datasets };
};
