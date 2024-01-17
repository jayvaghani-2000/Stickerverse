const getCountry = (data: LocationDataType): string | undefined => {
  for (let i = 0; i < data.results.length; i++) {
    const country = data.results[i].address_components.find(i =>
      i.types.includes("country")
    );
    if (country) {
      return country.long_name;
    }
  }

  return undefined;
};

const getState = (data: LocationDataType): string | undefined => {
  for (let i = 0; i < data.results.length; i++) {
    const state = data.results[i].address_components.find(i =>
      i.types.includes("administrative_area_level_1")
    );
    if (state) {
      return state.long_name;
    }
  }
  return undefined;
};
const getCity = (data: LocationDataType): string | undefined => {
  for (let i = 0; i < data.results.length; i++) {
    const city = data.results[i].address_components.find(i =>
      i.types.includes("administrative_area_level_3")
    );
    if (city) {
      return city.long_name;
    }
  }
  return undefined;
};

const getPostalCode = (data: LocationDataType): string | undefined => {
  for (let i = 0; i < data.results.length; i++) {
    const postalCode = data.results[i].address_components.find(i =>
      i.types.includes("postal_code")
    );
    if (postalCode) {
      return postalCode.long_name;
    }
  }
  return undefined;
};

export const handleGetPostalCodeData = async (postalCode: string) => {
  try {
    const res = await fetch(
      `https://api.postalpincode.in/pincode/${postalCode}`
    );
    const json = await res.json();
    if (json[0].Status === "Success") {
      const data = json[0] as PostalCodeDataType;
      const obj: {
        state?: string;
        city?: string;
      } = {};

      if (data.PostOffice[0].District) {
        obj.city = data.PostOffice[0].District;
      }
      if (data.PostOffice[0].State) {
        obj.state = data.PostOffice[0].State;
      }
      return obj;
    }
    return {};
  } catch (err) {
    return {};
  }
};

export const handleGetLocation = async (
  latitude: number,
  longitude: number,
  token: string
) => {
  try {
    const res = await fetch(
      `/api/location?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const json: { data: LocationDataType } = await res.json();

    if (json.data.status === "OK") {
      const obj: {
        state?: string;
        city?: string;
        postalCode?: string;
      } = {};
      if (getCountry(json.data) === "India") {
        const state = getState(json.data);
        const city = getCity(json.data);
        const postalCode = getPostalCode(json.data);

        if (state) {
          obj.state = state;
        }
        if (city) {
          obj.city = city;
        }
        if (postalCode) {
          obj.postalCode = postalCode;
        }
        return obj;
      }
    }
    return {};
  } catch (err) {
    return {};
  }
};

export type LocationDataType = {
  plus_code: Pluscode;
  results: Result[];
  status: string;
};
interface Result {
  address_components: Addresscomponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
  plus_code?: Pluscode;
}
interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
  bounds?: Viewport;
}
interface Viewport {
  northeast: Location;
  southwest: Location;
}
interface Location {
  lat: number;
  lng: number;
}
interface Addresscomponent {
  long_name: string;
  short_name: string;
  types: string[];
}
interface Pluscode {
  compound_code: string;
  global_code: string;
}

type PostalCodeDataType = {
  Message: string;
  Status: "Success" | "Error";
  PostOffice: PostOffice[];
};
interface PostOffice {
  Name: string;
  Description?: any;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}
