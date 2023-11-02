import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  main_category: {
    type: String
  },
  rating: {
    type: Number
  },
  reviews: {
    type: [Number]
  },
  website: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  place_id: {
    type: String
  },
  status: {
    type: String
  },
  price_range: {
    type: [String]
  },
  description: {
    type: String
  },
  reviews_per_rating: {
    type: Map,
    of: Number
  },
  reviews_link: {
    type: String
  },
  thumbnail: {
    type: String
  },
  images: [{
    thumbnail: {
      type: String
    },
    title: {
      type: String
    }
  }],
  hours: [{
    day: {
      type: String
    },
    times: {
      type: [String]
    }
  }],
  menu: {
    link: {
      type: String
    },
    source: {
      type: String
    }
  },
  order_online_links: [{
    link: {
      type: String
    },
    source: {
      type: String
    }
  }],
  reservations: [{
    link: {
      type: String
    },
    source: {
      type: String
    }
  }],
  owner: {
    id: {
      type: String
    },
    link: {
      type: String
    },
    name: {
      type: String
    }
  },
  categories: {
    type: [String]
  },
  coordinates: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  plus_code: {
    type: String
  },
  complete_address: {
    borough: {
      type: String
    },
    city: {
      type: String
    },
    country_code: {
      type: String
    },
    postal_code: {
      type: String
    },
    state: {
      type: String
    },
    street: {
      type: String
    }
  },
  time_zone: {
    type: String
  },
  about: {
    type: [
      {
        id: {
          type: String
        },
        name: {
          type: String
        },
        options: [{
          enabled: {
            type: Boolean
          },
          name: {
            type: String
          }
        }]
      }
    ]
  },
  user_reviews: {
    type: [
      {
        description: {
          type: String
        },
        images: {
          type: [String]
        },
        name: {
          type: String
        },
        profile_picture: {
          type: String
        },
        rating: {
          type: Number
        },
        when: {
          type: String
        }
      }
    ]
  },
  cid: {
    type: [String]
  },
  data_id: {
    type: String
  },
  CityId: {
    type: Number
  }
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
