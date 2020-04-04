/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBar = /* GraphQL */ `
  query GetBar($id: ID!) {
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
export const listBars = /* GraphQL */ `
  query ListBars(
    $filter: ModelBarFilterInput
    $limit: Int
    $nextToken: String
  ) {
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
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      barId
      title
      description
      startTime
      endTime
      rules
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
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
        startTime
        endTime
        rules
      }
      nextToken
    }
  }
`;
export const getTicketOffer = /* GraphQL */ `
  query GetTicketOffer($id: ID!) {
    getTicketOffer(id: $id) {
      id
      eventId
      title
      description
      capacity
      expiration
      price
    }
  }
`;
export const listTicketOffers = /* GraphQL */ `
  query ListTicketOffers(
    $filter: ModelTicketOfferFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTicketOffers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventId
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
  }
`;
export const getPurchasedTicket = /* GraphQL */ `
  query GetPurchasedTicket($id: ID!) {
    getPurchasedTicket(id: $id) {
      id
      ticketOfferId
      eventId
      userId
      venueId
      redeemed
      user {
        id
        username
        email
        firstName
        lastName
        phoneNumber
        dob
        barId
      }
      event {
        id
        barId
        title
        description
        startTime
        endTime
        rules
      }
      ticketOffer {
        id
        eventId
        title
        description
        capacity
        expiration
        price
      }
    }
  }
`;
export const listPurchasedTickets = /* GraphQL */ `
  query ListPurchasedTickets(
    $filter: ModelPurchasedTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPurchasedTickets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ticketOfferId
        eventId
        userId
        venueId
        redeemed
        user {
          id
          username
          email
          firstName
          lastName
          phoneNumber
          dob
          barId
        }
        event {
          id
          barId
          title
          description
          startTime
          endTime
          rules
        }
        ticketOffer {
          id
          eventId
          title
          description
          capacity
          expiration
          price
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      firstName
      lastName
      phoneNumber
      dob
      barId
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
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
        barId
      }
      nextToken
    }
  }
`;
export const getEventsByBarId = /* GraphQL */ `
  query GetEventsByBarId(
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
        startTime
        endTime
        rules
      }
      nextToken
    }
  }
`;
export const getTicketOffersByEventId = /* GraphQL */ `
  query GetTicketOffersByEventId(
    $eventId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTicketOfferFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getTicketOffersByEventId(
      eventId: $eventId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventId
        title
        description
        capacity
        expiration
        price
      }
      nextToken
    }
  }
`;
export const getPurchasedTicketsByUser = /* GraphQL */ `
  query GetPurchasedTicketsByUser(
    $userId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchasedTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPurchasedTicketsByUser(
      userId: $userId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ticketOfferId
        eventId
        userId
        venueId
        redeemed
        user {
          id
          username
          email
          firstName
          lastName
          phoneNumber
          dob
          barId
        }
        event {
          id
          barId
          title
          description
          startTime
          endTime
          rules
        }
        ticketOffer {
          id
          eventId
          title
          description
          capacity
          expiration
          price
        }
      }
      nextToken
    }
  }
`;
export const getPurchasedTicketsByEvent = /* GraphQL */ `
  query GetPurchasedTicketsByEvent(
    $eventId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchasedTicketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPurchasedTicketsByEvent(
      eventId: $eventId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ticketOfferId
        eventId
        userId
        venueId
        redeemed
        user {
          id
          username
          email
          firstName
          lastName
          phoneNumber
          dob
          barId
        }
        event {
          id
          barId
          title
          description
          startTime
          endTime
          rules
        }
        ticketOffer {
          id
          eventId
          title
          description
          capacity
          expiration
          price
        }
      }
      nextToken
    }
  }
`;
export const userByUsername = /* GraphQL */ `
  query UserByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByUsername(
      username: $username
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
        barId
      }
      nextToken
    }
  }
`;
