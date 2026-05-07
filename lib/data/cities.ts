export type CityInfo = {
  slug: string;
  name: string;
  intro: string;
  body: string[];
  drivingDirections: string;
  distanceFromCoquitlam: string;
};

export const cities: Record<string, CityInfo> = {
  "port-moody": {
    slug: "port-moody",
    name: "Port Moody",
    distanceFromCoquitlam: "10 minutes",
    intro:
      "Drive Point Auto is a short drive from Port Moody, offering Tri-Cities residents a trusted local source for quality pre-owned vehicles.",
    drivingDirections:
      "From Port Moody, take Barnet Highway west toward Coquitlam, then continue onto Brunette Avenue. We're at 819 Brunette Avenue, on the right after the Lougheed/Brunette intersection. About 10 minutes from downtown Port Moody.",
    body: [
      "Port Moody buyers regularly visit our Coquitlam showroom because we focus on what matters most for daily commuters and growing families: clean used SUVs and crossovers, fuel-efficient sedans, and trucks that can handle a weekend trip into the backcountry. If you're commuting from the Inlet area to downtown Vancouver, you already know how much vehicle reliability matters — that's why we inspect every vehicle before it goes on the lot.",
      "Many Port Moody customers come to us with trade-ins from their first or second car, looking to step up to something more practical for kids, gear, or longer drives along the Sea-to-Sky. We accept trade-ins of all conditions and offer fair, no-pressure appraisals. Financing is available for most credit profiles, including newcomers to Canada and first-time buyers.",
    ],
  },
  "burnaby": {
    slug: "burnaby",
    name: "Burnaby",
    distanceFromCoquitlam: "15 minutes",
    intro:
      "Burnaby drivers have been buying from Drive Point Auto for years — we're a quick drive east on the Lougheed and we focus on honest pricing without dealer add-on games.",
    drivingDirections:
      "From North Burnaby, take the Lougheed Highway east; from South Burnaby, take Highway 1 east and exit at Brunette Ave. Either way, you'll arrive at 819 Brunette Avenue in about 15 minutes outside of rush hour.",
    body: [
      "Burnaby is a competitive market with plenty of dealer choice, so we earn customers by being straightforward: every vehicle is inspected, the asking price is the asking price, and we don't pile on doc fees, prep fees, or surprise charges at the till. If you've been frustrated by lowball trade-in offers or upsell pressure on extended warranties at other Burnaby-area dealers, we'd encourage you to come compare.",
      "We carry a rotating mix of used Toyotas, Hondas, Hyundais, Mazdas, Fords, and others — most under 150,000 km, with a focus on vehicles that hold up well in Lower Mainland weather. Service records and Carfax/ICBC history are available for every vehicle on request. If you're a SkyTrain commuter looking for a second household vehicle, we can usually help you find something practical in the under-$15K range.",
    ],
  },
  "new-westminster": {
    slug: "new-westminster",
    name: "New Westminster",
    distanceFromCoquitlam: "10 minutes",
    intro:
      "New Westminster residents are some of our closest neighbours — we're just across the Brunette Interchange and we work hard to be the easy, no-hassle choice for your next used car.",
    drivingDirections:
      "From New Westminster, take Brunette Avenue north across Highway 1 — we're 819 Brunette Avenue, less than 10 minutes from Uptown New West.",
    body: [
      "New West buyers tell us they appreciate how compact and walkable our showroom is — you can browse the whole lot in 20 minutes, take real photos, and have an honest conversation without being shuffled between sales managers. Our team is small on purpose: the person you talk to first is the same person who'll handle your trade, your financing application, and your delivery.",
      "If you live in a Quayside condo or one of New West's older heritage neighbourhoods, parking and reliability are both priorities. We tend to stock right-sized SUVs and sedans that fit residential garages, plus the occasional pickup for tradespeople working in Queensborough or Sapperton. Trade-ins from older vehicles are welcome — we'll appraise as-is, no pre-cleaning needed.",
    ],
  },
};

export const citySlugs = Object.keys(cities);
