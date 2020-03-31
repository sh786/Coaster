/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBar = /* GraphQL */ `
  subscription OnCreateBar {
    onCreateBar {
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
export const onUpdateBar = /* GraphQL */ `
  subscription OnUpdateBar {
    onUpdateBar {
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
export const onDeleteBar = /* GraphQL */ `
  subscription OnDeleteBar {
    onDeleteBar {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
export const onCreateTicketOffer = /* GraphQL */ `
  subscription OnCreateTicketOffer {
    onCreateTicketOffer {
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
export const onUpdateTicketOffer = /* GraphQL */ `
  subscription OnUpdateTicketOffer {
    onUpdateTicketOffer {
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
export const onDeleteTicketOffer = /* GraphQL */ `
  subscription OnDeleteTicketOffer {
    onDeleteTicketOffer {
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
export const onCreatePurchasedTicket = /* GraphQL */ `
  subscription OnCreatePurchasedTicket {
    onCreatePurchasedTicket {
      id
      ticketOfferId
      eventId
      userId
      redeemed
    }
  }
`;
export const onUpdatePurchasedTicket = /* GraphQL */ `
  subscription OnUpdatePurchasedTicket {
    onUpdatePurchasedTicket {
      id
      ticketOfferId
      eventId
      userId
      redeemed
    }
  }
`;
export const onDeletePurchasedTicket = /* GraphQL */ `
  subscription OnDeletePurchasedTicket {
    onDeletePurchasedTicket {
      id
      ticketOfferId
      eventId
      userId
      redeemed
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
