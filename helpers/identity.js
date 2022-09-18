const extractIdentityData = ({ results }) => {
  const identityData = [];
  const beautified = [];

  results.forEach((identity, index) => {
    identityData.push({
      index,
      id: identity.id,
      name: identity.name,
      protocol: identity.protocol,
    });
    beautified.push(
      `[${index}]|${identity.id}|${identity.name} (${identity.protocol})|By: ${
        identity.creator && identity.creator.email
      }|status: ${identity.status}`
    );
  });

  return { identityData, beautified };
};

const extractIdentityId = (identitySelected) => {
  return identitySelected.split("|")[1];
};

module.exports = {
  extractIdentityData,
  extractIdentityId,
};
