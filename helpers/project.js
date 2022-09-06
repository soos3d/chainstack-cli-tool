const extractProjectsMetadata = ({ results }) => {
  const metadata = [];
  //console.log(results);

  results.forEach((result, index) => {
    metadata.push({ index, id: result.id, name: result.name });
  });

  return metadata;
};

const extractProjectId = (selected, metadata) => {
  const project = metadata.find((data) => data.name === selected);

  return project.id;
};

module.exports = {
  extractProjectsMetadata,
  extractProjectId,
};
