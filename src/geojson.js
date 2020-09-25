export const geojson = (data) => ({
  type: 'FeatureCollection',
  features: data.map(project => ({
    type: 'Feature',
    properties: {
      description: project.title,
      icon: project.icon,
      id: project.id,
      subject: project.subject
    },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(project.lon.replace(',', '.')), parseFloat(project.lat.replace(',', '.'))]
    }
  }))
}
)
