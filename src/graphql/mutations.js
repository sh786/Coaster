/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBar = /* GraphQL */ `
  mutation CreateBar(
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
export const updateBar = /* GraphQL */ `
  mutation UpdateBar(
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
export const deleteBar = /* GraphQL */ `
  mutation DeleteBar(
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
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createTicketOffer = /* GraphQL */ `
  mutation CreateTicketOffer(
    $input: CreateTicketOfferInput!
    $condition: ModelTicketOfferConditionInput
  ) {
    createTicketOffer(input: $input, condition: $condition) {
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
export const updateTicketOffer = /* GraphQL */ `
  mutation UpdateTicketOffer(
    $input: UpdateTicketOfferInput!
    $condition: ModelTicketOfferConditionInput
  ) {
    updateTicketOffer(input: $input, condition: $condition) {
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
export const deleteTicketOffer = /* GraphQL */ `
  mutation DeleteTicketOffer(
    $input: DeleteTicketOfferInput!
    $condition: ModelTicketOfferConditionInput
  ) {
    deleteTicketOffer(input: $input, condition: $condition) {
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
export const createPurchasedTicket = /* GraphQL */ `
  mutation CreatePurchasedTicket(
    $input: CreatePurchasedTicketInput!
    $condition: ModelPurchasedTicketConditionInput
  ) {
    createPurchasedTicket(input: $input, condition: $condition) {
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
      venue {
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
    }
  }
`;
export const updatePurchasedTicket = /* GraphQL */ `
  mutation UpdatePurchasedTicket(
    $input: UpdatePurchasedTicketInput!
    $condition: ModelPurchasedTicketConditionInput
  ) {
    updatePurchasedTicket(input: $input, condition: $condition) {
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
      venue {
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
    }
  }
`;
export const deletePurchasedTicket = /* GraphQL */ `
  mutation DeletePurchasedTicket(
    $input: DeletePurchasedTicketInput!
    $condition: ModelPurchasedTicketConditionInput
  ) {
    deletePurchasedTicket(input: $input, condition: $condition) {
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
      venue {
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
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
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
      barId
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
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
      barId
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
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
      barId
    }
  }
`;
