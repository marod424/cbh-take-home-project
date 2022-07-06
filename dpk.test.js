const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns event 'partitionKey' when event has one", () => {
    const partitionKey = "testKey"

    const eventPartitionKey = deterministicPartitionKey({ partitionKey });
    expect(eventPartitionKey).toBe(partitionKey);
  });

  it("Returns event 'hashKey' when event does not have a 'partitionKey'", () => {
    const event = {}
    const data = JSON.stringify(event);
    const hashKey = crypto.createHash("sha3-512").update(data).digest("hex");

    const eventPartitionKey = deterministicPartitionKey(event);
    expect(eventPartitionKey).toBe(hashKey);
  });

  it("Returns hash of event 'partitionKey' if the key length is too large", () => {
    const event = {
      partitionKey: 'maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256.maxKeyGreaterThan256'
    }
    const maxPartitionHash = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
    const eventPartitionKey = deterministicPartitionKey(event);
    expect(eventPartitionKey).toBe(maxPartitionHash);
  });
});
