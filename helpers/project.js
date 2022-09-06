const extractProjectsMetadata = ({ results }) => {
  const metadata = [];
  const beautified = [];

  results.forEach((result, index) => {
    metadata.push({ index, id: result.id, name: result.name });
    beautified.push(
      `${result.id}|${result.name} (${result.type})|By: ${
        result.creator && result.creator.email
      }`
    );
  });

  return { metadata, beautified };
};

const extractProjectId = (selected) => {
  return selected.split("|")[0];
};

module.exports = {
  extractProjectsMetadata,
  extractProjectId,
};
