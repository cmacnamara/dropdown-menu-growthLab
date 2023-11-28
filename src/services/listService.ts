async function getLocationsFile() {
  const response = await fetch('https://gist.githubusercontent.com/bleonard33/38a183289ed87082fed7b2547f2eea49/raw/3290b8ea9791c4e632520a9e1849f580bb82346a/census_classification.json')
  const data = await response.json()
  return data
}

export async function getLocations() {
  try {
    const rawData = await getLocationsFile()
    return rawData
  } catch (error) {
    console.log(error);
  }
}