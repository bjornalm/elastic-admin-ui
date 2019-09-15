const camelCaseToSpaces = (text) => text.replace(/([A-Z])/g, ' $1');
const capitalize = (text) => text.replace(/^./, str => str.toUpperCase());

export function createDescriptionList(titles, details) {
  return titles.map(title => ({
    title: capitalize(camelCaseToSpaces(title)),
    description: details.hasOwnProperty(title) ? details[title].toString() : 'n.a.'
  }));
}
