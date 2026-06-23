// Shared DB connection state so routes can report *why* a connection failed.
export const dbState = {
  lastError: null,   // last connection error message (null when healthy)
  attempts: 0,       // how many connection attempts have been made
};
