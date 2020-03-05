/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBar = `subscription OnCreateBar {
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
export const onUpdateBar = `subscription OnUpdateBar {
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
export const onDeleteBar = `subscription OnDeleteBar {
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
export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
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
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
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
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
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
export const onCreateTicketOffer = `subscription OnCreateTicketOffer {
  onCreateTicketOffer {
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
export const onUpdateTicketOffer = `subscription OnUpdateTicketOffer {
  onUpdateTicketOffer {
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
export const onDeleteTicketOffer = `subscription OnDeleteTicketOffer {
  onDeleteTicketOffer {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
