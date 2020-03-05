/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBar = `mutation CreateBar(
  $input: CreateBarInput!
  $condition: ModelBarConditionInput
) {
  createBar(input: $input, condition: $condition) {
    id
    name
    address
    city
    state
    phoneNumber
    lat
    lon
    description
    coverPhoto
    socialLinks
    rules
    events {
      items {
        id
        title
        description
        startTime
        endTime
        rules
      }
      nextToken
    }
  }
}
`;
export const updateBar = `mutation UpdateBar(
  $input: UpdateBarInput!
  $condition: ModelBarConditionInput
) {
  updateBar(input: $input, condition: $condition) {
    id
    name
    address
    city
    state
    phoneNumber
    lat
    lon
    description
    coverPhoto
    socialLinks
    rules
    events {
      items {
        id
        title
        description
        startTime
        endTime
        rules
      }
      nextToken
    }
  }
}
`;
export const deleteBar = `mutation DeleteBar(
  $input: DeleteBarInput!
  $condition: ModelBarConditionInput
) {
  deleteBar(input: $input, condition: $condition) {
    id
    name
    address
    city
    state
    phoneNumber
    lat
    lon
    description
    coverPhoto
    socialLinks
    rules
    events {
      items {
        id
        title
        description
        startTime
        endTime
        rules
      }
      nextToken
    }
  }
}
`;
export const createEvent = `mutation CreateEvent(
  $input: CreateEventInput!
  $condition: ModelEventConditionInput
) {
  createEvent(input: $input, condition: $condition) {
    id
    bar {
      id
      name
      address
      city
      state
      phoneNumber
      lat
      lon
      description
      coverPhoto
      socialLinks
      rules
      events {
        nextToken
      }
    }
    title
    description
    ticketOffers {
      items {
        id
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
    startTime
    endTime
    rules
  }
}
`;
export const updateEvent = `mutation UpdateEvent(
  $input: UpdateEventInput!
  $condition: ModelEventConditionInput
) {
  updateEvent(input: $input, condition: $condition) {
    id
    bar {
      id
      name
      address
      city
      state
      phoneNumber
      lat
      lon
      description
      coverPhoto
      socialLinks
      rules
      events {
        nextToken
      }
    }
    title
    description
    ticketOffers {
      items {
        id
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
    startTime
    endTime
    rules
  }
}
`;
export const deleteEvent = `mutation DeleteEvent(
  $input: DeleteEventInput!
  $condition: ModelEventConditionInput
) {
  deleteEvent(input: $input, condition: $condition) {
    id
    bar {
      id
      name
      address
      city
      state
      phoneNumber
      lat
      lon
      description
      coverPhoto
      socialLinks
      rules
      events {
        nextToken
      }
    }
    title
    description
    ticketOffers {
      items {
        id
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
    startTime
    endTime
    rules
  }
}
`;
export const createTicketOffer = `mutation CreateTicketOffer(
  $input: CreateTicketOfferInput!
  $condition: ModelTicketOfferConditionInput
) {
  createTicketOffer(input: $input, condition: $condition) {
    id
    title
    description
    capacity
    expiration
    price
    event {
      id
      bar {
        id
        name
        address
        city
        state
        phoneNumber
        lat
        lon
        description
        coverPhoto
        socialLinks
        rules
      }
      title
      description
      ticketOffers {
        nextToken
      }
      startTime
      endTime
      rules
    }
    users {
      id
      username
      email
      firstName
      lastName
      phoneNumber
      dob
      tickets {
        nextToken
      }
    }
  }
}
`;
export const updateTicketOffer = `mutation UpdateTicketOffer(
  $input: UpdateTicketOfferInput!
  $condition: ModelTicketOfferConditionInput
) {
  updateTicketOffer(input: $input, condition: $condition) {
    id
    title
    description
    capacity
    expiration
    price
    event {
      id
      bar {
        id
        name
        address
        city
        state
        phoneNumber
        lat
        lon
        description
        coverPhoto
        socialLinks
        rules
      }
      title
      description
      ticketOffers {
        nextToken
      }
      startTime
      endTime
      rules
    }
    users {
      id
      username
      email
      firstName
      lastName
      phoneNumber
      dob
      tickets {
        nextToken
      }
    }
  }
}
`;
export const deleteTicketOffer = `mutation DeleteTicketOffer(
  $input: DeleteTicketOfferInput!
  $condition: ModelTicketOfferConditionInput
) {
  deleteTicketOffer(input: $input, condition: $condition) {
    id
    title
    description
    capacity
    expiration
    price
    event {
      id
      bar {
        id
        name
        address
        city
        state
        phoneNumber
        lat
        lon
        description
        coverPhoto
        socialLinks
        rules
      }
      title
      description
      ticketOffers {
        nextToken
      }
      startTime
      endTime
      rules
    }
    users {
      id
      username
      email
      firstName
      lastName
      phoneNumber
      dob
      tickets {
        nextToken
      }
    }
  }
}
`;
export const createUser = `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    username
    email
    firstName
    lastName
    phoneNumber
    dob
    tickets {
      items {
        id
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    username
    email
    firstName
    lastName
    phoneNumber
    dob
    tickets {
      items {
        id
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    username
    email
    firstName
    lastName
    phoneNumber
    dob
    tickets {
      items {
        id
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
  }
}
`;
