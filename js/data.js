function sortData(jsonData) {
  const sortedData = sortDataByAZ(jsonData);

  transformedData = sortedData.map((item) => {
    const { name, ...otherProperties } = item; // Destructure "name" and the rest
    return {
      model: { name },
      ...otherProperties,
    };
  });
  transformedData = transformedData.slice(0, 10);
  transformedData.forEach((object, index) => {
    object.id = `object-${index}`;
  });
  return transformedData;
}

function sortDataByAZ(jsonData) {
  return jsonData.sort((a, b) => {
    return a.model.name.localeCompare(b.model.name);
  });
}
