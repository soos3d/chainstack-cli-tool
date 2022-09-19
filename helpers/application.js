const extractApplicationsMetadata = ({ results }) => {
  const metadata = [];
  const beautified = [];

  results.forEach((result, index) => {
    metadata.push({ index, id: result.id, name: result.name });
    beautified.push(
      `[${index}]|${result.id}|${result.name} (${result.type})|By: ${
        result.creator && result.creator.email
      }`
    );
  });

  return { metadata, beautified };
};

const extractApplicationId = (selected) => {
  console.log(selected);
  return selected.split("|")[1];
};

module.exports = {
  extractApplicationsMetadata,
  extractApplicationId,
};
