import _ from "lodash"
import * as wgs from "./wgs"

export default function currentTrains(announcement, stations) {
  const grouped = _.groupBy(announcement, "AdvertisedTrainIdent")
  const object = _.filter(_.map(grouped, announcementsToObject), "ToLocation")
  const sorted = sortTrains(object, direction(announcement), stations)
  return _.filter(_.reject(sorted, hasArrivedAtDestination), isPendel)

  function announcementsToObject(v) {
    const actual = _.maxBy(
      _.filter(v, "TimeAtLocation"),
      a => a.TimeAtLocation + a.ActivityType
    )

    if (actual) {
      const withToLocation = _.find(v, "ToLocation")
      const withProductInformation = _.find(v, "ProductInformation")
      return {
        ...actual,
        ToLocation:
          withToLocation && !actual.ToLocation
            ? withToLocation.ToLocation
            : actual.ToLocation,
        ProductInformation:
          withProductInformation && !actual.ProductInformation
            ? withProductInformation.ProductInformation
            : actual.ProductInformation
      }
    }
  }

  function direction(announcements) {
    return (
      announcements.length &&
      /\d\d\d[13579]/.test(announcements[0].AdvertisedTrainIdent)
    )
  }

  function hasArrivedAtDestination(train) {
    return (
      train.ActivityType === "Ankomst" &&
      _.map(train.ToLocation, "LocationName").join() === train.LocationSignature
    )
  }

  function isPendel(train) {
    return !train.ProductInformation || train.ProductInformation.length === 2
  }

  function sortTrains(object, dir) {
    return _.orderBy(
      object,
      [
        a => north(a.LocationSignature, stations),
        "ActivityType",
        "TimeAtLocation"
      ],
      ["desc", dir ? "asc" : "desc", dir ? "desc" : "asc"]
    )
  }

  function north(location) {
    if (location === "Gdv") return between("Ngd", "Nyh")
    if (location === "Söc") return between("Söd", "Söu")
    if (location === "Gn") return between("Mö", "Ssä")
    return wgs.north(location, stations)
  }

  function between(loc1, loc2) {
    return 0.5 * wgs.north(loc1, stations) + 0.5 * wgs.north(loc2, stations)
  }
}
