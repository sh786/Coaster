/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBar = `query GetBar($id: ID!) {
  getBar(id: $id) {
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
        barId
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
export const listBars = `query ListBars($filter: ModelBarFilterInput, $limit: Int, $nextToken: String) {
  listBars(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    barId
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
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      barId
      title
      description
      ticketOffers {
        nextToken
      }
      startTime
      endTime
      rules
    }
    nextToken
  }
}
`;
export const getTicketOffer = `query GetTicketOffer($id: ID!) {
  getTicketOffer(id: $id) {
    id
    title
    description
    capacity
    expiration
    price
    event {
      id
      barId
      title
      description
      ticketOffers {
        nextToken
      }
      startTime
      endTime
      rules
    }
    purchasedTickets {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listTicketOffers = `query ListTicketOffers(
  $filter: ModelTicketOfferFilterInput
  $limit: Int
  $nextToken: String
) {
  listTicketOffers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      capacity
      expiration
      price
      event {
        id
        barId
        title
        description
        startTime
        endTime
        rules
      }
      purchasedTickets {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPurchasedTicket = `query GetPurchasedTicket($id: ID!) {
  getPurchasedTicket(id: $id) {
    id
    ticketOffer {
      id
      title
      description
      capacity
      expiration
      price
      event {
        id
        barId
        title
        description
        startTime
        endTime
        rules
      }
      purchasedTickets {
        nextToken
      }
    }
    user {
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
export const listPurchasedTickets = `query ListPurchasedTickets(
  $filter: ModelPurchasedTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  listPurchasedTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      ticketOffer {
        id
        title
        description
        capacity
        expiration
        price
      }
      user {
        id
        username
        email
        firstName
        lastName
        phoneNumber
        dob
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getEventsByBarId = `query GetEventsByBarId(
  $barId: ID
  $id: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  getEventsByBarId(
    barId: $barId
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      barId
      title
      description
      ticketOffers {
        nextToken
      }
      startTime
      endTime
      rules
    }
    nextToken
  }
}
`;
export const userByEmail = `query UserByEmail(
  $email: String
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  userByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
