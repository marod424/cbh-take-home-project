const crypto = require("crypto");
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (event) {
    candidate = getCandidateFromEvent(event);
  }

  return handleCandidateLength(candidate);
};

function getCandidateFromEvent(event) {
  return event.partitionKey ?? crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
}

function handleCandidateLength(candidate = TRIVIAL_PARTITION_KEY) {
  const candidateStr = typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;

  return candidateStr.length > MAX_PARTITION_KEY_LENGTH 
    ? crypto.createHash("sha3-512").update(candidateStr).digest("hex") 
    : candidateStr;
}