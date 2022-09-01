export enum RabbitMQ {
  FlightQeue = 'flights',
}

export enum FlightMsg {
  CREATE = 'CREATE_FLIGHT',
  FIND_ALL = 'FIND_FLIGHTS',
  FIND_ONE = 'FIND_FLIGHT',
  UPDATE = 'UPDATE_FLIGHT',
  DELETE = 'DELETE_FLIGHT',
  ADD_PASSANGER = 'ADD_PASSANGER',
}
